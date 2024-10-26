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
                            <span>Test</span>
                            <span>Test</span>
                            <div className="mt-2 size-96 bg-blue-200" />
                            <div className="mt-2 size-96 bg-blue-200" />
                            <div className="mt-2 size-96 bg-blue-200" />
                            <span>Test 2</span>
                        </div>
                    </div>
                </div>
                {/* index 1 */}
                <div className="absolute bottom-4 right-4 z-10 size-4 rounded-full bg-black"></div>
            </div>
        </div>
    );
}
