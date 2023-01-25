/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { useAppSelector } from '@/hooks/redux';
import Cookies from 'js-cookie';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const ImageDescription = (): any => {
	const { selected } = useAppSelector((state) => state.postulation);

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

	return (
		<>
			<div className="group relative m-auto h-[780px] w-full max-w-[1400px] py-16 px-4">
				{slides[currentIndex]?.fileUrl && (
					<Image
						src={slides[currentIndex]?.fileUrl}
						alt="image"
						width={1400}
						height={780}
						className="h-full w-full rounded-2xl bg-cover bg-center duration-500"
					/>
				)}
				{/* Top Botton Delete Image
				<div className="absolute top-[10%] right-5 hidden -translate-x-0 translate-y-[-50%] cursor-pointer rounded-full bg-black/20 p-2 text-2xl text-white group-hover:block">
					<button onClick={prevSlide}>X</button>
				</div> */}
				{/* Left Arrow */}
				<div className="absolute top-[50%] left-5 hidden -translate-x-0 translate-y-[-50%] cursor-pointer rounded-full bg-black/20 p-2 text-2xl text-white group-hover:block">
					<button onClick={prevSlide}>IZQ</button>
				</div>
				{/* Right Arrow */}
				<div className="absolute top-[50%] right-5 hidden -translate-x-0 translate-y-[-50%] cursor-pointer rounded-full bg-black/20 p-2 text-2xl text-white group-hover:block">
					<button onClick={nextSlide}>DER</button>
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