import { useRef } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';
import {
	Authenticator,
	defaultDarkModeOverride,
	ThemeProvider
} from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import BeerPage from './pages/BeerPage';
import CellarPage from './pages/CellarPage';
import { Toast } from 'primereact/toast';

Amplify.configure(awsExports);

function App() {
	const theme = {
		name: 'my-theme',
		overrides: [defaultDarkModeOverride]
	};

	const toast = useRef(null);

	return (
		<ThemeProvider
			colorMode="dark"
			theme={theme}
		>
			<Authenticator variation="modal">
				{({ signOut, user }) => (
					<Router>
						<div className="container">
							<Header signOut={signOut} />
							<main>
								<Routes>
									<Route
										element={
											<BeerPage
												toast={toast}
												user={user}
											/>
										}
										exact
										path="/"
									></Route>
									<Route
										element={
											<CellarPage
												toast={toast}
												user={user}
											/>
										}
										exact
										path="/cellars"
									></Route>
								</Routes>
							</main>
							<Footer />
							<Toast ref={toast} />
						</div>
					</Router>
				)}
			</Authenticator>
		</ThemeProvider>
	);
}

export default App;
