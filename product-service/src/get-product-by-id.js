import products from './products.json';
import allowedOrigins from './constants/alloweb-origins';

export const getProductById = async (event) => {
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
    const { productId } = event.pathParameters;
    const product = products.find(({ id }) => id === productId);
    if (product) {
      responce.body = JSON.stringify(
        product,
        null,
        2
      );
    } else {
      responce.statusCode = 404;
      responce.body = 'No product found';
    }
    return responce;
  } catch(e) {
    console.log(JSON.stringify(e));
    responce.statusCode = 500;
    return responce;
  }
};
