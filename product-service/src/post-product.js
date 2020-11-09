import { postProductDB } from './db';
import allowedOrigins from './constants/alloweb-origins';

export const postProduct = async (event) => {
  console.log('Lambda invocation with event: ', event);
  const responce = {
    statusCode: 200
  };

  try {
    const origin = event.headers.origin;
    if (allowedOrigins.includes(origin)) {
      responce.headers = {
        'Access-Control-Allow-Origin': origin,
        'Access-Control-Allow-Credentials': true,
      }
    }
    const requestBody = JSON.parse(event.body);
    const result = await postProductDB(requestBody);
    if (result) {
      responce.body = JSON.stringify(
        result,
        null,
        2
      );
    } else {
      responce.statusCode = 400;
      responce.body = 'Can not create product';
    }
    return responce;
  } catch(e) {
    console.log(JSON.stringify(e));
    responce.statusCode = e.name === 'ValidationError' ? 400 : 500;
    return responce;
  }
};
