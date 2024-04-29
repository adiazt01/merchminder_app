"use client";

import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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
import { updateClientSchema } from "@/schemas/clientSchema";
import { updateClient } from "@/actions/clientActions";
import { Client } from "@prisma/client";
import { useToast } from "@/components/ui/use-toast";
import { LoaderCircle, Plus } from "lucide-react";

export function UpdateClientForm({ clientData }: { clientData: Client }) {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof updateClientSchema>>({
    resolver: zodResolver(updateClientSchema),
    // @ts-nocheck
    defaultValues: {
      name: clientData.name,
      email: clientData.email,
      phone: clientData.phone,
    },
  });

  async function onSubmit(values: z.infer<typeof updateClientSchema>) {
    const formValues = new FormData();

    formValues.append("name", values.name);
    formValues.append("email", values.email);
    formValues.append("phone", values.phone);

    const res = await updateClient(clientData.id, formValues);
    console.log(res);
    if (res.error) {
      toast({
        title: "Error",
        description: "No se pudo actualizar el cliente",
      });
    } else {
      toast({
        title: "Cliente actualizado",
        description: "El cliente ha sido actualizado correctamente",
      });
    }
  }

  return (
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
                  <Input placeholder="Armando Diaz, Luis Perez..." {...field} />
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
                  <Input placeholder="example@mail.com" {...field} />
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
                  <Input type="tel" placeholder="123-456-7890" {...field} />
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
          <Button disabled={form.formState.isSubmitting} type="submit">
            {form.formState.isSubmitting ? (
              <span className="flex flex-row gap-2 items-center">
                <LoaderCircle className="w-6 h-6 animate-spin" />
                Actualizando cliente
              </span>
            ) : (
              <span className="flex flex-row gap-2 items-center">
                <Plus className="w-6 h-6" />
                Actualizar cliente
              </span>
            )}
          </Button>
        </CardFooter>
      </form>
    </Form>
  );
}
