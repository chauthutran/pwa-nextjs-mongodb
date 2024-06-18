'use client';

import { useEffect, useRef, useState } from "react";
import ClientCard from "./clientCard";
import SectionTop from "./sectionTop";
import { JSONObject } from "../lib/definitions";
import * as Constant from '../lib/constants';
import { FaSpinner } from 'react-icons/fa';
import * as AppStore from '@/app/lib/appStorage';
import * as api from '@/app/lib/api';
import * as Utils from '@/app/lib/utils';
import useAppContext from "../contexts";
import ClientForm from "./ClientForm";

export default function Listing() {

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [clientList, setClientList] = useState(AppStore.getClientList());

	const { mainUi, setMainUi } = useAppContext();

	const fetchClientList = async() => {
		try {
			setLoading(true);
			const response = await  api.getClientList()
			if (!response.success) {
				setError('Network response was not ok');
			}

			AppStore.setClientList(response.data);
			setClientList(response.data);
			
		} catch (ex) {
			setError( Utils.getErrMessage(ex) );
		} finally {
			setLoading(false);
		}
	}
	
	useEffect(() => {
		if( AppStore.getClientList() == null ) {
			fetchClientList();
		}
	}, [])


	return (
	<div className="overflow-hidden">

		{ loading && <FaSpinner className="text-9xl" /> }
			
		{(!loading  ) && <div className="divMiddleContent flex">
			<div className="divSiceNav w-10 hidden bg-gray-700 text-gray-300 p-1">m1</div>
				<div className="divMainList m-1 grid h-[calc(100vh-90px)] flex-1 content-start gap-1 overflow-x-auto border-0 border-gray-400 md:grid-cols-2">
					{ clientList != null && clientList?.map( (client: JSONObject, index: number) => (
							<ClientCard key={client._id} client={client}  />
						))
					}
				</div>
			</div> }

			
			{/* <!-- Floating Button --> */}
			<button className="fixed bottom-16 right-5 w-14 h-14 bg-sal bg-yellow-500 hover:bg-yellow-600 text-black rounded-full shadow-lg flex items-center justify-center text-2xl"
				onClick={()=> setMainUi(Constant.UI_ADD_CLIENT_FORM)}> + </button>
			
		{/* <div className="divBottomTop h-[30px] bg-gray-900 p-1 text-xs text-white">Version 1.2.0</div> */}
	</div>
	);
}