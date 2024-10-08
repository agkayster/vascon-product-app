'use client';
import React, { useState, useContext, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { BsArrowBarRight } from 'react-icons/bs';
import { BsArrowBarLeft } from 'react-icons/bs';
import { ACTIONS, AuthContext } from '@/app/Providers';
import { useRouter } from 'next/navigation';
import { getFromLocalStorage } from '@/lib/utils';

const links = [
	{
		id: 1,
		title: 'Homepage',
		url: '/',
	},

	{
		id: 2,
		title: 'Contact',
		url: '/contact',
	},
	{
		id: 3,
		title: 'Products',
		url: '/products',
	},
];

const Menu = () => {
	const [open, setOpen] = useState(false);
	const { dispatch } = useContext(AuthContext);

	const router = useRouter();

	const authData = JSON.parse(getFromLocalStorage('authenticated'));

	const handleMobileBurgerResponse = () => {
		setOpen(!open);
	};

	const handleLogout = () => {
		dispatch({ type: ACTIONS.LOGOUT });
		router.push('/');
		setOpen(false);
	};

	const handleAddProducts = () => {
		router.push('/addProducts');
		setOpen(false);
	};

	return (
		<div>
			{open ? (
				<BsArrowBarRight onClick={handleMobileBurgerResponse} />
			) : (
				<BsArrowBarLeft onClick={handleMobileBurgerResponse} />
			)}
			{open && (
				<div
					className='bg-blue-500 text-white absolute left-0 top-12 flex flex-col gap-8 items-center 
			justify-start py-48 w-full h-[77.5rem] text-3xl z-10'>
					{links.map(({ id, title, url }) => (
						<Link
							href={url}
							key={id}
							onClick={() => setOpen(false)}>
							{title}
						</Link>
					))}
					{!authData?.isAuthenticated ? (
						<>
							<Link href='/login' onClick={() => setOpen(false)}>
								Login
							</Link>
							<Link
								href='/register'
								onClick={() => setOpen(false)}>
								Register
							</Link>
						</>
					) : (
						<div className='flex flex-col gap-6'>
							<Link
								href='/addProducts'
								onClick={handleAddProducts}>
								Add Products
							</Link>
							<span
								className='cursor-pointer ml-12'
								onClick={handleLogout}>
								Logout
							</span>
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default Menu;
