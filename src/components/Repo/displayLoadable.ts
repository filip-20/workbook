import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import React from "react";

type QueryRes = {
  data?: any,
  error?: FetchBaseQueryError | SerializedError,
  isLoading: boolean,
  isSuccess: boolean,
}


export function displayLoadable<T1 extends QueryRes, T2>(
  queryRes: T1,
  renderLoading: (() => JSX.Element) | JSX.Element,
  renderSuccess: ((data: T2) => JSX.Element) | JSX.Element,
  renderError: ((error: FetchBaseQueryError | SerializedError) => JSX.Element) | JSX.Element
) {
  const { data, error, isLoading } = queryRes;
  if (isLoading) {
    return typeof renderLoading === 'function' ? renderLoading() : renderLoading
  } else {
    if (data) {
      return typeof renderSuccess === 'function' ? renderSuccess(data) : renderSuccess
    } else if (error) {
      return typeof renderError === 'function' ? renderError(error) : renderError
    } else {
      return React.createElement('div');
    }
  }
}