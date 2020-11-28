import * as AWS from 'aws-sdk';
import allowedOrigins from './constants/alloweb-origins';

export const basicAuthorizer = async (event) => {
  try {
    console.log('Lambda invocation with event: ', event);
 
  } catch (err) {
    console.log(JSON.stringify(err));
  }
}