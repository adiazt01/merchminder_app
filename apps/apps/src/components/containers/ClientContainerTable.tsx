import { getAllClients } from "@/lib/ClientsData";
import { ClientDataTable } from "../table/client/ClientTable";
import { columns } from "../table/client/ClientTableColumns";

export async function ClientContainerTable() {
  const clients = await getAllClients();

  return (
    <>
      {clients.length > 0 ? (
        <ClientDataTable columns={columns} data={clients} />
      ) : (
        <div className="flex flex-col h-96  w-full items-center justify-center rounded-lg border border-dashed shadow-sm">
          <div className="flex h-full flex-col justify-center items-center gap-1 text-center">
            <h3 className="text-2xl font-bold tracking-tight">
              No hay clientes
            </h3>
            <p className="text-sm text-muted-foreground">
              Intenta registrar un cliente
            </p>
          </div>
        </div>
      )}
    </>
  );
}
