"use client";

import { Client } from "@prisma/client";
import { Bolt, MoreHorizontal, Pencil, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { deleteClient } from "@/actions/clientActions";

export function DropdownClientTable({ client }: { client: Client }) {
  const router = useRouter();
  const { toast } = useToast();
  const { id } = client;

  async function handleDelete() {
    const res = await deleteClient(id);

    if (res.error) {
      toast({
        title: "Error al eliminar",
        description: "Hubo un error al eliminar el cliente",
      });
    } else {
      toast({
        title: "Cliente eliminado",
        description: "El cliente fue eliminado correctamente",
      });
    }
  }

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
              router.push(`/dashboard/client/update/${id}`);
            }}
          >
            <Pencil className="h-4 w-4 mr-2" />
            <span>Editar</span>
          </DropdownMenuItem>
          <DialogTrigger asChild>
            <DropdownMenuItem>
              <Trash className="h-4 w-4 mr-2" />
              <span>Delete</span>
            </DropdownMenuItem>
          </DialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Estas seguro que deseas eliminar este cliente?
          </DialogTitle>
          <DialogDescription>
            Esta acción no se puede deshacer
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button onClick={() => handleDelete()} type="submit">
              Confirmar
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
