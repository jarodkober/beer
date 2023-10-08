import { useEffect } from 'react';
import styles from './CellarTable.module.scss';
import { PropTypes } from 'prop-types';
import { useGetCellarsQuery } from '../../store';
import { Skeleton } from 'primereact/skeleton';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import CellarForm from '../cellarForm/CellarForm';
import ModalTriggerButton from '../modalTriggerButton/ModalTriggerButton';
import CellarTableDeleteButton from '../cellarTableDeleteButton/CellarTableDeleteButton';

function CellarTable({ toast, user }) {
	CellarTable.propTypes = {
		toast: PropTypes.object,
		user: PropTypes.object
	};

	const { data, error, isLoading } = useGetCellarsQuery({
		user_auth: user.signInUserSession.idToken.jwtToken,
		user_id: user.username
	});

	const skeletonContent = () => {
		return <Skeleton height="1rem"></Skeleton>;
	};

	const skeletonRows = Array.from({ length: 5 }, (v, i) => i);

	const header = (
		<div className={styles['table-header']}>
			<h1>{user.attributes.name}&rsquo;s Cellars</h1>
			<ModalTriggerButton
				buttonLabel="Add Cellar"
				modalBodyComponent={<CellarForm toast={toast} />}
				modalHeader="Create a Cellar"
				user={user}
			/>
		</div>
	);

	const actionsTemplate = (cellar) => {
		return (
			<CellarTableDeleteButton
				cellar_id={cellar.cellar_id}
				key={cellar.cellar_id}
				toast={toast}
				user={user}
			></CellarTableDeleteButton>
		);
	};

	useEffect(() => {
		error &&
			toast.current.show({
				detail: 'An error occurred while loading your cellars. Please try again.',
				severity: 'error',
				sticky: true,
				summary: 'Error'
			});
	}, [error, toast]);

	return (
		<section className={styles.table}>
			<DataTable
				filterDisplay="row"
				header={header}
				scrollable
				scrollHeight="flex"
				stripedRows
				value={isLoading ? skeletonRows : data}
			>
				<Column
					body={isLoading && skeletonContent}
					field="cellar_name"
					filter
					filterMatchMode="contains"
					filterPlaceholder="Filter by Name"
					header="Name"
					sortable
				></Column>
				<Column
					body={isLoading && skeletonContent}
					field="cellar_description"
					filter
					filterMatchMode="contains"
					filterPlaceholder="Filter by Description"
					header="Description"
				></Column>
				<Column
					body={actionsTemplate}
					field="action_buttons"
				></Column>
			</DataTable>
		</section>
	);
}

export default CellarTable;
