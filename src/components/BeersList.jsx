import { useAddBeerMutation, useGetBeersQuery } from '../store';
import { useState } from 'react';

function BeersList() {
	const [state, setState] = useState({
		abv: 0,
		brewery: '',
		location: '',
		name: '',
		quantity: 0,
		size: 0,
		stylePrimary: '',
		styleSecondary: ''
	});

	const { data, error, isLoading } = useGetBeersQuery();

	const [addBeer] = useAddBeerMutation();

	const handleFormSubmit = (event) => {
		event.preventDefault();

		addBeer(state);
	};

	const handleChange = (event) => {
		const value = event.target.value;
		setState({ ...state, [event.target.name]: value });
	};

	let content;
	if (isLoading) {
		// TODO: Add skeleton here
	} else if (error) {
		// TODO: Add error handling here
	} else {
		content = data.map((beer) => {
			return (
				<tr key={beer.id}>
					<td>{beer.name}</td>
					<td>{beer.brewery}</td>
					<td>{beer.stylePrimary}</td>
					<td>{beer.styleSecondary}</td>
					<td>{beer.location}</td>
					<td>{beer.abv}</td>
					<td>{beer.size}</td>
					<td>{beer.quantity}</td>
				</tr>
			);
		});
	}

	return (
		<>
			<form onSubmit={handleFormSubmit}>
				<label>Beer Name</label>
				<input
					name="name"
					onChange={handleChange}
					type="text"
					value={state.name}
				/>
				<label>Brewery</label>
				<input
					name="brewery"
					onChange={handleChange}
					type="text"
					value={state.brewery}
				/>
				<label>Style (Primary)</label>
				<input
					name="stylePrimary"
					onChange={handleChange}
					type="text"
					value={state.stylePrimary}
				/>
				<label>Style (Secondary)</label>
				<input
					name="styleSecondary"
					onChange={handleChange}
					type="text"
					value={state.styleSecondary}
				/>
				<label>Location</label>
				<input
					name="location"
					onChange={handleChange}
					type="text"
					value={state.location}
				/>
				<label>ABV</label>
				<input
					name="abv"
					onChange={handleChange}
					type="number"
					value={state.abv}
				/>
				<label>Size (ml)</label>
				<input
					name="size"
					onChange={handleChange}
					type="number"
					value={state.size}
				/>
				<label>Quantity</label>
				<input
					name="quantity"
					onChange={handleChange}
					type="number"
					value={state.quantity}
				/>
				<button>Add Beer</button>
			</form>

			<table>
				<tbody>{content}</tbody>
			</table>
		</>
	);
}

export default BeersList;
