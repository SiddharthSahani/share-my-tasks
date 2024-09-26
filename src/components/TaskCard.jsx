
export function TaskCard({ task, toggleStatusHandler, deleteTaskHandler, editable }) {
  return (
    <div className="bg-cyan-600 rounded-xl my-2 flex p-2">
      <button className='w-2/12 bg-cyan-700 px-2 mr-3 rounded-lg text-lg' onClick={toggleStatusHandler}>
        Status:
        <div className={`text-xl ${task.completed ? "text-green-300" : "text-rose-300"}`}>
          {
            task.completed ? "Completed" : "Pending"
          }
        </div>
      </button>
      <div className="w-10/12 flex flex-col">
        <div className="flex">
          <div className="w-2/12 text-2xl font-bold">Title:</div>
          <div className="w-8/12 text-2xl">{task.title}</div>
          {
            editable &&
            <button className='w-2/12 bg-rose-500 text-xs rounded-lg' onClick={deleteTaskHandler}>Delete</button>
          }
        </div>
        <hr className='opacity-40 my-1'/>
        <div className="flex">
          <div className="w-2/12 text-xl font-bold">Desc:</div>
          <div className="w-10/12 text-xl">{task.description ? task.description : <i>No description provided</i>}</div>
        </div>
        <div className="flex">
          <div className="w-2/12 text-xl font-bold">Priority:</div>
          <div className="w-10/12 text-xl">
            {
              (task.priority === 1) ? <div className="text-xl text-lime-300">Low</div> :
              (task.priority === 2) ? <div className="text-xl text-orange-300">Medium</div> :
              (task.priority === 3) ? <div className="text-xl text-red-300">High</div> : null
            }
          </div>
        </div>
      </div>
    </div>
  )
}
