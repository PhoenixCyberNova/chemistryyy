import { _ as Link, y as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as signIn } from "./client-B40BzJxt.mjs";
import { t as GROK_PROVIDERS } from "./server-BzXxDHbV.mjs";
import { t as ChemLab } from "./ChemLab-CoL056M9.mjs";
import { d as FlaskConical } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-B6DEZPYE.js
var import_jsx_runtime = require_jsx_runtime();
function Login() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "relative grid min-h-dvh place-items-center overflow-x-clip p-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChemLab, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative w-full max-w-sm rounded-3xl border border-border bg-surface p-6 shadow-[0_24px_50px_rgba(0,0,0,0.28)]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-4 inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 text-xs font-semibold text-primary",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FlaskConical, { className: "size-3.5" }), "ChemVault 10"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-3xl text-fg",
					children: "Sign in"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm leading-relaxed text-muted",
					children: "Sync stars, mastery and quiz streaks across devices. Gate viewers are signed in automatically."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6 grid gap-2",
					children: GROK_PROVIDERS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => signIn(p.providerId, { callbackURL: "/" }),
						className: "h-12 rounded-2xl border border-border bg-raised px-4 text-sm font-semibold text-fg transition-transform duration-150 hover:border-primary active:scale-[0.96]",
						children: ["Continue with ", p.label]
					}, p.providerId))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "mt-5 inline-flex h-11 items-center text-sm font-medium text-muted hover:text-fg",
					children: "Back to the vault"
				})
			]
		})]
	});
}
//#endregion
export { Login as component };
