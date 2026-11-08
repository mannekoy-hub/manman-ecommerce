import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logoblue from "../../assets/logo-blue.png";

// Reads the user saved at login/register (safe if missing or corrupted)
function getStoredUser(): { username?: string; picture?: string | null } | null {
    try {
        const raw = localStorage.getItem("user");
        return raw ? JSON.parse(raw) : null;
    } catch {
        return null;
    }
}

export function Header() {
    // Subscribing to the location makes the Header re-render after every
    // navigation, so it picks up the new login state after navigate("/").
    useLocation();

    const [imgFailed, setImgFailed] = useState(false);

    const isLoggedIn = !!localStorage.getItem("token");
    const user = isLoggedIn ? getStoredUser() : null;
    const picture = user?.picture;

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

                        {/* Profile picture (only when logged in) */}
                        {isLoggedIn && (
                            <div
                                title={user?.username || "Profile"}
                                className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-blue-600 bg-sky-50 text-[#001845]"
                            >
                                {picture && !imgFailed ? (
                                    <img
                                        src={picture}
                                        alt="Profile"
                                        referrerPolicy="no-referrer"
                                        onError={() => setImgFailed(true)}
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <svg
                                        className="h-6 w-6"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        aria-label="Profile"
                                        role="img"
                                    >
                                        <circle cx="12" cy="8" r="4" />
                                        <path d="M4 21c0-3.9 3.6-6 8-6s8 2.1 8 6" />
                                    </svg>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </nav>
        </>
    );
}