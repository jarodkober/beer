import { PropTypes } from 'prop-types';
import BreweryTable from '../components/breweryTable/BreweryTable';

function BreweryPage({ toast, user }) {
	BreweryPage.propTypes = {
		toast: PropTypes.object,
		user: PropTypes.object
	};

	return (
		<BreweryTable
			toast={toast}
			user={user}
		/>
	);
}

export default BreweryPage;
