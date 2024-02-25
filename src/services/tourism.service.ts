import { TouristSpotCategory, Location, TouristSpot } from "@prisma/client";
import prisma from "../../prisma";

export default {
  createCategory: (data: TouristSpotCategory) => {
    return prisma.touristSpotCategory.create({ data });
  },
  createLocation(data: Location) {
    return prisma.location.create({ data });
  },
  createTouristSpot(data: TouristSpot) {
    return prisma.touristSpot.create({ data });
  },
  getAll: () => {
    return prisma.touristSpot.findMany();
  },
  getSpot: (id: string) => {
    return prisma.touristSpot.findUnique({ where: { id } });
  },
  getLocation: (id: string) => {
    return prisma.location.findFirst({
      where: {
        id,
      },
      select: {
        latitude: true,
        longitude: true,
      },
    });
  },
};
