import React from 'react'
import Link from 'next/link'

export const SubTitle = ({ link, title, className = '' }) => {
	return (
		<div className={`w-full flex flex-row ${className}`}>
			<div className='w-1/2 flex justify-start'>
				<h1 className='text-black dark:text-white font-bold text-lg'>{title}</h1>
			</div>
			<div className='w-1/2 flex justify-end'>
				{link && (
					<Link
						href={link}
						className='text-black dark:text-white bg-secondary-200 transition-all duration-100 hover:bg-secondary-300 shadow-sm focus:ring-4 focus:ring-secondary-300 font-medium rounded-lg text-sm px-5 py-2 dark:bg-secondary-700 dark:hover:bg-secondary-600 focus:outline-none dark:focus:ring-secondary-800'
					>
						Show All
					</Link>
				)}
			</div>
		</div>
	)
}
