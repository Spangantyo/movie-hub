// utils/imageHelper.js
export const getImageUrl = path => {
	const BASE_URL = 'https://image.tmdb.org/t/p/w500'
	return `${BASE_URL}${path}`
}

// utils/linkHelper.js
export const getMovieLink = (id, title) => {
	// Mengubah spasi dalam title menjadi - dan memastikan format URL yang valid
	const formattedTitle = title.toLowerCase().replace(/\s+/g, '-')
	return `/movies/${id}`
}

export const getActorLink = (id, name) => {
	return `/actors/${id}` // Adjust if needed for your routing
}
