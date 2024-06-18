'use client';

import { useEffect, useState } from "react";
import ClientCard from "./clientCard";
import { JSONObject } from "../lib/definitions";
import * as Constant from '../lib/constants';
import { FaSpinner } from 'react-icons/fa';
import * as api from '@/app/lib/api';
import * as Utils from '@/app/lib/utils';
import { useMainUi } from "../contexts/MainUiContext";
import { useClients } from "../contexts/ClientContext";

export default function Listing() { 

	const { processing, setSelectedClient, clientList } = useClients();
	const { setMainUi } = useMainUi();

	// const [loading, setLoading] = useState(false);

	const handleOnShowAddClientForm = () => {
		// setSelectedClient("");
		setMainUi(Constant.UI_ADD_CLIENT_FORM);
	}

	return (
	<div className="overflow-hidden">

		{ processing == Constant.PROCESSING_CLIENT_LIST_LOADING && <FaSpinner className="text-9xl" /> }
			
		<div className="divMiddleContent flex">
			<div className="divSiceNav w-10 hidden bg-gray-700 text-gray-300 p-1">m1</div>
				<div className="divMainList m-1 grid h-[calc(100vh-90px)] flex-1 content-start gap-1 overflow-x-auto border-0 border-gray-400 md:grid-cols-2">
					{ clientList != null && clientList?.map( (client: JSONObject, index: number) => (
							<ClientCard key={client._id} client={client}  />
						))
					}
				</div>
			</div>
			
			{/* <!-- Floating Button --> */}
			<button className="fixed bottom-16 right-5 w-14 h-14 bg-sal bg-yellow-500 hover:bg-yellow-600 text-black rounded-full shadow-lg flex items-center justify-center text-2xl"
				onClick={()=> handleOnShowAddClientForm()}> + </button>
			
	</div>
	);
}