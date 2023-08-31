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
					field="beer_name"
					header="Beer Name"
				></Column>
				<Column
					field="beer_vintage"
					header="Vintage"
				></Column>
				<Column
					field="brewery_name"
					header="Brewery"
				></Column>
				<Column
					field="beer_style"
					header="Style"
				></Column>
				<Column
					field="cellar_name"
					header="Cellar"
				></Column>
				<Column
					field="beer_abv"
					header="ABV"
				></Column>
				<Column
					field="beer_size"
					header="Size (ml)"
				></Column>
				<Column
					field="beer_quantity"
					header="Qty"
				></Column>
			</DataTable>
		</>
	);
}

export default BeerTable;
