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

const styles = {
  page: "flex min-h-screen items-start justify-center bg-white px-4 pb-4 pt-4 font-['Inter',system-ui,sans-serif] text-[#001a4d] sm:items-center sm:p-6",
  card: "grid h-auto w-full max-w-[900px] grid-cols-1 overflow-hidden rounded-md bg-white shadow-[0_20px_50px_rgba(0,26,77,0.50)] sm:rounded-[28px] md:grid-cols-[minmax(0,1fr)_320px]",
  formSide: "min-w-0 px-4 py-6 sm:px-[52px] sm:py-8",

  title: "text-2xl font-extrabold leading-[1.15] tracking-tight sm:text-[1.75rem]",
  subtitle: "mt-1 font-medium text-slate-500",

  form: "mt-4 flex flex-col gap-2.5",
  field: "flex flex-col gap-1",
  label: "text-sm font-bold",
  control:
    "flex h-11 min-w-0 items-center gap-2 rounded-[14px] bg-[#eff8ff] px-3 text-slate-500 shadow-[0_8px_20px_rgba(0,26,77,0.16),0_2px_5px_rgba(0,26,77,0.1)] transition-shadow focus-within:shadow-[0_0_0_2px_#1a5cff,0_8px_22px_rgba(26,92,255,0.22)] motion-reduce:transition-none sm:gap-3.5 sm:px-5",
  input:
    "h-full min-w-0 flex-1 bg-transparent text-sm font-medium text-[#001a4d] outline-none placeholder:text-xs placeholder:text-slate-400 sm:text-base sm:placeholder:text-sm",

  error: "text-sm font-semibold text-red-600",

  button:
    "flex w-full items-center justify-center rounded-xl font-bold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1a5cff] motion-reduce:transition-none",
  buttonPrimary:
    "mt-1 h-12 bg-[#001a4d] text-white hover:bg-[#05296b] disabled:cursor-not-allowed disabled:opacity-60",

  divider: "my-2 flex items-center gap-4 text-sm font-semibold text-slate-500",
  dividerLine: "h-px flex-1 bg-[#d5dbe5]",
  footer: "mt-3 text-center text-sm font-semibold",
  link: "font-bold text-[#1a5cff] hover:underline",

  panel: "relative hidden bg-[#1a5cff] md:block",
  art: "absolute inset-0 h-full w-full",
  pill: "absolute left-[25px] top-[25px] rounded-full bg-white px-[21px] py-2.5 font-extrabold",
} as const;

/*  Icons     */

function Icon({ children }: { children: ReactNode }) {
  return (
    <svg
      className="shrink-0"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  );
}

const UserIcon = (
  <Icon>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21c0-3.9 3.6-6 8-6s8 2.1 8 6" />
  </Icon>
);

const MailIcon = (
  <Icon>
    <rect x="3" y="5" width="18" height="14" rx="2.5" />
    <path d="m3.5 7.5 8.5 6 8.5-6" />
  </Icon>
);

const LockIcon = (
  <Icon>
    <rect x="5" y="11" width="14" height="10" rx="2.5" />
    <path d="M8 11V8a4 4 0 0 1 8 0v3" />
  </Icon>
);

/** Decorative chevron artwork for the right-hand panel. */
function PanelArt() {
  return (
    <svg
      className={styles.art}
      viewBox="0 0 320 708"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      <polygon points="300,0 320,0 320,708 300,708 -54,354" fill="#7dd3fc" />
      <polygon points="27,354 320,61 320,647" fill="#3b82f6" />
      <polygon points="107,354 320,141 320,567" fill="#001a4d" />
    </svg>
  );
}

/*  Fields                                                                    */

type FieldName = "username" | "email" | "password" | "confirmPassword";

interface FieldConfig {
  id: string;
  name: FieldName; // key used in state and sent to the API
  label: string;
  type: "text" | "email" | "password";
  placeholder: string;
  autoComplete: string;
  icon: ReactNode;
}

const FIELDS: FieldConfig[] = [
  {
    id: "register-username",
    name: "username",
    label: "Username",
    type: "text",
    placeholder: "Enter your username",
    autoComplete: "username",
    icon: UserIcon,
  },
  {
    id: "register-email",
    name: "email",
    label: "Email address",
    type: "email",
    placeholder: "Enter your email",
    autoComplete: "email",
    icon: MailIcon,
  },
  {
    id: "register-password",
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "Create a password",
    autoComplete: "new-password",
    icon: LockIcon,
  },
  {
    id: "register-confirm-password",
    name: "confirmPassword",
    label: "Confirm password",
    type: "password",
    placeholder: "Re-enter your password",
    autoComplete: "new-password",
    icon: LockIcon,
  },
];

/*  Component                                                                 */

export function Registercard() {
  const navigate = useNavigate();

  const [values, setValues] = useState<Record<FieldName, string>>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
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

  const handleChange = (name: FieldName, value: string) =>
    setValues((prev) => ({ ...prev, [name]: value }));

  // Email + password sign up  ->  POST /auth/register
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const { username, email, password, confirmPassword } = values;

    if (!/^[a-zA-Z0-9_]{3,20}$/.test(username.trim())) {
      setError("Username must be 3-20 characters: letters, numbers, or underscores");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      // handleSubmit
      const res = await axios.post(`${API}/auth/register`, {
        username,
        email,
        password,
        confirmPassword,
      });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));   // add this
      navigate("/");
    } catch (err) {
      setError(getError(err));
    } finally {
      setLoading(false);
    }
  };

  // Google sign up  ->  POST /auth/google
  const handleGoogle = async (credential: string) => {
    setError("");

    try {
      // handleGoogle
      const res = await axios.post(`${API}/auth/google`, { credential });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));   // add this
      navigate("/");
    } catch (err) {
      setError(getError(err));
    }
  };

  return (
    <main className={styles.page}>
      <div className={styles.card}>
        <section className={styles.formSide}>
          <header>
            <h1 className={styles.title}>Create your account</h1>
            <p className={styles.subtitle}>Welcome! Please enter your details.</p>
          </header>

          <form className={styles.form} onSubmit={handleSubmit}>
            {FIELDS.map((field) => (
              <div className={styles.field} key={field.id}>
                <label className={styles.label} htmlFor={field.id}>
                  {field.label}
                </label>
                <div className={styles.control}>
                  {field.icon}
                  <input
                    id={field.id}
                    className={styles.input}
                    type={field.type}
                    placeholder={field.placeholder}
                    autoComplete={field.autoComplete}
                    value={values[field.name]}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    required
                  />
                </div>
              </div>
            ))}

            {error && (
              <p role="alert" className={styles.error}>
                {error}
              </p>
            )}

            <button
              className={`${styles.button} ${styles.buttonPrimary}`}
              type="submit"
              disabled={loading}
            >
              {loading ? "Signing up..." : "Sign up"}
            </button>
          </form>

          <div className={styles.divider} role="separator">
            <span className={styles.dividerLine} />
            <span>or</span>
            <span className={styles.dividerLine} />
          </div>

          <div ref={googleWrapRef} className="flex min-h-10 justify-center">
            {googleWidth > 0 && (
              <GoogleLogin
                onSuccess={(res) => res.credential && handleGoogle(res.credential)}
                onError={() => setError("Google sign-in failed")}
                text="continue_with"
                width={String(googleWidth)}
              />
            )}
          </div>

          <p className={styles.footer}>
            Already have an account?{" "}
            <Link className={styles.link} to="/login">
              Log in
            </Link>
          </p>
        </section>

        <aside className={styles.panel}>
          <PanelArt />
          <span className={styles.pill}>Welcome</span>
        </aside>
      </div>
    </main>
  );
}