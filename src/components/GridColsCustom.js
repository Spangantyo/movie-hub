import React from 'react'

export const GridColsCustom = ({ children }) => {
	return (
		<div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5 mt-4'>{children}</div>
	)
}
