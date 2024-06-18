import { JSONObject } from "./definitions";
import * as Utils from "@/app/lib/utils";


let user: JSONObject | null = null;
let clients: JSONObject[] | null = null;
let selectedClientId: string = "";

export const setUser = (userData: JSONObject | null) => {
    user = userData;
}

export const getUser = (): JSONObject | null => {
    return user;
}


export const setClientList = (clientList: JSONObject[] | null) => {
    clients = clientList;
}

export const getClientList = (): JSONObject[] | null => {
    return clients;
}

export const addClientInList = (client: JSONObject) => {
    if( clients!= null ) clients.push(client);
}

export const setSelectedClient = (clientId: string) => {
    selectedClientId = clientId;
} 

export const getSelectedClient = () : JSONObject | null => {
    return getClientById(selectedClientId);
//    return ( clients == null ) ? null : Utils.findItemFromList(clients, selectedClientId, "_id");
}

export const getClientById = (clientId: string) : JSONObject | null => {
    return ( clients == null ) ? null : Utils.findItemFromList(clients, clientId, "_id");
}
 