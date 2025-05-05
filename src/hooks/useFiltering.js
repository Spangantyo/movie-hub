'use client'

import { useState, useEffect } from 'react'
import { getGenres, searchMovies, getFilteredMovies } from '@/lib/api'

export const useFiltering = ({ searchQuery, genreQuery, yearQuery, categoryQuery, page = 1 }) => {
	const [movies, setMovies] = useState([])
	const [genres, setGenres] = useState([])
	const [loading, setLoading] = useState(true)
	const [totalPages, setTotalPages] = useState(0)
	const [totalResults, setTotalResults] = useState(0)

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true)

			const genreList = await getGenres()
			setGenres(genreList)

			let selectedGenreId = null
			if (genreQuery && genreQuery !== 'all') {
				const selectedGenre = genreList.find(
					genre => genre.name.toLowerCase() === genreQuery.toLowerCase()
				)
				selectedGenreId = selectedGenre ? selectedGenre.id : null
			}

			let result
			if (searchQuery) {
				result = await searchMovies(searchQuery, page, selectedGenreId)

				result.results = result.results.filter(movie => {
					const genreMatch =
						genreQuery === 'all' ||
						(Array.isArray(movie.genre_ids) &&
							(selectedGenreId === null || movie.genre_ids.includes(selectedGenreId)))

					const yearMatch =
						!yearQuery ||
						(movie.release_date && movie.release_date.startsWith(yearQuery))

					const categoryMatch = !categoryQuery || movie.category === categoryQuery

					return genreMatch && yearMatch && categoryMatch
				})
			} else {
				result = await getFilteredMovies({
					genreId: selectedGenreId,
					year: yearQuery,
					category: categoryQuery,
					page
				})
			}

			setMovies(result.results)
			setTotalPages(result.total_pages)
			setTotalResults(result.total_results)
			setLoading(false)
		}

		fetchData()
	}, [searchQuery, genreQuery, yearQuery, categoryQuery, page])

	return { movies, genres, loading, totalPages, totalResults }
}
