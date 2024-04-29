import { Dashboard } from "@/assets";
import { NavbarLanding } from "@/components/navbar/NavbarLading";
import { Button } from "@/components/ui/button";
import {
  LockIcon,
  RocketIcon,
  Store,
  User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  return (
    <>
      <main className="flex flex-col gap-12">
        <section className="w-full min-h-[100vh] pt-4 md:pt-24 lg:pt-36 bg-white dark:bg-gray-950">
          <div className="container px-4 md:px-6">
            <div className="grid gap-8 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-start space-y-4">
                <div className="space-y-2">
                  <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                    Merchminder
                  </h1>
                  <p className="text-xl text-muted-foreground">
                    La plataforma para gestionar tu negocio de forma eficiente.
                    Deja que tu equipo se centre en la innovación y no en la
                    gestión de la infraestructura.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button variant="default">Comenzar</Button>
                  <Button variant="secondary">Más información</Button>
                </div>
              </div>
              <Image
                quality={100}
                className="rounded-xl border shadow-lg"
                alt="Hero"
                height="1440"
                src={Dashboard}
                width="1920"
              />
            </div>
          </div>
        </section>
        <section className="container flex flex-col justify-start w-full min-h-[50vh]">
          <div className="flex w-full justify-center items-center flex-col gap-12">
            <header className="flex flex-col gap-1 max-w-4xl text-center">
              <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0">
                Características
              </h2>
              <p className="text-xl text-muted-foreground">
                Descubre las características que hacen de Merchminder la mejor
              </p>
            </header>
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 max-w-screen-lg">
              <article className="flex items-center justify-center flex-col gap-1">
                <div className="flex flex-col items-center justify-center">
                  <Store className="size-10 text-primary" />
                  <h3 className="text-xl text-center font-bold">Gestion</h3>
                </div>
                <p className="text-center text-gray-500 dark:text-gray-400">
                  Gestion de inventario, ventas y facturación.
                </p>
              </article>
              <article className="flex items-center justify-center flex-col gap-1">
                <div className="flex flex-col items-center justify-center">
                  <User className="size-10 text-primary" />
                  <h3 className="text-xl text-center font-bold">Clientes</h3>
                </div>
                <p className="text-center text-gray-500 dark:text-gray-400">
                  Gestión de clientes y fidelización.
                </p>
              </article>
              <article className="flex items-center justify-center flex-col gap-1">
                <div className="flex flex-col items-center justify-center">
                  <RocketIcon className="size-10 text-primary" />
                  <h3 className="text-xl text-center font-bold">Innovación</h3>
                </div>
                <p className="text-center text-gray-500 dark:text-gray-400">
                  Innovación y desarrollo de productos.
                </p>
              </article>
              <article className="flex items-center justify-center flex-col gap-1">
                <div className="flex flex-col items-center justify-center">
                  <LockIcon className="size-10 text-primary" />
                  <h3 className="text-xl text-center font-bold">Seguridad</h3>
                </div>
                <p className="text-center text-gray-500 dark:text-gray-400">
                  Seguridad y protección de datos.
                </p>
              </article>
            </div>
          </div>
        </section>
        <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            © 2024 Acme Inc. All rights reserved.
          </p>
          <nav className="sm:ml-auto flex gap-4 sm:gap-6">
            <Link
              className="text-xs hover:underline underline-offset-4"
              href="#"
            >
              Terms of Service
            </Link>
            <Link
              className="text-xs hover:underline underline-offset-4"
              href="#"
            >
              Privacy
            </Link>
          </nav>
        </footer>
      </main>
    </>
  );
}
