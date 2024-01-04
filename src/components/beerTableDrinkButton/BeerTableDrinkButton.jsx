import { Button } from 'primereact/button';
import { useUpdateBeerInCellarMutation } from '../../store';
import PropTypes from 'prop-types';
import { PiBeerBottle } from 'react-icons/pi';

function BeerTableDrinkButton({
	disabled,
	beer_cellars_id,
	beer_cost,
	beer_quantity,
	beer_quantity_consumed,
	beer_size_id,
	cellar_id,
	user
}) {
	BeerTableDrinkButton.propTypes = {
		disabled: PropTypes.bool,
		beer_cellars_id: PropTypes.number,
		beer_cost: PropTypes.number,
		beer_quantity: PropTypes.number,
		beer_quantity_consumed: PropTypes.number,
		beer_size_id: PropTypes.number,
		cellar_id: PropTypes.number,
		user: PropTypes.object
	};

	const [drinkBeer] = useUpdateBeerInCellarMutation();

	const handleDrinkBeer = () => {
		drinkBeer({
			beer_cellars_id,
			beer_cost,
			beer_quantity: beer_quantity - 1,
			beer_quantity_consumed: beer_quantity_consumed + 1,
			beer_size_id,
			cellar_id,
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
