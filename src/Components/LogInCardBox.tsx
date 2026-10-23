import type { ReactNode } from "react";

interface FieldProps {
    id: string;
    label: string;
    type: "email" | "password";
    placeholder: string;
    autoComplete: string;
    icon: ReactNode;
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

function GoogleIcon() {
    return (
        <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09a6.6 6.6 0 0 1 0-4.18V7.07H2.18a11 11 0 0 0 0 9.86l3.66-2.84z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
        </svg>
    );
}

function Field({ id, label, type, placeholder, autoComplete, icon }: FieldProps) {
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
                    className="w-full rounded-xl border border-transparent bg-sky-50 py-3 pl-12 pr-4 text-sm font-semibold text-[#001845] outline-none transition duration-200 placeholder:font-medium placeholder:text-[#001845]/40 focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-600/30"
                />
            </div>
        </div>
    );
}

export function Logincard() {
    return (
        <div className="mx-auto mt-5 flex w-full max-w-3xl overflow-hidden rounded-3xl border border-sky-100 bg-white shadow-[0_4px_20px_rgba(0,24,69,0.50)]">
            <div className="flex-1 p-8 sm:p-10">
                <h2 className="text-2xl font-black text-[#001845]">
                    Log in to your account
                </h2>
                <p className="mt-1 text-sm font-medium text-[#001845]/60">
                    Welcome back! Please enter your details.
                </p>

                <form
                    onSubmit={(event) => event.preventDefault()}
                    className="mt-8 flex flex-col gap-5"
                >
                    <Field
                        id="login-email"
                        label="Email address"
                        type="email"
                        placeholder="Enter your email"
                        autoComplete="email"
                        icon={<MailIcon />}
                    />

                    <div className="flex flex-col gap-2">
                        <Field
                            id="login-password"
                            label="Password"
                            type="password"
                            placeholder="Enter your password"
                            autoComplete="current-password"
                            icon={<LockIcon />}
                        />
                        <a
                            href="#"
                            className="self-end text-xs font-bold text-blue-600 hover:underline"
                        >
                            Forgot your password?
                        </a>
                    </div>

                    <button
                        type="submit"
                        className="w-full cursor-pointer rounded-xl bg-[#001845] py-3 text-sm font-bold text-white transition duration-200 hover:bg-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 active:scale-[0.98]"
                    >
                        Log in
                    </button>

                    <div className="flex items-center gap-3 text-xs font-semibold text-[#001845]/50">
                        <span className="h-px flex-1 bg-[#001845]/15" />
                        or
                        <span className="h-px flex-1 bg-[#001845]/15" />
                    </div>

                    <button
                        type="button"
                        className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-xl border border-gray-300 bg-white py-3 text-sm font-bold text-[#001845] transition duration-200 hover:border-[#001845] hover:bg-sky-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 active:scale-[0.98]"
                    >
                        <GoogleIcon />
                        Continue with Google
                    </button>
                </form>

                <p className="mt-6 text-center text-xs font-semibold text-[#001845]">
                    Don&apos;t have an account?{" "}
                    <a href="#" className="font-bold text-blue-600 hover:underline">
                        Sign up
                    </a>
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