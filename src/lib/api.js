import axios from 'axios'

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY
const BASE_URL = process.env.NEXT_PUBLIC_TMDB_BASE_URL

const api = axios.create({
	baseURL: BASE_URL,
	params: {
		api_key: API_KEY
	}
})

export const searchMovies = async (query, page = 1, genreId = null) => {
	const params = {
		query,
		page
	}

	// Menambahkan filter genre jika ada
	if (genreId) {
		params.with_genres = genreId
	}

	const response = await api.get('/search/movie', { params })
	return response.data
}

// Ambil semua movie tanpa filter
export const getAllMovies = async () => {
	const response = await api.get('/discover/movie')
	return response.data
}

// Ambil genre list
export const getGenres = async () => {
	const response = await api.get('/genre/movie/list')
	return response.data.genres
}

// Ambil movie berdasarkan kategori dengan pagination
export const getMoviesByCategory = async (category, page = 1) => {
	const response = await api.get(`/movie/${category}`, {
		params: {
			page
		}
	})
	return response.data // Membawa total_pages dan results
}

// Dynamic: bisa filter by genreId, year, category dengan pagination
export const getFilteredMovies = async ({ genreId, year, category, page = 1 }) => {
	// Kalau category ada → hit ke endpoint /movie/{category}
	if (category && category !== 'all') {
		const response = await api.get(`/movie/${category}`, {
			params: {
				with_genres: genreId,
				primary_release_year: year,
				page
			}
		})
		return response.data // Membawa total_pages dan results
	}

	// Kalau tidak ada category, pakai discover dengan pagination
	const response = await api.get('/discover/movie', {
		params: {
			with_genres: genreId,
			primary_release_year: year,
			page
		}
	})
	return response.data // Membawa total_pages dan results
}

// Ambil movie berdasarkan kategori "popular" dengan pagination
export const getPopularMovies = async (page = 1) => {
	const response = await api.get('/movie/popular', {
		params: {
			page
		}
	})
	return response.data // Membawa total_pages dan results
}
// Ambil movie berdasarkan kategori "upcoming" dengan pagination
export const getUpcomingMovies = async (page = 1) => {
	const response = await api.get('/movie/upcoming', {
		params: {
			page
		}
	})
	return response.data // Membawa total_pages dan results
}

// Ambil movie berdasarkan kategori "now_playing" dengan pagination
export const getNowPlayingMovies = async (page = 1) => {
	const response = await api.get('/movie/now_playing', {
		params: {
			page
		}
	})
	return response.data // Membawa total_pages dan results
}

export const getPopularActors = async (page = 1) => {
	try {
		const response = await api.get('/person/popular', {
			params: {
				page
			}
		})
		return response.data // Membawa total_pages dan results (daftar aktor)
	} catch (error) {
		console.error('Error fetching popular actors:', error)
		return { actors: [] }
	}
}
