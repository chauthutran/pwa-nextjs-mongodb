"use client";

import * as Utils from "@/app/lib/utils";
import { useEffect, useState } from "react";
import ActivityForm from "./ActivityForm";
import { JSONObject } from "../lib/definitions";
import { useClients } from "../contexts/ClientContext";

export default function ActivityList({client}: {client: JSONObject}) {
    

	const { selectedClient } = useClients();
    const [selectedActivity, setSelectedActivity] = useState<JSONObject | null>(null);
    const [clientData, setClientData] = useState<JSONObject>(client);

    useEffect(() => {
		setClientData(selectedClient!);
	},[selectedClient])

    const list = clientData.activities;
    console.log(list);

    return (
        <div className="divMainList h-[calc(100vh-150px)] flex-1 content-start gap-1 overflow-x-auto border-spacing-2 scroll-m-1 rounded">
            {selectedActivity == null && list && list.length > 0 && list.map((t: JSONObject) => (
                <div 
                    key={`${t.id}`} 
                    onClick={(e) => setSelectedActivity(t)}
                    className="cursor-pointer p-4 border border-slate-300 m-3 flex justify-between items-start rounded bg-gray-200 text-gray-700 shadow-lg hover:bg-blue-200">
                    <div className="flex flex-row">
                        <div className="mx-5">
                            <div className="font-bold">{t.program}</div>
                            <div>{t.note}</div>
                            <div>{Utils.formatDate(new Date(t.date))}</div>
                        </div>
                    </div>
                </div>
            ))}

            {(selectedActivity == null && !list || list.length == 0 ) && <span className="text-red-600">[No any activity]</span>}
        
            {selectedActivity != null && <ActivityForm client={client} activity={selectedActivity}  handleOnClose={() => setSelectedActivity(null)}
            />}
        </div>
    )
}