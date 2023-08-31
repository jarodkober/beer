import { useGetBeersQuery } from '../store';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';

function BeerTable() {
	const { data, error, isLoading } = useGetBeersQuery();

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
			<DataTable value={content}>
				<Column
					field="name"
					header="Beer Name"
				></Column>
				<Column
					field="vintage"
					header="Vintage"
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

export default BeerTable;
