import { Link } from "react-router-dom";
import logoblue from "../assets/logo-blue.png";

export function Header() {
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

                    {/* Navigation links */}
                    <div className="flex items-center gap-2 md:gap-4">
                        <div>
                            <Link
                                to="/"
                                className="rounded-full px-4 py-2 text-sm font-extrabold uppercase tracking-wide text-[#001845] transition hover:bg-blue-600 hover:text-white"
                            >
                                Home
                            </Link>
                        </div>
                        <div>
                            <Link
                                to="/category"
                                className="rounded-full px-4 py-2 text-sm font-extrabold uppercase tracking-wide text-[#001845] transition hover:bg-blue-600 hover:text-white"
                            >
                                Categories
                            </Link>
                        </div>
                        <div>
                            <Link
                                to="/login"
                                className="rounded-full bg-[#001845] px-5 py-2 text-sm font-extrabold uppercase tracking-wide text-white transition hover:bg-blue-600"
                            >
                                Login
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}