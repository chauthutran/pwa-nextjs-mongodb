import { sql, createClient } from '@vercel/postgres';
import { JSONObject, ResponseData } from '../definitions';
 
// const client = createClient();

export const findData = async(table: string, payload: JSONObject): Promise<ResponseData> => {

    try {
        // await client.connect();

        const data = await sql` SELECT * FROM ${table}`;

        return {
            success: true,
            data
        }
    }
    catch(ex) {
        return {
            success: false,
            message: "ERROR"
        }
    }
    
}