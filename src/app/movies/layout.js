'use client'

import Searching from '@/components/Searching'
import FilteringForm from '@/components/FilteringForm'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { useFiltering } from '@/hooks/useFiltering'
import HeaderCustom from '@/components/Layout/HeaderCustom'

export default function MoviesLayout({ children }) {
	const router = useRouter()
	const searchParams = useSearchParams()
	const pathname = usePathname()

	// ambil query params untuk filter
	const query = searchParams.get('query')
	const genreQuery = searchParams.get('genres')
	const yearQuery = searchParams.get('year')
	const categoryQuery = searchParams.get('category')
	const page = parseInt(searchParams.get('page') || '1', 10)

	// fetch genres buat FilteringForm
	const { genres } = useFiltering({
		searchQuery: query,
		genreQuery,
		yearQuery,
		categoryQuery,
		page
	})

	const handleSearchSubmit = searchQuery => {
		const params = new URLSearchParams(searchParams.toString())
		params.set('query', searchQuery)
		params.set('page', '1')
		router.push(`/movies/search?${params.toString()}`)
	}

	return (
		<div className='w-full flex flex-col gap-2.5'>
			<HeaderCustom className='p-4'>
				<FilteringForm genres={genres} />
			</HeaderCustom>

			<div className='w-full'>{children}</div>
		</div>
	)
}
