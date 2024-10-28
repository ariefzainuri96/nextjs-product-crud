"use client";

import React, { useState } from "react";
import { deleteProduct, TProduct } from "../actions";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { EllipsisVerticalIcon } from "lucide-react";
import { AddProductDialog } from "./add-product-dialog";

type ProductItemProps = {
    product: TProduct;
};

export const ProductItem = ({ product }: ProductItemProps) => {
    const [popOverOpen, setPopOverOpen] = useState(false);
    const menus = ["Edit", "Delete"];

    return (
        <div className="flex flex-col items-start gap-2 rounded-md p-4 shadow-md">
            <div className="flex w-full flex-row items-center gap-2">
                <span className="line-clamp-1 flex-1 overflow-ellipsis font-semibold">
                    {product.name}
                </span>
                <Popover open={popOverOpen} onOpenChange={setPopOverOpen}>
                    <PopoverTrigger asChild>
                        <EllipsisVerticalIcon className="size-4 cursor-pointer" />
                    </PopoverTrigger>
                    <PopoverContent className="w-40 p-2">
                        <div className="flex flex-col items-start">
                            {menus.map((item, index) => {
                                const isEdit = item.toLowerCase() === "edit";

                                if (isEdit) {
                                    return (
                                        <AddProductDialog
                                            product={product}
                                            key={index}
                                            onDialogClosed={() =>
                                                setPopOverOpen(false)
                                            }
                                        >
                                            <span
                                                className="w-full cursor-pointer rounded-md p-2 hover:bg-gray-50"
                                                key={index}
                                            >
                                                {item}
                                            </span>
                                        </AddProductDialog>
                                    );
                                }

                                return (
                                    <span
                                        onClick={(e) => {
                                            e.preventDefault();

                                            switch (item.toLowerCase()) {
                                                case "delete":
                                                    deleteProduct(product.id);
                                                    setPopOverOpen(false);
                                                    break;
                                                default:
                                                    break;
                                            }
                                        }}
                                        className="w-full cursor-pointer rounded-md p-2 hover:bg-gray-50"
                                        key={index}
                                    >
                                        {item}
                                    </span>
                                );
                            })}
                        </div>
                    </PopoverContent>
                </Popover>
            </div>
            <span>${product.price}</span>
            <span>{product.quantity}</span>
        </div>
    );
};
