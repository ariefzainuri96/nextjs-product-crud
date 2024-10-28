import { Suspense } from "react";
import { ProductSections } from "./(sections)/product-section";
import ErrorBoundary from "@/components/error-boundary";
import { AddProductDialog } from "./(components)/add-product-dialog";
import { PlusIcon } from "lucide-react";
import { ProductSkeleton } from "./(components)/product-item-skeleton";

type SearchParamProps = {
    searchParams: Record<string, string> | null | undefined;
};

export default async function Home({ searchParams }: SearchParamProps) {
    return (
        <div className="h-full w-full">
            {/* stack */}
            <div className="relative h-full w-full">
                {/* index 0 */}
                <div className="relative z-0 h-full w-full overflow-hidden">
                    <div className="h-full w-full overflow-y-auto">
                        <div className="flex flex-col items-start p-4">
                            <ErrorBoundary>
                                <Suspense fallback={<ProductSkeleton />}>
                                    <ProductSections />
                                </Suspense>
                            </ErrorBoundary>
                        </div>
                    </div>
                </div>
                {/* index 1 */}
                <AddProductDialog>
                    <div className="absolute bottom-4 right-4 z-10 cursor-pointer rounded-full bg-black p-3">
                        <PlusIcon className="size-6 text-white" />
                    </div>
                </AddProductDialog>
            </div>
        </div>
    );
}
