import { useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { useGetBeersByUserQuery } from '../../store';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Skeleton } from 'primereact/skeleton';
import BeerForm from '../beerForm/BeerForm';
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

	return (
		<section>
			<DataTable
				filterDisplay="row"
				header={header}
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
					field="beer_cost"
					header="Cost"
					sortable
				/>
				<Column
					body={isLoading && skeletonContent}
					field="beer_quantity"
					header="Qty"
					sortable
				/>
				<Column
					body={editTemplate}
					field="edit_buttons"
					header="Cheers!"
				/>
			</DataTable>
		</section>
	);
}

export default BeerTable;
