import { useEffect, useState } from 'react'
import { TaskCard } from './TaskCard'
import { TaskListOptions } from './TaskListOptions'


export function TaskList({ allTasks, toggleStatusHandler, deleteTaskHandler, editable }) {
  const [viewTasks, setViewTasks] = useState([])

  const [viewOptions, setViewOptions] = useState({
    priorities: [true, true, true],
    statuses: [true, true],
    sortBy: "priority",
    sortOrder: "asc",
  })

  useEffect(() => {
    let tasks = allTasks.map((task, index) => [task, index])
    tasks = tasks.filter(([task, _]) => viewOptions.priorities[task.priority - 1] && viewOptions.statuses[task.completed ? 0 : 1])
    tasks.sort((a, b) => (viewOptions.sortOrder === "asc" ? 1 : -1) * (a[0].priority - b[0].priority))
    setViewTasks(tasks)
  }, [allTasks, viewOptions])

  const toggleStatus = editable ? toggleStatusHandler : (tid) => {}
  const deleteTask = editable ? deleteTaskHandler : (tid) => {}

  return (
    <>
      <TaskListOptions options={viewOptions} setOptions={setViewOptions} />
      <div className="bg-[#2d3746] rounded-xl px-2 py-1">
        {
          viewTasks.length ?
          viewTasks.map(([task, tid], index) => (
            <TaskCard
              key={index} task={task}
              toggleStatusHandler={() => toggleStatus(tid)}
              deleteTaskHandler={() => deleteTask(tid)}
            />
          )) :
          <i className='p-4'>Active tasks will appear here</i>
        }
      </div>
    </>
  )
}
