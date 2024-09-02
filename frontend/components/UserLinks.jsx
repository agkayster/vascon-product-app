'use client';
import React, { useContext, useState, useEffect } from 'react';
import Link from 'next/link';
import { ACTIONS, AuthContext } from '@/app/Providers';
import { useRouter } from 'next/navigation';
import { revalidatePath } from 'next/cache';

const UserLinks = () => {
	const { dispatch, state } = useContext(AuthContext);
	// console.log('get state from userlinks =>', state);
	const router = useRouter();

	const [auth, setAuth] = useState(null);

	useEffect(() => {
		let authData;
		if (typeof window !== 'undefined') {
			authData = JSON.parse(localStorage.getItem('authenticated'));
		}
		if (authData?.isAuthenticated) {
			setAuth(authData);
			// location.reload();
		}
	}, []);

	const handleLogout = () => {
		dispatch({ type: ACTIONS.LOGOUT });
		router.push('/');
		location.reload();
	};

	// console.log('get auth data for user links =>', auth);

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
