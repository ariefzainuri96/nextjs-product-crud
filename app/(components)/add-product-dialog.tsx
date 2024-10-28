"use client";

import {
    Dialog,
    DialogContentWithoutX,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import React, { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { handleUpdateOrAdd, TProduct } from "../actions";
import { CustomInput } from "@/components/custom-input";
import { Button } from "@/components/ui/button";

type AddProductDialogProps = {
    children: React.ReactNode;
    product?: TProduct;
    onDialogClosed?: () => void;
};

export const AddProductDialog = ({
    children,
    product,
    onDialogClosed,
}: AddProductDialogProps) => {
    const [open, setOpen] = useState(false);
    const [response, dispatch] = useFormState(handleUpdateOrAdd, null);

    useEffect(() => {
        if (response?.status === 200) {
            setOpen(false);
            if (onDialogClosed) onDialogClosed();
        }
    }, [response]);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContentWithoutX className="rounded-md sm:max-w-[425px]">
                <DialogTitle>
                    {product ? "Edit Product" : "Add Product"}
                </DialogTitle>
                <form action={dispatch} className="flex flex-col items-start">
                    <CustomInput
                        label={"Product Name"}
                        id="name"
                        name="name"
                        defaultValue={product?.name}
                        className="w-full"
                        placeholder="ex: Shampoo"
                    />
                    <CustomInput
                        label={"Product Price"}
                        id="price"
                        name="price"
                        defaultValue={product?.price}
                        className="mt-2 w-full"
                        placeholder="ex: 1000"
                    />
                    <CustomInput
                        label={"Product Quantity"}
                        id="quantity"
                        name="quantity"
                        defaultValue={product?.quantity}
                        className="mt-2 w-full"
                        placeholder="ex: 1"
                    />
                    <CustomInput
                        label={"Product Quantity"}
                        id="productId"
                        name="productId"
                        defaultValue={product?.id}
                        className="hidden"
                    />
                    <div className="mt-4 flex w-full flex-row justify-end gap-2">
                        <Button
                            onClick={(e) => {
                                e.preventDefault();
                                setOpen(false);
                            }}
                            className="border-[1px] border-black bg-transparent text-black hover:bg-gray-50"
                        >
                            Close
                        </Button>
                        <Button type="submit">
                            {product ? "Update" : "Add"}
                        </Button>
                    </div>
                </form>
            </DialogContentWithoutX>
        </Dialog>
    );
};
