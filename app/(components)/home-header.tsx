"use client";

import { logout } from "@/auth_lib";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { twMerge } from "tailwind-merge";

export const HomeHeader = () => {
    const pathname = usePathname();
    const router = useRouter();

    return (
        <nav className="fixed top-0 z-50 w-full bg-black px-4 shadow-lg">
            <div className="flex h-[3.5rem] w-full flex-row items-center">
                <span className="flex-1 text-lg text-white">Header</span>
                <Link
                    href={"/my-products"}
                    className={twMerge(
                        "rounded-md p-2 text-white hover:bg-[#ffffffcc]",
                        pathname === "/my-products" && "bg-[#ffffffcc]",
                    )}
                >
                    My Products
                </Link>
                <span
                    onClick={(e) => {
                        e.preventDefault();

                        logout();
                    }}
                    className="cursor-pointer rounded-md p-2 text-white hover:bg-[#ffffffcc]"
                >
                    Logout
                </span>
            </div>
        </nav>
    );
};
