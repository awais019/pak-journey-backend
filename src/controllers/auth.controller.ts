import { Request, Response } from "express";
import userService from "../services/user.service";
import api from "../helpers/api";
import constants from "../constants";

import crypto from "../helpers/crypto";
import jwt from "../helpers/jwt";

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
};
