/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { MainLayout } from '@/components/layouts/MainLayout';

export default function Home() {
	return (
		<>
			<MainLayout>
				<h1 className="text-3xl font-bold underline">Hello world!</h1>
			</MainLayout>
		</>
	);
}
