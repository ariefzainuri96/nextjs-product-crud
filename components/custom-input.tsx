import React, { ComponentPropsWithoutRef } from "react";
import { twMerge } from "tailwind-merge";

type CustomInputProps = {
    label: string;
    className?: string;
    errorMessage?: string;
} & ComponentPropsWithoutRef<"input">;

export const CustomInput = ({
    label,
    className,
    errorMessage,
    ...props
}: CustomInputProps) => {
    return (
        <div className={twMerge("flex flex-col items-start gap-2", className)}>
            {label && (
                <label
                    htmlFor={props.id}
                    className="text-sm font-normal text-gray-500"
                >
                    {label}
                </label>
            )}
            <input
                className="w-full rounded-lg border-[1px] border-slate-100 px-[14px] py-[10px] text-[1rem] outline-none"
                {...props}
            />
            {errorMessage && (
                <span className="mt-1 text-sm text-red-500">
                    {errorMessage}
                </span>
            )}
        </div>
    );
};
