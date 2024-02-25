import { Media } from "@prisma/client";
import Joi from "joi";

export default {
  create: (data: Media) => {
    const schema = Joi.object({
      url: Joi.string().required(),
      type: Joi.string().allow("IMAGE", "VIDEO").required(),
      touristSpotId: Joi.string().required(),
    });
    return schema.validate(data);
  },
};
