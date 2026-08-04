import type { Metadata } from "next";
import { LoginForm } from "@/components/admin/login-form";
import { Brand } from "@/components/site/brand";

export const metadata: Metadata = {
  title: "כניסה לניהול",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <main className="grid flex-1 place-items-center px-5 py-16">
      <div className="grid-bg pointer-events-none fixed inset-0 opacity-60" />

      <div className="relative w-full max-w-sm">
        <div className="text-center">
          <Brand />
        </div>

        <div className="mt-6 rounded-2xl border border-line bg-surface p-7">
          <h1 className="text-xl font-black">ניהול האתר</h1>
          <p className="mt-1.5 text-sm text-fog">
            האזור הזה פרטי. הזן את הסיסמה כדי להמשיך.
          </p>

          <LoginForm />
        </div>
      </div>
    </main>
  );
}
