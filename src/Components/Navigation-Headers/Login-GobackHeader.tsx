import { Link } from "react-router-dom";
import logoblue from "../../assets/logo-blue.png";

export function Goback() {
    return (
        <>
            <nav className="relative w-full overflow-hidden border-b-2 border-blue-600 bg-white">
                {/* Decorative angled shapes (inspired by the flyer) */}
                <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden md:block">
                    <div className="absolute top-0 right-28 h-full w-10 -skew-x-12 bg-sky-300" />
                    <div className="absolute top-0 right-14 h-full w-10 -skew-x-12 bg-blue-600" />
                    <div className="absolute top-0 -right-4 h-full w-24 -skew-x-12 bg-[#001845]" />
                </div>

                <div className="relative z-10 flex w-full flex-wrap items-center justify-between gap-3 px-6 py-2 md:pr-48">
                    {/* Brand */}
                    <div className="flex items-center gap-2">
                        <img src={logoblue} alt="" className="h-10 w-10 object-contain" />
                        <h1 className="text-lg font-black uppercase tracking-wider text-blue-600">
                            EZShopping
                        </h1>
                    </div>

                    <Link
                        to="/"
                        className="Return flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-2 text-sm font-bold text-blue-700 transition hover:border-blue-600 hover:bg-blue-100"
                    >
                        <svg
                            aria-hidden="true"
                            viewBox="0 0 24 24"
                            className="h-4 w-4"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M15 18l-6-6 6-6" />
                        </svg>
                        Back
                    </Link>
                </div>
            </nav>
        </>
    );
}