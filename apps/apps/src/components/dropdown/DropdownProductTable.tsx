"use client";

import { Product } from "@prisma/client";
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
import { deleteProduct } from "@/actions/productsActions";
import { useToast } from "@/components/ui/use-toast"

export function DropwdownProductTable({ product }: { product: Product }) {
  const router = useRouter();
  const { toast } = useToast();
  const { id } = product;

  async function handleDelete() {
    const res = await deleteProduct(id);

    if (res.error) {
      toast({
        title: "El producto no pudo ser eliminado",
        description: "Por favor intenta de nuevo",
      }) 
    } else {
      toast({
        title: "Producto eliminado",
        description: "El producto ha sido eliminado exitosamente",
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
              router.push(`/dashboard/products/update/${id}`);
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
            Estas seguro que deseas eliminar este producto?
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
