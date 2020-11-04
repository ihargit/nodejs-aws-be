import { getProductById } from '../../src/get-product-by-id';
import allowedOrigins from '../../src/constants/alloweb-origins';
import products from '../../src/products';

describe('getProductById', () => {
  const productId = products[0].id;
  const event = Object.freeze({
    headers: {
      origin: allowedOrigins[0],
    },
    pathParameters: {
      productId,
    }
  });
  const responceOk = {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': allowedOrigins[0],
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify(
      products[0],
      null,
      2
    )
  };
  test('returns product by id', async () => {
    const result = await getProductById(event);
    expect(result).toEqual(responceOk);
  });
});