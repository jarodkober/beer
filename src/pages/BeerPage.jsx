import { PropTypes } from 'prop-types';
import BeerTable from '../components/beerTable/BeerTable';

function BeerPage({ user }) {
	BeerPage.propTypes = {
		user: PropTypes.object
	};

	return <BeerTable user={user} />;
}

export default BeerPage;
