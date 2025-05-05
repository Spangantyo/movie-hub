'use client'

import { useFiltering } from '@/hooks/useFiltering'
import { CardLg } from '@/components/Cards'
import { useSearchParams, useRouter } from 'next/navigation'
import { GridColsCustom } from '@/components/GridColsCustom'

export default function Page() {
	const searchParams = useSearchParams()
	const router = useRouter()

	const query = searchParams.get('query')
	const genreQuery = searchParams.get('genres')
	const yearQuery = searchParams.get('year')
	const categoryQuery = searchParams.get('category')
	const page = parseInt(searchParams.get('page') || '1', 10)

	const { movies, loading, totalPages, totalResults } = useFiltering({
		searchQuery: query,
		genreQuery,
		yearQuery,
		categoryQuery,
		page
	})

	const handlePageChange = newPage => {
		const params = new URLSearchParams(window.location.search)
		params.set('page', newPage)
		router.push(`/movies?page=${newPage}`)
		window.scrollTo(0, 0)
	}

	return (
		<>
			{/* Loading */}
			{loading ? (
				<p>Loading movies...</p>
			) : (
				<GridColsCustom>
					<CardLg movies={movies} />
				</GridColsCustom>
			)}

			{/* Pagination */}
			<div className='flex justify-center mt-4'>
				{page > 1 && (
					<button
						onClick={() => handlePageChange(page - 1)}
						className='px-4 py-2 bg-blue-500 text-white rounded-l'
						disabled={loading}
					>
						Prev
					</button>
				)}
				<span className='px-4 py-2'>{`Page ${page} of ${totalPages}`}</span>
				{page < totalPages && (
					<button
						onClick={() => handlePageChange(page + 1)}
						className='px-4 py-2 bg-blue-500 text-white rounded-r'
						disabled={loading}
					>
						Next
					</button>
				)}
			</div>

			<p className='mt-4 text-center'>{`Total results: ${totalResults}`}</p>
		</>
	)
}
