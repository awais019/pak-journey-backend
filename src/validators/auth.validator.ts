import Joi from "joi";

export default {
  logIn: ({ email, password }: { email: string; password: string }) => {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
    });

    return schema.validate({ email, password });
  },
};
