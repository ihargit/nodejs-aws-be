import Joi from 'joi';

const productSchema = Joi.object({
  id: Joi.string(),
  title: Joi.string().required(),
  description: Joi.string(),
  price: Joi.number().positive().allow(0),
});

export { productSchema };
