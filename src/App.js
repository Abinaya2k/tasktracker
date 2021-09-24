import { useState,useEffect } from "react";
import {BrowserRouter as Router,Route} from 'react-router-dom'
import AddTask from "./components/AddTask";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import About from "./components/About";


function App() {
  const [showAddTask,setShowAddTask]=useState(false)
  const [tasks,settask]=useState([])

  useEffect(()=>{
    const getTasks=async ()=>{
      const tasksfromserver=await fetchTasks()
      settask(tasksfromserver)
    }
    getTasks()
  },[])

  const fetchTasks=async()=>{
    const res=await fetch('http://localhost:5000/tasks')
    const data=await res.json()
    return data
  }

  const fetchTask=async(id)=>{
    const res=await fetch(`http://localhost:5000/tasks/${id}`)
    const data=await res.json()
    return data
  }

const addTask=async(task)=>{
  const res=await fetch('http://localhost:5000/tasks',{
    method:'POST',
    headers:{
      'Content-type':'application/json'
    },
    body:JSON.stringify(task)
  })

  const data=await res.json()
  settask([...tasks,data])


  //const id=Math.floor(Math.random()*10000)+1;
  //const newtask={id,...task}
  //settask([...tasks,newtask])
}

const deleteTask=async(id)=>{
  await fetch(`http://localhost:5000/tasks/${id}`,{
    method:'DELETE'
  })

  settask(tasks.filter((task)=>{
    return task.id!==id
  }))


}
const toggleRemainder=async(id)=>{
  const tasktotoggle=await fetchTask(id)
  const updtask={...tasktotoggle,remainder:!tasktotoggle.remainder}
  const res=await fetch(`http://localhost:5000/tasks/${id}`,{
    method:'PUT',
    headers:{
      'content-type':'application/json'
    },
    body:JSON.stringify(updtask)
  })

  const data=await res.json()

  settask(tasks.map((task)=>task.id===id?{...task,remainder:data.remainder}:task))

}
  return (
    <Router>
      <div className="container">
        <Header onAdd={()=>setShowAddTask(!showAddTask)} showAdd={showAddTask} />
       
        <Route path="/" exact render={(props)=>(
          <>
           { showAddTask && <AddTask onAdd={addTask}/>}
            {tasks.length>0?<Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleRemainder} />:'No Tasks to show'}

          </>
        )}/>
        <Route path="/about" component={About}/>
        <Footer/>
      </div>

    </Router>
    
  );
}

export default App;
