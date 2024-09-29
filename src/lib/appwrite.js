import { Client, Databases } from "appwrite"


export const client = new Client()
client.setProject(process.env.APPWRITE_PROJECT_ID)

export const database = new Databases(client)
