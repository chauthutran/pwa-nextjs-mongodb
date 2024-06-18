"use client";

import { useEffect, useState } from "react";
import { JSONObject } from "../lib/definitions";
import Alert from "./basics/Alert";
import * as Constant from "@/app/lib/constants";
import { CiEdit } from "react-icons/ci";
import DateField from "./basics/DateField";
import { Button } from "./button";
import * as AppStore from '@/app/lib/appStorage';
import * as api from '@/app/lib/api';
import { FaSpinner } from "react-icons/fa6";
import * as Utils from "@/app/lib/utils";

export default function ClientForm({ client = {} as JSONObject, handleOnUpdated = () => { }, handleCloseForm = () => { }}) {

    const [data, setData] = useState<JSONObject>(client);
    const [processing, setProcessing] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const [allowToEdit, setAllowToEdit] = useState(client._id == undefined);

    
    const setValue = (propName: string, value: string | Date | null) => {
        console.log(data);
        var tempData = JSON.parse( JSON.stringify(data));
        if( value == null ) {
            tempData[propName] = "";
        }
        else if( value instanceof Date ) {
            tempData[propName] = value.toISOString();
        }
        else {
            tempData[propName] = value;
        }
        
        setData( tempData );
    }

    const handleOnSaveClick = async(e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setError(null);
        setProcessing(Constant.PROCESSING_CLIENT_DATA_SAVED);
        
        const response = await api.saveClientData(data);
        if( response.success ) {
            setProcessing(Constant.PROCESSING_CLIENT_DATA_SAVED);
            if( client._id != undefined ) { // Update case
                Utils.findAndReplaceItemFromList(AppStore.getClientList()!, client._id, "_id", response.data!);
                setAllowToEdit(false);
            }
            else { // Add case
                AppStore.addClientInList(response.data);
                handleOnUpdated();
            }
        }
        else {
            setError(response.message!);
        }
    }

    const handleOnCancelClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        
        if( client._id != undefined ) // For update an client, used in Details Client form
        { 
            setData(client);
            setAllowToEdit(false);
        }
        else if( handleCloseForm ){
            handleCloseForm();
        }
       
    }
      
    const getTitle = (): string => {
        if ( client._id ) {
            return ( allowToEdit ) ? "Edit Client" : "Client Details";
        }
        return "Add Client";
    }

    
    const birthDate = (data.birthdate != undefined) ? data.birthdate.substring(0,10) : "";

    return (
        <div className="w-full mx-auto mt-5 p-4 border border-gray-300 rounded-md shadow-md bg-white">

            { processing == Constant.PROCESSING_CLIENT_DATA_SAVED && error == null 
                && <Alert type={Constant.ALERT_TYPE_INFO} message="Client data is saved." />}

            {error != null &&  <Alert type={Constant.ALERT_TYPE_ERROR} message={error} />}

            <div className="relative flex items-center p-5">
                <h1 className="absolute left-1/2 transform -translate-x-1/2 text-2xl font-bold">{getTitle()}</h1>
                {!allowToEdit && <div className="ml-auto">
                    <CiEdit size={26} className="icon font-bold cursor-pointer" onClick={(e) => setAllowToEdit(true)}/>
                </div>}
            </div>
        
          <div className="mb-8">
            <label htmlFor="fullName" className="mb-3 mt-5 block text-xs font-medium text-gray-900">Full name <span className="text-red-600">*</span></label>
             <input 
                onChange={(e) => setValue("fullName", e.target.value)}
                value={data.fullName}
                id="fullName"
                type="text"
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-3 text-sm outline-2 placeholder:text-gray-500"
                placeholder="Name" 
                disabled={!allowToEdit}
            />
          </div>
          <div className="mb-8">
            <label htmlFor="birthdate" className="mb-3 mt-5 block text-xs font-medium text-gray-900" >Birthdate <span className="text-red-600">*</span></label>
            <DateField 
                id="birthdate"
                handleOnChange={(date: Date | null) => setValue("birthdate", date)}
                value={birthDate}
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-3 text-sm outline-2 placeholder:text-gray-500"
                placeholder="Name"
                disabled={!allowToEdit}
            />
          </div>
          <div className="mb-8">
            <label htmlFor="phone" className="mb-3 mt-5 block text-xs font-medium text-gray-900">Phone number</label>
            <input 
                onChange={(e) => setValue("phone", e.target.value)}
                value={data.phone}
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-3 text-sm outline-2 placeholder:text-gray-500"
                type="phone" 
                placeholder="Phone number" 
                disabled={!allowToEdit}
            />
          </div>

          {allowToEdit && <div className="flex items-center justify-between">

                <Button className="mt-4 w-2/5" onClick={ (e) => handleOnSaveClick(e) }>
                    <span className="w-[200px]">Save</span> 
                    
                    { processing == Constant.PROCESSING_CLIENT_DATA_SAVING && 
                        <FaSpinner className="ml-auto h-4 w-5 text-gray-50" /> }
                </Button>

                <Button className="mt-4 w-2/5 bg-yellow-400 text-center" style={{display: "inline"}} onClick={ (e) => handleOnCancelClick(e) }>
                    Cancel
                </Button>
            </div>}
      </div>
    )
}