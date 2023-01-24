import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const UserPage = (): any => {
	const router = useRouter();

	useEffect(() => {
		const token = Cookies.get('token');
		if (!token) {
			router.push('/auth/login');
		}
	}, []);

	const slides = [
		{
			url: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2620&q=80',
		},
		{
			url: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80',
		},
		{
			url: 'https://images.unsplash.com/photo-1661961112951-f2bfd1f253ce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2672&q=80',
		},

		{
			url: 'https://images.unsplash.com/photo-1512756290469-ec264b7fbf87?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2253&q=80',
		},
		{
			url: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2671&q=80',
		},
	];

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
				<div
					style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
					className="h-full w-full rounded-2xl bg-cover bg-center duration-500"
				></div>
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
							className="cursor-pointer text-2xl"
						>
							{/* <RxDotFilled /> */}
							<p>O</p>
						</div>
					))}
				</div>
			</div>
		</>
	);
};

export default UserPage;
