import products from './products.json';

export const getAllProducts =  async event => {
  console.log('Lambda invocation with event: ', event);
  
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': 'https://dm9otfstrcg58.cloudfront.net',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify(
      products,
      null,
      2
    ),
  };
};
