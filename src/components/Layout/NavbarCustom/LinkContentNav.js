'use client'
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const LinkContentNav = ({ link, title, onClick, activePaths = [] }) => {
	const pathname = usePathname()
	const isActive =
		pathname === link || pathname.startsWith(`${link}/`) || activePaths.includes(pathname)

	return (
		<li>
			<Link
				href={link}
				onClick={onClick}
				className={`block px-4 py-2 md:p-0 rounded-sm transition duration-200 ${
					isActive
						? 'text-primary-600 font-semibold'
						: 'text-secondary-600 dark:text-secondary-400 hover:text-primary-600 dark:hover:text-primary-600'
				}`}
				aria-current={isActive ? 'page' : undefined}
			>
				{title}
			</Link>
		</li>
	)
}

export default LinkContentNav
