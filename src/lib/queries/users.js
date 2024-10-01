"use server"
import { ID, Query } from "appwrite"
import { database } from "../appwrite"


export async function createUser(user) {
    await database.createDocument(
        process.env.APPWRITE_DATABASE_ID,
        process.env.APPWRITE_USERS_COLLECTION_ID,
        ID.unique(),
        user,
    )
}


export async function getUserFromNickname(nickname, viewerEmail) {
    const docs = await database.listDocuments(
        process.env.APPWRITE_DATABASE_ID,
        process.env.APPWRITE_USERS_COLLECTION_ID,
        [
            Query.equal("nickname", nickname),
            Query.select(["$id", "email"]),
        ],
    )
    console.log(`getUserFromNickname(${nickname}, ${viewerEmail})`, JSON.stringify(docs).length)

    if (docs.total === 0) {
        return {
            userId: null,
            isOwner: false,
        }
    }

    if (viewerEmail) {
        return {
            userId: docs.documents[0].$id,
            isOwner: docs.documents[0].email === viewerEmail,
        }
    } else {
        return {
            userId: docs.documents[0].$id,
            isOwner: false,
        }
    }
}
