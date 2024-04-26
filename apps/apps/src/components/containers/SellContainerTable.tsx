import { getAllSales } from "@/lib/SellData";
import { columns } from "../table/sell/SellTableColumns";
import { SellDataTable } from "../table/sell/SellTable";

export async function SellContainerTable() {
  const sales = await getAllSales();

  return (
    <>
      {sales.length > 0 ? (
        <SellDataTable columns={columns} data={sales} />
      ) : (
        <div className="flex flex-col h-40  w-full items-center justify-center rounded-lg border border-dashed shadow-sm">
          <div className="flex h-full flex-col justify-center items-center gap-1 text-center">
            <h3 className="text-2xl font-bold tracking-tight">No hay ventas</h3>
            <p className="text-sm text-muted-foreground">
              Intenta registrar una venta
            </p>
          </div>
        </div>
      )}
    </>
  );
}
