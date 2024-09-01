'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { BsArrowBarRight } from 'react-icons/bs';
import { BsArrowBarLeft } from 'react-icons/bs';

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
];

const Menu = () => {
	const [open, setOpen] = useState(false);

	/* Temporary */
	// const user = false;

	const handleMobileBurgerResponse = () => {
		setOpen(!open);
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
					className='bg-blue-500 text-white absolute left-0 top-20 flex flex-col gap-8 items-center 
			justify-center w-full h-[calc(100vh-5rem)] text-3xl z-10'>
					{links.map(({ id, title, url }) => (
						<Link
							href={url}
							key={id}
							onClick={() => setOpen(false)}>
							{title}
						</Link>
					))}
					{true ? (
						<Link href='/login' onClick={() => setOpen(false)}>
							Login
						</Link>
					) : (
						<div className='flex flex-col gap-6'>
							<Link href='/orders' onClick={() => setOpen(false)}>
								Orders
							</Link>

							<span className='cursor-pointer' onClick>
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
