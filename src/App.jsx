import { Fragment, useEffect, useState } from 'react';
import logo from './logo.svg';
import TodoItem from './Components/TodoItem';
import { ReactComponent as Logo } from './Images/logo.svg';

export default function App() {

  const [todoItems, setTodoItems] = useState(null);
  
  useEffect(()=>{
    console.log("Hey I have loaded");

    if(!todoItems){
    fetch("http://localhost:9090/api/todos/")
    .then((response) => response.json())
    .then((data)=>{console.log("Todo item list", data);
    setTodoItems(data);
  });
  }
},[todoItems]);

function addNewTodoItem(){
  fetch("http://localhost:9090/api/todos/",{
  hearers: {
    "content-type": "application/json",
    },
    method: "POST",
  })
    .then((response) => response.json())
    .then((aTodoItem) => {
      console.log(aTodoItem);
      setTodoItems([...todoItems, aTodoItem]);
  });
}

function handleDeleteTodoItem(item){
const updatedTodoItems = todoItems.filter(aTodoItem => aTodoItem.id !==item.id);
setTodoItems([...updatedTodoItems]);
}
  
  return(
  <>

  <div>
  <Logo  style={{ height: 100, width: 200 }}/>
  <h1>Shopping List</h1>
  <div> 
    <h3>Item Name  </h3>  
  </div>



  </div>
  
  <div>
    {todoItems
      ? todoItems.map((todoItem) => {
       return (<TodoItem 
       key = {todoItem.id} 
       data = {todoItem} 
       emitDeleteTodoItem={handleDeleteTodoItem} 
       />
      );
     })
     : "loading data..."}
     <span style = {{marginBottom: "10rem"}} ></span>
  </div>



  <div>
    <span style = {{marginLeft: "10rem", marginBottom: "4rem"}} ></span>
    <button onClick={addNewTodoItem}>Add new item</button>
  </div>


  </>

  );
}
