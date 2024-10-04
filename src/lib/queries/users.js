"use server"
import { Query } from "appwrite"
import { database } from "../appwrite"


export async function getUserFromNickname(nickname, viewerEmail) {
    const docs = await database.listDocuments(
        process.env.APPWRITE_DATABASE_ID,
        process.env.APPWRITE_USERS_COLLECTION_ID,
        [
            Query.equal("n", nickname),
            Query.select(["$id", "e"]),
        ],
    )

    console.log(`LOG | getUserFromNickname("${nickname}", "${viewerEmail}")`, JSON.stringify(docs).length)

    // no user with that nickname
    if (docs.total === 0) {
        return {
            userId: null,
            isOwner: false,
        }
    }

    if (viewerEmail) {
        // check if the viewer is the owner
        return {
            userId: docs.documents[0].$id,
            isOwner: docs.documents[0].e === viewerEmail,
        }
    } else {
        return {
            userId: docs.documents[0].$id,
            isOwner: false,
        }
    }
}
