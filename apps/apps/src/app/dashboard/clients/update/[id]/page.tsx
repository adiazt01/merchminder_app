import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { getClient } from "@/lib/ClientsData";
import {UpdateClientForm} from "@/components/forms/UpdateClientForm";

export default async function ClientUpdatePage({
  params,
}: {
  params: {
    id: string;
  };
}) {

  const client = await getClient(params.id);

  if (!client) {
    return (
      <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
        <div className="flex flex-row justify-between items-center">
          <h1 className="flex flex-row text-lg font-semibold gap-2 md:text-2xl">
            <Button
              className="flex mt-0.5 items-center justify-center flex-col rounded-md text-sm font-medium ring-offset-background transition-colors border border-input bg-background text-primary hover:bg-accent h-7 w-7"
              size="icon"
              asChild
            >
              <Link href="/dashboard/clients">
                <ArrowLeft className="w-5 h-5" />
              </Link>
            </Button>
            Actualizar cliente
          </h1>
        </div>
        <section className="flex w-full h-full">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Actualizar cliente</CardTitle>
              <CardDescription>
                No se pudo encontrar el cliente.
              </CardDescription>
            </CardHeader>
          </Card>
        </section>
      </main>
    );
  }

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex flex-row justify-between items-center">
        <h1 className="flex flex-row text-lg font-semibold gap-2 md:text-2xl">
          <Button
            className="flex mt-0.5 items-center justify-center flex-col rounded-md text-sm font-medium ring-offset-background transition-colors border border-input bg-background text-primary hover:bg-accent h-7 w-7"
            size="icon"
            asChild
          >
            <Link href="/dashboard/clients">
              <ArrowLeft className="w-5 h-5" />
            </Link>
          </Button>
          Actualizar cliente
        </h1>
      </div>
      <section className="flex w-full h-full">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Actualizar cliente</CardTitle>
            <CardDescription>
              Actualiza la información de tu cliente.
            </CardDescription>
          </CardHeader>
          <UpdateClientForm clientData={client} />
        </Card>
      </section>
    </main>
  );
}
