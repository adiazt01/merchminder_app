"use server";

import prisma from "@/lib/db";

import { getUserId } from "@/lib/user";
import { createClientSchema, updateClientSchema } from "@/schemas/clientSchema";
import { Client } from "@prisma/client";
import { revalidatePath } from "next/cache";

interface FormState {
  message?: string;
  data?: Client | null;
  error?: boolean;
}

export async function createClient(data: FormData): Promise<FormState> {
  const userId = await getUserId();
  const formData = Object.fromEntries(data);
  const parsed = createClientSchema.safeParse(formData);

  if (!parsed.success) {
    throw new Error("Invalid client data");
  }

  try {
    const newClient = await prisma.client.create({
      data: {
        name: parsed.data.name,
        email: parsed.data.email,
        phone: parsed.data.phone,
        userId: userId,
      },
    });

    revalidatePath("/dashboard/clients");
    return {
      message: "Client created successfully",
      data: newClient,
      error: false,
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        message: "Failed to create client",
        data: null,
        error: true,
      };
    }

    return {
      message: "Failed to create client",
      data: null,
      error: true,
    };
  }
}

export async function deleteClient(id: number): Promise<FormState> {
  try {
    await prisma.client.delete({
      where: {
        id: id,
      },
    });

    revalidatePath("/dashboard/clients");
    return {
      message: "Client deleted successfully",
      data: null,
      error: false,
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        message: "Failed to delete client",
        data: null,
        error: true,
      };
    }

    return {
      message: "Failed to delete client",
      data: null,
      error: true,
    };
  }
}

export async function updateClient(
  id: number,
  data: FormData
): Promise<FormState> {
  const userId = await getUserId();
  const formData = Object.fromEntries(data);
  const parsed = updateClientSchema.safeParse(formData);

  if (!parsed.success) {
    throw new Error("Invalid client data");
  }

  try {
    const updatedClient = await prisma.client.update({
      where: {
        id: id,
      },
      data: {
        name: parsed.data.name,
        email: parsed.data.email,
        phone: parsed.data.phone,
        userId: userId,
      },
    });

    revalidatePath("/dashboard/clients");
    return {
      message: "Client updated successfully",
      data: updatedClient,
      error: false,
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        message: "Failed to update client",
        data: null,
        error: true,
      };
    }

    return {
      message: "Failed to update client",
      data: null,
      error: true,
    };
  }
}
