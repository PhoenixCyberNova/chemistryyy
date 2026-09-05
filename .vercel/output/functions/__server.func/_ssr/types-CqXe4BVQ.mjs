import { n as createMiddleware } from "./ssr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/types-CqXe4BVQ.js
/**
* Auth middleware for server functions — the standard way to get the caller's
* verified user id. When deployed the session cookie is same-origin and rides
* along automatically. In the live preview the client also forwards the bearer
* token (partitioned cookies) via the `.client` hook below — call sites do not
* thread it themselves.
*
*   import { createServerFn } from "@tanstack/react-start";
*   import { getSql } from "@/lib/db";
*   import { authMiddleware } from "@/lib/auth/middleware";
*
*   export const listTodos = createServerFn({ method: "GET" })
*     .middleware([authMiddleware])
*     .handler(async ({ context }) => {
*       const sql = await getSql();
*       return sql`select * from todos where user_id = ${context.userId}`;
*     });
*
* Signed out with auth on (live preview included) -> throws `UnauthorizedError`
* (see `verify.server.ts`). With auth disabled (`VITE_AUTH_ENABLED=false`, the
* shipped default) it resolves the shared dev user — but throws instead when a
* `DATABASE_URL` is also set, so an app without sign-in must not use this at
* all. On the auth-on path, use it on every server function that touches
* per-user data and scope every query by `context.userId`.
*/
var authMiddleware = createMiddleware({ type: "function" }).client(async ({ next }) => {
	const { getBearerToken } = await import("./client-B40BzJxt.mjs").then((n) => n.n);
	return next({ sendContext: { bearerToken: getBearerToken() ?? void 0 } });
}).server(async ({ next, context }) => {
	const { assertSameSiteRequest } = await import("./isolation.server-CGNg1r0B.mjs");
	const { requireUserId } = await import("./verify.server-BPrzeoCu.mjs");
	assertSameSiteRequest();
	return next({ context: { userId: await requireUserId(context.bearerToken) } });
});
var EMPTY_STUDENT = {
	v: 1,
	updatedAt: 0,
	theme: "dark",
	onboardingDone: false,
	stars: [],
	bookDefs: [],
	bookNotes: [],
	bookQuiz: [],
	mastery: {},
	quizLog: [],
	streak: {
		count: 0,
		lastDay: ""
	}
};
function todayStamp(d = /* @__PURE__ */ new Date()) {
	return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
function bumpStreak(prev, day = todayStamp()) {
	if (prev.lastDay === day) return prev;
	const yest = /* @__PURE__ */ new Date();
	yest.setDate(yest.getDate() - 1);
	const yestStamp = todayStamp(yest);
	if (prev.lastDay === yestStamp) return {
		count: prev.count + 1,
		lastDay: day
	};
	return {
		count: 1,
		lastDay: day
	};
}
function mergePayload(a, b) {
	const newer = a.updatedAt >= b.updatedAt ? a : b;
	const older = newer === a ? b : a;
	const mastery = {
		...older.mastery,
		...newer.mastery
	};
	const union = (x, y) => [.../* @__PURE__ */ new Set([...x, ...y])];
	const logs = [...older.quizLog, ...newer.quizLog].sort((p, q) => p.at - q.at).filter((row, i, arr) => arr.findIndex((r) => r.id === row.id) === i).slice(-80);
	return {
		v: 1,
		updatedAt: Math.max(a.updatedAt, b.updatedAt),
		theme: newer.theme,
		onboardingDone: a.onboardingDone || b.onboardingDone,
		stars: union(a.stars, b.stars),
		bookDefs: union(a.bookDefs, b.bookDefs),
		bookNotes: union(a.bookNotes, b.bookNotes),
		bookQuiz: union(a.bookQuiz, b.bookQuiz),
		mastery,
		quizLog: logs,
		streak: a.streak.count > b.streak.count || a.streak.count === b.streak.count && a.streak.lastDay >= b.streak.lastDay ? a.streak : b.streak
	};
}
//#endregion
export { mergePayload as i, authMiddleware as n, bumpStreak as r, EMPTY_STUDENT as t };
