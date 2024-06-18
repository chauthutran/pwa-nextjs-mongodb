"use server";

import { JSONObject, ResponseData } from "@/app/lib/definitions";
import * as Utils from '../utils';
import { findDocument, addDocument, updateDocument } from "../db";
import { v4 as uuidv4 } from 'uuid';


export const getClientList = async(): Promise<ResponseData> => {
    return await findDocument("clients", {});
}

export const saveClientData = async(clientData: JSONObject): Promise<ResponseData> => {
    if( clientData._id ) { // for update case
        return await updateDocument("clients", clientData);
    }
    
    // new case
    return await addDocument("clients", clientData);
}


export const saveActivityData = async (clientData: JSONObject, activityData: JSONObject): Promise<ResponseData> => {
    if (!activityData.id) {
        activityData.id = uuidv4();
        activityData.date = new Date();
        clientData.activities.push(activityData);
    }
    else {
        Utils.findAndReplaceItemFromList(clientData.activities, activityData.id, "id", activityData);
    }
    
    return await updateDocument("clients", clientData);
}

