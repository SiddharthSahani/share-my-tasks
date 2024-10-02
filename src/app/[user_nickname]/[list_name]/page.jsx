"use client"
import { NewTaskForm } from "@/components/NewTaskForm"
import { NotFound } from "@/components/NotFound"
import { TaskList } from "@/components/TaskList"
import { getListFromName } from "@/lib/queries/lists"
import { createTask, getTasks, updateTask, deleteTask } from "@/lib/queries/tasks"
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

  const addTaskHandler = async (task) => {
    const taskId = await createTask(task, result.listId)
    setResult({...result, tasks: [...result.tasks, {$id: taskId, ...task}]})
  }

  const toggleTaskHandler = async (task) => {
    await updateTask(task.$id, {completed: !task.completed})
    task.completed = !task.completed
    setResult({...result, tasks: [...result.tasks]})
  }

  const deleteTaskHandler = async (task) => {
    await deleteTask(task.$id)
    result.tasks = result.tasks.filter((other) => other.$id !== task.$id)
    setResult({...result, tasks: [...result.tasks]})
  }

  return (
    <>
      <h1 className="text-3xl text-center font-bold">{userNickname}'s {listName}</h1>
      {
        result.isOwner && <NewTaskForm addTaskHandler={addTaskHandler} />
      }
      <TaskList
        allTasks={result.tasks}
        editable={result.isOwner}
        toggleStatusHandler={toggleTaskHandler}
        deleteTaskHandler={deleteTaskHandler}
      />
    </>
  )
}
