'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getFromLocalStorage } from '@/lib/utils';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const formSchema = z.object({
	amountAvailable: z.coerce.number(),
	cost: z.coerce.number(),
	productName: z
		.string()
		.min(4, 'Product name should be at least 4 characters long'),
});

const AddProductsForm = () => {
	const [isLoading, setIsLoading] = useState(false);

	const token = JSON.parse(getFromLocalStorage('token'));

	const router = useRouter();

	// 1. Define your form.
	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			amountAvailable: '',
			cost: '',
			productName: '',
		},
	});

	// 2. Define a submit handler.
	const onSubmit = async ({ amountAvailable, cost, productName }) => {
		setIsLoading(true);
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		console.log(amountAvailable, cost, productName);

		try {
			const productsData = { amountAvailable, cost, productName };
			const headers = {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json',
			};

			const res = await fetch('http://localhost:5000/api/v1/products', {
				method: 'POST',
				headers,
				body: JSON.stringify(productsData),
			});

			const data = await res.json();

			data && router.push('/products');
		} catch (error) {
			console.log('get add products error =>', error);
		}
		setIsLoading(false);
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='space-y-4 bg-blue-300 px-4 items-center justify-center flex flex-col h-screen'>
				<FormField
					control={form.control}
					name='amountAvailable'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Amount Available</FormLabel>
							<FormControl>
								<Input
									className='w-64 rounded-xl'
									placeholder='Enter amount available'
									{...field}
								/>
							</FormControl>
							{/* <FormDescription>
									This is your public display name.
								</FormDescription> */}
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='cost'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Cost</FormLabel>
							<FormControl>
								<Input
									className='w-64 rounded-xl'
									placeholder='Enter cost of product'
									{...field}
								/>
							</FormControl>
							{/* <FormDescription>
									This is your public display name.
								</FormDescription> */}
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='productName'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Product Name</FormLabel>
							<FormControl>
								<Input
									placeholder='Pepsi'
									className='w-64 rounded-xl'
									{...field}
								/>
							</FormControl>
							{/* <FormDescription>
									This is your public display name.
								</FormDescription> */}
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type='submit' className='bg-blue-500 rounded-xl'>
					{isLoading ? 'Loading...' : 'Submit'}
				</Button>
			</form>
		</Form>
	);
};

export default AddProductsForm;
