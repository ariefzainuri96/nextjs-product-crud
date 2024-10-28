import ErrorBoundary from "@/components/error-boundary";
import { ProductSections } from "../(sections)/product-section";
import { Suspense } from "react";
import { ProductSkeleton } from "../(components)/product-item-skeleton";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "My Products",
    description: "My Products",
};

const MyProductsPage = () => {
    return (
        <div className="h-full w-full overflow-y-auto">
            <div className="flex flex-col items-start p-4">
                <ErrorBoundary>
                    <Suspense fallback={<ProductSkeleton />}>
                        <ProductSections openFrom="profile" />
                    </Suspense>
                </ErrorBoundary>
            </div>
        </div>
    );
};

export default MyProductsPage;
