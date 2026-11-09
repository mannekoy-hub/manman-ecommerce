import { useLayoutEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

const API = import.meta.env.VITE_API_URL;

// Pulls the server's message out of an axios error
const getError = (err: unknown) =>
    axios.isAxiosError(err)
        ? err.response?.data?.message || err.response?.data?.error || "Something went wrong"
        : "Something went wrong";

interface FieldProps {
    id: string;
    label: string;
    type: "email" | "password" | "text";
    placeholder: string;
    autoComplete: string;
    icon: ReactNode;
    value: string;
    onChange: (value: string) => void;
}

const iconProps = {
    className: "h-5 w-5",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
} as const;

function MailIcon() {
    return (
        <svg {...iconProps}>
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <path d="m3 7 9 6 9-6" />
        </svg>
    );
}

function LockIcon() {
    return (
        <svg {...iconProps}>
            <rect x="4" y="11" width="16" height="10" rx="2" />
            <path d="M8 11V7a4 4 0 0 1 8 0v4" />
        </svg>
    );
}

function Field({
    id,
    label,
    type,
    placeholder,
    autoComplete,
    icon,
    value,
    onChange,
}: FieldProps) {
    return (
        <div className="flex flex-col gap-2">
            <label htmlFor={id} className="text-sm font-bold text-[#001845]">
                {label}
            </label>
            <div className="relative flex items-center">
                <span className="pointer-events-none absolute left-4 text-[#001845]/60">
                    {icon}
                </span>
                <input
                    id={id}
                    type={type}
                    placeholder={placeholder}
                    autoComplete={autoComplete}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    required
                    className="w-full rounded-xl border border-transparent bg-sky-50 py-3 pl-12 pr-4 text-sm font-semibold text-[#001845] outline-none transition duration-200 placeholder:font-medium placeholder:text-[#001845]/40 focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-600/30 shadow-[0_4px_20px_rgba(0,24,69,0.50)]"
                />
            </div>
        </div>
    );
}

export function Logincard() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    // Google's button needs a pixel width, so measure the space it has
    // (min 200 / max 400 are Google's own limits) and follow screen resizes.
    const googleWrapRef = useRef<HTMLDivElement>(null);
    const [googleWidth, setGoogleWidth] = useState(0);

    useLayoutEffect(() => {
        const el = googleWrapRef.current;
        if (!el) return;

        const update = () => {
            const w = Math.floor(el.clientWidth);
            if (w > 0) setGoogleWidth(Math.max(200, Math.min(w, 320)));
        };

        update();
        const observer = new ResizeObserver(update);
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    // Email + password login  ->  POST /auth/login
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            setLoading(true);
            // in handleSubmit
            const res = await axios.post(`${API}/auth/login`, { email, password });
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));
            navigate("/");//send back to home page
        } catch (err) {
            setError(getError(err));
        } finally {
            setLoading(false);
        }
    };

    // Google login  ->  POST /auth/google
    const handleGoogle = async (credential: string) => {
        setError("");

        try {
            //  handleGoogle
            const res = await axios.post(`${API}/auth/google`, { credential });
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));
            navigate("/");// send back to home page
        } catch (err) {
            setError(getError(err));
        }
    };

    return (
        <div className="mx-auto mt-5 flex w-[calc(100%-2rem)] max-w-3xl overflow-hidden rounded-3xl border border-sky-100 bg-white shadow-[0_4px_20px_rgba(0,24,69,0.40)] sm:w-[calc(100%-3rem)]">
            <div className="min-w-0 flex-1 p-6 sm:p-10">
                <h2 className="text-2xl font-black text-[#001845]">
                    Log in to your account
                </h2>
                <p className="mt-1 text-sm font-medium text-[#001845]/60">
                    Welcome! Please enter your details.
                </p>

                <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
                    <Field
                        id="login-email"
                        label="Email address"
                        type="email"
                        placeholder="Enter your email"
                        autoComplete="email"
                        icon={<MailIcon />}
                        value={email}
                        onChange={setEmail}
                    />

                    <div className="flex flex-col gap-2">
                        <Field
                            id="login-password"
                            label="Password"
                            type="password"
                            placeholder="Enter your password"
                            autoComplete="current-password"
                            icon={<LockIcon />}
                            value={password}
                            onChange={setPassword}
                        />
                        <a
                            href="#"
                            className="self-end text-xs font-bold text-blue-600 hover:underline"
                        >
                            Forgot your password?
                        </a>
                    </div>

                    {error && (
                        <p role="alert" className="text-sm font-semibold text-red-600">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full cursor-pointer rounded-xl bg-[#001845] py-3 text-sm font-bold text-white transition duration-200 hover:bg-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {loading ? "Logging in..." : "Log in"}
                    </button>

                    <div className="flex items-center gap-3 text-xs font-semibold text-[#001845]/50">
                        <span className="h-px flex-1 bg-[#001845]/15" />
                        or
                        <span className="h-px flex-1 bg-[#001845]/15" />
                    </div>

                    <div ref={googleWrapRef} className="flex min-h-10 justify-center">
                        {googleWidth > 0 && (
                            <GoogleLogin
                                onSuccess={(res) =>
                                    res.credential && handleGoogle(res.credential)
                                }
                                onError={() => setError("Google sign-in failed")}
                                text="continue_with"
                                width={String(googleWidth)}
                            />
                        )}
                    </div>
                </form>

                <p className="mt-6 text-center text-xs font-semibold text-[#001845]">
                    Don&apos;t have an account?{" "}
                    <Link to="/register" className="font-bold text-blue-600 hover:underline">
                        Sign up
                    </Link>
                </p>
            </div>

            <div
                aria-hidden="true"
                className="relative hidden w-64 shrink-0 bg-blue-600 md:block"
            >
                <svg
                    className="absolute inset-0 h-full w-full"
                    viewBox="0 0 240 600"
                    preserveAspectRatio="xMaxYMid slice"
                >
                    <polygon points="-40,300 240,20 240,580" fill="#7dd3fc" />
                    <polygon points="20,300 240,80 240,520" fill="#3b82f6" />
                    <polygon points="80,300 240,140 240,460" fill="#001845" />
                </svg>
                <span className="absolute left-5 top-5 rounded-full bg-white px-4 py-1.5 text-sm font-black text-[#001845]">
                    Welcome
                </span>
            </div>
        </div>
    );
}