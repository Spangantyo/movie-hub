'use client'

import { useRouter, usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { SelectCustom1 } from '@/components/SelectCustom'
import { BtnPrimary, BtnSecondary } from './Buttons'
import { searchMovies } from '@/lib/api'

export default function FilteringForm({ genres }) {
	const router = useRouter()
	const pathname = usePathname()

	// State untuk filter
	const [selectedGenre, setSelectedGenre] = useState('all')
	const [selectedYear, setSelectedYear] = useState('')
	const [selectedCategory, setSelectedCategory] = useState('all')
	const [searchQuery, setSearchQuery] = useState('')
	const [suggestions, setSuggestions] = useState([])
	const [loading, setLoading] = useState(false)
	const [activeIndex, setActiveIndex] = useState(-1)
	const [skipSearch, setSkipSearch] = useState(false)

	useEffect(() => {
		setSuggestions([]) // Reset suggestions
		setActiveIndex(-1) // Reset active index
	}, [pathname])

	// Mengambil query params dari URL saat halaman pertama kali dimuat
	useEffect(() => {
		const query = new URLSearchParams(window.location.search)

		// Menyinkronkan state dengan URL params jika ada
		setSelectedGenre(query.get('genres') || 'all')
		setSelectedYear(query.get('year') || '')
		setSelectedCategory(query.get('category') || 'all')
		setSearchQuery(query.get('query') || '')
	}, [])

	useEffect(() => {
		if (pathname.startsWith('/movies/search')) {
			setSuggestions([])
			setActiveIndex(-1)
			setSkipSearch(true)
		} else {
			// kalau pindah ke halaman lain (misal balik ke /movies)
			setSkipSearch(false)
		}
	}, [pathname])

	// Fungsi untuk menangani perubahan input
	const handleChange = (e, setter) => setter(e.target.value)

	// Fungsi untuk menangani submit filter
	const handleFilter = e => {
		e.preventDefault()

		const params = new URLSearchParams()

		// Tambahkan parameter jika bukan nilai default
		if (searchQuery) params.set('query', searchQuery)
		if (selectedGenre !== 'all') params.set('genres', selectedGenre)
		if (selectedYear) params.set('year', selectedYear)
		if (selectedCategory !== 'all') params.set('category', selectedCategory)

		const queryString = params.toString()

		// Tentukan base path berdasarkan apakah ada searchQuery atau tidak
		const basePath = searchQuery ? '/movies/search' : '/movies'

		setSuggestions([])
		setActiveIndex(-1)
		setSkipSearch(true)

		// Arahkan ke path yang sesuai
		if (queryString) {
			router.push(`${basePath}?${queryString}`)
		} else {
			router.push('/movies')
		}
	}

	// Fungsi untuk mereset filter
	const handleReset = () => {
		// Reset state
		setSearchQuery('')
		setSelectedGenre('all')
		setSelectedYear('')
		setSelectedCategory('all')

		// Navigasi ke halaman utama tanpa query params
		router.push('/movies')
	}

	// Daftar tahun untuk dropdown
	const years = Array.from({ length: 20 }, (_, i) => 2025 - i)

	// Opsi untuk kategori
	const categoryOptions = [
		{ value: 'all', label: 'All Categories' },
		{ value: 'top_rated', label: 'Top Rated' },
		{ value: 'popular', label: 'Popular' },
		{ value: 'upcoming', label: 'Upcoming' },
		{ value: 'now_playing', label: 'Now Playing' }
	]

	// Fetch suggestions berdasarkan input pencarian
	useEffect(() => {
		if (skipSearch || searchQuery.trim().length === 0) {
			setSuggestions([])
			setActiveIndex(-1)
			return
		}

		const delayDebounce = setTimeout(async () => {
			setLoading(true)
			const result = await searchMovies(searchQuery, 1)

			const uniqueResults = result.results.filter(
				(movie, index, self) => index === self.findIndex(m => m.title === movie.title)
			)

			setSuggestions(uniqueResults.slice(0, 5))
			setActiveIndex(-1)
			setLoading(false)
		}, 300)

		return () => clearTimeout(delayDebounce)
	}, [searchQuery, skipSearch])

	// Fungsi untuk memilih suggestion
	// Fungsi untuk memilih suggestion
	const handleSuggestionClick = title => {
		setSkipSearch(true) // biar skip fetching suggestions
		// setSearchQuery(title)
		setSuggestions([])
		setActiveIndex(-1)

		const params = new URLSearchParams()

		if (title) params.set('query', title)
		if (selectedGenre !== 'all') params.set('genres', selectedGenre)
		if (selectedYear) params.set('year', selectedYear)
		if (selectedCategory !== 'all') params.set('category', selectedCategory)

		params.set('page', 1)

		// Pastikan navigasi ke halaman pencarian dengan query params
		router.push(`/movies/search?${params.toString()}`)
	}

	// Menambahkan fungsi untuk menangani onFocus agar suggestion hilang ketika input fokus lagi
	const handleInputFocus = () => {
		setSuggestions([])
		setActiveIndex(-1)
		setSkipSearch(false)
	}

	// Fungsi untuk menangani keyboard input
	const handleKeyDown = e => {
		if (suggestions.length === 0) {
			if (e.key === 'Enter') {
				setSuggestions([]) // pastikan Enter tanpa suggestion juga clear
				setActiveIndex(-1)
			}
			return
		}

		if (e.key === 'ArrowDown') {
			e.preventDefault()
			setActiveIndex(prev => (prev < suggestions.length - 1 ? prev + 1 : 0))
		}

		if (e.key === 'ArrowUp') {
			e.preventDefault()
			setActiveIndex(prev => (prev > 0 ? prev - 1 : suggestions.length - 1))
		}

		if (e.key === 'Enter') {
			e.preventDefault()
			if (activeIndex >= 0) {
				const selectedTitle = suggestions[activeIndex].title
				setSearchQuery(selectedTitle) // tambahin ini juga
				handleSuggestionClick(selectedTitle)
			} else {
				setSuggestions([])
				setActiveIndex(-1)
				handleFilter(e)
			}
		}

		if (e.key === 'Escape') {
			setSuggestions([])
			setActiveIndex(-1)
		}
	}

	return (
		<form onSubmit={handleFilter} className='flex items-center gap-4 flex-wrap'>
			{/* Input Pencarian */}
			<div className='w-full md:w-full lg:w-1/4 flex flex-col relative'>
				<input
					type='text'
					id='simple-search'
					value={searchQuery}
					onChange={e => handleChange(e, setSearchQuery)}
					onKeyDown={handleKeyDown}
					onFocus={handleInputFocus} // Menambahkan event handler
					placeholder='Search for movies...'
					className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block max-w-lg px-6 py-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
					autoFocus
					autoComplete='off'
				/>
				{suggestions.length > 0 && (
					<ul className='absolute top-full left-0 w-full bg-white border border-gray-300 rounded-lg shadow-md z-50 dark:bg-gray-700 dark:border-gray-600'>
						{suggestions.map((movie, index) => (
							<li
								key={movie.id}
								onClick={() => handleSuggestionClick(movie.title)}
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
			</div>

			{/* Kategori */}
			<SelectCustom1
				id='category'
				value={selectedCategory}
				onChange={e => handleChange(e, setSelectedCategory)}
				options={categoryOptions}
			/>

			{/* Genre */}
			<SelectCustom1
				id='genre'
				value={selectedGenre}
				onChange={e => handleChange(e, setSelectedGenre)}
				options={[
					{ value: 'all', label: 'All Genres' },
					...genres.map(g => ({ value: g.name.toLowerCase(), label: g.name }))
				]}
			/>

			{/* Tahun */}
			<SelectCustom1
				id='year'
				value={selectedYear}
				onChange={e => handleChange(e, setSelectedYear)}
				options={[
					{ value: '', label: 'All Years' },
					...years.map(y => ({ value: y, label: y }))
				]}
			/>

			<BtnPrimary title={'Filter'} />
			<BtnSecondary title={'Reset'} onClick={handleReset} />
		</form>
	)
}
