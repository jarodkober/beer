import BeerButton from './components/beerButton/BeerButton';
import BeerTable from './components/BeerTable';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';

function App() {
	return (
		<>
			<Header />
			<main>
				<BeerButton />
				<BeerTable />
				<Footer />
			</main>
		</>
	);
}

export default App;
