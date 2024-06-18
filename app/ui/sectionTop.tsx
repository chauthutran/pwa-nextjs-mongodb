'use client';

import { IoMenuOutline } from "react-icons/io5";
import Modal from "./modal";
import { useState } from "react";
import useAppContext from "../contexts";
import * as Constant from "@/app/lib/constants";
import * as AppStore from '@/app/lib/appStorage';
import { IoMdArrowRoundBack } from "react-icons/io";


export default function SectionTop() {

	const { mainUi, setMainUi } = useAppContext();
	
	const [isVisible, setIsVisible] = useState<boolean>(false);

	const handleOnLogout = () => {
		const ok = confirm("Are you sure you want to log-out ?");
		if( ok ) {
			AppStore.setUser(null);
			setMainUi(Constant.UI_LOGIN_PAGE);
		}
	}
	const onClose = () => {
		setIsVisible(false);
	};

	return (
		<>
			<div className="divTopNav h-[50px] bg-blue-700 p-1 grid grid-cols-2">
				<div className="flex justify-start items-center">
					{mainUi == Constant.UI_CLIENT_LIST && <IoMenuOutline className="text-2xl font-bold cursor-pointer hover:bg-blue-500" onClick={(e) => setIsVisible(true)} />}
					{mainUi != Constant.UI_CLIENT_LIST && <IoMdArrowRoundBack  className="text-2xl font-bold cursor-pointer hover:bg-blue-500" onClick={(e) => setMainUi(Constant.UI_CLIENT_LIST)} />}
					<div className="text-white ml-2 font-light"><span>[ {AppStore.getUser()?.username} ]</span></div>
				</div>
				<div>
				</div>
			</div>
			<Modal isVisible={isVisible} onClose={onClose}>
				<div className="w-1/3 min-w-[150px] h-screen bg-white p-1 absolute left-0 top-0">
					<div className="flex justify-end">
						<div className="inline-block ml-2 hover:bg-blue-200 p-1 cursor-pointer font-bold " onClick={(e) => onClose()}>X</div>
					</div>
					<div className="grid gap-2 p-1">
						<div className="cursor-pointer rounded-md bg-blue-100 p-2 text-sm font-semibold text-gray-600 shadow-md hover:bg-blue-200">Client list</div>
						<div className="cursor-pointer rounded-md bg-blue-100 p-2 text-sm font-semibold text-gray-600 shadow-md hover:bg-blue-200" onClick={() => handleOnLogout()}>Logout</div>
					</div>
				</div>
			</Modal>
		</>
	);
};

/*function SidebarItem( ) {
	return (
		<></>
	);
}*/