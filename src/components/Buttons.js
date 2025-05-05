'use client'

import { useState, useEffect, useRef } from 'react'
import { IoIosArrowDown } from 'react-icons/io'

export const BtnPrimary = ({ title }) => {
	return (
		<div>
			<button className='rounded-lg px-6 py-3 font-medium transition-all duration-300 ease-in-out bg-primary-800 text-white hover:bg-primary-600 dark:bg-primary-600 dark:hover:bg-primary-500'>
				{title}
			</button>
		</div>
	)
}

export const BtnSecondary = ({ title, onClick }) => {
	return (
		<div>
			<button
				{...(onClick && { onClick })}
				className='rounded-lg border px-6 py-3 font-medium transition-all duration-300 ease-in-out border-secondary-300 bg-secondary-200 text-secondary-800 hover:bg-secondary-50 dark:border-secondary-700 dark:bg-secondary-800 dark:text-secondary-100 dark:hover:bg-secondary-700'
			>
				{title}
			</button>
		</div>
	)
}

export const DropdownPrimary = ({ menuItems, title, onSelect }) => {
	const [isOpen, setIsOpen] = useState(false)
	const dropdownRef = useRef(null)
	const buttonRef = useRef(null)

	// Function to toggle the dropdown visibility
	const toggleDropdown = () => {
		setIsOpen(prevState => !prevState) // Toggle the dropdown visibility
	}

	// Close dropdown when clicking outside of it, including the button
	useEffect(() => {
		const handleClickOutside = event => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target) &&
				buttonRef.current &&
				!buttonRef.current.contains(event.target)
			) {
				setIsOpen(false)
			}
		}

		document.addEventListener('mousedown', handleClickOutside)

		// Cleanup the event listener on unmount
		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [])

	// Function to handle item click and close the dropdown
	const handleItemClick = item => {
		if (onSelect) {
			onSelect(item.value) // Call onSelect with the value of the selected item
		}
		setIsOpen(false) // Close dropdown after selecting an item
	}

	return (
		<div className='relative'>
			{/* Button to trigger dropdown */}
			<button
				ref={buttonRef} // Reference to the button
				id='dropdownDefaultButton'
				onClick={toggleDropdown} // Toggle dropdown visibility
				className='rounded-lg text-sm px-5 py-2.5 text-center font-bold inline-flex items-center text-primary-800 dark:text-primary-600 shadow-sm bg-transparent border border-primary-800 dark:border-primary-600 '
				type='button'
			>
				{title} <IoIosArrowDown className='w-3 h-3 ms-3' />
			</button>

			{/* Dropdown menu with dynamic visibility */}
			<div
				ref={dropdownRef} // Reference to the dropdown
				id='dropdown'
				className={`${
					isOpen ? 'block' : 'hidden'
				} absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700 top-full mt-1`}
				style={{ left: 0 }} // Position dropdown right below the button
			>
				<ul className='py-2 text-sm text-gray-700 dark:text-gray-200'>
					{/* Map over the menuItems array to render each item */}
					{menuItems.map((item, index) => (
						<li key={index}>
							<a
								href='#'
								onClick={() => handleItemClick(item)} // Handle item click
								className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
							>
								{item.label}
							</a>
						</li>
					))}
				</ul>
			</div>
		</div>
	)
}
