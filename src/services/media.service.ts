import { Media } from "@prisma/client";
import prisma from "../../prisma";

export default {
  create: (data: Media) => {
    return prisma.media.create({ data });
  },
  get: (spotId: string) => {
    return prisma.media.findMany({
      where: {
        touristSpotId: spotId,
      },
      select: {
        url: true,
        id: true,
      },
    });
  },
};
