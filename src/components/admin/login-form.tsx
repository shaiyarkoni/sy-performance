"use client";

import { useActionState } from "react";
import { LockKeyhole } from "lucide-react";
import { login, type LoginState } from "@/app/admin/actions";
import { buttonClass } from "@/components/ui/button";

const initialState: LoginState = {};

export function LoginForm() {
  const [state, formAction, pending] = useActionState(login, initialState);

  return (
    <form action={formAction} className="mt-6 grid gap-4">
      <label className="grid gap-2">
        <span className="text-sm font-medium">סיסמה</span>
        <input
          type="password"
          name="password"
          className="field"
          placeholder="••••••••"
          autoComplete="current-password"
          autoFocus
        />
      </label>

      {state.error ? (
        <p className="text-sm font-medium text-red-400">{state.error}</p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className={buttonClass("volt", "lg", "w-full")}
      >
        <LockKeyhole className="size-4" />
        {pending ? "בודק..." : "כניסה"}
      </button>
    </form>
  );
}
