/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/no-misused-promises */

import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import {
	cleanSelectedPostulation,
	createImageToPostulation,
	createPostulation,
	editPostulation,
} from '@/store/postulations/postulationSlice';
import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { schema } from './schema.create-postulation';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';

interface IFormPostulationCreate {
	company: string;
	dateSend: string;
	feedback?: boolean;
	dateFeedback?: string;
	description?: string;
}

export const FormPostulation = (): any => {
	const { selected } = useAppSelector((state) => state.postulation);

	const dispatch = useAppDispatch();

	const router = useRouter();

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<Partial<IFormPostulationCreate>>({
		resolver: yupResolver(schema),
	});

	const [startDate, setStartDate] = useState<any>(null);

	const onSubmitHandler: SubmitHandler<Partial<IFormPostulationCreate>> = (
		data: any
	): any => {
		console.log('data', data);

		if (selected.id !== 0) {
			dispatch(editPostulation(selected.id, data));
			// router.push('/dashboard/postulations');
			// dispatch(cleanSelectedPostulation())
		} else {
			dispatch(createPostulation(data));
			// router.push('/dashboard/postulations');
			// dispatch(cleanSelectedPostulation())
		}
		// dispatch(cleanSelectedPostulation());
		// router.push('/dashboard/home');
		reset();
	};

	useEffect(() => {
		if (selected.id !== 0) {
			reset({
				company: selected.company,
				dateSend: selected.dateSend,
				feedback: selected.feedback,
				dateFeedback: selected.dateFeedback,
				description: selected.description,
			});
		}
	}, [selected]);

	// ***************************** IMAGE ***************************** //

	const { lastId } = useAppSelector((state) => state.postulation);

	const onInputChangeImage = (e: any): any => {
		const file = e.target.files[0];

		const formdata = new FormData();
		formdata.append('file', file, file.name);
		formdata.append('fileName', file.name);
		formdata.append('descriptionFile', 'description');

		dispatch(createImageToPostulation(selected.id, formdata));
	};

	return (
		<section className="bg-white dark:bg-gray-900 ">
			<div className="mx-auto max-w-2xl py-8 px-4 lg:py-16">
				<h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
					Add a new postulation
				</h2>
				<form onSubmit={handleSubmit(onSubmitHandler)}>
					<div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
						<div className="sm:col-span-2">
							<label
								htmlFor="name"
								className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
							>
								Company
								<span className="text-red-600"> *</span>
							</label>
							<input
								type="text"
								{...register('company')}
								id="company"
								className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
								placeholder="Name of Company"
							/>
							<p className="text-red-500">{errors.company?.message}</p>
						</div>
						<div>
							<label
								htmlFor="category"
								className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
							>
								Position
								<span className="text-red-600"> *</span>
							</label>
							<select
								id="category"
								className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
							>
								<option>Select category</option>
								<option value="Frontend">Frontend</option>
								<option value="Backend">Backend</option>
								<option value="FullStack">FullStack</option>
								<option value="PH">Phones</option>
							</select>
							{/* <p className="text-red-500">{errors.postion?.message}</p> */}
						</div>
						<div className="input-container w-full ">
							<label
								htmlFor="date"
								className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
							>
								Date Send
								<span className="text-red-600"> *</span>
							</label>
							<input
								type="date"
								{...register('dateSend')}
								id="date"
								className="block w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
							/>
							<p className="text-red-500">{errors.dateSend?.message}</p>
						</div>
						<div className="input-container w-full">
							<label
								htmlFor="brand"
								className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
							>
								Date Feedback
							</label>
							<input
								type="date"
								{...register('dateFeedback')}
								id="date"
								className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
							/>
							<p className="text-red-500">{errors.dateFeedback?.message}</p>
						</div>
						<div className="w-full">
							<label
								htmlFor="price"
								className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
							>
								Status Postulation Response
							</label>
							<input
								type="checkbox"
								{...register('feedback')}
								id="price"
								className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
							/>
							<p className="text-red-500">{errors.feedback?.message}</p>
						</div>

						<div className="sm:col-span-2">
							<label
								htmlFor="description"
								className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
							>
								Description
							</label>
							<textarea
								id="description"
								className="block h-[200px] w-full justify-start rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
								placeholder="Your description here"
								{...register('description')}
							/>
							<p className="text-red-500">{errors.description?.message}</p>
						</div>
					</div>
					<button
						type="submit"
						className="mt-4 inline-flex items-center rounded-lg bg-primary-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-800 focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 sm:mt-6"
					>
						{selected.id ? 'Update Postulation' : 'Add Postulation'}
					</button>
				</form>
			</div>
			{/* IMAGE */}
			<div className="m-4 pb-7">
				<label
					className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
					htmlFor="file_input"
				>
					Upload file
				</label>
				<input
					className="block w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400"
					id="file_input"
					type="file"
					onChange={onInputChangeImage}
				/>
				<button
					type="submit"
					className="mr-2 mb-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
				>
					Subir
				</button>
			</div>
		</section>
	);
};
