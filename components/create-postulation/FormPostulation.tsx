/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import {
	createImageToPostulation,
	createPostulation,
	editPostulation,
} from '@/store/postulations/postulationSlice';
import Link from 'next/link';
import React, { FormEvent, useState, useEffect } from 'react';

interface IFormPostulationCreate {
	company: string;
	dateSend: string;
	feedback: boolean;
	dateFeedback: string;
	description?: string;
}

const initialState: IFormPostulationCreate = {
	company: '',
	dateSend: '',
	feedback: false,
	dateFeedback: '',
	description: '',
};

export const FormPostulation = (): any => {
	const { selected } = useAppSelector((state) => state.postulation);

	const dispatch = useAppDispatch();

	const [formValue, setFormValue] = useState(initialState);

	const { company, dateFeedback, dateSend, feedback, description } = formValue;

	const [value, setValue] = useState('');

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const onInputchangeDescription = (e: any): any => {
		setValue(e);
		setFormValue({
			...formValue,
		});
	};

	const onInputChange = (e: any): any => {
		setFormValue({
			...formValue,
			[e.target.name]: e.target.value,
			feedback: e.target.checked,
		});
	};

	useEffect(() => {
		if (selected.id !== 0) {
			setFormValue({
				company: selected.company,
				dateFeedback: selected.dateFeedback,
				dateSend: selected.dateSend,
				feedback: selected.feedback,
				description: selected.description,
			});
		}
	}, [selected]);

	const onChangeCheckbox = (e: any): any => {
		setFormValue({
			...formValue,
			feedback: e.target.checked,
		});
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>): any => {
		e.preventDefault();

		if (selected.id !== 0) {
			dispatch(editPostulation(selected.id, formValue));
		} else {
			dispatch(createPostulation(formValue));
		}
	};

	// ***************************** IMAGE ***************************** //

	// const [selectedFile, setSelectedFile] = useState(null);

	const { lastId } = useAppSelector((state) => state.postulation);

	const onInputChangeImage = (e: any): any => {
		const file = e.target.files[0];

		const formdata = new FormData();
		formdata.append('file', file, 'rn-6.png');
		formdata.append('fileName', 'jonatan');
		formdata.append('descriptionFile', 'hola');
		console.log(formdata);

		dispatch(createImageToPostulation(selected.id, formdata));
	};

	return (
		<section className="bg-white dark:bg-gray-900">
			<div className="mx-auto max-w-2xl py-8 px-4 lg:py-16">
				<h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
					Add a new postulation
				</h2>
				<form onSubmit={handleSubmit}>
					<div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
						<div className="sm:col-span-2">
							<label
								htmlFor="name"
								className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
							>
								Company
							</label>
							<input
								type="text"
								name="company"
								value={company}
								onChange={onInputChange}
								id="company"
								className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
								placeholder="Name of Company"
							/>
						</div>
						<div>
							<label
								htmlFor="category"
								className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
							>
								Position
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
						</div>
						<div className="w-full">
							<label
								htmlFor="brand"
								className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
							>
								Date Send
							</label>
							<input
								type="date"
								name="dateSend"
								value={dateSend}
								onChange={onInputChange}
								id="date"
								className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
							/>
						</div>
						<div className="w-full">
							<label
								htmlFor="brand"
								className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
							>
								Date Feedback
							</label>
							<input
								type="date"
								name="dateFeedback"
								value={dateFeedback}
								onChange={onInputChange}
								id="date"
								className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
							/>
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
								name="feedback"
								// value={feedback}
								checked={feedback}
								// onChange={onChangeCheckbox}
								onChange={onInputChange}
								id="price"
								className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
							/>
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
								name="description"
								value={description}
								// defaultValue={description}
								onChange={onInputChange}
							/>
							{/* <div className="add">
								<div className="content"> */}
							{/* <div className="editorContainer text-black">
                      <ReactQuill
                        className="editor"
                        theme="snow"
                        // name="description"
                        // name="description"
                        // value={description}
                        // onChange={onInputChange}
                        value={description}
                        onChange={onInputchangeDescription}
                      />
                    </div> */}
							{/* </div> */}
							{/* </div> */}
						</div>
					</div>
					{/* <Link 
					href={"/dashboard/postulations"}
					> */}
					<button
						type="submit"
						className="mt-4 inline-flex items-center rounded-lg bg-primary-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-800 focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 sm:mt-6"
					>
						{selected.id ? 'Update Postulation' : 'Add Postulation'}
					</button>
					{/* </Link> */}
				</form>
			</div>
			{/* <form onSubmit={handleSubmitImage}> */}
			{/* <input
          type="text"
          name="fileName"
          value={fileName}
          onChange={onInputChangeImage}
          id="fileName"
        />
        <input
          type="text"
          name="descriptionFile"
          value={descriptionFile}
          onChange={onInputChangeImage}
          id="descriptionFile"
        /> */}

			<input type="file" className="" onChange={onInputChangeImage} />
			<button type="submit" className="bg-red-300 text-black">
				Subir
			</button>
			{/* </form> */}
		</section>
	);
};
