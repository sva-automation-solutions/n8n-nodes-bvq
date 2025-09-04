import type {
	ICredentialType,
	INodeProperties,
	ICredentialTestRequest,
} from 'n8n-workflow';

export class bvqApi implements ICredentialType {
	name = 'bvqApi';
	displayName = 'BVQ API';
	
	documentationUrl = 
		'https://www.npmjs.com/package/n8n-nodes-bvq?activeTab=readme';
	properties: INodeProperties[] = [
		{
			displayName: 'Username',
			name: 'username',
			type: 'string',
			default: '',
			required: true,
		},
		{
			displayName: 'Password',
			name: 'password',
			type: 'string',
			default: '',
			required: true,
			typeOptions: {
				password: true,
			},
			
		},
		{
			displayName: 'Enterprise Monotoring Authentication Key',
			name: 'apiKey',
			type: 'string',
			default: '',
			typeOptions: {
				password: true,
			},
			description: 'Only mandatory when "Alerting" is selected',
		},
		{
			displayName: 'URL',
			name: 'apiBaseURL',
			type: 'string',
			default: '',
			required: true,
		},
		{
			displayName: 'Ignore SSL issues',
			name: 'ignoreSslIssues',
			type: 'boolean',
			default: false,
			description: 'Accept self-signed or invalid SSL certificates (unsafe)',
		},
	];

	test: ICredentialTestRequest = {
		request: {
			skipSslCertificateValidation: '={{$credentials.ignoreSslIssues}}',
			method: 'GET',
			url: '={{ $credentials.apiBaseURL.endsWith("/") ? $credentials.apiBaseURL + "api/data_sources/favorite.json?favoritePath=System%2FBVQ%2FTable%20views%2FLocalities%2FSite" : $credentials.apiBaseURL + "/api/data_sources/favorite.json?favoritePath=System%2FBVQ%2FTable%20views%2FLocalities%2FSite" }}',
			auth: {
				username: '={{ $credentials.username }}',
				password: '={{ $credentials.password }}',
			},
		},
	};
}