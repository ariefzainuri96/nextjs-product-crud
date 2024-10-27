import React from "react";
import { TProduct } from "../services";
import { db } from "@/db";
import { ProductTable } from "@/db/schema";
import { ProductItem } from "../(components)/product-item";

export const ProductSections = async () => {
    const products: TProduct[] = await db.select().from(ProductTable);

    return (
        <div className="grid grid-cols-3 gap-2">
            {products.map((item) => {
                return <ProductItem key={item.id} product={item} />;
            })}
        </div>
    );
};
