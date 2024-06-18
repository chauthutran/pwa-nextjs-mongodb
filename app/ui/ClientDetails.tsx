import { useEffect, useRef, useState } from "react";
import * as Utils from "@/app/lib/utils";
import { JSONObject } from "../lib/definitions";
import ClientForm from "./ClientForm";
import ActivityList from "./ActiviyList";
import ActivityForm from "./ActivityForm";
import useAppContext from "../contexts";
import * as Constant from "@/app/lib/constants";


export default function ClientDetailsForm ({ client, onUpdated }: {client: JSONObject, onUpdated: () => void}) {

    const [activeTab, setActiveTab] = useState('clientDetailsTab');
    const [showActivityForm, setShowActivityForm] = useState(false); 
    
    const handleTabClick = (tab: string) => {
        setActiveTab(tab);
    };

    return (
        <div className="max-w-xl mx-auto main-view">
            <div className="flex border-b border-gray-200">
                <button
                    onClick={() => handleTabClick('clientDetailsTab')}
                    className={`${
                        activeTab === 'clientDetailsTab'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    } flex-1 inline-block py-2 px-4 border-b-2 font-medium text-sm focus:outline-none`}
                >
                    Client Details
                </button>
                
                <button
                onClick={() => handleTabClick('activitiesTab')}
                className={`${
                    activeTab === 'activitiesTab'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } flex-1 inline-block py-2 px-4 border-b-2 font-medium text-sm focus:outline-none`}
                >
                    Activity
                </button>
                {/* Add more tabs as needed */} 
            </div>


            {/* // Content div */}
            <div className="p-4">
                {!showActivityForm && activeTab === 'clientDetailsTab' && <ClientForm client={client} handleOnUpdated={() => onUpdated()} handleCloseForm={() => {}} />}
                {!showActivityForm && activeTab === 'activitiesTab' && <ActivityList client={client}  handleOnUpdated={() => onUpdated()} />}
                {showActivityForm && <ActivityForm client={client}  handleOnUpdated={() => onUpdated()} 
                    handleOnClose={() => setShowActivityForm(false)}
                    /> }
            </div>

            {/* <!-- Floating Button --> */}
            { activeTab === 'activitiesTab' && !showActivityForm && <button className="fixed bottom-16 right-5 w-14 h-14 bg-sal bg-blue-500 hover:bg-blue-600 text-black rounded-full shadow-lg flex items-center justify-center text-2xl"
                onClick={()=> setShowActivityForm(true)}>
                +
            </button>}

           
        </div>
    )
}
