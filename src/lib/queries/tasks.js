"use server"
import { ID, Query } from "appwrite"
import { database } from "../appwrite"


export async function createTask(task, listId) {
    const doc = await database.createDocument(
        process.env.APPWRITE_DATABASE_ID,
        process.env.APPWRITE_TASKS_COLLECTION_ID,
        ID.unique(),
        {
            ...task,
            list: listId,
        },
    )

    console.log("SERVER-LOG", `createTask(OBJECT, "${listId}")`, JSON.stringify(task).length, JSON.stringify(doc).length)
    return doc.$id
}


export async function getTasks(listId) {
    const tasks = await database.listDocuments(
        process.env.APPWRITE_DATABASE_ID,
        process.env.APPWRITE_TASKS_COLLECTION_ID,
        [
            Query.equal("list", listId),
            Query.select(["$id", "title", "description", "priority", "completed"]),
        ],
    )

    console.log("SERVER-LOG", `getTasks("${listId}")`, JSON.stringify(tasks).length)
    return tasks.documents
}


export async function updateTask(taskId, data) {
    const doc = await database.updateDocument(
        process.env.APPWRITE_DATABASE_ID,
        process.env.APPWRITE_TASKS_COLLECTION_ID,
        taskId,
        data,
    )

    console.log("SERVER-LOG", `updateTask(OBJECT, "${taskId}")`, JSON.stringify(data).length, JSON.stringify(doc).length)
}


export async function deleteTask(taskId) {
    await database.deleteDocument(
        process.env.APPWRITE_DATABASE_ID,
        process.env.APPWRITE_TASKS_COLLECTION_ID,
        taskId,
    )

    console.log("SERVER-LOG", `deleteTask("${taskId}")`, 0)
}
