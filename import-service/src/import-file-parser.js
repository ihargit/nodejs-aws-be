import AWS from 'aws-sdk';
import csv from 'csv-parser';
const { IMPORT_BUCKET_NAME, REGION } = process.env;

export const importFileParser = async (event) => {
  const s3 = new AWS.S3({ region: REGION });
  event.Records.forEach(async (record) => {
    const s3Stream = await s3
    .getObject({
      Bucket: IMPORT_BUCKET_NAME,
      Key: record.s3.object.key,
    })
    .createReadStream();

  s3Stream
    .pipe(csv())
    .on('data', (data) => {
      console.log(data);
    })
    .on('end', async () => {
      const copySource = `${IMPORT_BUCKET_NAME}/${record.s3.object.key}`;
      const targetKey = record.s3.object.key.replace('uploaded', 'parsed');
      console.log(`Copy from ${copySource}`);

      await s3
        .copyObject({
          Bucket: IMPORT_BUCKET_NAME,
          CopySource: copySource,
          Key: targetKey,
        })
        .promise();

      console.log(`Copied into ${IMPORT_BUCKET_NAME}/${targetKey}`);

      await s3
        .deleteObject({
          Bucket: IMPORT_BUCKET_NAME,
          Key: record.s3.object.key,
        })
        .promise();

      console.log(`Deleted from ${copySource}`);
    });
  });
};
