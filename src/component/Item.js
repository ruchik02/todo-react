import React from 'react'

const Item = () => {
  return (
    <div className="container">
    <div className="topbar">
    <h1>todos</h1>
    </div>
    <div id="body">
       <div id="input">
           <span  id="downarrow">
               <i className="arrow down"></i>
           </span>
           <div id="takeinput">
             <input type="text" className="add-todo" id="input-text" placeholder="What needs to be done?"/>
           </div>  
       </div>
       <div className="todos" id="todos">
       </div>
   </div>
 <div className="todos" id="todos">
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