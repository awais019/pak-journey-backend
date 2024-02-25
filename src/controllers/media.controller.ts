import { Request, Response } from "express";
import mediaService from "../services/media.service";
import { Media } from "@prisma/client";
import api from "../helpers/api";

export default {
  create: async function (req: Request, res: Response) {
    const { url, type, touristSpotId } = req.body;

    const media = await mediaService.create({
      url,
      type,
      touristSpotId,
    } as Media);

    return api.sendSuccess(res, media);
  },
};
