// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationArguments, OperationSpec, QueryCollectionFormat } from "./interfaces.js";
import { getOperationArgumentValueFromParameter } from "./operationHelpers.js";
import { getPathStringFromParameter } from "./interfaceHelpers.js";

const CollectionFormatToDelimiterMap: { [key in QueryCollectionFormat]: string } = {
  CSV: ",",
  SSV: " ",
  Multi: "Multi",
  TSV: "\t",
  Pipes: "|",
};

export function getRequestUrl(
  baseUri: string,
  operationSpec: OperationSpec,
  operationArguments: OperationArguments,
  fallbackObject: { [parameterName: string]: any },
): string {
  const urlReplacements = calculateUrlReplacements(
    operationSpec,
    operationArguments,
    fallbackObject,
  );

  let isAbsolutePath = false;

  let requestUrl = replaceAll(baseUri, urlReplacements);
  if (operationSpec.path) {
    let path = replaceAll(operationSpec.path, urlReplacements);
    // QUIRK: sometimes we get a path component like /{nextLink}
    // which may be a fully formed URL with a leading /. In that case, we should
    // remove the leading /
    if (operationSpec.path === "/{nextLink}" && path.startsWith("/")) {
      path = path.substring(1);
    }
    // QUIRK: sometimes we get a path component like {nextLink}
    // which may be a fully formed URL. In that case, we should
    // ignore the baseUri.
    if (isAbsoluteUrl(path)) {
      requestUrl = path;
      isAbsolutePath = true;
    } else {
      requestUrl = appendPath(requestUrl, path);
    }
  }

  const { queryParams, sequenceParams } = calculateQueryParameters(
    operationSpec,
    operationArguments,
    fallbackObject,
  );
  /**
   * Notice that this call sets the `noOverwrite` parameter to true if the `requestUrl`
   * is an absolute path. This ensures that existing query parameter values in `requestUrl`
   * do not get overwritten. On the other hand when `requestUrl` is not absolute path, it
   * is still being built so there is nothing to overwrite.
   */
  requestUrl = appendQueryParams(requestUrl, queryParams, sequenceParams, isAbsolutePath);

  return requestUrl;
}

function replaceAll(input: string, replacements: Map<string, string>): string {
  let result = input;
  for (const [searchValue, replaceValue] of replacements) {
    result = result.split(searchValue).join(replaceValue);
  }
  return result;
}

function calculateUrlReplacements(
  operationSpec: OperationSpec,
  operationArguments: OperationArguments,
  fallbackObject: { [parameterName: string]: any },
): Map<string, string> {
  const result = new Map<string, string>();
  if (operationSpec.urlParameters?.length) {
    for (const urlParameter of operationSpec.urlParameters) {
      let urlParameterValue: string = getOperationArgumentValueFromParameter(
        operationArguments,
        urlParameter,
        fallbackObject,
      );
      const parameterPathString = getPathStringFromParameter(urlParameter);
      urlParameterValue = operationSpec.serializer.serialize(
        urlParameter.mapper,
        urlParameterValue,
        parameterPathString,
      );
      if (!urlParameter.skipEncoding) {
        urlParameterValue = encodeURIComponent(urlParameterValue);
      }
      result.set(
        `{${urlParameter.mapper.serializedName || parameterPathString}}`,
        urlParameterValue,
      );
    }
  }
  return result;
}

function isAbsoluteUrl(url: string): boolean {
  return url.includes("://");
}

function appendPath(url: string, pathToAppend?: string): string {
  if (!pathToAppend) {
    return url;
  }

  const parsedUrl = new URL(url);
  let newPath = parsedUrl.pathname;

  if (!newPath.endsWith("/")) {
    newPath = `${newPath}/`;
  }

  if (pathToAppend.startsWith("/")) {
    pathToAppend = pathToAppend.substring(1);
  }

  const searchStart = pathToAppend.indexOf("?");
  if (searchStart !== -1) {
    const path = pathToAppend.substring(0, searchStart);
    const search = pathToAppend.substring(searchStart + 1);
    newPath = newPath + path;
    if (search) {
      parsedUrl.search = parsedUrl.search ? `${parsedUrl.search}&${search}` : search;
    }
  } else {
    newPath = newPath + pathToAppend;
  }

  parsedUrl.pathname = newPath;

  return parsedUrl.toString();
}

function calculateQueryParameters(
  operationSpec: OperationSpec,
  operationArguments: OperationArguments,
  fallbackObject: { [parameterName: string]: any },
): {
  queryParams: Map<string, string | string[]>;
  sequenceParams: Set<string>;
} {
  const result = new Map<string, string | string[]>();
  const sequenceParams: Set<string> = new Set<string>();

  if (operationSpec.queryParameters?.length) {
    for (const queryParameter of operationSpec.queryParameters) {
      if (queryParameter.mapper.type.name === "Sequence" && queryParameter.mapper.serializedName) {
        sequenceParams.add(queryParameter.mapper.serializedName);
      }
      let queryParameterValue: string | string[] = getOperationArgumentValueFromParameter(
        operationArguments,
        queryParameter,
        fallbackObject,
      );
      if (
        (queryParameterValue !== undefined && queryParameterValue !== null) ||
        queryParameter.mapper.required
      ) {
        queryParameterValue = operationSpec.serializer.serialize(
          queryParameter.mapper,
          queryParameterValue,
          getPathStringFromParameter(queryParameter),
        );

        const delimiter = queryParameter.collectionFormat
          ? CollectionFormatToDelimiterMap[queryParameter.collectionFormat]
          : "";
        if (Array.isArray(queryParameterValue)) {
          // replace null and undefined
          queryParameterValue = queryParameterValue.map((item) => {
            if (item === null || item === undefined) {
              return "";
            }

            return item;
          });
        }
        if (queryParameter.collectionFormat === "Multi" && queryParameterValue.length === 0) {
          continue;
        } else if (
          Array.isArray(queryParameterValue) &&
          (queryParameter.collectionFormat === "SSV" || queryParameter.collectionFormat === "TSV")
        ) {
          queryParameterValue = queryParameterValue.join(delimiter);
        }
        if (!queryParameter.skipEncoding) {
          if (Array.isArray(queryParameterValue)) {
            queryParameterValue = queryParameterValue.map((item: string) => {
              return encodeURIComponent(item);
            });
          } else {
            queryParameterValue = encodeURIComponent(queryParameterValue);
          }
        }

        // Join pipes and CSV *after* encoding, or the server will be upset.
        if (
          Array.isArray(queryParameterValue) &&
          (queryParameter.collectionFormat === "CSV" || queryParameter.collectionFormat === "Pipes")
        ) {
          queryParameterValue = queryParameterValue.join(delimiter);
        }

        result.set(
          queryParameter.mapper.serializedName || getPathStringFromParameter(queryParameter),
          queryParameterValue,
        );
      }
    }
  }
  return {
    queryParams: result,
    sequenceParams,
  };
}

function simpleParseQueryParams(queryString: string): Map<string, string | string[] | undefined> {
  const result: Map<string, string | string[] | undefined> = new Map<
    string,
    string | string[] | undefined
  >();
  if (!queryString || queryString[0] !== "?") {
    return result;
  }

  // remove the leading ?
  queryString = queryString.slice(1);
  const pairs = queryString.split("&");

  for (const pair of pairs) {
    const [name, value] = pair.split("=", 2);
    const existingValue = result.get(name);
    if (existingValue) {
      if (Array.isArray(existingValue)) {
        existingValue.push(value);
      } else {
        result.set(name, [existingValue, value]);
      }
    } else {
      result.set(name, value);
    }
  }

  return result;
}

/** @internal */
export function appendQueryParams(
  url: string,
  queryParams: Map<string, string | string[]>,
  sequenceParams: Set<string>,
  noOverwrite: boolean = false,
): string {
  if (queryParams.size === 0) {
    return url;
  }

  const parsedUrl = new URL(url);

  // QUIRK: parsedUrl.searchParams will have their name/value pairs decoded, which
  // can change their meaning to the server, such as in the case of a SAS signature.
  // To avoid accidentally un-encoding a query param, we parse the key/values ourselves
  const combinedParams = simpleParseQueryParams(parsedUrl.search);

  for (const [name, value] of queryParams) {
    const existingValue = combinedParams.get(name);
    if (Array.isArray(existingValue)) {
      if (Array.isArray(value)) {
        existingValue.push(...value);
        const valueSet = new Set(existingValue);
        combinedParams.set(name, Array.from(valueSet));
      } else {
        existingValue.push(value);
      }
    } else if (existingValue) {
      if (Array.isArray(value)) {
        value.unshift(existingValue);
      } else if (sequenceParams.has(name)) {
        combinedParams.set(name, [existingValue, value]);
      }
      if (!noOverwrite) {
        combinedParams.set(name, value);
      }
    } else {
      combinedParams.set(name, value);
    }
  }

  const searchPieces: string[] = [];
  for (const [name, value] of combinedParams) {
    if (typeof value === "string") {
      searchPieces.push(`${name}=${value}`);
    } else if (Array.isArray(value)) {
      // QUIRK: If we get an array of values, include multiple key/value pairs
      for (const subValue of value) {
        searchPieces.push(`${name}=${subValue}`);
      }
    } else {
      searchPieces.push(`${name}=${value}`);
    }
  }

  // QUIRK: we have to set search manually as searchParams will encode comma when it shouldn't.
  parsedUrl.search = searchPieces.length ? `?${searchPieces.join("&")}` : "";
  return parsedUrl.toString();
}
