import { setResponse } from '../../src/helper';

describe('setResponse', () => {
  const params = {
    statusCode: 200,
    headers: { Some: 'some'},
    body: 'body string'
  };
  test('get positive response', () => {
    const result = setResponse({
      headers: { Some: 'some'},
      body: 'body string'
    });
    expect(result).toEqual(params);
  });
});