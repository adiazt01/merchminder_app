"use client";

import { CreateSaleSchemaForm } from "@/schemas/sellSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Client, Product } from "@prisma/client";
import { useState } from "react";
import { useForm } from "react-hook-form";
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
  SelectGroup,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import Link from "next/link";
import { createSell } from "@/actions/salesActions";

interface CreateSellFormProps {
  dataProducts: Product[];
  clientsData: Client[];
}

export function CreateSellForm({
  dataProducts,
  clientsData,
}: CreateSellFormProps) {
  const form = useForm<z.infer<typeof CreateSaleSchemaForm>>({
    resolver: zodResolver(CreateSaleSchemaForm),
    defaultValues: {
      clientId: "",
      products: [{ productId: "", quantity: "" }],
    },
  });

  const [globalSelectedProducts, setGlobalSelectedProducts] = useState([]);
  const [localSelectedProducts, setLocalSelectedProducts] = useState([[]]);

  const [products, setProducts] = useState([
    { productId: "", quantity: "", salePrice: "" },
  ]);

  const addProduct = () => {
    setProducts([...products, { productId: "", quantity: "", salePrice: "" }]);
  };

  const removeProduct = (index: number) => {
    setSalePrice((prev) => {
      const product = dataProducts.find(
        (product) => product.id.toString() === products[index].productId
      );
      return prev - product.price;
    });

    const newProducts = [...products];
    newProducts.splice(index, 1);
    setProducts(newProducts);

    const newGlobalSelectedProducts = [...globalSelectedProducts];
    newGlobalSelectedProducts.splice(index, 1);
    setGlobalSelectedProducts(newGlobalSelectedProducts);

    const newLocalSelectedProducts = [...localSelectedProducts];
    newLocalSelectedProducts.splice(index, 1);
    setLocalSelectedProducts(newLocalSelectedProducts);
  };

  async function onSubmit(values: z.infer<typeof CreateSaleSchemaForm>) {
    const products = values.products.map((product) => ({
      ...product,
      productId: Number(product.productId),
      quantity: Number(product.quantity),
    }));

    const formData = new FormData();

    formData.append("clientId", values.clientId);
    formData.append("products", JSON.stringify(products));

    const res = await createSell(formData);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="clientId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cliente</FormLabel>
              <Select onValueChange={(value) => field.onChange(value)}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a client" />
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
                Select a client to associate with the sale.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {products &&
          products.map((product, index) => (
            <div key={index}>
              <FormField
                control={form.control}
                name={`products[${index}].productId`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        const newGlobalSelectedProducts = [
                          ...globalSelectedProducts,
                          value,
                        ];

                        const newLocalSelectedProducts = [
                          ...localSelectedProducts,
                        ];
                        if (!newLocalSelectedProducts[index]) {
                          newLocalSelectedProducts[index] = [];
                        }
                        newLocalSelectedProducts[index] = [
                          ...newLocalSelectedProducts[index],
                          value,
                        ];
                        setGlobalSelectedProducts(newGlobalSelectedProducts);
                        setLocalSelectedProducts(newLocalSelectedProducts);
                      }}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a verified email to display" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {dataProducts
                          .filter(
                            (product) =>
                              !globalSelectedProducts.includes(
                                product.id.toString()
                              ) ||
                              localSelectedProducts[index]?.includes(
                                product.id.toString()
                              )
                          )
                          .map((product) => (
                            <SelectItem
                              key={product.id}
                              value={product.id.toString()}
                            >
                              {product.name}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      You can manage email addresses in your{" "}
                      <Link href="/examples/forms">email settings</Link>.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`products[${index}].quantity`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantity</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Quantity"
                        value={field.value || ""}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Enter the quantity of the product.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <button type="button" onClick={() => removeProduct(index)}>
                Remove Product
              </button>
            </div>
          ))}

        <button type="button" onClick={addProduct}>
          Add Product
        </button>

        <button type="submit">Submit</button>
      </form>
    </Form>
  );
}
