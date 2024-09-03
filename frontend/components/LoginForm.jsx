'use client';
import React, { useState, useContext } from 'react';
import { useRouter } from 'next/navigation';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { AuthContext, ACTIONS } from '@/app/Providers';

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
	username: z
		.string()
		.min(2, 'Username should be at least 2 characters long')
		.max(50, 'Username should not be more than 50 characters long'),
	password: z.string(),
});

const LoginForm = () => {
	const [isLoading, setIsLoading] = useState(false);
	const { dispatch } = useContext(AuthContext);

	const router = useRouter();

	// 1. Define your form.
	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username: '',
			password: '',
		},
	});

	// 2. Define a submit handler. destructure value
	const onSubmit = async ({ username, password }) => {
		setIsLoading(true);

		try {
			const userData = { username, password };

			// post login data in the form to the backend
			const res = await fetch('http://localhost:5000/api/v1/auth/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(userData),
			});

			// return data details
			const data = await res.json();
			console.log('get data from login =>', data);

			// use state management
			dispatch({ type: ACTIONS.LOGIN, payload: data });

			// redirect to products page once user is authenticated
			data?.token && router.push('/products');
		} catch (err) {
			console.log('get register error =>', err);
		}
		setIsLoading(false);
	};

	return (
		<div>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='space-y-8 flex flex-col items-center justify-center h-screen'>
					<FormField
						control={form.control}
						name='username'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Username</FormLabel>
								<FormControl>
									<Input
										className='w-64'
										placeholder='Enter your username'
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
						name='password'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<Input
										className='w-64'
										placeholder='Enter your password'
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
					<Button type='submit'>
						{isLoading ? 'Loading...' : 'Submit'}
					</Button>
				</form>
			</Form>
		</div>
	);
};

export default LoginForm;
