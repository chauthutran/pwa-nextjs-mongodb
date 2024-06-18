"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useRouter } from 'next/router';
import * as Utils from "@/app/lib/utils";
import { checkLogin } from '../lib/api';
import { JSONObject } from '../lib/definitions';
import * as Contanst from "../lib/constants";

interface MainUiContextProps {
	mainUi: string;
	setMainUi: (uiName: string) => void;
}

const MainUiContext = createContext<MainUiContextProps>({
	mainUi: Contanst.UI_LOGIN_PAGE,
	setMainUi: (uiName: String) => {}
});

export const useMainUi = (): MainUiContextProps => {
	const context = useContext(MainUiContext);
	if (!context) {
	  throw new Error('useMainUi must be used within an MainUiProvider');
	}
	return context;
};

export const MainUiProvider = ({ children }: { children: ReactNode }) => {
	const [mainUi, setMainUi] = useState<string>(Contanst.UI_LOGIN_PAGE);

	return (
		<MainUiContext.Provider value={{ mainUi, setMainUi }}>
			{children}
		</MainUiContext.Provider>
	);
};
