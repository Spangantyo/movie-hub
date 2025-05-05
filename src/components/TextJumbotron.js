import React from 'react'
import { BtnPrimary, BtnSecondary } from './Buttons'
import Searching from './Searching'

export const TextJumbotron = ({ placeholder, autoFocus }) => {
	return (
		<div>
			<div className='w-full text-left'>
				<h5 className='text-lg mb-3 font-bold text-primary-800 dark:text-primary-600'>
					WELCOME TO !
				</h5>

				<h1 className='mb-8 text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl text-secondary-800 dark:text-secondary-300'>
					Movie<span className='text-primary-800 dark:text-primary-600'>Hub</span>
				</h1>

				<div className='w-full'>
					<p className='mb-8 max-w-3xl text-justify text-lg text-slate-700 dark:text-slate-300'>
						Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolores fugit
						quasi modi cupiditate, rerum illo quo error ducimus vero quos ullam.
					</p>
				</div>

				<div className='w-full mb-8'>
					<Searching
						className='max-w-lg'
						placeholder={placeholder}
						autoFocus={autoFocus}
					/>
				</div>

				<div className='flex flex-wrap justify-start gap-4'>
					<BtnPrimary title={'Explorer'} />
					<BtnSecondary title={'About'} />
				</div>
			</div>
		</div>
	)
}
