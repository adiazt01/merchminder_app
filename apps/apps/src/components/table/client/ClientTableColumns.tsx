"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Client } from "@prisma/client";
import { DropdownClientTable } from "@/components/dropdown/DropdownClientTable";

export const columns: ColumnDef<Client>[] = [
  {
    header: () => <div className="text-center">Nombre</div>,
    accessorKey: "name",
    cell: ({ row }) => {
      const name = row.original.name;
      return <div className="text-center">{name}</div>;
    },
  },
  {
    header: () => <div className="text-center">Teléfono</div>,
    accessorKey: "phone",
    cell: ({ row }) => {
      const phone = row.original.phone;
      return <div className="text-center">{phone}</div>;
    },
  },
  {
    header: () => <div className="text-center">Email</div>,
    accessorKey: "email",
    cell: ({ row }) => {
      const email = row.original.email;
      return <div className="text-center">{email}</div>;
    },
  },
  {
    id: "actions",
    header: () => <div className="text-center">Acciones</div>,
    cell: ({ row }) => {
      const client = row.original;
      return (
        <div className="flex flex-row items-center justify-center">
          <DropdownClientTable client={client} />
        </div>
      );
    },
  },
];
