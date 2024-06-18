import * as Constant from '@/app/lib/constants';
import { JSONObject, ResponseData } from "../definitions";
import * as Mongodb from "./mongo";
import * as Postgres from "./postgres";

let databaseOpt = Constant.DB_MONGO;

export const findData = async( colectionName: string, payloadJson: JSONObject): Promise<ResponseData> => {
    if( databaseOpt = Constant.DB_MONGO ) {
        return Mongodb.findDocument(colectionName, payloadJson);
    }
    return Postgres.findData( colectionName, payloadJson );

    // return Mongodb.findDocument(colectionName, payloadJson);
}

export const setDatabase = (dbOpt: string) => {
    setDatabase( dbOpt );
}