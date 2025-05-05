import React from 'react'

export const BgRadical = ({ children }) => {
	return (
		<div className='relative min-h-screen'>
			{/* Background Layer */}
			<div className='absolute inset-0 -z-10'>
				<div className='relative h-full w-full'>
					<div
						className='
							absolute inset-0 opacity-30 mix-blend-multiply
							bg-[radial-gradient(ellipse_at_center,_theme(colors.primary.300),transparent)]
							dark:bg-[radial-gradient(ellipse_at_center,_theme(colors.primary.900),transparent)]
							md:bg-[radial-gradient(circle,_theme(colors.primary.300),transparent)]
							dark:md:bg-[radial-gradient(circle,_theme(colors.primary.900),transparent)]
							bg-center bg-cover bg-repeat
						'
					/>
				</div>
			</div>

			{/* Content */}
			<div className='relative z-10 min-h-screen flex-col pt-32 md:pt-36'>{children}</div>
		</div>
	)
}
