import AWS from 'aws-sdk-mock';
import { catalogBatchProcess } from '../../src/catalog-batch-process';
import { afterEach, beforeEach } from '@jest/globals';

describe('catalogBatchProcess', () => {
  const record = Object.freeze({
    title: 'title',
    description: 'description',
    price: 3,
    count: 3,
  });
  let publishStub;
  beforeEach(() => {
    publishStub =  jest.fn();
    AWS.mock('SNS', 'publish', publishStub);
  });

  it('process succeded', async () => {
    const name = 'some.csv';
    const event = Object.freeze({
      Records: [record],
    });
    const result = await catalogBatchProcess(event);
    expect(publishStub).toCalled;
  });
  afterEach(() => {
    AWS.restore('SNS');
  });
});
