import React from 'react';
import { Redirect } from 'react-router-dom';

const getUrl = () => {
  switch (process.env.REACT_APP_ENV) {
    default:
      return 'https://10.10.40.15:44392/api';
  }
};

export const url = getUrl();

const headersFile = { Accept: 'application/json' };

const request = async (path, method = 'GET', body, isFile) => {
  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };
  const response = await fetch(`${url}${path}`, {
    method,
    headers: isFile ? headersFile : headers,
    body: isFile ? body : body && JSON.stringify(body),
    credentials: 'include',
  });
  const json = await response.json().catch(() => null);
  if (!response.ok) throw json;
  return json;
};

export const fetchFile = async (path) => {
  const response = await fetch(`${url}${path}`, {
    method: 'GET',
    headers: { Accept: 'application/json' },
    credentials: 'include',
  });
  return response;
};

export default request;
