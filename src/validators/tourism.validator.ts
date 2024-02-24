import Joi from "joi";

export default {
  createCategory: ({
    name,
    description,
  }: {
    name: string;
    description: string;
  }) => {
    const schema = Joi.object({
      name: Joi.string().required(),
      description: Joi.string().required(),
    });

    return schema.validate({ name, description });
  },
};
