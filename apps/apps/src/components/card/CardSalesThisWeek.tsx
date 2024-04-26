import { getSalesThisWeek } from "@/lib/SellData";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export async function CardSalesThisWeek() {
  const salesThisWeek = await getSalesThisWeek();

  return (
    <Card className="w-full h-32">
      <CardHeader>
        <CardDescription>Esta semana</CardDescription>
      </CardHeader>
      <CardContent className="-mt-2">
        <CardTitle className="flex flex-row items-center text-5xl">
          <span className="text-3xl mr-1">$</span>
          {salesThisWeek}
        </CardTitle>
      </CardContent>
    </Card>
  );
}
