import React, { useEffect, useState } from 'react';

const TodoItem = (props) => {
    const {emitDeleteTodoItem} = props;
    const [todoItem, setTodoItem] = useState(props.data);
    const [isDirty, setDirty] = useState(false);


    useEffect(() => {

        if (isDirty){

        fetch(`http://localhost:9090/api/todos/${todoItem.id}`, {
            method: "PUT",
            headers:{
                "content-type": "application/json",
            },
            body: JSON.stringify(todoItem),
        })
        .then((response)=>response.json())
        .then((data)=>{
            setDirty(false);
            setTodoItem(data);
        });
    }
},[todoItem, isDirty]);

function updateTask(e){
    setDirty(true)
    setTodoItem({...todoItem, task_name: e.target.value});
}

function deleteTodoItem(){
            fetch(`http://localhost:9090/api/todos/${todoItem.id}`, {
            method: "DELETE",
            headers:{
                "content-type": "application/json",
            },
        })
        .then((response)=> {
            emitDeleteTodoItem(todoItem);
        });
}

    return(
        <div>
          <input type="checkbox" 
          checked={todoItem.isDone} 
          onChange={()=>{
            setDirty(true);
            setTodoItem({...todoItem, isDone: !todoItem.isDone})
            }}
          />
          {todoItem.isDone? (
            <span style={{textDecoration: "line-through"}} >{todoItem.task_name}</span>
          ) :(
          <input type="text" value= {todoItem.task_name} onChange = {updateTask}/>
          )}

         <span style = {{marginLeft: "4rem"}}></span>
         <input type="text" value= {todoItem.price}/>
          <span style = {{marginLeft: "4rem", cursor: "pointer"}} >🏞️</span>
          <span 
          style = {{marginLeft: "4rem", cursor: "pointer"}} 
          onClick={deleteTodoItem}>🗑️
          </span>

        </div>
    );
};

export default TodoItem;




