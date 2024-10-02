"use client"
import { TaskListList } from "@/components/TaskListList"
import { NotFound } from "@/components/NotFound"
import { getLists } from "@/lib/queries/lists"
import { getUserFromNickname } from "@/lib/queries/users"
import { useEffect, useState } from "react"


export default function Page({ params }) {
  const userNickname = params.user_nickname
  const [isMounted, setMounted] = useState(false)
  const [isLoading, setLoading] = useState(true)
  const [result, setResult] = useState(null)

  const init = async () => {
    const { userId, isOwner } = await getUserFromNickname(userNickname, "test@mail.com")
    if (!userId) {
      setResult({ error: `User name not found: ${userNickname}` })
      return
    }

    const lists = await getLists(userId, !isOwner)
    setResult({ isOwner, lists })
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
    return `Loading ${userNickname}'s lists`
  }

  if (result.error !== undefined) {
    // the user may not exist
    return <NotFound message={result.error} />
  }

  return (
    <>
      <h1 className="text-3xl text-center font-bold">{userNickname}'s Lists</h1>
      <TaskListList lists={result.lists} isOwner={result.isOwner} />
    </>
  )
}
