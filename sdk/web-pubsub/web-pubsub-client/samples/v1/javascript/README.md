---
page_type: sample
languages:
  - javascript
products:
  - azure
urlFragment: web-pubsub-client-javascript
---

# Azure Web PubSub Client client library samples for JavaScript

These sample programs show how to use the JavaScript client libraries for Azure Web PubSub Client in some common scenarios.

| **File Name**               | **Description**                  |
| --------------------------- | -------------------------------- |
| [helloworld.js][helloworld] | Basic usage of web-pubsub-client |

## Prerequisites

The sample programs are compatible with [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule).

You need [an Azure subscription][freesub] to run these sample programs.

Samples retrieve credentials to access the service endpoint from environment variables. Alternatively, edit the source code to include the appropriate credentials. See each individual sample for details on which environment variables/credentials it requires to function.

Adapting the samples to run in the browser may require some additional consideration. For details, please see the [package README][package].

## Setup

To run the samples using the published version of the package:

1. Install the dependencies using `npm`:

```bash
npm install
```

2. Edit the file `sample.env`, adding the correct credentials to access the Azure service and run the samples. Then rename the file from `sample.env` to just `.env`. The sample programs will read this file automatically.

3. Run whichever samples you like (note that some samples may require additional setup, see the table above):

```bash
node helloworld.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx dev-tool run vendored cross-env WPS_ENDPOINT="<wps endpoint>" node helloworld.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[helloworld]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/web-pubsub-client/samples/v1/javascript/helloworld.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/web-pubsub-client
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/web-pubsub/web-pubsub-client/README.md
