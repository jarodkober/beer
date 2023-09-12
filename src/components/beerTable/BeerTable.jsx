import styles from './BeerTable.module.scss';
import { useGetBeersQuery } from '../../store';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Skeleton } from 'primereact/skeleton';

function BeerTable() {
	const { data, error, isLoading } = useGetBeersQuery();

	const skeletonContent = () => {
		return <Skeleton height="1rem"></Skeleton>;
	};

	const skeletonRows = Array.from({ length: 25 }, (v, i) => i);

	let content;
	if (error) {
		// TODO: Add error handling here
	} else {
		content = (
			<DataTable
				filterDisplay="row"
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
					header="Beer Name"
					sortable
				></Column>
				<Column
					body={isLoading && skeletonContent}
					field="beer_vintage"
					filter
					filterPlaceholder="Filter by Vintage"
					header="Vintage"
					sortable
				></Column>
				<Column
					body={isLoading && skeletonContent}
					field="brewery_name"
					filter
					filterMatchMode="contains"
					filterPlaceholder="Filter by Brewery"
					header="Brewery"
					sortable
				></Column>
				<Column
					body={isLoading && skeletonContent}
					field="beer_style"
					filter
					filterMatchMode="contains"
					filterPlaceholder="Filter by Style"
					header="Style"
					sortable
				></Column>
				<Column
					body={isLoading && skeletonContent}
					field="cellar_name"
					filter
					filterMatchMode="contains"
					filterPlaceholder="Filter by Cellar"
					header="Cellar"
					sortable
				></Column>
				<Column
					body={isLoading && skeletonContent}
					field="beer_abv"
					header="ABV"
					sortable
				></Column>
				<Column
					body={isLoading && skeletonContent}
					field="beer_size"
					header="Size (ml)"
					sortable
				></Column>
				<Column
					body={isLoading && skeletonContent}
					field="beer_quantity"
					header="Qty"
					sortable
				></Column>
			</DataTable>
		);
	}

	return <section className={styles.beerTable}>{content}</section>;
}

export default BeerTable;
