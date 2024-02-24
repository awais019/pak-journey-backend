import jwt from "jsonwebtoken";

export default {
  sign: (payload: jwt.JwtPayload) => {
    return jwt.sign(payload, process.env.JWT_SECRET as string, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
  },
  verify: (token: string) => {
    return jwt.verify(token, process.env.JWT_SECRET as string);
  },
  decode: (token: string) => {
    return jwt.decode(token);
  },
};
