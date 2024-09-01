'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

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

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

const formSchema = z.object({
	username: z
		.string()
		.min(2, 'Username should be at least 2 characters long')
		.max(50, 'Username should not be more than 50 characters long'),
	password: z.string(),
	deposit: z.coerce.number(),
	role: z.string(),
});

const RegisterForm = () => {
	const [isLoading, setIsLoading] = useState(false);

	const router = useRouter();

	// 1. Define your form.
	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username: '',
			password: '',
			deposit: '',
			role: '',
		},
	});

	// 2. Define a submit handler.
	const onSubmit = async ({ username, password, deposit, role }) => {
		setIsLoading(true);
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		console.log(username, password, deposit, role);

		try {
			const userData = { username, password, deposit, role };

			const res = await fetch(
				'http://localhost:5000/api/v1/auth/register',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(userData),
				}
			);
			const data = await res.json();

			data && router.push('/login');
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
					<FormField
						control={form.control}
						name='deposit'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Deposit</FormLabel>
								<FormControl>
									<Input
										type='number'
										placeholder='0'
										className='w-64'
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
						name='role'
						render={({ field }) => (
							<FormItem className='w-64'>
								<FormLabel>Role</FormLabel>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder='Select a role' />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										<SelectItem value='buyer'>
											buyer
										</SelectItem>
										<SelectItem value='seller'>
											seller
										</SelectItem>
									</SelectContent>
								</Select>
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

export default RegisterForm;
