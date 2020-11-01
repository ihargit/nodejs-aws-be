import products from './products.json';

export const getProductById = async (event) => {
  console.log('Lambda invocation with event: ', event);
  const { productId } = event.pathParameters;
  const product = products.find(({ id }) => id === productId) || 'product not found';

  return {
    statusCode: 200,
    body: JSON.stringify(
      product,
      null,
      2
    ),
  };
};
