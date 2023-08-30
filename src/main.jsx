import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/global.scss';
import 'primeicons/primeicons.css';
import { Provider } from 'react-redux';
import { store } from './store';
import 'primereact/resources/themes/bootstrap4-dark-blue/theme.css';
import 'primereact/resources/primereact.min.css';
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
