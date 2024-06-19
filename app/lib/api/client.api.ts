"use server";

import { JSONObject, ResponseData } from "@/app/lib/definitions";
import * as Utils from '../utils';
import { findDocument, addDocument, updateDocument } from "@/app/lib/db";
import { v4 as uuidv4 } from 'uuid';


export const getClientList = async(): Promise<ResponseData> => {
    const response = await findDocument("clients", {});

    if( response.success) {
        let list = [];
        for( var i=0; i<response.data.length; i++ ) {
            let row = response.data[i];
            let client = row.data;
            client._id = row.id;
            list.push(client);
        }
        
        return {
            success: true,
            data: list
        }
    }
   
    return response;
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
        if( clientData.activities == undefined ) {
            clientData.activities = [];
        }
        clientData.activities.push(activityData);
    }
    else {
        Utils.findAndReplaceItemFromList(clientData.activities, activityData.id, "id", activityData);
    }
    
    return await updateDocument("clients", clientData);
}

