import { BigSalesCard } from "@/components/card/BigSalesCard";
import { CardSalesThisMonth } from "@/components/card/CardSalesThisMonth";
import { CardSalesThisWeek } from "@/components/card/CardSalesThisWeek";
import { SellContainerTable } from "@/components/containers/SellContainerTable";
import { SkeletonCardSales } from "@/components/skeletons/cards/SkeletonCardSales";
import { TableDataSkeletons } from "@/components/skeletons/tables/TableDataSkeletons";
import { Button } from "@/components/ui/button";
import { SalesProvider } from "@/context/SalesContext";
import { Plus } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

/**
 * SalesPage component
 * 
 * This component renders the sales of the application.
 * 
 * It includes:
 * - A header with the page title and a button to register a new sale
 * - Two cards with the sales of the week and the month 
 * - A table with all the sales
 * - A card with the details of the selected sale
*/
export default async function SalesPage() {
  return (
    <SalesProvider>
      <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-col">
            <h1 className="text-lg font-semibold md:text-2xl">Ventas</h1>
            <p className="text-sm text-gray-500">
              Aqui podras ver todas las ventas realizada
            </p>
          </div>
          <Button size="sm" asChild>
            <Link href="/dashboard/sales/create">
              <Plus className="w-6 h-6 md:mr-2" />
              <span className="hidden md:inline">Registrar venta</span>
            </Link>
          </Button>
        </div>
        <section className="flex flex-col md:flex-row gap-4">
          <div className="flex flex-1 flex-col gap-4">
            <div className="flex flex-col gap-4">
              <Suspense fallback={<SkeletonCardSales />}>
                <CardSalesThisWeek />
              </Suspense>
              <Suspense fallback={<SkeletonCardSales />}>
                <CardSalesThisMonth />
              </Suspense>
            </div>
            <div className="w-full">
              <Suspense fallback={<TableDataSkeletons />}>
                <SellContainerTable />
              </Suspense>
            </div>
          </div>
          <div>
            <BigSalesCard />
          </div>
        </section>
      </main>
    </SalesProvider>
  );
}
