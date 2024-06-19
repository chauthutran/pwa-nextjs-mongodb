import * as Utils from '@/app/lib/utils';
import { sql, createClient } from '@vercel/postgres';
import { JSONObject, ResponseData } from '@/app/lib/definitions';

// const client = createClient();


export const findDocument = async (tableName: string, payload: JSONObject): Promise<ResponseData> => {
	const client = createClient();
	await client.connect();
	client.on('error', (err) => {
		console.error('something bad has happened!', err.stack)
	});
	
	try {
		let where = Object.entries(payload).map(([key, value]) => `${key} = '${value}'`);
		let whereCond = "";
		if (where.length > 0) {
			whereCond += " where ";
			whereCond += (where.length > 1) ? where.join(" AND ") : where[0];
		}

		const { rows, fields } = await client.query(`SELECT * FROM ${tableName} ${whereCond} `);
		// const { rows, fields } = await client.query(`SELECT * FROM clients`);

		return {
			success: true,
			data: rows
		}
	}
	catch (ex) {
		console.log(ex);
		return {
			success: false,
			message: "ERROR"
		}
	}
	finally {
		await client.end();
	}

}


export const addDocument = async ( tableName: string,  payloadJson: JSONObject): Promise<ResponseData> => {
	const client = createClient();
	await client.connect();
	client.on('error', (err) => {
		return {
			success: false,
			message: `something bad has happened! ${err.stack}`
		}
	});

	try {
		const clientData = Utils.cloneJSONObject(payloadJson);

		const result = await sql`
			  INSERT INTO ${tableName} (data)
			  VALUES ('${clientData}')
			`;
			
			return {
				success: true,
				data: result
			}
	}
	catch (ex) {
		console.log(ex);
		return {
			success: false,
			message: "ERROR"
		}
	}
	finally {
		await client.end();
	}
}


export const updateDocument = async (tableName: string, payload: JSONObject): Promise<ResponseData> => {
	const client = createClient();
	await client.connect();
	client.on('error', (err) => {
		console.error('something bad has happened!', err.stack)
	});
	
	try {
		const tempPayload = Utils.cloneJSONObject(payload);
		const id = tempPayload._id;
		delete tempPayload._id;
		
		const result = await client.query(`
				 UPDATE ${tableName}
				SET data = '${JSON.stringify(tempPayload)}'::jsonb
				WHERE id = ${id}
			`);

		return {
			success: true,
			data: payload
		}
	}
	catch (ex) {
		console.log(ex);
		return {
			success: false,
			message: "ERROR"
		}
	}
	finally {
		await client.end();
	}

}