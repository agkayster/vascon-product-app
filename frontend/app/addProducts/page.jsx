'use client';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getFromLocalStorage } from '@/lib/utils';
import dynamic from 'next/dynamic';

const AddProductsForm = dynamic(() => import('@/components/AddProductsForm'), {
	ssr: false,
});

const RegisterComponent = dynamic(() => import('../register/page'), {
	ssr: false,
});

const AddProductsComponent = () => {
	const router = useRouter();

	const role = JSON.parse(getFromLocalStorage('role'));

	// protects the Add products route
	useEffect(() => {
		role?.role !== 'seller' && router.push('/register');
	}, [role]);

	return (
		<>
			{role?.role !== 'seller' ? (
				<RegisterComponent />
			) : (
				<AddProductsForm />
			)}
		</>
	);
};

export default AddProductsComponent;
