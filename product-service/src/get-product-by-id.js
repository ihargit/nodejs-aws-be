import { getProductByIdDB } from './db';
import allowedOrigins from './constants/alloweb-origins';

export const getProductById = async (event) => {
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
    const { productId } = event.pathParameters;
    const product = await getProductByIdDB(productId);
    if (product) {
      response.body = JSON.stringify(
        product,
        null,
        2
      );
    } else {
      response.statusCode = 404;
      response.body = 'No product found';
    }
    return response;
  } catch(e) {
    console.log(JSON.stringify(e));
    response.statusCode = 500;
    return response;
  }
};
