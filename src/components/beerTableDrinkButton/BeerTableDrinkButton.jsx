import { Button } from 'primereact/button';
import { useDrinkBeerMutation } from '../../store';
import PropTypes from 'prop-types';
import { PiBeerBottle } from 'react-icons/pi';

function BeerTableDrinkButton({ disabled, id, quantity }) {
	BeerTableDrinkButton.propTypes = {
		disabled: PropTypes.bool,
		id: PropTypes.number,
		quantity: PropTypes.number
	};

	const [drinkBeer] = useDrinkBeerMutation();

	const handleDrinkBeer = () => {
		drinkBeer({ id, quantity: quantity - 1 });
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
