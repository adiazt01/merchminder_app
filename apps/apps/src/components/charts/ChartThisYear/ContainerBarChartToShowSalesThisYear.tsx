import { getSalesTotalYearForChart } from "@/lib/SellData";
import { BarChartSales } from "./BarChartToShowSalesThisYear";

export async function ContainerBarChartToShowSalesThisYear() {
  const salesTotalYear = await getSalesTotalYearForChart();

  return <BarChartSales data={salesTotalYear} />;
}
