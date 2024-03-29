/* eslint-disable @typescript-eslint/no-misused-promises */
import { useAppDispatch } from '@/hooks/redux';
import { register as registerDispatch } from '@/store/authentication/authenticationSlice';
import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { schema } from './schema.register';

interface IFormRegister {
	name: string;
	email: string;
	password: string;
}

export const Register = (): any => {
	const dispatch = useAppDispatch();
	const router = useRouter();

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<IFormRegister>({
		resolver: yupResolver(schema),
	});

	const onSubmitHandler: SubmitHandler<IFormRegister> = (data: any): any => {
		dispatch(registerDispatch(data));
		// router.push('/dashboard/home');
		reset();
	};

	return (
		<section className="bg-gray-50 dark:bg-gray-900">
			<div className="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
				<div className="xl:p-0 w-full rounded-lg bg-white shadow dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0">
					<div className="space-y-4 p-6 sm:p-8 md:space-y-6">
						<h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
							Create and account
						</h1>
						<form
							onSubmit={handleSubmit(onSubmitHandler)}
							className="space-y-4 md:space-y-6"
							action="#"
						>
							<div>
								<label
									htmlFor="name"
									className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
								>
									Your Name
								</label>
								<input
									type="text"
									{...register('name')}
									id="name"
									className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
									placeholder="name"
								/>
								<p className="text-red-500">{errors.name?.message}</p>
							</div>
							<div>
								<label
									htmlFor="email"
									className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
								>
									Your email
								</label>
								<input
									type="email"
									{...register('email')}
									id="email"
									className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
									placeholder="name@company.com"
								/>
								<p className="text-red-500">{errors.email?.message}</p>
							</div>
							<div>
								<label
									htmlFor="password"
									className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
								>
									Password
								</label>
								<input
									type="password"
									{...register('password')}
									autoComplete="off"
									id="password"
									placeholder="••••••••"
									className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
								/>
								<p className="text-red-500">{errors.password?.message}</p>
							</div>

							<button
								type="submit"
								className="w-full rounded-lg bg-primary-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
							>
								Create an account
							</button>
							<p className="text-sm font-light text-gray-500 dark:text-gray-400">
								Already have an account?{' '}
								<Link
									href="/auth/login"
									className="font-medium text-primary-600 hover:underline dark:text-primary-500"
								>
									Login here
								</Link>
							</p>
						</form>
					</div>
				</div>
			</div>
		</section>
	);
};
