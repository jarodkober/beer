import { PropTypes } from 'prop-types';

function AdminPage({ user }) {
	AdminPage.propTypes = {
		user: PropTypes.object
	};

	return (
		<>
			{user.signInUserSession.idToken.payload['cognito:groups']?.includes(
				import.meta.env.VITE_AWS_USER_GROUP_BEER_ADMIN
			) ? (
				<div>Admin Page</div>
			) : (
				<div>You do not have permission to access this page.</div>
			)}
		</>
	);
}
export default AdminPage;
