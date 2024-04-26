import { ClientContainerTable } from "@/components/containers/ClientContainerTable";
import { TableDataSkeletons } from "@/components/skeletons/tables/TableDataSkeletons";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

export default async function ClientsPage() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-col">
          <h1 className="text-lg font-semibold md:text-2xl">Clientes</h1>
          <p className="text-sm text-gray-500">
            Aquí puedes ver y gestionar tus clientes
          </p>
        </div>
        <Button size="sm" asChild>
          <Link href="/dashboard/clients/create">
            <Plus className="w-6 h-6 md:mr-2" />
            <span className="hidden md:inline">Create Client</span>
          </Link>
        </Button>
      </div>
      <section className="w-full">
        <Suspense fallback={<TableDataSkeletons />}>
          <ClientContainerTable />
        </Suspense>
      </section>
    </main>
  );
}
