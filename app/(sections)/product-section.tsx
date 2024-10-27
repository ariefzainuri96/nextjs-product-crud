import React from "react";
import { getAllProducts, TProduct } from "../services";
import { ProductItem } from "../(components)/product-item";
import { twMerge } from "tailwind-merge";

type ProductSectionProps = {
    className?: string;
};

export const ProductSections = async ({ className }: ProductSectionProps) => {
    const products: TProduct[] = await getAllProducts();

    return (
        <div className={twMerge("grid w-full grid-cols-4 gap-4", className)}>
            {products.map((item) => {
                return <ProductItem key={item.id} product={item} />;
            })}
        </div>
    );
};
