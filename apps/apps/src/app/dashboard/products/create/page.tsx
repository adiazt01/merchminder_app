"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowLeft, LoaderCircle, Plus, AlertCircle } from "lucide-react";
import Link from "next/link";
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
import { createProductSchema } from "@/schemas/productSchemas";
import { z } from "zod";
import { createProduct } from "@/actions/productsActions";
import { useToast } from "@/components/ui/use-toast";

export default function CreateProductPage() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof createProductSchema>>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      description: "",
      name: "",
      price: "",
    },
  });

  async function onSubmit(values: z.infer<typeof createProductSchema>) {
    const formValues = new FormData();
    formValues.append("name", values.name);
    if (values.description) {
      formValues.append("description", values.description);
    }
    formValues.append("price", values.price);

    const res = await createProduct(formValues);

    if (!res.error && res.data) {
      form.reset();
      toast({
        title: "Producto creado",
        description: `El producto "${res.data.name}" ha sido creado`,
        variant: "default",
      });
    } else {
      form.setError("root", { type: "manual", message: res.message });
    }
  }

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex flex-row justify-between items-center">
        <h1 className="flex flex-row justify-end text-lg font-semibold gap-2 md:text-2xl">
          <Button
            className="flex mt-0.5 items-center justify-center flex-col rounded-md text-sm font-medium ring-offset-background transition-colors border border-input bg-background text-primary hover:bg-accent h-7 w-7"
            size="icon"
            asChild
          >
            <Link href="/dashboard/products">
              <ArrowLeft className="w-5 h-5" />
            </Link>
          </Button>
          Crear un nuevo producto
        </h1>
      </div>
      <section className="flex gap-4 flex-col md:flex-row w-full h-full">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Información del producto</CardTitle>
            <CardDescription>
              Complete los campos para crear un nuevo producto
            </CardDescription>
          </CardHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 gap-4"
            >
              <CardContent className="flex flex-col gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Nombre del producto{" "}
                        <span className="text-red-500">*</span>
                      </FormLabel>
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
                        <Input
                          placeholder="Descripción del producto"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Precio <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min={0}
                          placeholder="0.00"
                          {...field}
                        />
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
                  disabled={
                    !form.formState.isValid || form.formState.isSubmitting
                  }
                  type="submit"
                >
                  {form.formState.isSubmitting ? (
                    <span className="flex flex-row gap-2 items-center">
                      <LoaderCircle className="w-6 h-6 animate-spin" />
                      Creando producto...
                    </span>
                  ) : (
                    <span className="flex flex-row gap-2 items-center">
                      <Plus className="w-6 h-6" />
                      Crear producto
                    </span>
                  )}
                </Button>
              </CardFooter>
            </form>
          </Form>
        </Card>
      </section>
    </main>
  );
}
