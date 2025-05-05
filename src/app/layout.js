import './globals.css'
import { Poppins } from 'next/font/google'
import { NavbarCustom } from '@/components/Layout/NavbarCustom'
import { ThemeProvider } from '@/components/ThemeProvider'
import { SectionCustomGlobal, SectionCustomPrivat } from '@/components/SectionCustom'
import { BgRadical } from '@/components/BgRadical'

const poppins = Poppins({
	variable: '--font-poppins',
	subsets: ['latin'],
	weight: ['400', '500', '600', '700']
})

export const metadata = {
	title: 'Movie Hub',
	description: 'Discover your favorite movies with ease.'
}

export default function RootLayout({ children }) {
	return (
		<html lang='en' suppressHydrationWarning>
			<body
				className={`antialiased ${poppins.variable} bg-secondary-100 dark:bg-secondary-900`}
			>
				<ThemeProvider>
					<BgRadical>
						<NavbarCustom />
						<SectionCustomGlobal>{children}</SectionCustomGlobal>
					</BgRadical>
				</ThemeProvider>
			</body>
		</html>
	)
}
