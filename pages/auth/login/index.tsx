/* eslint-disable @typescript-eslint/no-floating-promises */
// import { Register } from '@/components/auth/Register'
import { Login } from '@/components/auth/Login';
import { MainLayout } from '@/components/layouts/MainLayout';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

// router

const LoginPage = (): any => {
	const router = useRouter();

	useEffect(() => {
		const token = Cookies.get('token');
		// eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
		if (token) {
			router.push('/dashboard/home');
		}
	}, []);

	return (
		<>
			<MainLayout>
				<Login />
			</MainLayout>
		</>
	);
};

export default LoginPage;
