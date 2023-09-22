import { PropTypes } from 'prop-types';
import CellarTable from '../components/cellarTable/CellarTable';

function CellarPage({ user }) {
	CellarPage.propTypes = {
		user: PropTypes.object
	};

	return <CellarTable user={user} />;
}

export default CellarPage;
