"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useRouter } from 'next/router';
import * as Utils from "@/app/lib/utils";
import { checkLogin } from '../lib/api';
import { JSONObject } from '../lib/definitions';

interface AuthContextProps {
	user: JSONObject | null;
	login: (username: string, pin: string) => Promise<void>;
	logout: () => void;
	loading: boolean;
	authError: string | null;
}

const AuthContext = createContext<AuthContextProps>({
	user: null,
	login: async () => { },
	logout: () => { },
	loading: false,
	authError: null,
});

export const useAuth = (): AuthContextProps => {
	const context = useContext(AuthContext);
	if (!context) {
	  throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<any>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	const login = async (username: string, pin: string) => {
		setLoading(true);
		setError(null);
		try {
			const userData = await checkLogin(username, pin);
			if (userData) { // Login successfully
                setUser(userData);
            }
            else {
				setError("Login failed");
            }

		} catch (err) {
			setError(Utils.getErrMessage(err));
		} finally {
			setLoading(false);
		}
	};

	const logout = () => {
		setUser(null);
	}

	return (
		<AuthContext.Provider value={{ user, loading, authError: error, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};
