import { Button } from 'primereact/button';
import { useDrinkBeerMutation } from '../../store';
import PropTypes from 'prop-types';
import { PiBeerBottle } from 'react-icons/pi';

function BeerTableDrinkButton({
	disabled,
	beer_cellars_id,
	beer_quantity,
	beer_quantity_consumed,
	user
}) {
	BeerTableDrinkButton.propTypes = {
		disabled: PropTypes.bool,
		beer_cellars_id: PropTypes.number,
		beer_quantity: PropTypes.number,
		beer_quantity_consumed: PropTypes.number,
		user: PropTypes.object
	};

	const [drinkBeer] = useDrinkBeerMutation();

	const handleDrinkBeer = () => {
		drinkBeer({
			beer_cellars_id,
			beer_quantity: beer_quantity - 1,
			beer_quantity_consumed: beer_quantity_consumed + 1,
			user_auth: user.signInUserSession.idToken.jwtToken,
			user_id: user.username
		});
	};

	return (
		<Button
			aria-label="Drink a beer!"
			disabled={disabled}
			onClick={handleDrinkBeer}
		>
			<PiBeerBottle />
		</Button>
	);
}

export default BeerTableDrinkButton;
