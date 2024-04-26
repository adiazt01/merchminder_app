"use server";

import prisma from "@/lib/db";
import { getUserId } from "@/lib/user";
import {
  createProductSchema,
  updateProductSchema,
} from "@/schemas/productSchemas";
import { Product } from "@prisma/client";
import { revalidatePath } from "next/cache";

interface FormState {
  message?: string;
  data?: Product | null;
  error?: boolean;
}

export async function createProduct(data: FormData): Promise<FormState> {
  const userId = await getUserId();
  const formData = Object.fromEntries(data);
  const parsed = createProductSchema.safeParse(formData);

  if (!parsed.success) {
    throw new Error("Invalid product data");
  }

  try {
    const productExists = await prisma.product.findFirst({
      where: {
        name: parsed.data.name,
        userId,
      },
    });

    if (productExists) {
      return {
        message:
          "El producto ya ha sido creado, si intenta actualizarlo, vaya a la página de edición",
        data: null,
        error: true,
      };
    }

    const newProduct = await prisma.product.create({
      data: {
        name: parsed.data.name,
        userId: userId,
        price: parseFloat(parsed.data.price),
        description: parsed.data.description,
      },
    });

    revalidatePath("/dashboard/products");

    return {
      message: `El producto "${newProduct.name}" ha sido creado`,
      data: newProduct,
      error: false,
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        message: "EL producto no se ha podido crear",
        data: null,
        error: true,
      };
    }

    return {
      message: "EL producto no se ha podido crear",
      data: null,
      error: true,
    };
  }
}

export async function deleteProduct(id: number): Promise<FormState> {
  try {
    await prisma.product.delete({
      where: {
        id,
      },
    });

    revalidatePath("/dashboard/products");

    return {
      message: "Product deleted successfully",
      data: null,
      error: false,
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        message: "Failed to delete product",
        data: null,
        error: true,
      };
    }

    return {
      message: "Failed to delete product",
      data: null,
      error: true,
    };
  }
}

export async function updateProduct(
  id: number,
  data: FormData
): Promise<FormState> {
  const userId = await getUserId();
  const formData = Object.fromEntries(data);
  const parsed = updateProductSchema.safeParse(formData);

  if (!parsed.success) {
    throw new Error("Invalid product data");
  }

  try {
    const currentProduct = await prisma.product.findUnique({
      where: {
        id,
        userId,
      },
    });

    if (!currentProduct) {
      return {
        message: "Product not found",
        data: null,
        error: true,
      };
    }

    const updatedProduct = await prisma.product.update({
      where: {
        id,
        userId,
      },
      data: {
        // Usa los valores actuales del producto como valores predeterminados
        name: parsed.data.name || currentProduct.name,
        price: parsed.data.price
          ? parseFloat(parsed.data.price)
          : currentProduct.price,
        description: parsed.data.description || currentProduct.description,
      },
    });

    revalidatePath("/dashboard/products");

    return {
      message: `Product "${updatedProduct.name}" updated successfully`,
      data: updatedProduct,
      error: false,
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        message: "Failed to update product",
        data: null,
        error: true,
      };
    }

    return {
      message: "Failed to update product",
      data: null,
      error: true,
    };
  }
}
