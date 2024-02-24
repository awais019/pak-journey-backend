import { Request, Response } from "express";

import userService from "../services/user.service";
import { User } from "@prisma/client";
import api from "../helpers/api";
import constants from "../constants";
import crypto from "../helpers/crypto";

export default {
  create: async function (req: Request, res: Response) {
    const { firstName, lastName, email, password, gender, dob } = req.body;

    if (await userService.exists(email)) {
      return api.sendError(
        res,
        constants.BAD_REQUEST,
        constants.EMAIL_EXISTS_MESSAGE
      );
    }

    const encryptedPassword = crypto.encryptPassword(password);
    console.log(encryptedPassword);

    const user = await userService.create({
      firstName,
      lastName,
      email,
      password: encryptedPassword,
      gender,
      dob,
    } as User);

    return api.sendSuccess(res, {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      gender: user.gender,
      dob: user.dob,
    });
  },
};
