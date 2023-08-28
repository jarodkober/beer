import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store';
import 'primereact/resources/themes/bootstrap4-dark-blue/theme.css';
import { PrimeReactProvider } from 'primereact/api';
import App from './App.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<Provider store={store}>
			<PrimeReactProvider>
				<App />
			</PrimeReactProvider>
		</Provider>
	</React.StrictMode>
);
