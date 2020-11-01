'use strict';
const products = require('data/products.json');

module.exports.handler = async event => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Here is a product list',
        input: event,
      },
      null,
      2
    ),
  };
};
