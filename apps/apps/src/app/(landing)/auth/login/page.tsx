"use client"

import { LoginGoogle } from "@/actions/authActions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Lock } from "lucide-react";

export default function RegisterFormPage() {
  return (
    <main className="flex items-center justify-center min-h-[90vh] bg-gray-50">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">Registro y login de usuario</CardTitle>
          <CardDescription>
            Crea una cuenta para acceder a la plataforma
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={LoginGoogle}>
            <Button type="submit" className="w-full">
              <Lock className="mr-2" />
              Inicia sesión con Google
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
