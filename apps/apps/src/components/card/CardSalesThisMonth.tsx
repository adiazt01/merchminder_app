import { getSalesThisMonth } from "@/lib/SellData";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export async function CardSalesThisMonth(){
    const salesThisMonth = await getSalesThisMonth();

    return (
        <Card className="w-full h-32">
        <CardHeader>
          <CardDescription>Este mes</CardDescription>
        </CardHeader>
        <CardContent className="-mt-2">
          <CardTitle className="flex flex-row items-center text-5xl">
            <span className="text-3xl mr-1">$</span>
            {salesThisMonth}
          </CardTitle>
        </CardContent>
      </Card>
    )
}