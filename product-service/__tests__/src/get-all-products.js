import { getAllProducts } from '../../src/get-all-products';
import allowedOrigins from '../../src/constants/alloweb-origins';
import products from '../../src/products';

describe('getAllProducts', () => {
  const event = Object.freeze({
    headers: {
      origin: allowedOrigins[0]
    }
  });
  const responceOk = {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': allowedOrigins[0],
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify(
      products,
      null,
      2
    )
  };
  test('returns products', async () => {
    const result = await getAllProducts(event);
    expect(result).toEqual(responceOk);
  });
});