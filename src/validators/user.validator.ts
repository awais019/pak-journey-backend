import { User } from "@prisma/client";
import Joi from "joi";

export default {
  create: (data: User) => {
    const schema = Joi.object({
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
      gender: Joi.string().allow("MALE", "FEMALE").required(),
      dob: Joi.date().required().min("1-1-1900").max("now"),
    });

    return schema.validate(data);
  },
};
