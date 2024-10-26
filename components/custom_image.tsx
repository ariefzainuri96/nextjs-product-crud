"use client";

import IcTrash from "@/public/icons/ic_trash.svg";
import IcPlus from "@/public/icons/ic_plus.svg";
import IcEdit from "@/public/icons/ic_edit.svg";
import IcClose from "@/public/icons/ic_close.svg";

type CustomImageType = {
    path: string;
    stroke?: string;
    fill?: string;
    width?: number;
    height?: number;
    size?: number;
};

export const CustomImage = ({
    path,
    stroke,
    fill,
    width = 20,
    height = 20,
    size,
}: CustomImageType) => {
    if (path === "/ic_trash.svg")
        return (
            <IcTrash
                fill={fill ?? "transparent"}
                stroke={stroke ?? "transparent"}
                width={width}
                height={height}
            />
        );
    else if (path === "/ic_plus.svg")
        return (
            <IcPlus
                fill={fill ?? "transparent"}
                stroke={stroke ?? "transparent"}
                width={width}
                height={height}
            />
        );
    else if (path === "/ic_edit.svg")
        return (
            <IcEdit
                fill={fill ?? "transparent"}
                stroke={stroke ?? "transparent"}
                width={width}
                height={height}
            />
        );
    else if (path === "/ic_close.svg")
        return (
            <IcClose
                fill={fill ?? "transparent"}
                stroke={stroke ?? "transparent"}
                width={width}
                height={height}
            />
        );
    else
        return (
            <div
                className={`bg-gray-50 w-[${width ?? size ?? 20}px] h-[${height ?? size ?? 20}px]`}
            />
        );
};
