'use client'

import React from 'react'

export const SelectCustom1 = ({ id, options, value, onChange }) => {
	return (
		<div className='max-w-sm'>
			<select
				id={id}
				value={value}
				onChange={onChange}
				className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full px-6 py-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white'
			>
				{options.map(opt => (
					<option key={opt.value} value={opt.value}>
						{opt.label}
					</option>
				))}
			</select>
		</div>
	)
}
