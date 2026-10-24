
import type { ReactNode } from "react";

const styles = {
  page: "flex min-h-screen items-start justify-center bg-white px-0 pt-4 font-['Inter',system-ui,sans-serif] text-[#001a4d] sm:items-center sm:p-6",
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

  button:
    "flex w-full items-center justify-center rounded-xl font-bold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1a5cff] motion-reduce:transition-none",
  buttonPrimary: "mt-1 h-12 bg-[#001a4d] text-white hover:bg-[#05296b]",
  buttonGoogle:
    "h-11 gap-3 border border-[#d5dbe5] bg-white text-[#001a4d] hover:bg-slate-50",

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

function GoogleIcon() {
  return (
    <svg viewBox="0 0 48 48" width="24" height="24" aria-hidden="true" focusable="false">
      <path
        fill="#EA4335"
        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
      />
      <path
        fill="#4285F4"
        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
      />
      <path
        fill="#FBBC05"
        d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
      />
      <path
        fill="#34A853"
        d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
      />
    </svg>
  );
}

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


interface FieldConfig {
  id: string;
  label: string;
  type: "text" | "email" | "password";
  placeholder: string;
  icon: ReactNode;
}

const FIELDS: FieldConfig[] = [
  {
    id: "register-full-name",
    label: "Full name",
    type: "text",
    placeholder: "Enter your full name",
    icon: UserIcon,
  },
  {
    id: "register-email",
    label: "Email address",
    type: "email",
    placeholder: "Enter your email",
    icon: MailIcon,
  },
  {
    id: "register-password",
    label: "Password",
    type: "password",
    placeholder: "Create a password",
    icon: LockIcon,
  },
  {
    id: "register-confirm-password",
    label: "Confirm password",
    type: "password",
    placeholder: "Re-enter your password",
    icon: LockIcon,
  },
];


/*  Component                                                                 */


export function Registercard() {
  return (
    <main className={styles.page}>
      <div className={styles.card}>
        <section className={styles.formSide}>
          <header>
            <h1 className={styles.title}>Create your account</h1>
            <p className={styles.subtitle}>Welcome! Please enter your details.</p>
          </header>

          <form className={styles.form}>
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
                  />
                </div>
              </div>
            ))}

            <button
              className={`${styles.button} ${styles.buttonPrimary}`}
              type="submit"
            >
              Sign up
            </button>
          </form>

          <div className={styles.divider} role="separator">
            <span className={styles.dividerLine} />
            <span>or</span>
            <span className={styles.dividerLine} />
          </div>

          <button
            className={`${styles.button} ${styles.buttonGoogle}`}
            type="button"
          >
            <GoogleIcon />
            Continue with Google
          </button>

          <p className={styles.footer}>
            Already have an account?{" "}
            <a className={styles.link} href="/login">
              Log in
            </a>
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