"use client";

import { Client, Product, Sale, SaleToProduct } from "@prisma/client";
import { createContext, useContext, useState } from "react";

type SaleItemWithProduct = SaleToProduct & {
  product: Product;
};

export type SaleWithDetails = Sale & {
  client: Client;
  saleItems: SaleItemWithProduct[];
};

export interface SalesContextInterface {
  selectedSale: SaleWithDetails | null;
  setSelectedSale: (sale: SaleWithDetails) => void;
}


export const SalesContext = createContext<SalesContextInterface>({
    selectedSale: null as SaleWithDetails | null,
    setSelectedSale: () => {},
});

export const SalesProvider = ({ children }:{
    children: React.ReactNode;
}) => {
  const [selectedSale, setSelectedSale] = useState<SaleWithDetails | null>(null);

  return (
    <SalesContext.Provider value={{ selectedSale, setSelectedSale }}>
      {children}
    </SalesContext.Provider>
  );
};
