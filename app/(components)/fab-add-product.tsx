"use client";

import { CustomInput } from "@/components/custom-input";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContentWithoutX,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { PlusIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { handleUpdateOrAdd } from "../services";

export const FabAddProduct = () => {
    const [open, setOpen] = useState(false);
    const [response, dispatch] = useFormState(handleUpdateOrAdd, null);

    useEffect(() => {
        if (response?.status === 200) {
            setOpen(false);
        }
    }, [response]);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <div className="absolute bottom-4 right-4 z-10 cursor-pointer rounded-full bg-black p-3">
                    <PlusIcon className="size-6 text-white" />
                </div>
            </DialogTrigger>
            <DialogContentWithoutX className="rounded-md sm:max-w-[425px]">
                <DialogTitle>Add Product</DialogTitle>
                <form action={dispatch} className="flex flex-col items-start">
                    <CustomInput
                        label={"Product Name"}
                        id="name"
                        name="name"
                        className="w-full"
                        placeholder="ex: Shampoo"
                    />
                    <CustomInput
                        label={"Product Price"}
                        id="price"
                        name="price"
                        className="mt-2 w-full"
                        placeholder="ex: 1000"
                    />
                    <CustomInput
                        label={"Product Quantity"}
                        id="quantity"
                        name="quantity"
                        className="mt-2 w-full"
                        placeholder="ex: 1"
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
                        <Button type="submit">Add</Button>
                    </div>
                </form>
            </DialogContentWithoutX>
        </Dialog>
    );
};
