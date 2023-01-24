import { useAppDispatch } from '@/hooks/redux';
import { login } from '@/store/authentication/authenticationSlice';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { FormEvent, useState } from 'react';

interface IFormLogin {
	email: string;
	password: string;
}

const initialState: IFormLogin = {
	email: '',
	password: '',
};

export const Login = (): any => {
	const dispatch = useAppDispatch();

	const router = useRouter();

	const [formValue, setFormValue] = useState(initialState);

	const { password, email } = formValue;

	const onInputChange = (e: any): any => {
		setFormValue({
			...formValue,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>): any => {
		e.preventDefault();

		dispatch(login(formValue));
		// eslint-disable-next-line @typescript-eslint/no-floating-promises
		router.push('/dashboard/home');
	};

	return (
		<section className="bg-gray-50 dark:bg-gray-900">
			<div className="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
				<div className="w-full rounded-lg bg-white shadow dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0">
					<div className="space-y-4 p-6 sm:p-8 md:space-y-6">
						<h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
							Sign in to your account
						</h1>
						<form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
							<div>
								<label
									htmlFor="email"
									className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
								>
									Your email
								</label>
								<input
									type="email"
									name="email"
									value={email}
									onChange={onInputChange}
									id="email"
									className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
									placeholder="name@company.com"
								/>
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
									name="password"
									value={password}
									onChange={onInputChange}
									autoComplete="off"
									id="password"
									placeholder="••••••••"
									className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
								/>
							</div>
							<button
								type="submit"
								className="w-full rounded-lg bg-primary-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
							>
								<Link href="/dashboard/home">Sign in</Link>
							</button>
							<p className="text-sm font-light text-gray-500 dark:text-gray-400">
								Don’t have an account yet?{' '}
								<Link
									href="/auth/register"
									className="font-medium text-primary-600 hover:underline dark:text-primary-500"
								>
									Sign up
								</Link>
							</p>
						</form>
					</div>
				</div>
			</div>
		</section>
	);
};