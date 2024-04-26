"use client";

import { useIsServerSide } from "@/hooks/useIsServerSide";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface BarChartSalesProps {
  data: {
    month: number;
    sales: any;
  }[];
}
export function BarChartSales({ data }: BarChartSalesProps) {
  const isServerSide = useIsServerSide();
  if (isServerSide) return null;

  if (data.length === 0) {
    return (
      <div className="flex flex-col h-full  w-full items-center justify-center rounded-lg border border-dashed shadow-sm">
      <div className="flex h-full flex-col justify-center items-center gap-1 text-center">
        <h3 className="text-2xl font-bold tracking-tight">No hay ventas</h3>
        <p className="text-sm text-muted-foreground">
          Intenta registrar una venta
        </p>
      </div>
    </div>
    );
  }

  const monthNames = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  const transformedData = data.map((item) => ({
    ...item,
    month: monthNames[item.month - 1],
  }));

  console.log(transformedData);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart width={150} height={40} data={transformedData}>
        <Bar dataKey="sales" className="fill-primary" />
        <Tooltip
          formatter={(value, name) => [
            `${value.toLocaleString("es-ES", {
              style: "currency",
              currency: "USD",
            })}`,
            "Ventas",
          ]}
        />
        <XAxis height={40} axisLine={false} tickLine={false} dataKey="month" />
        <YAxis
          tickFormatter={(value) => `$${value}`}
          axisLine={false}
          tickLine={false}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
