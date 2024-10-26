import { integer, numeric, pgTable, uuid, varchar } from "drizzle-orm/pg-core";

export const UserTable = pgTable("user", {
    id: uuid("id").primaryKey().defaultRandom(),
    email: varchar("email", { length: 255 }).unique().notNull(),
    password: varchar("password", { length: 255 }).notNull(),
});

export const ProductTable = pgTable("product", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: varchar("name", { length: 255 }).notNull(),
    price: numeric("price").notNull(),
    quantity: integer("quantity").notNull(),
    userId: uuid("userId")
        .references(() => UserTable.id)
        .notNull(),
});

export const schema = {
    user: UserTable,
    product: ProductTable,
};
