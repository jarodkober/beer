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
				name: 'brewery_name',
				value: {
					stringValue: event.brewery_name
				}
			}
		],
		resourceArn: process.env.DATABASE_CLUSTER_ARN,
		secretArn: process.env.DATABASE_CREDENTIALS_SECRETS_STORE_ARN,
		sql: 'INSERT INTO public.breweries (brewery_name) VALUES (:brewery_name)'
	};

	const command = new ExecuteStatementCommand(sqlParams);

	const response = await client.send(command);
};
