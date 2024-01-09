import {
	RDSDataClient,
	ExecuteStatementCommand
} from '@aws-sdk/client-rds-data';

const client = new RDSDataClient();

export const handler = async (event) => {
	if (event.user_id === process.env.ADMIN_USER_ID) {
		const sqlParams = {
			database: process.env.DATABASE_NAME,
			parameters: [
				{
					name: 'beer_id',
					value: {
						longValue: event.beer_id
					}
				},
				{
					name: 'beer_name',
					value: {
						stringValue: event.beer_name
					}
				},
				{
					name: 'beer_abv',
					value: {
						doubleValue: event.beer_abv
					}
				},
				{
					name: 'beer_vintage',
					value: {
						longValue: event.beer_vintage
					}
				},
				{
					name: 'beer_style_id',
					value: {
						longValue: event.beer_style_id
					}
				},
				{
					name: 'brewery_id',
					value: {
						longValue: event.brewery_id
					}
				},
				{
					name: 'beer_verified',
					value: {
						booleanValue: event.beer_verified
					}
				}
			],
			resourceArn: process.env.DATABASE_CLUSTER_ARN,
			secretArn: process.env.DATABASE_CREDENTIALS_SECRETS_STORE_ARN,
			sql: `UPDATE public.beers
				SET beer_id = :beer_id,
					beer_name = :beer_name,
					beer_abv = :beer_abv,
					beer_vintage = :beer_vintage,
					beer_style_id = :beer_style_id,
					brewery_id = :brewery_id,
					beer_verified = :beer_verified
				WHERE beer_id = :beer_id`
		};

		const command = new ExecuteStatementCommand(sqlParams);

		const response = await client.send(command);

		if (response.numberOfRecordsUpdated === 0) {
			throw new Error('Beer was not updated because it does not exist');
		}
	} else {
		throw new Error('You do not have permissions to perform this action');
	}
};
