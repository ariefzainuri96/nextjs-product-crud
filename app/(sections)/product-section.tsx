import React from "react";
import { getAllProducts, TProduct } from "../actions";
import { ProductItem } from "../(components)/product-item";
import { twMerge } from "tailwind-merge";

type ProductSectionProps = {
    className?: string;
    openFrom?: "profile" | "dashboard";
};

export const ProductSections = async ({
    className,
    openFrom = "dashboard",
}: ProductSectionProps) => {
    const products: TProduct[] = await getAllProducts(openFrom === "dashboard");

    return (
        <div className={twMerge("grid w-full grid-cols-4 gap-4", className)}>
            {products.map((item) => {
                return <ProductItem key={item.id} product={item} />;
            })}
        </div>
    );
};
