import { getAllProducts } from "@/lib/ProductsData";
import { ProductDataTable } from "../table/product/ProductTable";
import { columns } from "../table/product/ProductTableColumns";

export async function ProductContainerTable() {
  const products = await getAllProducts();

  return (
    <>
      {products.length > 0 ? (
        <ProductDataTable columns={columns} data={products} />
      ) : (
        <div className="flex flex-col h-96  w-full items-center justify-center rounded-lg border border-dashed shadow-sm">
          <div className="flex h-full flex-col justify-center items-center gap-1 text-center">
            <h3 className="text-2xl font-bold tracking-tight">
              No tienes productos
            </h3>
            <p className="text-sm text-muted-foreground">
              Puedes empezar a vender tan pronto como agregues un producto.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
