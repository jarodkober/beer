import { useEffect, useState } from 'react';
import { useAddBeerMutation } from '../store';
import { Button } from 'primereact/button';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { PropTypes } from 'prop-types';

function BeerForm({ onHide }) {
	BeerForm.propTypes = {
		onHide: PropTypes.func
	};

	const [state, setState] = useState({
		abv: '',
		brewery: '',
		location: '',
		name: '',
		quantity: '',
		size: '',
		stylePrimary: '',
		styleSecondary: ''
	});

	const [addBeer, results] = useAddBeerMutation();

	const handleFormSubmit = (event) => {
		event.preventDefault();

		addBeer(state);
	};

	const handleChange = (event) => {
		setState({ ...state, [event.target.id]: event.target.value });
	};

	useEffect(() => {
		if (results.isSuccess) {
			onHide();
		}
	}, [onHide, results]);

	return (
		<form onSubmit={handleFormSubmit}>
			<span className="p-float-label">
				<InputText
					id="name"
					onChange={handleChange}
					value={state.name}
				/>
				<label htmlFor="name">Beer Name</label>
			</span>

			<span className="p-float-label">
				<InputText
					id="brewery"
					onChange={handleChange}
					value={state.brewery}
				/>
				<label htmlFor="brewery">Brewery</label>
			</span>

			<span className="p-float-label">
				<InputText
					id="stylePrimary"
					onChange={handleChange}
					value={state.stylePrimary}
				/>
				<label htmlFor="stylePrimary">Style (Primary)</label>
			</span>

			<span className="p-float-label">
				<InputText
					id="styleSecondary"
					onChange={handleChange}
					value={state.styleSecondary}
				/>
				<label htmlFor="styleSecondary">Style (Secondary)</label>
			</span>

			<span className="p-float-label">
				<InputText
					id="location"
					onChange={handleChange}
					value={state.location}
				/>
				<label htmlFor="location">Location</label>
			</span>

			<span className="p-float-label">
				<InputNumber
					id="abv"
					maxFractionDigits={2}
					minFractionDigits={2}
					onValueChange={handleChange}
					suffix="%"
					value={state.abv}
				/>
				<label htmlFor="abv">ABV</label>
			</span>

			<span className="p-float-label">
				<InputNumber
					id="size"
					onValueChange={handleChange}
					suffix=" ml"
					value={state.size}
				/>
				<label htmlFor="size">Size (ml)</label>
			</span>

			<span className="p-float-label">
				<InputNumber
					id="quantity"
					min={1}
					onValueChange={handleChange}
					value={state.quantity}
				/>
				<label htmlFor="quantity">Quantity</label>
			</span>

			<Button
				icon="pi pi-plus"
				label="Add Beer"
			/>
		</form>
	);
}

export default BeerForm;
