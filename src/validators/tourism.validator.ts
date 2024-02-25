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
  createTouristSpot: ({
    name,
    description,
    history,
    significance,
    categoryId,
    lat,
    lng,
  }: {
    name: string;
    description: string;
    history: string;
    significance: string;
    categoryId: string;
    lat: number;
    lng: number;
  }) => {
    console.log();

    const schema = Joi.object({
      name: Joi.string().required(),
      description: Joi.string().required(),
      history: Joi.string().required(),
      significance: Joi.string().required(),
      categoryId: Joi.string().required(),
      lat: Joi.number().required(),
      lng: Joi.number().required(),
    });

    return schema.validate({
      name,
      description,
      history,
      significance,
      categoryId,
      lat,
      lng,
    });
  },
};
