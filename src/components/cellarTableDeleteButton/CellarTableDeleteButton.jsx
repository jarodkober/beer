import { useEffect, useRef } from 'react';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { PiTrash } from 'react-icons/pi';
import PropTypes from 'prop-types';
import { useDeleteCellarMutation } from '../../store';

function CellarTableDeleteButton({ cellar_id, user }) {
	CellarTableDeleteButton.propTypes = {
		cellar_id: PropTypes.number,
		user: PropTypes.object
	};

	const [deleteCellar, results] = useDeleteCellarMutation();

	const toast = useRef(null);

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
	}, [results.error]);

	return (
		<>
			<Toast ref={toast} />
			<Button
				aria-label="Delete cellar"
				onClick={handleDeleteCellar}
			>
				<PiTrash />
			</Button>
		</>
	);
}

export default CellarTableDeleteButton;
