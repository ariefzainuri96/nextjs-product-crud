"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import {
    isRedirectError,
    RedirectType,
} from "next/dist/client/components/redirect";
import { db } from "./db";
import { UserTable } from "./db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";

type TUser = typeof UserTable.$inferSelect;

const secretKey = process.env.SECRET_KEY;
const key = new TextEncoder().encode(secretKey);

export async function authenticate(prevState: any, formData: FormData) {
    try {
        const email = formData.get("email")?.toString() ?? "";
        const password = formData.get("password")?.toString() ?? "";

        const user = await db
            .select()
            .from(UserTable)
            .where(eq(UserTable.email, email));

        if (user.length === 0) {
            return { status: 401, message: "Invalid email or password" };
        }

        if (!bcrypt.compareSync(password, user[0].password)) {
            return { status: 401, message: "Invalid email or password" };
        }

        console.log(user[0]);

        await setCookies(email, user[0].id);
    } catch (error) {
        console.log(error);

        if (isRedirectError(error)) throw error;
        return { status: 401, message: `${error}` };
    } finally {
        redirect("/");
    }
}

export async function register(prevState: any, formData: FormData) {
    const email = formData.get("email")?.toString() ?? "";
    const password = formData.get("password")?.toString() ?? "";
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        await db.insert(UserTable).values({
            email: email,
            password: hashedPassword,
        });

        const user: TUser = (
            await db.select().from(UserTable).where(eq(UserTable.email, email))
        )[0];

        await setCookies(user.email, user.id);
    } catch (error) {
        console.log(error);

        if (isRedirectError(error)) throw error;

        return { status: 401, message: `${error}` };
    } finally {
        redirect("/");
    }
}

async function encrypt(payload: any, expires: Date) {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime(expires)
        .sign(key);
}

export async function decrypt(input: string): Promise<any> {
    const { payload } = await jwtVerify(input, key, {
        algorithms: ["HS256"],
    });
    return payload;
}

async function setCookies(email: string, userId: string) {
    const user = {
        email: email,
        userId: userId,
    };
    // 60000 millisecond => 1 minute
    const expires = new Date(Date.now() + 120 * 60000);
    const session = await encrypt(user, expires);
    cookies().set("currentUser", session, { expires, httpOnly: true }); // httpOnly true -> we can only get cookies in server side
}

export async function logout() {
    cookies().delete("currentUser");

    redirect("/login", RedirectType.replace);
}
