import { PropTypes } from 'prop-types';
import AdminBeerTable from '../components/adminBeerTable/AdminBeerTable';

function AdminPage({ toast, user }) {
	AdminPage.propTypes = {
		toast: PropTypes.object,
		user: PropTypes.object
	};

	return (
		<>
			{user.signInUserSession.idToken.payload['cognito:groups']?.includes(
				import.meta.env.VITE_AWS_USER_GROUP_BEER_ADMIN
			) ? (
				<AdminBeerTable
					toast={toast}
					user={user}
				/>
			) : (
				<div>You do not have permission to access this page.</div>
			)}
		</>
	);
}
export default AdminPage;
