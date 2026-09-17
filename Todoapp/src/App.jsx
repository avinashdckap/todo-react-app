import { useState, useEffect } from 'react';
import { MdEdit } from "react-icons/md";
import { TiTick } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";
import axios from 'axios';
import './App.css'

function App() {
  const [task,setTask]=useState("");
  const [list,setList]=useState([]);
  const [error,setError]=useState("");
  useEffect(()=>{
    axios.get("http://localhost:3000/posts")
    .then((response)=>
      {response.data;
        console.log(response.data);
        setList(response.data);
      })
      .catch(error)
      {
        setError(error);
      }
  },[])
  const handleChange=(e)=>{
    if(error)
    {
      setError("");
    }
    let value=e.target.value;
    setTask(value);
  }
  const handleSubmit=(e)=>{
    e.preventDefault();
    if(task.trim().length === 0)
    {
      setError("Enter a task to proceed");
    }
    else {
      const payload = { title: task }
      axios.post("http://localhost:3000/posts", payload)
        .then((response) => {
          list.push(response.data)
          console.log(list);
          setList(list);
          setTask("");
        })
        .catch(error)
      {
        setTask(error);
      }
    }

  }
  return (
    <>
    <h3>To do list</h3>
    <form>
      <input type="text" placeholder="Add your task here" required={true} value={task} onChange={handleChange}/>
      <button onClick={handleSubmit}>Add Task</button>
      <button onClick={setList([])}>clear</button>
      { error && <span>{error}</span>}
    </form>
    <ul>
      {list.map((item)=><li key={item.id}>{item.title}</li>)}
    </ul>
    </>
  );
}

export default App
