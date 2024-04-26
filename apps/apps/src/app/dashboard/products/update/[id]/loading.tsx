import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function Loading() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex flex-row justify-between items-center">
        <h1 className="flex flex-row text-lg font-semibold gap-2 md:text-2xl">
          <Button
            className="flex mt-0.5 items-center justify-center flex-col rounded-md text-sm font-medium ring-offset-background transition-colors border border-input bg-background text-primary hover:bg-accent h-7 w-7"
            size="icon"
            asChild
          >
            <Link href="/dashboard/products">
              <ArrowLeft className="w-5 h-5" />
            </Link>
          </Button>
          Actualizar producto
        </h1>
      </div>
      <section className="flex w-full h-full">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Actualizar producto</CardTitle>
            <CardDescription>
              Actualiza la información de tu producto.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="w-full rounded-md h-[250px] bg-gray-200 animate-pulse" />
          </CardContent>
          <CardFooter className="flex flex-row justify-end">
            <div className="w-56 mt-4 rounded-md h-10 py-1 bg-gray-200 animate-pulse" />
          </CardFooter>
        </Card>
      </section>
    </main>
  );
}
