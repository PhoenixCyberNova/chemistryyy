import { UserButton } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { Link } from "@tanstack/react-router";

export function AuthSlot() {
  const { user, isPending } = useCurrentUserState();
  if (isPending) {
    return <div className="size-9 shrink-0 animate-pulse rounded-full bg-raised" aria-hidden />;
  }
  if (user) {
    return (
      <div className="min-w-0 max-w-[42vw] overflow-hidden sm:max-w-none">
        <UserButton />
      </div>
    );
  }
  return (
    <Link
      to="/login"
      className="inline-flex h-11 shrink-0 items-center rounded-xl border border-border px-3 text-sm font-medium text-muted hover:text-fg"
    >
      Sign in
    </Link>
  );
}
