"use client";

import { zodResolver } from "@hookform/resolvers/zod";

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
import { Label } from "@/components/ui/label";
import { ArrowLeft, LoaderCircle, Plus } from "lucide-react";
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
import { z } from "zod";
import { createClientFormSchema } from "@/schemas/clientSchema";
import { createClient } from "@/actions/clientActions";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

export default function CreateClientPage() {
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<z.infer<typeof createClientFormSchema>>({
    resolver: zodResolver(createClientFormSchema),
    defaultValues: {
      name: undefined,
      email: undefined,
      phone: undefined,
    },
  });

  async function onSubmit(values: z.infer<typeof createClientFormSchema>) {
    const formValues = new FormData();
    formValues.append("name", values.name);

    if (values.email) {
      formValues.append("email", values.email);
    }

    if (values.phone) {
      formValues.append("phone", values.phone);
    }

    const res = await createClient(formValues);

    if (res) {
      toast({
        title: "Cliente creado",
        description: "El cliente ha sido creado exitosamente.",
      });
      form.reset();
      router.push("/dashboard/clients");
    } else {
      toast({
        title: "Error",
        description: "Hubo un error al crear el cliente.",
      });
    }
  }

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex flex-row justify-between items-center">
        <h1 className="flex flex-row text-lg font-semibold gap-2 md:text-2xl">
          <Button
            className="flex mt-0.5 items-center justify-center flex-col rounded-md text-sm font-medium ring-offset-background transition-colors border border-input bg-background text-primary hover:bg-accent h-7 w-7"
            size="icon"
            asChild
          >
            <Link href="/dashboard/clients">
              <ArrowLeft className="w-5 h-5" />
            </Link>
          </Button>
          Agendar un nuevo cliente
        </h1>
      </div>
      <section className="flex w-full h-full">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Nuevo cliente</CardTitle>
            <CardDescription>
              Agregue un nuevo cliente a su lista.
            </CardDescription>
          </CardHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <CardContent className="flex flex-col gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Armando Diaz, Luis Perez..."
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Nombre que permitira identificar el cliente.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Correo</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="example@mail.com"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Correo electronico del cliente.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Telefono</FormLabel>
                      <FormControl>
                        <Input
                          type="tel"
                          placeholder="123-456-7890"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Telefono de contacto del cliente.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
                      Creando cliente...
                    </span>
                  ) : (
                    <span className="flex flex-row gap-2 items-center">
                      <Plus className="w-6 h-6" />
                      Crear cliente
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
