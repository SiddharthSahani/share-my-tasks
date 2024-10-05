"use server"
import { Query } from "appwrite"
import { database } from "../appwrite"
import { deleteTasks } from "./tasks"


export async function getLists(userId, onlyPublic) {
    const queries = [
        Query.equal("u", userId),
        Query.select(["$id", "n", "p"]),
    ]
    if (onlyPublic) {
        queries.push(Query.equal("p", true))
    }

    const docs = await database.listDocuments(
        process.env.APPWRITE_DATABASE_ID,
        process.env.APPWRITE_LISTS_COLLECTION_ID,
        queries,
    )

    console.log(`LOG | getLists("${userId}", ${onlyPublic})`, JSON.stringify(docs).length)

    return docs.documents.map((doc) => {
        return {
            name: doc.n,
            public: doc.p,
            $id: doc.$id,
        }
    })
}


export async function getListFromName(userId, listName) {
    const docs = await database.listDocuments(
        process.env.APPWRITE_DATABASE_ID,
        process.env.APPWRITE_LISTS_COLLECTION_ID,
        [
            Query.equal("u", userId),
            Query.equal("n", listName),
            Query.select(["$id", "p"]),
        ],
    )

    console.log(`LOG | getListFromName("${userId}", "${listName}")`, JSON.stringify(docs).length)

    if (docs.total === 0) {
        return {
            listId: null,
            isPublic: false,
        }
    } else {
        return {
            listId: docs.documents[0].$id,
            isPublic: docs.documents[0].p,
        }
    }
}


export async function updateList(listId, _data) {
    const data = {}
    if (_data.name !== undefined) { data.n = _data.name }
    if (_data.public !== undefined) { data.p = _data.public }
    if (_data.user !== undefined) { data.u = _data.user }

    const doc = await database.updateDocument(
        process.env.APPWRITE_DATABASE_ID,
        process.env.APPWRITE_LISTS_COLLECTION_ID,
        listId,
        data,
    )

    console.log(`LOG | updateList("${listId}", OBJECT)`, JSON.stringify(data).length, JSON.stringify(doc).length)
}


export async function deleteList(listId) {
    const doc = await database.deleteDocument(
        process.env.APPWRITE_DATABASE_ID,
        process.env.APPWRITE_LISTS_COLLECTION_ID,
        listId,
    )

    console.log(`LOG | deleteList("${listId}")`, JSON.stringify(doc).length)

    await deleteTasks(listId)
}
