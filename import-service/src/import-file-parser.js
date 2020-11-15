import * as AWS from 'aws-sdk';
import * as csv from 'csv-parser';
import * as util from 'util';
import * as stream from 'stream';
const pipeline = util.promisify(stream.pipeline);
import allowedOrigins from './constants/alloweb-origins';
const { IMPORT_BUCKET_NAME, AWS_REGION } = process.env;
const s3 = new AWS.S3({ region: AWS_REGION });

const processRecord = async (record) => {
  await pipeline(
    s3.getObject({
      Bucket: IMPORT_BUCKET_NAME,
      Key: record.s3.object.key
    }).createReadStream(),
    csv(),
    console.log(data)
  );

  const copySource = `${IMPORT_BUCKET_NAME}/${record.s3.object.key}`;
  const targetKey = record.s3.object.key.replace('uploaded', 'parsed');
  console.log(`Copy from ${copySource}`);

  await s3.copyObject({
    Bucket: IMPORT_BUCKET_NAME,
    CopySource: copySource,
    Key: targetKey
  }).promise();

  console.log(`Copied into ${IMPORT_BUCKET_NAME}/${targetKey}`);
  
  await s3.deleteObject({
    Bucket: IMPORT_BUCKET_NAME,
    Key: record.s3.object.key
  }).promise();

  console.log(`Deleted from ${copySource}`);
}

export const importFileParser = async (event) => {
  console.log('Lambda invocation with event: ', event);
  const response = {
    statusCode: 200,
  };
  try {
    const origin = event.headers.origin;
    if (allowedOrigins.includes(origin)) {
      response.headers = {
        'Access-Control-Allow-Origin': origin,
        'Access-Control-Allow-Credentials': true,
      };
    }
    for (record of event.Records) {
      try {
        await processRecord(record);
      } catch(err) {
        console.log(JSON.stringify(err));
        response.statusCode = 500;
      }
    }
  } catch (err) {
    console.log(JSON.stringify(err));
    response.statusCode = 500;
  }
  return response;
};
