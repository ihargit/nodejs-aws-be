const { Client } = require('pg');

const getClient = () => new Client();

export default getClient;