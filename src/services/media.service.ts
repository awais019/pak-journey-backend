import { Media } from "@prisma/client";
import prisma from "../../prisma";

export default {
  create: (data: Media) => {
    return prisma.media.create({ data });
  },
};
