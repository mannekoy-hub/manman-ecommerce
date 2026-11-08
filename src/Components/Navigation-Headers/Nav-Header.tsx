import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
    const navigate = useNavigate();

    const [imgFailed, setImgFailed] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false); // profile dropdown
    const [mobileOpen, setMobileOpen] = useState(false); // hamburger panel
    const navRef = useRef<HTMLElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    const isLoggedIn = !!localStorage.getItem("token");
    const user = isLoggedIn ? getStoredUser() : null;
    const picture = user?.picture;

    // Close menus when clicking outside or pressing Escape
    useEffect(() => {
        if (!menuOpen && !mobileOpen) return;

        const handleClickOutside = (e: MouseEvent) => {
            const target = e.target as Node;
            if (menuOpen && menuRef.current && !menuRef.current.contains(target)) {
                setMenuOpen(false);
            }
            if (mobileOpen && navRef.current && !navRef.current.contains(target)) {
                setMobileOpen(false);
            }
        };
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setMenuOpen(false);
                setMobileOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleEscape);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleEscape);
        };
    }, [menuOpen, mobileOpen]);

    const closeMobile = () => setMobileOpen(false);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setMenuOpen(false);
        setMobileOpen(false);
        setImgFailed(false);
        navigate("/login");
    };

    return (
        <>
            <nav ref={navRef} className="relative w-full border-b-2 border-blue-600 bg-white">
                {/* Decorative angled shapes (inspired by the flyer) */}
                <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
                    <div className="absolute top-0 right-8 h-full w-2 -skew-x-12 bg-sky-300 lg:right-28 lg:w-10" />
                    <div className="absolute top-0 right-5 h-full w-2 -skew-x-12 bg-blue-600 lg:right-14 lg:w-10" />
                    <div className="absolute top-0 -right-3 h-full w-7 -skew-x-12 bg-[#001845] lg:-right-4 lg:w-24" />
                </div>

                <div className="relative z-50 flex w-full items-center justify-between gap-3 px-4 pr-14 py-2 sm:px-6 sm:pr-16 lg:pr-48">
                    {/* Brand */}
                    <div className="flex min-w-0 items-center gap-2">
                        <img src={logoblue} alt="" className="h-10 w-10 shrink-0 object-contain" />
                        <h1 className="truncate text-base font-black uppercase tracking-wider text-blue-600 sm:text-lg">
                            EZShopping
                        </h1>
                    </div>

                    {/* Right side: desktop links, profile, hamburger */}
                    <div className="flex shrink-0 items-center gap-2 lg:gap-4">
                        {/* Navigation links (desktop) */}
                        <div className="hidden items-center gap-4 lg:flex">
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

                        {/* Profile picture + logout menu (only when logged in) */}
                        {isLoggedIn && (
                            <div ref={menuRef} className="relative">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setMenuOpen((open) => !open);
                                        setMobileOpen(false);
                                    }}
                                    aria-haspopup="menu"
                                    aria-expanded={menuOpen}
                                    aria-label="Profile menu"
                                    title={user?.username || "Profile"}
                                    className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-full border-2 border-blue-600 bg-sky-50 text-[#001845] transition hover:border-[#001845] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
                                >
                                    {picture && !imgFailed ? (
                                        <img
                                            src={picture}
                                            alt=""
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
                                            aria-hidden="true"
                                        >
                                            <circle cx="12" cy="8" r="4" />
                                            <path d="M4 21c0-3.9 3.6-6 8-6s8 2.1 8 6" />
                                        </svg>
                                    )}
                                </button>

                                {menuOpen && (
                                    <div
                                        role="menu"
                                        className="absolute right-0 top-full z-50 mt-2 w-44 overflow-hidden rounded-xl border border-sky-100 bg-white shadow-[0_8px_24px_rgba(0,24,69,0.25)]"
                                    >
                                        {user?.username && (
                                            <p className="truncate border-b border-sky-100 px-4 py-2 text-xs font-bold text-[#001845]/60">
                                                {user.username}
                                            </p>
                                        )}
                                        <button
                                            type="button"
                                            role="menuitem"
                                            onClick={handleLogout}
                                            className="w-full cursor-pointer px-4 py-2.5 text-left text-sm font-extrabold uppercase tracking-wide text-[#001845] transition hover:bg-blue-600 hover:text-white focus:outline-none focus-visible:bg-blue-600 focus-visible:text-white"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Hamburger button (mobile / tablet) */}
                        <button
                            type="button"
                            onClick={() => {
                                setMobileOpen((open) => !open);
                                setMenuOpen(false);
                            }}
                            aria-expanded={mobileOpen}
                            aria-controls="mobile-menu"
                            aria-label={mobileOpen ? "Close menu" : "Open menu"}
                            className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full border-2 border-blue-600 text-[#001845] transition hover:bg-blue-600 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 lg:hidden"
                        >
                            <svg
                                className="h-5 w-5"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                aria-hidden="true"
                            >
                                {mobileOpen ? (
                                    <path d="M6 6l12 12M18 6L6 18" />
                                ) : (
                                    <path d="M4 7h16M4 12h16M4 17h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Navigation links (mobile / tablet panel) */}
                {mobileOpen && (
                    <div
                        id="mobile-menu"
                        className="relative z-50 flex flex-col gap-2 border-t border-sky-100 bg-white px-4 pb-4 pt-3 sm:px-6 lg:hidden"
                    >
                        <Link
                            to="/"
                            onClick={closeMobile}
                            className="rounded-xl px-4 py-3 text-sm font-extrabold uppercase tracking-wide text-[#001845] transition hover:bg-blue-600 hover:text-white"
                        >
                            Home
                        </Link>
                        <Link
                            to="/category"
                            onClick={closeMobile}
                            className="rounded-xl px-4 py-3 text-sm font-extrabold uppercase tracking-wide text-[#001845] transition hover:bg-blue-600 hover:text-white"
                        >
                            Categories
                        </Link>
                        <Link
                            to="/login"
                            onClick={closeMobile}
                            className="rounded-xl bg-[#001845] px-4 py-3 text-center text-sm font-extrabold uppercase tracking-wide text-white transition hover:bg-blue-600"
                        >
                            Login
                        </Link>
                    </div>
                )}
            </nav>
        </>
    );
}