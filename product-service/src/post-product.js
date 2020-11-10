import { postProductDB } from './db';
import allowedOrigins from './constants/alloweb-origins';

export const postProduct = async (event) => {
  console.log('Lambda invocation with event: ', event);
  const response = {
    statusCode: 200
  };

  try {
    const origin = event.headers.origin;
    if (allowedOrigins.includes(origin)) {
      response.headers = {
        'Access-Control-Allow-Origin': origin,
        'Access-Control-Allow-Credentials': true,
      }
    }
    const requestBody = JSON.parse(event.body);
    const result = await postProductDB(requestBody);
    if (result) {
      response.body = JSON.stringify(
        result,
        null,
        2
      );
    } else {
      response.statusCode = 400;
      response.body = 'Can not create product';
    }
    return response;
  } catch(e) {
    console.log(JSON.stringify(e));
    response.statusCode = 500;
    const isValidationError = e.name === 'ValidationError';
    if (isValidationError) {
      response.statusCode = 400;
      response.body = JSON.stringify({ validationError: e.message });
    }
    return response;
  }
};
