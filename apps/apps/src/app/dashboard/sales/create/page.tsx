import { CreateSellForm } from "@/components/forms/CreateSellForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllClients } from "@/lib/ClientsData";
import { getAllProducts } from "@/lib/ProductsData";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function CreateSellPage() {
  const products = await getAllProducts();
  const clients = await getAllClients();

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex flex-row justify-between items-center">
        <h1 className="flex flex-row text-lg font-semibold gap-2 md:text-2xl">
          <Button
            className="flex mt-0.5 items-center justify-center flex-col rounded-md text-sm font-medium ring-offset-background transition-colors border border-input bg-background text-primary hover:bg-accent h-7 w-7"
            size="icon"
            asChild
          >
            <Link href="/dashboard/sales">
              <ArrowLeft className="w-5 h-5" />
            </Link>
          </Button>
          Registrar venta
        </h1>
      </div>
      <section className="flex w-full h-full">
        <Card>
          <CardHeader>
            <CardTitle>Registrar venta</CardTitle>
            <CardDescription>
              Llene los campos para registrar una venta.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CreateSellForm dataProducts={products} clientsData={clients} />
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
