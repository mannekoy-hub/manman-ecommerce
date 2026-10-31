import type { Product } from "../../data/product-data";

interface ProductcardProps {
    product: Product;
}

const buttonBase =
    "flex-1 cursor-pointer rounded-full px-4 py-2.5 text-sm font-bold transition duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 active:scale-95";

export function Productcard({ product }: ProductcardProps) {
    return (
        <div className="group relative flex flex-col overflow-hidden rounded-2xl border-y-4 border-blue-600 bg-white shadow-[0_4px_20px_rgba(0,24,69,0.50)] transition duration-300 hover:-translate-y-1 hover:shadow-xl">
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-sky-50 ">
                <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-contain transition duration-300"
                />

            </div>

            <div className="flex flex-1 flex-col  p-2">
                <p>
                    <span className="block text-base font-black text-[#001845]">
                        {product.name}
                    </span>
                </p>



                <div className="flex items-center justify-between gap-3">
                    <span className="flex items-center gap-1.5 text-sm font-semibold text-amber-500" aria-label={`Rated ${product.ratings} out of 5`}>
                        <span aria-hidden="true">★</span>
                        <span className="text-slate-700">{product.ratings} / 5</span>
                    </span>

                    <span className="inline-flex shrink-0 items-center whitespace-nowrap rounded-full px-2 py-2 text-sm font-extrabold text-black">
                        Php{product.price}
                    </span>
                </div>

                <div className="mt-auto flex gap-3">
                    <button
                        type="button"
                        className={`${buttonBase} border border-gray-300 bg-white text-[#001845] hover:border-[#001845] hover:bg-sky-50`}
                    >
                        Add to Cart
                    </button>
                    <button
                        type="button"
                        className={`${buttonBase} bg-[#001845] text-white hover:bg-blue-600`}
                    >
                        Buy Now
                    </button>
                </div>
            </div>
        </div>
    );
}