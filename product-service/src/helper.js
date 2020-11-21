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

export const setResponse = ({ response, statusCode, headers, body, origin }) => {
  return  {
    ...(response || {}),
    statusCode: statusCode || this.statusCode || 200,
    headers: Object.assign(this.headers || {}, getOriginHeaders(origin)),
    body: body || this.body || null
  };
};