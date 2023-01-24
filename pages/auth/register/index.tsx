/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-floating-promises */
import { Register } from '@/components/auth/Register';
import { MainLayout } from '@/components/layouts/MainLayout';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

const RegisterPage = (): any => {
	const router = useRouter();

	useEffect(() => {
		const token = Cookies.get('token');
		if (token) {
			router.push('/');
		}
	}, []);

	return (
		<>
			<MainLayout>
				<Register />
			</MainLayout>
		</>
	);
};

export default RegisterPage;
