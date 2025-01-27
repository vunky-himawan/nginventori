import { Skeleton } from "../skeleton";

export const Loading = () => {
  return (
    <div className="flex flex-col gap-3 py-2">
      <Skeleton className="h-36 w-full animate-pulse rounded-md bg-gray-300" />
      <Skeleton className="h-4 w-1/2 animate-pulse rounded-md bg-gray-300" />
      <Skeleton className="h-4 w-1/3 animate-pulse rounded-md bg-gray-300" />
      <Skeleton className="h-4 w-1/4 animate-pulse rounded-md bg-gray-300" />
    </div>
  );
};
