import { SNS } from 'aws-sdk';
import { postProductDB } from './db';
import { setResponse } from './helper';
const { REGION, PRODUCT_SNS_ARN } = process.env;
const sns = new SNS({region: REGION});

export const catalogBatchProcess = async (event) => {
  console.log('Lambda invocation with event: ', event);
  let response;

  try {
    const origin = event.headers.origin;
    const products = event.Records.map(({body}) => JSON.parse(body));
    const requestBody = JSON.parse(event.body);
    const result = await Promise.all(products.map(product => postProductDB(product));
    if (result.length) {
      response = setResponse({
        origin,
        body: JSON.stringify(
          result,
          null,
          2
        )
      }
    } else {
      response = setResponse({
        origin,
        statusCode: 400,
        body: 'Can not create products'
      };
    }
    return response;
  } catch(e) {
    console.log(JSON.stringify(e));
    const isValidationError = e.name === 'ValidationError';
    if (isValidationError) {
      response = setResponse({
        statusCode: 400,
        body: JSON.stringify({ validationError: e.message })
      })
    } else {
      response = setResponse({
        statusCode: 500,
      })
    }
    return response;
  } finally {
    const publishingStatus = response.statusCode === 200 ? 'succeded' : 'failed';
    await sns.publish({
      Subject: `Products publishing ${publishingStatus}`,
      Message: response.body,
      TopicArn: PRODUCT_SNS_ARN
    }).promise();
  }
};
