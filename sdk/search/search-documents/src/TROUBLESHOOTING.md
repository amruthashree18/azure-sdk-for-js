# Troubleshooting Azure Cognitive Search SDK Issues

The `azure-search-documents` package provides APIs for operations on the
[Azure Cognitive Search](https://learn.microsoft.com/azure/search/search-what-is-azure-search) cloud service.

## Table of Contents

- [Identifying and Troubleshooting Issues by Response Code](#troubleshooting-issues-by-response-code)
  - [HTTP 207 Errors](#207-multi-status)
  - [HTTP 404 Errors](#404-not-found)
  - [HTTP 429 Errors](#429-too-many-requests)
- [Unexpected search query results](#unexpected-search-query-results)

## Troubleshooting Issues By Response Code

See [this page](https://learn.microsoft.com/rest/api/searchservice/http-status-codes) for the common response status codes sent by the Azure Cognitive Search service.

### 207 Multi-Status

This response status indicates a partial success for an indexing operation. Some documents were successfully processed, but at least one failed. Details of the failed documents are present in the individual `IndexingResult` objects within the `IndexDocumentsResult`. If you want the [`indexDocuments`](https://learn.microsoft.com/javascript/api/@azure/search-documents/searchclient?view=azure-node-latest#@azure-search-documents-searchclient-indexdocuments) method call to throw an exception on any failure, set [`IndexDocumentsOptions.throwOnAnyError`](https://learn.microsoft.com/javascript/api/@azure/search-documents/indexdocumentsoptions?view=azure-node-latest#@azure-search-documents-indexdocumentsoptions-throwonanyfailure)
to `true`. Each failure is then recorded in a separate `IndexingResult` and a single `IndexBatchException` is thrown by the method.

### 403 Forbidden

Returned when you pass an invalid api-key. Search service uses two types of keys to control access: admin (read-write) and query (read-only). The **admin key** grants full rights to all operations, including the ability to manage the service, create and delete indexes, indexers, and data sources. The **query key** grants read-only access to indexes and documents.

Ensure that the key used for an API call provides sufficient privileges for the operation. See [here](https://learn.microsoft.com/azure/search/search-security-api-keys)
for details about managing API keys.

If you are using the `azure-identity` package to authenticate requests to Azure Cognitive Search, please see our [troubleshooting guide](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/identity/identity/TROUBLESHOOTING.md).

### 404 Not Found

Returned when a resource does not exist on the server. If you are managing or querying an index, check the syntax and verify the index name is specified correctly.

### 429 too many requests

If this error occurs while you are trying to create an index, it means you already have the maximum number of indexes allowed for your pricing tier. A count of the indexes stored in Azure Cognitive Search is visible in the search service dashboard on the [Azure portal](https://portal.azure.com/). To view the indexes by name, click the Index tile.

Alternatively, you can also get a list of the indexes by name using the [listIndexNames() method](https://learn.microsoft.com/javascript/api/@azure/search-documents/searchindexclient?view=azure-node-latest#@azure-search-documents-searchindexclient-listindexesnames).

If this error occurs during document upload, it indicates that you've exceeded your quota on the number of documents per index. You must either create a new index or upgrade for higher capacity limits.

## Unexpected Search Query Results

A common class of issues when using the Search SDK is that the result set of a search query is different from what is expected.

For such cases, you should start by running the search query in the portal to rule out any service-side issues with the search query or any parameter(s). Review the [OData syntax](https://learn.microsoft.com/azure/search/query-odata-filter-orderby-syntax), if any, used in the query.

Once the result looks good in the portal, use that as the template to populate the objects and parameters in the search request APIs. You should also verify that the correct set of documents have been indexed and are being searched on the service side. One tip would be to start with a 'broad' query (one that returns a superset of desired results, possibly by giving a large value for or entirely removing, some [query parameters](https://learn.microsoft.com/rest/api/searchservice/search-documents#query-parameters))
and then progressively refining the query till it expresses the desired intent.
