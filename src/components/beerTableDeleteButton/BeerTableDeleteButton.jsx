import { useEffect } from 'react';
import { Button } from 'primereact/button';
import { PiTrash } from 'react-icons/pi';
import PropTypes from 'prop-types';
import { useDeleteBeerFromCellarMutation } from '../../store';

function BeerTableDeleteButton({ beer_cellars_id, toast, user }) {
	BeerTableDeleteButton.propTypes = {
		beer_cellars_id: PropTypes.number,
		toast: PropTypes.object,
		user: PropTypes.object
	};

	const [deleteBeerFromCellar, results] = useDeleteBeerFromCellarMutation();

	const handleDeleteBeerFromCellar = () => {
		deleteBeerFromCellar({
			beer_cellars_id,
			user_auth: user.signInUserSession.idToken.jwtToken,
			user_id: user.username
		});
	};

	useEffect(() => {
		results.error &&
			toast.current.show({
				detail: 'An error occurred while removing a beer from your cellar. This is most likely due to a cost-saving measure that pauses the database during periods of inactivity. Please try again in 30 seconds.',
				severity: 'error',
				sticky: true,
				summary: 'Error'
			});
	}, [results.error, toast]);

	return (
		<Button
			aria-label="Delete beer from cellar"
			onClick={handleDeleteBeerFromCellar}
			text
		>
			<PiTrash />
		</Button>
	);
}

export default BeerTableDeleteButton;
