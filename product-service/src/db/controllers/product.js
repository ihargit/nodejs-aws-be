import { productSchema } from '../models/product';
import getClient from '../db';

const queryDB = async (query) => {
  const client = getClient();
  await client.connect();
  const result = await client.query(query);
  await client.end();
  return result;
};

const postProductDB = async ({ title, description, price, count }) => {
  await productSchema.validateAsync({ title, description, price, count });
  const query = {
    text: `
    with rows as (
      insert into products(title, description, price)
      values($1, $2, $3) returning *
    )
    insert into stocks(count, product_id)
    values($4, (select id from rows))
    returning
      (select id from rows),
      (select title from rows),
      (select description from rows),
      (select price from rows),
      count;`,
    values: [title, description, price, count],
  };
  const result = (await queryDB(query)).rows[0];
  return result || null;
};

const getProductByIdDB = async (id) => {
  const query = {
    text: `SELECT products.id, products.title, products.description, products.price, stocks.count
    FROM products, stocks WHERE products.id = $1 AND products.id = stocks.product_id`,
    values: [id],
  };
  let result;
  try {
    result = (await queryDB(query)).rows[0];
  } catch(e) {
    console.log(JSON.stringify(e));
  }
  return result;
};

const getAllProductsDB = async () => {
  const query = `SELECT products.id, products.title, products.description,
  products.price, stocks.count FROM products, stocks WHERE products.id = stocks.product_id`;
  console.log('Query: ', query)
  return (await queryDB(query)).rows;
};

export { getProductByIdDB, getAllProductsDB, postProductDB };
