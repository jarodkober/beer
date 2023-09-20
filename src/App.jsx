import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';
import {
	Authenticator,
	defaultDarkModeOverride,
	ThemeProvider
} from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import BeerButton from './components/beerButton/BeerButton';
import BeerTable from './components/beerTable/BeerTable';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';

Amplify.configure(awsExports);

function App() {
	const theme = {
		name: 'my-theme',
		overrides: [defaultDarkModeOverride]
	};

	return (
		<ThemeProvider
			colorMode="dark"
			theme={theme}
		>
			<Authenticator variation="modal">
				{({ signOut, user }) => (
					<>
						<Header
							signOut={signOut}
							user={user}
						/>
						<main>
							<BeerButton />
							<BeerTable />
						</main>
						<Footer />
					</>
				)}
			</Authenticator>
		</ThemeProvider>
	);
}

export default App;
