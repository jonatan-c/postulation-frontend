/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import Cookies from 'js-cookie';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import left from '../../public/icons/previous-outline-svgrepo-com.svg';
import rigth from '../../public/icons/next-outline-svgrepo-com.svg';
import { deleteImageToPostulation } from '@/store/postulations/postulationSlice';

const ImageDescription = (): any => {
	const { selected } = useAppSelector((state) => state.postulation);

	const dispatch = useAppDispatch();

	const router = useRouter();

	useEffect(() => {
		const token = Cookies.get('token');
		if (!token) {
			router.push('/auth/login');
		}
	}, []);

	const slides = selected.images;

	const [currentIndex, setCurrentIndex] = useState(0);

	const prevSlide = (): any => {
		const isFirstSlide = currentIndex === 0;
		const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
		setCurrentIndex(newIndex);
	};

	const nextSlide = (): any => {
		const isLastSlide = currentIndex === slides.length - 1;
		const newIndex = isLastSlide ? 0 : currentIndex + 1;
		setCurrentIndex(newIndex);
	};

	const goToSlide = (slideIndex: any): any => {
		setCurrentIndex(slideIndex);
	};

	const deleteImageId = (id: any): any => {
		const position = slides[id].id;
		dispatch(deleteImageToPostulation(position));
	};

	return (
		<>
			<div className="group relative m-auto h-[1200px] w-full max-w-[1400px] py-16 px-4">
				{slides[currentIndex]?.fileUrl && (
					<Image
						src={slides[currentIndex]?.fileUrl}
						alt="image"
						width={1400}
						height={780}
						className="h-full w-full rounded-2xl bg-cover bg-center duration-500"
					/>
				)}
				{/* Top Botton Delete Image */}
				<div className="absolute top-[40%]  right-5    -translate-x-0 translate-y-[-50%] cursor-pointer   p-2 text-2xl text-black group-hover:block">
					<button
						onClick={() => {
							deleteImageId(currentIndex);
						}}
					>
						X
					</button>
				</div>

				{/* Left Arrow */}
				<div className="absolute top-[50%] left-5 hidden -translate-x-0 translate-y-[-50%] cursor-pointer   p-1 text-2xl text-white group-hover:block">
					<button onClick={prevSlide}>
						<Image src={left} alt="left" width={40} height={40} />
					</button>
				</div>
				{/* Right Arrow */}
				<div className="absolute top-[50%] right-5 hidden -translate-x-0 translate-y-[-50%] cursor-pointer     p-1 text-2xl text-white group-hover:block">
					<button onClick={nextSlide}>
						<Image src={rigth} alt="rigth" width={40} height={40} />
					</button>
				</div>
				<div className="top-4 flex justify-center py-2">
					{slides.map((slide, slideIndex) => (
						<div
							key={slideIndex}
							onClick={() => {
								goToSlide(slideIndex);
							}}
							className="cursor-pointer text-2xl "
						>
							{/* <RxDotFilled /> */}
							<p
								className={`${
									slideIndex === currentIndex ? 'text-red-500' : 'text-black'
								} `}
							>
								{' '}
								O{' '}
							</p>
						</div>
					))}
				</div>
			</div>
		</>
	);
};

export default ImageDescription;
