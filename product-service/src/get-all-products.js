import * as AWS from 'aws-sdk';
import { getAllProductsDB } from './db';
import allowedOrigins from './constants/alloweb-origins';

export const getAllProducts =  async event => {
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
    const products = await getAllProductsDB();
    if (products) {
      response.body = JSON.stringify(
        products,
        null,
        2
      );
    } else {
      response.statusCode = 404;
      response.body = 'No products found';
    }
    return response;
  } catch(e) {
    console.log(JSON.stringify(e));
    response.statusCode = 500;
    return response;
  }
};
