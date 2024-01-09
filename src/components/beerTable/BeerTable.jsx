import { useEffect } from 'react';
import { PropTypes } from 'prop-types';
import {
	useGetBeersByUserQuery,
	useUpdateBeerInCellarMutation
} from '../../store';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import { Skeleton } from 'primereact/skeleton';
import BeerForm from '../beerForm/BeerForm';
import BeerTableDeleteButton from '../beerTableDeleteButton/BeerTableDeleteButton';
import BeerTableDrinkButton from '../beerTableDrinkButton/BeerTableDrinkButton';
import ModalTriggerButton from '../modalTriggerButton/ModalTriggerButton';

function BeerTable({ toast, user }) {
	BeerTable.propTypes = {
		toast: PropTypes.object,
		user: PropTypes.object
	};

	const { data, error, isLoading } = useGetBeersByUserQuery({
		user_auth: user.signInUserSession.idToken.jwtToken,
		user_id: user.username
	});

	const [updateBeerInCellar, results] = useUpdateBeerInCellarMutation();

	const skeletonContent = () => {
		return <Skeleton height="1rem"></Skeleton>;
	};

	const editTemplate = (beer) => {
		return (
			<BeerTableDrinkButton
				disabled={beer.beer_quantity < 1}
				beer_cellars_id={beer.beer_cellars_id}
				beer_cost={parseFloat(beer.beer_cost)}
				key={beer.beer_cellars_id}
				beer_quantity={beer.beer_quantity}
				beer_quantity_consumed={beer.beer_quantity_consumed}
				beer_size_id={beer.beer_size_id}
				cellar_id={beer.cellar_id}
				user={user}
			></BeerTableDrinkButton>
		);
	};

	const header = (
		<div>
			<h1>{user.attributes.name}&rsquo;s Beers</h1>
			<ModalTriggerButton
				buttonLabel="Add Beer"
				modalBodyComponent={<BeerForm toast={toast} />}
				modalHeader="Add a Beer"
				user={user}
			/>
		</div>
	);

	const onRowEditComplete = (e) => {
		updateBeerInCellar({
			beer_cellars_id: e.data.beer_cellars_id,
			beer_cost: e.newData.beer_cost,
			beer_quantity: e.newData.beer_quantity,
			beer_quantity_consumed: e.newData.beer_quantity_consumed,
			beer_size_id: e.newData.beer_size_id,
			cellar_id: e.newData.cellar_id,
			user_auth: user.signInUserSession.idToken.jwtToken,
			user_id: user.username
		});
	};

	const deleteTemplate = (beer) => {
		return (
			<BeerTableDeleteButton
				beer_cellars_id={beer.beer_cellars_id}
				key={beer.beer_cellars_id}
				toast={toast}
				user={user}
			></BeerTableDeleteButton>
		);
	};

	const textEditor = (options) => {
		return (
			<InputText
				onChange={(e) => options.editorCallback(e.target.value)}
				required={true}
				type="text"
				value={options.value}
			/>
		);
	};

	const skeletonRows = Array.from({ length: 25 }, (v, i) => i);

	useEffect(() => {
		error &&
			toast.current.show({
				severity: 'error',
				summary: 'Error',
				detail: 'An error occurred while loading your beers. This is most likely due to a cost-saving measure that pauses the database during periods of inactivity. Please try again in 30 seconds.',
				sticky: true
			});
	}, [error, toast]);

	useEffect(() => {
		results.error &&
			toast.current.show({
				detail: 'An error occurred while editing your beer. This is most likely due to a cost-saving measure that pauses the database during periods of inactivity. Please try again in 30 seconds.',
				severity: 'error',
				sticky: true,
				summary: 'Error'
			});
	}, [results.error, toast]);

	return (
		<section>
			<DataTable
				editMode="row"
				filterDisplay="row"
				header={header}
				onRowEditComplete={onRowEditComplete}
				scrollable
				scrollHeight="flex"
				sortMode="multiple"
				stripedRows
				style={{ overflow: 'hidden' }}
				value={isLoading ? skeletonRows : data}
			>
				<Column
					body={isLoading && skeletonContent}
					field="beer_name"
					filter
					filterMatchMode="contains"
					filterPlaceholder="Filter by Beer"
					header="Name"
					sortable
				/>
				<Column
					body={isLoading && skeletonContent}
					field="beer_vintage"
					filter
					filterPlaceholder="Filter by Vintage"
					header="Vintage"
					sortable
				/>
				<Column
					body={isLoading && skeletonContent}
					field="brewery_name"
					filter
					filterMatchMode="contains"
					filterPlaceholder="Filter by Brewery"
					header="Brewery"
					sortable
				/>
				<Column
					body={isLoading && skeletonContent}
					field="beer_style"
					filter
					filterMatchMode="contains"
					filterPlaceholder="Filter by Style"
					header="Style"
					sortable
				/>
				<Column
					body={isLoading && skeletonContent}
					field="cellar_name"
					filter
					filterMatchMode="contains"
					filterPlaceholder="Filter by Cellar"
					header="Cellar"
					sortable
				/>
				<Column
					body={isLoading && skeletonContent}
					field="beer_abv"
					header="ABV"
					sortable
				/>
				<Column
					body={isLoading && skeletonContent}
					field="beer_size_name"
					filter
					header="Size"
					sortable
				/>
				<Column
					body={isLoading && skeletonContent}
					editor={(options) => textEditor(options)}
					field="beer_cost"
					header="Cost"
					sortable
				/>
				<Column
					body={isLoading && skeletonContent}
					editor={(options) => textEditor(options)}
					field="beer_quantity"
					header="Qty"
					sortable
				/>
				<Column
					bodyStyle={{ textAlign: 'center' }}
					headerStyle={{ width: '2%' }}
					rowEditor
				></Column>
				<Column
					body={deleteTemplate}
					bodyStyle={{ textAlign: 'center' }}
					headerStyle={{ width: '2%' }}
					field="delete_button"
				/>
				<Column
					body={editTemplate}
					field="edit_button"
					header="Cheers!"
				/>
			</DataTable>
		</section>
	);
}

export default BeerTable;
