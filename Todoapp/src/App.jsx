import { useState } from 'react'
import './App.css'

function App() {
  debugger;
  const [task,setTask] = useState("");
  const [list,setList] =useState([]);
  const handleSubmit=(e)=>{
    e.preventDefault();
    setList([...list, task]);
    setTask("");
  }
  return (
    <>
    <div className="text-lg font-bold text-blue-600">
      To Do List
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Add a new task..." onChange={(e)=>setTask(e.target.value)}></input>
        <button type="submit">Add Task</button>
        <ul>
          {list.map((listitem)=><li key="index">{listitem}</li>)}
        </ul>
      </form>
    </div>
    </>
  )
}

export default App
