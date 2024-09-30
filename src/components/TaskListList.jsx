import Link from "next/link";

export function TaskListList({ lists, isOwner }) {
  return (
    <div className="bg-[#2d3746] rounded-xl px-2 py-1">
      {
        lists.length ?
        lists.map((list, index) => (
          <div key={index} className="bg-cyan-600 rounded-xl my-2 flex px-2 py-2">
            <Link href={`${location.pathname}/${list.$id}`} className="w-9/12 flex my-4 items-center justify-center">
              <div className="w-3/12 text-2xl font-semibold">List Name:</div>
              <div className="w-9/12 text-2xl">{list.name}</div>
            </Link>
            {
              isOwner &&
              <div className="w-3/12 flex">
                <button className='w-2/3 bg-cyan-700 mr-3 rounded-lg text-lg'>
                  Status:
                  <div className={`text-xl ${list.public ? "text-green-300" : "text-rose-300"}`}>
                  {
                    list.public ? "Public" : "Private"
                  }
                  </div>
                </button>
                <button className='w-1/3 bg-rose-500 text-xl rounded-lg' >Delete</button>
              </div>
            }
          </div>
        )) :
        isOwner ?
        <i className="p-4">You do not have any list</i> :
        <i className="p-4">User does not have any public list</i>
      }
    </div>
  )
}
