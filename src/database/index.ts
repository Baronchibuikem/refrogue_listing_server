import { MongoClient } from "mongodb"
import { Database } from "../lib/types"
const url = `mongodb://localhost/tinyhousedb`;


export const connectDatabase = async (): Promise<Database> => {
    const client = await MongoClient.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
      const db = client.db('tinyhousedb')

      return {
        listings: db.collection("testing")
      };
}
