import React from 'react'
import LinkContentNav from './LinkContentNav'

const MobileMenuNav = ({ closeMenu }) => {
	return (
		<div>
			<ul className='flex flex-col gap-2 font-medium text-sm'>
				<LinkContentNav link={'/'} title={'Home'} isActive={true} onClick={closeMenu} />
				<LinkContentNav
					link={'/Movie'}
					title={'Movie'}
					activePaths={['/Movie/search/']}
					isActive={false}
					onClick={closeMenu}
				/>
				<LinkContentNav
					link={'/About'}
					title={'About'}
					isActive={false}
					onClick={closeMenu}
				/>
				<LinkContentNav
					link={'/Contact'}
					title={'Contact'}
					isActive={false}
					onClick={closeMenu}
				/>
			</ul>
		</div>
	)
}

export default MobileMenuNav
