
export function TaskListOptions({ options, setOptions }) {
  const onPriorityViewChange = (index) => {
    options.priorities[index] = !options.priorities[index]
    setOptions({ ...options })
  }

  const onStatusViewChange = (index) => {
    options.statuses[index] = !options.statuses[index]
    setOptions({ ...options })
  }

  const onSortOrderChange = (order) => {
    options.sortOrder = order
    setOptions({ ...options })
  }

  const onSortByChange = (sort) => {
    options.sortBy = sort
    setOptions({ ...options })
  }

  return (
    <div className="bg-[#2d3746] rounded-xl mt-2 mb-2 p-1">
      <div className="text-xl font-semibold px-2">View Options:</div>
      <hr className="opacity-40 m-2 mt-1" />
      <div className="flex flex-col p-2 pl-4 gap-3">
        <div className="flex items-center">
          <div className="text-lg w-1/12 mr-8">Priority:</div>
          <div className="flex w-11/12 gap-1">
            <button
              className={`${!options.priorities[0] && "line-through border-dashed"} w-1/3 py-1 rounded-lg border-[1px] border-lime-400 text-lime-400`}
              onClick={() => onPriorityViewChange(0)}
            >Low</button>
            <button
              className={`${!options.priorities[1] && "line-through border-dashed"} w-1/3 py-1 rounded-lg border-[1px] border-yellow-400 text-yellow-400`}
              onClick={() => onPriorityViewChange(1)}
            >Medium</button>
            <button
              className={`${!options.priorities[2] && "line-through border-dashed"} w-1/3 py-1 rounded-lg border-[1px] border-orange-400 text-orange-400`}
              onClick={() => onPriorityViewChange(2)}
            >High</button>
          </div>
        </div>
        <div className="flex items-center">
          <div className="text-lg w-1/12 mr-8">Status:</div>
          <div className="flex w-11/12 gap-2">
            <button
              className={`${!options.statuses[0] && "line-through border-dashed"} w-1/2 py-1 rounded-lg border-[1px] border-green-400 text-green-400`}
              onClick={() => onStatusViewChange(0)}
            >Completed</button>
            <button
              className={`${!options.statuses[1] && "line-through border-dashed"} w-1/2 py-1 rounded-lg border-[1px] border-rose-400 text-rose-400`}
              onClick={() => onStatusViewChange(1)}
            >Pending</button>
          </div>
        </div>
        <div className="flex">
          <div className="text-lg w-1/12 mr-8">Sort By:</div>
          <div className="flex w-11/12 gap-2">
            <select className="w-1/2 bg-gray-600 rounded-lg py-1 text-center" value={options.sortBy} onChange={(e) => onSortByChange(e.target.value)}>
              <option value="priority">Priority</option>
            </select>
            <select className="w-1/2 bg-gray-600 rounded-lg py-1 text-center" value={options.sortOrder} onChange={(e) => onSortOrderChange(e.target.value)}>
              <option value="asc">Lowest to Highest</option>
              <option value="desc">Highest to Lowest</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  )
}
