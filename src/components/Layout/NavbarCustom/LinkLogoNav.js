import React from 'react'
import Link from 'next/link'

export const LinkLogoNav = () => {
	return (
		<div>
			<Link href={'/'} className='flex items-center space-x-3 rtl:space-x-reverse'>
				<span className='self-center text-lg md:text-2xl font-semibold whitespace-nowrap dark:text-white'>
					<span className='mr-2'>Mov</span>
					<span className='text-white px-3 py-1 rounded-md bg-primary-600'>Hub</span>
				</span>
			</Link>
		</div>
	)
}
