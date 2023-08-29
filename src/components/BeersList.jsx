import { useAddBeerMutation, useGetBeersQuery } from '../store';
import { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

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
		const value =
			event.target.type === 'number'
				? parseInt(event.target.value)
				: event.target.value;
		setState({ ...state, [event.target.name]: value });
	};

	let content;
	if (isLoading) {
		// TODO: Add skeleton here
	} else if (error) {
		// TODO: Add error handling here
	} else {
		content = data;
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
					value={state.abv || ''}
				/>
				<label>Size (ml)</label>
				<input
					name="size"
					onChange={handleChange}
					type="number"
					value={state.size || ''}
				/>
				<label>Quantity</label>
				<input
					name="quantity"
					onChange={handleChange}
					type="number"
					value={state.quantity || ''}
				/>
				<button>Add Beer</button>
			</form>

			<DataTable value={content}>
				<Column
					field="name"
					header="Beer Name"
				></Column>
				<Column
					field="brewery"
					header="Brewery"
				></Column>
				<Column
					field="stylePrimary"
					header="Style (Primary)"
				></Column>
				<Column
					field="styleSecondary"
					header="Style (Secondary)"
				></Column>
				<Column
					field="location"
					header="Location"
				></Column>
				<Column
					field="abv"
					header="ABV"
				></Column>
				<Column
					field="size"
					header="Size (ml)"
				></Column>
				<Column
					field="quantity"
					header="Qty"
				></Column>
			</DataTable>
		</>
	);
}

export default BeersList;
