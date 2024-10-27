import React from "react";
import { TProduct } from "../services";

type ProductItemProps = {
    product: TProduct;
};

export const ProductItem = ({ product }: ProductItemProps) => {
    return (
        <div className="flex flex-col items-start gap-2 rounded-md p-4 shadow-md">
            <span>{product.name}</span>
            <span>{product.price}</span>
            <span>{product.quantity}</span>
        </div>
    );
};
