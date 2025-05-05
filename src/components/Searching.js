'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { getGenres, searchMovies } from '@/lib/api'
import { FiSearch } from 'react-icons/fi'

const Searching = ({ placeholder, autoFocus }) => {
	const router = useRouter()
	const searchParams = useSearchParams()

	const [query, setQuery] = useState(searchParams.get('query') || '')
	const [suggestions, setSuggestions] = useState([])
	const [loading, setLoading] = useState(false)
	const [activeIndex, setActiveIndex] = useState(-1)

	const [genre, setGenre] = useState(searchParams.get('genre') || 'all')
	const [year, setYear] = useState(searchParams.get('year') || '')
	const [genres, setGenres] = useState([])

	useEffect(() => {
		const fetchGenres = async () => {
			const genreList = await getGenres()
			setGenres(genreList)
		}
		fetchGenres()
	}, [])

	useEffect(() => {
		const fetchSuggestions = async () => {
			if (query.trim().length === 0) {
				setSuggestions([])
				setActiveIndex(-1)
				return
			}
			setLoading(true)
			const result = await searchMovies(query, 1)

			// Remove duplicate title
			const uniqueResults = result.results.filter(
				(movie, index, self) => index === self.findIndex(m => m.title === movie.title)
			)

			setSuggestions(uniqueResults.slice(0, 5))
			setActiveIndex(-1)
			setLoading(false)
		}

		const delayDebounce = setTimeout(() => {
			fetchSuggestions()
		}, 300)

		return () => clearTimeout(delayDebounce)
	}, [query])

	const handleSubmit = e => {
		e.preventDefault()
		const params = new URLSearchParams(searchParams.toString())

		if (query) params.set('query', query)
		else params.delete('query')

		if (genre && genre !== 'all') params.set('genre', genre)
		else params.delete('genre')

		if (year) params.set('year', year)
		else params.delete('year')

		params.set('page', 1)
		router.push(`/`)
	}

	const handleSuggestionClick = title => {
		setQuery(title)
		setSuggestions([])
		setActiveIndex(-1)

		const params = new URLSearchParams(searchParams.toString())

		if (title) params.set('query', title)
		else params.delete('query')

		if (genre && genre !== 'all') params.set('genre', genre)
		else params.delete('genre')

		if (year) params.set('year', year)
		else params.delete('year')

		params.set('page', 1)

		// Pastikan state update dulu sebelum push
		Promise.resolve().then(() => {
			router.push(`/movies/search?${params.toString()}`)
		})
	}

	const handleKeyDown = e => {
		if (suggestions.length === 0) return

		if (e.key === 'ArrowDown') {
			e.preventDefault()
			setActiveIndex(prev => (prev < suggestions.length - 1 ? prev + 1 : 0))
		}

		if (e.key === 'ArrowUp') {
			e.preventDefault()
			setActiveIndex(prev => (prev > 0 ? prev - 1 : suggestions.length - 1))
		}

		if (e.key === 'Enter') {
			if (activeIndex >= 0) {
				e.preventDefault()
				handleSuggestionClick(suggestions[activeIndex].title)
			}
		}

		if (e.key === 'Escape') {
			setSuggestions([])
			setActiveIndex(-1)
		}
	}

	return (
		<form onSubmit={handleSubmit} className='flex flex-col gap-2 max-w-md relative'>
			<div className='relative w-full flex gap-2'>
				<input
					type='text'
					id='simple-search'
					value={query}
					onChange={e => setQuery(e.target.value)}
					onKeyDown={handleKeyDown}
					className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full px-6 py-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
					placeholder={placeholder}
					autoFocus={autoFocus}
				/>
				<button
					type='submit'
					className='p-3 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 transition'
				>
					<FiSearch className='w-5 h-5' />
				</button>
			</div>

			{suggestions.length > 0 && (
				<ul className='absolute top-14 left-0 w-full bg-white border border-gray-300 rounded-lg shadow-md z-50 dark:bg-gray-700 dark:border-gray-600'>
					{suggestions.map((movie, index) => (
						<li
							key={movie.id}
							onMouseDown={() => handleSuggestionClick(movie.title)}
							className={`px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-white ${
								index === activeIndex
									? 'bg-gray-100 dark:bg-gray-600 font-semibold'
									: ''
							}`}
						>
							{movie.title}
						</li>
					))}
				</ul>
			)}
		</form>
	)
}

export default Searching
