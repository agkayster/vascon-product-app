'use client';
import React, { useContext, useState, useEffect } from 'react';
import Link from 'next/link';
import { ACTIONS, AuthContext } from '@/app/Providers';
import { useRouter } from 'next/navigation';
import { getFromLocalStorage } from '@/lib/utils';

const UserLinks = () => {
	const { dispatch } = useContext(AuthContext);

	const router = useRouter();

	const authData = JSON.parse(getFromLocalStorage('authenticated'));

	const handleLogout = () => {
		dispatch({ type: ACTIONS.LOGOUT });
		router.push('/');
	};

	return (
		<div>
			{!authData?.isAuthenticated ? (
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
