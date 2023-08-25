import { useGetBeersQuery } from '../store';

function BeersList() {
	const { data, error, isLoading } = useGetBeersQuery();

	let content;
	if (isLoading) {
		// TODO: Add skeleton here
	} else if (error) {
		// TODO: Add error handling here
	} else {
		content = data.map((beer) => {
			return (
				<tr key={beer.id}>
					<td>{beer.name}</td>
					<td>{beer.brewery}</td>
					<td>{beer.stylePrimary}</td>
					<td>{beer.styleSecondary}</td>
					<td>{beer.location}</td>
					<td>{beer.abv}</td>
					<td>{beer.size}</td>
					<td>{beer.quantity}</td>
				</tr>
			);
		});
	}

	return (
		<table>
			<tbody>{content}</tbody>
		</table>
	);
}

export default BeersList;
