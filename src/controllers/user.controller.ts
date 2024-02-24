import { Request, Response } from "express";

import userService from "../services/user.service";
import { User } from "@prisma/client";
import api from "../helpers/api";

export default {
  create: async function (req: Request, res: Response) {
    const { firstName, lastName, email, password, gender, dob } = req.body;
    const user = await userService.create({
      firstName,
      lastName,
      email,
      password,
      gender,
      dob,
    } as User);

    return api.sendSuccess(res, user);
  },
};
