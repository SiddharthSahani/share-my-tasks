"use server"
import { ID, Query } from "appwrite"
import { database } from "../appwrite"


export async function createTask(task, listId) {
    await database.createDocument(
        process.env.APPWRITE_DATABASE_ID,
        process.env.APPWRITE_TASKS_COLLECTION_ID,
        ID.unique(),
        {
            ...task,
            list: listId,
        },
    )
}


export async function getTasks(listId) {
    return await database.listDocuments(
        process.env.APPWRITE_DATABASE_ID,
        process.env.APPWRITE_TASKS_COLLECTION_ID,
        [
            Query.equal("list", listId),
            Query.select(["$id", "title", "description", "priority", "completed"]),
        ],
    )
}


export async function updateTask(taskId, data) {
    await database.updateDocument(
        process.env.APPWRITE_DATABASE_ID,
        process.env.APPWRITE_TASKS_COLLECTION_ID,
        taskId,
        data,
    )
}


export async function deleteTask(taskId) {
    await database.deleteDocument(
        process.env.APPWRITE_DATABASE_ID,
        process.env.APPWRITE_TASKS_COLLECTION_ID,
        taskId,
    )
}
