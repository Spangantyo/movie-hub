import React from 'react'

const index = ({ children, className = '' }) => {
	return (
		<div>
			<div
				className='p-6 border-[0.01px] border-secondary-100/50 shadow-md text-sm text-secondary-800 rounded-lg bg-secondary-50 dark:bg-secondary-800/50 dark:text-secondary-400 dark:border-secondary-700'
				role='alert'
			>
				<div className={`w-full ${className}`}>{children}</div>
			</div>
		</div>
	)
}

export default index
