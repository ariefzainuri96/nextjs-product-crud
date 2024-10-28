"use server";

import { decrypt } from "@/auth_lib";
import { revalidatePath } from "next/cache";
import { isRedirectError } from "next/dist/client/components/redirect";
import { cookies } from "next/headers";
import { ProductTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { db } from "@/db/db";
import { delay } from "@/helper";

export type TProduct = typeof ProductTable.$inferSelect;

export async function getAllProducts(isGetAllProducts: boolean = true) {
    try {
        var products: TProduct[] = [];

        await delay(1500);

        if (isGetAllProducts) {
            products = await db.select().from(ProductTable);
        } else {
            console.log("get user products");

            const currentUser = cookies().get("currentUser")?.value;

            if (!currentUser) throw new Error("Not logged in");

            const dataCookies = await decrypt(currentUser);

            products = await db
                .select()
                .from(ProductTable)
                .where(eq(ProductTable.userId, dataCookies.userId));
        }

        return products;
    } catch (error) {
        throw new Error("Error fetching products");
    }
}

export async function handleUpdateOrAdd(prevState: any, formData: FormData) {
    const currentUser = cookies().get("currentUser")?.value;

    if (!currentUser) return { status: 401 };

    try {
        const dataCookies = await decrypt(currentUser);
        const id = formData.get("productId");

        if (id) {
            await db
                .update(ProductTable)
                .set({
                    name: formData.get("name")?.toString() ?? "",
                    price: formData.get("price")?.toString() ?? "0",
                    quantity: Number(
                        formData.get("quantity")?.toString() ?? "0",
                    ),
                })
                .where(eq(ProductTable.id, id.toString() ?? ""));
        } else {
            const product: typeof ProductTable.$inferInsert = {
                name: formData.get("name")?.toString() ?? "",
                price: formData.get("price")?.toString() ?? "0",
                quantity: Number(formData.get("quantity")?.toString() ?? "0"),
                userId: dataCookies.userId,
            };

            await db.insert(ProductTable).values(product);
        }

        return { message: `Product ${id ? "updated" : "added"}`, status: 200 };
    } catch (error) {
        console.log(error);
        if (isRedirectError(error)) throw error;
        return { message: `${error}`, status: 400 };
    } finally {
        revalidatePath("/");
    }
}

export async function deleteProduct(productId: string) {
    const currentUser = cookies().get("currentUser")?.value;

    if (!currentUser) return { status: 401 };

    try {
        await db.delete(ProductTable).where(eq(ProductTable.id, productId));
    } catch (error) {
        console.log(error);
    } finally {
        revalidatePath("/");
    }
}
