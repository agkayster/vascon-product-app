'use client';
import { useReducer, createContext } from 'react';

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
			localStorage.setItem('role', JSON.stringify(payload.role));
			return {
				...state,
				isAuthenticated: true,
				user: payload.user.name,
				token: payload.token,
			};
		case ACTIONS.LOGOUT:
			localStorage.removeItem('role');
			localStorage.removeItem('authenticated');
			localStorage.removeItem('user');
			localStorage.removeItem('token');
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
	const [state, dispatch] = useReducer(reducer, defaultState);

	return (
		<AuthContext.Provider value={{ state, dispatch }}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
