"use server";

import { decrypt } from "@/auth_lib";
import { revalidatePath } from "next/cache";
import { isRedirectError } from "next/dist/client/components/redirect";
import { cookies } from "next/headers";
import { RedirectType, redirect } from "next/navigation";
import { ProductTable } from "@/db/schema";
import { db } from "@/db";
import { eq } from "drizzle-orm";

export type TProduct = typeof ProductTable.$inferSelect;

export async function handleUpdateOrAdd(prevState: any, formData: FormData) {
    const currentUser = cookies().get("currentUser")?.value;

    if (!currentUser) return { status: 401 };

    try {
        const dataCookies = await decrypt(currentUser);
        const id = formData.get("product_id");

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

// export async function deleteProduct(
//     prevState: any,
//     formData: FormData,
// ) {
//     const currentUser = cookies().get("currentUser")?.value;

//     if (!currentUser) return { status: 401 };

//     try {
//         const dataCookies = await decrypt(currentUser);
//         const id = formData.get('product_id')

//         await fetch(`${BASE_URL}/api/products${id && `/${id}`}`, {
//             headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${dataCookies.token}`,
//             },
//             method: "DELETE",
//         });

//         revalidatePath('/')
//         redirect('/', RedirectType.replace)
//     } catch (error) {
//         console.log(error);
//         if (isRedirectError(error)) throw error
//         return { message: `${error}` };
//     }
// }
