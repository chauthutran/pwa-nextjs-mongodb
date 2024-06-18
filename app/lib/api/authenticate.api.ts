"use server";

import { JSONObject, ResponseData } from "@/app/lib/definitions";
import * as Utils from "../utils";
import { findData } from "../database";

export const checkLogin = async(username: string, pin: string): Promise<JSONObject | null> => {
    
    const response = await findData( "users", { username, pin } );
    
    return ( response.success!= null && response.data.length > 0 ) ? response.data[0] : null;
}