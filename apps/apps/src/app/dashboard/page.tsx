import { CardSalesThisMonth } from "@/components/card/CardSalesThisMonth";
import { CardSalesThisWeek } from "@/components/card/CardSalesThisWeek";
import { CardWithBarChartToShowSalesThisYear } from "@/components/card/CardWithBarChartToShowSalesThisYear";
import { BarChartSales } from "@/components/charts/ChartThisYear/BarChartToShowSalesThisYear";
import { SkeletonCardSales } from "@/components/skeletons/cards/SkeletonCardSales";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getSalesTotalYearForChart } from "@/lib/SellData";
import { auth } from "@/utils/auth";
import { Suspense } from "react";

export default async function DashboardPage() {
  const session = await auth();

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center">
        <div className="flex flex-col">
          <h1 className="text-lg font-semibold md:text-2xl">Dashboard</h1>
          <p className="text-sm text-gray-500">
            Aquí puedes ver y gestionar tus ventas
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-8 flex-1 rounded-lg shadow-sm">
        <div className="flex w-full flex-col md:flex-row gap-4">
          <Suspense fallback={<SkeletonCardSales />}>
            <CardSalesThisWeek />
          </Suspense>
          <Suspense fallback={<SkeletonCardSales />}>
            <CardSalesThisMonth />
          </Suspense>
        </div>
        <div className="flex flex-col md:flex-row gap-4 flex-1">
<CardWithBarChartToShowSalesThisYear/>
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Hola {session?.user.name}!</CardTitle>
              <CardDescription>
                Bienvenido a tu panel de ventas, seguimos trabajando para
                mejorar tu experiencia.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </main>
  );
}
