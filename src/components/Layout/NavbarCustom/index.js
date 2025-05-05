'use client'
import React, { useState } from 'react'
import ThemeToggle from '@/components/ThemeToggle'
import { LinkLogoNav } from './LinkLogoNav'
import { HiMenu, HiX, HiMenuAlt3 } from 'react-icons/hi'
import DesktopMenuNav from './DesktopMenuNav'
import MobileMenuNav from './MobileMenuNav'

export const NavbarCustom = ({ onToggleSidebar, isSidebarOpen }) => {
	const [isOpen, setIsOpen] = useState(false)
	const toggleMenu = () => setIsOpen(!isOpen)
	const closeMenu = () => setIsOpen(false)

	return (
		<div>
			{/* Top Navbar menus */}
			<nav className='fixed left-0 right-0 top-0 z-50 bg-secondary-50 dark:bg-secondary-900'>
				<div className='w-full flex flex-wrap items-center justify-between mx-auto px-10 py-7 md:px-12 shadow-md dark:shadow-white/5'>
					<div className='flex items-center'>
						<button
							onClick={onToggleSidebar}
							className='text-2xl mr-2 text-secondary-900 dark:text-white'
						>
							<HiMenu />
						</button>
						<LinkLogoNav />
					</div>
					<div className='flex items-center gap-4 md:order-2'>
						<ThemeToggle />
						<button
							className='text-2xl md:hidden'
							onClick={toggleMenu}
							aria-label='Toggle Menu'
						>
							{isOpen ? <HiX /> : <HiMenu />}
						</button>
					</div>

					{/* Desktop menu Navbar */}
					<div className='hidden md:flex md:items-center md:space-x-8'>
						<DesktopMenuNav />
					</div>
				</div>
			</nav>

			{/* Mobile menu Navbar sidebar */}
			<div
				className={`fixed top-28 right-5 z-50 h-fit rounded-lg w-40 transform transition-transform duration-300 border bg-secondary-50 dark:bg-secondary-900 border-secondary-200 dark:border-secondary-800 dark:shadow-white/5 shadow-md ${
					isOpen ? 'translate-x-0' : 'translate-x-[calc(100%+1.25rem)]'
				} md:hidden`}
			>
				<div className='flex flex-col p-4'>
					<MobileMenuNav closeMenu={closeMenu} />
				</div>
			</div>

			{/* Overlay click di mana pun tutup */}
			{isOpen && (
				<div
					className='fixed inset-0 bg-opacity-40 z-30 md:hidden'
					onClick={closeMenu}
				></div>
			)}
		</div>
	)
}
