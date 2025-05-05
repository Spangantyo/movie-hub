/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: 'class',
	content: [
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',

		// Or if using `src` directory:
		'./src/**/*.{js,ts,jsx,tsx,mdx}'
	],
	theme: {
		extend: {
			colors: {
				primary: {
					50: '#fdf2f8', // pink-50
					100: '#fce7f3', // pink-100
					200: '#fbcfe8', // pink-200
					300: '#f9a8d4', // pink-300
					400: '#f472b6', // pink-400
					500: '#ec4899', // pink-500
					600: '#db2777', // pink-600
					700: '#be185d', // pink-700
					800: '#9d174d', // pink-800
					900: '#831843', // pink-900
					950: '#500724' // pink-950
				},
				secondary: {
					50: '#f8fafc', // slate-50
					100: '#f1f5f9', // slate-100
					200: '#e2e8f0', // slate-200
					300: '#cbd5e1', // slate-300
					400: '#94a3b8', // slate-400
					500: '#64748b', // slate-500
					600: '#475569', // slate-600
					700: '#334155', // slate-700
					800: '#1e293b', // slate-800
					900: '#0f172a', // slate-900
					950: '#020617' // slate-950
				},
				error: {
					50: '#fef2f2', // red-50
					100: '#fee2e2', // red-100
					200: '#fecaca', // red-200
					300: '#fca5a5', // red-300
					400: '#f87171', // red-400
					500: '#ef4444', // red-500
					600: '#dc2626', // red-600
					700: '#b91c1c', // red-700
					800: '#991b1b', // red-800
					900: '#7f1d1d', // red-900
					950: '#450a0a' // red-950
				},
				success: {
					50: '#f0fdf4', // green-50
					100: '#dcfce7', // green-100
					200: '#bbf7d0', // green-200
					300: '#86efac', // green-300
					400: '#4ade80', // green-400
					500: '#22c55e', // green-500
					600: '#16a34a', // green-600
					700: '#15803d', // green-700
					800: '#166534', // green-800
					900: '#14532d', // green-900
					950: '#064e14' // green-950
				},
				warning: {
					50: '#fffbeb', // yellow-50
					100: '#fef3c7', // yellow-100
					200: '#fde68a', // yellow-200
					300: '#fcd34d', // yellow-300
					400: '#fbbf24', // yellow-400
					500: '#f59e0b', // yellow-500
					600: '#d97706', // yellow-600
					700: '#b45309', // yellow-700
					800: '#92400e', // yellow-800
					900: '#78350f', // yellow-900
					950: '#4b2c05' // yellow-950
				}
			}
		}
	},
	plugins: [require('flowbite/plugin'), require('tailwind-scrollbar-hide')]
}
