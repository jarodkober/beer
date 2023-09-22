import { useEffect, useRef } from 'react';
import styles from './CellarTable.module.scss';
import { PropTypes } from 'prop-types';
import { useGetCellarsQuery } from '../../store';
import { Skeleton } from 'primereact/skeleton';
import { Toast } from 'primereact/toast';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import CellarForm from '../cellarForm/CellarForm';
import ModalTriggerButton from '../modalTriggerButton/ModalTriggerButton';

function CellarTable({ user }) {
	CellarTable.propTypes = {
		user: PropTypes.object
	};

	const { data, error, isLoading } = useGetCellarsQuery(user.username);

	const toast = useRef(null);

	const skeletonContent = () => {
		return <Skeleton height="1rem"></Skeleton>;
	};

	const header = (
		<div className={styles['table-header']}>
			<h1>{user.attributes.name}&rsquo;s Cellars</h1>
			<ModalTriggerButton
				buttonLabel="Add Cellar"
				modalBodyComponent={<CellarForm />}
				modalHeader="Create a Cellar"
				user={user}
			/>
		</div>
	);

	const skeletonRows = Array.from({ length: 5 }, (v, i) => i);

	useEffect(() => {
		error &&
			toast.current.show({
				detail: 'Error loading cellars.',
				severity: 'error',
				sticky: true,
				summary: 'Error'
			});
	}, [error]);

	return (
		<section className={styles.table}>
			<Toast ref={toast} />

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
					field="name"
					filter
					filterMatchMode="contains"
					filterPlaceholder="Filter by Name"
					header="Name"
					sortable
				></Column>
				<Column
					body={isLoading && skeletonContent}
					field="description"
					filter
					filterMatchMode="contains"
					filterPlaceholder="Filter by Description"
					header="Description"
				></Column>
			</DataTable>
		</section>
	);
}

export default CellarTable;
