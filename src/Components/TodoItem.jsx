import React, { useEffect, useState } from 'react';

const TodoItem = (props) => {
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

    return(
        <div>
          <input type="checkbox" 
          checked={todoItem.isDone} 
          onChange={()=>{
            setDirty(true);
            setTodoItem({...todoItem, isDone: !todoItem.isDone})
            }}
          />
          <input type="text" value= {todoItem.task_name} onChange = {updateTask}/>
        </div>
    );
};

export default TodoItem;




