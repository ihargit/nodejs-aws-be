export const basicAuthorizer = async (event, ctx, cb) => {
  console.log('Event: ', event);
  if (event['type'] != 'TOKEN') {
    cb('Unauthorised');
  }
  try {
    const authorizationToken = envent.authorizationToken;

    const encodedCreds = authorizationToken.split(' ')[1];
    const buff = Buffer.from(encodedCreds, 'base64');
    const [userName, password] = buff.toString('utf-8').split(':');

    console.log(`username: ${userName}, password: ${password}`);

    const storedUserPasswords = JSON.parse((process.env.STORED_USER_PASSWORDS || "{}"));
    const storedUserPassword = storedUserPasswords[userName];
    const effect = !storedUserPassword || storedUserPassword !== password ? 'Deny' : 'Allow';

    const policy = generatePolicy(encodedCreds, event.methodArn, effect);

    cb(null, policy);
  } catch(e) {
    cb(`Unauthorised: ${e.message}`);
  }
}

const generatePolicy = (principalId, resource, effect = 'Allow') => {
  return {
    principalId,
    policyDocument: {
      Version: '2012-10-17',
      Statement: [
        {
          Action: 'execute-api:Invoke',
          Effect: effect,
          Resource: resource
        }
      ]
    }
  }
}