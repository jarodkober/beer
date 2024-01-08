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
		sql: 'DELETE FROM public.beer_cellars WHERE beer_cellars_id = :beer_cellars_id AND user_id = :user_id'
	};

	const command = new ExecuteStatementCommand(sqlParams);

	const response = await client.send(command);

	if (response.numberOfRecordsUpdated === 0) {
		throw new Error(
			'Beer was not removed from your cellar because it does not exist.'
		);
	}
};
