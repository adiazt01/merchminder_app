import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ContainerBarChartToShowSalesThisYear } from "@/components/charts/ChartThisYear/ContainerBarChartToShowSalesThisYear";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export function CardWithBarChartToShowSalesThisYear() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardDescription>Ventas</CardDescription>
      </CardHeader>
      <CardContent className="flex px-4 flex-col items-center justify-center h-[280px]">
        <Suspense fallback={<Skeleton className="w-full h-full" />}>
          <ContainerBarChartToShowSalesThisYear />
        </Suspense>
      </CardContent>
    </Card>
  );
}
