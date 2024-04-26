import prisma from "./db";
import { getUserId } from "./user";

export const getAllClients = async () => {
  const userId = await getUserId();
  try {
    const clients = await prisma.client.findMany({
      where: {
        userId,
      },
    });
    return clients;
  } catch (error) {
    throw new Error("Error fetching clients");
  }
};