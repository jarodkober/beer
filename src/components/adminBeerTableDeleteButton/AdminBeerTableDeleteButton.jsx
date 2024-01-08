import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDeleteBeerMutation } from '../../store';
import { Button } from 'primereact/button';
import { PiTrash } from 'react-icons/pi';

function AdminBeerTableDeleteButton({ beer_id, toast, user }) {
	AdminBeerTableDeleteButton.propTypes = {
		beer_id: PropTypes.number,
		toast: PropTypes.object,
		user: PropTypes.object
	};

	const [deleteBeer, results] = useDeleteBeerMutation();

	const handleDeleteBeer = () => {
		deleteBeer({
			beer_id,
			user_auth: user.signInUserSession.idToken.jwtToken,
			user_id: user.username
		});
	};

	useEffect(() => {
		results.error &&
			toast.current.show({
				detail: 'An error occurred while deleting your beer. This is most likely due to a cost-saving measure that pauses the database during periods of inactivity. Please try again in 30 seconds.',
				severity: 'error',
				sticky: true,
				summary: 'Error'
			});
	}, [results.error, toast]);

	return (
		<Button
			aria-label="Delete Beer"
			onClick={handleDeleteBeer}
			text
		>
			<PiTrash />
		</Button>
	);
}

export default AdminBeerTableDeleteButton;
