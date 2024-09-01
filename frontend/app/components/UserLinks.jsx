'use client';
import React from 'react';
import Link from 'next/link';

const UserLinks = () => {
	return (
		<div>
			{true ? (
				<Link href='/login'>Login</Link>
			) : (
				<div className='flex'>
					<span className='cursor-pointer ml-4' onClick>
						Logout
					</span>
				</div>
			)}
		</div>
	);
};

export default UserLinks;
