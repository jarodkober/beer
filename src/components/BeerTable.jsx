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
		<section>
			<DataTable
				sortMode="multiple"
				value={content}
			>
				<Column
					field="beer_name"
					header="Beer Name"
					sortable
				></Column>
				<Column
					field="beer_vintage"
					header="Vintage"
					sortable
				></Column>
				<Column
					field="brewery_name"
					header="Brewery"
					sortable
				></Column>
				<Column
					field="beer_style"
					header="Style"
					sortable
				></Column>
				<Column
					field="cellar_name"
					header="Cellar"
					sortable
				></Column>
				<Column
					field="beer_abv"
					header="ABV"
					sortable
				></Column>
				<Column
					field="beer_size"
					header="Size (ml)"
					sortable
				></Column>
				<Column
					field="beer_quantity"
					header="Qty"
					sortable
				></Column>
			</DataTable>
		</section>
	);
}

export default BeerTable;
