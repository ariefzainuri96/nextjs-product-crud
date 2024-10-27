CREATE TABLE IF NOT EXISTS "category" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "productCategory" (
	"productId" uuid NOT NULL,
	"categoryId" uuid NOT NULL,
	CONSTRAINT "productCategory_productId_categoryId_pk" PRIMARY KEY("productId","categoryId")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "productCategory" ADD CONSTRAINT "productCategory_productId_product_id_fk" FOREIGN KEY ("productId") REFERENCES "public"."product"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "productCategory" ADD CONSTRAINT "productCategory_categoryId_category_id_fk" FOREIGN KEY ("categoryId") REFERENCES "public"."category"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
