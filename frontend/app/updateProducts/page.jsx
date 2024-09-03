'use client';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getFromLocalStorage } from '@/lib/utils';

import dynamic from 'next/dynamic';
const RegisterComponent = dynamic(() => import('../register/page'), {
	ssr: false,
});
const UpdateProductForm = dynamic(
	() => import('@/components/UpdateProductForm'),
	{
		ssr: false,
	}
);

const UpdateSingleProduct = () => {
	const router = useRouter();

	const role = JSON.parse(getFromLocalStorage('role'));

	useEffect(() => {
		role?.role !== 'seller' && router.push('/register');
	}, [role]);

	return (
		<div>
			{role?.role !== 'seller' ? (
				<RegisterComponent />
			) : (
				<UpdateProductForm />
			)}
		</div>
	);
};

export default UpdateSingleProduct;
