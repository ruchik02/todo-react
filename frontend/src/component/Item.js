import React,{useState,useEffect} from 'react'
import axios from 'axios';


const Item = () => {
   const [todos, setTodos] = useState([]);
   const [task, setTask] = useState("");
   useEffect(() => {
      const getTodos = async () => {
        const res = await axios.get('http://localhost:8000/gettodos');
        setTodos(res.data);
      };
      for(let i in todos){
         console.log(todos[i],"21");
      }
      getTodos();
    }, [task]);
const addTodo = async (e) => {
   e.preventDefault();
   const res = await axios.post("http://localhost:8000/addtodo", { task, completed: false,id:Date.now() });
   setTodos([...todos, res.data]);
   setTask("");
  
}
const handleRemove= async(id)=>{
   try {
     await axios.delete(`http://localhost:8000/removetodo/:id`);
      setTodos(todos.filter(todo => todo._id !==id));
      console.log("hello 25 line",id);
    } catch (err) {
      console.log(err,"27");
    }  
}

  return (
    <div className="container">
    <div className="topbar">
    <h1>todos</h1>
    </div>
    <form id="body" onSubmit={addTodo}>
       <div id="input">
           <span  id="downarrow">
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
         <li key={todo._id}>
                        <input type="checkbox"  name="checkbox" id="checker" className="check-box"/>
                        <label for="todoLbael" className="data">{todo.task}</label>
                        <label for="todoCross" className="cross" onClick={() => handleRemove(todos._id)}>X</label>
       </li>
      ))
   }
   </ul>
   
   
 </div>
 <div className="foot" id="footer">
 <div className="footer">
       <span id="todo-count"><strong id="count">0</strong> items left</span>
       <ul className="filters">
          <li>
             <a href className="selected">All</a>
          </li>
          <li>
             <a href className="acive" >Active</a>
          </li>
          <li>
             <a href className="completed">Completed</a>
          </li>
       </ul>
       <button className="clear-completed" id="clear-completed" >Clear completed</button>
 </div>
</div>
</div>
  )
}

export default Item