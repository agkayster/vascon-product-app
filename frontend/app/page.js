import IntroductionPage from '../components/Introduction';
import SolutionsComponent from '../components/Solutions';
import FeaturesComponent from '../components/Features';

export default function Home() {
	return (
		<main className='bg-blue-500 min-h-full'>
			<IntroductionPage />
			<SolutionsComponent />
			<FeaturesComponent />
		</main>
	);
}
