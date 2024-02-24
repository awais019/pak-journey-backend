import { TouristSpotCategory } from "@prisma/client";
import prisma from "../../prisma";

export default {
  createCategory: (data: TouristSpotCategory) => {
    return prisma.touristSpotCategory.create({ data });
  },
};
