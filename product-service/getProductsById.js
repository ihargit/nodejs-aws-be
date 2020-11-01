'use strict';

module.exports.handler = async event => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Here is a product by id',
        input: event,
      },
      null,
      2
    ),
  };
};
