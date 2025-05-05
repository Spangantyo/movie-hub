import React from 'react'
import LinkContentNav from './LinkContentNav'

const DesktopMenuNav = () => {
	return (
		<div>
			<ul className='flex flex-row font-medium space-x-6 text-md'>
				<LinkContentNav link='/' title='Home' />
				<LinkContentNav link='/movies' title='Movies' activePaths={['']} />
				<LinkContentNav link='/About' title='About' />
				<LinkContentNav link='/Contact' title='Contact' />
			</ul>
		</div>
	)
}

export default DesktopMenuNav
