"use client"
import { TaskListList } from "@/components/TaskListList"
import { useEffect, useState } from "react"


export default function Page({ params }) {
  const userNickname = params.user_nickname
  const [taskLists, setTaskLists] = useState([])

  useEffect(() => {
    setTaskLists([
      {name: 'Learning Web Development', public: false},
      {name: 'Artificial Intelligence From Scratch', public: true},
      {name: 'Data Structures and Algorithms', public: false},
    ])
  })

  return (
    <>
      <h1 className="text-3xl text-center font-bold">{userNickname}'s List</h1>
      <TaskListList lists={taskLists} isOwner={false} />
    </>
  )
}
