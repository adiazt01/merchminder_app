"use client";

import { Product } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import {
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
  Form,
  FormField,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { updateProductSchema } from "@/schemas/productSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateProduct } from "@/actions/productsActions";
import { z } from "zod";
import { LoaderCircle, Plus, AlertCircle } from "lucide-react";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { useToast } from "@/components/ui/use-toast";

export function UpdateSellForm({
  dataUpdateProduct,
}: {
  dataUpdateProduct: Product;
}) {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof updateProductSchema>>({
    resolver: zodResolver(updateProductSchema),
    defaultValues: {
      description: dataUpdateProduct.description || "",
      name: dataUpdateProduct.name,
      price: dataUpdateProduct.price.toString(),
    },
  });

  async function onSubmit(values: z.infer<typeof updateProductSchema>) {
    const formValues = new FormData();

    if (values.name && values.name !== dataUpdateProduct.name) {
      formValues.append("name", values.name);
    }

    if (values.description && values.description !== dataUpdateProduct.description) {
      formValues.append("description", values.description);
    }

    if (values.price && values.price !== dataUpdateProduct.price.toString()) {
      formValues.append("price", values.price);
    }

    const res = await updateProduct(dataUpdateProduct.id, formValues);

    if (!res.error && res.data) {
      form.reset();
      toast({
        title: "Producto actualizado",
        description: `El producto "${res.data.name}" ha sido actualizado`,
        variant: "default",
      });
    } else {
      form.setError("root", { type: "manual", message: res.message });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <CardContent className="w-full flex flex-col gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre del producto</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Pan de Guayaba, Coca-cola, zapato..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descripción</FormLabel>
                <FormControl>
                  <Input placeholder="Descripción del producto" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Precio</FormLabel>
                <FormControl>
                  <Input type="number" min={0} placeholder="0.00" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {form.formState.errors.root && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                {form.formState.errors.root?.message}
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
        <CardFooter className="flex flex-row justify-end">
          <Button
            disabled={!form.formState.isValid || form.formState.isSubmitting}
            type="submit"
          >
            {form.formState.isSubmitting ? (
              <span className="flex flex-row gap-2 items-center">
                <LoaderCircle className="w-6 h-6 animate-spin" />
                Actuaalizando producto...
              </span>
            ) : (
              <span className="flex flex-row gap-2 items-center">
                <Plus className="w-6 h-6" />
                Actualizar producto
              </span>
            )}
          </Button>
        </CardFooter>
      </form>
    </Form>
  );
}
