/* eslint-disable @typescript-eslint/no-unused-expressions */
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import {
	cleanSelected,
	cleanSelectedPostulation,
	deleteImageToPostulation,
} from '@/store/postulations/postulationSlice';
import Image from 'next/image';
import React, { useEffect } from 'react';

const ModalInfoPostulation = ({ setOpenDeactivateModal }: any): JSX.Element => {
	const { selected } = useAppSelector((state) => state.postulation);
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (selected.id !== 0) {
			selected;
		}
	}, [selected, selected.images[0]?.fileUrl, selected?.images]);

	const deleteImageId = (id: any): any => {
		dispatch(deleteImageToPostulation(id));
	};

	const getText = (html: any): any => {
		const doc = new DOMParser().parseFromString(html, 'text/html');
		return doc.body.textContent;
	};

	return (
		<>
			<div
				style={{
					position: 'fixed',
					overflowY: 'hidden',
					overflowX: 'hidden',
					zIndex: 100,
				}}
				id="invite"
				className="top-[calc((100vh-800px)/2)] left-[calc((100vw-700px)/2)]   z-20 flex    h-[800px] w-[700px] flex-col rounded-[10px] border    border-gray-300   bg-white text-black "
			>
				{/* HEADER */}
				<div className="border-neutro-300 flex h-[35px] w-full  flex-row content-center items-center  justify-between border-b  py-[25px] px-[19px]">
					<h3 className="content-center text-xl font-semibold leading-5 text-gray-900  md:text-base">
						{selected?.company}
					</h3>
					<div
						className="cursor-pointer items-center pt-1 "
						onClick={() => {
							setOpenDeactivateModal(false);
						}}
					></div>
				</div>
				{/* BODY */}
				<div className="flex h-full  w-full  content-center   items-center p-[10px] md:flex md:flex-col md:p-5 md:pb-0  ">
					<p className="text-sm font-normal leading-[21px] md:text-base "> </p>
					<div className="flex h-full w-full flex-col items-center justify-center  overflow-y-scroll">
						{selected?.images.map((image: any, index: number) => {
							return (
								<div key={image.id} className="m-3">
									<button
										onClick={() => {
											deleteImageId(image.id);
										}}
										className="h-5 w-5 rounded-full bg-red-900 text-center text-sm font-normal leading-[21px] text-white md:text-base   "
									>
										x
									</button>
									<Image
										src={image.fileUrl}
										width={2000}
										height={2000}
										alt="image"
										className="images"
									/>
								</div>
							);
						})}
					</div>
				</div>

				<p>{selected.description}</p>

				<p>{getText(selected.description)}</p>

				{/* <Image
          src={selected?.images[0]?.fileUrl}
          width={100}
          height={100}
          alt='image'
       
        /> */}

				{/* FOOTER */}
				<div className="max-md:border-neutro-300 flex h-[57px] flex-row content-center items-center  justify-start  border-t-2 p-5 max-md:border-t md:h-[85px]">
					<button
						onClick={() => {
							setOpenDeactivateModal(false);
						}}
						className="bg-bluePrimary-600 mr-3 h-[37px] w-[96px] rounded-lg text-sm font-medium leading-[21px] text-black md:h-[45px] md:w-[117px] "
					>
						Deactivate
					</button>
				</div>
			</div>

			<div
				onClick={() => {
					dispatch(cleanSelectedPostulation());
					setOpenDeactivateModal(false);
				}}
				className="backdrop"
			></div>
		</>
	);
};

export default ModalInfoPostulation;
