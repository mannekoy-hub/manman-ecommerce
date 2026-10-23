import type { Product } from "../../data/product-data";

interface ProductcardProps {
    product: Product;
}

export function Productcard({ product }: ProductcardProps) {
    return (
        <div className="group relative flex flex-col overflow-hidden rounded-2xl border-y-4 border-blue-600 bg-white shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl">
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-sky-50 ">
                <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                />

            </div>

            <div className="flex flex-1 flex-col gap-3 p-4">
                <p>
                    <span className="block text-xs font-extrabold uppercase tracking-widest text-blue-600">
                        Name:
                    </span>
                    <span className="block text-base font-black text-[#001845]">
                        {product.name}
                    </span>
                </p>

                <p>
                    <span className="mb-1 block text-xs font-extrabold uppercase tracking-widest text-blue-600">
                        Category:
                    </span>
                    <span className="inline-block rounded-full bg-sky-100 px-4 py-1 text-sm font-bold text-[#001845]">
                        {product.category}
                    </span>
                </p>

                <p>
                    <span className="block text-xs font-extrabold uppercase tracking-widest text-blue-600">
                        Description:
                    </span>
                    <span className="block text-sm leading-relaxed text-slate-600">
                        {product.description}
                    </span>
                </p>

                <p className="mt-auto inline-flex w-fit items-center gap-2 rounded-full bg-[#001845] px-5 py-2 text-sm font-extrabold text-white transition group-hover:bg-blue-600">
                    <span className="uppercase tracking-wide">Price:</span>
                    <span>{product.price}</span>
                </p>
            </div>
        </div>
    );
}