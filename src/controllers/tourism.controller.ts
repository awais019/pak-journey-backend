import { Request, Response } from "express";
import tourismService from "../services/tourism.service";
import mediaService from "../services/media.service";
import { TouristSpotCategory, Location, TouristSpot } from "@prisma/client";
import api from "../helpers/api";
import constants from "../constants";

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
    const { name, description, history, significance, categoryId, lat, lng } =
      req.body;

    const location = await tourismService.createLocation({
      latitude: lat,
      longitude: lng,
    } as Location);

    const touristSpot = await tourismService.createTouristSpot({
      name,
      description,
      categoryId,
      locationId: location.id,
      history,
      significance,
    } as TouristSpot);

    return api.sendSuccess(res, touristSpot);
  },
  getTouristSpot: async function (req: Request, res: Response) {
    const id = req.params.id as string;

    const spot = await tourismService.getSpot(id);

    if (!spot) {
      return api.sendError(
        res,
        constants.NOT_FOUND,
        constants.NOT_FOUND_MESSAGE
      );
    }

    const media = await mediaService.get(spot.id);

    return api.sendSuccess(res, { ...spot, media });
  },
};
