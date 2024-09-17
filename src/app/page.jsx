"use client"
import { TaskList } from "@/components/TaskList";
import { useState, useEffect } from "react";


export default function Home() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    setTasks([
      {
        title: "Some random title",
        description: "Testing some things out",
        completed: true,
        priority: 2,
      },
      {
        title: "More",
        description: "Testing some more things out",
        completed: false,
        priority: 1,
      },
      {
        title: "No more",
        description: "",
        completed: true,
        priority: 3,
      },
      {
        title: "TOOO more",
        description: "Warning: Each child in a list should have a unique 'key' prop. Check the top-level render call using <div>. See https://reactjs.org/link/warning-keys for more information.",
        completed: true,
        priority: 3,
      },
    ])
  }, [])

  const toggleStatus = (index) => {
    tasks[index].completed = !tasks[index].completed
    setTasks([...tasks])
  }

  const deleteTask = (index) => {
    tasks.splice(index, 1)
    setTasks([...tasks])
  }

  return (
    <>
      <h1 className="text-center text-4xl font-bold">
        Share My Tasks
      </h1>
      <TaskList tasks={tasks} toggleStatusHandler={toggleStatus} deleteTaskHandler={deleteTask}/>
    </>
  );
}
