import { TaskCard } from './TaskCard'
import React from 'react'


export function TaskList({ tasks, toggleStatusHandler, deleteTaskHandler }) {
  return (
    <div className="bg-[#2d3746] rounded-xl px-2 py-1 mt-2">
      {
        tasks.length ?
        tasks.map((task, index) => (
          <TaskCard
            key={index} task={task}
            toggleStatusHandler={() => toggleStatusHandler(index)}
            deleteTaskHandler={() => deleteTaskHandler(index)}
          />
        )) :
        <i className='p-4'>Active tasks will appear here</i>
      }
    </div>
  )
}
