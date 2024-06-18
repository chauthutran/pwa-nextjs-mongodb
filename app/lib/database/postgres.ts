import { sql } from '@vercel/postgres';
import { JSONObject, ResponseData } from '../definitions';
 
export const findData = async(table: string, payload: JSONObject): Promise<ResponseData> => {
    const data = await sql` SELECT * FROM ${table}`;

    return {
        success: true,
        data
    }
}