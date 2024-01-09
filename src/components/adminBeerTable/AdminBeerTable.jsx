import { useEffect } from 'react';
import { PropTypes } from 'prop-types';
import {
	useGetBeersQuery,
	useGetBreweriesQuery,
	useGetStylesQuery,
	useUpdateBeerMutation
} from '../../store';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
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

	const [updateBeer, results] = useUpdateBeerMutation();

	const { data: breweriesData, error: breweriesError } = useGetBreweriesQuery(
		{
			user_auth: user.signInUserSession.idToken.jwtToken
		}
	);

	const { data: stylesData, error: stylesError } = useGetStylesQuery({
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

	const onRowEditComplete = (e) => {
		updateBeer({
			beer_abv: e.newData.beer_abv,
			beer_id: e.data.beer_id,
			beer_name: e.newData.beer_name,
			beer_style_id: e.newData.beer_style_id,
			beer_verified: e.newData.beer_verified,
			beer_vintage: e.newData.beer_vintage,
			brewery_id: e.newData.brewery_id,
			user_auth: user.signInUserSession.idToken.jwtToken,
			user_id: user.username
		});
	};

	const breweryEditor = (options) => {
		return (
			<Dropdown
				onChange={(e) => options.editorCallback(e.value)}
				optionLabel="brewery_name"
				optionValue="brewery_id"
				options={breweriesData}
				value={options.rowData.brewery_id}
			/>
		);
	};

	const stylesEditor = (options) => {
		return (
			<Dropdown
				onChange={(e) => options.editorCallback(e.value)}
				optionLabel="beer_style"
				optionValue="beer_style_id"
				options={stylesData}
				value={options.rowData.beer_style_id}
			/>
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

	useEffect(() => {
		error &&
			toast.current.show({
				severity: 'error',
				summary: 'Error',
				detail: 'An error occurred while loading the beers. This is most likely due to a cost-saving measure that pauses the database during periods of inactivity. Please try again in 30 seconds.',
				sticky: true
			});
	}, [error, toast]);

	useEffect(() => {
		results.error &&
			toast.current.show({
				detail: 'An error occurred while editing the beer. This is most likely due to a cost-saving measure that pauses the database during periods of inactivity. Please try again in 30 seconds.',
				severity: 'error',
				sticky: true,
				summary: 'Error'
			});
	}, [results.error, toast]);

	useEffect(() => {
		breweriesError &&
			toast.current.show({
				detail: 'An error occurred while loading the breweries. This is most likely due to a cost-saving measure that pauses the database during periods of inactivity. Please try again in 30 seconds.',
				severity: 'error',
				sticky: true,
				summary: 'Error'
			});
	});

	useEffect(() => {
		stylesError &&
			toast.current.show({
				detail: 'An error occurred while loading the beer styles. This is most likely due to a cost-saving measure that pauses the database during periods of inactivity. Please try again in 30 seconds.',
				severity: 'error',
				sticky: true,
				summary: 'Error'
			});
	});

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
					editor={(options) => textEditor(options)}
					field="beer_name"
					filter
					filterMatchMode="contains"
					filterPlaceholder="Filter by Beer"
					header="Name"
					sortable
				/>
				<Column
					body={isLoading && skeletonContent}
					editor={(options) => breweryEditor(options)}
					field="brewery_name"
					filter
					filterMatchMode="contains"
					filterPlaceholder="Filter by Brewery"
					header="Brewery"
					sortable
				/>
				<Column
					body={isLoading && skeletonContent}
					editor={(options) => textEditor(options)}
					field="beer_vintage"
					filter
					filterPlaceholder="Filter by Vintage"
					header="Vintage"
					sortable
				/>
				<Column
					body={isLoading && skeletonContent}
					editor={(options) => stylesEditor(options)}
					field="beer_style"
					filter
					filterMatchMode="contains"
					filterPlaceholder="Filter by Style"
					header="Style"
					sortable
				/>
				<Column
					body={isLoading && skeletonContent}
					editor={(options) => textEditor(options)}
					field="beer_abv"
					header="ABV"
					sortable
				/>
				<Column
					body={isLoading && skeletonContent}
					editor={(options) => textEditor(options)}
					field="beer_verified"
					header="Verified"
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
					field="action_buttons"
				/>
			</DataTable>
		</section>
	);
}

export default AdminBeerTable;
