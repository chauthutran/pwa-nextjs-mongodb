import { useEffect, useState } from "react";
import { JSONObject } from "../lib/definitions";
import ClientForm from "./ClientForm";
import ActivityList from "./ActiviyList";
import ActivityForm from "./ActivityForm";
import { useClients } from "../contexts/ClientContext";


export default function ClientDetailsForm ({ client }: {client: JSONObject}) {
    
	const { selectedClient } = useClients();

    const [activeTab, setActiveTab] = useState('clientDetailsTab');
    const [showActivityForm, setShowActivityForm] = useState(false); 
	const [clientData, setClientData] = useState<JSONObject>(client);

    useEffect(() => {
		setClientData(selectedClient!);
	},[selectedClient]);

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
                {!showActivityForm && activeTab === 'clientDetailsTab' && <ClientForm client={clientData} handleCloseForm={() => {}} />}
                {!showActivityForm && activeTab === 'activitiesTab' && <ActivityList client={clientData} />}
                {showActivityForm && <ActivityForm client={clientData} handleOnClose={() => setShowActivityForm(false)}
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
