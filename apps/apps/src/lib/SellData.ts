import prisma from "./db";
import { getUserId } from "./user";

export const getAllSales = async () => {
  const userId = await getUserId();

  try {
    const sales = await prisma.sale.findMany({
      where: {
        userId,
      },
      include: {
        client: true,
        saleItems: {
          include: {
            product: true,
          },
        },
      },
    });

    return sales;
  } catch (error) {
    throw new Error("Error fetching products");
  }
};

export const getSalesTotalYearForChart = async () => {
  const userId = await getUserId();

  try {
    const sales = await prisma.sale.findMany({
      where: {
        userId,
        createdAt: {
          gte: new Date(new Date().setFullYear(new Date().getFullYear() - 1)),
        },
      },
      select: {
        createdAt: true,
        saleTotal: true,
      },
    });

    if (sales.length === 0) {
      return [];
    }

    const salesTotalPerMonth = Array(12).fill(0);

    sales.forEach((sale) => {
      const saleMonth = sale.createdAt.getMonth();
      salesTotalPerMonth[saleMonth] += sale.saleTotal;
    });

    const formattedSalesTotalPerMonth = salesTotalPerMonth.map(
      (salesTotal, index) => ({
        month: index + 1,
        sales: salesTotal,
      })
    );

    return formattedSalesTotalPerMonth;
  } catch (error) {
    throw new Error("Error fetching sales data");
  }
};

export const getSalesThisWeek = async () => {
  const userId = await getUserId();

  try {
    const sales = await prisma.sale.findMany({
      where: {
        userId,
        createdAt: {
          gte: new Date(new Date().setDate(new Date().getDate() - 7)),
        },
      },
      include: {
        saleItems: true,
      },
    });

    let totalSales = 0;

    for (const sale of sales) {
      totalSales += sale.saleTotal;
    }

    return totalSales;
  } catch (error) {
    throw new Error("Error fetching products");
  }
};

export const getSalesThisMonth = async () => {
  const userId = await getUserId();

  try {
    const sales = await prisma.sale.findMany({
      where: {
        userId,
        createdAt: {
          gte: new Date(new Date().setMonth(new Date().getMonth() - 1)),
        },
      },
      include: {
        saleItems: true,
      },
    });

    let totalSales = 0;

    for (const sale of sales) {
      totalSales += sale.saleTotal;
    }

    return totalSales;
  } catch (error) {
    throw new Error("Error fetching products");
  }
};
