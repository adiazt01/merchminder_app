"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SalesContext } from "@/context/SalesContext";
import { useContext } from "react";

/**
 * BigSalesCard component
 *
 * This component renders the details of the selected sale.This need use the SalesContext to get the selected sale. Besides it is sticky with respect to the viewport.
 *
 * @component
 *
 * @example
 * return (
 * <SalesContext.Provider value={{ selectedSale: mySale }}>
 *     <BigSalesCard />
 *   </SalesContext.Provider>
 * )
 */
export function BigSalesCard() {
  const { selectedSale } = useContext(SalesContext);

  // If there is no selected sale, show a message
  if (!selectedSale) {
    return (
      <Card className="sticky flex-1 top-20 flex flex-col  order-first md:order-last">
        <CardHeader>
          <CardTitle className="text-xl">No hay venta seleccionada</CardTitle>
          <CardDescription>
            Selecciona una venta para ver detalles
          </CardDescription>
        </CardHeader>
        <CardContent></CardContent>
      </Card>
    );
  }

  const { saleTotal, createdAt, id, saleItems, client } = selectedSale;

  // Calculate the total price of the sale items
  const totalProductsSellsWithTotalPrice = saleItems.map((item) => {
    return {
      ...item,
      totalPrice: item.quantity * item.salePrice,
    };
  });

  return (
    <Card className="sticky flex-1 top-20 flex flex-col  order-first md:order-last">
      <CardHeader className="bg-gray-50 border-b py-4">
        <CardTitle className="text-xl">
          Venta # {id}
          <CardDescription className="flex flex-row gap-2">
            <time className="font-medium">
              Fecha: {new Date(createdAt).toLocaleDateString("es-VE")}
            </time>
            <time className="font-medium">
              Hora: {new Date(createdAt).toLocaleTimeString("es-VE")}
            </time>
          </CardDescription>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex pt-2 gap-3 flex-col">
          <h3 className="font-semibold text-lg text-neutral-700">
            Productos vendidos
          </h3>
          <div className="flex flex-col">
            {totalProductsSellsWithTotalPrice.map((productSell) => (
              <div
                key={productSell.productId}
                className="flex flex-row justify-between w-full"
              >
                {/* For manage the product name if the product was deleted */}
                <span className="font-medium text-md text-neutral-600">
                  {productSell?.product?.name &&
                    `${productSell.product.name} ${productSell.quantity}x`}
                  {!productSell?.product?.name &&
                    `Producto eliminado ${productSell.quantity}x`}
                </span>
                <span className="font-bold -tracking-tighter">{`$${productSell.totalPrice}`}</span>
              </div>
            ))}
          </div>
          <Separator />
          <h3 className="font-semibold text-lg text-neutral-700">
            Información de la venta
          </h3>
          <div className="flex flex-row justify-between">
            <span className="font-medium text-md text-neutral-600">Total</span>
            <span className="font-bold -tracking-tighter">{`$${saleTotal}`}</span>
          </div>
          <Separator />
          <h3 className="font-semibold text-lg text-neutral-700">
            Información del cliente
          </h3>
          <div className="flex flex-col">
            <div className="flex flex-row justify-between">
              <span className="font-medium text-md text-neutral-600">
                Nombre
              </span>
              <span className="font-medium text-md text-neutral-600">
                {client.name}
              </span>
            </div>
            <div className="flex flex-row justify-between">
              <span className="font-medium text-md text-neutral-600">
                Telefono
              </span>
              <span className="font-medium text-md text-neutral-600">
                {client.phone}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
