import { createFileRoute, Link } from "@tanstack/react-router";
import { GROK_PROVIDERS, authEnabled, signIn } from "@/lib/auth/client";
import { ChemLab } from "@/components/vault/ChemLab";
import { FlaskConical } from "lucide-react";

export const Route = createFileRoute("/login")({ component: Login });

function Login() {
  return (
    <main className="relative grid min-h-dvh place-items-center overflow-x-clip p-6">
      <ChemLab />
      <div className="relative w-full max-w-sm rounded-3xl border border-border bg-surface p-6 shadow-[0_24px_50px_rgba(0,0,0,0.28)]">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 text-xs font-semibold text-primary">
          <FlaskConical className="size-3.5" />
          ChemVault 10
        </div>
        <h1 className="font-display text-3xl text-fg">Sign in</h1>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Sync stars, mastery and quiz streaks across devices. Gate viewers are signed in
          automatically.
        </p>
        <div className="mt-6 grid gap-2">
          {authEnabled ? (
            GROK_PROVIDERS.map((p) => (
              <button
                key={p.providerId}
                type="button"
                onClick={() => signIn(p.providerId, { callbackURL: "/" })}
                className="h-12 rounded-2xl border border-border bg-raised px-4 text-sm font-semibold text-fg transition-transform duration-150 hover:border-primary active:scale-[0.96]"
              >
                Continue with {p.label}
              </button>
            ))
          ) : (
            <p className="text-sm text-muted">Sign-in is disabled.</p>
          )}
        </div>
        <Link
          to="/"
          className="mt-5 inline-flex h-11 items-center text-sm font-medium text-muted hover:text-fg"
        >
          Back to the vault
        </Link>
      </div>
    </main>
  );
}
