import * as Utils from '@/app/lib/utils';
import { JSONObject, ResponseData } from './definitions';
import { MongoClient, ServerApiVersion, ObjectId } from "mongodb";

import { v4 as uuidv4 } from 'uuid';


const MONGODB_URI = process.env.MONGODB_URI as string;
const MONGODB_DB = process.env.MONGODB_DB as string;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

if (!MONGODB_DB) {
  throw new Error('Please define the MONGODB_DB environment variable inside .env.local');
}

let cachedClient: MongoClient | null = null;
let cachedDb: any = null;

export const connectToDatabase = async() => {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const client = new MongoClient( MONGODB_URI, {
		serverApi: {
			version: ServerApiVersion.v1,
			strict: true,
			deprecationErrors: true,
		}
	} );

  await client.connect();
  const db = client.db(MONGODB_DB);

  cachedClient = client;
  cachedDb = db;

  return { client, db };
}


export const findDocument = async(colectionName: string, payloadJson: JSONObject): Promise<ResponseData> => {
  		var docs: JSONObject[] = [];

		try {
			const { db } = await connectToDatabase();
			
			
			// const options = {
			// 	// Sort returned documents in ascending order by title (A->Z)
			// 	sort: { _id: 1 }
			//   };
			// Query for collection
			// const cursor = collection.find(payloadJson.payload, options);

			// Query for collection
			const cursor = await db.collection(colectionName).find(payloadJson);
			for await (const doc of cursor) {
				docs.push(doc);
			}

			return {
				success: true,
				data: Utils.converDbObjectToJson(docs)
			}
		}
		catch(ex) {
			return {
				success: false,
				message: Utils.getErrMessage(ex)
			}
		} 
}


export const addDocument = async(colectionName: string, payloadJson: JSONObject) : Promise<ResponseData> => {
	try {
		const { db } = await connectToDatabase();

		var doc = await db.collection(colectionName).insertOne(payloadJson);
		payloadJson._id = doc.insertedId;

		return {
			success: true,
			data: payloadJson
		}
	}
	catch(ex) {
		return {
			success: false,
			message: Utils.getErrMessage(ex)
		}
	} 
}

/**
 * 
 * @param colectionName 
 * @param payloadJson {"_id": "xxx", firstName": "test1", "lastName": "last1", email": "xxxxx", "password": "yyyy"}
 * @returns 
 */
export const updateDocument = async(colectionName: string, payloadJson: JSONObject) : Promise<ResponseData> =>{
	
	try {
		const { db } = await connectToDatabase();
		
		// Create a filter for movies with the title "Random Harvest"
		const filter = { _id: new ObjectId(payloadJson._id) };
		// /* Set the upsert option to insert a document if no documents match the filter */
		// const options = { upsert: true };
		// Specify the update to set a value for the plot field
		// Ensure the _id field is not included in the update data
		let tempPayload = Utils.cloneJSONObject(payloadJson);
		delete tempPayload._id;
		const updateDoc = { $set: tempPayload };
		// Update the first document that matches the filter
		// const doc = await  db.collection(colectionName).updateOne(filter, updateDoc, options);
		const doc = await db.collection(colectionName).updateOne(filter, updateDoc);
		 
		return {
			success: true,
			data: payloadJson
		}
	}
	catch(ex) {
		return {
			success: false,
			message: Utils.getErrMessage(ex)
		}
	} 
}