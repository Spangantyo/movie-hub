import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { AiFillLike } from 'react-icons/ai'
import { FaComment } from 'react-icons/fa'
import { getImageUrl, getMovieLink, getActorLink } from '@/untils/FormatHelpers'

export const CardSm = ({ movies }) => {
	if (!movies || movies.length === 0) {
		return <p>No movies available.</p> // Or some other message
	}
	return (
		<>
			{movies.map(movie => {
				const { id, title, poster_path, release_date } = movie
				const image = getImageUrl(poster_path)
				const link = getMovieLink(id, title)

				return (
					<div
						key={id}
						className='relative w-48 h-72 overflow-hidden rounded-lg group shadow-md'
					>
						<Link
							href={link}
							className='relative w-48 h-72 overflow-hidden rounded-lg group shadow-md block'
						>
							{/* Gambar */}
							<Image
								src={image}
								alt={title}
								fill
								className='object-cover cursor-pointer transition-transform duration-300 group-hover:scale-105'
							/>

							{/* Overlay */}
							<div className='absolute inset-0 bg-secondary-950 bg-opacity-65 opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col justify-end p-3'>
								<h5 className='text-primary-600 text-lg font-bold'>
									{title.length > 15 ? title.slice(0, 15) + '...' : title}
								</h5>
								<div className='flex items-center gap-1'>
									<span className='text-white text-xs mt-1'>
										{/* Menampilkan tanggal lengkap dengan format bulan, tanggal, dan tahun */}
										{new Date(release_date).toLocaleDateString('en-US', {
											year: 'numeric',
											month: 'long',
											day: 'numeric'
										})}
									</span>
								</div>
							</div>
						</Link>
					</div>
				)
			})}
		</>
	)
}

export const CardSmCircleActor = ({ actors }) => {
	// Menangani kasus ketika tidak ada aktor yang tersedia
	if (!actors || actors.length === 0) {
		return <p>No actors available.</p>
	}

	return (
		<>
			{actors.map(actor => {
				const { id, name, profile_path } = actor
				const image = getImageUrl(profile_path)

				return (
					<div
						key={id}
						className='max-w-md bg-primary-800 dark:bg-primary-600 rounded-3xl border-[1px] border-primary-900 dark:border-primary-700 shadow-sm dark:shadow-slate-50  overflow-hidden group'
					>
						<div className='relative flex items-center space-x-4'>
							{/* Gambar aktor berbentuk lingkaran (200x200) */}
							<Image
								src={image || '/path/to/default-image.jpg'}
								alt={name}
								width={100}
								height={100}
								className='rounded-3xl object-cover w-[100px] h-[100px]'
								priority
							/>
							<div>
								<p className='text-lg text-secondary-50 font-bold'>{name}</p>
							</div>
						</div>
					</div>
				)
			})}
		</>
	)
}

export const CardLg = ({ movies }) => {
	if (!movies || movies.length === 0) {
		return <p>No movies available.</p> // Or some other message
	}
	return (
		<>
			{movies.map(movie => {
				const { id, title, poster_path, vote_count, comment_count, overview } = movie
				const image = getImageUrl(poster_path)
				const link = getMovieLink(id, title)
				const likes = vote_count || 0
				const comments = comment_count || 0
				const desription = overview || 'No description available.'

				return (
					<div
						key={id}
						className='max-w-sm bg-white border border-secondary-200 rounded-lg shadow-md dark:bg-secondary-800 dark:border-secondary-700 group overflow-hidden'
					>
						<div className='relative overflow-hidden rounded-t-lg'>
							<Link href={link}>
								<Image
									src={image}
									alt={title}
									width={400}
									height={500}
									className='rounded-t-lg text-sm transition-transform duration-300 ease-in-out group-hover:scale-125 h-[500px] w-[400px] object-cover'
									priority
								/>
								{/* Gradient Overlay */}
								<div className='absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
							</Link>
						</div>

						<div className='p-7'>
							<div className='flex flex-col gap-y-2'>
								<h5 className='mb-2 text-2xl font-bold tracking-tight text-secondary-700 dark:text-secondary-300 truncate'>
									{title.length > 20 ? title.slice(0, 20) + '...' : title}
								</h5>

								<div className='mb-2'>
									<div className='flex flex-wrap items-center gap-x-3'>
										<Link
											href={'#'}
											className='flex items-center gap-1 hover:underline hover:text-primary-900'
										>
											<AiFillLike className='text-lg md:text-xm lg:text-lg text-primary-500' />
											<p className='text-sm text-primary-700'>
												{likes.toLocaleString()} <span>Likes</span>
											</p>
										</Link>

										{/* Garis pemisah */}
										<span className='h-4 w-[1.5px] bg-primary-700'></span>

										<Link
											href={'#'}
											className='flex items-center gap-1 hover:underline hover:text-success-900'
										>
											<FaComment className='text-lg md:text-xm lg:text-lg text-success-500' />
											<p className='text-sm text-success-700'>
												{comments.toLocaleString()} <span>Comments</span>
											</p>
										</Link>
									</div>
								</div>

								<span className='h-[1px] bg-secondary-200 dark:bg-secondary-700'></span>

								<p className='font-normal mt-2 block md:hidden lg:block text-justify text-secondary-600 dark:text-secondary-400'>
									{desription?.length > 120
										? desription.slice(0, 120) + '...'
										: desription}
								</p>

								<p className='font-normal mt-2 hidden md:block lg:hidden text-justify text-secondary-600 dark:text-secondary-400'>
									{desription?.length > 70
										? desription.slice(0, 70) + '...'
										: desription}
								</p>
							</div>
						</div>
					</div>
				)
			})}
		</>
	)
}
