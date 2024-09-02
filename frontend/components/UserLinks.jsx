'use client';
import React, { useContext, useState, useEffect } from 'react';
import Link from 'next/link';
import { ACTIONS, AuthContext } from '@/app/Providers';
import { useRouter } from 'next/navigation';

const UserLinks = () => {
	const { dispatch } = useContext(AuthContext);

	const router = useRouter();

	const [auth, setAuth] = useState(null);

	useEffect(() => {
		let authData;
		if (typeof window !== 'undefined') {
			authData = localStorage.getItem('authenticated');
		}
		if (authData) {
			setAuth(JSON.parse(authData));
		}
		// always add state changed to useEffect
	}, []);

	const handleLogout = () => {
		dispatch({ type: ACTIONS.LOGOUT });
		router.push('/');
	};

	return (
		<div>
			{!auth?.isAuthenticated ? (
				<Link href='/login'>Login</Link>
			) : (
				<div className='flex flex-row'>
					<Link href='/addProducts'>Add Products</Link>
					<span
						className='cursor-pointer ml-4'
						onClick={handleLogout}>
						Logout
					</span>
				</div>
			)}
		</div>
	);
};

export default UserLinks;
