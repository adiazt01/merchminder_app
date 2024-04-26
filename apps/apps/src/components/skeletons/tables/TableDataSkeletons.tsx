import { Skeleton } from "@/components/ui/skeleton";

export function TableDataSkeletons() {
  return (
    <div className="flex mt-4 w-full gap-4 flex-col">
      <Skeleton className="w-full h-[50px]" />
      <Skeleton className="w-full h-[325px]" />
    </div>
  );
}
