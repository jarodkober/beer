import styles from './BeerTable.module.scss';
import { useGetBeersQuery } from '../../store';
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
		<section className={styles.beerTable}>
			<DataTable
				filterDisplay="row"
				scrollable
				scrollHeight="flex"
				sortMode="multiple"
				stripedRows
				style={{ overflow: 'hidden' }}
				value={content}
			>
				<Column
					field="beer_name"
					filter
					filterMatchMode="contains"
					filterPlaceholder="Filter by Beer"
					header="Beer Name"
					sortable
				></Column>
				<Column
					field="beer_vintage"
					filter
					filterPlaceholder="Filter by Vintage"
					header="Vintage"
					sortable
				></Column>
				<Column
					field="brewery_name"
					filter
					filterMatchMode="contains"
					filterPlaceholder="Filter by Brewery"
					header="Brewery"
					sortable
				></Column>
				<Column
					field="beer_style"
					filter
					filterMatchMode="contains"
					filterPlaceholder="Filter by Style"
					header="Style"
					sortable
				></Column>
				<Column
					field="cellar_name"
					filter
					filterMatchMode="contains"
					filterPlaceholder="Filter by Cellar"
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
