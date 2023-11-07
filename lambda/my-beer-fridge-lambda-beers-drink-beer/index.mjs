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
				name: 'beer_cellars_id',
				value: {
					longValue: event.beer_cellars_id
				}
			},
			{
				name: 'beer_quantity',
				value: {
					longValue: event.beer_quantity
				}
			},
			{
				name: 'beer_quantity_consumed',
				value: {
					longValue: event.beer_quantity_consumed
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
		sql: `UPDATE public.beer_cellars
		      SET beer_quantity = :beer_quantity,
		          beer_quantity_consumed = :beer_quantity_consumed
          WHERE beer_cellars_id = :beer_cellars_id AND user_id = :user_id`
	};

	const command = new ExecuteStatementCommand(sqlParams);

	const response = await client.send(command);
};
