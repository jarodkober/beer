import { PropTypes } from 'prop-types';
import BeerTable from '../components/beerTable/BeerTable';

function BeerPage({ toast, user }) {
	BeerPage.propTypes = {
		toast: PropTypes.object,
		user: PropTypes.object
	};

	return (
		<BeerTable
			toast={toast}
			user={user}
		/>
	);
}

export default BeerPage;
