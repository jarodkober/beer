import { PropTypes } from 'prop-types';
import CellarTable from '../components/cellarTable/CellarTable';

function CellarPage({ toast, user }) {
	CellarPage.propTypes = {
		toast: PropTypes.object,
		user: PropTypes.object
	};

	return (
		<CellarTable
			toast={toast}
			user={user}
		/>
	);
}

export default CellarPage;
