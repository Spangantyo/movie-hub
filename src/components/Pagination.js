'use client'

import React from 'react'

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
	// Handle Previous and Next button clicks
	const handlePrevious = () => {
		if (currentPage > 1) {
			onPageChange(currentPage - 1)
		}
	}

	const handleNext = () => {
		if (currentPage < totalPages) {
			onPageChange(currentPage + 1)
		}
	}

	// Calculate the range of pages to display (around the current page)
	const getPageNumbers = () => {
		const pageNumbers = []
		const delta = 2 // Number of pages to show before and after currentPage

		// Show pages in a range around currentPage
		let start = Math.max(currentPage - delta, 1) // Ensure not below 1
		let end = Math.min(currentPage + delta, totalPages) // Ensure not above totalPages

		// Adjust to make sure at least 5 pages are visible if possible
		if (end - start < 4) {
			if (start === 1) {
				end = Math.min(start + 4, totalPages)
			} else {
				start = Math.max(end - 4, 1)
			}
		}

		for (let i = start; i <= end; i++) {
			pageNumbers.push(i)
		}

		return pageNumbers
	}

	return (
		<div className='flex justify-center items-center space-x-3 mt-4'>
			{/* Previous Button */}
			<button
				onClick={handlePrevious}
				disabled={currentPage === 1}
				className={`flex items-center justify-center px-3 h-8 text-sm font-medium rounded-lg ${
					currentPage === 1
						? 'bg-secondary-200 dark:bg-secondary-800 text-secondary-400 cursor-not-allowed'
						: 'bg-white text-secondary-500 hover:bg-secondary-100 hover:text-secondary-700 dark:bg-secondary-800 dark:text-secondary-400 dark:hover:bg-secondary-700 dark:hover:text-white'
				}`}
			>
				Previous
			</button>

			{/* Page Numbers */}
			<div className='flex items-center space-x-2'>
				{getPageNumbers().map((page, index) => (
					<button
						key={index}
						onClick={() => (typeof page === 'number' ? onPageChange(page) : null)}
						className={`px-3 h-8 text-sm font-medium rounded-lg ${
							page === currentPage
								? 'bg-primary-600 text-white'
								: 'bg-white text-secondary-500 hover:bg-secondary-100 hover:text-secondary-700 dark:bg-secondary-800 dark:text-secondary-400 dark:hover:bg-secondary-700 dark:hover:text-white'
						}`}
					>
						{page}
					</button>
				))}
			</div>

			{/* Next Button */}
			<button
				onClick={handleNext}
				disabled={currentPage === totalPages}
				className={`flex items-center justify-center px-3 h-8 text-sm font-medium rounded-lg border ${
					currentPage === totalPages
						? 'bg-secondary-200 text-secondary-400 cursor-not-allowed'
						: 'bg-white text-secondary-500 hover:bg-secondary-100 hover:text-secondary-700 dark:bg-secondary-800 dark:border-secondary-700 dark:text-secondary-400 dark:hover:bg-secondary-700 dark:hover:text-white'
				}`}
			>
				Next
			</button>

			{/* Display Current Page and Total Pages */}
			<div className='text-sm text-secondary-500 dark:text-secondary-400'>
				Page {currentPage} of {totalPages}
			</div>
		</div>
	)
}

export default Pagination
