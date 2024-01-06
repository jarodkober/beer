import {
	RDSDataClient,
	ExecuteStatementCommand
} from '@aws-sdk/client-rds-data';

const client = new RDSDataClient();

export const handler = async (event) => {
	const sqlParams = {
		database: process.env.DATABASE_NAME,
		includeResultMetadata: true,
		resourceArn: process.env.DATABASE_CLUSTER_ARN,
		secretArn: process.env.DATABASE_CREDENTIALS_SECRETS_STORE_ARN,
		sql: `SELECT
			beer_styles.beer_style,
			beers.beer_abv,
			beers.beer_id,
			beers.beer_name,
			beers.beer_style_id,
			beers.beer_verified,
			beers.beer_vintage,
			beers.brewery_id,
			breweries.brewery_name
		FROM public.beers
		INNER JOIN public.breweries on beers.brewery_id = breweries.brewery_id
		INNER JOIN public.beer_styles on beers.beer_style_id = beer_styles.beer_style_id`
	};

	const parseDataServiceResponse = (resp) => {
		let columns = resp.columnMetadata.map((c) => c.name);
		let data = resp.records.map((r) => {
			let obj = {};
			r.map((v, i) => {
				obj[columns[i]] = Object.values(v)[0];
			});
			return obj;
		});
		return data;
	};

	const command = new ExecuteStatementCommand(sqlParams);

	const response = await client.send(command);

	return parseDataServiceResponse(response);
};
