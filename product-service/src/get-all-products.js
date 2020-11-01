import products from './products.json';

export const getAllProducts =  async event => {
  console.log('Lambda invocation with event: ', event);
  
  return {
    statusCode: 200,
    body: JSON.stringify(
      products,
      null,
      2
    ),
  };
};
