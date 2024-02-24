import { User } from "@prisma/client";
import prisma from "../../prisma";

export default {
  exists: async (email: string): Promise<boolean> => {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    return !!user;
  },

  create: (user: User): Promise<User> => {
    return prisma.user.create({
      data: user,
    });
  },

  findByEmail: (email: string) => {
    return prisma.user.findUnique({
      where: {
        email,
      },
    });
  },

  findById: (id: string) => {
    return prisma.user.findUnique({
      where: {
        id,
      },
    });
  },
  verifyEmail: (id: string) => {
    return prisma.user.update({
      where: {
        id,
      },
      data: {
        email_verified: true,
      },
    });
  },
};
