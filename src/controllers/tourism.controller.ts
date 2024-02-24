import { Request, Response } from "express";
import tourismService from "../services/tourism.service";
import { TouristSpotCategory, Location, TouristSpot } from "@prisma/client";
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

  createTouristSpot: async function (req: Request, res: Response) {
    const { name, description, categoryId, lat, lng } = req.body;

    const location = await tourismService.createLocation({
      latitude: lat,
      longitude: lng,
    } as Location);

    const touristSpot = await tourismService.createTouristSpot({
      name,
      description,
      categoryId,
      locationId: location.id,
    } as TouristSpot);

    return api.sendSuccess(res, touristSpot);
  },
};
