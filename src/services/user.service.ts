import { User } from "@prisma/client";
import prisma from "../../prisma";

export default {
  exists: (email: string) => {
    return prisma.user.findUnique({
      where: {
        email,
      },
    });
  },

  create: (user: User) => {
    return prisma.user.create({
      data: user,
    });
  },
};
