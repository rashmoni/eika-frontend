import { Fragment, useEffect, useState } from 'react';
import logo from './logo.svg';
import TodoItem from './Components/TodoItem';

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

  
  return(
  <>
  <button onClick={addNewTodoItem}>Add new item</button>
  <div>
    { todoItems
      ? todoItems.map((todoItem) => {
       return <TodoItem key = {todoItem.id} data = {todoItem}/>;
     })
     : "loading data"}
  </div>
  </>
  );
}
