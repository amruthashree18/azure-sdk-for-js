# client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for in some common scenarios.

| **File Name**                                                                 | **Description**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| ----------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [accountsCheckNameAvailabilitySample.ts][accountschecknameavailabilitysample] | Checks if the specified Visual Studio Team Services account name is available. Resource name can be either an account name or an account name and PUID. x-ms-original-file: specification/visualstudio/resource-manager/Microsoft.VisualStudio/preview/2014-04-01-preview/examples/CheckNameAvailability.json                                                                                                                                                                                                                                                                                            |
| [accountsCreateOrUpdateSample.ts][accountscreateorupdatesample]               | Creates or updates a Visual Studio Team Services account resource. x-ms-original-file: specification/visualstudio/resource-manager/Microsoft.VisualStudio/preview/2014-04-01-preview/examples/CreateResource.json                                                                                                                                                                                                                                                                                                                                                                                        |
| [accountsDeleteSample.ts][accountsdeletesample]                               | Deletes a Visual Studio Team Services account resource. x-ms-original-file: specification/visualstudio/resource-manager/Microsoft.VisualStudio/preview/2014-04-01-preview/examples/DeleteResource.json                                                                                                                                                                                                                                                                                                                                                                                                   |
| [accountsGetSample.ts][accountsgetsample]                                     | Gets the Visual Studio Team Services account resource details. x-ms-original-file: specification/visualstudio/resource-manager/Microsoft.VisualStudio/preview/2014-04-01-preview/examples/GetResource.json                                                                                                                                                                                                                                                                                                                                                                                               |
| [accountsListByResourceGroupSample.ts][accountslistbyresourcegroupsample]     | Gets all Visual Studio Team Services account resources under the resource group linked to the specified Azure subscription. x-ms-original-file: specification/visualstudio/resource-manager/Microsoft.VisualStudio/preview/2014-04-01-preview/examples/GetResources_List.json                                                                                                                                                                                                                                                                                                                            |
| [accountsUpdateSample.ts][accountsupdatesample]                               | Updates tags for Visual Studio Team Services account resource. x-ms-original-file: specification/visualstudio/resource-manager/Microsoft.VisualStudio/preview/2014-04-01-preview/examples/UpdateTags.json                                                                                                                                                                                                                                                                                                                                                                                                |
| [extensionsCreateSample.ts][extensionscreatesample]                           | Registers the extension with a Visual Studio Team Services account. x-ms-original-file: specification/visualstudio/resource-manager/Microsoft.VisualStudio/preview/2014-04-01-preview/examples/CreateExtensionResource.json                                                                                                                                                                                                                                                                                                                                                                              |
| [extensionsDeleteSample.ts][extensionsdeletesample]                           | Removes an extension resource registration for a Visual Studio Team Services account. x-ms-original-file: specification/visualstudio/resource-manager/Microsoft.VisualStudio/preview/2014-04-01-preview/examples/DeleteExtensionResource.json                                                                                                                                                                                                                                                                                                                                                            |
| [extensionsGetSample.ts][extensionsgetsample]                                 | Gets the details of an extension associated with a Visual Studio Team Services account resource. x-ms-original-file: specification/visualstudio/resource-manager/Microsoft.VisualStudio/preview/2014-04-01-preview/examples/GetExtensionResource.json                                                                                                                                                                                                                                                                                                                                                    |
| [extensionsListByAccountSample.ts][extensionslistbyaccountsample]             | Gets the details of the extension resources created within the resource group. x-ms-original-file: specification/visualstudio/resource-manager/Microsoft.VisualStudio/preview/2014-04-01-preview/examples/GetExtensionResources_List.json                                                                                                                                                                                                                                                                                                                                                                |
| [extensionsUpdateSample.ts][extensionsupdatesample]                           | Updates an existing extension registration for the Visual Studio Team Services account. x-ms-original-file: specification/visualstudio/resource-manager/Microsoft.VisualStudio/preview/2014-04-01-preview/examples/UpdateExtensionResource.json                                                                                                                                                                                                                                                                                                                                                          |
| [operationsListSample.ts][operationslistsample]                               | Gets the details of all operations possible on the Microsoft.VisualStudio resource provider. x-ms-original-file: specification/visualstudio/resource-manager/Microsoft.VisualStudio/preview/2014-04-01-preview/examples/GetOperations.json                                                                                                                                                                                                                                                                                                                                                               |
| [projectsCreateSample.ts][projectscreatesample]                               | Creates a Team Services project in the collection with the specified name. 'VersionControlOption' and 'ProcessTemplateId' must be specified in the resource properties. Valid values for VersionControlOption: Git, Tfvc. Valid values for ProcessTemplateId: 6B724908-EF14-45CF-84F8-768B5384DA45, ADCC42AB-9882-485E-A3ED-7678F01F66BC, 27450541-8E31-4150-9947-DC59F998FC01 (these IDs correspond to Scrum, Agile, and CMMI process templates). x-ms-original-file: specification/visualstudio/resource-manager/Microsoft.VisualStudio/preview/2014-04-01-preview/examples/CreateProjectResource.json |
| [projectsGetJobStatusSample.ts][projectsgetjobstatussample]                   | Gets the status of the project resource creation job. x-ms-original-file: specification/visualstudio/resource-manager/Microsoft.VisualStudio/preview/2014-04-01-preview/examples/GetProjectJobStatus.json                                                                                                                                                                                                                                                                                                                                                                                                |
| [projectsGetSample.ts][projectsgetsample]                                     | Gets the details of a Team Services project resource. x-ms-original-file: specification/visualstudio/resource-manager/Microsoft.VisualStudio/preview/2014-04-01-preview/examples/GetProjectResource.json                                                                                                                                                                                                                                                                                                                                                                                                 |
| [projectsListByResourceGroupSample.ts][projectslistbyresourcegroupsample]     | Gets all Visual Studio Team Services project resources created in the specified Team Services account. x-ms-original-file: specification/visualstudio/resource-manager/Microsoft.VisualStudio/preview/2014-04-01-preview/examples/GetProjectResources_List.json                                                                                                                                                                                                                                                                                                                                          |
| [projectsUpdateSample.ts][projectsupdatesample]                               | Updates the tags of the specified Team Services project. x-ms-original-file: specification/visualstudio/resource-manager/Microsoft.VisualStudio/preview/2014-04-01-preview/examples/UpdateProjectResource.json                                                                                                                                                                                                                                                                                                                                                                                           |

## Prerequisites

The sample programs are compatible with [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule).

Before running the samples in Node, they must be compiled to JavaScript using the TypeScript compiler. For more information on TypeScript, see the [TypeScript documentation][typescript]. Install the TypeScript compiler using:

```bash
npm install -g typescript
```

You need [an Azure subscription][freesub] to run these sample programs.

Samples retrieve credentials to access the service endpoint from environment variables. Alternatively, edit the source code to include the appropriate credentials. See each individual sample for details on which environment variables/credentials it requires to function.

Adapting the samples to run in the browser may require some additional consideration. For details, please see the [package README][package].

## Setup

To run the samples using the published version of the package:

1. Install the dependencies using `npm`:

```bash
npm install
```

2. Compile the samples:

```bash
npm run build
```

3. Edit the file `sample.env`, adding the correct credentials to access the Azure service and run the samples. Then rename the file from `sample.env` to just `.env`. The sample programs will read this file automatically.

4. Run whichever samples you like (note that some samples may require additional setup, see the table above):

```bash
node dist/accountsCheckNameAvailabilitySample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx dev-tool run vendored cross-env  node dist/accountsCheckNameAvailabilitySample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[accountschecknameavailabilitysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/visualstudio/arm-visualstudio/samples/v4-beta/typescript/src/accountsCheckNameAvailabilitySample.ts
[accountscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/visualstudio/arm-visualstudio/samples/v4-beta/typescript/src/accountsCreateOrUpdateSample.ts
[accountsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/visualstudio/arm-visualstudio/samples/v4-beta/typescript/src/accountsDeleteSample.ts
[accountsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/visualstudio/arm-visualstudio/samples/v4-beta/typescript/src/accountsGetSample.ts
[accountslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/visualstudio/arm-visualstudio/samples/v4-beta/typescript/src/accountsListByResourceGroupSample.ts
[accountsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/visualstudio/arm-visualstudio/samples/v4-beta/typescript/src/accountsUpdateSample.ts
[extensionscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/visualstudio/arm-visualstudio/samples/v4-beta/typescript/src/extensionsCreateSample.ts
[extensionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/visualstudio/arm-visualstudio/samples/v4-beta/typescript/src/extensionsDeleteSample.ts
[extensionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/visualstudio/arm-visualstudio/samples/v4-beta/typescript/src/extensionsGetSample.ts
[extensionslistbyaccountsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/visualstudio/arm-visualstudio/samples/v4-beta/typescript/src/extensionsListByAccountSample.ts
[extensionsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/visualstudio/arm-visualstudio/samples/v4-beta/typescript/src/extensionsUpdateSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/visualstudio/arm-visualstudio/samples/v4-beta/typescript/src/operationsListSample.ts
[projectscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/visualstudio/arm-visualstudio/samples/v4-beta/typescript/src/projectsCreateSample.ts
[projectsgetjobstatussample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/visualstudio/arm-visualstudio/samples/v4-beta/typescript/src/projectsGetJobStatusSample.ts
[projectsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/visualstudio/arm-visualstudio/samples/v4-beta/typescript/src/projectsGetSample.ts
[projectslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/visualstudio/arm-visualstudio/samples/v4-beta/typescript/src/projectsListByResourceGroupSample.ts
[projectsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/visualstudio/arm-visualstudio/samples/v4-beta/typescript/src/projectsUpdateSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-visualstudio?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/visualstudio/arm-visualstudio/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
