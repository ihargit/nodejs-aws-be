import products from './products.json';

export const getAllProducts =  async event => {
  console.log('Lambda invocation with event: ', event);
  const allowedOrigins = ['https://dm9otfstrcg58.cloudfront.net'];
  const origin = event.headers.origin;
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
    if (products) {
      responce.body = JSON.stringify(
        products,
        null,
        2
      );
    } else {
      responce.statusCode = 404;
    }
    return responce;
  } catch(e) {
    console.log(JSON.stringify(e));
    responce.statusCode = 500;
    return responce;
  }
};
