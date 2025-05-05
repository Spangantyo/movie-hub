import React, { useEffect, useState } from 'react'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi'
import Image from 'next/image'

const CarouselJumbotron = ({ movies = [] }) => {
	const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE
	const [currentIndex, setCurrentIndex] = useState(0)
	const totalSlides = movies.length

	// Move to next slide
	const nextSlide = () => setCurrentIndex(prev => (prev + 1) % totalSlides)

	// Move to previous slide
	const prevSlide = () => setCurrentIndex(prev => (prev === 0 ? totalSlides - 1 : prev - 1))

	// Automatically switch slide every 3 seconds
	useEffect(() => {
		if (totalSlides === 0) return
		const intervalId = setInterval(nextSlide, 3000)
		return () => clearInterval(intervalId)
	}, [totalSlides])

	if (totalSlides === 0) return null

	const currentMovie = movies[currentIndex]

	return (
		<div className='relative w-full h-64 sm:h-80 md:h-[40vh] overflow-hidden rounded-lg'>
			{movies.map((movie, i) => (
				<div
					key={i}
					className={`absolute w-full h-full transition-opacity duration-700 ease-in-out ${
						i === currentIndex ? 'opacity-100 z-20' : 'opacity-0 z-10'
					}`}
				>
					<Image
						src={
							movie.poster_path
								? `${IMAGE_BASE_URL}${movie.poster_path}`
								: '/images/no-image.png'
						}
						alt={`Slide ${i + 1}`}
						fill
						className='object-cover'
						sizes='100vw'
						priority={i === 0}
					/>

					<div className='absolute inset-0 bg-black bg-opacity-40 z-10'></div>
					<div className='absolute inset-0 z-20 flex flex-col items-center justify-center text-center text-white px-4'>
						<h3 className='text-xl md:text-3xl lg:text-7xl text-primary-500 font-bold mb-2'>
							{movie.title.length > 14 ? movie.title.slice(0, 14) + '...' : movie.title}
						</h3>
						<p className='text-xs md:text-base lg:text-xl max-w-xs md:max-w-xl'>
							{movie.release_date
								? new Date(movie.release_date).toLocaleDateString('id-ID', {
										day: 'numeric',
										month: 'long',
										year: 'numeric'
								  })
								: 'N/A'}
						</p>
					</div>
				</div>
			))}

			{/* Controls */}
			<button
				type='button'
				className='absolute rounded-full bg-secondary-50/20 hover:bg-secondary-50/40 top-1/2 -translate-y-1/2 left-5 md:left-10 z-30 flex items-center justify-center py-3 px-3 sm:py-4 sm:px-4 cursor-pointer transition'
				onClick={prevSlide}
			>
				<HiChevronLeft className='w-5 h-5 sm:w-6 sm:h-6 text-white' />
			</button>

			<button
				type='button'
				className='absolute rounded-full bg-secondary-50/20 hover:bg-secondary-50/40 top-1/2 -translate-y-1/2 right-5 md:right-10 z-30 flex items-center justify-center py-3 px-3 sm:py-4 sm:px-4 cursor-pointer transition'
				onClick={nextSlide}
			>
				<HiChevronRight className='w-5 h-5 sm:w-6 sm:h-6 text-white' />
			</button>

			{/* Indicators */}
			<div className='absolute bottom-4 w-full flex justify-center space-x-3 z-30'>
				{movies.map((_, i) => (
					<button
						key={i}
						type='button'
						onClick={() => setCurrentIndex(i)}
						className={`w-3 h-3 rounded-full transition-colors duration-300 ${
							i === currentIndex
								? 'bg-primary-600'
								: 'bg-secondary-300/50 dark:bg-secondary-700/50'
						}`}
						aria-label={`Slide ${i + 1}`}
					/>
				))}
			</div>
		</div>
	)
}

export default CarouselJumbotron
