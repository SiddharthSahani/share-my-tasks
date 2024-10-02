"use client"
import { NotFound } from "@/components/NotFound"
import { TaskList } from "@/components/TaskList"
import { getListFromName } from "@/lib/queries/lists"
import { getTasks } from "@/lib/queries/tasks"
import { getUserFromNickname } from "@/lib/queries/users"
import { useEffect, useState } from "react"


export default function Page({ params }) {
  const userNickname = params.user_nickname
  const listName = params.list_name
  const [isMounted, setMounted] = useState(false)
  const [isLoading, setLoading] = useState(true)
  const [result, setResult] = useState(null)

  const init = async () => {
    const { userId, isOwner } = await getUserFromNickname(userNickname, "test@mail.com")
    if (!userId) {
      setResult({ error: `User name not found: ${userNickname}` })
      return
    }

    const { listId, isPublic } = await getListFromName(userId, listName.replace('-', " "))
    if (!listId) {
      setResult({ error: `List not found: ${listName}` })
      return
    }
    if (!isPublic) {
      setResult({ error: `List not public: ${listName}` })
      return
    }

    const tasks = await getTasks(listId)
    console.log(tasks)
    setResult({ listId, tasks, isOwner })
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (isMounted) {
      init().then(() => setLoading(false))
    }
  }, [isMounted])

  if (isLoading) {
    return `Loading ${userNickname}'s list ${listName}`
  }

  if (result.error !== undefined) {
    // the user may not exist
    // the list may not exist
    // the list is not public
    return <NotFound message={result.error} />
  }

  return (
    <>
      <h1 className="text-3xl text-center font-bold">{userNickname}'s {listName}</h1>
      <TaskList
        allTasks={result.tasks}
        editable={result.isOwner}
        toggleStatusHandler={(tid) => console.log("Toggled", tid)}
        deleteTaskHandler={(tid) => console.log("Deleted", tid)}
      />
    </>
  )
}
