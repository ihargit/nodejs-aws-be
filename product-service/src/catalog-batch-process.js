import AWS from 'aws-sdk';
import { postProductDB } from './db';
const { REGION, PRODUCT_SNS_ARN } = process.env;
const sns = new AWS.SNS({ region: REGION });

export const catalogBatchProcess = async (event) => {
  console.log('Lambda invocation with event: ', event);
  let publishingStatus;

  try {
    const products = event.Records.map(({ body }) => JSON.parse(body));
    console.log('Products: ', JSON.stringify(products));
    const result = await Promise.allSettled(
      products.map((product) => postProductDB(product))
    );
    console.log('Catalog batch processing result: ', JSON.stringify(result));
    publishingStatus = result.length ? 'succeded' : 'failed'; // used as message attribute
    await sns
      .publish({
        Subject: `Products publishing ${publishingStatus}`,
        Message: JSON.stringify(result, null, 2),
        MessageAttributes: {
          publishingStatus: {
            DataType: 'String',
            StringValue: `${publishingStatus}`
          }
        },
        TopicArn: PRODUCT_SNS_ARN,
      })
      .promise();
  } catch (e) {
    console.log('Products publishing error: ', JSON.stringify(e));
  }
};
