import { Request, Response } from "express";
import tourismService from "../services/tourism.service";
import { TouristSpotCategory } from "@prisma/client";
import api from "../helpers/api";

export default {
  createCategory: async function (req: Request, res: Response) {
    const { name, description } = req.body;

    const category = await tourismService.createCategory({
      name,
      description,
    } as TouristSpotCategory);

    return api.sendSuccess(res, category);
  },
};
