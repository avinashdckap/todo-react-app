import { useState, useEffect } from 'react';
import axios from 'axios';
import { Todo } from './Todo.jsx';
import './App.css'

function App() {
  const [task,setTask]=useState("");
  const [list,setList]=useState([]);
  const [error,setError]=useState("");
  const [editId,setEditId]=useState("");

  useEffect(()=>{
    axios.get("http://localhost:3000/posts")
    .then((response)=>
      {
        response.data;
        setList(response.data);
      })
      .catch((error)=>
      {
        setError(error);
      })
  },[])

  const handleChange = (e, error) => {
    if (error) {
      setError("");
    }
    setTask(e.target.value);
    console.log(task);
  }

  const handleSubmit = (e) => {
    debugger;
    e.preventDefault();
    setError("");
    if (task.trim().length === 0) {
      setError("Enter a task to proceed");
    }
    else {
      const payload = { "title": task, "completed": false };
      if (editId) {
        axios.put(`http://localhost:3000/posts/${editId}`, payload)
          .then((response) => {
            let updatedlist = list.map((item) => item.id === editId ? { item, ...response.data } : item)
            setList(updatedlist);
            setTask("");
            setEditId("");
          })
          .catch((error) => 
            {
            setError("unable to update")
            }
          )
      }
      else{
        axios.post("http://localhost:3000/posts", payload)
          .then((response) => {
            let updatedlist = [...list, response.data]
            setList(updatedlist);
            setTask("");
          })
          .catch((error) => setError("unable to post"))
      }
      }
  }
  const handleDelete=(deleteId)=>{
    setError("");
    axios.delete(`http://localhost:3000/posts/${deleteId}`)
      .then((response) => {
        let filteredlist=list.filter((item) => item.id != response.data.id)
        setList(filteredlist);
      })
      .catch((error)=>
    {
      setError("Cannot delete");
    })}


  const handleClear = () => {
    setError("");
    let filteredlist = [];
    let length = list.length;
    if (length == 0)
      setError("Nothing to clear")
    for (let i = 0; i < length; i++) {
      axios.delete(`http://localhost:3000/posts/${list[i].id}`)
        .then((response) => {
          let fileteredlist = list.filter((item) => item.id != response.data.id);
        }
        )
    }
    setList(filteredlist);
  }

  const handletick=(id)=>{
    let updatedlist=list.map((item)=>item.id === id ? {...item, completed : !item.completed}: item);
    setList(updatedlist);
  }

  const handleEdit=(task)=>{
    setError("");
    setEditId(task.id);
    setTask(task.title);
  }
  return (
    <>
    <Todo 
    task={task} 
    error={error}
    list={list}
    handleChange={handleChange}
    handleSubmit={handleSubmit}
    handleClear={handleClear}
    handleDelete={handleDelete}
    handletick={handletick}
    handleEdit={handleEdit}
    />
    </>
  );
}

export default App
