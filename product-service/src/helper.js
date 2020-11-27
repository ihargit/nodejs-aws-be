import allowedOrigins from './constants/alloweb-origins';

export const getOriginHeaders = (origin) => {
  let originHeaders;
  if (allowedOrigins.includes(origin)) {
    originHeaders = {
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Credentials': true,
    }
  }
  return originHeaders || {};
};

export const setResponse = (params = {}) => {
  const { response = {}, statusCode, headers = {}, body, origin} = params;
  const result = { ...response };
  const originHeaders = origin ? getOriginHeaders(origin) : {};
  result.statusCode =  statusCode || result.statusCode || 200;
  result.headers = Object.assign(result.headers || {}, headers, originHeaders);
  result.body = body || result.body || null;
  return result;
};