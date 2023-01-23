const express = require("express");
const app = express();
const Todo = require("./todo.js");
const mongoose  = require("mongoose");
const router = express.Router();
app.use(router);
// get
router.get("/gettodos", async (req, res) => {
  const result = await Todo.find();
  console.log(result,"9");
  res.send(result);
});   
// post
router.post("/addtodo", async (req, res) => {
  try {
    console.log(req.body,"13");
    const task = req.body.task;
    const completed = req.body.completed;
    console.log(completed,"18")
    if (task.trim() != "") {
      const todo = new Todo({
        task: task,
        completed: completed,
      });
      const todo1 = await todo.save();
      const todos = await Todo.find();
      console.log(todos,"25",todo1);
      res.send(todos);

    } else {
      console.log(todo,"28");
    }
  } catch (error) {
    console.log(error,"33");
    res.send(error);
  }
});
// delete
router.delete("/removetodo/:id",async(req,res)=>{
  try {
    console.log("hellooo 43")
    let id= req.params.id
    console.log(id,"42");
    console.log(req.params,"47");
    let todos=await Todo.findByIdAndDelete(req.params.id);
    console.log(todos,"44");
    let alltodos=await Todo.find();
    res.send(alltodos);
  }
   catch (error) {
    res.send(error); 
  }
  });
  // get clear completed
  router.get("/clearcompleted",async(req,res)=>{
    const result=await Todo.remove({'completed':'true'});
    const todos=await Todo.find();
     res.send(todos);
   });
  //  markallcompleted
   router.get("/markallcompleted",async(req,res)=>{
    const todos=await Todo.find();
    for(let i=0;i<todos.length;i++)
    {
      if(todos[i].completed==false)
      todos[i].completed=true;
      await todos[i].save();
      console.log(todos[i]);
 
    }
    res.send(todos);
  })

  // uncompleted
  router.get("/markalluncompleted",async(req,res)=>{
    const todos=await Todo.find();
    for(let i=0;i<todos.length;i++)
    {
      if(todos[i].completed==true)
      todos[i].completed=false;
      await todos[i].save();
      console.log(todos[i]);
    }
    res.send(todos);
  })
  // markcompeleted
  router.patch("/markcomplete/:id",async(req,res)=>{
    try {
      let id=req.params.id;
      const todo=await Todo.findById(id);
      todo.completed=true;
      const result=await todo.save();
      console.log(result);
      const todos=await Todo.find();
      res.send(todos);
    } catch (error) {
      res.send(error); 
    }
  })
  // markuncompleted
  router.patch("/markuncomplete/:id",async(req,res)=>{
    try {
      let id=req.params.id;
      const todo=await Todo.findById(id);
      todo.completed=false;
      const result=await todo.save();
      console.log(result);
      const todos=await Todo.find();
      res.send(todos);
    } catch (error) {
      res.send(error);
      
    }
  })

module.exports = router;