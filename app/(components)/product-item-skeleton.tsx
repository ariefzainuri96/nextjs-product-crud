import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export const ProductItemSkeleton = () => {
    return (
        <div className="flex flex-col items-start gap-2 rounded-md p-4 shadow-md">
            <Skeleton className="h-4 w-1/6" />
            <Skeleton className="h-4 w-5" />
            <Skeleton className="h-4 w-7" />
        </div>
    );
};

export const ProductSkeleton = () => {
    return (
        <div className="grid w-full grid-cols-4 gap-4">
            {Array.from({ length: 3 }).map((_, index) => {
                return <ProductItemSkeleton key={index} />;
            })}
        </div>
    );
};
