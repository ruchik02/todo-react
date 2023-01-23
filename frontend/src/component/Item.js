import React,{useState,useEffect} from 'react'
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
const Item = () => {
   const [todos, setTodos] = useState([]);
   const [task, setTask] = useState("");
   const [filter,setFilter]=useState("All");
   useEffect(() => {
      const getTodos = async () => {
        const res = await axios.get('http://localhost:8000/gettodos');
        setTodos(res.data);
      };
      getTodos();
    }, [todos]);
   //  add todos
const addTodo = async (e) => {
   e.preventDefault();
   const res = await axios.post("http://localhost:8000/addtodo", { task, completed: false });
   setTodos([...todos, res.data]);
   setTask("");
  
}
// remove todos
const handleRemove= async(id)=>{
   try {
     await axios.delete(`http://localhost:8000/removetodo/${id}`);
      setTodos(todos.filter(todo => todo._id !==id));
    } catch (err) {
      console.log(err,"27");
    }  
}
// checked
const markComplete = async (id) => {
   try {
     await axios.patch(`http://localhost:8000/markcomplete/${id}`);
     const todos = await axios.get("http://localhost:8000/gettodos");
     setTodos(todos.data);
   } catch (error) {
     console.error(error.message);
   }
 };
// unchecked
 const markUncomplete = async (id) => {
   try {
     await axios.patch(`http://localhost:8000/markuncomplete/${id}`);
     const todos = await axios.get("http://localhost:8000/gettodos");
     setTodos(todos.data);
   } catch (error) {
     console.error(error.message);
   }
 };

// clear completed
const handleClearCompleted=async()=>{
   try{
      await axios.get('http://localhost:8000/clearcompleted');
      setTodos(todos.filter((todo) => !todo.completed));
   }catch(err){
      console.log(err);
   }
}
// all
// active
const Active=(e)=>{
   e.preventDefault()
   setFilter({filter:'Active'})
}
// completed
const Completed=(e)=>{
   e.preventDefault();
   setFilter({filter:'Completed'});
}
// All
const All=(e)=>{
   e.preventDefault();
   setFilter({filter:'All'});
}
// count todos
let count=todos.filter((i)=>{return i.completed===false}).length;
  return (
    <div className="container">
    <div className="topbar">
    <h1>todos</h1>
    </div>
    <form id="body" onSubmit={addTodo}>
       <div id="input">
           <span id="downarrow">
               <i className="arrow down"></i>
           </span>
           <div id="takeinput">
             <input type="text" value={task} className="add-todo" id="input-text" onChange={(e)=>setTask(e.target.value)} placeholder="What needs to be done?"/>
           </div>  
             <button type="submit" className="add-btn">ADD</button>
       </div>
       <div className="todos" id="todos">
       </div>
   </form>
 <div className="todos" id="todos">
   <ul id="ul" className="todo-list"> 
   {
      todos.map((todo)=>(
         <li key={uuidv4()}>
                        <input type="checkbox" 
                         checked={todo.completed} 
                         name="checkbox" id="checker" 
                         className="check-box"
                         onChange={() => {
                           if (todo.completed) {
                             markUncomplete(todo._id);

                           } else {
                             markComplete(todo._id);
                           }
                         }}

                        />
                        <label 
                         htmlFor="todoLbael" 
                         className="data" style={{textDecoration: todo.completed ? "line-through" : "none"}}>{todo.task}</label>
                        <label
                         htmlFor="todoCross"
                         className="cross"
                         onClick={() => handleRemove(todo._id)}>X</label>
       </li>
      ))
   }
   </ul>
 </div>
 <div className="foot" id="footer">
 <div className="footer">
       <span id="todo-count"><strong id="count">{count}</strong> items left</span>
       <ul className="filters">
          <li>
             <a href='/all' className="selected">All</a>
          </li>
          <li>
             <a href='/active' className="acive">Active</a>
          </li>
          <li>
             <a href='/completed' className="completed">Completed</a>
          </li>
       </ul>
       <button className="clear-completed" id="clear-completed" onClick={handleClearCompleted}>Clear completed</button>
 </div>
</div>
</div>
  )
}

export default Item