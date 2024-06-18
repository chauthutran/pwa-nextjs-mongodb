"use client";

import { useState } from "react";
import { JSONObject } from "../lib/definitions";
import useAppContext from "../contexts";
import * as Constant from "../lib/constants";
import Alert from "./basics/Alert";
import * as Utils from "@/app/lib/utils";
import * as AppStore from '@/app/lib/appStorage';
import * as api from "../lib/api";


export default function ActivityForm({ client, activity = {} as JSONObject, handleOnUpdated = () => { }, handleOnClose = () => { } }: { client: JSONObject, activity?: JSONObject, handleOnUpdated: () => void, handleOnClose: () => void }) {

    const [activityData, setActivityData] = useState(activity);
    const [processing, setProcessing] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);


    const setValue = (propName: string, value: string) => {
        var tempData = JSON.parse(JSON.stringify(activityData));
        tempData[propName] = value;
        setActivityData(tempData);
    }

    const handleOnSaveClick = async(e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        setError(null);
        setProcessing(Constant.PROCESSING_ACTIVITY_SAVING);

        const response = await api.saveActivityData(client, activityData);
        if( response.success ) {
            Utils.findAndReplaceItemFromList(AppStore.getClientList()!, client._id, "_id", response.data!);
        }
        else {
            setError(response.message!);
        }

        setProcessing(Constant.PROCESSING_ACTIVITY_SAVED);

        handleOnUpdated();
        handleOnClose();
    }

    const handleOnCloseClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        handleOnClose();
    }

    const getTitle = () => {
        return (activityData == null) ? "Add Activity" : "Edit Activity";
    }

    return (
        <div className="w-full mx-auto mt-5 p-4 border border-gray-300 rounded-md shadow-md bg-white">
            {processing == Constant.PROCESSING_CLIENT_DATA_SAVED && error == null
                && <Alert type={Constant.ALERT_TYPE_INFO} message="Activity activityData is saved." />}
            {error != null && <Alert type={Constant.ALERT_TYPE_ERROR} message={error} />}

            <h2 className="text-2xl font-semibold mb-6 text-center">{getTitle()}</h2>
            <div className="mb-8">
                <label htmlFor="program" className="block text-sm font-medium text-gray-700">Program</label>
                <input
                    onChange={(e) => setValue("program", e.target.value)}
                    value={activityData["program"]}
                    id="program"
                    type="text"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 "
                />
            </div>

            <div className="mb-8">
                <label htmlFor="note" className="block text-sm font-medium text-gray-700">Note</label>
                <input
                    onChange={(e) => setValue("note", e.target.value)}
                    value={activityData["note"]}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 "
                    type="text"
                    id="note"
                />
            </div>

            <div className="flex items-center justify-between">
                <button
                    onClick={(e) => handleOnSaveClick(e)}
                    className={`w-2/3 mr-10 h-10 items-center rounded-lg bg-blue-500 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50`}>
                    Save
                </button>

                <button
                    onClick={(e) => handleOnCloseClick(e)}
                    className={`w-2/3 h-10 items-center rounded-lg bg-yellow-500 px-4 text-sm font-medium text-white transition-colors hover:bg-yellow-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-500 active:bg-yellow-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50`}>
                    Go back to the list
                </button>
            </div>
        </div>
    )
}
