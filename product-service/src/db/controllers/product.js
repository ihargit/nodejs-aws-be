import { productSchema } from '../models/product';
import getClient from '../db';

const queryDB = async (query) => {
  const client = getClient();
  await client.connect();
  const result = await client.query(query);
  await client.end();
  return result;
};

const postProductDB = async ({ title, description, price }) => {
  await productSchema.validateAsync({ title, description, price });
  const query = {
    text: 'INSERT INTO products(title, description, price) VALUES($1, $2, $3)',
    values: [title, description, price],
  };
  return (await queryDB(query)) ? { status: 'done'} : null;
};

const getProductByIdDB = async (id) => {
  const query = {
    text: `SELECT products.id, products.title, products.description, products.price, stocks.count
    FROM products, stocks WHERE products.id = $1 AND products.id = stocks.product_id`,
    values: [id],
  };
  return (await queryDB(query)).rows[0];
};

const getAllProductsDB = async () => {
  const query = `SELECT products.id, products.title, products.description,
  products.price, stocks.count FROM products, stocks WHERE products.id = stocks.product_id`;
  console.log('Query: ', query)
  return (await queryDB(query)).rows;
};

export { getProductByIdDB, getAllProductsDB, postProductDB };
