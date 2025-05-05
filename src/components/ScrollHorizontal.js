import React from 'react'

export default function ScrollHorizontal({ children }) {
	return (
		<div className='w-full overflow-x-auto  scroll-smooth'>
			<div className='grid grid-flow-col auto-cols-[200px] gap-4 snap-x snap-mandatory'>
				{children}
			</div>
		</div>
	)
}
