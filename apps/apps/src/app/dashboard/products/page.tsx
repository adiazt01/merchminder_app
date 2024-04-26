import { ProductContainerTable } from "@/components/containers/ProductContainerTable";
import { TableDataSkeletons } from "@/components/skeletons/tables/TableDataSkeletons";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

export default async function ProductsPage() {
  return (
    <main className="flex flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-col">
          <h1 className="text-lg font-semibold md:text-2xl">Productos</h1>
          <p className="text-sm text-gray-500">
            Aquí puedes ver y administrar tus productos
          </p>
        </div>
        <Button size="sm" asChild>
          <Link href="/dashboard/products/create">
            <Plus className="w-6 h-6 md:mr-2" />
            <span className="hidden md:inline">Crear producto</span>
          </Link>
        </Button>
      </div>
      <section className="flex w-full">
        <Suspense fallback={<TableDataSkeletons />}>
          <ProductContainerTable />
        </Suspense>
      </section>
    </main>
  );
}
