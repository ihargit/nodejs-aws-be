import AWS from "aws-sdk-mock";
import { importProductsFile } from '../../src/import-products-file';
import allowedOrigins from '../../src/constants/alloweb-origins';
import { afterEach, beforeEach } from "@jest/globals";

describe('importProductsFile', () => {
  const { IMPORT_BUCKET_NAME, REGION } = process.env;
  beforeEach(() => {
    const params = {
      Bucket: IMPORT_BUCKET_NAME,
      Key: 'catalogPath',
      Expires: 60,
      ContentType: 'text/csv',
    };
    AWS.mock('S3', 'getSignedUrlPromise');
  });

  it('returns url', async () => {
    const name = 'some.csv';
    const event = Object.freeze({
      headers: {
        origin: allowedOrigins[0],
      },
      queryStringParameters: {
        name
      }
    });
    const result = await importProductsFile(event);
    expect(result.body).toContain(`https://${IMPORT_BUCKET_NAME}.s3.${REGION}.amazonaws.com/uploaded/${name}`);
  });
  afterEach(() => {
    AWS.restore('S3');
  });
});