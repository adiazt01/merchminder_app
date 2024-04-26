import prisma from "./db";
import { getUserId } from "./user";

export const getAllProducts = async () => {
  const userId = await getUserId();

  try {
    const products = await prisma.product.findMany({
      where: {
        userId,
      },
      include: {
        saleItems: true,
      }
    });

    const productsWithSalesCount = products.map(product => ({
      ...product,
      salesCount: product.saleItems.map(saleItem => saleItem.quantity).reduce((acc, curr) => acc + curr, 0)
    }));

    return productsWithSalesCount;
  } catch (error) {
    throw new Error("Error fetching products");
  }
};

export async function getProduct(id: string) {
  try {
    return await prisma.product.findUnique({
      where: {
        id: parseInt(id),
      },
    });
  } catch (error) {
    throw new Error("Error fetching product");
  }
}
