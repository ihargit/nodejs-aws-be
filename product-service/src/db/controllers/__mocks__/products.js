import { productSchema } from '../../models/product';

const postProductDB = async ({ title, description, price, count }) => {
  await productSchema.validateAsync({ title, description, price, count });
  return { title, description, price, count };
};

const getProductByIdDB = async (id) => {
  return await Promise.resolve({id});
};

const getAllProductsDB = async () => {
  return await Promise.resolve([{id: '123'}]);
};



export { getProductByIdDB, getAllProductsDB, postProductDB };