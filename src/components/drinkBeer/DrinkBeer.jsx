import styles from './DrinkBeer.module.scss';
import { Button } from 'primereact/button';
import { useDrinkBeerMutation } from '../../store';
import PropTypes from 'prop-types';
import { PiBeerBottle } from 'react-icons/pi';

function DrinkBeer({ disabled, id, quantity }) {
	DrinkBeer.propTypes = {
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
			className={styles.drinkBeer}
			disabled={disabled}
			onClick={handleDrinkBeer}
		>
			<PiBeerBottle />
		</Button>
	);
}

export default DrinkBeer;
