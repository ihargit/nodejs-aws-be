import { productSchema } from './models/product.js';
import client from '../db';

const postProduct = async ({title, description, price}) => {
  await productSchema.validateAsync({title, description, price});
  client.
}

export {
  getProductById,
  getAllProducts,
  postProduct
}