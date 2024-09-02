'use client';
import { useReducer, createContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// use Authcontext
export const AuthContext = createContext();

// create our default state
const defaultState = {
	isAuthenticated: false,
	user: null,
	token: null,
};

// create our constants
export const ACTIONS = {
	LOGIN: 'login',
	LOGOUT: 'logout',
};

// define our reducer function for state management
const reducer = (state, actions) => {
	const { type, payload } = actions;
	switch (type) {
		case ACTIONS.LOGIN:
			localStorage.setItem('user', JSON.stringify(payload.user.name));
			localStorage.setItem('token', JSON.stringify(payload.token));
			localStorage.setItem(
				'authenticated',
				JSON.stringify({ isAuthenticated: true })
			);
			localStorage.setItem(
				'role',	
				JSON.stringify(payload.role.role)
			);
			return {
				...state,
				isAuthenticated: true,
				user: payload.user.name,
				token: payload.token,
			};
		case ACTIONS.LOGOUT:
			localStorage.clear();
			return {
				...state,
				isAuthenticated: false,
				user: null,
				token: null,
			};
		default:
			throw new Error('No match of this type');
	}
};

const AuthProvider = ({ children }) => {
	const router = useRouter();

	useEffect(() => {
		router.refresh();
	}, []);

	// define our state and dispatch
	const [state, dispatch] = useReducer(reducer, defaultState);
	return (
		<AuthContext.Provider value={{ state, dispatch }}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
