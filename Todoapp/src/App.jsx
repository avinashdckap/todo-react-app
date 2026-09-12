import { useState } from 'react';
import { MdEdit } from "react-icons/md";
import { TiTick } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";
import './App.css'

function App() {
  const [task,setTask] = useState("");
  const [list,setList] =useState([]);
  const handleChange=(e)=>{
    setTask(e.target.value);
  }
  const handleSubmit=(e)=>{
    debugger;
    e.preventDefault();
    const trimmedTask = task.trim();
    if( trimmedTask.length === 0 ) return;
    setList((prevList) => [...prevList, trimmedTask]);
    setTask("");
    console.log( list ,"list");
  }
  const handleEdit=(e)=>{
    console.log( list , e.target.index);
    setTask(list[e.target.index]);
  }
  return (
    <>
      <div>
        <p className="text-4xl font-bold text-blue-600">To Do List</p>
        <form  >
          <input type="text" placeholder="Add a new task..." value={task} className=" m-2 border text-xl font-semibold rounded-md py-4 px-2" onChange={handleChange}></input>
          <button type="submit" className="border border-gray-200 bg-gray-600 hover-gray-200 text-xl font-semibold rounded-md py-4 px-2" onClick={handleSubmit}>Add Task</button>
        </form>
        <ul>
          {list.map((listitem, index) => <li key={index} className="flex gap-2">{listitem}<MdEdit /><TiTick /><RxCross2  /></li>)}
        </ul>
      </div>
    </>
  )
}

export default App
