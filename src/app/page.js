'use client'
import { useMovies } from '@/hooks/useMovies'
import { TextJumbotron } from '@/components/TextJumbotron'
import { SubTitle } from '@/components/SubTitle'
import { CardSm, CardSmCircleActor } from '@/components/Cards'
import ScrollHorizontal from '@/components/ScrollHorizontal'
import { HrCustom } from '@/components/HrCustom'
import CarouselJumbotron from '@/components/CarouselJumbotron'

export default function Home() {
	const { popularMovies, upcomingMovies, popularActors, latest2025Movies, loading } = useMovies()
	if (loading) return <p>Loading...</p>

	return (
		<div className='w-full flex flex-col gap-10'>
			<div className='w-full flex flex-col gap-5 md:flex-row'>
				<div className='w-full md:w-1/2'>
					<TextJumbotron autoFocus={true} placeholder={'Search Movies...'} />
				</div>
				<div className='w-full md:w-1/2'>
					<CarouselJumbotron movies={latest2025Movies} />
				</div>
			</div>
			<div className='w-full'>
				<SubTitle title={'Popular People'} className='my-5' />
				<ScrollHorizontal>
					<CardSmCircleActor actors={popularActors} />
				</ScrollHorizontal>
			</div>
			<HrCustom />
			<div className='w-full'>
				<SubTitle title={'Upcoming'} link={'/movies?category=upcoming'} className='mb-5' />
				<ScrollHorizontal>
					<CardSm movies={upcomingMovies} />
				</ScrollHorizontal>
			</div>
			<div className='w-full'>
				<SubTitle title={'Popular'} link={'/movies?category=popular'} className='mb-5' />
				<ScrollHorizontal>
					<CardSm movies={popularMovies} />
				</ScrollHorizontal>
			</div>
		</div>
	)
}
