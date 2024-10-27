import { relations } from "drizzle-orm";
import {
    integer,
    pgTable,
    primaryKey,
    uuid,
    varchar,
} from "drizzle-orm/pg-core";

export const UserTable = pgTable("user", {
    id: uuid("id").primaryKey().defaultRandom(),
    email: varchar("email", { length: 255 }).unique().notNull(),
    password: varchar("password", { length: 255 }).notNull(),
});

export const ProductTable = pgTable("product", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: varchar("name", { length: 255 }).notNull(),
    price: varchar("price", { length: 255 }).notNull(),
    quantity: integer("quantity").notNull(),
    userId: uuid("userId")
        .references(() => UserTable.id)
        .notNull(),
});

export const CategoryTable = pgTable("category", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: varchar("name", { length: 255 }).notNull(),
});

export const ProductCategoryTable = pgTable(
    "productCategory",
    {
        productId: uuid("productId")
            .references(() => ProductTable.id)
            .notNull(),
        categoryId: uuid("categoryId")
            .references(() => CategoryTable.id)
            .notNull(),
    },
    (table) => {
        return {
            pk: primaryKey({ columns: [table.productId, table.categoryId] }),
        };
    },
);

// RELATIONS

export const UserTableRelations = relations(UserTable, ({ many }) => {
    return {
        products: many(ProductTable),
    };
});

export const schema = {
    user: UserTable,
    product: ProductTable,
    category: CategoryTable,
    productCategory: ProductCategoryTable,
};
