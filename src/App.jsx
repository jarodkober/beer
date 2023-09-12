import BeerButton from './components/beerButton/BeerButton';
import BeerTable from './components/beerTable/BeerTable';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';

function App() {
	return (
		<>
			<Header />
			<main>
				<BeerButton />
				<BeerTable />
			</main>
			<Footer />
		</>
	);
}

export default App;
