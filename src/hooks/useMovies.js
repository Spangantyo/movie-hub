'use client'
import { useState, useEffect } from 'react'
import {
	getPopularMovies,
	getUpcomingMovies,
	getNowPlayingMovies,
	getPopularActors
} from '@/lib/api'

export const useMovies = () => {
	const [popularMovies, setPopularMovies] = useState([])
	const [upcomingMovies, setUpcomingMovies] = useState([])
	const [nowPlayingMovies, setNowPlayingMovies] = useState([])
	const [popularActors, setPopularActors] = useState([])
	const [loading, setLoading] = useState(true)
	const [latest2025Movies, setLatest2025Movies] = useState([])

	// Helper function: ambil film yang rilis 2025
	const getLatest2025Movies = movies => {
		return movies.filter(movie => movie.release_date?.startsWith('2025')).slice(0, 5)
	}

	useEffect(() => {
		const fetchMoviesAndActors = async () => {
			setLoading(true)

			try {
				const popularMoviesData = await getPopularMovies(1)
				const upcomingMoviesData = await getUpcomingMovies(1)
				const nowPlayingMoviesData = await getNowPlayingMovies(1)
				const popularActorsData = await getPopularActors(1)

				// Set ke state masing-masing
				setPopularMovies(popularMoviesData.results)
				setUpcomingMovies(upcomingMoviesData.results)
				setNowPlayingMovies(nowPlayingMoviesData.results)
				setPopularActors(popularActorsData.results)

				// Gabungkan semua movies, lalu ambil yang rilis 2025
				const combinedMovies = [
					...popularMoviesData.results,
					...upcomingMoviesData.results,
					...nowPlayingMoviesData.results
				]

				setLatest2025Movies(getLatest2025Movies(combinedMovies))

				setLoading(false)
			} catch (error) {
				console.error('Error fetching data:', error)
				setLoading(false)
			}
		}

		fetchMoviesAndActors()
	}, [])

	return {
		popularMovies,
		upcomingMovies,
		nowPlayingMovies,
		popularActors,
		latest2025Movies, // ← ini bisa dipakai di komponen
		loading
	}
}
