import {
	RDSDataClient,
	ExecuteStatementCommand
} from '@aws-sdk/client-rds-data';

const client = new RDSDataClient();

export const handler = async (event) => {
	const sqlParams = {
		database: process.env.DATABASE_NAME,
		parameters: [
			{
				name: 'beer_abv',
				value: {
					longValue: event.beer_abv
				}
			},
			{
				name: 'beer_cost',
				value: {
					longValue: event.beer_cost
				}
			},
			{
				name: 'beer_name',
				value: {
					stringValue: event.beer_name
				}
			},
			{
				name: 'beer_quantity',
				value: {
					longValue: event.beer_quantity
				}
			},
			{
				name: 'beer_size_id',
				value: {
					longValue: event.beer_size_id
				}
			},
			{
				name: 'beer_style_id',
				value: {
					longValue: event.beer_style_id
				}
			},
			{
				name: 'beer_vintage',
				value: {
					longValue: event.beer_vintage
				}
			},
			{
				name: 'brewery_id',
				value: {
					longValue: event.brewery_id
				}
			},
			{
				name: 'cellar_id',
				value: {
					longValue: event.cellar_id
				}
			},
			{
				name: 'user_id',
				typeHint: 'UUID',
				value: {
					stringValue: event.user_id
				}
			}
		],
		resourceArn: process.env.DATABASE_CLUSTER_ARN,
		secretArn: process.env.DATABASE_CREDENTIALS_SECRETS_STORE_ARN,
		sql: `WITH s AS (
				SELECT beer_id
				FROM public.beers
				WHERE beer_name = :beer_name AND beer_vintage = :beer_vintage AND brewery_id = :brewery_id
			), i as (
				INSERT INTO public.beers (beer_name, beer_abv, beer_vintage, beer_style_id, brewery_id)
				SELECT :beer_name, :beer_abv, :beer_vintage, :beer_style_id, :brewery_id
				WHERE NOT EXISTS (SELECT 1 FROM s)
				RETURNING beer_id
			)
			
			INSERT INTO public.beer_cellars (beer_id, cellar_id, beer_quantity, user_id, beer_cost, beer_size_id)
			SELECT beer_id, :cellar_id, :beer_quantity, :user_id, :beer_cost, :beer_size_id
			FROM i
			UNION ALL
			SELECT beer_id, :cellar_id, :beer_quantity, :user_id, :beer_cost, :beer_size_id
			FROM s`
	};

	const command = new ExecuteStatementCommand(sqlParams);

	const response = await client.send(command);
};
