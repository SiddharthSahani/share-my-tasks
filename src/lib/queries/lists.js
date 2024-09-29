"use server"
import { ID, Query } from "appwrite"
import { database } from "../appwrite"


export async function createList(list, userId) {
    await database.createDocument(
        process.env.APPWRITE_DATABASE_ID,
        process.env.APPWRITE_LISTS_COLLECTION_ID,
        ID.unique(),
        {
            ...list,
            user: userId,
        },
    )
}


export async function getLists(userId, onlyPublic) {
    const queries = [
        Query.equal("user", userId),
        Query.select(["$id", "name", "public"]),
    ]
    if (onlyPublic) {
        queries.push(Query.equal("public", true))
    }

    const lists = await database.listDocuments(
        process.env.APPWRITE_DATABASE_ID,
        process.env.APPWRITE_LISTS_COLLECTION_ID,
        queries,
    )

    console.log(`getLists(${userId}, ${onlyPublic})`, JSON.stringify(lists).length)
    return lists
}


export async function updateList(listId, data) {
    await database.updateDocument(
        process.env.APPWRITE_DATABASE_ID,
        process.env.APPWRITE_LISTS_COLLECTION_ID,
        listId,
        data,
    )
}


export async function deleteList(listId) {
    await database.deleteDocument(
        process.env.APPWRITE_DATABASE_ID,
        process.env.APPWRITE_LISTS_COLLECTION_ID,
        listId,
    )
}
