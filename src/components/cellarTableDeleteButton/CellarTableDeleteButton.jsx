import { useEffect } from 'react';
import { Button } from 'primereact/button';
import { PiTrash } from 'react-icons/pi';
import PropTypes from 'prop-types';
import { useDeleteCellarMutation } from '../../store';

function CellarTableDeleteButton({ cellar_id, toast, user }) {
	CellarTableDeleteButton.propTypes = {
		cellar_id: PropTypes.number,
		toast: PropTypes.object,
		user: PropTypes.object
	};

	const [deleteCellar, results] = useDeleteCellarMutation();

	const handleDeleteCellar = () => {
		deleteCellar({
			cellar_id,
			user_auth: user.signInUserSession.idToken.jwtToken,
			user_id: user.username
		});
	};

	useEffect(() => {
		results.error &&
			toast.current.show({
				detail: 'An error occurred while deleting your cellar. Please try again.',
				severity: 'error',
				sticky: true,
				summary: 'Error'
			});
	}, [results.error, toast]);

	return (
		<Button
			aria-label="Delete cellar"
			onClick={handleDeleteCellar}
			text
		>
			<PiTrash />
		</Button>
	);
}

export default CellarTableDeleteButton;
