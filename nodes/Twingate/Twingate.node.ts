import type {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	IDataObject,
} from 'n8n-workflow';
import { NodeApiError } from 'n8n-workflow';

export class Twingate implements INodeType {
	usableAsTool = true;

	description: INodeTypeDescription = {
		displayName: 'Twingate',
		name: 'twingate',
		icon: 'file:twingate.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with Twingate GraphQL API',
		defaults: {
			name: 'Twingate',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'twingateApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Access Request',
						value: 'accessRequest',
					},
					{
						name: 'Connector',
						value: 'connector',
					},
					{
						name: 'Group',
						value: 'group',
					},
					{
						name: 'Remote Network',
						value: 'remoteNetwork',
					},
					{
						name: 'Resource',
						value: 'resource',
					},
					{
						name: 'User',
						value: 'user',
					},
				],
				default: 'user',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['user'],
					},
				},
				options: [
					{
						name: 'Create',
						value: 'create',
						description: 'Create a user',
						action: 'Create a user',
					},
					{
						name: 'Delete',
						value: 'delete',
						description: 'Delete a user',
						action: 'Delete a user',
					},
					{
						name: 'Get',
						value: 'get',
						description: 'Get a user by ID',
						action: 'Get a user',
					},
					{
						name: 'Get Many',
						value: 'getAll',
						description: 'Get many users',
						action: 'Get many users',
					},
					{
						name: 'Update',
						value: 'update',
						description: 'Update a user',
						action: 'Update a user',
					},
				],
				default: 'get',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['resource'],
					},
				},
				options: [
					{
						name: 'Create',
						value: 'create',
						description: 'Create a resource',
						action: 'Create a resource',
					},
					{
						name: 'Delete',
						value: 'delete',
						description: 'Delete a resource',
						action: 'Delete a resource',
					},
					{
						name: 'Get',
						value: 'get',
						description: 'Get a resource by ID',
						action: 'Get a resource',
					},
					{
						name: 'Get Many',
						value: 'getAll',
						description: 'Get many resources',
						action: 'Get many resources',
					},
					{
						name: 'Update',
						value: 'update',
						description: 'Update a resource',
						action: 'Update a resource',
					},
				],
				default: 'get',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['connector'],
					},
				},
				options: [
					{
						name: 'Create',
						value: 'create',
						description: 'Create a connector',
						action: 'Create a connector',
					},
					{
						name: 'Delete',
						value: 'delete',
						description: 'Delete a connector',
						action: 'Delete a connector',
					},
					{
						name: 'Get',
						value: 'get',
						description: 'Get a connector by ID',
						action: 'Get a connector',
					},
					{
						name: 'Get Many',
						value: 'getAll',
						description: 'Get many connectors',
						action: 'Get many connectors',
					},
					{
						name: 'Update',
						value: 'update',
						description: 'Update a connector',
						action: 'Update a connector',
					},
				],
				default: 'get',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['remoteNetwork'],
					},
				},
				options: [
					{
						name: 'Create',
						value: 'create',
						description: 'Create a remote network',
						action: 'Create a remote network',
					},
					{
						name: 'Delete',
						value: 'delete',
						description: 'Delete a remote network',
						action: 'Delete a remote network',
					},
					{
						name: 'Get',
						value: 'get',
						description: 'Get a remote network by ID',
						action: 'Get a remote network',
					},
					{
						name: 'Get Many',
						value: 'getAll',
						description: 'Get many remote networks',
						action: 'Get many remote networks',
					},
					{
						name: 'Update',
						value: 'update',
						description: 'Update a remote network',
						action: 'Update a remote network',
					},
				],
				default: 'get',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['group'],
					},
				},
				options: [
					{
						name: 'Create',
						value: 'create',
						description: 'Create a group',
						action: 'Create a group',
					},
					{
						name: 'Delete',
						value: 'delete',
						description: 'Delete a group',
						action: 'Delete a group',
					},
					{
						name: 'Get',
						value: 'get',
						description: 'Get a group by ID',
						action: 'Get a group',
					},
					{
						name: 'Get Many',
						value: 'getAll',
						description: 'Get many groups',
						action: 'Get many groups',
					},
					{
						name: 'Update',
						value: 'update',
						description: 'Update a group',
						action: 'Update a group',
					},
				],
				default: 'get',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['accessRequest'],
					},
				},
				options: [
					{
						name: 'Get',
						value: 'get',
						description: 'Get an access request by ID',
						action: 'Get an access request',
					},
					{
						name: 'Get Many',
						value: 'getAll',
						description: 'Get many access requests',
						action: 'Get many access requests',
					},
					{
						name: 'Approve',
						value: 'approve',
						description: 'Approve an access request',
						action: 'Approve an access request',
					},
					{
						name: 'Reject',
						value: 'reject',
						description: 'Reject an access request',
						action: 'Reject an access request',
					},
				],
				default: 'get',
			},
			{
				displayName: 'User ID',
				name: 'userId',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['user'],
						operation: ['get', 'update', 'delete'],
					},
				},
				default: '',
				required: true,
				description: 'The ID of the user',
			},
			{
				displayName: 'Return All',
				name: 'returnAll',
				type: 'boolean',
				displayOptions: {
					show: {
						resource: ['user'],
						operation: ['getAll'],
					},
				},
				default: false,
				description: 'Whether to return all results or only up to a given limit',
			},
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				displayOptions: {
					show: {
						resource: ['user'],
						operation: ['getAll'],
						returnAll: [false],
					},
				},
				typeOptions: {
					minValue: 1,
				},
				default: 50,
				description: 'Max number of results to return',
			},
			{
				displayName: 'Email',
				name: 'email',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['user'],
						operation: ['create'],
					},
				},
				default: '',
				placeholder: 'name@email.com',
				required: true,
				description: 'Email address of the user',
			},
			{
				displayName: 'First Name',
				name: 'firstName',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['user'],
						operation: ['create', 'update'],
					},
				},
				default: '',
				description: 'First name of the user',
			},
			{
				displayName: 'Last Name',
				name: 'lastName',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['user'],
						operation: ['create', 'update'],
					},
				},
				default: '',
				description: 'Last name of the user',
			},
			{
				displayName: 'Additional Fields',
				name: 'additionalFields',
				type: 'collection',
				placeholder: 'Add Field',
				displayOptions: {
					show: {
						resource: ['user'],
						operation: ['create', 'update'],
					},
				},
				default: {},
				options: [
					{
						displayName: 'Role',
						name: 'role',
						type: 'options',
						options: [
							{
								name: 'Access Reviewer',
								value: 'ACCESS_REVIEWER',
							},
							{
								name: 'Admin',
								value: 'ADMIN',
							},
							{
								name: 'DevOps',
								value: 'DEVOPS',
							},
							{
								name: 'Member',
								value: 'MEMBER',
							},
							{
								name: 'Support',
								value: 'SUPPORT',
							},
						],
						default: 'MEMBER',
						description: 'User role',
					},
				],
			},
			{
				displayName: 'Resource ID',
				name: 'resourceId',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['resource'],
						operation: ['get', 'update', 'delete'],
					},
				},
				default: '',
				required: true,
				description: 'The ID of the resource',
			},
			{
				displayName: 'Return All',
				name: 'returnAll',
				type: 'boolean',
				displayOptions: {
					show: {
						resource: ['resource'],
						operation: ['getAll'],
					},
				},
				default: false,
				description: 'Whether to return all results or only up to a given limit',
			},
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				displayOptions: {
					show: {
						resource: ['resource'],
						operation: ['getAll'],
						returnAll: [false],
					},
				},
				typeOptions: {
					minValue: 1,
				},
				default: 50,
				description: 'Max number of results to return',
			},
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['resource'],
						operation: ['create'],
					},
				},
				default: '',
				required: true,
				description: 'Name of the resource',
			},
			{
				displayName: 'Address',
				name: 'address',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['resource'],
						operation: ['create'],
					},
				},
				default: '',
				required: true,
				description: 'Address of the resource (IP, hostname, or CIDR)',
			},
			{
				displayName: 'Remote Network ID',
				name: 'remoteNetworkId',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['resource'],
						operation: ['create'],
					},
				},
				default: '',
				required: true,
				description: 'The ID of the remote network this resource belongs to',
			},
			{
				displayName: 'Connector ID',
				name: 'connectorId',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['connector'],
						operation: ['get', 'update', 'delete'],
					},
				},
				default: '',
				required: true,
				description: 'The ID of the connector',
			},
			{
				displayName: 'Return All',
				name: 'returnAll',
				type: 'boolean',
				displayOptions: {
					show: {
						resource: ['connector'],
						operation: ['getAll'],
					},
				},
				default: false,
				description: 'Whether to return all results or only up to a given limit',
			},
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				displayOptions: {
					show: {
						resource: ['connector'],
						operation: ['getAll'],
						returnAll: [false],
					},
				},
				typeOptions: {
					minValue: 1,
				},
				default: 50,
				description: 'Max number of results to return',
			},
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['connector', 'remoteNetwork', 'group'],
						operation: ['create'],
					},
				},
				default: '',
				required: true,
				description: 'Name of the connector, remote network, or group',
			},
			{
				displayName: 'Remote Network ID',
				name: 'remoteNetworkId',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['connector'],
						operation: ['create'],
					},
				},
				default: '',
				required: true,
				description: 'The ID of the remote network for the connector',
			},
			{
				displayName: 'Remote Network ID',
				name: 'remoteNetworkId',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['remoteNetwork'],
						operation: ['get', 'update', 'delete'],
					},
				},
				default: '',
				required: true,
				description: 'The ID of the remote network',
			},
			{
				displayName: 'Return All',
				name: 'returnAll',
				type: 'boolean',
				displayOptions: {
					show: {
						resource: ['remoteNetwork'],
						operation: ['getAll'],
					},
				},
				default: false,
				description: 'Whether to return all results or only up to a given limit',
			},
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				displayOptions: {
					show: {
						resource: ['remoteNetwork'],
						operation: ['getAll'],
						returnAll: [false],
					},
				},
				typeOptions: {
					minValue: 1,
				},
				default: 50,
				description: 'Max number of results to return',
			},
			{
				displayName: 'Group ID',
				name: 'groupId',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['group'],
						operation: ['get', 'update', 'delete'],
					},
				},
				default: '',
				required: true,
				description: 'The ID of the group',
			},
			{
				displayName: 'Return All',
				name: 'returnAll',
				type: 'boolean',
				displayOptions: {
					show: {
						resource: ['group'],
						operation: ['getAll'],
					},
				},
				default: false,
				description: 'Whether to return all results or only up to a given limit',
			},
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				displayOptions: {
					show: {
						resource: ['group'],
						operation: ['getAll'],
						returnAll: [false],
					},
				},
				typeOptions: {
					minValue: 1,
				},
				default: 50,
				description: 'Max number of results to return',
			},
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['resource', 'connector', 'remoteNetwork', 'group'],
						operation: ['update'],
					},
				},
				default: '',
				description: 'Name to update',
			},
			{
				displayName: 'Access Request ID',
				name: 'accessRequestId',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['accessRequest'],
						operation: ['get', 'approve', 'reject'],
					},
				},
				default: '',
				required: true,
				description: 'The ID of the access request',
			},
			{
				displayName: 'Return All',
				name: 'returnAll',
				type: 'boolean',
				displayOptions: {
					show: {
						resource: ['accessRequest'],
						operation: ['getAll'],
					},
				},
				default: false,
				description: 'Whether to return all results or only up to a given limit',
			},
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				displayOptions: {
					show: {
						resource: ['accessRequest'],
						operation: ['getAll'],
						returnAll: [false],
					},
				},
				typeOptions: {
					minValue: 1,
				},
				default: 50,
				description: 'Max number of results to return',
			},
		],
		usableAsTool: true,
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: IDataObject[] = [];
		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;
		const credentials = await this.getCredentials('twingateApi');
		const baseURL = `https://${credentials.networkName}.twingate.com/api/graphql/`;

		for (let i = 0; i < items.length; i++) {
			try {
				let query = '';
				let variables: IDataObject = {};

				if (resource === 'user') {
					if (operation === 'get') {
						const userId = this.getNodeParameter('userId', i) as string;
						query = `
							query GetUser($id: ID!) {
								user(id: $id) {
									id
									email
									firstName
									lastName
									role
									state
									type
									createdAt
									updatedAt
								}
							}
						`;
						variables = { id: userId };
					} else if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const limit = returnAll ? 1000 : (this.getNodeParameter('limit', i) as number);
						query = `
							query GetUsers($first: Int) {
								users(first: $first) {
									edges {
										node {
											id
											email
											firstName
											lastName
											role
											state
											type
											createdAt
											updatedAt
										}
									}
									pageInfo {
										hasNextPage
										endCursor
									}
								}
							}
						`;
						variables = { first: limit };
					} else if (operation === 'create') {
						const email = this.getNodeParameter('email', i) as string;
						const firstName = this.getNodeParameter('firstName', i) as string;
						const lastName = this.getNodeParameter('lastName', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						const role = additionalFields.role as string;
						query = `
							mutation CreateUser($email: String!, $firstName: String, $lastName: String, $role: String) {
								userCreate(input: { email: $email, firstName: $firstName, lastName: $lastName, role: $role }) {
									ok
									error
									entity {
										id
										email
										firstName
										lastName
										role
										state
									}
								}
							}
						`;
						variables = {
							email,
							firstName: firstName || undefined,
							lastName: lastName || undefined,
							role: role || undefined,
						};
					} else if (operation === 'update') {
						const userId = this.getNodeParameter('userId', i) as string;
						const firstName = this.getNodeParameter('firstName', i) as string;
						const lastName = this.getNodeParameter('lastName', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						const role = additionalFields.role as string;
						query = `
							mutation UpdateUser($id: ID!, $firstName: String, $lastName: String, $role: String) {
								userDetailsUpdate(id: $id, input: { firstName: $firstName, lastName: $lastName, role: $role }) {
									ok
									error
									entity {
										id
										email
										firstName
										lastName
										role
									}
								}
							}
						`;
						variables = {
							id: userId,
							firstName: firstName || undefined,
							lastName: lastName || undefined,
							role: role || undefined,
						};
					} else if (operation === 'delete') {
						const userId = this.getNodeParameter('userId', i) as string;
						query = `
							mutation DeleteUser($id: ID!) {
								userDelete(id: $id) {
									ok
									error
								}
							}
						`;
						variables = { id: userId };
					}
				} else if (resource === 'resource') {
					if (operation === 'get') {
						const resourceId = this.getNodeParameter('resourceId', i) as string;
						query = `
							query GetResource($id: ID!) {
								resource(id: $id) {
									id
									name
									address {
										type
										value
									}
									remoteNetwork {
										id
										name
									}
									createdAt
									updatedAt
								}
							}
						`;
						variables = { id: resourceId };
					} else if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const limit = returnAll ? 1000 : (this.getNodeParameter('limit', i) as number);
						query = `
							query GetResources($first: Int) {
								resources(first: $first) {
									edges {
										node {
											id
											name
											address {
												type
												value
											}
											remoteNetwork {
												id
												name
											}
										}
									}
									pageInfo {
										hasNextPage
										endCursor
									}
								}
							}
						`;
						variables = { first: limit };
					} else if (operation === 'create') {
						const name = this.getNodeParameter('name', i) as string;
						const address = this.getNodeParameter('address', i) as string;
						const remoteNetworkId = this.getNodeParameter('remoteNetworkId', i) as string;
						query = `
							mutation CreateResource($input: ResourceCreateMutationInput!) {
								resourceCreate(input: $input) {
									ok
									error
									entity {
										id
										name
										address {
											type
											value
										}
									}
								}
							}
						`;
						variables = {
							input: {
								name,
								address: address,
								remoteNetworkId,
							},
						};
					} else if (operation === 'update') {
						const resourceId = this.getNodeParameter('resourceId', i) as string;
						const name = this.getNodeParameter('name', i, false) as string;
						query = `
							mutation UpdateResource($id: ID!, $input: ResourceUpdateMutationInput!) {
								resourceUpdate(id: $id, input: $input) {
									ok
									error
									entity {
										id
										name
									}
								}
							}
						`;
						const input: IDataObject = {};
						if (name) input.name = name;
						variables = {
							id: resourceId,
							input,
						};
					} else if (operation === 'delete') {
						const resourceId = this.getNodeParameter('resourceId', i) as string;
						query = `
							mutation DeleteResource($id: ID!) {
								resourceDelete(id: $id) {
									ok
									error
								}
							}
						`;
						variables = { id: resourceId };
					}
				} else if (resource === 'connector') {
					if (operation === 'get') {
						const connectorId = this.getNodeParameter('connectorId', i) as string;
						query = `
							query GetConnector($id: ID!) {
								connector(id: $id) {
									id
									name
									remoteNetwork {
										id
										name
									}
									state
									createdAt
									updatedAt
								}
							}
						`;
						variables = { id: connectorId };
					} else if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const limit = returnAll ? 1000 : (this.getNodeParameter('limit', i) as number);
						query = `
							query GetConnectors($first: Int) {
								connectors(first: $first) {
									edges {
										node {
											id
											name
											remoteNetwork {
												id
												name
											}
											state
										}
									}
									pageInfo {
										hasNextPage
										endCursor
									}
								}
							}
						`;
						variables = { first: limit };
					} else if (operation === 'create') {
						const name = this.getNodeParameter('name', i) as string;
						const remoteNetworkId = this.getNodeParameter('remoteNetworkId', i) as string;
						query = `
							mutation CreateConnector($input: ConnectorCreateMutationInput!) {
								connectorCreate(input: $input) {
									ok
									error
									entity {
										id
										name
										remoteNetwork {
											id
											name
										}
									}
								}
							}
						`;
						variables = {
							input: {
								name,
								remoteNetworkId,
							},
						};
					} else if (operation === 'update') {
						const connectorId = this.getNodeParameter('connectorId', i) as string;
						const name = this.getNodeParameter('name', i, false) as string;
						query = `
							mutation UpdateConnector($id: ID!, $input: ConnectorUpdateMutationInput!) {
								connectorUpdate(id: $id, input: $input) {
									ok
									error
									entity {
										id
										name
									}
								}
							}
						`;
						const input: IDataObject = {};
						if (name) input.name = name;
						variables = {
							id: connectorId,
							input,
						};
					} else if (operation === 'delete') {
						const connectorId = this.getNodeParameter('connectorId', i) as string;
						query = `
							mutation DeleteConnector($id: ID!) {
								connectorDelete(id: $id) {
									ok
									error
								}
							}
						`;
						variables = { id: connectorId };
					}
				} else if (resource === 'remoteNetwork') {
					if (operation === 'get') {
						const remoteNetworkId = this.getNodeParameter('remoteNetworkId', i) as string;
						query = `
							query GetRemoteNetwork($id: ID!) {
								remoteNetwork(id: $id) {
									id
									name
									type
									location
									createdAt
									updatedAt
								}
							}
						`;
						variables = { id: remoteNetworkId };
					} else if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const limit = returnAll ? 1000 : (this.getNodeParameter('limit', i) as number);
						query = `
							query GetRemoteNetworks($first: Int) {
								remoteNetworks(first: $first) {
									edges {
										node {
											id
											name
											type
											location
										}
									}
									pageInfo {
										hasNextPage
										endCursor
									}
								}
							}
						`;
						variables = { first: limit };
					} else if (operation === 'create') {
						const name = this.getNodeParameter('name', i) as string;
						query = `
							mutation CreateRemoteNetwork($input: RemoteNetworkCreateMutationInput!) {
								remoteNetworkCreate(input: $input) {
									ok
									error
									entity {
										id
										name
									}
								}
							}
						`;
						variables = {
							input: {
								name,
							},
						};
					} else if (operation === 'update') {
						const remoteNetworkId = this.getNodeParameter('remoteNetworkId', i) as string;
						const name = this.getNodeParameter('name', i, false) as string;
						query = `
							mutation UpdateRemoteNetwork($id: ID!, $input: RemoteNetworkUpdateMutationInput!) {
								remoteNetworkUpdate(id: $id, input: $input) {
									ok
									error
									entity {
										id
										name
									}
								}
							}
						`;
						const input: IDataObject = {};
						if (name) input.name = name;
						variables = {
							id: remoteNetworkId,
							input,
						};
					} else if (operation === 'delete') {
						const remoteNetworkId = this.getNodeParameter('remoteNetworkId', i) as string;
						query = `
							mutation DeleteRemoteNetwork($id: ID!) {
								remoteNetworkDelete(id: $id) {
									ok
									error
								}
							}
						`;
						variables = { id: remoteNetworkId };
					}
				} else if (resource === 'group') {
					if (operation === 'get') {
						const groupId = this.getNodeParameter('groupId', i) as string;
						query = `
							query GetGroup($id: ID!) {
								group(id: $id) {
									id
									name
									type
									createdAt
									updatedAt
								}
							}
						`;
						variables = { id: groupId };
					} else if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const limit = returnAll ? 1000 : (this.getNodeParameter('limit', i) as number);
						query = `
							query GetGroups($first: Int) {
								groups(first: $first) {
									edges {
										node {
											id
											name
											type
										}
									}
									pageInfo {
										hasNextPage
										endCursor
									}
								}
							}
						`;
						variables = { first: limit };
					} else if (operation === 'create') {
						const name = this.getNodeParameter('name', i) as string;
						query = `
							mutation CreateGroup($input: GroupCreateMutationInput!) {
								groupCreate(input: $input) {
									ok
									error
									entity {
										id
										name
									}
								}
							}
						`;
						variables = {
							input: {
								name,
							},
						};
					} else if (operation === 'update') {
						const groupId = this.getNodeParameter('groupId', i) as string;
						const name = this.getNodeParameter('name', i, false) as string;
						query = `
							mutation UpdateGroup($id: ID!, $input: GroupUpdateMutationInput!) {
								groupUpdate(id: $id, input: $input) {
									ok
									error
									entity {
										id
										name
									}
								}
							}
						`;
						const input: IDataObject = {};
						if (name) input.name = name;
						variables = {
							id: groupId,
							input,
						};
					} else if (operation === 'delete') {
						const groupId = this.getNodeParameter('groupId', i) as string;
						query = `
							mutation DeleteGroup($id: ID!) {
								groupDelete(id: $id) {
									ok
									error
								}
							}
						`;
						variables = { id: groupId };
					}
				} else if (resource === 'accessRequest') {
					if (operation === 'get') {
						const accessRequestId = this.getNodeParameter('accessRequestId', i) as string;
						query = `
							query GetAccessRequest($id: ID!) {
								accessRequest(id: $id) {
									id
									reason
									requestedAt
									status
									user {
										id
										email
										firstName
										lastName
									}
									resource {
										id
										name
									}
								}
							}
						`;
						variables = { id: accessRequestId };
					} else if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const limit = returnAll ? 1000 : (this.getNodeParameter('limit', i) as number);
						query = `
							query GetAccessRequests($first: Int) {
								accessRequests(first: $first) {
									edges {
										node {
											id
											reason
											requestedAt
											status
											user {
												id
												email
											}
											resource {
												id
												name
											}
										}
									}
									pageInfo {
										hasNextPage
										endCursor
									}
								}
							}
						`;
						variables = { first: limit };
					} else if (operation === 'approve') {
						const accessRequestId = this.getNodeParameter('accessRequestId', i) as string;
						query = `
							mutation ApproveAccessRequest($id: ID!) {
								accessRequestApprove(id: $id) {
									ok
									error
									entity {
										id
										status
									}
								}
							}
						`;
						variables = { id: accessRequestId };
					} else if (operation === 'reject') {
						const accessRequestId = this.getNodeParameter('accessRequestId', i) as string;
						query = `
							mutation RejectAccessRequest($id: ID!) {
								accessRequestReject(id: $id) {
									ok
									error
									entity {
										id
										status
									}
								}
							}
						`;
						variables = { id: accessRequestId };
					}
				}

				const response = await this.helpers.httpRequest({
					method: 'POST',
					url: baseURL,
					headers: {
						'Content-Type': 'application/json',
						'X-API-KEY': credentials.apiToken as string,
					},
					body: JSON.stringify({
						query,
						variables,
					}),
				});

				if (response.errors) {
					throw new NodeApiError(this.getNode(), {
						message: `GraphQL Error: ${JSON.stringify(response.errors)}`,
					});
				}

				// Extract the actual data based on the operation
				let result = response.data;
				const dataKey = Object.keys(result)[0];
				if (result[dataKey]) {
					if (operation === 'getAll' && result[dataKey].edges) {
						result = result[dataKey].edges.map((edge: IDataObject) => edge.node);
					} else if (operation === 'getAll' && result[dataKey]) {
						result = Array.isArray(result[dataKey]) ? result[dataKey] : [result[dataKey]];
					} else if (result[dataKey].entity) {
						result = result[dataKey].entity;
					} else if (result[dataKey]) {
						result = result[dataKey];
					}

					if (Array.isArray(result)) {
						returnData.push(...result);
					} else {
						returnData.push(result as IDataObject);
					}
				}
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({ error: error instanceof Error ? error.message : String(error) });
					continue;
				}
				if (error instanceof NodeApiError) {
					throw error;
				}
				throw new NodeApiError(this.getNode(), {
					message: error instanceof Error ? error.message : String(error),
				});
			}
		}

		return [this.helpers.returnJsonArray(returnData)];
	}
}

