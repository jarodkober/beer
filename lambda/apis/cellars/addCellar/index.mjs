import {
	RDSDataClient,
	ExecuteStatementCommand
} from '@aws-sdk/client-rds-data';

const client = new RDSDataClient();

export const handler = async (event) => {
	const sqlParams = {
		database: process.env.DATABASE_NAME,
		includeResultMetadata: true,
		parameters: [
			{
				name: 'userId',
				typeHint: 'UUID',
				value: {
					stringValue: event.userId
				}
			}
		],
		resourceArn: process.env.DATABASE_CLUSTER_ARN,
		secretArn: process.env.DATABASE_CREDENTIALS_SECRETS_STORE_ARN,
		sql: 'SELECT * FROM public.cellars WHERE cellars.user_id = :userId'
	};

	const command = new ExecuteStatementCommand(sqlParams);
	const response = await client.send(command);

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

	return parseDataServiceResponse(response);
};
