import products from './products.json';

export const getProductById = async (event) => {
  console.log('Lambda invocation with event: ', event);
  const { productId } = event.pathParameters;
  const product = products.find(({ id }) => id === productId) || 'product not found';

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': 'https://dm9otfstrcg58.cloudfront.net',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify(
      product,
      null,
      2
    ),
  };
};
