import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { UpdateSellForm } from "@/components/forms/UpdateSellForm";
import { getProduct } from "@/lib/ProductsData";

export default async function ProductUpdatePage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const product = await getProduct(params.id);

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex flex-row justify-between items-center">
        <h1 className="flex flex-row text-lg font-semibold gap-2 md:text-2xl">
          <Button
            className="flex mt-0.5 items-center justify-center flex-col rounded-md text-sm font-medium ring-offset-background transition-colors border border-input bg-background text-primary hover:bg-accent h-7 w-7"
            size="icon"
            asChild
          >
            <Link href="/dashboard/products">
              <ArrowLeft className="w-5 h-5" />
            </Link>
          </Button>
          Actualizar producto
        </h1>
      </div>
      <section className="flex w-full h-full">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Actualizar producto</CardTitle>
            <CardDescription>
              Actualiza la información de tu producto.
            </CardDescription>
          </CardHeader>
          <UpdateSellForm dataUpdateProduct={product} />
        </Card>
      </section>
    </main>
  );
}
