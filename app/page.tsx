import { Suspense } from "react";
import { FabAddProduct } from "./(components)/fab-add-product";
import { ProductSections } from "./(sections)/product-section";
import ErrorBoundary from "@/components/error-boundary";

type SearchParamProps = {
    searchParams: Record<string, string> | null | undefined;
};

export default async function Home({ searchParams }: SearchParamProps) {
    return (
        <div className="h-full w-full bg-red-50">
            {/* stack */}
            <div className="relative h-full w-full">
                {/* index 0 */}
                <div className="relative z-0 h-full w-full overflow-hidden">
                    <div className="h-full w-full overflow-y-auto">
                        <div className="flex flex-col items-start px-4">
                            <ErrorBoundary>
                                <Suspense fallback={"Loading..."}>
                                    <ProductSections />
                                </Suspense>
                            </ErrorBoundary>
                        </div>
                    </div>
                </div>
                {/* index 1 */}
                <FabAddProduct />
            </div>
        </div>
    );
}
