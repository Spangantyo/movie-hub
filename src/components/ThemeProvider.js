'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'

export const ThemeProvider = ({ children }) => {
	return (
		<NextThemesProvider attribute='class' defaultTheme='system' enableSystem={true}>
			{children}
		</NextThemesProvider>
	)
}
