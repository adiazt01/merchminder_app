// @ts-nocheck

"use client";

import { CreateSaleSchemaForm } from "@/schemas/sellSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Client, Product } from "@prisma/client";
import { useForm, useFieldArray } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { createSell } from "@/actions/salesActions";
import { useToast } from "@/components/ui/use-toast";
import { Loader } from "lucide-react";
import { useState } from "react";

interface CreateSellFormProps {
  dataProducts: Product[];
  clientsData: Client[];
}

/**
 * CreateSellForm component
 *
 * This component renders a form to create a new sell. It uses the CreateSaleSchemaForm schema to validate the form.
 *
 * @component
 *
 * @example
 * return (
 *   <CreateSellForm dataProducts={products} clientsData={clients} />
 * )
 *
 * @param {Product[]} dataProducts The list of products to show in the form.
 * @param {Client[]} clientsData The list of clients to show in the form.
 */
export function CreateSellForm({
  dataProducts,
  clientsData,
}: CreateSellFormProps) {
  const { toast } = useToast();
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);

  // Create the form
  const form = useForm<z.infer<typeof CreateSaleSchemaForm>>({
    resolver: zodResolver(CreateSaleSchemaForm),
    defaultValues: {
      clientId: undefined,
      products: undefined,
    },
  });

  // Use the hook to manage the products array
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "products",
  });

  // Function to handle the form submit
  async function onSubmit(values: z.infer<typeof CreateSaleSchemaForm>) {
    // Map the products to the correct types
    const products = values.products.map((product) => ({
      ...product,
      productId: Number(product.productId),
      quantity: Number(product.quantity),
    }));

    // Create the form data
    const formData = new FormData();
    formData.append("clientId", values.clientId);
    if (products.length === 0) {
      form.setError("products", {
        message: "Debes añadir al menos un producto",
      });
      return;
    }
    formData.append("products", JSON.stringify(products));

    const res = await createSell(formData);

    if (res.error) {
      form.setError("root", { message: res.message });
      toast({
        title: "Error al registrar la venta",
        description: "Ha ocurrido un error al registrar la venta.",
      });
    } else {
      toast({
        title: "Venta registrada",
        description: "La venta ha sido registrada con éxito.",
      });
    }
  }

  function handleOnChangeSelectProduct({
    value,
    field,
    index,
  }: {
    value: string;
    field: any;
    index: number;
  }) {
    const product: Product = dataProducts.find(
      (product) => product.id === Number(value)
    );

    if (product) {
      field.onChange(value);
      setSelectedProducts((prev) => {
        const newProducts = [...prev];
        newProducts[index] = { product, quantity: 1 };
        return newProducts;
      });
    }
  }

  function handleOnChangeQuantity({
    value,
    index,
    field,
  }: {
    value: string;
    index: number;
    field: any;
  }) {
    field.onChange(value);
    setSelectedProducts((prev) => {
      const newProducts = [...prev];
      console.log(newProducts);
      newProducts[index].quantity = Number(value);
      console.log(newProducts);
      return newProducts;
    });
  }

  const totalPrice = selectedProducts.reduce(
    (total, { product, quantity }) => total + product.price * quantity,
    0
  );

  console.log(selectedProducts);
  console.log(totalPrice);

  return (
    <Form {...form}>
      <form
        className="grid grid-cols-1 gap-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="clientId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cliente</FormLabel>
              <Select onValueChange={(value) => field.onChange(value)}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Juan..." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {clientsData.map((client) => (
                    <SelectItem key={client.id} value={client.id.toString()}>
                      {client.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                Selecciona un cliente para la venta.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {fields.map((item, index) => (
          <div
            className="flex flex-row flex-wrap items-end gap-6"
            key={item.id}
          >
            <FormField
              control={form.control}
              name={`products.${index}.productId` as const}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Producto</FormLabel>
                  <Select
                    onValueChange={(value) =>
                      handleOnChangeSelectProduct({ value, field, index })
                    }
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Producto..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {dataProducts.map((product) => (
                        <SelectItem
                          key={product.id}
                          value={product.id.toString()}
                        >
                          {product.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={`products.${index}.quantity` as const}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cantidad</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="1"
                      onChange={(event) =>
                        handleOnChangeQuantity({
                          value: event.target.value,
                          index,
                          field,
                        })
                      }
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => remove(index)}
            >
              Remove
            </Button>
          </div>
        ))}

        <div className="flex justify-start gap-4">
          <Button
            type="button"
            size="sm"
            onClick={() =>
              append({ productId: undefined, quantity: undefined })
            }
          >
            Add product
          </Button>
        </div>

        {form.formState.errors.root && (
          <FormMessage>{form.formState.errors.root.message}</FormMessage>
        )}
        <div className="flex justify-end gap-4">
          <Button
            disabled={form.formState.isSubmitting || totalPrice === 0}
            type="submit"
          >
            {form.formState.isSubmitting ? (
              <>
                <Loader className="size-6 mr-2" />
                <span>Registrando venta...</span>
              </>
            ) : (
              <span>Registrar venta por ${totalPrice}</span>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
