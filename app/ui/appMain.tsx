'use client';

import LoginForm from "./login-form";
import Listing from "./listing";
import SectionTop from "./sectionTop";
import useAppContext from "../contexts";
import * as Constant from "@/app/lib/constants";
import ClientForm from "./ClientForm";
import Footer from "./Footer";
import ClientDetailsForm from "./ClientDetails";
import * as AppStore from '@/app/lib/appStorage';
import { useState } from "react";

export default function AppMain() {

	const { mainUi, setMainUi } = useAppContext();

	const [refreh, setRefresh] = useState(false);
	const handleOnUpdate = () => {
		// setClientData( AppStore.getClientById(client._id)! );
		setRefresh(!refreh);
	}

	console.log( 'AppMain Rendering: ' );

	return (
		<div className="divMain">
			
			{(mainUi != Constant.UI_LOGIN_PAGE ) && 
				<>
					<SectionTop></SectionTop>
					{mainUi == Constant.UI_CLIENT_LIST && <>
						<Listing></Listing>
						
					</>}

					{mainUi == Constant.UI_CLIENT_DETAILS && <ClientDetailsForm client={AppStore.getSelectedClient()!} onUpdated={() => handleOnUpdate()}/>}

					{mainUi == Constant.UI_ADD_CLIENT_FORM && <ClientForm handleCloseForm={() => setMainUi(Constant.UI_CLIENT_LIST)} /> }
				</>}
				
			
			{(mainUi == Constant.UI_LOGIN_PAGE ) && <>
				<div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-6 sm:py-12">
					<div className="relative bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10">
						<LoginForm></LoginForm>
					</div>
				</div>
			</>}

			<Footer />

		</div>
	);
}