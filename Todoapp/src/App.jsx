import { useState } from 'react';
import { MdEdit } from "react-icons/md";
import { TiTick } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";
import axios from 'axios';
import './App.css'

function App() {
  const [task, setTask] = useState("");
  const [list, setList] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);
  const [error,setError]=useState("");
  const handleChange = (e) => {
    setTask(e.target.value);
  }
  const handleSubmit = (e) => {
    debugger;
    e.preventDefault();
    const trimmedTask = task.trim();
    if (trimmedTask.length === 0) return;
    if (editIndex != -1) {
      setList((prevList) => prevList.map((item, index) => index === editIndex ? { ...item, title: trimmedTask } : item));
      setEditIndex(-1);
    }
    else {
      axios.post("https://jsonplaceholder.typicode.com/todos", { title: trimmedTask, completed: false })
      .then((response) => {
        response.data;
        console.log(response.data)
        setList((prevList) => [...prevList, response.data]);
      })
      .catch((error)=>{
        console.log("Error",error);
        setError(error);
      })
      
    }

    setTask("");
  }
  const ToggleEvent = (toggleindex) => {
    setList((prevList) => prevList.map((item, index) => toggleindex === index ? { ...item, completed: !item.completed } : item))
  }
  const handleEdit=(editIndex,title)=>{
    setEditIndex(editIndex);
    setTask(title);
  }
  const handleDelete=(deleteindex)=>{
    setList(prevList=>prevList.filter((listitem,index)=>index !== deleteindex))
  }
  return (
    <>
      <div>
        <p className="title-4xl font-bold title-blue-600">To Do List</p>
        <form  >
          <input type="title" placeholder="Add a new task..." value={task} className=" m-2 border title-xl font-semibold rounded-md py-4 px-2" onChange={handleChange}></input>
          <button type="submit" className="border border-gray-200 bg-gray-600 hover-gray-200 title-xl font-semibold rounded-md py-4 px-2" onClick={handleSubmit}>{ editIndex!= -1 ? "Update task" : "Add Task"}</button>
        </form>
        <ul>
          {list.map((listitem, index) => <li key={index} className="flex gap-2"><span className={`cursor-pointer ${listitem.completed ? "line-through title-gray" : ""}"`} onClick={() => ToggleEvent(index)}>{listitem.title}</span>
          <MdEdit className="cursor-pointer" onClick={() => {handleEdit(index,listitem.title)}
          } /><RxCross2 className="cursor-pointer" onClick={()=>handleDelete(index)}/></li>)}
        </ul>
      </div>
    </>
  )
}

export default App
