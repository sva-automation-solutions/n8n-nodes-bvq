import {
    ApplicationError,
    NodeConnectionType,
	type IExecuteFunctions,
	type INodeExecutionData,
	type INodeType,
	type INodeTypeDescription,
} from 'n8n-workflow';

export class Bvq implements INodeType {
    
	description: INodeTypeDescription = {
        displayName: 'BVQ',
        name: 'bvq', 
        icon: 'file:Bvq.svg',
        group: ['transform'],
        version: 1,
        subtitle: 'Get BVQ Data',
        description: 'Get data from the BVQ API',
        defaults: {
            name: 'BVQ',
        },
        inputs: [NodeConnectionType.Main],
        outputs: [NodeConnectionType.Main],
        credentials: [
            {
                name: 'bvqApi',
                required: true,
            },
        ],        
        properties: [
            {
                displayName: 'Data Type',
                name: 'datatype',
                description: 'Select the data type you want to retrieve from the BVQ API',
                type: 'options',
                default: 'Alerts',
                options: [
                    {
                        name: 'Alerts',
                        value: 'Alerts', // identical to name, so the URL can be created based on selection
                        description: 'Returns the latest alerts',
                    },
                    {
                        name: 'Events',
                        value: 'Events', // identical to name, so the URL can be created based on selection
                        description: 'Returns the latest events',
                    },
                ],
                required: true,
            },
            {
                displayName: 'Event Source',
                name: 'EventSource',
                description: 'Select the source you want to retrieve events from. Only sources, which support events, will show up.',
                type: 'options',
                default: 'Hypervisor%2FvSphere',
                options: [
                    {
                        name: 'Hypervisor / vSphere',
                        value: 'Hypervisor%2FvSphere', // identical to name, so the URL can be created based on selection
                        description: 'Returns the latest events from BVQ/Hypervisor/vSphere',
                    },
                    {
                        name: 'Storage / SVC',
                        value: 'Storage%2FSVC', // identical to name, so the URL can be created based on selection
                        description: 'Returns the latest events from BVQ/Storage/SVC',
                    },
                ],
                required: true,
                displayOptions: {
                    show: {
                        datatype: ['Events'],  // Shows only when Events in the first drop-down is selected
                    },
                },
            },

            {
                displayName: 'Alert Source',
                name: 'AlertSource',
                description: 'Select the source you want to retrieve alerts from. Only sources, which support alerts, will show up.',
                type: 'options',
                default: 'Hypervisor%2FvSphere',
                options: [
                    {
                        name: 'Hypervisor / vSphere',
                        value: 'Hypervisor%2FvSphere', // identical to name, so the URL can be created based on selection
                        description: 'Returns the latest alerts from BVQ/Hypervisor/vSphere',
                    },
                    {
                        name: 'Storage / SVC',
                        value: 'Storage%2FSVC', // identical to name, so the URL can be created based on selection
                        description: 'Returns the latest alerts from BVQ/Storage/SVC',
                    },
                    {
                        name: 'All',
                        value: 'All Alerts', // identical to name, so the URL can be created based on selection
                        description: 'Returns the latest alerts from BVQ/Storage/SVC and BVQ/Hypervisor/vSphere',
                    },
                ],
                required: true,
                displayOptions: {
                    show: {
                        datatype: ['Alerts'],  // Shows only when Alerts in the first drop-down is selected
                    },
                },
            },
            //For Events - Hypervisor/vSphere
            {
                displayName: 'Event Type',
                name: 'EventTypeHypervisor',
                description: 'Select the type of event you want to retrieve from the BVQ API',
                type: 'options',
                default: 'Alarm',
                options: [
                    {
                        name: 'Alarm',
                        value: 'Alarm', // identical to name, so the URL can be created based on selection
                        description: 'Returns the latest Events of type "Alarm" from BVQ/Hypervisor/vSphere',
                    },
                    {
                        name: 'Event',
                        value: 'Event', // identical to name, so the URL can be created based on selection
                        description: 'Returns the latest Events of type "Event" from BVQ/Hypervisor/vSphere',
                    },
                    {
                        name: 'Task',
                        value: 'Task', // identical to name, so the URL can be created based on selection
                        description: 'Returns the latest Events of type "Task" from BVQ/Hypervisor/vSphere',
                    },
                ],
                required: true,
                displayOptions: {
                    show: {
                        datatype: ['Events'],
                        EventSource: ['Hypervisor%2FvSphere'],  // Shows only when Hypervisor/vSphere in the second drop-down is selected
                    },
                },
            },
            //For Events - Storage/SVC
            {
                displayName: 'Event Type',
                name: 'EventTypeStorage',
                description: 'Select the type of Event you want to retrieve from the BVQ API',
                type: 'options',
                default: 'Alert (fixed)',
                options: [
                    {
                        name: 'Alert (fixed)',
                        value: 'Alert (fixed)', // identical to name, so the URL can be created based on selection
                        description: 'Returns the latest Events of type "Alert (fixed)" from BVQ/Storage/SVC',
                    },
                    {
                        name: 'Alert (unfixed)',
                        value: 'Alert (unfixed)', // identical to name, so the URL can be created based on selection
                        description: 'Returns the latest Events of type "Alert (unfixed)" from BVQ/Storage/SVC',
                    },
                    {
                        name: 'Audit',
                        value: 'Audit', // identical to name, so the URL can be created based on selection
                        description: 'Returns the latest Events of type "Audit" from BVQ/Storage/SVC',
                    },
                    {
                        name: 'Config',
                        value: 'Config', // identical to name, so the URL can be created based on selection
                        description: 'Returns the latest Events of type "Config" from BVQ/Storage/SVC',
                    },
                    {
                        name: 'Expired',
                        value: 'Expired', // identical to name, so the URL can be created based on selection
                        description: 'Returns the latest Events of type "Expired" from BVQ/Storage/SVC',
                    },
                    {
                        name: 'Message',
                        value: 'Message', // identical to name, so the URL can be created based on selection
                        description: 'Returns the latest Events of type "Message" from BVQ/Storage/SVC',
                    },
                    {
                        name: 'Monitoring',
                        value: 'Monitoring', // identical to name, so the URL can be created based on selection
                        description: 'Returns the latest Events of type "Monitoring" from BVQ/Storage/SVC',
                    },
                ],
                required: true,
                displayOptions: {
                    show: {
                        datatype: ['Events'],
                        EventSource: ['Storage%2FSVC'],  // Shows only when Storage / SVC in the second drop-down is selected
                    },
                },
            },
            //For Alerts - Storage/SVC & Hypervisor/vSphere 
            {
                displayName: 'Alert Type',
                name: 'AlertType',
                description: 'Select the type of Alert you want to retrieve from the BVQ API',
                type: 'options',
                default: 'Error',
                options: [
                    {
                        name: 'Error',
                        value: 'Error', // identical to name, so the URL can be created based on selection
                        description: 'Returns the latest Alerts of type "Error"',
                    },
                    {
                        name: 'Info',
                        value: 'Info', // identical to name, so the URL can be created based on selection
                        description: 'Returns the latest Alerts of type "Info"',
                    },
                    {
                        name: 'Ok',
                        value: 'Ok', // identical to name, so the URL can be created based on selection
                        description: 'Returns the latest Alerts of type "Ok"',
                    },
                    {
                        name: 'Unknown',
                        value: 'Unknown', // identical to name, so the URL can be created based on selection
                        description: 'Returns the latest Alerts of type "Unknown"',
                    },
                    {
                        name: 'Warn',
                        value: 'Warn', // identical to name, so the URL can be created based on selection
                        description: 'Returns the latest Alerts of type "Warn"',
                    },
                ],
                required: true,
                displayOptions: {
                    show: {
                        datatype: ['Alerts'],
                        AlertSource: ['Storage%2FSVC','Hypervisor%2FvSphere'],  // Shows only when Storage / SVC or Hypervisor / vSphere in the second drop-down is selected
                    },
                },
            },
            {
                displayName: 'Time Value',
                name: 'TimeValueEvents',
                type: 'number',
                default: 1,
                displayOptions: {
                        show: {
                            datatype: ['Events'],
                            EventSource: ['Hypervisor%2FvSphere', 'Storage%2FSVC'],
                        },
                    },
              },
              {
                displayName: 'Time Value',
                name: 'TimeValueAlerts',
                type: 'number',
                default: 1,
                displayOptions: {
                        show: {
                            datatype: ['Alerts'],
                            AlertSource: ['Hypervisor%2FvSphere', 'Storage%2FSVC'],
                        },
                    },
              },
            {
                displayName: 'Time Unit',
                name: 'TimeUnitEvents',
                description: 'Specifies the time unit of the time period from which you want to retrieve data, up to now',
                type: 'options',
                default: 'hours',
                options: [
                    {
                        name: 'Minutes',
                        value: 'minutes', // identical to name, so the URL can be created based on selection
                        description: 'Specifies the Time Value to minutes',
                    },
                    {
                        name: 'Hours',
                        value: 'hours', // identical to name, so the URL can be created based on selection
                        description: 'Specifies the Time Value to hours',
                    },
                    {
                        name: 'Days',
                        value: 'days', // identical to name, so the URL can be created based on selection
                        description: 'Specifies the Time Value to days',
                    },
                    {
                        name: 'Weeks',
                        value: 'weeks', // identical to name, so the URL can be created based on selection
                        description: 'Specifies the Time Value to weeks',
                    },
                    {
                        name: 'Months',
                        value: 'months', // identical to name, so the URL can be created based on selection
                        description: 'Specifies the Time Value to months',
                    },
                ],
                required: true,
                displayOptions: {
                    show: {
                        datatype: ['Events'], //Shows when All Alerts in the second drop-down is selected
                        EventSource: ['Hypervisor%2FvSphere', 'Storage%2FSVC'],  // Shows only when anything in the third drop-down is selected
                    },
                },
            },
            {
                displayName: 'Time Unit',
                name: 'TimeUnitAlerts',
                description: 'Specifies the time unit of the time period from which you want to retrieve data, up to now',
                type: 'options',
                default: 'hours',
                options: [
                    {
                        name: 'Minutes',
                        value: 'minutes', // identical to name, so the URL can be created based on selection
                        description: 'Specifies the Time Value to minutes',
                    },
                    {
                        name: 'Hours',
                        value: 'hours', // identical to name, so the URL can be created based on selection
                        description: 'Specifies the Time Value to hours',
                    },
                    {
                        name: 'Days',
                        value: 'days', // identical to name, so the URL can be created based on selection
                        description: 'Specifies the Time Value to days',
                    },
                    {
                        name: 'Weeks',
                        value: 'weeks', // identical to name, so the URL can be created based on selection
                        description: 'Specifies the Time Value to weeks',
                    },
                    {
                        name: 'Months',
                        value: 'months', // identical to name, so the URL can be created based on selection
                        description: 'Specifies the Time Value to months',
                    },
                ],
                required: true,
                displayOptions: {
                    show: {
                        datatype: ['Alerts'], //Shows when All Alerts in the second drop-down is selected
                        AlertSource: ['Hypervisor%2FvSphere', 'Storage%2FSVC'],// Shows only when anything in the third drop-down is selected
                    },
                },
            },
		],
	};

    
    async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

        // Retrieve credentials
        const credentials = await this.getCredentials('bvqApi', 0);
        if (!credentials) {
            throw new ApplicationError('Missing credentials for BVQ API.');
        }

        const { username, password, apiKey, apiBaseURL, ignoreSslIssues } = credentials as {
			username: string;
			password: string;
            apiKey:string;
			apiBaseURL: string;
			ignoreSslIssues: boolean;
		};

        // Retrieve node parameters (only once)
        const dataType = this.getNodeParameter('datatype', 0) as string;
        let alertSource, eventSource, eventTypeHypervisor, eventTypeStorage, alertType;
        let timeValue;
        let timeUnit;
        let time;


        // Ensure API URL is properly formatted
        const baseUrl = apiBaseURL.replace(/\/$/, '');
	    let apiUrl: string;
        

        //The following 2 if-cases are required to initialize timeValue and timeUnit only once, not multiple times. 
        if(dataType==='Alerts'){
            alertSource = this.getNodeParameter('AlertSource', 0) as string;
        }
        if (dataType === 'Events') {
            timeValue = this.getNodeParameter('TimeValueEvents', 0) as number;
            timeUnit = this.getNodeParameter('TimeUnitEvents', 0) as string;
            time = `${timeValue}${timeUnit}`;
        }
        if(dataType === 'Alerts' && alertSource !== 'All Alerts'){
            timeValue = this.getNodeParameter('TimeValueAlerts', 0) as number;
            timeUnit = this.getNodeParameter('TimeUnitAlerts', 0) as string;
            time = `${timeValue}${timeUnit}`;
        }
        if(dataType === 'Events'){
            eventSource = this.getNodeParameter('EventSource', 0) as string;
            apiUrl = `${baseUrl}/api/data_sources/favorite.json?favoritePath=System%2F${eventSource}%2FAlerts%20%26%20Events%2F${dataType}%2F`;
            if(eventSource === 'Hypervisor%2FvSphere'){
                eventTypeHypervisor = this.getNodeParameter('EventTypeHypervisor', 0) as string;
                apiUrl += `${eventTypeHypervisor}&start=${time}&end=now`;
                time = `${String(timeValue)}${timeUnit}`;
            }else{
                eventTypeStorage = this.getNodeParameter('EventTypeStorage', 0) as string;
                apiUrl += `${eventTypeStorage}&start=${time}&end=now`;
            }
        }
        else if(dataType === 'Alerts' ){
            alertSource = this.getNodeParameter('AlertSource', 0) as string;
            if (alertSource === 'All Alerts'){
                apiUrl = `${baseUrl}/rest/alerting/svamon/export/${apiKey}`; //apiUrl = `${baseUrl}/rest/alerting/svamon/export/${apiKey}?${timestamp}`;
            }else{
                alertType = this.getNodeParameter('AlertType', 0) as string;
                apiUrl = `${baseUrl}/api/data_sources/favorite.json?favoritePath=System%2F${alertSource}%2FAlerts%20%26%20Events%2FBVQ%20${dataType}%2F${alertType}&start=${time}&end=now`;
            }
        }
        else{
            apiUrl = ``;
        }
		for (let i = 0; i < items.length; i++) {
			try {
                const response = await this.helpers.request({
                    method: 'GET',
                    url: apiUrl,
                    rejectUnauthorized: !ignoreSslIssues,
                    auth: { username, password },
                    headers: { 'Content-Type': 'application/json' },
                });

                // Ensure the response is parsed JSON
                const jsonResponse = typeof response === 'string' ? JSON.parse(response) : response;

				returnData.push({ json: jsonResponse });
			} catch (error) {
				throw new ApplicationError(`BVQ API Request Failed: ${error.message}`);
			}
		}

		return [returnData];
	}
}





