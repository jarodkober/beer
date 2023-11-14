import { useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { useGetBreweriesQuery } from '../../store';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Skeleton } from 'primereact/skeleton';
import BreweryForm from '../breweryForm/BreweryForm';
import ModalTriggerButton from '../modalTriggerButton/ModalTriggerButton';

function BreweryTable({ toast, user }) {
	BreweryTable.propTypes = {
		toast: PropTypes.object,
		user: PropTypes.object
	};

	const { data, error, isLoading } = useGetBreweriesQuery({
		user_auth: user.signInUserSession.idToken.jwtToken,
		user_id: user.username
	});

	const skeletonRows = Array.from({ length: 5 }, (v, i) => i);

	const skeletonContent = () => {
		return <Skeleton height="1rem"></Skeleton>;
	};

	const header = (
		<div>
			<h1>Breweries</h1>
			<ModalTriggerButton
				buttonLabel="Add Brewery"
				modalBodyComponent={<BreweryForm toast={toast} />}
				modalHeader="Add a Brewery"
				user={user}
			/>
		</div>
	);

	useEffect(() => {
		error &&
			toast.current.show({
				detail: 'An error occurred while loading the breweries. This is most likely due to a cost-saving measure that pauses the database during periods of inactivity. Please try again in 30 seconds.',
				severity: 'error',
				sticky: true,
				summary: 'Error'
			});
	}, [error, toast]);

	return (
		<section>
			<DataTable
				header={header}
				filterDisplay="row"
				scrollable
				scrollHeight="flex"
				stripedRows
				value={isLoading ? skeletonRows : data}
			>
				<Column
					body={isLoading && skeletonContent}
					field="brewery_name"
					filter
					filterMatchMode="contains"
					filterPlaceholder="Filter by Name"
					header="Name"
					sortable
				/>
			</DataTable>
		</section>
	);
}

export default BreweryTable;
