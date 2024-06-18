"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import * as Utils from "@/app/lib/utils";
import * as api from '../lib/api';
import * as Constant from '../lib/constants';
import { JSONObject, ResponseData } from '../lib/definitions';

interface ClientContextProps {
	clientList: JSONObject[] | null;
    processing: string;
    saveClient: (client: JSONObject) => Promise<void>;
	setSelectedClient: (clientId: string) => void;
    saveActivity: (client: JSONObject, activity: JSONObject) => Promise<void>;
	clientError: string | null;
	selectedClient: JSONObject | null;
}

const ClientContext = createContext<ClientContextProps>({
	clientList: null,
    saveClient: async () => { },
    setSelectedClient: () => { },
    saveActivity: async () => { },
    processing: "",
	clientError: null,
	selectedClient: null
});

export const useClients = (): ClientContextProps => {
	const context = useContext(ClientContext);
	if (!context) {
	  throw new Error('useClients must be used within a ClientProvider');
	}
	return context;
};

export const ClientProvider = ({ children }: { children: ReactNode }) => {
	const [clientList, setClientList] = useState<JSONObject[] | null>(null);
	const [selectedClientData, setSelectedClientData] = useState<JSONObject | null>(null);
	const [processing, setProcessing] = useState<string>("");
	const [error, setError] = useState<string | null>(null);

	
	useEffect(() => {
		fetchClientList()
	}, []);
	
	const fetchClientList = async () => {
		setProcessing(Constant.PROCESSING_CLIENT_LIST_LOADING);
		setError(null);
		try {
			const responseData: ResponseData = await api.getClientList();
			if (responseData.success) {
                setClientList(responseData.data);
            }
            else {
                setClientList(null);
				setError(responseData.message!);
            }

		} catch (err) {
			setError(Utils.getErrMessage(err));
		} finally {
			setProcessing(Constant.PROCESSING_CLIENT_LIST_LOADED);
		}
	};

	const saveClient = async(clientData: JSONObject) => {
		try {
			setProcessing(Constant.PROCESSING_CLIENT_DATA_SAVING);

			const responseData: ResponseData = await api.saveClientData(clientData);

			const tempList = Utils.cloneJSONObject(clientList!);
			const found = Utils.findItemFromList(tempList, clientData._id, "_id");

			if( !found ) {
				tempList.push(responseData.data);
			}
			else {
				Utils.findAndReplaceItemFromList( tempList, clientData._id, "_id", responseData.data );
			}
			
			if (responseData.success) {
                setClientList(tempList);
				setSelectedClientData(responseData.data);
				setError(null);
            }
            else {
				setError(responseData.message!);
            }
			

		} catch (err) {
			setError(Utils.getErrMessage(err));
		} finally {
			setProcessing(Constant.PROCESSING_CLIENT_DATA_SAVED);
		}
	}
	
	const setSelectedClient = (clientId: string) => {
		const found = Utils.findItemFromList(clientList!, clientId, "_id");
		setSelectedClientData(found);
	}

	const saveActivity = async(clientData: JSONObject, activityData: JSONObject) => {
		setProcessing(Constant.PROCESSING_ACTIVITY_SAVING);

		try {
			const responseData: ResponseData = await api.saveActivityData(clientData, activityData);
			const tempList = Utils.cloneJSONObject(clientList!);

			if (responseData.success) {
				Utils.findAndReplaceItemFromList( tempList, clientData._id, "_id", responseData.data );
                setClientList(tempList);
				if( selectedClientData != null ) {
					setSelectedClientData(responseData.data);
				}
				setError(null);
				
            }
            else {
				setError(responseData.message!);
            }

		} catch (err) {
			setError(Utils.getErrMessage(err));
		} finally {
			setProcessing(Constant.PROCESSING_ACTIVITY_SAVED);
		}
	}

	return (
		<ClientContext.Provider value={{ clientList, selectedClient: selectedClientData, setSelectedClient, saveClient, saveActivity, processing, clientError: error }}>
			{children}
		</ClientContext.Provider>
	);
};
