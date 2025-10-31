import type { IAuthenticateGeneric, ICredentialTestRequest, ICredentialType, INodeProperties } from 'n8n-workflow';

export class TwingateApi implements ICredentialType {
	name = 'twingateApi';

	displayName = 'Twingate API';

	icon = 'file:twingate.svg' as const;

	documentationUrl = 'https://www.twingate.com/docs/api';

	properties: INodeProperties[] = [
		{
			displayName: 'Network Name',
			name: 'networkName',
			type: 'string',
			default: '',
			placeholder: 'your-network',
			description: 'Your Twingate network subdomain (without .twingate.com)',
			required: true,
		},
		{
			displayName: 'API Token',
			name: 'apiToken',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			description: 'Your Twingate API token from Settings > API in the Admin Console',
			required: true,
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				'X-API-KEY': '={{$credentials.apiToken}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://{{$credentials.networkName}}.twingate.com/api/graphql/',
			url: '',
			method: 'POST',
			body: {
				query: 'query { viewer { id } }',
			},
		},
	};
}

