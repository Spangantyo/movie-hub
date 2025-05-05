'use client'
import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { FaMoon, FaSun } from 'react-icons/fa'

const ThemeToggle = () => {
	const { theme, setTheme } = useTheme()
	const [mounted, setMounted] = useState(false)

	// Ensure that the theme is only set after the component mounts (client-side)
	useEffect(() => {
		setMounted(true)
	}, [])

	// If not mounted yet, don't render anything (avoids hydration mismatch)
	if (!mounted) {
		return null
	}

	return (
		<button
			onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
			className='p-2 bg-secondary-300 dark:bg-secondary-600 rounded-full'
		>
			{theme === 'dark' ? <FaSun /> : <FaMoon />}
		</button>
	)
}

export default ThemeToggle
