"use client";

import { ColumnDef, Row } from "@tanstack/react-table";
import {
  MoreHorizontal,
  ArrowUp,
  Pencil,
  Eye,
  Trash,
  Bolt,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Client, Sale, SaleToProduct } from "@prisma/client";
import { useContext } from "react";
import { SalesContext } from "@/context/SalesContext";
import { useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { deleteSellAction } from "@/actions/salesActions";
import { SaleWithDetails } from "@/context/SalesContext";

const ActionCell = ({ sale }:{
  sale: SaleWithDetails
}) => {
  const { setSelectedSale } = useContext(SalesContext);
  const router = useRouter();

  const handleDelete = async () => {
    const res = await deleteSellAction(sale.id);
  };

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 mx-auto p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel className="flex flex-row items-center">
            <Bolt className="h-4 w-4 mr-2" />
            <span>Acciones</span>
          </DropdownMenuLabel>
          <Separator />
          <DropdownMenuItem
            onClick={() => {
              setSelectedSale(sale);
            }}
          >
            <Eye className="h-4 w-4 mr-2" />
            Ver
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              router.push(`/dashboard/sales/update/${sale.id}`);
            }}
          >
            <Pencil className="h-4 w-4 mr-2" />
            Editar
          </DropdownMenuItem>
          <DialogTrigger asChild>
            <DropdownMenuItem>
              <span>Delete</span>
            </DropdownMenuItem>
          </DialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Estas seguro que deseas eliminar esta venta?
          </DialogTitle>
          <DialogDescription>
            Esta acción no se puede deshacer.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button onClick={() => handleDelete()} type="submit">
              Confirm
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export const columns: ColumnDef<Sale>[] = [
  {
    accessorKey: "saleTotal",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="w-full"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Price
          {
            <ArrowUp
              className={`ml-2 h-4 w-4 ${
                column.getIsSorted() === "asc" ? "rotate-180" : ""
              }`}
            />
          }
        </Button>
      );
    },
    cell: ({ row }) => {
      const price = row.original.saleTotal;
      const formattedPrice = new Intl.NumberFormat("es-ES", {
        style: "currency",
        currency: "USD",
      }).format(price);

      return <div className="text-center font-medium">{formattedPrice}</div>;
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="w-full"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          {
            <ArrowUp
              className={`ml-2 h-4 w-4 ${
                column.getIsSorted() === "asc" ? "rotate-180" : ""
              }`}
            />
          }
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = new Date(row.original.createdAt);
      const formattedDate = new Intl.DateTimeFormat("es-ES", {
        dateStyle: "medium",
      }).format(date);

      return <div className="text-center">{formattedDate}</div>;
    },
  },
  {
    id: "actions",
    header: () => <h3 className="w-full text-center">Actions</h3>,
    cell: ({ row }) => {
      const sale = row.original as SaleWithDetails;
      return (
        <div className="flex flex-row items-center justify-center">
          <ActionCell sale={sale} />
        </div>
      );
    },
  },
];
