/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { FormPostulation } from '@/components/create-postulation/FormPostulation';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

const CreatePostulationPage = (): any => {
	const router = useRouter();

	useEffect(() => {
		const token = Cookies.get('token');
		if (!token) {
			router.push('/auth/login');
		}
	}, []);

	return (
		<DashboardLayout>
			<FormPostulation />
		</DashboardLayout>
	);
};

export default CreatePostulationPage;
