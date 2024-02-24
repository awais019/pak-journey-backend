import { Request, Response } from "express";
import userService from "../services/user.service";
import api from "../helpers/api";
import constants from "../constants";

import crypto from "../helpers/crypto";
import jwt from "../helpers/jwt";
import { JwtPayload } from "jsonwebtoken";

export default {
  logIn: async function (req: Request, res: Response) {
    const { email, password } = req.body;

    const user = await userService.findByEmail(email);

    if (!user) {
      return api.sendError(
        res,
        constants.UNAUTHORIZED,
        constants.INVALID_CREDENTIALS_MESSAGE
      );
    }

    const isPasswordValid = crypto.comparePassword(password, user.password);

    if (!isPasswordValid) {
      return api.sendError(
        res,
        constants.UNAUTHORIZED,
        constants.INVALID_CREDENTIALS_MESSAGE
      );
    }

    const token = jwt.sign({ _id: user.id });

    return api.sendSuccess(res, { token });
  },
  verifyEmail: async function (req: Request, res: Response) {
    const token = req.query.token as string;

    const { _id } = jwt.decode(token) as JwtPayload;

    const user = await userService.findById(_id);

    if (!user) {
      return api.sendError(
        res,
        constants.NOT_FOUND,
        constants.USER_NOT_FOUND_MESSAGE
      );
    } else if (user.email_verified) {
      return api.sendError(
        res,
        constants.BAD_REQUEST,
        constants.EMAIL_ALREADY_VERIFIED_MESSAGE
      );
    }

    await userService.verifyEmail(_id);

    return api.sendSuccess(res, null);
  },
};
