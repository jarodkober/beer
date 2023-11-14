import { useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { useGetCellarsByUserQuery, useUpdateCellarMutation } from '../../store';
import { InputText } from 'primereact/inputtext';
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

	const { data, error, isLoading } = useGetCellarsByUserQuery({
		user_auth: user.signInUserSession.idToken.jwtToken,
		user_id: user.username
	});

	const [updateCellar, results] = useUpdateCellarMutation();

	const skeletonContent = () => {
		return <Skeleton height="1rem"></Skeleton>;
	};

	const skeletonRows = Array.from({ length: 5 }, (v, i) => i);

	const header = (
		<div>
			<h1>{user.attributes.name}&rsquo;s Cellars</h1>
			<ModalTriggerButton
				buttonLabel="Add Cellar"
				modalBodyComponent={<CellarForm toast={toast} />}
				modalHeader="Create a Cellar"
				user={user}
			/>
		</div>
	);

	const deleteTemplate = (cellar) => {
		return (
			<CellarTableDeleteButton
				cellar_id={cellar.cellar_id}
				key={cellar.cellar_id}
				toast={toast}
				user={user}
			></CellarTableDeleteButton>
		);
	};

	const textEditor = (options) => {
		return (
			<InputText
				onChange={(e) => options.editorCallback(e.target.value)}
				required="true"
				type="text"
				value={options.value}
			/>
		);
	};

	const onRowEditComplete = (e) => {
		updateCellar({
			cellar_description: e.newData.cellar_description,
			cellar_id: e.data.cellar_id,
			cellar_name: e.newData.cellar_name,
			user_auth: user.signInUserSession.idToken.jwtToken,
			user_id: user.username
		});
	};

	useEffect(() => {
		error &&
			toast.current.show({
				detail: 'An error occurred while loading your cellars. This is most likely due to a cost-saving measure that pauses the database during periods of inactivity. Please try again in 30 seconds.',
				severity: 'error',
				sticky: true,
				summary: 'Error'
			});
	}, [error, toast]);

	useEffect(() => {
		results.error &&
			toast.current.show({
				detail: 'An error occurred while updating your cellar. This is most likely due to a cost-saving measure that pauses the database during periods of inactivity. Please try again in 30 seconds.',
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
				stripedRows
				value={isLoading ? skeletonRows : data}
			>
				<Column
					body={isLoading && skeletonContent}
					editor={(options) => textEditor(options)}
					field="cellar_name"
					filter
					filterMatchMode="contains"
					filterPlaceholder="Filter by Name"
					header="Name"
					sortable
				/>
				<Column
					body={isLoading && skeletonContent}
					editor={(options) => textEditor(options)}
					field="cellar_description"
					filter
					filterMatchMode="contains"
					filterPlaceholder="Filter by Description"
					header="Description"
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

export default CellarTable;
