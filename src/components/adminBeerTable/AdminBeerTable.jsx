import { useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { useGetBeersQuery } from '../../store';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Skeleton } from 'primereact/skeleton';
import AdminBeerTableDeleteButton from '../adminBeerTableDeleteButton/AdminBeerTableDeleteButton';

function AdminBeerTable({ toast, user }) {
	AdminBeerTable.propTypes = {
		toast: PropTypes.object,
		user: PropTypes.object
	};

	const { data, error, isLoading } = useGetBeersQuery({
		user_auth: user.signInUserSession.idToken.jwtToken
	});

	const skeletonContent = () => {
		return <Skeleton height="1rem"></Skeleton>;
	};

	const skeletonRows = Array.from({ length: 25 }, (v, i) => i);

	const header = (
		<div>
			<h1>Beer Administration</h1>
		</div>
	);

	const deleteTemplate = (beer) => {
		return (
			<AdminBeerTableDeleteButton
				beer_id={beer.beer_id}
				key={beer.beer_id}
				toast={toast}
				user={user}
			></AdminBeerTableDeleteButton>
		);
	};

	useEffect(() => {
		error &&
			toast.current.show({
				severity: 'error',
				summary: 'Error',
				detail: 'An error occurred while loading the beers. This is most likely due to a cost-saving measure that pauses the database during periods of inactivity. Please try again in 30 seconds.',
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
					field="brewery_name"
					filter
					filterMatchMode="contains"
					filterPlaceholder="Filter by Brewery"
					header="Brewery"
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
					field="beer_style"
					filter
					filterMatchMode="contains"
					filterPlaceholder="Filter by Style"
					header="Style"
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
					field="beer_verified"
					header="Verified"
					sortable
				/>
				<Column
					body={deleteTemplate}
					bodyStyle={{ textAlign: 'center' }}
					headerStyle={{ width: '2%' }}
					field="action_buttons"
				/>
			</DataTable>
		</section>
	);
}

export default AdminBeerTable;
