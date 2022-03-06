import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";

export interface GithubErrorResponse {
  message: string,
  documentation_url: string,
}

function isType<T>(val: any) {
  try {
    const tmp = val as T
    return true;
  } catch (e) {
    return false;
  }
}

function isFetchBaseQueryError(obj: any): obj is FetchBaseQueryError {
  return (
    (obj !== null &&
      typeof obj === "object" ||
      typeof obj === "function") && (
      (
        typeof obj.status === "number" &&
        'data' in obj
      ) || (
        obj.status === "FETCH_ERROR" &&
        typeof obj.error === "string"
      ) || (
        obj.status === "PARSING_ERROR" &&
        typeof obj.originalStatus === "number" &&
        typeof obj.data === "string" &&
        typeof obj.error === "string"
      ) || (
        obj.status === "CUSTOM_ERROR" &&
        typeof obj.error === "string"
      )
    )
  )
}

function isSerializedError(error: FetchBaseQueryError | SerializedError): error is SerializedError {
  return !isFetchBaseQueryError(error);
}

function isGithubErrorResponse(obj: any): obj is GithubErrorResponse {
  return (
      (obj !== null &&
          typeof obj === "object" ||
          typeof obj === "function") &&
      typeof obj.message === "string" &&
      typeof obj.documentation_url === "string"
  )
}

export function githubApiErrorMessage(error: FetchBaseQueryError | SerializedError) {
  if (isFetchBaseQueryError(error)) {
    const err = error as FetchBaseQueryError;
    const { status } = err;
    if (status === 'FETCH_ERROR') {
      return `Fetch error: ${err.error}`
    } else if (status === 'PARSING_ERROR') {
      return `Parsing error: ${err.error}`
    } else if (status === 'CUSTOM_ERROR') {
      return `Custom error: ${err.error}`
    } else if (Number.isInteger(status)) {
      if (isGithubErrorResponse(err.data)) {
        const githubErr = err.data as GithubErrorResponse;
        return `${err.status}: ${githubErr.message}`
      } else {
        return `${err.status}: Unknown error`
      }
    }
  } else if (isSerializedError(error)) {
    return 'Serialized error'
  } else {
    return 'Unknown error'
  }
}