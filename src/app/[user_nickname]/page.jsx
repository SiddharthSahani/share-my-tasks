"use client"
import { TaskListList } from "@/components/TaskListList"
import { getLists } from "@/lib/queries/lists"
import { getUserFromNickname } from "@/lib/queries/users"
import { useEffect, useState } from "react"


export default function Page({ params }) {
  const userNickname = params.user_nickname
  const [isMounted, setMounted] = useState(false)
  const [isLoading, setLoading] = useState(true);
  const [result, setResult] = useState({
    isOwner: null,
    lists: null,
  })

  const init = async () => {
    const { userId, isOwner } = await getUserFromNickname(userNickname, "test@mail.com")
    if (!userId) {
      return
    }

    result.isOwner = isOwner
    result.lists = await getLists(userId, !isOwner)
    setResult({ ...result })
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (isMounted) {
      init().then(() => setLoading(false))
    }
  }, [isMounted])

  return (
    <>
      <h1 className="text-3xl text-center font-bold">{userNickname}'s Lists</h1>
      {
        isLoading ?
        "loading..." :
        <TaskListList lists={result.lists} isOwner={result.isOwner} />
      }
    </>
  )
}
