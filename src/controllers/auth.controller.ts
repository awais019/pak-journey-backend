import { Request, Response } from "express";
import userService from "../services/user.service";
import api from "../helpers/api";
import constants from "../constants";

import crypto from "../helpers/crypto";
import jwt from "../helpers/jwt";
import ejsHelpers from "../helpers/ejs";
import emailHelpers from "../helpers/email";
import { JwtPayload } from "jsonwebtoken";
import { User } from "@prisma/client";

export default {
  register: async function (req: Request, res: Response) {
    const { firstName, lastName, email, password, gender, dob } = req.body;

    if (await userService.exists(email)) {
      return api.sendError(
        res,
        constants.BAD_REQUEST,
        constants.EMAIL_EXISTS_MESSAGE
      );
    }

    const encryptedPassword = crypto.encryptPassword(password);

    const user = await userService.create({
      firstName,
      lastName,
      email,
      password: encryptedPassword,
      gender,
      dob,
    } as User);

    const token = jwt.sign({ _id: user.id });

    const html = await ejsHelpers.renderHTMLFile("email", {
      name: user.firstName,
      link: `${process.env.CLIENT_URL}/?token=${token}`,
    });

    await emailHelpers.sendMail(
      email,
      "Welcome to Pak Journey",
      undefined,
      null,
      html
    );

    return api.sendSuccess(res, {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      gender: user.gender,
      dob: user.dob,
    });
  },
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

    try {
      jwt.verify(token);
    } catch (error) {
      return api.sendError(
        res,
        constants.BAD_REQUEST,
        constants.INVALID_TOKEN_MESSAGE
      );
    }

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
  resendVerificationEmail: async function (req: Request, res: Response) {
    const token = req.query.token as string;

    try {
      jwt.verify(token, {
        ignoreExpiration: true,
      });
    } catch (error) {
      return api.sendError(
        res,
        constants.BAD_REQUEST,
        constants.INVALID_TOKEN_MESSAGE
      );
    }

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

    const newToken = jwt.sign({ _id });

    const html = await ejsHelpers.renderHTMLFile("email", {
      name: user.firstName,

      link: `${process.env.CLIENT_URL}/?token=${newToken}`,
    });

    await emailHelpers.sendMail(
      user.email,
      " to Pak Journey",
      undefined,
      null,
      html
    );

    return api.sendSuccess(res, null);
  },
};
