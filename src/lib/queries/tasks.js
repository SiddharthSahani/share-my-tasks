"use server"
import { ID, Query } from "appwrite"
import { database } from "../appwrite"


export async function createTask(task, listId) {
    const data = {
        t : task.title,
        d : task.description,
        p : task.priority,
        c : task.completed,
        l : listId,
    }

    const doc = await database.createDocument(
        process.env.APPWRITE_DATABASE_ID,
        process.env.APPWRITE_TASKS_COLLECTION_ID,
        ID.unique(),
        data,
    )

    console.log(`LOG | createTask(OBJECT, "${listId}")`, JSON.stringify(task).length, JSON.stringify(doc).length)

    return doc.$id
}


export async function getTasks(listId) {
    const docs = await database.listDocuments(
        process.env.APPWRITE_DATABASE_ID,
        process.env.APPWRITE_TASKS_COLLECTION_ID,
        [
            Query.equal("l", listId),
            Query.select(["$id", "t", "d", "p", "c"]),
        ],
    )

    console.log(`LOG | getTasks("${listId}")`, JSON.stringify(docs).length)

    return docs.documents.map((doc) => {
        return {
            title: doc.t,
            description: doc.d,
            priority: doc.p,
            completed: doc.c,
            $id: doc.$id,
        }
    })
}


export async function updateTask(taskId, _data) {
    const data = {}
    if (_data.title !== undefined) { data.t = _data.title }
    if (_data.description !== undefined) { data.d = _data.description }
    if (_data.priority !== undefined) { data.p = _data.priority }
    if (_data.completed !== undefined) { data.c = _data.completed }
    if (_data.list !== undefined) { data.l = _data.list }

    const doc = await database.updateDocument(
        process.env.APPWRITE_DATABASE_ID,
        process.env.APPWRITE_TASKS_COLLECTION_ID,
        taskId,
        data,
    )

    console.log(`LOG | updateTask("${taskId}", OBJECT)`, JSON.stringify(data).length, JSON.stringify(doc).length)
}


export async function deleteTask(taskId) {
    const doc = await database.deleteDocument(
        process.env.APPWRITE_DATABASE_ID,
        process.env.APPWRITE_TASKS_COLLECTION_ID,
        taskId,
    )

    console.log(`LOG | deleteTask("${taskId}")`, JSON.stringify(doc).length)
}
