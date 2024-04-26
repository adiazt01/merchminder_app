"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUp, ArrowDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DropwdownProductTable } from "@/components/dropdown/DropdownProductTable";
import { Product } from "@prisma/client";

export const columns: ColumnDef<Product>[] = [
  {
    header: () => <div className="text-center">Nombre</div>,
    accessorKey: "name",
  },
  {
    accessorKey: "price",
    size: 1,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="w-full flex flex-row items-center justify-center gap-1"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Precio
          {
            column.getIsSorted() === "asc" ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />
          }
        </Button>
      );
    },
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price") as string);
      const formattedPrice = new Intl.NumberFormat("es-ES", {
        style: "currency",
        currency: "USD",
      }).format(price);

      return <div className="text-center font-medium">{formattedPrice}</div>;
    },
  },
  {
    header: () => <div className="text-center">
      Total de ventas
    </div>,
    accessorKey: "salesCount",
  },

  {
    header: () => <div className="text-center">Acciones</div>,
    accessorKey: "actions",
    cell: ({ row }) => {
      const product = row.original;
      return (
        <div className="flex flex-row items-center justify-center">
          <DropwdownProductTable product={product} />
        </div>
      );
    },
  },
];
