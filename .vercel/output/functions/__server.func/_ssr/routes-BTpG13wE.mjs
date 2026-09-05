import { o as __toESM } from "../_runtime.mjs";
import { _ as Link, y as require_jsx_runtime, z as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as getServerFnById, i as TSS_SERVER_FUNCTION, r as createServerFn } from "./ssr.mjs";
import { i as signOut, t as authClient } from "./client-B40BzJxt.mjs";
import { a as hasGateSessionMarker } from "./server-BzXxDHbV.mjs";
import { t as ChemLab } from "./ChemLab-CoL056M9.mjs";
import { _ as BookOpen, a as Sparkles, c as Moon, d as FlaskConical, f as Download, g as BookmarkCheck, h as Bookmark, i as Star, l as MessageCircle, m as ChevronRight, o as Search, p as Clock, r as Sun, s as RotateCcw, t as Users, u as Lightbulb } from "../_libs/lucide-react.mjs";
import { i as mergePayload, n as authMiddleware, r as bumpStreak, t as EMPTY_STUDENT } from "./types-CqXe4BVQ.mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { n as persist, r as create, t as createJSONStorage } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BTpG13wE.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/**
* Current user + loading state. Same behavior in live preview and when deployed:
*   - Auth enabled -> the real signed-in user; `user` is `null` while
*                            the session resolves (`isPending: true`) and when
*                            signed out (`isPending: false`). Session comes from
*                            Better Auth `useSession()` → `/api/auth/get-session`
*                            (cookie when deployed; bearer in live preview).
*   - Auth disabled (`VITE_AUTH_ENABLED=false`) -> `DEV_USER`, never pending.
*
* Protect a route by waiting out `isPending` before acting on `user` —
* redirecting on `user: null` alone bounces signed-in visitors to sign-in on
* every hard reload:
*
*   import { RedirectToSignIn } from "@/lib/auth/gates";
*   const { user, isPending } = useCurrentUserState();
*   if (isPending) return null;              // still resolving — don't redirect yet
*   if (!user) return <RedirectToSignIn />;  // definitely signed out
*
* `authEnabled` is a module-level constant fixed at load, so the guarded hook
* call keeps a stable hook order across every render of a given component.
*/
function useCurrentUserState() {
	const { data, isPending } = authClient.useSession();
	const user = data?.user;
	return {
		user: user ? {
			id: user.id,
			displayName: user.name ?? null,
			primaryEmail: user.email ?? null,
			profileImageUrl: user.image ?? null,
			isDevFallback: false
		} : null,
		isPending
	};
}
/**
* Convenience view of `useCurrentUserState().user` for display (e.g.
* `user?.displayName ?? "Guest"`). NOTE: `null` means *loading OR signed out* —
* for redirects/guards use `useCurrentUserState()` and check `isPending`.
*/
function useCurrentUser() {
	return useCurrentUserState().user;
}
var subscribeToNothing = () => () => {};
var noGateSessionOnServer = () => false;
/**
* Minimal signed-in identity chip + sign-out. Restyle freely (see the
* `design-ui` skill). Sign-out is only shown when auth is enabled (the
* disabled-auth dev user has nothing to sign out of) and the session is not
* gate-materialized — behind the gate the next request signs the viewer
* straight back in, so a sign-out control there is a broken loop.
*/
function UserButton() {
	const user = useCurrentUser();
	const [signingOut, setSigningOut] = (0, import_react.useState)(false);
	const gateSession = (0, import_react.useSyncExternalStore)(subscribeToNothing, hasGateSessionMarker, noGateSessionOnServer);
	if (!user) return null;
	const label = user.displayName ?? user.primaryEmail ?? "Account";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-2",
		children: [
			user.profileImageUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: user.profileImageUrl,
				alt: "",
				className: "h-8 w-8 rounded-full object-cover"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "grid h-8 w-8 place-items-center rounded-full bg-black/10 text-sm font-medium dark:bg-white/20",
				children: label.charAt(0).toUpperCase()
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-sm font-medium",
				children: label
			}),
			!gateSession && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				disabled: signingOut,
				onClick: () => {
					setSigningOut(true);
					signOut().catch(() => setSigningOut(false));
				},
				className: "cursor-pointer text-sm underline-offset-4 opacity-70 hover:underline disabled:cursor-wait disabled:no-underline",
				children: signingOut ? "Signing out…" : "Sign out"
			})
		]
	});
}
function AuthSlot() {
	const { user, isPending } = useCurrentUserState();
	if (isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "size-9 shrink-0 animate-pulse rounded-full bg-raised",
		"aria-hidden": true
	});
	if (user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-w-0 max-w-[42vw] overflow-hidden sm:max-w-none",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserButton, {})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: "/login",
		className: "inline-flex h-11 shrink-0 items-center rounded-xl border border-border px-3 text-sm font-medium text-muted hover:text-fg",
		children: "Sign in"
	});
}
var RULES = [
	{
		re: /\bsilvery\s*white\b/i,
		hex: "#d6dde6",
		label: "silvery white"
	},
	{
		re: /\bpale\s*yellow\b/i,
		hex: "#fde68a",
		label: "pale yellow"
	},
	{
		re: /\bgreenish[-\s]?yellow\b/i,
		hex: "#a3e635",
		label: "greenish-yellow"
	},
	{
		re: /\breddish[-\s]?brown\b/i,
		hex: "#b45309",
		label: "reddish-brown"
	},
	{
		re: /\byellowish[-\s]?brown\b/i,
		hex: "#b45309",
		label: "yellowish-brown"
	},
	{
		re: /\bbluish[-\s]?green\b/i,
		hex: "#0d9488",
		label: "bluish-green"
	},
	{
		re: /\bpale\s*green\b/i,
		hex: "#86efac",
		label: "pale green"
	},
	{
		re: /\bdazzling white\b/i,
		hex: "#f8fafc",
		label: "dazzling white"
	},
	{
		re: /\bshiny white\b/i,
		hex: "#f8fafc",
		label: "shiny white"
	},
	{
		re: /\bbrown fumes\b|\bbrown gas\b|\bbrown no/i,
		hex: "#9a3412",
		label: "brown"
	},
	{
		re: /\bpurple\b/i,
		hex: "#6b21a8",
		label: "purple"
	},
	{
		re: /\borange\b/i,
		hex: "#ea580c",
		label: "orange"
	},
	{
		re: /\bviolet\b/i,
		hex: "#5b21b6",
		label: "violet"
	},
	{
		re: /\bpink\b/i,
		hex: "#f472b6",
		label: "pink"
	},
	{
		re: /\bgrey\b|\bgray\b/i,
		hex: "#6b7280",
		label: "grey"
	},
	{
		re: /\bgreen\b/i,
		hex: "#22c55e",
		label: "green"
	},
	{
		re: /\bbrown\b/i,
		hex: "#92400e",
		label: "brown"
	},
	{
		re: /\byellow\b/i,
		hex: "#eab308",
		label: "yellow"
	},
	{
		re: /\bblue\b/i,
		hex: "#1e90ff",
		label: "blue"
	},
	{
		re: /\bblack\b/i,
		hex: "#111827",
		label: "black"
	},
	{
		re: /\bwhite\b/i,
		hex: "#f8fafc",
		label: "white"
	},
	{
		re: /\bmilky\b/i,
		hex: "#f1f5f9",
		label: "milky"
	},
	{
		re: /\bcolourless\b|\bcolorless\b/i,
		hex: "#e5e7eb",
		label: "colourless"
	}
];
function chipsFromColour(text) {
	const found = [];
	const seen = /* @__PURE__ */ new Set();
	for (const rule of RULES) {
		if (!rule.re.test(text)) continue;
		if (seen.has(rule.label)) continue;
		seen.add(rule.label);
		found.push({
			hex: rule.hex,
			label: rule.label
		});
	}
	return found.slice(0, 4);
}
function ColorChips({ text }) {
	const chips = chipsFromColour(text);
	if (!chips.length) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: text });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "inline-flex flex-wrap items-center gap-1.5",
		children: [chips.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			title: c.label,
			className: "inline-block size-3.5 shrink-0 rounded-md border border-border",
			style: { background: c.hex }
		}, c.label)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: text })]
	});
}
var extraReactions = [
	{
		ch: "ch1",
		title: "Heating of Hydrated Copper Sulphate",
		eq: "CuSO₄·5H₂O(s) → CuSO₄(s) + 5H₂O(g)",
		type: "Thermal Decomposition (Water of crystallisation)",
		colour: "Blue crystals → white anhydrous CuSO₄",
		obs: "Blue colour disappears; water droplets may appear on the test tube",
		cond: "Strong heating",
		tip: "On adding water, the white powder turns blue again. Classic reversibility question.",
		desc: "Hydrated copper sulphate loses water of crystallisation on heating and becomes white anhydrous copper sulphate."
	},
	{
		ch: "ch1",
		title: "Iron + Sulphur (Combination)",
		eq: "Fe(s) + S(s) → FeS(s)",
		type: "Combination",
		colour: "Black iron sulphide",
		obs: "Mixture glows; a black compound is formed that is attracted weakly or not like free iron",
		cond: "Heating the mixture",
		tip: "Shows that a compound has properties different from its elements.",
		desc: "Iron and sulphur combine on heating to form iron sulphide. A standard combination example."
	},
	{
		ch: "ch1",
		title: "Silver Nitrate + Sodium Chloride",
		eq: "AgNO₃(aq) + NaCl(aq) → AgCl(s)↓ + NaNO₃(aq)",
		type: "Double Displacement (Precipitation)",
		colour: "White precipitate of AgCl",
		obs: "White curdy precipitate that turns grey in sunlight",
		cond: "Aqueous solutions mixed",
		tip: "AgCl is photosensitive — links Chapter 1 photolysis to precipitation.",
		desc: "Mixing silver nitrate and sodium chloride gives insoluble silver chloride."
	},
	{
		ch: "ch1",
		title: "Incomplete Combustion of Methane",
		eq: "CH₄(g) + O₂(g) → C(s) + 2H₂O(g)",
		type: "Combustion (Incomplete)",
		colour: "Sooty black carbon",
		obs: "Yellow sooty flame; black carbon deposits",
		cond: "Limited supply of oxygen",
		tip: "Saturated hydrocarbons give a clean blue flame in enough air; limited air gives soot.",
		desc: "When methane burns in insufficient oxygen, carbon (soot) is produced instead of only CO₂."
	},
	{
		ch: "ch2",
		title: "Ethanoic Acid + Zinc (Metal + Acid)",
		eq: "2CH₃COOH + Zn → (CH₃COO)₂Zn + H₂↑",
		type: "Acid + Metal",
		colour: "Colourless solution",
		obs: "Hydrogen gas with pop sound",
		cond: "Room temperature",
		tip: "Carboxylic acids react with metals like mineral acids, but more slowly.",
		desc: "Ethanoic acid reacts with zinc to form zinc ethanoate and hydrogen."
	},
	{
		ch: "ch2",
		title: "Tooth Enamel Attack (Conceptual)",
		eq: "Ca₁₀(PO₄)₆(OH)₂ + acids from bacteria → soluble calcium salts",
		type: "Acid attack / Everyday chemistry",
		colour: "Enamel is white; damage is not a colour change",
		obs: "Tooth decay when mouth pH falls below 5.5",
		cond: "Bacterial acids after sugary food",
		tip: "pH of mouth below 5.5 dissolves enamel. Toothpaste is basic to neutralise acids.",
		desc: "Bacteria produce acids that dissolve calcium phosphate of enamel when pH < 5.5."
	},
	{
		ch: "ch2",
		title: "Treatment of Acidic Soil",
		eq: "Acidic soil + Ca(OH)₂ → more neutral soil",
		type: "Neutralisation (Agriculture)",
		colour: "—",
		obs: "Soil pH rises towards neutral",
		cond: "Adding slaked lime / quicklime / chalk",
		tip: "Factories treat acidic wastes with bases before releasing them.",
		desc: "Slaked lime is added to acidic soil to neutralise it so plants can grow well."
	},
	{
		ch: "ch3",
		title: "Magnesium + Steam (Correct NCERT Form)",
		eq: "Mg(s) + H₂O(g) → MgO(s) + H₂(g)",
		type: "Metal + Steam",
		colour: "White MgO",
		obs: "Hydrogen gas evolved; white oxide forms",
		cond: "Steam (not cold water)",
		tip: "With hot water magnesium can give Mg(OH)₂; with steam it gives MgO. Write the form asked.",
		desc: "Magnesium reacts with steam to form magnesium oxide and hydrogen."
	},
	{
		ch: "ch3",
		title: "Electrolytic Refining of Copper",
		eq: "Cu (impure, anode) → Cu²⁺ + 2e⁻ ; Cu²⁺ + 2e⁻ → Cu (pure, cathode)",
		type: "Electrolytic refining",
		colour: "Reddish-brown pure copper at cathode; anode mud",
		obs: "Pure copper deposits on cathode; impurities settle as anode mud",
		cond: "Acidified copper sulphate electrolyte",
		tip: "Anode is impure metal, cathode is pure metal. Anode mud may contain Au, Ag.",
		desc: "Impure copper is refined by electrolysis using acidified CuSO₄. Pure copper plates on the cathode."
	},
	{
		ch: "ch3",
		title: "Reduction of Iron Oxide in Blast Furnace",
		eq: "Fe₂O₃(s) + 3CO(g) → 2Fe(l) + 3CO₂(g)",
		type: "Reduction (Extraction)",
		colour: "Molten iron",
		obs: "Iron is obtained from its oxide using carbon monoxide",
		cond: "High temperature in blast furnace",
		tip: "Moderately reactive metals are reduced by carbon / CO. Highly reactive metals need electrolysis.",
		desc: "Haematite is reduced by carbon monoxide to iron in the blast furnace."
	},
	{
		ch: "ch3",
		title: "Copper + Zinc Sulphate (No Reaction)",
		eq: "Cu(s) + ZnSO₄(aq) → no reaction",
		type: "Reactivity series (negative test)",
		colour: "Blue-green / colourless solution unchanged; no deposit",
		obs: "No displacement occurs",
		cond: "Aqueous solution",
		tip: "A less reactive metal cannot displace a more reactive metal. Copper is below zinc.",
		desc: "Copper cannot displace zinc from zinc sulphate because copper is less reactive than zinc."
	},
	{
		ch: "ch4",
		title: "Bromine Water Test for Unsaturation",
		eq: "CH₂=CH₂ + Br₂ → CH₂Br–CH₂Br",
		type: "Addition (Test for unsaturation)",
		colour: "Reddish-brown bromine water is decolourised",
		obs: "Brown colour of bromine disappears",
		cond: "Room temperature, no sunlight needed",
		tip: "Alkanes do not decolourise bromine water in the dark; alkenes and alkynes do.",
		desc: "Ethene adds bromine across the double bond, decolourising bromine water — a test for unsaturation."
	},
	{
		ch: "ch4",
		title: "Hydrogenation of Vegetable Oils",
		eq: "Vegetable oil (unsaturated) + H₂ → vanaspati / saturated fat",
		type: "Addition / Hydrogenation",
		colour: "Liquid oil becomes semi-solid fat",
		obs: "Oil hardens on catalytic hydrogenation",
		cond: "Ni / Pd catalyst, heat",
		tip: "Industrial application of addition reactions. Often a 3-mark question.",
		desc: "Unsaturated vegetable oils add hydrogen in presence of nickel to form saturated fats (vanaspati)."
	},
	{
		ch: "ch4",
		title: "Scum Formation with Hard Water",
		eq: "2C₁₇H₃₅COONa + Ca²⁺ → (C₁₇H₃₅COO)₂Ca ↓ + 2Na⁺",
		type: "Soap + Hard water",
		colour: "White / grey scum",
		obs: "Insoluble scum floats; lather is poor",
		cond: "Hard water containing Ca²⁺ or Mg²⁺",
		tip: "Detergents do not form scum. Soaps fail in hard water because of this precipitate.",
		desc: "Calcium or magnesium ions in hard water form insoluble salts (scum) with soap."
	},
	{
		ch: "ch4",
		title: "Incomplete Combustion of Unsaturated Hydrocarbons",
		eq: "C₂H₄ + O₂ (limited) → C + oxides / sooty flame",
		type: "Combustion",
		colour: "Yellow sooty flame",
		obs: "Black soot; luminous flame",
		cond: "Burning in air",
		tip: "Unsaturated hydrocarbons generally give a sooty flame because of higher carbon content.",
		desc: "Alkenes and alkynes burn with a yellow sooty flame compared with the clean flame of methane."
	},
	{
		ch: "ch4",
		title: "Ethanoic Acid + Sodium Metal",
		eq: "2CH₃COOH + 2Na → 2CH₃COONa + H₂↑",
		type: "Acid + Metal",
		colour: "Colourless",
		obs: "Hydrogen evolved",
		cond: "Room temperature",
		tip: "Both ethanol and ethanoic acid give H₂ with sodium; only the acid gives CO₂ with NaHCO₃.",
		desc: "Ethanoic acid reacts with sodium to form sodium ethanoate and hydrogen."
	}
];
var extraColours = [
	{
		name: "Potassium permanganate (alkaline)",
		formula: "KMnO₄",
		colour: "Purple solution",
		remarks: "Decolourises when it oxidises ethanol.",
		swatch: "#6b21a8"
	},
	{
		name: "Potassium dichromate (acidified)",
		formula: "K₂Cr₂O₇",
		colour: "Orange solution",
		remarks: "Turns green on reduction while oxidising ethanol.",
		swatch: "#ea580c"
	},
	{
		name: "Bromine water",
		formula: "Br₂(aq)",
		colour: "Reddish-brown",
		remarks: "Decolourised by unsaturated hydrocarbons.",
		swatch: "#9a3412"
	},
	{
		name: "Sulphur",
		formula: "S",
		colour: "Yellow",
		remarks: "Burning sulphur smell of SO₂.",
		swatch: "#eab308"
	},
	{
		name: "Graphite",
		formula: "C",
		colour: "Grey-black, slippery",
		remarks: "Allotrope of carbon; conducts electricity.",
		swatch: "#374151"
	},
	{
		name: "Diamond",
		formula: "C",
		colour: "Colourless, brilliant",
		remarks: "Allotrope of carbon; insulator, very hard.",
		swatch: "#e5e7eb"
	},
	{
		name: "Ferric chloride solution",
		formula: "FeCl₃",
		colour: "Yellowish-brown",
		remarks: "Often confused with FeCl₂ (pale green).",
		swatch: "#b45309"
	},
	{
		name: "Sulphur dioxide",
		formula: "SO₂",
		colour: "Colourless gas",
		remarks: "Pungent burning-sulphur smell; from roasting / FeSO₄ heating.",
		swatch: "#f8fafc"
	},
	{
		name: "Carbon monoxide",
		formula: "CO",
		colour: "Colourless, poisonous",
		remarks: "Product of incomplete combustion; reducing agent in blast furnace.",
		swatch: "#e5e7eb"
	},
	{
		name: "Iodine vapour",
		formula: "I₂",
		colour: "Violet vapours",
		remarks: "Sometimes used as extra colour memory; not a core NCERT reaction.",
		swatch: "#5b21b6"
	},
	{
		name: "Sodium metal",
		formula: "Na",
		colour: "Silvery-white, soft",
		remarks: "Stored under kerosene.",
		swatch: "#d1d5db"
	},
	{
		name: "Potassium metal",
		formula: "K",
		colour: "Silvery-white, soft",
		remarks: "Most reactive common metal in the series; stored in kerosene/oil.",
		swatch: "#d1d5db"
	}
];
var extraDefs = [
	{
		title: "Exothermic Reaction",
		body: "A chemical reaction in which heat is released to the surroundings (e.g. respiration, burning of natural gas, neutralisation)."
	},
	{
		title: "Endothermic Reaction",
		body: "A chemical reaction in which heat is absorbed from the surroundings (e.g. photosynthesis, thermal decomposition of CaCO₃)."
	},
	{
		title: "Catalyst",
		body: "A substance that changes the rate of a chemical reaction without itself being consumed (e.g. Ni in hydrogenation, conc. H₂SO₄ in esterification/dehydration)."
	},
	{
		title: "Water of Crystallisation",
		body: "The fixed number of water molecules present in one formula unit of a salt (e.g. CuSO₄·5H₂O, Na₂CO₃·10H₂O, CaSO₄·2H₂O)."
	},
	{
		title: "Strong Acid",
		body: "An acid that ionises almost completely in water, giving a high concentration of H⁺ ions (e.g. HCl, H₂SO₄, HNO₃)."
	},
	{
		title: "Weak Acid",
		body: "An acid that ionises only partially in water (e.g. CH₃COOH, carbonic acid, citric acid)."
	},
	{
		title: "Universal Indicator",
		body: "A mixture of several indicators that shows different colours at different pH values and is used to find the approximate pH of a solution."
	},
	{
		title: "Ore",
		body: "A mineral from which a metal can be extracted profitably."
	},
	{
		title: "Mineral",
		body: "Naturally occurring substances in the earth’s crust that may contain metals in combined form."
	},
	{
		title: "Metallurgy",
		body: "The various processes used to obtain a metal from its ore: concentration, conversion to oxide, reduction, and refining."
	},
	{
		title: "Alloy",
		body: "A homogeneous mixture of two or more metals, or a metal and a non-metal (e.g. brass = Cu + Zn, bronze = Cu + Sn, steel = Fe + C)."
	},
	{
		title: "Galvanisation",
		body: "The process of coating iron or steel with a thin layer of zinc to prevent rusting."
	},
	{
		title: "Anodising",
		body: "The process of forming a thick protective oxide layer on aluminium by electrolysis."
	},
	{
		title: "Electrolytic Refining",
		body: "Purification of a metal by electrolysis: impure metal is the anode, pure metal is the cathode, and a salt of the metal is the electrolyte."
	},
	{
		title: "Allotropy",
		body: "The property of an element to exist in two or more different physical forms (allotropes) with different properties (diamond, graphite, buckminsterfullerene for carbon)."
	},
	{
		title: "Oxidising Agent",
		body: "A substance that oxidises another substance by providing oxygen or removing hydrogen (and is itself reduced)."
	},
	{
		title: "Reducing Agent",
		body: "A substance that reduces another substance by removing oxygen or providing hydrogen (and is itself oxidised)."
	},
	{
		title: "Hard Water",
		body: "Water that does not easily form lather with soap because it contains Ca²⁺ and Mg²⁺ ions."
	},
	{
		title: "Hydrophobic Tail",
		body: "The long hydrocarbon chain of a soap molecule that is water-repelling and oil-attracting."
	},
	{
		title: "Hydrophilic Head",
		body: "The ionic –COO⁻Na⁺ part of a soap molecule that is water-attracting."
	},
	{
		title: "Detergent",
		body: "A cleansing agent (usually a sodium salt of a long-chain sulphonic acid or similar) that works even in hard water because it does not form scum."
	},
	{
		title: "Isomers (Class 10 mention)",
		body: "Compounds with the same molecular formula but different structures (e.g. C₄H₁₀ as n-butane and iso-butane). Mentioned with carbon compounds."
	}
];
var extraNotes = [
	{
		title: "Water of Crystallisation — Must Know",
		body: "Blue vitriol CuSO₄·5H₂O (5 H₂O)\nWashing soda Na₂CO₃·10H₂O (10 H₂O)\nGypsum CaSO₄·2H₂O (2 H₂O)\nPlaster of Paris CaSO₄·½H₂O (½ H₂O)\nBaking soda NaHCO₃ has NO water of crystallisation."
	},
	{
		title: "Extraction of Metals — Map",
		body: "Highly reactive (K, Na, Ca, Mg, Al) → electrolysis of molten compounds.\nModerately reactive (Zn, Fe, Pb, Cu) → roast/calcine to oxide, then reduce with C/CO/Al.\nLeast reactive (Ag, Au, Hg) → found native or obtained by heating the ore alone (e.g. Hg from cinnabar)."
	},
	{
		title: "Homologous Series Snapshots",
		body: "Alkanes: CₙH₂ₙ₊₂ — methane, ethane, propane, butane\nAlkenes: CₙH₂ₙ — ethene, propene\nAlkynes: CₙH₂ₙ₋₂ — ethyne, propyne\nAlcohols: CₙH₂ₙ₊₁OH — methanol, ethanol\nCarboxylic acids: CₙH₂ₙ₊₁COOH — methanoic, ethanoic\nGeneral properties: same functional group, gradation in physical properties, similar chemical properties, differ by –CH₂."
	},
	{
		title: "Tests that Separate Alcohol vs Carboxylic Acid",
		body: "Both can give H₂ with sodium.\nOnly carboxylic acid gives brisk effervescence of CO₂ with NaHCO₃ / Na₂CO₃.\nEthanoic acid has a vinegar smell; esters have a fruity smell."
	},
	{
		title: "Electron-dot Structures to Practise",
		body: "H₂, O₂, N₂, HCl, H₂O, NH₃, CH₄, C₂H₆, C₂H₄, C₂H₂, CO₂, N₂ (triple bond), O₂ (double bond).\nCount valence electrons, share to complete octets (duet for H)."
	},
	{
		title: "Uses — High Frequency",
		body: "Ethanol: fuel, solvent, drinks (restricted), spirit lamps, starting material for ethanoic acid.\nEthanoic acid: vinegar (5–8% in water), preservative, making esters.\nBleaching powder: bleach cotton/linen, disinfectant for water, oxidising agent.\nBaking soda: baking, antacid, soda-acid fire extinguisher.\nWashing soda: glass, soap, paper, removing permanent hardness.\nPOP: casts, statues, false ceilings."
	},
	{
		title: "How to Balance Equations Fast",
		body: "1. Write skeleton formulae.\n2. Balance metals, then non-metals, then hydrogen, then oxygen.\n3. Balance polyatomic ions as a group if they appear on both sides.\n4. Add state symbols (s, l, g, aq) if the question asks.\n5. Never change formulae to balance — only coefficients."
	},
	{
		title: "Alloys Board Table",
		body: "Brass: Cu + Zn — utensils, decorative\nBronze: Cu + Sn — statues, medals, coins\nSolder: Pb + Sn — joining wires (low melting point)\nSteel: Fe + C — construction\nStainless steel: Fe + Ni + Cr — resists rust"
	}
];
var extraQuiz = {
	ch1: [{
		q: "Blue copper sulphate crystals turn white on heating because they lose:",
		options: [
			"Oxygen",
			"Sulphur trioxide",
			"Water of crystallisation",
			"Copper"
		],
		ans: 2
	}, {
		q: "Which reaction is endothermic?",
		options: [
			"Respiration",
			"Burning of methane",
			"Decomposition of CaCO₃",
			"Neutralisation of NaOH and HCl"
		],
		ans: 2
	}],
	ch2: [{
		q: "Tooth enamel starts dissolving when the pH in the mouth is:",
		options: [
			"Above 7",
			"Equal to 7",
			"Below 5.5",
			"Exactly 14"
		],
		ans: 2
	}, {
		q: "Which salt has no water of crystallisation?",
		options: [
			"Gypsum",
			"Washing soda",
			"Blue vitriol",
			"Baking soda"
		],
		ans: 3
	}],
	ch3: [{
		q: "In electrolytic refining of copper, pure copper is deposited at the:",
		options: [
			"Anode",
			"Cathode",
			"Bottom as anode mud",
			"Electrolyte surface"
		],
		ans: 1
	}, {
		q: "Brass is an alloy of copper and:",
		options: [
			"Tin",
			"Zinc",
			"Nickel",
			"Aluminium"
		],
		ans: 1
	}],
	ch4: [{
		q: "Bromine water is decolourised by:",
		options: [
			"Methane",
			"Ethane",
			"Ethene",
			"Sodium chloride"
		],
		ans: 2
	}, {
		q: "Soap forms scum with hard water due to ions of:",
		options: [
			"Na⁺ and K⁺",
			"Ca²⁺ and Mg²⁺",
			"Cl⁻ and SO₄²⁻",
			"H⁺ and OH⁻"
		],
		ans: 1
	}]
};
var moreReactions = [
	{
		ch: "ch1",
		title: "Photosynthesis (Endothermic)",
		eq: "6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂  (sunlight, chlorophyll)",
		type: "Endothermic / Combination of processes",
		colour: "Green leaf (chlorophyll)",
		obs: "Glucose stored; oxygen released",
		cond: "Sunlight and chlorophyll",
		tip: "Board contrast: respiration is exothermic, photosynthesis is endothermic.",
		desc: "Green plants convert carbon dioxide and water into glucose using sunlight. Heat/light is absorbed, so it is endothermic."
	},
	{
		ch: "ch1",
		title: "Heating of Calcium Carbonate (Limestone)",
		eq: "CaCO₃(s) → CaO(s) + CO₂(g)",
		type: "Thermal Decomposition",
		colour: "White solid remains (quicklime)",
		obs: "CO₂ evolved; lime water turns milky if tested",
		cond: "Strong heating (lime kiln)",
		tip: "Same chemistry as manufacture of lime. Reverse is combination of CaO + CO₂.",
		desc: "Limestone decomposes on strong heating to quicklime and carbon dioxide."
	},
	{
		ch: "ch1",
		title: "Electrolysis of Water",
		eq: "2H₂O(l) → 2H₂(g) + O₂(g)",
		type: "Electrolytic Decomposition",
		colour: "Colourless gases",
		obs: "H₂ at cathode (twice the volume); O₂ at anode",
		cond: "Electric current; a little acid to make water conducting",
		tip: "Volume of H₂ : O₂ = 2 : 1. Cathode = hydrogen (pop), anode = oxygen (relights splint).",
		desc: "Electric current splits water into hydrogen and oxygen. A textbook electrolytic decomposition."
	},
	{
		ch: "ch1",
		title: "Lead Nitrate Heating",
		eq: "2Pb(NO₃)₂(s) → 2PbO(s) + 4NO₂(g) + O₂(g)",
		type: "Thermal Decomposition",
		colour: "Yellow PbO; brown NO₂ fumes",
		obs: "Crackling; dense brown gas; yellow residue",
		cond: "Strong heating of white crystals",
		tip: "Brown fumes = NO₂. Do not write N₂O or NO.",
		desc: "Lead nitrate decomposes to lead oxide, nitrogen dioxide and oxygen."
	},
	{
		ch: "ch1",
		title: "Ferrous Sulphate Heating",
		eq: "2FeSO₄(s) → Fe₂O₃(s) + SO₂(g) + SO₃(g)",
		type: "Thermal Decomposition",
		colour: "Green crystals → reddish-brown Fe₂O₃",
		obs: "Colour change; smell of burning sulphur",
		cond: "Strong heating",
		tip: "Two gases: SO₂ and SO₃. Residue is ferric oxide.",
		desc: "Hydrated ferrous sulphate first loses water, then decomposes to ferric oxide and sulphur oxides."
	},
	{
		ch: "ch2",
		title: "Acid + Metal Carbonate",
		eq: "Na₂CO₃(s) + 2HCl(aq) → 2NaCl(aq) + H₂O(l) + CO₂(g)",
		type: "Acid + carbonate",
		colour: "Colourless; lime water milky with the gas",
		obs: "Brisk effervescence of CO₂",
		cond: "Room temperature",
		tip: "All metal carbonates and hydrogencarbonates give CO₂ with acids. Test with lime water.",
		desc: "Acids react with carbonates to form salt, water and carbon dioxide."
	},
	{
		ch: "ch2",
		title: "Acid + Metal Hydrogencarbonate",
		eq: "NaHCO₃(s) + HCl(aq) → NaCl(aq) + H₂O(l) + CO₂(g)",
		type: "Acid + hydrogencarbonate",
		colour: "Colourless",
		obs: "Brisk effervescence",
		cond: "Room temperature",
		tip: "Same gas test as carbonates. Used in soda-acid fire extinguishers.",
		desc: "Baking soda reacts with acid to release carbon dioxide, which is the working of a soda-acid extinguisher."
	},
	{
		ch: "ch2",
		title: "Neutralisation (HCl + NaOH)",
		eq: "HCl(aq) + NaOH(aq) → NaCl(aq) + H₂O(l) + Heat",
		type: "Neutralisation",
		colour: "Phenolphthalein pink → colourless at end point from base side",
		obs: "Mixture becomes hot",
		cond: "Aqueous solutions",
		tip: "Always mention salt + water + heat. Exothermic.",
		desc: "Hydrochloric acid and sodium hydroxide form sodium chloride and water."
	},
	{
		ch: "ch2",
		title: "Chlor-Alkali Process",
		eq: "2NaCl(aq) + 2H₂O(l) → 2NaOH(aq) + Cl₂(g) + H₂(g)",
		type: "Electrolysis of brine",
		colour: "Cl₂ greenish-yellow; NaOH colourless",
		obs: "Chlorine at anode, hydrogen at cathode, NaOH in solution",
		cond: "Electrolysis of aqueous NaCl",
		tip: "Products: NaOH, Cl₂, H₂. Uses of each are frequent 3-mark questions.",
		desc: "Electrolysis of brine is the industrial source of sodium hydroxide, chlorine and hydrogen."
	},
	{
		ch: "ch2",
		title: "Manufacture of Bleaching Powder",
		eq: "Ca(OH)₂(s) + Cl₂(g) → CaOCl₂(s) + H₂O(l)",
		type: "Preparation of salt",
		colour: "Yellowish-white powder",
		obs: "Chlorine is absorbed by dry slaked lime",
		cond: "Dry slaked lime + chlorine",
		tip: "Formula is CaOCl₂, not Ca(OCl)₂ in Class 10 NCERT.",
		desc: "Bleaching powder is made by the action of chlorine on dry slaked lime."
	},
	{
		ch: "ch2",
		title: "Heating Baking Soda",
		eq: "2NaHCO₃(s) → Na₂CO₃(s) + H₂O(g) + CO₂(g)",
		type: "Thermal Decomposition",
		colour: "White solid",
		obs: "CO₂ makes cakes rise",
		cond: "Heating (baking)",
		tip: "The CO₂ bubbles make the cake spongy. Sodium carbonate left behind can give a bitter taste if excess is used.",
		desc: "Sodium hydrogencarbonate decomposes on heating, which is why it is used in baking."
	},
	{
		ch: "ch2",
		title: "Gypsum → Plaster of Paris",
		eq: "CaSO₄·2H₂O → CaSO₄·½H₂O + 1½ H₂O",
		type: "Controlled heating",
		colour: "White powder",
		obs: "Loses water of crystallisation",
		cond: "373 K (100 °C) — not too high",
		tip: "If heated much above 373 K, anhydrous CaSO₄ (dead burnt plaster) forms and will not set.",
		desc: "Gentle heating of gypsum at 373 K gives plaster of Paris."
	},
	{
		ch: "ch2",
		title: "Setting of Plaster of Paris",
		eq: "CaSO₄·½H₂O + 1½ H₂O → CaSO₄·2H₂O",
		type: "Hydration / setting",
		colour: "Hard white mass",
		obs: "Sets into a hard solid (gypsum)",
		cond: "Mixing with water",
		tip: "POP must be stored in a moisture-proof container.",
		desc: "Plaster of Paris recombines with water to form gypsum and sets into a hard mass."
	},
	{
		ch: "ch3",
		title: "Sodium + Water",
		eq: "2Na(s) + 2H₂O(l) → 2NaOH(aq) + H₂(g) + Heat",
		type: "Metal + cold water",
		colour: "Silvery metal; colourless solution",
		obs: "Metal darts on water; may catch fire",
		cond: "Cold water; sodium stored under kerosene",
		tip: "K, Na, Ca react with cold water. Mg needs hot water/steam.",
		desc: "Sodium reacts violently with water to form sodium hydroxide and hydrogen."
	},
	{
		ch: "ch3",
		title: "Thermite Reaction",
		eq: "Fe₂O₃(s) + 2Al(s) → 2Fe(l) + Al₂O₃(s) + Heat",
		type: "Displacement / redox (aluminothermy)",
		colour: "Molten iron; white-hot",
		obs: "Intense heat; molten iron produced",
		cond: "Ignition mixture",
		tip: "Al is the reducing agent. Used to weld railway tracks.",
		desc: "Aluminium reduces iron(III) oxide in a highly exothermic reaction."
	},
	{
		ch: "ch3",
		title: "Roasting of Zinc Blende",
		eq: "2ZnS(s) + 3O₂(g) → 2ZnO(s) + 2SO₂(g)",
		type: "Roasting",
		colour: "SO₂ is colourless, pungent",
		obs: "Sulphide converted to oxide",
		cond: "Excess air, high temperature",
		tip: "Roasting = sulphide ores. Calcination = carbonate ores.",
		desc: "Zinc sulphide is heated in excess air to obtain zinc oxide before reduction."
	},
	{
		ch: "ch3",
		title: "Calcination of Zinc Carbonate (Calamine)",
		eq: "ZnCO₃(s) → ZnO(s) + CO₂(g)",
		type: "Calcination",
		colour: "White ZnO (yellow when hot)",
		obs: "CO₂ evolved",
		cond: "Limited air, strong heating",
		tip: "ZnO is yellow when hot and white when cold — a favourite colour question.",
		desc: "Calamine is heated in limited air to convert it to zinc oxide."
	},
	{
		ch: "ch3",
		title: "Amphoteric Nature of Aluminium Oxide (Acid)",
		eq: "Al₂O₃ + 6HCl → 2AlCl₃ + 3H₂O",
		type: "Amphoteric oxide + acid",
		colour: "Colourless solution",
		obs: "Oxide dissolves",
		cond: "Aqueous acid",
		tip: "Always write BOTH acid and base reactions for amphoteric oxides.",
		desc: "Aluminium oxide reacts with hydrochloric acid like a base."
	},
	{
		ch: "ch3",
		title: "Amphoteric Nature of Aluminium Oxide (Base)",
		eq: "Al₂O₃ + 2NaOH → 2NaAlO₂ + H₂O",
		type: "Amphoteric oxide + base",
		colour: "Colourless sodium aluminate",
		obs: "Oxide dissolves in alkali",
		cond: "Aqueous NaOH",
		tip: "NaAlO₂ is sodium aluminate. Same pattern for ZnO.",
		desc: "Aluminium oxide also reacts with sodium hydroxide like an acid."
	},
	{
		ch: "ch3",
		title: "Anodising of Aluminium",
		eq: "4Al(s) + 3O₂ → 2Al₂O₃ (thick oxide coat by electrolysis)",
		type: "Corrosion protection",
		colour: "Oxide film can be dyed",
		obs: "Thicker, harder oxide layer",
		cond: "Electrolysis with Al as anode",
		tip: "The oxide layer protects aluminium and can be coloured.",
		desc: "Anodising thickens the natural oxide film on aluminium."
	},
	{
		ch: "ch4",
		title: "Substitution of Methane with Chlorine",
		eq: "CH₄ + Cl₂ → CH₃Cl + HCl  (sunlight)",
		type: "Substitution",
		colour: "Colourless gases",
		obs: "HCl fumes; further substitution can give CH₂Cl₂, CHCl₃, CCl₄",
		cond: "Sunlight",
		tip: "Saturated hydrocarbons give substitution, not addition, in sunlight.",
		desc: "Methane reacts with chlorine in sunlight by replacing hydrogen atoms one by one."
	},
	{
		ch: "ch4",
		title: "Dehydration of Ethanol",
		eq: "C₂H₅OH → C₂H₄ + H₂O  (conc. H₂SO₄, 443 K)",
		type: "Dehydration / elimination",
		colour: "Colourless ethene gas",
		obs: "Ethene burns with a sooty flame compared with methane",
		cond: "Concentrated H₂SO₄ at 443 K",
		tip: "Temperature 443 K is compulsory in the answer.",
		desc: "Hot concentrated sulphuric acid removes water from ethanol to give ethene."
	},
	{
		ch: "ch4",
		title: "Ethanol + Sodium",
		eq: "2C₂H₅OH + 2Na → 2C₂H₅ONa + H₂↑",
		type: "Alcohol + metal",
		colour: "Colourless",
		obs: "Hydrogen with pop; sodium ethoxide formed",
		cond: "Room temperature",
		tip: "This does NOT prove it is an acid like ethanoic acid. Use NaHCO₃ to distinguish.",
		desc: "Ethanol reacts with sodium to form sodium ethoxide and hydrogen."
	},
	{
		ch: "ch4",
		title: "Oxidation of Ethanol (Alkaline KMnO₄)",
		eq: "CH₃CH₂OH + 2[O] → CH₃COOH + H₂O",
		type: "Oxidation",
		colour: "Purple KMnO₄ decolourised",
		obs: "Vinegar smell of ethanoic acid",
		cond: "Alkaline KMnO₄ or acidified K₂Cr₂O₇, heat",
		tip: "Orange dichromate turns green; purple permanganate is decolourised.",
		desc: "Ethanol is oxidised to ethanoic acid by alkaline potassium permanganate."
	},
	{
		ch: "ch4",
		title: "Esterification",
		eq: "CH₃COOH + C₂H₅OH ⇌ CH₃COOC₂H₅ + H₂O  (conc. H₂SO₄)",
		type: "Esterification",
		colour: "Colourless ester",
		obs: "Sweet / fruity smell",
		cond: "A few drops of concentrated H₂SO₄ and warming",
		tip: "Ester = ethyl ethanoate. Conc. H₂SO₄ is the catalyst (dehydrating agent).",
		desc: "Ethanoic acid and ethanol form ethyl ethanoate, used in flavouring."
	},
	{
		ch: "ch4",
		title: "Saponification",
		eq: "CH₃COOC₂H₅ + NaOH → CH₃COONa + C₂H₅OH",
		type: "Alkaline hydrolysis",
		colour: "Colourless",
		obs: "Ester smell disappears; soap-like salt formed for long-chain esters",
		cond: "NaOH, heat",
		tip: "For fats/oils this is how soap is made. Name both products.",
		desc: "An ester is hydrolysed by alkali to the sodium salt of the acid and the alcohol."
	},
	{
		ch: "ch4",
		title: "Ethanoic Acid + Sodium Hydrogencarbonate",
		eq: "CH₃COOH + NaHCO₃ → CH₃COONa + H₂O + CO₂↑",
		type: "Acid + hydrogencarbonate",
		colour: "Colourless; lime water milky",
		obs: "Brisk effervescence",
		cond: "Room temperature",
		tip: "The test that separates carboxylic acids from alcohols.",
		desc: "Ethanoic acid liberates carbon dioxide from sodium hydrogencarbonate."
	}
];
var moreColours = [
	{
		name: "Chlorine",
		formula: "Cl₂",
		colour: "Greenish-yellow gas",
		remarks: "Chlor-alkali anode product; bleaching action.",
		swatch: "#a3e635"
	},
	{
		name: "Nitrogen dioxide",
		formula: "NO₂",
		colour: "Reddish-brown gas",
		remarks: "From heating lead nitrate.",
		swatch: "#9a3412"
	},
	{
		name: "Silver chloride",
		formula: "AgCl",
		colour: "White, turns grey in sunlight",
		remarks: "Photolytic decomposition to Ag.",
		swatch: "#f8fafc"
	},
	{
		name: "Silver bromide",
		formula: "AgBr",
		colour: "Pale yellow, turns grey in sunlight",
		remarks: "Used in black-and-white photography.",
		swatch: "#fde68a"
	},
	{
		name: "Zinc oxide (hot)",
		formula: "ZnO",
		colour: "Yellow when hot",
		remarks: "Turns white on cooling. Board favourite.",
		swatch: "#facc15"
	},
	{
		name: "Zinc oxide (cold)",
		formula: "ZnO",
		colour: "White when cold",
		remarks: "Pair with the hot colour.",
		swatch: "#f8fafc"
	},
	{
		name: "Magnesium oxide",
		formula: "MgO",
		colour: "White powder",
		remarks: "Ash after burning Mg ribbon.",
		swatch: "#f1f5f9"
	},
	{
		name: "Calcium carbonate",
		formula: "CaCO₃",
		colour: "White / milky",
		remarks: "Lime water milkiness; marble; chalk.",
		swatch: "#f8fafc"
	},
	{
		name: "Iron (rust)",
		formula: "Fe₂O₃·xH₂O",
		colour: "Reddish-brown flaky",
		remarks: "Needs both air and moisture.",
		swatch: "#9a3412"
	},
	{
		name: "Phenolphthalein in base",
		formula: "indicator",
		colour: "Pink",
		remarks: "Colourless in acid.",
		swatch: "#f472b6"
	},
	{
		name: "Methyl orange in acid",
		formula: "indicator",
		colour: "Red",
		remarks: "Yellow in base.",
		swatch: "#ef4444"
	},
	{
		name: "Red litmus in base",
		formula: "indicator",
		colour: "Turns blue",
		remarks: "Blue litmus turns red in acid.",
		swatch: "#3b82f6"
	}
];
var moreDefs = [
	{
		title: "Law of Conservation of Mass",
		body: "Mass can neither be created nor destroyed in a chemical reaction. That is why we balance chemical equations."
	},
	{
		title: "Concentration of an Ore",
		body: "Removing earthy impurities (gangue) from the ore before extraction of the metal."
	},
	{
		title: "Gangue",
		body: "The earthy or unwanted impurities present in an ore."
	},
	{
		title: "Malleability",
		body: "The property of metals of being beaten into thin sheets (e.g. gold, silver)."
	},
	{
		title: "Ductility",
		body: "The property of metals of being drawn into wires."
	},
	{
		title: "Sonority",
		body: "The property of metals of producing a ringing sound when struck."
	},
	{
		title: "Ionic Compound",
		body: "A compound formed by transfer of electrons, made of oppositely charged ions. High melting point; conducts electricity in molten or aqueous state."
	},
	{
		title: "Covalent Compound",
		body: "A compound formed by sharing of electrons. Generally low melting point and poor electrical conductivity."
	},
	{
		title: "Sacrificial Protection",
		body: "A more reactive metal is connected to iron so that it corrodes first (e.g. magnesium or zinc blocks on ships)."
	},
	{
		title: "Homologous Series (Alkanes)",
		body: "CₙH₂ₙ₊₂. Successive members differ by CH₂. Similar chemical properties, gradual change in physical properties."
	},
	{
		title: "Nomenclature (Class 10)",
		body: "Alkane names: methane, ethane, propane, butane. Alkene: ethene. Alkyne: ethyne. Alcohol: ethanol. Acid: ethanoic acid. Ester: ethyl ethanoate."
	},
	{
		title: "Electron Dot Structure",
		body: "A diagram showing valence electrons of atoms as dots (or crosses) around the symbol, used to show covalent bonding."
	},
	{
		title: "pH",
		body: "pH = −log₁₀[H⁺]. In Class 10: a number from 0 to 14 that tells how acidic or basic a solution is."
	},
	{
		title: "Strong Base",
		body: "A base that ionises almost completely in water (e.g. NaOH, KOH)."
	},
	{
		title: "Weak Base",
		body: "A base that ionises only partially in water (e.g. NH₄OH, Mg(OH)₂)."
	},
	{
		title: "Family of Salts",
		body: "Salts having the same positive ion (e.g. sodium salts) or the same negative ion (e.g. chlorides, sulphates)."
	},
	{
		title: "Cinnabar",
		body: "HgS, the ore of mercury. On heating in air it gives mercury."
	},
	{
		title: "Haematite",
		body: "Fe₂O₃, an important ore of iron."
	},
	{
		title: "Bauxite",
		body: "Al₂O₃·2H₂O, the ore of aluminium."
	},
	{
		title: "Flame Test Memory (extra)",
		body: "Not core NCERT listing, but sodium compounds give a yellow flame in lab work. Do not write unless the question asks."
	}
];
var moreNotes = [
	{
		title: "Indicator Colour Card",
		body: "Litmus: acid red · base blue\nMethyl orange: acid red · base yellow\nPhenolphthalein: acid colourless · base pink\nUniversal indicator: rainbow from red (strong acid) to purple (strong base)\nOlfactory: onion / vanilla / clove — smell lost in base for onion/vanilla."
	},
	{
		title: "pH in Daily Life",
		body: "Tooth decay if mouth pH < 5.5\nAcids in stomach (~1.2) — antacids (Mg(OH)₂, NaHCO₃)\nNettle sting: methanoic acid — dock leaf soothes\nAcid rain < 5.6 damages monuments (CaCO₃)\nFactory wastes: neutralise before discharge\nSoil: acidic soils treated with slaked lime / chalk."
	},
	{
		title: "Reactivity vs Water / Acid / Air",
		body: "K, Na: cold water, stored in kerosene, dull quickly.\nCa: cold water, less violently; sinks.\nMg: hot water / steam; burns in air with dazzling flame.\nAl, Zn, Fe: steam; Al oxide coat protects.\nPb, Cu: no H₂ with water; CuO black on heating.\nAg, Au: unreactive; found free."
	},
	{
		title: "Carbon Compounds — Formula Sheet",
		body: "Methane CH₄ · Ethane C₂H₆ · Propane C₃H₈ · Butane C₄H₁₀\nEthene C₂H₄ · Ethyne C₂H₂\nMethanol CH₃OH · Ethanol C₂H₅OH\nMethanoic HCOOH · Ethanoic CH₃COOH\nEthyl ethanoate CH₃COOC₂H₅\nFunctional groups: –OH alcohol, –COOH carboxylic acid, –COO– ester, >C=C< alkene, –C≡C– alkyne."
	},
	{
		title: "Electron-dot Practice Order",
		body: "H₂ (single) → Cl₂ / HCl → O₂ (double) → N₂ (triple) → H₂O → NH₃ → CH₄ → C₂H₄ → C₂H₂ → CO₂.\nCarbon always four bonds. Hydrogen one. Oxygen two. Nitrogen three."
	},
	{
		title: "Periodic Classification — Extra Appendix",
		body: "Removed from some recent CBSE Science papers but still taught in many classrooms:\nDobereiner triads · Newlands octaves · Mendeleev (atomic mass, periodic law, predictions of eka-silicon) · Modern periodic law (atomic number) · 18 groups, 7 periods · Metals left, non-metals right, metalloids on the zig-zag.\nValency, atomic size, metallic character trends: size increases down a group, decreases across a period; metallic character increases down, decreases across."
	},
	{
		title: "Board 3-mark Equation Pack",
		body: "Always be ready to write, balance, and add conditions for:\nMg + O₂ · CaO + H₂O · Ca(OH)₂ + CO₂ · AgCl sunlight · FeSO₄ heat · Pb(NO₃)₂ heat · Zn + CuSO₄ · BaCl₂ + Na₂SO₄ · NaCl electrolysis · Ca(OH)₂ + Cl₂ · gypsum 373 K · thermite · ZnO + C · CH₄ + Cl₂ sunlight · ethanol 443 K · esterification · saponification."
	}
];
var moreQuiz = {
	ch1: [
		{
			q: "The brown gas evolved on heating lead nitrate is identified as NO₂ because it is:",
			options: [
				"Colourless and odourless",
				"Reddish-brown and pungent",
				"Greenish-yellow",
				"Turns lime water milky"
			],
			ans: 1,
			why: "Lead nitrate gives reddish-brown nitrogen dioxide. Lime water milkiness is CO₂, not NO₂."
		},
		{
			q: "In electrolysis of water the volume ratio H₂ : O₂ is:",
			options: [
				"1 : 1",
				"1 : 2",
				"2 : 1",
				"1 : 8"
			],
			ans: 2,
			why: "From 2H₂O → 2H₂ + O₂, two volumes of hydrogen form for one volume of oxygen."
		},
		{
			q: "Photosynthesis is classified as endothermic because:",
			options: [
				"Oxygen is released",
				"Glucose is a carbohydrate",
				"Sunlight energy is absorbed",
				"Chlorophyll is green"
			],
			ans: 2,
			why: "Endothermic reactions absorb energy. Plants absorb sunlight to make glucose."
		}
	],
	ch2: [
		{
			q: "The formula of bleaching powder in NCERT is written as:",
			options: [
				"CaCl₂",
				"Ca(OCl)₂",
				"CaOCl₂",
				"CaO"
			],
			ans: 2,
			why: "Class 10 NCERT uses CaOCl₂ (calcium oxychloride)."
		},
		{
			q: "Plaster of Paris becomes dead burnt plaster if:",
			options: [
				"It is mixed with water",
				"It is heated well above 373 K",
				"It is stored in a dry box",
				"Gypsum is cooled"
			],
			ans: 1,
			why: "Excess heating drives off all water and gives anhydrous CaSO₄ that will not set."
		},
		{
			q: "Methyl orange is red in:",
			options: [
				"Strongly basic solution",
				"Acidic solution",
				"Pure ethanol",
				"Distilled water only"
			],
			ans: 1,
			why: "Methyl orange is red in acid and yellow in base."
		}
	],
	ch3: [
		{
			q: "The ore of mercury is:",
			options: [
				"Haematite",
				"Bauxite",
				"Cinnabar",
				"Calamine"
			],
			ans: 2,
			why: "Cinnabar is HgS. Haematite = iron, bauxite = aluminium, calamine = zinc carbonate."
		},
		{
			q: "Which oxide is amphoteric?",
			options: [
				"Na₂O",
				"MgO",
				"Al₂O₃",
				"CO₂"
			],
			ans: 2,
			why: "Al₂O₃ and ZnO react with both acids and bases. CO₂ is acidic; Na₂O and MgO are basic."
		},
		{
			q: "Ionic compounds conduct electricity when:",
			options: [
				"Solid only",
				"Molten or aqueous",
				"In any state",
				"Only as vapour"
			],
			ans: 1,
			why: "Ions must be free to move. In the solid lattice they are fixed."
		}
	],
	ch4: [
		{
			q: "The next homologue of C₃H₈ is:",
			options: [
				"C₂H₆",
				"C₃H₆",
				"C₄H₁₀",
				"C₄H₈"
			],
			ans: 2,
			why: "Alkanes differ by CH₂. C₃H₈ + CH₂ = C₄H₁₀ (butane)."
		},
		{
			q: "Conc. H₂SO₄ at 443 K converts ethanol into:",
			options: [
				"Ethane",
				"Ethene",
				"Ethanoic acid",
				"Ethyne"
			],
			ans: 1,
			why: "Dehydration of ethanol with conc. H₂SO₄ at 443 K gives ethene."
		},
		{
			q: "The cleansing action of soap is due to:",
			options: [
				"High pH only",
				"Micelle formation",
				"Evaporation of water",
				"Catenation"
			],
			ans: 1,
			why: "Soap molecules form micelles that trap oil in the hydrophobic core."
		}
	]
};
var indicators = [
	{
		name: "Blue litmus",
		acid: "Red",
		base: "Stays blue",
		notes: "Natural dye on paper"
	},
	{
		name: "Red litmus",
		acid: "Stays red",
		base: "Blue",
		notes: "Natural dye on paper"
	},
	{
		name: "Methyl orange",
		acid: "Red",
		base: "Yellow",
		notes: "Synthetic; sharp change"
	},
	{
		name: "Phenolphthalein",
		acid: "Colourless",
		base: "Pink",
		notes: "Colourless in acid and in pure water"
	},
	{
		name: "Universal indicator",
		acid: "Red → orange → yellow",
		base: "Green → blue → purple",
		notes: "Gives approximate pH"
	},
	{
		name: "Onion (olfactory)",
		acid: "Characteristic smell remains",
		base: "Smell lost",
		notes: "No colour change"
	},
	{
		name: "Vanilla",
		acid: "Smell remains",
		base: "Smell lost",
		notes: "Olfactory indicator"
	}
];
var pHGuide = [
	{
		item: "Gastric juice",
		pH: "~1.2",
		tag: "Strongly acidic"
	},
	{
		item: "Lemon juice",
		pH: "~2.2",
		tag: "Acidic"
	},
	{
		item: "Vinegar",
		pH: "~2.9",
		tag: "Acidic"
	},
	{
		item: "Tomato juice",
		pH: "~4.1",
		tag: "Weakly acidic"
	},
	{
		item: "Rain (unpolluted)",
		pH: "~5.6",
		tag: "Slightly acidic"
	},
	{
		item: "Milk",
		pH: "~6.6",
		tag: "Nearly neutral"
	},
	{
		item: "Pure water",
		pH: "7.0",
		tag: "Neutral"
	},
	{
		item: "Blood",
		pH: "7.4",
		tag: "Slightly basic"
	},
	{
		item: "Sea water",
		pH: "~8.5",
		tag: "Basic"
	},
	{
		item: "Milk of magnesia",
		pH: "~10",
		tag: "Basic"
	},
	{
		item: "Sodium hydroxide",
		pH: "~14",
		tag: "Strongly basic"
	}
];
var series = [
	"K",
	"Na",
	"Ca",
	"Mg",
	"Al",
	"Zn",
	"Fe",
	"Pb",
	"H",
	"Cu",
	"Hg",
	"Ag",
	"Au"
];
var functionalGroups = [
	{
		name: "Halo",
		group: "—X (Cl, Br, I)",
		example: "Chloroethane"
	},
	{
		name: "Alcohol",
		group: "—OH",
		example: "Ethanol"
	},
	{
		name: "Aldehyde",
		group: "—CHO",
		example: "Methanal (mentioned with groups)"
	},
	{
		name: "Ketone",
		group: ">C=O",
		example: "Propanone (mentioned with groups)"
	},
	{
		name: "Carboxylic acid",
		group: "—COOH",
		example: "Ethanoic acid"
	},
	{
		name: "Ester",
		group: "—COO—",
		example: "Ethyl ethanoate"
	},
	{
		name: "Alkene",
		group: ">C=C<",
		example: "Ethene"
	},
	{
		name: "Alkyne",
		group: "—C≡C—",
		example: "Ethyne"
	}
];
var credits = [
	{
		name: "Udirn",
		role: "Creator"
	},
	{
		name: "Ansh",
		role: "Creator"
	},
	{
		name: "Aryan",
		role: "Creator"
	},
	{
		name: "Grok AI",
		role: "Build partner"
	}
];
/** Assertion–reason and case-based papers — additive, original MCQs stay intact. */
var plusQuiz = {
	ch1: [
		{
			kind: "assertion",
			mark: "2",
			q: "Assertion (A): Silver chloride turns grey in sunlight.\nReason (R): Silver chloride undergoes photolytic decomposition forming silver metal.\nChoose the correct option.",
			options: [
				"Both A and R are true and R is the correct explanation of A",
				"Both A and R are true but R is not the correct explanation of A",
				"A is true but R is false",
				"A is false but R is true"
			],
			ans: 0,
			why: "Step 1: A is true — white AgCl turns grey in sunlight (NCERT activity).\nStep 2: R is true — 2AgCl(s) → 2Ag(s) + Cl₂(g) in light.\nStep 3: The grey colour is the finely divided silver, so R explains A."
		},
		{
			kind: "assertion",
			mark: "2",
			q: "Assertion (A): Respiration is an exothermic reaction.\nReason (R): Glucose is oxidised in cells and energy is released.\nChoose the correct option.",
			options: [
				"Both A and R are true and R is the correct explanation of A",
				"Both A and R are true but R is not the correct explanation of A",
				"A is true but R is false",
				"A is false but R is true"
			],
			ans: 0,
			why: "Step 1: A is true — NCERT lists respiration as exothermic.\nStep 2: R is true — C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + energy.\nStep 3: Released energy is why it is called exothermic, so R explains A."
		},
		{
			kind: "case",
			mark: "3",
			q: "Case: Green crystals of ferrous sulphate are heated strongly. The colour changes and a gas smelling of burning sulphur is evolved.\nThe brown residue left in the tube is:",
			options: [
				"FeO",
				"FeSO₄",
				"Fe₂O₃",
				"FeS"
			],
			ans: 2,
			why: "Step 1: Write the equation: 2FeSO₄(s) → Fe₂O₃(s) + SO₂(g) + SO₃(g).\nStep 2: The residue is ferric oxide, reddish-brown.\nStep 3: The burning-sulphur smell is SO₂ (with SO₃). FeO / FeS are not the NCERT products."
		},
		{
			kind: "case",
			mark: "3",
			q: "Case: A strip of iron is placed in blue copper sulphate solution. After some time the solution turns pale green and a brown coating appears on iron.\nThis reaction is:",
			options: [
				"Combination",
				"Double displacement",
				"Displacement and redox",
				"Photolytic decomposition"
			],
			ans: 2,
			why: "Step 1: Fe + CuSO₄ → FeSO₄ + Cu. Iron displaces copper.\nStep 2: Blue Cu²⁺ is replaced by pale-green Fe²⁺; brown Cu metal deposits.\nStep 3: Fe is oxidised, Cu²⁺ is reduced — so it is displacement as well as redox."
		}
	],
	ch2: [
		{
			kind: "assertion",
			mark: "2",
			q: "Assertion (A): Tooth enamel starts dissolving when the pH in the mouth falls below 5.5.\nReason (R): Enamel is made of calcium phosphate, which is attacked by acids.\nChoose the correct option.",
			options: [
				"Both A and R are true and R is the correct explanation of A",
				"Both A and R are true but R is not the correct explanation of A",
				"A is true but R is false",
				"A is false but R is true"
			],
			ans: 0,
			why: "Step 1: A is the NCERT pH value for enamel attack.\nStep 2: R is true — enamel is calcium phosphate / hydroxyapatite.\nStep 3: Bacterial acids after sugar lower pH and dissolve that phosphate, so R explains A."
		},
		{
			kind: "assertion",
			mark: "2",
			q: "Assertion (A): Baking soda has water of crystallisation.\nReason (R): The formula of baking soda is NaHCO₃.\nChoose the correct option.",
			options: [
				"Both A and R are true and R is the correct explanation of A",
				"Both A and R are true but R is not the correct explanation of A",
				"A is true but R is false",
				"A is false but R is true"
			],
			ans: 3,
			why: "Step 1: A is false — NaHCO₃ has no water of crystallisation (unlike washing soda, gypsum, blue vitriol).\nStep 2: R is true — baking soda is sodium hydrogencarbonate, NaHCO₃.\nStep 3: Correct choice is A false, R true."
		},
		{
			kind: "case",
			mark: "3",
			q: "Case: Brine is electrolysed. A gas that bleaches moist litmus is collected at one electrode and a gas that burns with a pop at the other. The solution left is used to make soap.\nThe bleaching gas is:",
			options: [
				"H₂ at the cathode",
				"Cl₂ at the anode",
				"O₂ at the anode",
				"CO₂ at the cathode"
			],
			ans: 1,
			why: "Step 1: Chlor-alkali: 2NaCl(aq) + 2H₂O → 2NaOH + Cl₂ + H₂.\nStep 2: Cl₂ (greenish-yellow) is liberated at the anode and bleaches moist litmus.\nStep 3: H₂ (pop) is at the cathode; NaOH remains in solution and is used for soap."
		},
		{
			kind: "case",
			mark: "3",
			q: "Case: Gypsum is heated at 373 K to get a white powder used for setting fractured bones. If this powder is heated much more strongly it will not set with water.\nThe white powder is:",
			options: [
				"CaSO₄·2H₂O",
				"CaSO₄·½H₂O",
				"CaSO₄ (dead burnt)",
				"CaOCl₂"
			],
			ans: 1,
			why: "Step 1: Gypsum CaSO₄·2H₂O at 373 K → Plaster of Paris CaSO₄·½H₂O.\nStep 2: POP sets with water back to gypsum — used for casts.\nStep 3: Stronger heating gives anhydrous CaSO₄ (dead burnt plaster) that will not set. Bleaching powder is CaOCl₂, unrelated."
		}
	],
	ch3: [
		{
			kind: "assertion",
			mark: "2",
			q: "Assertion (A): Aluminium oxide is amphoteric.\nReason (R): Al₂O₃ reacts with both acids and bases to give salt and water.\nChoose the correct option.",
			options: [
				"Both A and R are true and R is the correct explanation of A",
				"Both A and R are true but R is not the correct explanation of A",
				"A is true but R is false",
				"A is false but R is true"
			],
			ans: 0,
			why: "Step 1: A is true — NCERT lists Al₂O₃ and ZnO as amphoteric.\nStep 2: R is the definition of an amphoteric oxide.\nStep 3: Therefore R is the correct explanation of A. Write both acid and base equations in 3-mark answers."
		},
		{
			kind: "assertion",
			mark: "2",
			q: "Assertion (A): Roasting is used for carbonate ores.\nReason (R): Roasting is heating in excess air, typically converting sulphide ores to oxides.\nChoose the correct option.",
			options: [
				"Both A and R are true and R is the correct explanation of A",
				"Both A and R are true but R is not the correct explanation of A",
				"A is true but R is false",
				"A is false but R is true"
			],
			ans: 3,
			why: "Step 1: A is false — carbonate ores are calcined (limited air).\nStep 2: R is true — roasting = sulphide ore + excess air → oxide + SO₂.\nStep 3: So A is false and R is true. Mixing roasting with calcination is a classic mark-loss."
		},
		{
			kind: "case",
			mark: "3",
			q: "Case: A mixture of Fe₂O₃ and aluminium powder is ignited. The reaction is highly exothermic and molten iron is produced, used to join railway tracks.\nAluminium here acts as:",
			options: [
				"Oxidising agent",
				"Reducing agent",
				"Catalyst",
				"Flux"
			],
			ans: 1,
			why: "Step 1: Thermite: Fe₂O₃ + 2Al → 2Fe + Al₂O₃ + heat.\nStep 2: Al takes oxygen from Fe₂O₃, so Al is oxidised and is the reducing agent.\nStep 3: Molten iron produced welds the tracks. Not a catalyst — Al is consumed."
		},
		{
			kind: "case",
			mark: "3",
			q: "Case: Sodium is stored under kerosene. A small piece dropped on water darts about, melts, and the gas evolved burns with a yellow flame.\nSodium is stored under kerosene because it:",
			options: [
				"Is denser than kerosene only",
				"Reacts vigorously with air and moisture",
				"Dissolves in water slowly",
				"Is a non-metal"
			],
			ans: 1,
			why: "Step 1: Na is at the top of the reactivity series.\nStep 2: It reacts with oxygen and moisture of air, so oil/kerosene cuts off air.\nStep 3: With water: 2Na + 2H₂O → 2NaOH + H₂; the yellow flame is sodium, the pop is hydrogen."
		}
	],
	ch4: [
		{
			kind: "assertion",
			mark: "2",
			q: "Assertion (A): Ethene decolourises bromine water.\nReason (R): Unsaturated hydrocarbons undergo addition reactions.\nChoose the correct option.",
			options: [
				"Both A and R are true and R is the correct explanation of A",
				"Both A and R are true but R is not the correct explanation of A",
				"A is true but R is false",
				"A is false but R is true"
			],
			ans: 0,
			why: "Step 1: A is true — reddish-brown Br₂ water is decolourised by ethene.\nStep 2: R is true — alkenes add Br₂ across the C=C.\nStep 3: The addition of bromine is exactly why the colour vanishes, so R explains A. Saturated hydrocarbons do not do this in the cold."
		},
		{
			kind: "assertion",
			mark: "2",
			q: "Assertion (A): Soaps form scum with hard water.\nReason (R): Ca²⁺ and Mg²⁺ ions give insoluble calcium and magnesium salts of fatty acids.\nChoose the correct option.",
			options: [
				"Both A and R are true and R is the correct explanation of A",
				"Both A and R are true but R is not the correct explanation of A",
				"A is true but R is false",
				"A is false but R is true"
			],
			ans: 0,
			why: "Step 1: A is true — soaps do not lather well in hard water.\nStep 2: R is true — scum is Ca/Mg salts of the soap’s fatty acids.\nStep 3: That precipitate is the scum, so R explains A. Detergents avoid this."
		},
		{
			kind: "case",
			mark: "3",
			q: "Case: Ethanol is heated with conc. H₂SO₄ at 443 K. A gas is evolved which decolourises bromine water.\nThe organic product is:",
			options: [
				"Ethane",
				"Ethene",
				"Ethyne",
				"Ethanoic acid"
			],
			ans: 1,
			why: "Step 1: Dehydration: C₂H₅OH → C₂H₄ + H₂O (conc. H₂SO₄, 443 K).\nStep 2: Ethene is unsaturated, so it decolourises bromine water.\nStep 3: Oxidation of ethanol (KMnO₄/K₂Cr₂O₇) would give ethanoic acid, not this gas. 443 K is the key condition."
		},
		{
			kind: "case",
			mark: "3",
			q: "Case: A student mixes ethanoic acid and ethanol with a few drops of conc. H₂SO₄ and warms the tube. A sweet, fruity smell is noticed.\nThe reaction is called:",
			options: [
				"Saponification",
				"Esterification",
				"Addition",
				"Substitution"
			],
			ans: 1,
			why: "Step 1: CH₃COOH + C₂H₅OH ⇌ CH₃COOC₂H₅ + H₂O, catalysed by conc. H₂SO₄.\nStep 2: The fruity smell is the ester ethyl ethanoate.\nStep 3: Saponification is the reverse (alkaline hydrolysis of an ester to soap + alcohol)."
		}
	]
};
var notes$1 = [
	{
		"title": "How to Identify Reaction Type Instantly",
		"body": "**Combination:** Many reactants → One product\n\n          **Decomposition:** One reactant → Many products\n\n          **Displacement:** A + BC → AC + B\n\n          **Double Displacement:** AB + CD → AD + CB\n\n          **Redox:** Oxidation and reduction occur together\n\n          **Neutralisation:** Acid + Base → Salt + Water"
	},
	{
		"title": "Oxidation & Reduction Shortcut (Class 10 Level)",
		"body": "**Oxidation:** Gain of oxygen **or** Loss of hydrogen\n\n          **Reduction:** Loss of oxygen **or** Gain of hydrogen\n\n          When both happen in the same reaction → **Redox reaction**.\n\n          Example: CuO + H₂ → Cu + H₂O\n\n          CuO is reduced, H₂ is oxidised."
	},
	{
		"title": "Must-Remember Colour Changes",
		"body": "CuSO₄ (blue) → FeSO₄ (pale green) + Cu (reddish-brown)\n\n          Cu → CuO (black) on heating\n\n          CuO (black) → Cu (reddish-brown) by H₂\n\n          FeSO₄ (green) → Fe₂O₃ (brown) on heating\n\n          Pb(NO₃)₂ → PbO (yellow) + NO₂ (brown gas)\n\n          AgCl (white) → Ag (grey) in sunlight\n\n          ZnO : yellow when hot, white when cold\n\n          PbI₂ : bright yellow precipitate"
	},
	{
		"title": "Important Gas Tests",
		"body": "**H₂:** Burns with a pop sound\n\n          **O₂:** Relights a glowing splint\n\n          **CO₂:** Turns lime water milky\n\n          **Cl₂:** Greenish-yellow gas, bleaching action\n\n          **SO₂:** Colourless gas with burning sulphur smell\n\n          **NO₂:** Brown fumes"
	},
	{
		"title": "State Symbols & Arrows",
		"body": "(s) = solid    (l) = liquid    (g) = gas    (aq) = aqueous solution\n\n          ↓ = precipitate    ↑ = gas evolved\n\n          Always write state symbols in board answers when asked."
	},
	{
		"title": "Conditions That Must Be Written",
		"body": "Heat, sunlight, electricity, catalyst (Ni, Pd), conc. H₂SO₄, 443 K, excess air, limited air, electrolysis of brine, etc.\n\n          Missing the condition often costs marks in equation questions."
	},
	{
		"title": "Reactivity Series (Must Memorise)",
		"body": "K > Na > Ca > Mg > Al > Zn > Fe > Pb > (H) > Cu > Hg > Ag > Au\n\n          A metal can displace any metal that is below it from its salt solution."
	},
	{
		"title": "Amphoteric Oxides",
		"body": "Al₂O₃ and ZnO react with both acids and bases.\n\n          This is a very common 2 or 3 mark question.\n\n          Always write both reactions when asked."
	},
	{
		"title": "Roasting vs Calcination",
		"body": "**Roasting:** Sulphide ore + excess air → Oxide + SO₂\n\n          **Calcination:** Carbonate ore + limited air → Oxide + CO₂\n\n          Both are done before reduction of the metal oxide."
	},
	{
		"title": "Thermite Reaction – Key Points",
		"body": "Fe₂O₃ + 2Al → 2Fe + Al₂O₃ + Heat\n\n          Aluminium acts as reducing agent.\n\n          Highly exothermic → molten iron produced.\n\n          Used for welding railway tracks."
	},
	{
		"title": "Prevention of Corrosion / Rusting",
		"body": "1. Painting\n\n          2. Oiling / Greasing\n\n          3. Galvanisation (coating with zinc)\n\n          4. Chrome plating\n\n          5. Anodising\n\n          6. Making alloys (stainless steel)\n\n          7. Sacrificial protection"
	},
	{
		"title": "Prevention of Rancidity",
		"body": "1. Adding antioxidants\n\n          2. Refrigeration\n\n          3. Storing in airtight containers\n\n          4. Flushing with nitrogen gas\n\n          5. Keeping away from light"
	},
	{
		"title": "Important pH Values",
		"body": "Gastric juice → ~1.2 (highly acidic)\n\n          Lemon juice → ~2.2\n\n          Pure water / NaCl → 7 (neutral)\n\n          Blood → 7.4\n\n          Milk of magnesia → ~10\n\n          Sodium hydroxide → ~14"
	},
	{
		"title": "Important Salts – Formulae & Uses",
		"body": "Bleaching powder → CaOCl₂ → bleaching & disinfectant\n\n          Baking soda → NaHCO₃ → baking, antacid, fire extinguisher\n\n          Washing soda → Na₂CO₃·10H₂O → cleaning, glass, removing hardness\n\n          Plaster of Paris → CaSO₄·½H₂O → casts, statues\n\n          Gypsum → CaSO₄·2H₂O → source of POP"
	},
	{
		"title": "Carbon Chapter – Quick Rules",
		"body": "Saturated → Substitution reaction\n\n          Unsaturated → Addition reaction\n\n          Alcohol + Carboxylic acid → Ester (esterification)\n\n          Ester + NaOH → Soap + Alcohol (saponification)\n\n          Ethanol + Na → Sodium ethoxide + H₂\n\n          Ethanol + conc. H₂SO₄ (443 K) → Ethene"
	},
	{
		"title": "Common Mistakes That Cost Marks",
		"body": "• Forgetting to balance the equation\n\n          • Missing state symbols when asked\n\n          • Writing wrong condition (especially 443 K, sunlight, heat)\n\n          • Confusing roasting and calcination\n\n          • Writing CuSO₄ colour as green instead of blue\n\n          • Forgetting that ZnO is yellow when hot"
	},
	{
		"title": "How to Predict Displacement",
		"body": "Look at the reactivity series.\n\n          Only a metal placed **above** another metal can displace it from its salt solution.\n\n          Example: Zn can displace Cu, Fe, Ag etc. but Cu cannot displace Zn."
	},
	{
		"title": "Ionic vs Covalent Compounds (Quick Difference)",
		"body": "**Ionic:** Metal + Non-metal, electron transfer, high melting point, conduct electricity in molten/aqueous state\n\n          **Covalent:** Non-metal + Non-metal, electron sharing, low melting point, generally do not conduct electricity"
	},
	{
		"title": "Why Carbon Forms Large Number of Compounds",
		"body": "1. Catenation (self-linking ability)\n\n          2. Tetravalency\n\n          3. Ability to form single, double and triple bonds\n\n          4. Ability to form straight chains, branched chains and rings"
	},
	{
		"title": "Soap vs Detergent (Exam Point)",
		"body": "Soaps form scum with hard water.\n\n          Detergents work well even in hard water because they do not form insoluble scum with calcium and magnesium ions."
	}
];
var quizData$1 = {
	ch1: [
		{
			q: "Which of the following is a decomposition reaction?",
			options: [
				"2Mg + O₂ → 2MgO",
				"CaCO₃ → CaO + CO₂",
				"Zn + CuSO₄ → ZnSO₄ + Cu",
				"NaOH + HCl → NaCl + H₂O"
			],
			ans: 1
		},
		{
			q: "When silver chloride is exposed to sunlight, it turns grey because of the formation of:",
			options: [
				"Silver oxide",
				"Silver carbonate",
				"Silver metal",
				"Silver nitrate"
			],
			ans: 2
		},
		{
			q: "The brown fumes evolved on heating lead nitrate are of:",
			options: [
				"NO",
				"N₂O",
				"NO₂",
				"N₂O₅"
			],
			ans: 2
		},
		{
			q: "In the reaction Fe + CuSO₄ → FeSO₄ + Cu, the colour change observed is:",
			options: [
				"Blue to green",
				"Green to blue",
				"Blue to colourless",
				"Green to colourless"
			],
			ans: 0
		},
		{
			q: "Which of the following is an example of a photolytic decomposition reaction?",
			options: [
				"2FeSO₄ → Fe₂O₃ + SO₂ + SO₃",
				"2AgBr → 2Ag + Br₂",
				"CaCO₃ → CaO + CO₂",
				"2H₂O → 2H₂ + O₂"
			],
			ans: 1
		},
		{
			q: "Respiration is regarded as an exothermic reaction because:",
			options: [
				"Glucose is broken down",
				"Energy is absorbed",
				"Energy is released",
				"Oxygen is used"
			],
			ans: 2
		},
		{
			q: "The reaction 2H₂ + O₂ → 2H₂O is an example of:",
			options: [
				"Decomposition",
				"Displacement",
				"Combination",
				"Double displacement"
			],
			ans: 2
		},
		{
			q: "Rancidity can be prevented by:",
			options: [
				"Keeping food in airtight containers",
				"Adding antioxidants",
				"Flushing with nitrogen",
				"All of these"
			],
			ans: 3
		},
		{
			q: "In the electrolysis of water, the gas collected at the cathode is:",
			options: [
				"Oxygen",
				"Hydrogen",
				"Chlorine",
				"Nitrogen"
			],
			ans: 1
		},
		{
			q: "Which of the following reactions is a redox reaction?",
			options: [
				"NaOH + HCl → NaCl + H₂O",
				"BaCl₂ + Na₂SO₄ → BaSO₄ + 2NaCl",
				"CuO + H₂ → Cu + H₂O",
				"CaCO₃ → CaO + CO₂"
			],
			ans: 2
		},
		{
			q: "The white precipitate formed when BaCl₂ reacts with Na₂SO₄ is:",
			options: [
				"BaSO₃",
				"BaSO₄",
				"BaCl₂",
				"NaCl"
			],
			ans: 1
		},
		{
			q: "Quick lime reacts with water to form:",
			options: [
				"Limestone",
				"Slaked lime",
				"Calcium carbonate",
				"Calcium sulphate"
			],
			ans: 1
		},
		{
			q: "Which metal is more reactive than iron but less reactive than zinc?",
			options: [
				"Cu",
				"Pb",
				"Al",
				"None of these (according to series)"
			],
			ans: 3
		},
		{
			q: "The chemical formula of rust is:",
			options: [
				"FeO",
				"Fe₂O₃",
				"Fe₂O₃·xH₂O",
				"Fe₃O₄"
			],
			ans: 2
		},
		{
			q: "When copper is heated in air, the black coating formed is of:",
			options: [
				"Cu₂O",
				"CuO",
				"CuCO₃",
				"Cu(OH)₂"
			],
			ans: 1
		},
		{
			q: "In the reaction Zn + H₂SO₄ → ZnSO₄ + H₂, zinc is:",
			options: [
				"Oxidised",
				"Reduced",
				"Neither",
				"Both"
			],
			ans: 0
		},
		{
			q: "A solution of AgNO₃ is mixed with NaCl. The precipitate formed is:",
			options: [
				"White and soluble",
				"White and insoluble",
				"Yellow and insoluble",
				"No precipitate"
			],
			ans: 1
		},
		{
			q: "Which of the following is not a combination reaction?",
			options: [
				"CaO + H₂O → Ca(OH)₂",
				"2H₂ + O₂ → 2H₂O",
				"CaCO₃ → CaO + CO₂",
				"C + O₂ → CO₂"
			],
			ans: 2
		},
		{
			q: "The reaction used in whitewashing is:",
			options: [
				"CaO + H₂O → Ca(OH)₂",
				"Ca(OH)₂ + CO₂ → CaCO₃ + H₂O",
				"Both A and B",
				"None"
			],
			ans: 2
		},
		{
			q: "Which gas is produced when dilute HCl reacts with zinc?",
			options: [
				"CO₂",
				"H₂",
				"Cl₂",
				"O₂"
			],
			ans: 1
		}
	],
	ch2: [
		{
			q: "The chemical formula of bleaching powder is:",
			options: [
				"CaCl₂",
				"CaOCl₂",
				"Ca(OCl)₂",
				"CaO"
			],
			ans: 1
		},
		{
			q: "When CO₂ is passed through lime water, it turns milky due to the formation of:",
			options: [
				"CaO",
				"Ca(OH)₂",
				"CaCO₃",
				"Ca(HCO₃)₂"
			],
			ans: 2
		},
		{
			q: "On passing excess CO₂ through the milky lime water, the milkiness disappears because of the formation of:",
			options: [
				"CaCO₃",
				"Ca(HCO₃)₂",
				"CaO",
				"CaCl₂"
			],
			ans: 1
		},
		{
			q: "Plaster of Paris is obtained by heating gypsum at:",
			options: [
				"100°C",
				"373 K",
				"573 K",
				"273 K"
			],
			ans: 1
		},
		{
			q: "The products of chlor-alkali process are:",
			options: [
				"NaOH, Cl₂, H₂",
				"NaCl, Cl₂, H₂",
				"NaOH, HCl, H₂",
				"Na₂CO₃, Cl₂, H₂"
			],
			ans: 0
		},
		{
			q: "Which of the following is an olfactory indicator?",
			options: [
				"Litmus",
				"Phenolphthalein",
				"Onion",
				"Methyl orange"
			],
			ans: 2
		},
		{
			q: "Baking soda on heating gives:",
			options: [
				"Na₂CO₃ + H₂O + CO₂",
				"NaOH + CO₂",
				"NaCl + H₂O",
				"Na₂O + CO₂"
			],
			ans: 0
		},
		{
			q: "The pH of pure water is:",
			options: [
				"0",
				"7",
				"14",
				"1"
			],
			ans: 1
		},
		{
			q: "Which acid is present in vinegar?",
			options: [
				"Citric acid",
				"Acetic acid",
				"Lactic acid",
				"Formic acid"
			],
			ans: 1
		},
		{
			q: "Tooth enamel is made of:",
			options: [
				"Calcium carbonate",
				"Calcium phosphate",
				"Calcium sulphate",
				"Calcium chloride"
			],
			ans: 1
		},
		{
			q: "Aqueous solution of sodium carbonate is:",
			options: [
				"Acidic",
				"Basic",
				"Neutral",
				"Amphoteric"
			],
			ans: 1
		},
		{
			q: "Which of the following salts does not contain water of crystallisation?",
			options: [
				"Blue vitriol",
				"Washing soda",
				"Baking soda",
				"Gypsum"
			],
			ans: 2
		},
		{
			q: "The reaction between an acid and a base to form salt and water is called:",
			options: [
				"Combination",
				"Decomposition",
				"Neutralisation",
				"Displacement"
			],
			ans: 2
		},
		{
			q: "When zinc reacts with sodium hydroxide, the gas evolved is:",
			options: [
				"CO₂",
				"H₂",
				"O₂",
				"Cl₂"
			],
			ans: 1
		},
		{
			q: "Methyl orange shows which colour in basic medium?",
			options: [
				"Red",
				"Yellow",
				"Pink",
				"Colourless"
			],
			ans: 1
		},
		{
			q: "Phenolphthalein is colourless in:",
			options: [
				"Acidic medium",
				"Basic medium",
				"Neutral medium",
				"Both acidic and neutral"
			],
			ans: 0
		},
		{
			q: "The chemical name of washing soda is:",
			options: [
				"Sodium carbonate",
				"Sodium hydrogen carbonate",
				"Sodium carbonate decahydrate",
				"Sodium hydroxide"
			],
			ans: 2
		},
		{
			q: "Gypsum is:",
			options: [
				"CaSO₄·½H₂O",
				"CaSO₄·2H₂O",
				"CaSO₄",
				"CaOCl₂"
			],
			ans: 1
		},
		{
			q: "Which of the following is used as an antacid?",
			options: [
				"NaOH",
				"NaHCO₃",
				"Na₂CO₃",
				"CaOCl₂"
			],
			ans: 1
		},
		{
			q: "In the reaction CuO + 2HCl → CuCl₂ + H₂O, CuO acts as:",
			options: [
				"Acid",
				"Base",
				"Salt",
				"Indicator"
			],
			ans: 1
		}
	],
	ch3: [
		{
			q: "Which of the following metals reacts vigorously with cold water?",
			options: [
				"Mg",
				"Al",
				"Na",
				"Zn"
			],
			ans: 2
		},
		{
			q: "The correct order of reactivity is:",
			options: [
				"Zn > Fe > Cu",
				"Cu > Fe > Zn",
				"Fe > Zn > Cu",
				"Zn > Cu > Fe"
			],
			ans: 0
		},
		{
			q: "Aluminium oxide is:",
			options: [
				"Acidic",
				"Basic",
				"Amphoteric",
				"Neutral"
			],
			ans: 2
		},
		{
			q: "The process of coating iron with zinc is called:",
			options: [
				"Anodising",
				"Galvanisation",
				"Electroplating",
				"Alloying"
			],
			ans: 1
		},
		{
			q: "Thermite reaction is used for:",
			options: [
				"Extraction of iron",
				"Welding railway tracks",
				"Making alloys",
				"Purification of metals"
			],
			ans: 1
		},
		{
			q: "Roasting is done for which type of ores?",
			options: [
				"Carbonate",
				"Sulphide",
				"Oxide",
				"Chloride"
			],
			ans: 1
		},
		{
			q: "Calcination is done for which type of ores?",
			options: [
				"Sulphide",
				"Carbonate",
				"Oxide",
				"Nitrate"
			],
			ans: 1
		},
		{
			q: "Which metal is stored under kerosene?",
			options: [
				"Mg",
				"Al",
				"Na",
				"Zn"
			],
			ans: 2
		},
		{
			q: "The chemical formula of rust is:",
			options: [
				"FeO",
				"Fe₂O₃",
				"Fe₂O₃·xH₂O",
				"Fe₃O₄"
			],
			ans: 2
		},
		{
			q: "Which of the following is an ionic compound?",
			options: [
				"CH₄",
				"H₂O",
				"NaCl",
				"CO₂"
			],
			ans: 2
		},
		{
			q: "In the reactivity series, hydrogen is placed between:",
			options: [
				"Cu and Ag",
				"Pb and Cu",
				"Fe and Pb",
				"Zn and Fe"
			],
			ans: 1
		},
		{
			q: "Zinc oxide is:",
			options: [
				"Acidic",
				"Basic",
				"Amphoteric",
				"Neutral"
			],
			ans: 2
		},
		{
			q: "Which gas is evolved when a metal reacts with dilute acid?",
			options: [
				"CO₂",
				"H₂",
				"O₂",
				"N₂"
			],
			ans: 1
		},
		{
			q: "Anodising is done for which metal?",
			options: [
				"Iron",
				"Copper",
				"Aluminium",
				"Zinc"
			],
			ans: 2
		},
		{
			q: "In the reaction ZnO + C → Zn + CO, carbon acts as:",
			options: [
				"Oxidising agent",
				"Reducing agent",
				"Catalyst",
				"None"
			],
			ans: 1
		},
		{
			q: "Which of the following metals does not react with dilute HCl?",
			options: [
				"Zn",
				"Fe",
				"Cu",
				"Mg"
			],
			ans: 2
		},
		{
			q: "The property of metals by which they can be beaten into thin sheets is called:",
			options: [
				"Ductility",
				"Malleability",
				"Sonority",
				"Conductivity"
			],
			ans: 1
		},
		{
			q: "Brass is an alloy of:",
			options: [
				"Cu and Zn",
				"Cu and Sn",
				"Cu and Ni",
				"Fe and Cr"
			],
			ans: 0
		},
		{
			q: "Bronze is an alloy of:",
			options: [
				"Cu and Zn",
				"Cu and Sn",
				"Cu and Al",
				"Fe and Ni"
			],
			ans: 1
		},
		{
			q: "Which of the following is not a method to prevent corrosion?",
			options: [
				"Painting",
				"Galvanisation",
				"Alloying",
				"Heating the metal"
			],
			ans: 3
		}
	],
	ch4: [
		{
			q: "The number of covalent bonds in methane is:",
			options: [
				"1",
				"2",
				"3",
				"4"
			],
			ans: 3
		},
		{
			q: "Which of the following is an unsaturated hydrocarbon?",
			options: [
				"CH₄",
				"C₂H₆",
				"C₂H₄",
				"C₃H₈"
			],
			ans: 2
		},
		{
			q: "The functional group present in ethanol is:",
			options: [
				"–CHO",
				"–COOH",
				"–OH",
				"–CO"
			],
			ans: 2
		},
		{
			q: "Esterification reaction is the reaction between:",
			options: [
				"Acid and base",
				"Acid and alcohol",
				"Alcohol and sodium",
				"Acid and sodium carbonate"
			],
			ans: 1
		},
		{
			q: "The catalyst used in hydrogenation of oils is:",
			options: [
				"Fe",
				"Ni",
				"Pt",
				"Both Ni and Pt"
			],
			ans: 3
		},
		{
			q: "Saponification is the process of:",
			options: [
				"Making soap",
				"Making ester",
				"Making alcohol",
				"Making acid"
			],
			ans: 0
		},
		{
			q: "Ethene on hydrogenation gives:",
			options: [
				"Ethane",
				"Ethyne",
				"Methane",
				"Propane"
			],
			ans: 0
		},
		{
			q: "The reaction of ethanol with sodium gives:",
			options: [
				"Sodium ethoxide + H₂",
				"Sodium acetate + H₂",
				"Sodium carbonate + H₂",
				"No reaction"
			],
			ans: 0
		},
		{
			q: "Dehydration of ethanol with conc. H₂SO₄ at 443 K gives:",
			options: [
				"Ethane",
				"Ethene",
				"Ethyne",
				"Methane"
			],
			ans: 1
		},
		{
			q: "Which of the following compounds has a fruity smell?",
			options: [
				"Ethanol",
				"Ethanoic acid",
				"Ethyl ethanoate",
				"Methane"
			],
			ans: 2
		},
		{
			q: "The molecular formula of ethanoic acid is:",
			options: [
				"CH₃OH",
				"CH₃COOH",
				"C₂H₅OH",
				"HCOOH"
			],
			ans: 1
		},
		{
			q: "Carbon forms a large number of compounds mainly due to:",
			options: [
				"Tetravalency only",
				"Catenation only",
				"Both tetravalency and catenation",
				"Ductility"
			],
			ans: 2
		},
		{
			q: "In a homologous series, successive members differ by:",
			options: [
				"CH₃",
				"CH₂",
				"CH",
				"C₂H₅"
			],
			ans: 1
		},
		{
			q: "Which type of reaction is shown by saturated hydrocarbons with chlorine in sunlight?",
			options: [
				"Addition",
				"Substitution",
				"Combustion",
				"Decomposition"
			],
			ans: 1
		},
		{
			q: "Soaps do not work well in hard water because:",
			options: [
				"They form scum",
				"They are acidic",
				"They are basic",
				"They evaporate"
			],
			ans: 0
		},
		{
			q: "The structure of methane is:",
			options: [
				"Linear",
				"Planar",
				"Tetrahedral",
				"Pyramidal"
			],
			ans: 2
		},
		{
			q: "Which of the following is used as a fuel as well as a solvent?",
			options: [
				"Methane",
				"Ethanol",
				"Ethanoic acid",
				"Ethene"
			],
			ans: 1
		},
		{
			q: "Vinegar is a dilute solution of:",
			options: [
				"Ethanol",
				"Ethanoic acid",
				"Methanol",
				"Formic acid"
			],
			ans: 1
		},
		{
			q: "The reaction CH₃COOH + C₂H₅OH ⇌ CH₃COOC₂H₅ + H₂O is catalysed by:",
			options: [
				"NaOH",
				"Conc. H₂SO₄",
				"Ni",
				"Pt"
			],
			ans: 1
		},
		{
			q: "Micelles are formed by:",
			options: [
				"Acids",
				"Bases",
				"Soap molecules in water",
				"Hydrocarbons"
			],
			ans: 2
		}
	]
};
var reactions$1 = [
	{
		ch: "ch1",
		title: "Burning of Magnesium Ribbon",
		eq: "2Mg(s) + O₂(g) → 2MgO(s)",
		type: "Combination + Oxidation",
		colour: "Mg: silvery white → MgO: white powder",
		obs: "Dazzling white flame; white ash left behind",
		cond: "Heat / burning in air",
		tip: "Always clean magnesium ribbon with sandpaper before burning to remove oxide layer.",
		desc: "Classic combination reaction. Magnesium is oxidised to magnesium oxide. Very important for board exams."
	},
	{
		ch: "ch1",
		title: "Quicklime + Water (Slaked Lime Formation)",
		eq: "CaO(s) + H₂O(l) → Ca(OH)₂(aq) + Heat",
		type: "Combination + Exothermic",
		colour: "White solid dissolves forming colourless solution",
		obs: "Mixture becomes hot; hissing sound sometimes heard",
		cond: "Room temperature",
		tip: "This is the reaction used in whitewashing. Heat released shows it is exothermic.",
		desc: "Calcium oxide (quicklime) reacts vigorously with water to form calcium hydroxide (slaked lime)."
	},
	{
		ch: "ch1",
		title: "Whitewashing Reaction",
		eq: "Ca(OH)₂(aq) + CO₂(g) → CaCO₃(s) + H₂O(l)",
		type: "Base + acidic oxide",
		colour: "Milky / shiny white layer forms on walls",
		obs: "Thin shiny layer of calcium carbonate appears after 2–3 days",
		cond: "CO₂ from air",
		tip: "Marble also has the formula CaCO₃. Very frequently asked.",
		desc: "Slaked lime reacts with carbon dioxide in air to form calcium carbonate which gives the walls a shiny finish."
	},
	{
		ch: "ch1",
		title: "Combustion of Methane",
		eq: "CH₄(g) + 2O₂(g) → CO₂(g) + 2H₂O(g) + Heat",
		type: "Combination + Exothermic",
		colour: "Blue flame (complete combustion)",
		obs: "Heat and light are produced",
		cond: "Ignition in sufficient oxygen",
		tip: "Natural gas is mainly methane. Write state symbols carefully.",
		desc: "Complete combustion of methane produces carbon dioxide, water vapour and a large amount of heat."
	},
	{
		ch: "ch1",
		title: "Respiration (Biological Oxidation)",
		eq: "C₆H₁₂O₆(aq) + 6O₂(g) → 6CO₂(g) + 6H₂O(l) + Energy",
		type: "Oxidation + Exothermic",
		colour: "No visible colour change",
		obs: "Energy is released in cells",
		cond: "Enzymatic process in living cells",
		tip: "Often asked as an example of exothermic reaction in living organisms.",
		desc: "Glucose is oxidised by oxygen in our body to release energy required for life processes."
	},
	{
		ch: "ch1",
		title: "Formation of Water",
		eq: "2H₂(g) + O₂(g) → 2H₂O(l)",
		type: "Combination",
		colour: "Colourless liquid formed",
		obs: "Explosive reaction if mixture is ignited",
		cond: "Electric spark or heat",
		tip: "Remember the 2:1 volume ratio of H₂ : O₂.",
		desc: "Hydrogen burns in oxygen to form water. Highly exothermic combination reaction."
	},
	{
		ch: "ch1",
		title: "Thermal Decomposition of Calcium Carbonate",
		eq: "CaCO₃(s) → CaO(s) + CO₂(g)",
		type: "Thermal Decomposition",
		colour: "White solid remains",
		obs: "Gas is evolved which turns lime water milky",
		cond: "Strong heating",
		tip: "Industrial process for making quicklime and cement.",
		desc: "Limestone decomposes on strong heating to form quicklime and carbon dioxide."
	},
	{
		ch: "ch1",
		title: "Decomposition of Ferrous Sulphate",
		eq: "2FeSO₄(s) → Fe₂O₃(s) + SO₂(g) + SO₃(g)",
		type: "Thermal Decomposition",
		colour: "Green crystals → brown Fe₂O₃",
		obs: "Smell of burning sulphur; colour changes from green to brown",
		cond: "Heating",
		tip: "Remember both SO₂ and SO₃ are produced. Colour change is important.",
		desc: "Green ferrous sulphate crystals first lose water and then decompose to form ferric oxide, sulphur dioxide and sulphur trioxide."
	},
	{
		ch: "ch1",
		title: "Thermal Decomposition of Lead Nitrate",
		eq: "2Pb(NO₃)₂(s) → 2PbO(s) + 4NO₂(g) + O₂(g)",
		type: "Thermal Decomposition",
		colour: "White crystals → yellow PbO; brown NO₂ gas",
		obs: "Brown fumes of nitrogen dioxide are evolved",
		cond: "Heating",
		tip: "One of the most important colour-change decomposition reactions.",
		desc: "Lead nitrate decomposes on heating to form yellow lead oxide, brown nitrogen dioxide gas and oxygen."
	},
	{
		ch: "ch1",
		title: "Electrolysis of Water",
		eq: "2H₂O(l) → 2H₂(g) + O₂(g)",
		type: "Electrolytic Decomposition",
		colour: "Colourless gases",
		obs: "Hydrogen collected at cathode (twice the volume of oxygen)",
		cond: "Electric current + acidified water",
		tip: "Volume of H₂ is double that of O₂. Very common board question.",
		desc: "Water is decomposed into hydrogen and oxygen by passing electric current through acidified water."
	},
	{
		ch: "ch1",
		title: "Photolytic Decomposition of Silver Chloride",
		eq: "2AgCl(s) → 2Ag(s) + Cl₂(g)",
		type: "Photolytic Decomposition",
		colour: "White AgCl → grey Ag",
		obs: "White silver chloride turns grey on exposure to sunlight",
		cond: "Sunlight",
		tip: "Basis of black-and-white photography. Must remember colour change.",
		desc: "Silver chloride decomposes in sunlight into silver and chlorine. Colour changes from white to grey."
	},
	{
		ch: "ch1",
		title: "Photolytic Decomposition of Silver Bromide",
		eq: "2AgBr(s) → 2Ag(s) + Br₂(g)",
		type: "Photolytic Decomposition",
		colour: "Pale yellow AgBr → grey Ag",
		obs: "Pale yellow silver bromide turns grey",
		cond: "Sunlight",
		tip: "Also used in photography. Similar to AgCl.",
		desc: "Silver bromide undergoes photolytic decomposition in sunlight forming silver and bromine."
	},
	{
		ch: "ch1",
		title: "Iron + Copper Sulphate",
		eq: "Fe(s) + CuSO₄(aq) → FeSO₄(aq) + Cu(s)",
		type: "Displacement",
		colour: "Blue CuSO₄ → pale green FeSO₄; reddish-brown Cu deposited",
		obs: "Blue solution turns pale green; brown coating on iron",
		cond: "Aqueous solution, room temperature",
		tip: "Iron is more reactive than copper. Colour change is very important.",
		desc: "Iron displaces copper from copper sulphate solution because it is higher in the reactivity series."
	},
	{
		ch: "ch1",
		title: "Zinc + Copper Sulphate",
		eq: "Zn(s) + CuSO₄(aq) → ZnSO₄(aq) + Cu(s)",
		type: "Displacement",
		colour: "Blue solution becomes colourless; reddish-brown Cu deposited",
		obs: "Blue colour disappears; copper is deposited",
		cond: "Aqueous solution",
		tip: "Zinc is more reactive than copper.",
		desc: "Zinc displaces copper from copper sulphate solution."
	},
	{
		ch: "ch1",
		title: "Zinc + Silver Nitrate",
		eq: "Zn(s) + 2AgNO₃(aq) → Zn(NO₃)₂(aq) + 2Ag(s)",
		type: "Displacement",
		colour: "Colourless solution; greyish-white Ag deposited",
		obs: "Silver is deposited on zinc",
		cond: "Aqueous solution",
		tip: "Zinc is more reactive than silver.",
		desc: "Zinc displaces silver from silver nitrate solution."
	},
	{
		ch: "ch1",
		title: "Aluminium + Copper Chloride",
		eq: "2Al(s) + 3CuCl₂(aq) → 2AlCl₃(aq) + 3Cu(s)",
		type: "Displacement",
		colour: "Blue-green CuCl₂ fades; copper deposited",
		obs: "Colour of solution fades; copper metal appears",
		cond: "Aqueous solution",
		tip: "Aluminium is more reactive than copper.",
		desc: "Aluminium displaces copper from copper chloride solution."
	},
	{
		ch: "ch1",
		title: "Lead + Copper Chloride",
		eq: "Pb(s) + CuCl₂(aq) → PbCl₂(aq) + Cu(s)",
		type: "Displacement",
		colour: "Blue-green solution fades; copper deposited",
		obs: "Copper is deposited on lead",
		cond: "Aqueous solution",
		tip: "Lead is more reactive than copper.",
		desc: "Lead displaces copper from copper chloride solution."
	},
	{
		ch: "ch1",
		title: "Barium Chloride + Sodium Sulphate",
		eq: "BaCl₂(aq) + Na₂SO₄(aq) → BaSO₄(s)↓ + 2NaCl(aq)",
		type: "Double Displacement (Precipitation)",
		colour: "White precipitate of BaSO₄",
		obs: "Immediate white precipitate forms",
		cond: "Aqueous solutions mixed",
		tip: "Classic precipitation reaction. BaSO₄ is insoluble.",
		desc: "Barium sulphate is precipitated as a white insoluble solid when solutions of barium chloride and sodium sulphate are mixed."
	},
	{
		ch: "ch1",
		title: "Lead Nitrate + Potassium Iodide",
		eq: "Pb(NO₃)₂(aq) + 2KI(aq) → PbI₂(s)↓ + 2KNO₃(aq)",
		type: "Double Displacement (Precipitation)",
		colour: "Bright yellow precipitate of PbI₂",
		obs: "Yellow precipitate forms instantly",
		cond: "Aqueous solutions",
		tip: "One of the most beautiful precipitation reactions. Yellow colour is important.",
		desc: "Lead iodide is precipitated as a bright yellow solid."
	},
	{
		ch: "ch1",
		title: "Sodium Hydroxide + Hydrochloric Acid",
		eq: "NaOH(aq) + HCl(aq) → NaCl(aq) + H₂O(l)",
		type: "Neutralisation",
		colour: "Colourless solution",
		obs: "Heat is evolved",
		cond: "Aqueous solutions",
		tip: "Neutralisation is a special case of double displacement.",
		desc: "Acid and base react to form salt and water. Reaction is exothermic."
	},
	{
		ch: "ch1",
		title: "Oxidation of Copper",
		eq: "2Cu(s) + O₂(g) → 2CuO(s)",
		type: "Oxidation",
		colour: "Reddish-brown Cu → black CuO",
		obs: "Black coating forms on copper",
		cond: "Heating in air",
		tip: "Copper is oxidised; oxygen is reduced.",
		desc: "Copper on heating in air forms black copper(II) oxide."
	},
	{
		ch: "ch1",
		title: "Reduction of Copper Oxide by Hydrogen",
		eq: "CuO(s) + H₂(g) → Cu(s) + H₂O(l)",
		type: "Redox",
		colour: "Black CuO → reddish-brown Cu",
		obs: "Black powder turns reddish-brown",
		cond: "Heating while passing H₂ gas",
		tip: "CuO is reduced; H₂ is oxidised. Classic redox example.",
		desc: "Black copper oxide is reduced to copper metal by hydrogen."
	},
	{
		ch: "ch1",
		title: "Zinc + Dilute Sulphuric Acid",
		eq: "Zn(s) + H₂SO₄(aq) → ZnSO₄(aq) + H₂(g)↑",
		type: "Displacement + Redox",
		colour: "Colourless solution; colourless gas",
		obs: "Bubbles of hydrogen gas; gas burns with pop sound",
		cond: "Room temperature",
		tip: "Hydrogen is tested by pop sound. Very common experiment.",
		desc: "Zinc displaces hydrogen from dilute sulphuric acid."
	},
	{
		ch: "ch1",
		title: "Iron + Steam",
		eq: "3Fe(s) + 4H₂O(g) → Fe₃O₄(s) + 4H₂(g)",
		type: "Redox",
		colour: "Black Fe₃O₄ formed",
		obs: "Hydrogen gas is produced",
		cond: "Red hot iron + steam",
		tip: "Earlier used for commercial production of hydrogen.",
		desc: "Red hot iron reacts with steam to form iron(II,III) oxide and hydrogen."
	},
	{
		ch: "ch1",
		title: "Rusting of Iron (Corrosion)",
		eq: "4Fe(s) + 3O₂(g) + xH₂O(l) → 2Fe₂O₃·xH₂O(s)",
		type: "Oxidation / Corrosion",
		colour: "Reddish-brown rust",
		obs: "Reddish-brown flaky coating develops over time",
		cond: "Moist air (both O₂ and H₂O required)",
		tip: "Both oxygen and water are essential for rusting. Prevention methods are asked.",
		desc: "Iron reacts with oxygen and moisture to form hydrated iron(III) oxide (rust)."
	},
	{
		ch: "ch1",
		title: "Rancidity (Oxidation of Oils & Fats)",
		eq: "Oils/Fats + O₂ → Rancid products (general)",
		type: "Oxidation",
		colour: "No specific colour; unpleasant smell develops",
		obs: "Change in smell and taste of food",
		cond: "Exposure to air",
		tip: "Prevented by antioxidants, refrigeration, airtight packing, nitrogen packing.",
		desc: "Oxidation of oils and fats causes unpleasant smell and taste. This is called rancidity."
	},
	{
		ch: "ch1",
		title: "Copper turning green (Basic Copper Carbonate)",
		eq: "2Cu + H₂O + CO₂ + O₂ → Cu(OH)₂·CuCO₃",
		type: "Corrosion",
		colour: "Green coating on copper",
		obs: "Copper articles develop green coating on long exposure to moist air",
		cond: "Moist air containing CO₂",
		tip: "The green coating is basic copper carbonate. Often asked with silver tarnishing.",
		desc: "Copper reacts with carbon dioxide, oxygen and moisture to form a green layer of basic copper carbonate."
	},
	{
		ch: "ch1",
		title: "Tarnishing of Silver",
		eq: "2Ag + H₂S → Ag₂S + H₂",
		type: "Corrosion",
		colour: "Black coating of Ag₂S",
		obs: "Silver articles turn black",
		cond: "Presence of H₂S in air",
		tip: "Black coating is silver sulphide. Very common extra reaction asked in exams.",
		desc: "Silver reacts with hydrogen sulphide present in air to form black silver sulphide."
	},
	{
		ch: "ch2",
		title: "Zinc + Dilute Hydrochloric Acid",
		eq: "Zn(s) + 2HCl(aq) → ZnCl₂(aq) + H₂(g)↑",
		type: "Acid + Metal",
		colour: "Colourless solution; colourless gas",
		obs: "Bubbles of hydrogen gas; gas burns with a pop sound",
		cond: "Room temperature",
		tip: "Hydrogen is tested by bringing a burning matchstick near the gas — it gives a characteristic pop.",
		desc: "Zinc reacts with dilute hydrochloric acid to liberate hydrogen gas and form zinc chloride."
	},
	{
		ch: "ch2",
		title: "Zinc + Dilute Sulphuric Acid",
		eq: "Zn(s) + H₂SO₄(aq) → ZnSO₄(aq) + H₂(g)↑",
		type: "Acid + Metal",
		colour: "Colourless solution",
		obs: "Hydrogen gas is evolved with effervescence",
		cond: "Room temperature",
		tip: "One of the most common laboratory methods to prepare hydrogen gas.",
		desc: "Zinc granules react with dilute sulphuric acid to produce hydrogen gas and zinc sulphate."
	},
	{
		ch: "ch2",
		title: "Magnesium + Dilute Hydrochloric Acid",
		eq: "Mg(s) + 2HCl(aq) → MgCl₂(aq) + H₂(g)↑",
		type: "Acid + Metal",
		colour: "Colourless solution",
		obs: "Rapid evolution of hydrogen gas",
		cond: "Room temperature",
		tip: "Magnesium reacts faster than zinc with dilute acids.",
		desc: "Magnesium reacts vigorously with dilute hydrochloric acid to form magnesium chloride and hydrogen."
	},
	{
		ch: "ch2",
		title: "Iron + Dilute Hydrochloric Acid",
		eq: "Fe(s) + 2HCl(aq) → FeCl₂(aq) + H₂(g)↑",
		type: "Acid + Metal",
		colour: "Pale green solution",
		obs: "Hydrogen gas is evolved slowly",
		cond: "Room temperature",
		tip: "Reaction is slower than Mg and Zn. FeCl₂ solution is pale green.",
		desc: "Iron reacts with dilute hydrochloric acid to form ferrous chloride and hydrogen gas."
	},
	{
		ch: "ch2",
		title: "Sodium Carbonate + Hydrochloric Acid",
		eq: "Na₂CO₃(s) + 2HCl(aq) → 2NaCl(aq) + H₂O(l) + CO₂(g)↑",
		type: "Acid + Carbonate",
		colour: "Colourless gas",
		obs: "Brisk effervescence due to CO₂",
		cond: "Room temperature",
		tip: "CO₂ turns lime water milky. Very important confirmatory test.",
		desc: "Sodium carbonate reacts with dilute hydrochloric acid to liberate carbon dioxide gas."
	},
	{
		ch: "ch2",
		title: "Sodium Hydrogen Carbonate + Hydrochloric Acid",
		eq: "NaHCO₃(s) + HCl(aq) → NaCl(aq) + H₂O(l) + CO₂(g)↑",
		type: "Acid + Hydrogen Carbonate",
		colour: "Colourless gas",
		obs: "Effervescence due to carbon dioxide",
		cond: "Room temperature",
		tip: "Used in soda-acid fire extinguishers.",
		desc: "Baking soda reacts with hydrochloric acid to produce carbon dioxide, sodium chloride and water."
	},
	{
		ch: "ch2",
		title: "Calcium Carbonate + Hydrochloric Acid",
		eq: "CaCO₃(s) + 2HCl(aq) → CaCl₂(aq) + H₂O(l) + CO₂(g)↑",
		type: "Acid + Carbonate",
		colour: "Colourless gas",
		obs: "Brisk effervescence; gas turns lime water milky",
		cond: "Room temperature",
		tip: "Marble chips / limestone are used in this experiment.",
		desc: "Calcium carbonate (marble or limestone) reacts with dilute hydrochloric acid to liberate carbon dioxide."
	},
	{
		ch: "ch2",
		title: "Lime Water Test for Carbon Dioxide",
		eq: "Ca(OH)₂(aq) + CO₂(g) → CaCO₃(s)↓ + H₂O(l)",
		type: "Test Reaction",
		colour: "Colourless solution becomes milky",
		obs: "White precipitate of calcium carbonate forms",
		cond: "Passing CO₂ gas",
		tip: "Standard confirmatory test for CO₂. Must be remembered.",
		desc: "Carbon dioxide turns lime water milky due to the formation of insoluble calcium carbonate."
	},
	{
		ch: "ch2",
		title: "Excess CO₂ with Lime Water",
		eq: "CaCO₃(s) + H₂O(l) + CO₂(g) → Ca(HCO₃)₂(aq)",
		type: "Further Reaction",
		colour: "Milkiness disappears",
		obs: "Milky solution becomes clear again",
		cond: "Excess CO₂ passed",
		tip: "Insoluble CaCO₃ converts into soluble calcium hydrogen carbonate.",
		desc: "When excess carbon dioxide is passed, the milkiness disappears because calcium carbonate dissolves as calcium bicarbonate."
	},
	{
		ch: "ch2",
		title: "Sodium Hydroxide + Hydrochloric Acid",
		eq: "NaOH(aq) + HCl(aq) → NaCl(aq) + H₂O(l)",
		type: "Neutralisation",
		colour: "Colourless solution",
		obs: "Heat is liberated",
		cond: "Aqueous solutions",
		tip: "Classic neutralisation reaction. Salt + water are formed.",
		desc: "Strong base reacts with strong acid to form sodium chloride and water. Reaction is exothermic."
	},
	{
		ch: "ch2",
		title: "Potassium Hydroxide + Nitric Acid",
		eq: "KOH(aq) + HNO₃(aq) → KNO₃(aq) + H₂O(l)",
		type: "Neutralisation",
		colour: "Colourless solution",
		obs: "Heat is evolved",
		cond: "Aqueous solutions",
		tip: "Another standard neutralisation example.",
		desc: "Potassium hydroxide neutralises nitric acid to form potassium nitrate and water."
	},
	{
		ch: "ch2",
		title: "Sodium Hydroxide + Sulphuric Acid",
		eq: "2NaOH(aq) + H₂SO₄(aq) → Na₂SO₄(aq) + 2H₂O(l)",
		type: "Neutralisation",
		colour: "Colourless solution",
		obs: "Heat is released",
		cond: "Aqueous solutions",
		tip: "Two moles of NaOH are required for one mole of H₂SO₄.",
		desc: "Complete neutralisation of sulphuric acid requires two molecules of sodium hydroxide."
	},
	{
		ch: "ch2",
		title: "Copper Oxide + Hydrochloric Acid",
		eq: "CuO(s) + 2HCl(aq) → CuCl₂(aq) + H₂O(l)",
		type: "Metal Oxide + Acid",
		colour: "Black CuO → blue-green CuCl₂ solution",
		obs: "Black solid dissolves forming a coloured solution",
		cond: "Room temperature / mild heating",
		tip: "Metal oxides are basic and react with acids to form salt and water.",
		desc: "Black copper oxide reacts with dilute hydrochloric acid to form bluish-green copper chloride."
	},
	{
		ch: "ch2",
		title: "Copper Oxide + Sulphuric Acid",
		eq: "CuO(s) + H₂SO₄(aq) → CuSO₄(aq) + H₂O(l)",
		type: "Metal Oxide + Acid",
		colour: "Black solid → blue solution",
		obs: "Blue copper sulphate solution is formed",
		cond: "Mild heating",
		tip: "Colour change from black to blue is important.",
		desc: "Copper oxide dissolves in dilute sulphuric acid to form blue copper sulphate solution."
	},
	{
		ch: "ch2",
		title: "Calcium Hydroxide + Carbon Dioxide",
		eq: "Ca(OH)₂(aq) + CO₂(g) → CaCO₃(s) + H₂O(l)",
		type: "Base + Non-metal Oxide",
		colour: "Milky appearance",
		obs: "White precipitate forms",
		cond: "Passing CO₂",
		tip: "Non-metal oxides are acidic in nature.",
		desc: "Calcium hydroxide (base) reacts with carbon dioxide (acidic oxide) to form salt and water."
	},
	{
		ch: "ch2",
		title: "Sodium Hydroxide + Carbon Dioxide",
		eq: "2NaOH(aq) + CO₂(g) → Na₂CO₃(aq) + H₂O(l)",
		type: "Base + Non-metal Oxide",
		colour: "Colourless solution",
		obs: "CO₂ is absorbed",
		cond: "Passing CO₂ through NaOH solution",
		tip: "Used to remove CO₂ from air in closed systems.",
		desc: "Sodium hydroxide absorbs carbon dioxide to form sodium carbonate and water."
	},
	{
		ch: "ch2",
		title: "Zinc + Sodium Hydroxide",
		eq: "Zn(s) + 2NaOH(aq) → Na₂ZnO₂(aq) + H₂(g)↑",
		type: "Base + Metal (Amphoteric)",
		colour: "Colourless solution",
		obs: "Hydrogen gas is evolved",
		cond: "Hot concentrated NaOH",
		tip: "Zinc is amphoteric — it reacts with both acids and bases.",
		desc: "Zinc reacts with hot concentrated sodium hydroxide to form sodium zincate and hydrogen gas."
	},
	{
		ch: "ch2",
		title: "Aluminium + Sodium Hydroxide",
		eq: "2Al(s) + 2NaOH(aq) + 2H₂O(l) → 2NaAlO₂(aq) + 3H₂(g)↑",
		type: "Base + Metal (Amphoteric)",
		colour: "Colourless solution",
		obs: "Hydrogen gas is evolved",
		cond: "Hot concentrated NaOH",
		tip: "Aluminium is also amphoteric.",
		desc: "Aluminium reacts with sodium hydroxide to form sodium aluminate and hydrogen."
	},
	{
		ch: "ch2",
		title: "Chlor-Alkali Process",
		eq: "2NaCl(aq) + 2H₂O(l) → 2NaOH(aq) + Cl₂(g) + H₂(g)",
		type: "Electrolysis",
		colour: "Chlorine: greenish-yellow gas",
		obs: "Chlorine at anode, hydrogen at cathode, NaOH in solution",
		cond: "Electrolysis of brine",
		tip: "Products: Chlorine, Hydrogen and Sodium hydroxide. Name comes from Chlor + Alkali.",
		desc: "Electrolysis of aqueous sodium chloride (brine) produces sodium hydroxide, chlorine and hydrogen."
	},
	{
		ch: "ch2",
		title: "Formation of Bleaching Powder",
		eq: "Ca(OH)₂(s) + Cl₂(g) → CaOCl₂(s) + H₂O(l)",
		type: "Preparation of Salt",
		colour: "Pale yellowish-white solid",
		obs: "Bleaching powder is formed",
		cond: "Dry slaked lime + chlorine gas",
		tip: "Formula is written as CaOCl₂. Used for bleaching and disinfecting water.",
		desc: "Bleaching powder is prepared by the action of chlorine on dry slaked lime."
	},
	{
		ch: "ch2",
		title: "Heating of Baking Soda",
		eq: "2NaHCO₃(s) → Na₂CO₃(s) + H₂O(l) + CO₂(g)",
		type: "Thermal Decomposition",
		colour: "White solid",
		obs: "Carbon dioxide is released",
		cond: "Heating",
		tip: "This reaction helps cakes and bread to rise.",
		desc: "On heating, baking soda decomposes to form sodium carbonate, water and carbon dioxide."
	},
	{
		ch: "ch2",
		title: "Formation of Washing Soda",
		eq: "Na₂CO₃ + 10H₂O → Na₂CO₃·10H₂O",
		type: "Crystallisation",
		colour: "White crystals",
		obs: "Crystals of washing soda form",
		cond: "Recrystallisation from water",
		tip: "Washing soda is Na₂CO₃·10H₂O. Used to remove permanent hardness.",
		desc: "Anhydrous sodium carbonate is recrystallised to obtain washing soda (sodium carbonate decahydrate)."
	},
	{
		ch: "ch2",
		title: "Gypsum → Plaster of Paris",
		eq: "CaSO₄·2H₂O → CaSO₄·½H₂O + 1½H₂O",
		type: "Thermal Decomposition",
		colour: "White solid",
		obs: "Water of crystallisation is partially removed",
		cond: "Heating at 373 K",
		tip: "Temperature must be controlled at 373 K. Higher temperature gives dead burnt plaster.",
		desc: "Gypsum on heating at 373 K forms Plaster of Paris (calcium sulphate hemihydrate)."
	},
	{
		ch: "ch2",
		title: "Setting of Plaster of Paris",
		eq: "CaSO₄·½H₂O + 1½H₂O → CaSO₄·2H₂O",
		type: "Hydration",
		colour: "White hard mass",
		obs: "Plaster sets into a hard solid",
		cond: "Mixing with water",
		tip: "Used for setting fractured bones and making casts.",
		desc: "When Plaster of Paris is mixed with water, it rehydrates and forms gypsum which sets hard."
	},
	{
		ch: "ch2",
		title: "Sodium Hydroxide + Zinc (Amphoteric Nature)",
		eq: "Zn + 2NaOH → Na₂ZnO₂ + H₂",
		type: "Amphoteric Behaviour",
		colour: "Colourless solution",
		obs: "Hydrogen gas evolved",
		cond: "Hot concentrated alkali",
		tip: "Proves zinc is amphoteric.",
		desc: "Zinc reacts with strong bases to form zincate salt and hydrogen, showing amphoteric nature."
	},
	{
		ch: "ch3",
		title: "Sodium + Oxygen",
		eq: "4Na(s) + O₂(g) → 2Na₂O(s)",
		type: "Combination / Oxidation",
		colour: "White solid (Na₂O)",
		obs: "Sodium burns with a yellow flame",
		cond: "Heating in air / oxygen",
		tip: "Sodium is stored under kerosene because it reacts vigorously with air and moisture.",
		desc: "Sodium reacts with oxygen to form sodium oxide. Highly reactive metal."
	},
	{
		ch: "ch3",
		title: "Magnesium + Oxygen",
		eq: "2Mg(s) + O₂(g) → 2MgO(s)",
		type: "Combination / Oxidation",
		colour: "White powder (MgO)",
		obs: "Dazzling white flame",
		cond: "Burning in air",
		tip: "Clean the ribbon before burning. MgO is basic in nature.",
		desc: "Magnesium burns with a brilliant white flame to form white magnesium oxide."
	},
	{
		ch: "ch3",
		title: "Aluminium + Oxygen",
		eq: "4Al(s) + 3O₂(g) → 2Al₂O₃(s)",
		type: "Oxidation",
		colour: "White solid (Al₂O₃)",
		obs: "Thin protective oxide layer forms",
		cond: "Exposure to air",
		tip: "The oxide layer protects aluminium from further corrosion (anodising makes it thicker).",
		desc: "Aluminium forms a thin, tough layer of aluminium oxide which prevents further oxidation."
	},
	{
		ch: "ch3",
		title: "Zinc + Oxygen",
		eq: "2Zn(s) + O₂(g) → 2ZnO(s)",
		type: "Oxidation",
		colour: "ZnO is yellow when hot, white when cold",
		obs: "Zinc burns to form zinc oxide",
		cond: "Heating in air",
		tip: "Colour change of ZnO (yellow hot → white cold) is frequently asked.",
		desc: "Zinc reacts with oxygen to form zinc oxide which is amphoteric."
	},
	{
		ch: "ch3",
		title: "Iron + Oxygen",
		eq: "3Fe(s) + 2O₂(g) → Fe₃O₄(s)",
		type: "Oxidation",
		colour: "Black Fe₃O₄",
		obs: "Iron filings burn to form magnetic oxide of iron",
		cond: "Heating / burning",
		tip: "Fe₃O₄ is also called magnetic oxide of iron.",
		desc: "Iron reacts with oxygen to form iron(II,III) oxide."
	},
	{
		ch: "ch3",
		title: "Copper + Oxygen",
		eq: "2Cu(s) + O₂(g) → 2CuO(s)",
		type: "Oxidation",
		colour: "Reddish-brown Cu → black CuO",
		obs: "Black coating forms on copper",
		cond: "Heating in air",
		tip: "Very important colour change for board exams.",
		desc: "Copper on heating in air is oxidised to black copper(II) oxide."
	},
	{
		ch: "ch3",
		title: "Aluminium Oxide + Hydrochloric Acid",
		eq: "Al₂O₃(s) + 6HCl(aq) → 2AlCl₃(aq) + 3H₂O(l)",
		type: "Amphoteric Oxide (Basic behaviour)",
		colour: "Colourless solution",
		obs: "Oxide dissolves",
		cond: "Aqueous acid",
		tip: "Shows basic character of Al₂O₃.",
		desc: "Aluminium oxide reacts with acids to form salt and water, showing basic nature."
	},
	{
		ch: "ch3",
		title: "Aluminium Oxide + Sodium Hydroxide",
		eq: "Al₂O₃(s) + 2NaOH(aq) → 2NaAlO₂(aq) + H₂O(l)",
		type: "Amphoteric Oxide (Acidic behaviour)",
		colour: "Colourless solution",
		obs: "Oxide dissolves in base",
		cond: "Aqueous NaOH",
		tip: "Shows acidic character of Al₂O₃. Hence amphoteric.",
		desc: "Aluminium oxide also reacts with bases to form sodium aluminate, proving it is amphoteric."
	},
	{
		ch: "ch3",
		title: "Zinc Oxide + Hydrochloric Acid",
		eq: "ZnO(s) + 2HCl(aq) → ZnCl₂(aq) + H₂O(l)",
		type: "Amphoteric Oxide",
		colour: "Colourless solution",
		obs: "Oxide dissolves",
		cond: "Aqueous acid",
		tip: "ZnO is amphoteric like Al₂O₃.",
		desc: "Zinc oxide reacts with acids to form zinc chloride and water."
	},
	{
		ch: "ch3",
		title: "Zinc Oxide + Sodium Hydroxide",
		eq: "ZnO(s) + 2NaOH(aq) → Na₂ZnO₂(aq) + H₂O(l)",
		type: "Amphoteric Oxide",
		colour: "Colourless solution",
		obs: "Oxide dissolves in alkali",
		cond: "Aqueous NaOH",
		tip: "Formation of sodium zincate proves amphoteric nature.",
		desc: "Zinc oxide reacts with sodium hydroxide to form sodium zincate."
	},
	{
		ch: "ch3",
		title: "Potassium + Water",
		eq: "2K(s) + 2H₂O(l) → 2KOH(aq) + H₂(g)↑ + Heat",
		type: "Metal + Water",
		colour: "Colourless solution",
		obs: "Violent reaction; hydrogen catches fire",
		cond: "Cold water",
		tip: "Most reactive metal. Stored under kerosene.",
		desc: "Potassium reacts violently with cold water. Hydrogen gas produced catches fire."
	},
	{
		ch: "ch3",
		title: "Sodium + Water",
		eq: "2Na(s) + 2H₂O(l) → 2NaOH(aq) + H₂(g)↑ + Heat",
		type: "Metal + Water",
		colour: "Colourless solution",
		obs: "Vigorous reaction; melts into a ball; hydrogen may catch fire",
		cond: "Cold water",
		tip: "Stored under kerosene. Very common demonstration (with precautions).",
		desc: "Sodium reacts vigorously with cold water to form sodium hydroxide and hydrogen."
	},
	{
		ch: "ch3",
		title: "Calcium + Water",
		eq: "Ca(s) + 2H₂O(l) → Ca(OH)₂(aq) + H₂(g)↑",
		type: "Metal + Water",
		colour: "Colourless solution; milky if excess",
		obs: "Less violent than Na/K; calcium floats",
		cond: "Cold water",
		tip: "Hydrogen bubbles stick to calcium making it float.",
		desc: "Calcium reacts with water less vigorously than sodium and potassium."
	},
	{
		ch: "ch3",
		title: "Magnesium + Hot Water / Steam",
		eq: "Mg(s) + 2H₂O(g) → Mg(OH)₂ / MgO + H₂(g)",
		type: "Metal + Water",
		colour: "White solid",
		obs: "Hydrogen gas evolved",
		cond: "Hot water or steam",
		tip: "Does not react with cold water.",
		desc: "Magnesium reacts with hot water or steam to form magnesium hydroxide/oxide and hydrogen."
	},
	{
		ch: "ch3",
		title: "Aluminium + Steam",
		eq: "2Al(s) + 3H₂O(g) → Al₂O₃(s) + 3H₂(g)",
		type: "Metal + Steam",
		colour: "White Al₂O₃",
		obs: "Hydrogen gas produced",
		cond: "Steam",
		tip: "Aluminium reacts only with steam, not with cold or hot water easily due to oxide layer.",
		desc: "Aluminium reacts with steam to form aluminium oxide and hydrogen."
	},
	{
		ch: "ch3",
		title: "Iron + Steam",
		eq: "3Fe(s) + 4H₂O(g) → Fe₃O₄(s) + 4H₂(g)",
		type: "Metal + Steam",
		colour: "Black Fe₃O₄",
		obs: "Hydrogen gas is produced",
		cond: "Red hot iron + steam",
		tip: "Earlier method for commercial production of hydrogen.",
		desc: "Red hot iron reacts with steam to form magnetic oxide of iron and hydrogen."
	},
	{
		ch: "ch3",
		title: "Magnesium + Dilute HCl",
		eq: "Mg(s) + 2HCl(aq) → MgCl₂(aq) + H₂(g)↑",
		type: "Metal + Acid",
		colour: "Colourless solution",
		obs: "Rapid evolution of hydrogen",
		cond: "Room temperature",
		tip: "Most reactive among common metals with dilute acids.",
		desc: "Magnesium reacts rapidly with dilute hydrochloric acid to liberate hydrogen."
	},
	{
		ch: "ch3",
		title: "Aluminium + Dilute HCl",
		eq: "2Al(s) + 6HCl(aq) → 2AlCl₃(aq) + 3H₂(g)↑",
		type: "Metal + Acid",
		colour: "Colourless solution",
		obs: "Hydrogen gas evolved",
		cond: "Room temperature",
		tip: "Oxide layer must be removed for smooth reaction.",
		desc: "Aluminium reacts with dilute hydrochloric acid to form aluminium chloride and hydrogen."
	},
	{
		ch: "ch3",
		title: "Zinc + Dilute HCl",
		eq: "Zn(s) + 2HCl(aq) → ZnCl₂(aq) + H₂(g)↑",
		type: "Metal + Acid",
		colour: "Colourless solution",
		obs: "Hydrogen gas with pop sound",
		cond: "Room temperature",
		tip: "Standard laboratory preparation of hydrogen.",
		desc: "Zinc reacts with dilute hydrochloric acid to produce hydrogen gas."
	},
	{
		ch: "ch3",
		title: "Iron + Dilute HCl",
		eq: "Fe(s) + 2HCl(aq) → FeCl₂(aq) + H₂(g)↑",
		type: "Metal + Acid",
		colour: "Pale green solution",
		obs: "Slow evolution of hydrogen",
		cond: "Room temperature",
		tip: "Reaction is slower than Zn and Mg.",
		desc: "Iron reacts with dilute hydrochloric acid to form ferrous chloride and hydrogen."
	},
	{
		ch: "ch3",
		title: "Zinc + Dilute H₂SO₄",
		eq: "Zn(s) + H₂SO₄(aq) → ZnSO₄(aq) + H₂(g)↑",
		type: "Metal + Acid",
		colour: "Colourless solution",
		obs: "Hydrogen gas evolved",
		cond: "Room temperature",
		tip: "Copper, silver and gold do not react with dilute acids.",
		desc: "Zinc reacts with dilute sulphuric acid to form zinc sulphate and hydrogen."
	},
	{
		ch: "ch3",
		title: "Iron + Copper Sulphate",
		eq: "Fe(s) + CuSO₄(aq) → FeSO₄(aq) + Cu(s)",
		type: "Displacement",
		colour: "Blue → pale green; reddish-brown Cu deposited",
		obs: "Blue colour fades; brown coating on iron",
		cond: "Aqueous solution",
		tip: "Iron is more reactive than copper. Classic reactivity series experiment.",
		desc: "Iron displaces copper from copper sulphate solution."
	},
	{
		ch: "ch3",
		title: "Zinc + Copper Sulphate",
		eq: "Zn(s) + CuSO₄(aq) → ZnSO₄(aq) + Cu(s)",
		type: "Displacement",
		colour: "Blue solution becomes colourless; Cu deposited",
		obs: "Blue colour disappears",
		cond: "Aqueous solution",
		tip: "Zinc is higher than copper in reactivity series.",
		desc: "Zinc displaces copper from copper sulphate solution."
	},
	{
		ch: "ch3",
		title: "Zinc + Iron Sulphate",
		eq: "Zn(s) + FeSO₄(aq) → ZnSO₄(aq) + Fe(s)",
		type: "Displacement",
		colour: "Green solution fades",
		obs: "Iron is deposited",
		cond: "Aqueous solution",
		tip: "Zinc is more reactive than iron.",
		desc: "Zinc displaces iron from iron sulphate solution."
	},
	{
		ch: "ch3",
		title: "Copper + Silver Nitrate",
		eq: "Cu(s) + 2AgNO₃(aq) → Cu(NO₃)₂(aq) + 2Ag(s)",
		type: "Displacement",
		colour: "Colourless → blue; greyish Ag deposited",
		obs: "Silver is deposited; solution turns blue",
		cond: "Aqueous solution",
		tip: "Copper is more reactive than silver.",
		desc: "Copper displaces silver from silver nitrate solution."
	},
	{
		ch: "ch3",
		title: "Thermite Reaction",
		eq: "Fe₂O₃(s) + 2Al(s) → 2Fe(l) + Al₂O₃(s) + Heat",
		type: "Displacement / Redox (Highly Exothermic)",
		colour: "Molten iron produced",
		obs: "Large amount of heat; molten iron formed",
		cond: "Ignition mixture",
		tip: "Used for welding railway tracks. Aluminium acts as reducing agent.",
		desc: "Aluminium reduces iron(III) oxide to molten iron. Extremely exothermic reaction used in thermite welding."
	},
	{
		ch: "ch3",
		title: "Roasting of Zinc Sulphide",
		eq: "2ZnS(s) + 3O₂(g) → 2ZnO(s) + 2SO₂(g)",
		type: "Roasting",
		colour: "ZnO: yellow when hot, white when cold",
		obs: "Sulphur dioxide gas evolved",
		cond: "Heating in excess air",
		tip: "Roasting is for sulphide ores. Calcination is for carbonate ores.",
		desc: "Zinc sulphide is converted to zinc oxide by heating in excess air (roasting)."
	},
	{
		ch: "ch3",
		title: "Calcination of Zinc Carbonate",
		eq: "ZnCO₃(s) → ZnO(s) + CO₂(g)",
		type: "Calcination",
		colour: "ZnO: yellow hot → white cold",
		obs: "Carbon dioxide is released",
		cond: "Heating in limited air",
		tip: "Calcination is heating of carbonate ore in limited supply of air.",
		desc: "Zinc carbonate is heated to obtain zinc oxide and carbon dioxide."
	},
	{
		ch: "ch3",
		title: "Reduction of Zinc Oxide",
		eq: "ZnO(s) + C(s) → Zn(s) + CO(g)",
		type: "Reduction",
		colour: "Zinc metal obtained",
		obs: "Zinc is liberated",
		cond: "High temperature",
		tip: "Carbon acts as reducing agent for moderately reactive metals.",
		desc: "Zinc oxide is reduced to zinc metal by heating with carbon."
	},
	{
		ch: "ch3",
		title: "Formation of Sodium Chloride (Ionic Compound)",
		eq: "2Na(s) + Cl₂(g) → 2NaCl(s)",
		type: "Combination (Ionic Bond)",
		colour: "White crystalline solid",
		obs: "Bright yellow flame; white smoke of NaCl",
		cond: "Heating sodium in chlorine",
		tip: "Classic example of ionic compound formation by electron transfer.",
		desc: "Sodium loses electron and chlorine gains electron to form ionic sodium chloride."
	},
	{
		ch: "ch3",
		title: "Rusting of Iron",
		eq: "4Fe(s) + 3O₂(g) + xH₂O(l) → 2Fe₂O₃·xH₂O(s)",
		type: "Corrosion",
		colour: "Reddish-brown rust",
		obs: "Flaky reddish-brown coating develops",
		cond: "Moist air (both O₂ and H₂O needed)",
		tip: "Prevention: painting, galvanising, alloying, sacrificial protection.",
		desc: "Iron reacts with oxygen and moisture to form hydrated iron(III) oxide known as rust."
	},
	{
		ch: "ch4",
		title: "Combustion of Methane",
		eq: "CH₄(g) + 2O₂(g) → CO₂(g) + 2H₂O(g) + Heat + Light",
		type: "Combustion",
		colour: "Blue flame (complete combustion)",
		obs: "Heat and light are produced",
		cond: "Ignition in sufficient air/oxygen",
		tip: "Complete combustion gives clean blue flame. Insufficient oxygen gives sooty flame.",
		desc: "Methane burns completely in oxygen to form carbon dioxide and water, releasing large amount of energy."
	},
	{
		ch: "ch4",
		title: "Combustion of Ethanol",
		eq: "C₂H₅OH(l) + 3O₂(g) → 2CO₂(g) + 3H₂O(g) + Heat + Light",
		type: "Combustion",
		colour: "Blue flame",
		obs: "Heat and light released",
		cond: "Burning in air",
		tip: "Alcohols also undergo complete combustion like hydrocarbons.",
		desc: "Ethanol burns in air to produce carbon dioxide, water and energy."
	},
	{
		ch: "ch4",
		title: "Combustion of Carbon",
		eq: "C(s) + O₂(g) → CO₂(g) + Heat + Light",
		type: "Combustion",
		colour: "—",
		obs: "Heat and light produced",
		cond: "Burning in air/oxygen",
		tip: "Basic combustion reaction of carbon.",
		desc: "Carbon burns in oxygen to form carbon dioxide."
	},
	{
		ch: "ch4",
		title: "Oxidation of Ethanol to Ethanoic Acid",
		eq: "CH₃CH₂OH + 2[O] → CH₃COOH + H₂O",
		type: "Oxidation",
		colour: "Purple KMnO₄ decolourises",
		obs: "Colour of alkaline KMnO₄ disappears",
		cond: "Alkaline KMnO₄ or acidified K₂Cr₂O₇ + Heat",
		tip: "Very important. Alkaline KMnO₄ is a common oxidising agent in Class 10.",
		desc: "Ethanol is oxidised to ethanoic acid by strong oxidising agents on heating."
	},
	{
		ch: "ch4",
		title: "Hydrogenation of Ethene",
		eq: "CH₂=CH₂ + H₂ → CH₃–CH₃",
		type: "Addition Reaction",
		colour: "Colourless",
		obs: "Unsaturated compound becomes saturated",
		cond: "Nickel or Palladium catalyst",
		tip: "Used in hydrogenation of vegetable oils to make vanaspati ghee.",
		desc: "Ethene adds hydrogen in presence of Ni catalyst to form ethane (saturated hydrocarbon)."
	},
	{
		ch: "ch4",
		title: "Hydrogenation of Ethyne",
		eq: "CH≡CH + 2H₂ → CH₃–CH₃",
		type: "Addition Reaction",
		colour: "Colourless",
		obs: "Triple bond becomes single bond",
		cond: "Nickel catalyst",
		tip: "Shows addition reaction across multiple bonds.",
		desc: "Ethyne adds two molecules of hydrogen to form ethane."
	},
	{
		ch: "ch4",
		title: "Chlorination of Methane (Substitution)",
		eq: "CH₄ + Cl₂ → CH₃Cl + HCl",
		type: "Substitution Reaction",
		colour: "—",
		obs: "Chloromethane and hydrogen chloride formed",
		cond: "Sunlight",
		tip: "Substitution occurs only in presence of sunlight. Further substitution possible.",
		desc: "In sunlight, chlorine replaces hydrogen atom of methane to form chloromethane."
	},
	{
		ch: "ch4",
		title: "Ethanol + Sodium",
		eq: "2C₂H₅OH + 2Na → 2C₂H₅ONa + H₂↑",
		type: "Reaction with Metal",
		colour: "Colourless",
		obs: "Hydrogen gas is evolved",
		cond: "Room temperature",
		tip: "Used to detect alcoholic –OH group. Hydrogen burns with pop sound.",
		desc: "Ethanol reacts with sodium to form sodium ethoxide and hydrogen gas."
	},
	{
		ch: "ch4",
		title: "Dehydration of Ethanol",
		eq: "CH₃CH₂OH → CH₂=CH₂ + H₂O",
		type: "Dehydration",
		colour: "Colourless gas (ethene)",
		obs: "Ethene gas is produced",
		cond: "Conc. H₂SO₄, 443 K",
		tip: "Concentrated sulphuric acid acts as dehydrating agent. Temperature is important.",
		desc: "Ethanol on heating with excess concentrated sulphuric acid at 443 K undergoes dehydration to form ethene."
	},
	{
		ch: "ch4",
		title: "Ethanoic Acid + Sodium Hydroxide",
		eq: "CH₃COOH + NaOH → CH₃COONa + H₂O",
		type: "Neutralisation",
		colour: "Colourless solution",
		obs: "Salt and water formed",
		cond: "Room temperature",
		tip: "Ethanoic acid is a weak acid. This is a neutralisation reaction.",
		desc: "Ethanoic acid reacts with sodium hydroxide to form sodium ethanoate and water."
	},
	{
		ch: "ch4",
		title: "Ethanoic Acid + Sodium Carbonate",
		eq: "2CH₃COOH + Na₂CO₃ → 2CH₃COONa + H₂O + CO₂↑",
		type: "Acid + Carbonate",
		colour: "Colourless gas",
		obs: "Brisk effervescence due to CO₂",
		cond: "Room temperature",
		tip: "Confirms acidic nature of ethanoic acid. CO₂ turns lime water milky.",
		desc: "Ethanoic acid reacts with sodium carbonate to liberate carbon dioxide."
	},
	{
		ch: "ch4",
		title: "Ethanoic Acid + Sodium Hydrogen Carbonate",
		eq: "CH₃COOH + NaHCO₃ → CH₃COONa + H₂O + CO₂↑",
		type: "Acid + Hydrogen Carbonate",
		colour: "Colourless gas",
		obs: "Effervescence due to CO₂",
		cond: "Room temperature",
		tip: "Very common test for carboxylic acids.",
		desc: "Ethanoic acid reacts with baking soda to produce carbon dioxide, sodium ethanoate and water."
	},
	{
		ch: "ch4",
		title: "Esterification Reaction",
		eq: "CH₃COOH + C₂H₅OH ⇌ CH₃COOC₂H₅ + H₂O",
		type: "Esterification",
		colour: "Colourless; sweet smell",
		obs: "Sweet-smelling ester (ethyl ethanoate) is formed",
		cond: "Conc. H₂SO₄ (catalyst) + Heat",
		tip: "Reversible reaction. Concentrated H₂SO₄ is used as catalyst. Fruity smell is characteristic.",
		desc: "Ethanoic acid reacts with ethanol in presence of concentrated sulphuric acid to form ethyl ethanoate (ester) and water."
	},
	{
		ch: "ch4",
		title: "Saponification Reaction",
		eq: "CH₃COOC₂H₅ + NaOH → CH₃COONa + C₂H₅OH",
		type: "Saponification",
		colour: "—",
		obs: "Ester is hydrolysed to salt and alcohol",
		cond: "NaOH + Heat",
		tip: "Alkaline hydrolysis of ester. Used in soap manufacture.",
		desc: "When an ester is heated with sodium hydroxide, it gives the sodium salt of carboxylic acid and alcohol. This is saponification."
	},
	{
		ch: "ch4",
		title: "Reaction of Ethanoic Acid with Alcohol (General Esterification)",
		eq: "RCOOH + R'OH ⇌ RCOOR' + H₂O",
		type: "Esterification",
		colour: "Sweet smelling product",
		obs: "Ester with characteristic fruity smell formed",
		cond: "Acid catalyst + Heat",
		tip: "General reaction between carboxylic acid and alcohol.",
		desc: "Carboxylic acids react with alcohols to form esters in presence of acid catalyst."
	},
	{
		ch: "ch4",
		title: "Addition of Hydrogen to Unsaturated Hydrocarbon (General)",
		eq: "R–CH=CH–R + H₂ → R–CH₂–CH₂–R",
		type: "Addition / Hydrogenation",
		colour: "—",
		obs: "Unsaturated compound becomes saturated",
		cond: "Ni / Pd / Pt catalyst",
		tip: "Industrial application: conversion of oils into solid fats (vanaspati).",
		desc: "Unsaturated hydrocarbons add hydrogen across the double or triple bond in presence of catalyst to become saturated."
	},
	{
		ch: "ch4",
		title: "Substitution Reaction of Alkanes (General)",
		eq: "RH + Cl₂ → RCl + HCl",
		type: "Substitution",
		colour: "—",
		obs: "Haloalkane formed",
		cond: "Sunlight",
		tip: "Saturated hydrocarbons undergo substitution, not addition.",
		desc: "In presence of sunlight, hydrogen atoms of alkanes are replaced by halogen atoms."
	},
	{
		ch: "ch4",
		title: "Ethanol as Fuel (Combustion)",
		eq: "C₂H₅OH + 3O₂ → 2CO₂ + 3H₂O + Energy",
		type: "Combustion",
		colour: "Blue flame",
		obs: "Clean burning",
		cond: "Burning",
		tip: "Ethanol is used as a fuel and in spirit lamps.",
		desc: "Complete combustion of ethanol produces carbon dioxide, water and energy."
	},
	{
		ch: "ch4",
		title: "Formation of Micelle (Soap Action)",
		eq: "Soap molecules arrange into micelle (no chemical equation)",
		type: "Cleansing Action",
		colour: "—",
		obs: "Dirt and grease are emulsified and washed away",
		cond: "Soap + water + dirt",
		tip: "Hydrophobic tail attaches to grease, hydrophilic head to water. Micelle formation is key.",
		desc: "Soap molecules form micelles that trap grease and dirt, which are then washed away by water."
	}
];
var colours$1 = [
	{
		"name": "Copper Sulphate (hydrated)",
		"formula": "CuSO₄·5H₂O",
		"colour": "Blue crystals / blue solution",
		"remarks": "Most frequently asked. Turns white on strong heating.",
		"swatch": "#1e90ff"
	},
	{
		"name": "Copper Sulphate (anhydrous)",
		"formula": "CuSO₄",
		"colour": "White",
		"remarks": "Formed when hydrated CuSO₄ is heated strongly.",
		"swatch": "#f8fafc"
	},
	{
		"name": "Ferrous Sulphate (hydrated)",
		"formula": "FeSO₄·7H₂O",
		"colour": "Green crystals",
		"remarks": "Turns brown on heating due to formation of Fe₂O₃.",
		"swatch": "#22c55e"
	},
	{
		"name": "Ferric Oxide / Iron(III) Oxide",
		"formula": "Fe₂O₃",
		"colour": "Reddish-brown",
		"remarks": "Also the colour of rust (Fe₂O₃·xH₂O).",
		"swatch": "#b45309"
	},
	{
		"name": "Copper(II) Oxide",
		"formula": "CuO",
		"colour": "Black",
		"remarks": "Formed when copper is heated in air.",
		"swatch": "#000000"
	},
	{
		"name": "Copper metal",
		"formula": "Cu",
		"colour": "Reddish-brown",
		"remarks": "Deposited in displacement reactions.",
		"swatch": "#b45309"
	},
	{
		"name": "Copper Chloride",
		"formula": "CuCl₂",
		"colour": "Bluish-green solution",
		"remarks": "Formed when CuO reacts with HCl.",
		"swatch": "#0d9488"
	},
	{
		"name": "Barium Sulphate",
		"formula": "BaSO₄",
		"colour": "White precipitate",
		"remarks": "Insoluble. Classic double displacement product.",
		"swatch": "#f8fafc"
	},
	{
		"name": "Lead Iodide",
		"formula": "PbI₂",
		"colour": "Bright yellow precipitate",
		"remarks": "One of the most beautiful precipitates in Class 10.",
		"swatch": "#eab308"
	},
	{
		"name": "Lead Oxide",
		"formula": "PbO",
		"colour": "Yellow",
		"remarks": "Formed on heating lead nitrate.",
		"swatch": "#eab308"
	},
	{
		"name": "Lead Nitrate",
		"formula": "Pb(NO₃)₂",
		"colour": "White crystals",
		"remarks": "Gives brown fumes of NO₂ on heating.",
		"swatch": "#f8fafc"
	},
	{
		"name": "Nitrogen Dioxide",
		"formula": "NO₂",
		"colour": "Brown gas",
		"remarks": "Evolved when lead nitrate or some nitrates are heated.",
		"swatch": "#7f1d1d"
	},
	{
		"name": "Silver Chloride",
		"formula": "AgCl",
		"colour": "White (turns grey in sunlight)",
		"remarks": "Photolytic decomposition. Used in photography.",
		"swatch": "#f8fafc"
	},
	{
		"name": "Silver Bromide",
		"formula": "AgBr",
		"colour": "Pale yellow (turns grey in sunlight)",
		"remarks": "Also used in photography.",
		"swatch": "#fde68a"
	},
	{
		"name": "Silver Sulphide",
		"formula": "Ag₂S",
		"colour": "Black",
		"remarks": "Cause of tarnishing of silver.",
		"swatch": "#000000"
	},
	{
		"name": "Magnesium Oxide",
		"formula": "MgO",
		"colour": "White powder",
		"remarks": "Formed when magnesium burns with dazzling white flame.",
		"swatch": "#f8fafc"
	},
	{
		"name": "Calcium Oxide (Quick lime)",
		"formula": "CaO",
		"colour": "White",
		"remarks": "Formed by heating limestone.",
		"swatch": "#f8fafc"
	},
	{
		"name": "Calcium Carbonate",
		"formula": "CaCO₃",
		"colour": "White",
		"remarks": "Marble, limestone, chalk. Also the milky precipitate in lime water test.",
		"swatch": "#f8fafc"
	},
	{
		"name": "Zinc Oxide",
		"formula": "ZnO",
		"colour": "Yellow when hot, white when cold",
		"remarks": "Very important colour change question.",
		"swatch": "#f8fafc"
	},
	{
		"name": "Zinc metal",
		"formula": "Zn",
		"colour": "Bluish-white / grey",
		"remarks": "—",
		"swatch": "#d1d5db"
	},
	{
		"name": "Iron metal",
		"formula": "Fe",
		"colour": "Grey",
		"remarks": "—",
		"swatch": "#9ca3af"
	},
	{
		"name": "Aluminium metal",
		"formula": "Al",
		"colour": "Silvery-white",
		"remarks": "Protected by oxide layer.",
		"swatch": "#e5e7eb"
	},
	{
		"name": "Copper Carbonate / Basic Copper Carbonate",
		"formula": "CuCO₃·Cu(OH)₂",
		"colour": "Green",
		"remarks": "Green coating on copper articles (patina).",
		"swatch": "#16a34a"
	},
	{
		"name": "Copper Sulphide",
		"formula": "CuS",
		"colour": "Black",
		"remarks": "—",
		"swatch": "#000000"
	},
	{
		"name": "Sodium Chloride",
		"formula": "NaCl",
		"colour": "White crystalline",
		"remarks": "Common salt / rock salt.",
		"swatch": "#f8fafc"
	},
	{
		"name": "Sodium Carbonate (Washing Soda)",
		"formula": "Na₂CO₃·10H₂O",
		"colour": "White crystals",
		"remarks": "—",
		"swatch": "#f8fafc"
	},
	{
		"name": "Sodium Hydrogen Carbonate (Baking Soda)",
		"formula": "NaHCO₃",
		"colour": "White powder",
		"remarks": "—",
		"swatch": "#f8fafc"
	},
	{
		"name": "Bleaching Powder",
		"formula": "CaOCl₂",
		"colour": "Pale yellowish-white",
		"remarks": "—",
		"swatch": "#fef9c3"
	},
	{
		"name": "Plaster of Paris",
		"formula": "CaSO₄·½H₂O",
		"colour": "White powder",
		"remarks": "Sets into hard mass with water.",
		"swatch": "#f8fafc"
	},
	{
		"name": "Gypsum",
		"formula": "CaSO₄·2H₂O",
		"colour": "White solid",
		"remarks": "—",
		"swatch": "#f8fafc"
	},
	{
		"name": "Chlorine gas",
		"formula": "Cl₂",
		"colour": "Greenish-yellow",
		"remarks": "Produced at anode in chlor-alkali process.",
		"swatch": "#22c55e"
	},
	{
		"name": "Hydrogen gas",
		"formula": "H₂",
		"colour": "Colourless",
		"remarks": "Burns with pop sound.",
		"swatch": "#f8fafc"
	},
	{
		"name": "Oxygen gas",
		"formula": "O₂",
		"colour": "Colourless",
		"remarks": "Supports combustion; relights glowing splint.",
		"swatch": "#f8fafc"
	},
	{
		"name": "Carbon Dioxide",
		"formula": "CO₂",
		"colour": "Colourless",
		"remarks": "Turns lime water milky.",
		"swatch": "#f8fafc"
	},
	{
		"name": "Phenolphthalein (in basic medium)",
		"formula": "—",
		"colour": "Pink",
		"remarks": "Colourless in acid, pink in base.",
		"swatch": "#f472b6"
	},
	{
		"name": "Phenolphthalein (in acidic medium)",
		"formula": "—",
		"colour": "Colourless",
		"remarks": "—",
		"swatch": "#f8fafc"
	},
	{
		"name": "Methyl Orange (in acid)",
		"formula": "—",
		"colour": "Red / Pink",
		"remarks": "—",
		"swatch": "#ef4444"
	},
	{
		"name": "Methyl Orange (in base)",
		"formula": "—",
		"colour": "Yellow",
		"remarks": "—",
		"swatch": "#eab308"
	},
	{
		"name": "Blue Litmus (in acid)",
		"formula": "—",
		"colour": "Red",
		"remarks": "—",
		"swatch": "#ef4444"
	},
	{
		"name": "Red Litmus (in base)",
		"formula": "—",
		"colour": "Blue",
		"remarks": "—",
		"swatch": "#3b82f6"
	},
	{
		"name": "Turmeric (in base)",
		"formula": "—",
		"colour": "Reddish-brown",
		"remarks": "Remains yellow in acid.",
		"swatch": "#eab308"
	}
];
var definitions$1 = [
	{
		"title": "Chemical Reaction",
		"body": "A process in which two or more substances (reactants) react to form new substances (products) with completely different properties."
	},
	{
		"title": "Chemical Equation",
		"body": "A symbolic representation of a chemical reaction using symbols and formulae of the reactants and products."
	},
	{
		"title": "Balanced Chemical Equation",
		"body": "A chemical equation in which the number of atoms of each element is equal on both the reactant and product sides. It follows the law of conservation of mass."
	},
	{
		"title": "Combination Reaction",
		"body": "A reaction in which two or more substances combine to form a single new product."
	},
	{
		"title": "Decomposition Reaction",
		"body": "A reaction in which a single compound breaks down into two or more simpler substances."
	},
	{
		"title": "Thermal Decomposition",
		"body": "A decomposition reaction that is carried out by heating the reactant."
	},
	{
		"title": "Electrolytic Decomposition",
		"body": "A decomposition reaction that takes place when electric current is passed through the compound (usually in molten or aqueous state)."
	},
	{
		"title": "Photolytic Decomposition / Photochemical Decomposition",
		"body": "A decomposition reaction that is carried out by the action of light (usually sunlight)."
	},
	{
		"title": "Displacement Reaction",
		"body": "A reaction in which a more reactive element displaces a less reactive element from its compound."
	},
	{
		"title": "Double Displacement Reaction",
		"body": "A reaction in which two compounds exchange their ions to form two new compounds."
	},
	{
		"title": "Precipitation Reaction",
		"body": "A double displacement reaction in which one of the products is an insoluble solid (precipitate) that settles down."
	},
	{
		"title": "Neutralisation Reaction",
		"body": "A reaction in which an acid reacts with a base to form salt and water. It is a special case of double displacement reaction."
	},
	{
		"title": "Oxidation",
		"body": "In Class 10, oxidation is defined as the addition of oxygen to a substance or the removal of hydrogen from a substance."
	},
	{
		"title": "Reduction",
		"body": "In Class 10, reduction is defined as the removal of oxygen from a substance or the addition of hydrogen to a substance."
	},
	{
		"title": "Redox Reaction",
		"body": "A reaction in which oxidation and reduction take place simultaneously."
	},
	{
		"title": "Corrosion",
		"body": "The process of slow conversion of metals into their undesirable compounds (oxides, carbonates, sulphides, etc.) by the action of air, moisture and chemicals present in the atmosphere."
	},
	{
		"title": "Rancidity",
		"body": "The process of oxidation of oils and fats which results in an unpleasant smell and taste."
	},
	{
		"title": "Acid",
		"body": "A substance which releases H⁺ ions (or H₃O⁺ ions) when dissolved in water. Acids turn blue litmus red."
	},
	{
		"title": "Base",
		"body": "A substance which releases OH⁻ ions when dissolved in water. Bases turn red litmus blue and feel soapy to touch."
	},
	{
		"title": "Salt",
		"body": "A compound formed when the hydrogen ion of an acid is replaced by a metal ion or ammonium ion."
	},
	{
		"title": "Indicator",
		"body": "A substance that shows different colours in acidic and basic media and is used to test whether a substance is acidic or basic."
	},
	{
		"title": "pH Scale",
		"body": "A scale that measures the concentration of hydrogen ions in a solution. It ranges from 0 to 14. pH &lt; 7 is acidic, pH = 7 is neutral, pH &gt; 7 is basic."
	},
	{
		"title": "Olfactory Indicators",
		"body": "Substances whose smell changes in acidic or basic medium (e.g., onion, vanilla, clove oil)."
	},
	{
		"title": "Chlor-Alkali Process",
		"body": "The process of electrolysis of aqueous sodium chloride (brine) to produce sodium hydroxide, chlorine and hydrogen."
	},
	{
		"title": "Bleaching Powder",
		"body": "Calcium oxychloride (CaOCl₂) prepared by the action of chlorine on dry slaked lime. Used for bleaching and disinfecting water."
	},
	{
		"title": "Baking Soda",
		"body": "Sodium hydrogen carbonate (NaHCO₃). Used in baking, as an antacid and in soda-acid fire extinguishers."
	},
	{
		"title": "Washing Soda",
		"body": "Sodium carbonate decahydrate (Na₂CO₃·10H₂O). Used in glass, soap and paper industries and for removing permanent hardness of water."
	},
	{
		"title": "Plaster of Paris",
		"body": "Calcium sulphate hemihydrate (CaSO₄·½H₂O) obtained by heating gypsum at 373 K. Used for setting fractured bones and making casts."
	},
	{
		"title": "Gypsum",
		"body": "Calcium sulphate dihydrate (CaSO₄·2H₂O). On heating at 373 K it forms Plaster of Paris."
	},
	{
		"title": "Reactivity Series",
		"body": "A series of metals arranged in the order of their decreasing reactivity. K &gt; Na &gt; Ca &gt; Mg &gt; Al &gt; Zn &gt; Fe &gt; Pb &gt; H &gt; Cu &gt; Hg &gt; Ag &gt; Au."
	},
	{
		"title": "Amphoteric Oxide",
		"body": "An oxide that can react with both acids and bases to form salt and water (e.g., Al₂O₃, ZnO)."
	},
	{
		"title": "Roasting",
		"body": "The process of heating a sulphide ore strongly in excess of air so that it is converted into its oxide."
	},
	{
		"title": "Calcination",
		"body": "The process of heating a carbonate ore strongly in limited supply of air so that it is converted into its oxide."
	},
	{
		"title": "Thermite Reaction",
		"body": "A highly exothermic reaction in which aluminium acts as a reducing agent and reduces iron(III) oxide to molten iron. Used for welding railway tracks."
	},
	{
		"title": "Ionic Bond / Electrovalent Bond",
		"body": "The chemical bond formed by the complete transfer of electrons from a metal atom to a non-metal atom, resulting in the formation of oppositely charged ions."
	},
	{
		"title": "Covalent Bond",
		"body": "The chemical bond formed by the mutual sharing of electrons between two atoms (usually non-metals)."
	},
	{
		"title": "Catenation",
		"body": "The property of carbon atoms to link with other carbon atoms through covalent bonds to form long chains, branched chains or rings."
	},
	{
		"title": "Tetravalency of Carbon",
		"body": "Carbon has four valence electrons and therefore forms four covalent bonds with other atoms."
	},
	{
		"title": "Saturated Hydrocarbons",
		"body": "Hydrocarbons in which all carbon-carbon bonds are single bonds (alkanes). They undergo substitution reactions."
	},
	{
		"title": "Unsaturated Hydrocarbons",
		"body": "Hydrocarbons that contain at least one carbon-carbon double bond (alkenes) or triple bond (alkynes). They undergo addition reactions."
	},
	{
		"title": "Homologous Series",
		"body": "A series of organic compounds having the same functional group and similar chemical properties, in which each successive member differs by a –CH₂ group."
	},
	{
		"title": "Functional Group",
		"body": "An atom or group of atoms that determines the characteristic chemical properties of an organic compound (e.g., –OH, –COOH, –CHO)."
	},
	{
		"title": "Addition Reaction",
		"body": "A reaction in which atoms or groups of atoms are added across a double or triple bond of an unsaturated compound."
	},
	{
		"title": "Substitution Reaction",
		"body": "A reaction in which an atom or group of atoms in a molecule is replaced by another atom or group of atoms."
	},
	{
		"title": "Esterification",
		"body": "The reaction between a carboxylic acid and an alcohol in the presence of concentrated sulphuric acid to form an ester and water."
	},
	{
		"title": "Saponification",
		"body": "The alkaline hydrolysis of an ester to form the sodium salt of carboxylic acid (soap) and alcohol."
	},
	{
		"title": "Micelle",
		"body": "A spherical aggregate of soap molecules in water in which the hydrophobic tails are directed inwards and hydrophilic heads are directed outwards."
	}
];
function uniqBy(rows, key) {
	const seen = /* @__PURE__ */ new Set();
	const out = [];
	for (const row of rows) {
		const k = key(row);
		if (seen.has(k)) continue;
		seen.add(k);
		out.push(row);
	}
	return out;
}
var reactions = uniqBy([
	...reactions$1,
	...extraReactions,
	...moreReactions
], (r) => `${r.ch}|${r.title}|${r.eq}`);
var colours = uniqBy([
	...colours$1,
	...extraColours,
	...moreColours
], (c) => `${c.name}|${c.formula}`);
var definitions = uniqBy([
	...definitions$1,
	...extraDefs,
	...moreDefs
], (d) => d.title);
var notes = uniqBy([
	...notes$1,
	...extraNotes,
	...moreNotes
], (n) => n.title);
function mergeQuiz(parts) {
	return uniqBy(parts.flat(), (q) => q.q);
}
var quizData = {
	ch1: mergeQuiz([
		quizData$1.ch1,
		extraQuiz.ch1,
		moreQuiz.ch1,
		plusQuiz.ch1
	]),
	ch2: mergeQuiz([
		quizData$1.ch2,
		extraQuiz.ch2,
		moreQuiz.ch2,
		plusQuiz.ch2
	]),
	ch3: mergeQuiz([
		quizData$1.ch3,
		extraQuiz.ch3,
		moreQuiz.ch3,
		plusQuiz.ch3
	]),
	ch4: mergeQuiz([
		quizData$1.ch4,
		extraQuiz.ch4,
		moreQuiz.ch4,
		plusQuiz.ch4
	])
};
var chapters = [
	{
		id: "ch1",
		num: "01",
		title: "Chemical Reactions & Equations",
		blurb: "Combination, decomposition, displacement, redox, corrosion and rancidity."
	},
	{
		id: "ch2",
		title: "Acids, Bases & Salts",
		num: "02",
		blurb: "Indicators, pH, salts, chlor-alkali, bleaching powder, POP and baking soda."
	},
	{
		id: "ch3",
		title: "Metals & Non-metals",
		num: "03",
		blurb: "Reactivity series, extraction, thermite, roasting, calcination and alloys."
	},
	{
		id: "ch4",
		title: "Carbon & its Compounds",
		num: "04",
		blurb: "Bonding, combustion, ethanol, ethanoic acid, esters, soaps and micelles."
	}
];
/** Board-style explanations for bank items that shipped without a `why`. */
var QUIZ_WHY = {
	"Which of the following is a decomposition reaction?": "Step 1: Decomposition = one reactant → two or more products.\nStep 2: CaCO₃ → CaO + CO₂ fits. 2Mg + O₂ is combination, Zn + CuSO₄ is displacement, NaOH + HCl is neutralisation.",
	"When silver chloride is exposed to sunlight, it turns grey because of the formation of:": "Step 1: 2AgCl → 2Ag + Cl₂ in sunlight (photolysis).\nStep 2: Finely divided silver looks grey.\nStep 3: Not oxide, carbonate or nitrate.",
	"The brown fumes evolved on heating lead nitrate are of:": "Step 1: 2Pb(NO₃)₂ → 2PbO + 4NO₂ + O₂.\nStep 2: NO₂ is reddish-brown. Do not write NO, N₂O or N₂O₅.",
	"In the reaction Fe + CuSO₄ → FeSO₄ + Cu, the colour change observed is:": "Step 1: Blue CuSO₄ solution becomes pale green FeSO₄.\nStep 2: Reddish-brown copper deposits on iron.\nStep 3: So the solution goes blue → green.",
	"Which of the following is an example of a photolytic decomposition reaction?": "Step 1: Photolysis needs light.\nStep 2: 2AgBr → 2Ag + Br₂ in sunlight.\nStep 3: FeSO₄ and CaCO₃ are thermal; water is electrolytic.",
	"Respiration is regarded as an exothermic reaction because:": "Step 1: Exothermic = energy released.\nStep 2: Oxidation of glucose in cells releases energy for life processes.\nStep 3: “Glucose is broken down” or “oxygen is used” are incomplete reasons.",
	"The reaction 2H₂ + O₂ → 2H₂O is an example of:": "Two reactants combine to one product — combination. Not decomposition, displacement or double displacement.",
	"Rancidity can be prevented by:": "Oxidation of oils/fats causes rancidity. Airtight packing, antioxidants and nitrogen flushing all slow that oxidation — all of these.",
	"In the electrolysis of water, the gas collected at the cathode is:": "Cathode = reduction = hydrogen. Anode = oxygen. Volume of H₂ is twice O₂.",
	"Which of the following reactions is a redox reaction?": "CuO + H₂ → Cu + H₂O: CuO loses oxygen (reduction), H₂ gains oxygen (oxidation). Neutralisation and precipitation are not redox at Class 10 level; CaCO₃ heat is decomposition.",
	"The white precipitate formed when BaCl₂ reacts with Na₂SO₄ is:": "BaCl₂ + Na₂SO₄ → BaSO₄↓ + 2NaCl. BaSO₄ is the insoluble white precipitate.",
	"Quick lime reacts with water to form:": "CaO + H₂O → Ca(OH)₂ (slaked lime) + heat. Limestone is CaCO₃.",
	"Which metal is more reactive than iron but less reactive than zinc?": "Series: Zn > Fe > Pb > H > Cu. Nothing in the given list sits between Zn and Fe, so “none of these”.",
	"The chemical formula of rust is:": "Rust is hydrated ferric oxide, Fe₂O₃·xH₂O — not plain FeO, Fe₂O₃ or Fe₃O₄.",
	"When copper is heated in air, the black coating formed is of:": "2Cu + O₂ → 2CuO (black). Cu₂O is reddish; not carbonate or hydroxide here.",
	"In the reaction Zn + H₂SO₄ → ZnSO₄ + H₂, zinc is:": "Zinc gains oxygen / loses electrons: it is oxidised. Hydrogen ions are reduced to H₂.",
	"A solution of AgNO₃ is mixed with NaCl. The precipitate formed is:": "AgNO₃ + NaCl → AgCl↓ + NaNO₃. AgCl is a white insoluble (curdy) precipitate.",
	"Which of the following is not a combination reaction?": "CaCO₃ → CaO + CO₂ is decomposition (one reactant). The others join two reactants into one product.",
	"The reaction used in whitewashing is:": "Both steps: CaO + H₂O → Ca(OH)₂, then Ca(OH)₂ + CO₂ → CaCO₃ (shiny layer). Boards often want both.",
	"Which gas is produced when dilute HCl reacts with zinc?": "Zn + 2HCl → ZnCl₂ + H₂. Hydrogen burns with a pop. Not CO₂ (that is acid + carbonate).",
	"The chemical formula of bleaching powder is:": "NCERT writes bleaching powder as CaOCl₂ (calcium oxychloride), not Ca(OCl)₂ or CaCl₂.",
	"When CO₂ is passed through lime water, it turns milky due to the formation of:": "Ca(OH)₂ + CO₂ → CaCO₃↓ + H₂O. Insoluble CaCO₃ makes it milky.",
	"On passing excess CO₂ through the milky lime water, the milkiness disappears because of the formation of:": "CaCO₃ + CO₂ + H₂O → Ca(HCO₃)₂, which is soluble, so milkiness goes.",
	"Plaster of Paris is obtained by heating gypsum at:": "CaSO₄·2H₂O → CaSO₄·½H₂O at 373 K (about 100°C). Higher temperatures give dead-burnt plaster.",
	"The products of chlor-alkali process are:": "Electrolysis of brine: NaOH, Cl₂ (anode) and H₂ (cathode).",
	"Which of the following is an olfactory indicator?": "Onion, vanilla and clove oil — smell changes in acid/base. Litmus, phenolphthalein and methyl orange are visual.",
	"Baking soda on heating gives:": "2NaHCO₃ → Na₂CO₃ + H₂O + CO₂. That CO₂ makes cakes rise.",
	"The pH of pure water is:": "Neutral water has pH 7 at 298 K. 0 is strongly acidic, 14 strongly basic.",
	"Which acid is present in vinegar?": "Vinegar is 5–8% ethanoic / acetic acid in water. Not citric, lactic or formic.",
	"Tooth enamel is made of:": "Calcium phosphate (hydroxyapatite). Attacked when mouth pH < 5.5.",
	"Aqueous solution of sodium carbonate is:": "Na₂CO₃ solution is basic (hydrolysis). Used in washing soda chemistry.",
	"Which of the following salts does not contain water of crystallisation?": "Baking soda NaHCO₃ has none. Blue vitriol 5H₂O, washing soda 10H₂O, gypsum 2H₂O.",
	"The reaction between an acid and a base to form salt and water is called:": "Neutralisation — a special double displacement. Combination/decomposition/displacement are different types.",
	"When zinc reacts with sodium hydroxide, the gas evolved is:": "Zn + 2NaOH → Na₂ZnO₂ + H₂. Amphoteric zinc gives hydrogen with both acid and strong base.",
	"Methyl orange shows which colour in basic medium?": "Methyl orange: red in acid, yellow in base. Phenolphthalein is pink in base.",
	"Phenolphthalein is colourless in:": "Colourless in acidic (and in pure water / neutral). Pink only in basic medium.",
	"The chemical name of washing soda is:": "Sodium carbonate decahydrate, Na₂CO₃·10H₂O. Baking soda is NaHCO₃.",
	"Gypsum is:": "CaSO₄·2H₂O. POP is the hemihydrate; bleaching powder is CaOCl₂.",
	"Which of the following is used as an antacid?": "NaHCO₃ (baking soda) and Mg(OH)₂ (milk of magnesia) neutralise excess HCl. NaOH is too strong; bleaching powder is not an antacid.",
	"In the reaction CuO + 2HCl → CuCl₂ + H₂O, CuO acts as:": "Metal oxide + acid → salt + water, so CuO behaves as a base.",
	"Which of the following metals reacts vigorously with cold water?": "Sodium (and potassium) react vigorously with cold water. Mg needs hot water/steam; Al and Zn do not react with cold water.",
	"The correct order of reactivity is:": "Zn > Fe > Cu. Copper is below hydrogen and cannot displace iron or zinc.",
	"Aluminium oxide is:": "Amphoteric — reacts with both acids and bases. Na₂O is basic, CO₂ acidic.",
	"The process of coating iron with zinc is called:": "Galvanisation. Anodising is for aluminium oxide coats; electroplating is general; alloying is mixing metals.",
	"Thermite reaction is used for:": "Welding railway tracks with molten iron from Fe₂O₃ + 2Al.",
	"Roasting is done for which type of ores?": "Sulphide ores, heated in excess air to the oxide + SO₂. Carbonates are calcined.",
	"Calcination is done for which type of ores?": "Carbonate ores, heated in limited air to oxide + CO₂.",
	"Which metal is stored under kerosene?": "Sodium (and potassium) — they react with air and moisture. Mg, Al, Zn are not stored in kerosene.",
	"Which of the following is an ionic compound?": "NaCl is formed by electron transfer (metal + non-metal). CH₄, H₂O, CO₂ are covalent.",
	"In the reactivity series, hydrogen is placed between:": "Pb > H > Cu. Metals above H displace H₂ from dilute acids; Cu, Hg, Ag, Au do not.",
	"Zinc oxide is:": "Amphoteric, like Al₂O₃. Yellow when hot, white when cold.",
	"Which gas is evolved when a metal reacts with dilute acid?": "Hydrogen (pop test), for metals above hydrogen. Carbon dioxide is acid + carbonate.",
	"Anodising is done for which metal?": "Aluminium — a thick protective Al₂O₃ layer is grown by electrolysis.",
	"In the reaction ZnO + C → Zn + CO, carbon acts as:": "Carbon removes oxygen from ZnO, so it is the reducing agent (and is oxidised to CO).",
	"Which of the following metals does not react with dilute HCl?": "Copper is below hydrogen, so no H₂ with dilute HCl. Zn, Fe, Mg do react.",
	"The property of metals by which they can be beaten into thin sheets is called:": "Malleability. Ductility = wires; sonority = ringing sound.",
	"Brass is an alloy of:": "Copper + zinc. Bronze is copper + tin.",
	"Bronze is an alloy of:": "Copper + tin. Brass is copper + zinc.",
	"Which of the following is not a method to prevent corrosion?": "Painting, galvanisation and alloying protect. Simply heating the metal does not prevent rust.",
	"The number of covalent bonds in methane is:": "CH₄ is tetrahedral with four C–H single bonds. Carbon’s tetravalency.",
	"Which of the following is an unsaturated hydrocarbon?": "C₂H₄ (ethene) has a C=C double bond. CH₄, C₂H₆, C₃H₈ are saturated alkanes.",
	"The functional group present in ethanol is:": "–OH (alcohol). –CHO aldehyde, –COOH carboxylic acid, >C=O ketone.",
	"Esterification reaction is the reaction between:": "Carboxylic acid + alcohol (conc. H₂SO₄) → ester + water.",
	"The catalyst used in hydrogenation of oils is:": "Nickel or palladium/platinum. NCERT allows Ni (and mentions Pd/Pt). “Both Ni and Pt” matches the book’s catalysts.",
	"Saponification is the process of:": "Alkaline hydrolysis of an ester/fat to soap (sodium salt of fatty acid) and alcohol.",
	"Ethene on hydrogenation gives:": "C₂H₄ + H₂ → C₂H₆ (ethane) with Ni catalyst. Addition across the double bond.",
	"The reaction of ethanol with sodium gives:": "2C₂H₅OH + 2Na → 2C₂H₅ONa + H₂. Sodium ethoxide + hydrogen. This does not prove it is as acidic as ethanoic acid.",
	"Dehydration of ethanol with conc. H₂SO₄ at 443 K gives:": "Ethene. Remember the exact temperature 443 K — a favourite 1-mark trap.",
	"Which of the following compounds has a fruity smell?": "Esters such as ethyl ethanoate. Ethanol is spirit-like; ethanoic acid is vinegar.",
	"The molecular formula of ethanoic acid is:": "CH₃COOH (or C₂H₄O₂). CH₃OH methanol, C₂H₅OH ethanol, HCOOH methanoic acid.",
	"Carbon forms a large number of compounds mainly due to:": "Catenation plus tetravalency (and multiple bonds). Either one alone is incomplete.",
	"In a homologous series, successive members differ by:": "A –CH₂ group (mass 14 u), not CH₃.",
	"Which type of reaction is shown by saturated hydrocarbons with chlorine in sunlight?": "Substitution (CH₄ + Cl₂ → CH₃Cl + HCl in sunlight). Unsaturated compounds prefer addition.",
	"Soaps do not work well in hard water because:": "They form scum with Ca²⁺ and Mg²⁺. Detergents do not.",
	"The structure of methane is:": "Tetrahedral, bond angle about 109.5°. Not planar or linear.",
	"Which of the following is used as a fuel as well as a solvent?": "Ethanol — spirit lamps, fuel blends, and an industrial solvent.",
	"Vinegar is a dilute solution of:": "Ethanoic acid (5–8%) in water.",
	"The reaction CH₃COOH + C₂H₅OH ⇌ CH₃COOC₂H₅ + H₂O is catalysed by:": "Concentrated H₂SO₄. NaOH would hydrolyse the ester (saponification). Ni is for hydrogenation.",
	"Micelles are formed by:": "Soap (or detergent) molecules in water: hydrophobic tails in, hydrophilic heads out.",
	"Blue copper sulphate crystals turn white on heating because they lose:": "Water of crystallisation (5H₂O). White anhydrous CuSO₄ turns blue again on adding water.",
	"Which reaction is endothermic?": "Thermal decomposition of CaCO₃ (and photosynthesis) absorb heat. Respiration, combustion and neutralisation are exothermic.",
	"Tooth enamel starts dissolving when the pH in the mouth is:": "Below 5.5. Toothpaste is basic to neutralise acids.",
	"Which salt has no water of crystallisation?": "Baking soda NaHCO₃. Gypsum, washing soda and blue vitriol all do.",
	"In electrolytic refining of copper, pure copper is deposited at the:": "Cathode (pure Cu strip). Impure Cu is the anode; anode mud holds impurities.",
	"Brass is an alloy of copper and:": "Zinc. Bronze is copper and tin.",
	"Bromine water is decolourised by:": "Unsaturated hydrocarbons such as ethene (addition). Methane and ethane do not decolourise cold bromine water.",
	"Soap forms scum with hard water due to ions of:": "Ca²⁺ and Mg²⁺. Na⁺ and K⁺ are the soap cations themselves."
};
function whyFor(q, options, ans, existing) {
	if (existing && existing.trim()) return existing.trim();
	const hit = QUIZ_WHY[q];
	if (hit) return hit;
	return `Correct choice: ${options[ans]}. Tie it back to the NCERT definition, colour change or balanced equation for this topic. Check why each distractor names the wrong product, condition or reaction type.`;
}
var TOPIC = {
	ch1: "reactions",
	ch2: "acids",
	ch3: "metals",
	ch4: "carbon"
};
function inferKind(item) {
	if (item.kind) return item.kind;
	const q = item.q.toLowerCase();
	if (q.includes("assertion") || q.startsWith("a:") || q.includes("reason (r)")) return "assertion";
	if (q.startsWith("case:") || q.includes("case:")) return "case";
	return "mcq";
}
function inferMark(item, kind) {
	if (item.mark) return item.mark;
	if (kind === "assertion") return "2";
	if (kind === "case") return "3";
	return "1";
}
function slug(q) {
	return q.slice(0, 72).replace(/\s+/g, " ").trim();
}
var quizBank = [
	"ch1",
	"ch2",
	"ch3",
	"ch4"
].flatMap((ch) => quizData[ch].map((item) => {
	const kind = inferKind(item);
	return {
		...item,
		id: `${ch}::${slug(item.q)}`,
		ch,
		kind,
		mark: inferMark(item, kind),
		why: whyFor(item.q, item.options, item.ans, item.why),
		topic: TOPIC[ch]
	};
}));
var quizByChapter = (ch) => {
	if (ch === "mix") return quizBank;
	return quizBank.filter((q) => q.ch === ch);
};
quizBank.length, quizBank.filter((q) => q.kind === "mcq").length, quizBank.filter((q) => q.kind === "assertion").length, quizBank.filter((q) => q.kind === "case").length;
/** Common Class 10 names, formulae and everyday aliases used by global search. */
var ALIASES = {
	hcl: [
		"hydrochloric acid",
		"hydrogen chloride",
		"muriatic acid",
		"acid"
	],
	"hydrochloric acid": [
		"hcl",
		"hydrogen chloride",
		"acid"
	],
	h2so4: [
		"sulphuric acid",
		"sulfuric acid",
		"oil of vitriol",
		"acid"
	],
	"sulphuric acid": [
		"h2so4",
		"sulfuric acid",
		"acid"
	],
	hno3: [
		"nitric acid",
		"aqua fortis",
		"acid"
	],
	"nitric acid": ["hno3", "acid"],
	naoh: [
		"sodium hydroxide",
		"caustic soda",
		"lye",
		"base",
		"alkali"
	],
	"sodium hydroxide": [
		"naoh",
		"caustic soda",
		"base"
	],
	koh: [
		"potassium hydroxide",
		"caustic potash",
		"base"
	],
	caoh2: [
		"calcium hydroxide",
		"slaked lime",
		"lime water",
		"base"
	],
	"slaked lime": [
		"calcium hydroxide",
		"ca(oh)2",
		"lime water"
	],
	cao: [
		"calcium oxide",
		"quicklime",
		"lime"
	],
	"quicklime": ["cao", "calcium oxide"],
	caco3: [
		"calcium carbonate",
		"limestone",
		"marble",
		"chalk",
		"lime water milky"
	],
	"lime water": [
		"calcium hydroxide",
		"ca(oh)2",
		"caco3"
	],
	nahco3: [
		"sodium hydrogencarbonate",
		"sodium bicarbonate",
		"baking soda",
		"antacid"
	],
	"baking soda": ["nahco3", "sodium hydrogencarbonate"],
	na2co3: [
		"sodium carbonate",
		"washing soda",
		"soda ash"
	],
	"washing soda": [
		"na2co3",
		"na2co3·10h2o",
		"sodium carbonate decahydrate"
	],
	caocl2: ["bleaching powder", "calcium oxychloride"],
	"bleaching powder": ["caocl2", "calcium oxychloride"],
	caso4: [
		"gypsum",
		"plaster of paris",
		"pop"
	],
	gypsum: ["caso4·2h2o", "plaster of paris"],
	"plaster of paris": [
		"pop",
		"caso4·½h2o",
		"gypsum"
	],
	cuso4: [
		"copper sulphate",
		"copper sulfate",
		"blue vitriol"
	],
	"blue vitriol": ["cuso4·5h2o", "copper sulphate"],
	feso4: [
		"ferrous sulphate",
		"green vitriol",
		"iron(ii) sulphate"
	],
	fe2o3: [
		"ferric oxide",
		"iron(iii) oxide",
		"rust",
		"haematite"
	],
	rust: [
		"fe2o3·xh2o",
		"corrosion",
		"hydrated ferric oxide"
	],
	pbo: ["lead oxide", "litharge"],
	pbno3: ["lead nitrate"],
	pbi2: ["lead iodide", "yellow precipitate"],
	agcl: ["silver chloride", "photography"],
	agbr: ["silver bromide", "photography"],
	zno: [
		"zinc oxide",
		"yellow when hot",
		"white when cold"
	],
	cuo: ["copper oxide", "black copper oxide"],
	ch4: ["methane", "natural gas"],
	c2h4: [
		"ethene",
		"ethylene",
		"unsaturated"
	],
	c2h2: ["ethyne", "acetylene"],
	c2h5oh: [
		"ethanol",
		"ethyl alcohol",
		"alcohol"
	],
	ethanol: [
		"c2h5oh",
		"alcohol",
		"spirit"
	],
	ch3cooh: [
		"ethanoic acid",
		"acetic acid",
		"vinegar"
	],
	"ethanoic acid": [
		"acetic acid",
		"vinegar",
		"ch3cooh"
	],
	vinegar: [
		"ethanoic acid",
		"acetic acid",
		"ch3cooh"
	],
	"ethyl ethanoate": [
		"ester",
		"ch3cooc2h5",
		"fruity smell"
	],
	ester: [
		"ethyl ethanoate",
		"esterification",
		"fruity"
	],
	soap: [
		"saponification",
		"micelle",
		"sodium salt"
	],
	detergent: ["hard water", "scum"],
	thermite: [
		"fe2o3 + al",
		"welding railway tracks",
		"aluminothermy"
	],
	roasting: [
		"sulphide ore",
		"excess air",
		"so2"
	],
	calcination: [
		"carbonate ore",
		"limited air",
		"co2"
	],
	"chlor-alkali": [
		"brine",
		"nacl electrolysis",
		"naoh",
		"cl2",
		"h2"
	],
	brine: ["aqueous nacl", "chlor-alkali"],
	redox: [
		"oxidation",
		"reduction",
		"oxidised",
		"reduced"
	],
	acid: [
		"hcl",
		"h2so4",
		"hno3",
		"ethanoic acid",
		"h+"
	],
	base: [
		"naoh",
		"koh",
		"ca(oh)2",
		"oh-"
	],
	indicator: [
		"litmus",
		"methyl orange",
		"phenolphthalein",
		"universal"
	],
	ph: [
		"hydrogen ion",
		"acidic",
		"basic",
		"neutral"
	],
	catenation: ["carbon chain", "self linking"],
	homologous: ["ch2", "same functional group"]
};
function expandAliases(q) {
	const raw = q.trim().toLowerCase();
	if (!raw) return [];
	const extra = /* @__PURE__ */ new Set([raw]);
	for (const [k, vals] of Object.entries(ALIASES)) {
		if (raw.includes(k) || k.includes(raw)) {
			extra.add(k);
			for (const v of vals) extra.add(v);
		}
		for (const v of vals) if (raw.includes(v) || v.includes(raw)) {
			extra.add(k);
			extra.add(v);
			for (const x of vals) extra.add(x);
		}
	}
	return [...extra];
}
var TYPE_BUCKETS = [
	"Combination",
	"Thermal Decomposition",
	"Decomposition",
	"Displacement",
	"Double Displacement",
	"Redox",
	"Neutralisation",
	"Combustion",
	"Electrolysis",
	"Photolysis",
	"Acid + Metal",
	"Esterification",
	"Addition",
	"Substitution",
	"Corrosion",
	"Extraction"
];
function bucketsFor(type) {
	const t = type.toLowerCase();
	const out = [];
	const add = (b) => {
		if (!out.includes(b)) out.push(b);
	};
	if (t.includes("double displacement") || t.includes("precipitation")) add("Double Displacement");
	else if (t.includes("displacement")) add("Displacement");
	if (t.includes("thermal decomposition")) add("Thermal Decomposition");
	if (t.includes("photolyt") || t.includes("photochemical")) add("Photolysis");
	if (t.includes("electroly")) add("Electrolysis");
	if (t.includes("decomposition") && !t.includes("thermal") && !t.includes("photolyt") && !t.includes("electroly")) add("Decomposition");
	if (t.includes("combination")) add("Combination");
	if (t.includes("redox") || t.includes("oxidation") || t.includes("reduction")) add("Redox");
	if (t.includes("neutral")) add("Neutralisation");
	if (t.includes("combustion")) add("Combustion");
	if (t.includes("acid + metal") || t.includes("metal + acid")) add("Acid + Metal");
	if (t.includes("ester")) add("Esterification");
	if (t.includes("addition") || t.includes("hydrogenation")) add("Addition");
	if (t.includes("substitution")) add("Substitution");
	if (t.includes("corrosion") || t.includes("rust") || t.includes("galvanis")) add("Corrosion");
	if (t.includes("roast") || t.includes("calcin") || t.includes("extraction") || t.includes("aluminotherm")) add("Extraction");
	return out;
}
var REAGENTS = [
	{
		id: "HCl",
		labels: ["hcl", "hydrochloric"]
	},
	{
		id: "H₂SO₄",
		labels: [
			"h2so4",
			"h₂so₄",
			"sulphuric",
			"sulfuric"
		]
	},
	{
		id: "NaOH",
		labels: ["naoh", "sodium hydroxide"]
	},
	{
		id: "CuSO₄",
		labels: [
			"cuso4",
			"cuso₄",
			"copper sulphate",
			"copper sulfate"
		]
	},
	{
		id: "FeSO₄",
		labels: [
			"feso4",
			"feso₄",
			"ferrous"
		]
	},
	{
		id: "CaCO₃",
		labels: [
			"caco3",
			"caco₃",
			"limestone",
			"marble"
		]
	},
	{
		id: "CaO",
		labels: ["cao", "quicklime"]
	},
	{
		id: "Zn",
		labels: ["zn", "zinc"]
	},
	{
		id: "Fe",
		labels: ["fe", "iron"]
	},
	{
		id: "Al",
		labels: [
			"al",
			"aluminium",
			"aluminum"
		]
	},
	{
		id: "Cu",
		labels: ["cu", "copper"]
	},
	{
		id: "AgNO₃",
		labels: [
			"agno3",
			"agno₃",
			"silver nitrate"
		]
	},
	{
		id: "Ethanol",
		labels: [
			"ethanol",
			"c2h5oh",
			"c₂h₅oh"
		]
	},
	{
		id: "Ethanoic acid",
		labels: [
			"ethanoic",
			"acetic",
			"ch3cooh",
			"ch₃cooh"
		]
	},
	{
		id: "NaHCO₃",
		labels: [
			"nahco3",
			"nahco₃",
			"baking soda"
		]
	}
];
function matchesReagent(r, id) {
	const spec = REAGENTS.find((x) => x.id === id);
	if (!spec) return false;
	const blob = `${r.title} ${r.eq} ${r.type} ${r.desc} ${r.cond} ${r.tip}`.toLowerCase();
	return spec.labels.some((l) => blob.includes(l));
}
function reactionKey(r) {
	return `${r.ch}::${r.title}`;
}
function fold(s) {
	return s.toLowerCase().replace(/[₀₁₂₃₄₅₆₇₈₉]/g, (c) => "0123456789"["₀₁₂₃₄₅₆₇₈₉".indexOf(c)] ?? c).replace(/[·•]/g, " ").replace(/[^a-z0-9]+/g, " ").trim();
}
function fuzzy(hay, needle) {
	if (!needle) return 0;
	const h = fold(hay);
	const n = fold(needle);
	if (!h || !n) return 0;
	if (h === n) return 100;
	if (h.startsWith(n)) return 92;
	if (h.includes(` ${n} `) || h.includes(` ${n}`) || h.startsWith(`${n} `)) return 84;
	if (h.includes(n)) return 72;
	const parts = n.split(" ").filter(Boolean);
	if (parts.length > 1 && parts.every((p) => h.includes(p))) return 64;
	let i = 0;
	for (const ch of h) {
		if (ch === n[i]) i += 1;
		if (i >= n.length) return Math.max(28, 48 - Math.min(20, h.length - n.length));
	}
	return 0;
}
function bestScore(blob, needles) {
	let m = 0;
	for (const n of needles) m = Math.max(m, fuzzy(blob, n));
	return m;
}
function searchVault(query, limit = 24) {
	const q = query.trim();
	if (q.length < 1) return [];
	const needles = [q, ...expandAliases(q)].slice(0, 12);
	const hits = [];
	for (const ch of chapters) {
		const score = bestScore(`${ch.title} ${ch.blurb} chapter ${ch.num} ${ch.id}`, needles);
		if (score >= 28) hits.push({
			id: ch.id,
			kind: "chapter",
			title: `Chapter ${ch.num} · ${ch.title}`,
			snippet: ch.blurb,
			href: "chapter-map",
			score: score + 4
		});
	}
	for (const r of reactions) {
		const score = bestScore(`${r.title} ${r.eq} ${r.type} ${r.colour} ${r.obs} ${r.cond} ${r.tip} ${r.desc} ${r.ch}`, needles);
		if (score >= 28) hits.push({
			id: reactionKey(r),
			kind: "reaction",
			title: r.title,
			snippet: `${r.type} · ${r.eq}`,
			href: "reactions",
			score
		});
	}
	for (const c of colours) {
		const score = bestScore(`${c.name} ${c.formula} ${c.colour} ${c.remarks}`, needles);
		if (score >= 28) hits.push({
			id: `${c.name}|${c.formula}`,
			kind: "colour",
			title: c.name,
			snippet: `${c.formula} · ${c.colour}`,
			href: "colours",
			score
		});
	}
	for (const d of definitions) {
		const score = bestScore(`${d.title} ${d.body}`, needles);
		if (score >= 28) hits.push({
			id: d.title,
			kind: "definition",
			title: d.title,
			snippet: d.body.slice(0, 140),
			href: "definitions",
			score
		});
	}
	for (const n of notes) {
		const score = bestScore(`${n.title} ${n.body}`, needles);
		if (score >= 28) hits.push({
			id: n.title,
			kind: "note",
			title: n.title,
			snippet: n.body.replace(/\s+/g, " ").slice(0, 140),
			href: "notes",
			score
		});
	}
	for (const item of quizBank) {
		const score = bestScore(`${item.q} ${item.options.join(" ")} ${item.why}`, needles);
		if (score >= 28) hits.push({
			id: item.id,
			kind: "quiz",
			title: item.q.replace(/\n/g, " ").slice(0, 110),
			snippet: `Chapter ${item.ch.slice(2)} · ${item.mark}-mark ${item.kind}`,
			href: "quiz",
			score
		});
	}
	hits.sort((a, b) => b.score - a.score || a.title.localeCompare(b.title));
	const seen = /* @__PURE__ */ new Set();
	const out = [];
	for (const h of hits) {
		const k = `${h.kind}:${h.id}`;
		if (seen.has(k)) continue;
		seen.add(k);
		out.push(h);
		if (out.length >= limit) break;
	}
	return out;
}
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var KIND_LABEL = {
	reaction: "Reaction",
	colour: "Colour",
	definition: "Definition",
	note: "Note",
	quiz: "Question",
	chapter: "Chapter"
};
function GlobalSearch({ open, query, onQuery, onClose, onPick }) {
	const inputRef = (0, import_react.useRef)(null);
	const hits = (0, import_react.useMemo)(() => searchVault(query, 18), [query]);
	(0, import_react.useEffect)(() => {
		if (open) inputRef.current?.focus();
	}, [open]);
	(0, import_react.useEffect)(() => {
		const onKey = (e) => {
			if (e.key === "Escape") onClose();
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [onClose]);
	if (!open) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-0 z-[60] flex items-start justify-center bg-bg/70 p-3 pt-[12vh] backdrop-blur-sm",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			className: "absolute inset-0 cursor-default",
			"aria-label": "Close search",
			onClick: onClose
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "modal-enter relative w-full max-w-xl overflow-hidden rounded-3xl border border-border bg-surface shadow-[0_30px_60px_rgba(0,0,0,0.4)]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "flex items-center gap-3 border-b border-border px-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "size-4 text-muted" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							ref: inputRef,
							value: query,
							onChange: (e) => onQuery(e.target.value),
							placeholder: "Search reactions, HCl, colours, notes, questions…",
							className: "h-14 min-w-0 flex-1 bg-transparent text-sm text-fg outline-none placeholder:text-muted"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("kbd", {
							className: "hidden rounded-md border border-border px-1.5 py-0.5 text-[10px] text-muted sm:block",
							children: "ESC"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "max-h-[min(24rem,50vh)] overflow-y-auto p-2",
					children: query.trim() && hits.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "px-3 py-8 text-center text-sm text-muted",
						children: "No matches. Try a formula or an alias."
					}) : hits.map((hit) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => onPick(hit),
						className: "flex w-full flex-col rounded-2xl px-3 py-2.5 text-left hover:bg-raised",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10px] font-semibold uppercase tracking-wider text-primary",
								children: KIND_LABEL[hit.kind]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm font-medium text-fg",
								children: hit.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "line-clamp-2 text-xs text-muted",
								children: hit.snippet
							})
						]
					}, `${hit.kind}-${hit.id}`))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: cn("border-t border-border px-4 py-2 text-[11px] text-muted"),
					children: "Aliases work: HCl, hydrochloric acid, acid · CuSO₄, blue vitriol · POP, gypsum"
				})
			]
		})]
	});
}
function topicMastery(ch, state) {
	const rx = reactions.filter((r) => r.ch === ch);
	const learned = rx.filter((r) => state.mastery[reactionKey(r)] === "learned").length;
	const review = rx.filter((r) => state.mastery[reactionKey(r)] === "review").length;
	const rxScore = rx.length ? (learned + .35 * review) / rx.length : 0;
	const logs = state.quizLog.filter((l) => l.ch === ch || l.ch === "mix").slice(-6);
	const quizPct = logs.length ? logs.reduce((s, l) => s + (l.total ? l.score / l.total : 0), 0) / logs.length : 0;
	return {
		pct: learned + review + logs.length > 0 ? Math.round(100 * (.55 * rxScore + .45 * quizPct)) : 0,
		learned,
		review,
		total: rx.length,
		quizPct: Math.round(quizPct * 100)
	};
}
function overallMastery(state) {
	const parts = [
		"ch1",
		"ch2",
		"ch3",
		"ch4"
	].map((c) => topicMastery(c, state).pct);
	if (parts.every((p) => p === 0)) return 0;
	return Math.round(parts.reduce((a, b) => a + b, 0) / 4);
}
function weakestChapter(state) {
	let min = "ch1";
	let val = 101;
	for (const ch of [
		"ch1",
		"ch2",
		"ch3",
		"ch4"
	]) {
		const p = topicMastery(ch, state).pct;
		if (p < val) {
			val = p;
			min = ch;
		}
	}
	return min;
}
function wrongQuestionIds(state) {
	const last = [...state.quizLog].reverse();
	const ids = /* @__PURE__ */ new Set();
	for (const log of last) for (const w of log.wrong) ids.add(w);
	return [...ids].filter((id) => quizBank.some((q) => q.id === id));
}
var OLD_STAR_KEY = "chemvault-stars";
function readLegacyStars() {
	if (typeof localStorage === "undefined") return [];
	try {
		const raw = localStorage.getItem(OLD_STAR_KEY);
		if (!raw) return [];
		const parsed = JSON.parse(raw);
		return Array.isArray(parsed) ? parsed.filter((x) => typeof x === "string") : [];
	} catch {
		return [];
	}
}
function touch(s) {
	return {
		...s,
		updatedAt: Date.now()
	};
}
function toggleIn(list, key) {
	return list.includes(key) ? list.filter((x) => x !== key) : [...list, key];
}
var useStudent = create()(persist((set, get) => ({
	...EMPTY_STUDENT,
	hydrated: false,
	markHydrated: () => {
		const legacy = readLegacyStars();
		if (legacy.length && get().stars.length === 0) {
			set({
				stars: legacy,
				hydrated: true,
				updatedAt: Date.now()
			});
			return;
		}
		set({ hydrated: true });
	},
	applyRemote: (remote) => {
		set({
			...mergePayload(get().snapshot(), remote),
			hydrated: true
		});
	},
	setTheme: (theme) => set(touch({
		...get().snapshot(),
		theme
	})),
	finishOnboarding: () => set(touch({
		...get().snapshot(),
		onboardingDone: true
	})),
	toggleStar: (key) => set(touch({
		...get().snapshot(),
		stars: toggleIn(get().stars, key)
	})),
	toggleBook: (kind, key) => {
		const snap = get().snapshot();
		if (kind === "def") set(touch({
			...snap,
			bookDefs: toggleIn(snap.bookDefs, key)
		}));
		else if (kind === "note") set(touch({
			...snap,
			bookNotes: toggleIn(snap.bookNotes, key)
		}));
		else set(touch({
			...snap,
			bookQuiz: toggleIn(snap.bookQuiz, key)
		}));
	},
	setMastery: (key, flag) => set(touch({
		...get().snapshot(),
		mastery: {
			...get().mastery,
			[key]: flag
		}
	})),
	cycleMastery: (key) => {
		const cur = get().mastery[key] ?? "unset";
		const next = cur === "unset" ? "learned" : cur === "learned" ? "review" : "unset";
		set(touch({
			...get().snapshot(),
			mastery: {
				...get().mastery,
				[key]: next
			}
		}));
	},
	recordQuiz: (entry) => {
		const snap = get().snapshot();
		set(touch({
			...snap,
			quizLog: [...snap.quizLog, entry].slice(-80),
			streak: bumpStreak(snap.streak)
		}));
	},
	snapshot: () => {
		const s = get();
		return {
			v: 1,
			updatedAt: s.updatedAt,
			theme: s.theme,
			onboardingDone: s.onboardingDone,
			stars: s.stars,
			bookDefs: s.bookDefs,
			bookNotes: s.bookNotes,
			bookQuiz: s.bookQuiz,
			mastery: s.mastery,
			quizLog: s.quizLog,
			streak: s.streak
		};
	}
}), {
	name: "chemvault-student",
	storage: createJSONStorage(() => localStorage),
	partialize: (s) => ({
		v: s.v,
		updatedAt: s.updatedAt,
		theme: s.theme,
		onboardingDone: s.onboardingDone,
		stars: s.stars,
		bookDefs: s.bookDefs,
		bookNotes: s.bookNotes,
		bookQuiz: s.bookQuiz,
		mastery: s.mastery,
		quizLog: s.quizLog,
		streak: s.streak
	}),
	skipHydration: true
}));
function MasteryStrip() {
	const mastery = useStudent((s) => s.mastery);
	const quizLog = useStudent((s) => s.quizLog);
	const streak = useStudent((s) => s.streak);
	const stars = useStudent((s) => s.stars);
	const snap = (0, import_react.useMemo)(() => ({
		v: 1,
		updatedAt: 0,
		theme: "dark",
		onboardingDone: true,
		stars,
		bookDefs: [],
		bookNotes: [],
		bookQuiz: [],
		mastery,
		quizLog,
		streak
	}), [
		mastery,
		quizLog,
		stars,
		streak
	]);
	const overall = overallMastery(snap);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "scroll-mt-24 rounded-3xl border border-border bg-surface p-5 sm:p-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-end justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-semibold uppercase tracking-[0.18em] text-muted",
					children: "Mastery"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 font-display text-3xl tabular-nums text-fg",
					children: [overall, "%"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted",
					children: "Built from learned reactions, review flags and recent quiz scores — per chapter, not a vague page count."
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl border border-border bg-bg px-4 py-3 text-right",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[10px] font-semibold uppercase tracking-wider text-muted",
						children: "Streak"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-2xl tabular-nums text-primary",
						children: streak.count
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-muted",
						children: ["day", streak.count === 1 ? "" : "s"]
					})
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4",
			children: chapters.map((ch) => {
				const m = topicMastery(ch.id, snap);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl bg-bg p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs font-semibold text-muted",
								children: ["Ch ", ch.num]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm font-semibold tabular-nums text-fg",
								children: [m.pct, "%"]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2 h-1.5 overflow-hidden rounded-full bg-raised",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-full rounded-full bg-primary transition-[width] duration-300",
								style: { width: `${m.pct}%` }
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 text-[11px] text-muted",
							children: [
								m.learned,
								"/",
								m.total,
								" learned · quiz ",
								m.quizPct,
								"%"
							]
						})
					]
				}, ch.id);
			})
		})]
	});
}
var STEPS = [
	{
		title: "Your Class 10 chemistry lab",
		body: "Reactions, colours, definitions, exam notes and a full quiz bank — written to NCERT language, not watered down.",
		icon: FlaskConical
	},
	{
		title: "Find anything in a second",
		body: "Search HCl, hydrochloric acid, or just “acid”. Aliases, formulae, colours and questions all live in one index. Press ⌘K anytime.",
		icon: Search
	},
	{
		title: "Mark it. Master it.",
		body: "Toggle Learned or Needs review on every reaction. Stars, definitions and missed questions collect in My Revision.",
		icon: Bookmark
	},
	{
		title: "Quiz like the board paper",
		body: "1-mark MCQs, assertion–reason, case-based, timed mode, exam simulation, retry-wrong and a daily streak. Sign in to sync devices.",
		icon: Sparkles
	}
];
function Onboarding() {
	const done = useStudent((s) => s.onboardingDone);
	const hydrated = useStudent((s) => s.hydrated);
	const finish = useStudent((s) => s.finishOnboarding);
	const [i, setI] = (0, import_react.useState)(0);
	if (!hydrated || done) return null;
	const step = STEPS[i];
	const Icon = step.icon;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-[70] grid place-items-end bg-bg/70 p-4 backdrop-blur-sm sm:place-items-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "modal-enter w-full max-w-md rounded-3xl border border-border bg-surface p-6 shadow-[0_30px_60px_rgba(0,0,0,0.35)]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex size-11 items-center justify-center rounded-2xl bg-primary/15 text-primary",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-5" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-muted",
					children: [
						i + 1,
						" / ",
						STEPS.length
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-2 font-display text-2xl text-fg",
					children: step.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm leading-relaxed text-muted",
					children: step.body
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-5 flex gap-1.5",
					children: STEPS.map((_, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `h-1.5 flex-1 rounded-full ${idx <= i ? "bg-primary" : "bg-border"}` }, idx))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5 flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => finish(),
						className: "h-11 flex-1 rounded-xl border border-border text-sm font-medium text-muted",
						children: "Skip"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => {
							if (i + 1 >= STEPS.length) finish();
							else setI((n) => n + 1);
						},
						className: "h-11 flex-1 rounded-xl bg-primary text-sm font-semibold text-bg",
						children: i + 1 >= STEPS.length ? "Start studying" : "Next"
					})]
				})
			]
		})
	});
}
function PwaRegister() {
	const [offline, setOffline] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (!("serviceWorker" in navigator)) return;
		const register = () => {
			navigator.serviceWorker.register("/sw.js").catch(() => void 0);
		};
		if (document.readyState === "complete") register();
		else window.addEventListener("load", register, { once: true });
	}, []);
	(0, import_react.useEffect)(() => {
		const sync = () => setOffline(!navigator.onLine);
		sync();
		window.addEventListener("online", sync);
		window.addEventListener("offline", sync);
		return () => {
			window.removeEventListener("online", sync);
			window.removeEventListener("offline", sync);
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [offline ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "hidden h-11 items-center rounded-xl border border-border px-3 text-xs font-medium text-muted sm:inline-flex",
		children: "Offline pack ready"
	}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
		href: "?install=1",
		className: "inline-flex size-11 shrink-0 items-center justify-center rounded-xl border border-border text-muted hover:text-fg",
		"aria-label": "Install ChemVault",
		title: "Install as an app",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-4" })
	})] });
}
/** Mulberry32 — deterministic enough to reshuffle on each page load. */
function mulberry32(seed) {
	let t = seed >>> 0;
	return () => {
		t += 1831565813;
		let r = Math.imul(t ^ t >>> 15, 1 | t);
		r ^= r + Math.imul(r ^ r >>> 7, 61 | r);
		return ((r ^ r >>> 14) >>> 0) / 4294967296;
	};
}
function shuffle(items, seed) {
	const rand = mulberry32(seed);
	const arr = [...items];
	for (let i = arr.length - 1; i > 0; i--) {
		const j = Math.floor(rand() * (i + 1));
		[arr[i], arr[j]] = [arr[j], arr[i]];
	}
	return arr;
}
function sessionSeed() {
	if (typeof crypto !== "undefined" && "getRandomValues" in crypto) {
		const buf = /* @__PURE__ */ new Uint32Array(1);
		crypto.getRandomValues(buf);
		return buf[0];
	}
	return (Date.now() ^ Math.floor(Math.random() * 1e9)) >>> 0;
}
function prepare(items, seed) {
	return shuffle(items, seed).map((item, idx) => {
		const order = shuffle(item.options.map((text, i) => ({
			text,
			i
		})), seed + idx * 97 + 13);
		return {
			...item,
			options: order.map((o) => o.text),
			ans: order.findIndex((o) => o.i === item.ans),
			seed
		};
	});
}
function filterBank(ch, kind, mark) {
	let src = quizByChapter(ch);
	if (kind !== "all") src = src.filter((q) => q.kind === kind);
	if (mark !== "all") src = src.filter((q) => q.mark === mark);
	return src;
}
function QuizEngine({ focusId, onConsumedFocus }) {
	const [ch, setCh] = (0, import_react.useState)(null);
	const [mode, setMode] = (0, import_react.useState)("practice");
	const [kind, setKind] = (0, import_react.useState)("all");
	const [bank, setBank] = (0, import_react.useState)([]);
	const [i, setI] = (0, import_react.useState)(0);
	const [score, setScore] = (0, import_react.useState)(0);
	const [picked, setPicked] = (0, import_react.useState)(null);
	const [done, setDone] = (0, import_react.useState)(false);
	const [wrong, setWrong] = (0, import_react.useState)([]);
	const [seconds, setSeconds] = (0, import_react.useState)(0);
	const startedAt = (0, import_react.useRef)(0);
	const seedRef = (0, import_react.useRef)(sessionSeed());
	const closingRef = (0, import_react.useRef)(false);
	const recordQuiz = useStudent((s) => s.recordQuiz);
	const toggleBook = useStudent((s) => s.toggleBook);
	const bookQuiz = useStudent((s) => s.bookQuiz);
	const mastery = useStudent((s) => s.mastery);
	const quizLog = useStudent((s) => s.quizLog);
	const stars = useStudent((s) => s.stars);
	const q = bank[i];
	const examMode = mode === "exam";
	const timed = mode === "timed" || mode === "exam";
	const analytics = (0, import_react.useMemo)(() => {
		const recent = quizLog.slice(-8);
		const byCh = (id) => {
			const rows = recent.filter((l) => l.ch === id || l.ch === "mix");
			if (!rows.length) return null;
			return Math.round(100 * rows.reduce((s, l) => s + l.score / Math.max(l.total, 1), 0) / rows.length);
		};
		return {
			recent,
			byCh
		};
	}, [quizLog]);
	const start = (id, nextMode = mode) => {
		seedRef.current = sessionSeed();
		let source = filterBank(id, kind, "all");
		if (nextMode === "retry") {
			const ids = wrongQuestionIds({
				v: 1,
				updatedAt: 0,
				theme: "dark",
				onboardingDone: true,
				stars,
				bookDefs: [],
				bookNotes: [],
				bookQuiz,
				mastery,
				quizLog,
				streak: {
					count: 0,
					lastDay: ""
				}
			});
			source = quizBank.filter((item) => ids.includes(item.id) || bookQuiz.includes(item.id));
			if (source.length === 0) source = filterBank(id, kind, "all");
		}
		if (nextMode === "adaptive") {
			const weak = weakestChapter({
				v: 1,
				updatedAt: 0,
				theme: "dark",
				onboardingDone: true,
				stars,
				bookDefs: [],
				bookNotes: [],
				bookQuiz,
				mastery,
				quizLog,
				streak: {
					count: 0,
					lastDay: ""
				}
			});
			source = filterBank(weak, kind, "all");
			id = weak;
		}
		const cap = nextMode === "exam" ? 20 : nextMode === "practice" ? 12 : 16;
		const sliced = shuffle(source, seedRef.current).slice(0, Math.min(cap, source.length));
		setCh(id);
		setMode(nextMode);
		setBank(prepare(sliced, seedRef.current));
		setI(0);
		setScore(0);
		setPicked(null);
		setDone(false);
		setWrong([]);
		closingRef.current = false;
		startedAt.current = Date.now();
		setSeconds(nextMode === "exam" ? 720 : nextMode === "timed" ? 45 : 0);
	};
	(0, import_react.useEffect)(() => {
		if (focusId) {
			const item = quizBank.find((x) => x.id === focusId);
			if (item) {
				seedRef.current = sessionSeed();
				setCh(item.ch);
				setMode("practice");
				setBank(prepare([item], seedRef.current));
				setI(0);
				setScore(0);
				setPicked(null);
				setDone(false);
				setWrong([]);
				startedAt.current = Date.now();
			}
			onConsumedFocus?.();
		}
	}, [focusId, onConsumedFocus]);
	(0, import_react.useEffect)(() => {
		if (!timed || done || !ch || !q) return;
		if (seconds <= 0) {
			if (mode === "timed" && picked === null) {
				setWrong((w) => [...w, q.id]);
				setPicked(-1);
			}
			if (mode === "exam") finishPaper(score, wrong);
			return;
		}
		const t = window.setTimeout(() => setSeconds((s) => s - 1), 1e3);
		return () => window.clearTimeout(t);
	}, [
		timed,
		seconds,
		done,
		ch,
		q,
		mode,
		picked,
		score,
		wrong
	]);
	const finishPaper = (finalScore, finalWrong) => {
		if (!ch || closingRef.current) return;
		closingRef.current = true;
		setDone(true);
		recordQuiz({
			id: `${Date.now()}`,
			at: Date.now(),
			mode,
			ch,
			score: finalScore,
			total: bank.length,
			wrong: finalWrong,
			durationMs: Date.now() - startedAt.current
		});
	};
	const choose = (idx) => {
		if (picked !== null || !q) return;
		setPicked(idx);
		const correct = idx === q.ans;
		if (correct) setScore((s) => s + 1);
		else setWrong((w) => [...w, q.id]);
		if (examMode) window.setTimeout(() => next(correct ? score + 1 : score, correct ? wrong : [...wrong, q.id]), 280);
	};
	const next = (scoreNow = score, wrongNow = wrong) => {
		if (i + 1 >= bank.length) {
			finishPaper(scoreNow, wrongNow);
			return;
		}
		setI((n) => n + 1);
		setPicked(null);
		if (mode === "timed") setSeconds(45);
	};
	const clock = mode === "exam" ? `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}` : mode === "timed" ? `${seconds}s` : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "quiz",
		className: "scroll-mt-24 py-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-3xl text-fg",
					children: "Chapter-wise quiz"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-sm text-muted",
					children: [quizBank.length, " items · 1-mark MCQs, assertion–reason and case-based. Instant marking, step-by-step reasons, retry-wrong, timed and exam modes."]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-4 flex flex-wrap gap-2",
				children: [
					["practice", "Practice"],
					["timed", "Timed"],
					["exam", "Exam sim"],
					["adaptive", "Adaptive"],
					["retry", "Retry wrong"]
				].map(([id, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setMode(id),
					className: cn("h-11 rounded-xl border px-3 text-sm font-medium", mode === id ? "border-primary bg-primary text-bg" : "border-border bg-surface text-fg"),
					children: label
				}, id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-4 flex flex-wrap gap-2",
				children: [
					["all", "All types"],
					["mcq", "1-mark MCQ"],
					["assertion", "Assertion–Reason"],
					["case", "Case-based"]
				].map(([id, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setKind(id),
					className: cn("h-11 rounded-xl border px-3 text-sm", kind === id ? "border-gold bg-gold/10 text-gold" : "border-border text-muted"),
					children: label
				}, id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-5 flex flex-wrap gap-2",
				children: [chapters.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => start(c.id, mode),
					className: cn("h-11 rounded-xl border px-4 text-sm font-medium transition-transform active:scale-[0.96]", ch === c.id ? "border-primary bg-primary text-bg" : "border-border bg-surface text-fg"),
					children: ["Chapter ", c.num]
				}, c.id)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => start("mix", mode),
					className: cn("h-11 rounded-xl border px-4 text-sm font-medium transition-transform active:scale-[0.96]", ch === "mix" ? "border-primary bg-primary text-bg" : "border-border bg-surface text-fg"),
					children: "Mixed set"
				})]
			}),
			analytics.recent.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-5 grid grid-cols-2 gap-2 sm:grid-cols-4",
				children: chapters.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl border border-border bg-surface px-3 py-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-[10px] uppercase tracking-wider text-muted",
						children: [
							"Ch ",
							c.num,
							" accuracy"
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "tabular-nums text-sm font-semibold text-fg",
						children: [analytics.byCh(c.id) ?? "—", "%"]
					})]
				}, c.id))
			}),
			!ch ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "rounded-2xl border border-dashed border-border px-6 py-10 text-center text-muted",
				children: "Pick a chapter. Practice shows the explanation immediately. Exam sim withholds it until the end."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "rounded-3xl border border-border bg-raised p-5 sm:p-6",
				children: done ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-6 text-gold" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "mt-3 font-display text-2xl",
						children: "Quiz complete"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-lg",
						children: [
							"Score ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "tabular-nums text-primary",
								children: score
							}),
							" / ",
							bank.length,
							" (",
							Math.round(score / Math.max(bank.length, 1) * 100),
							"%)"
						]
					}),
					wrong.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-sm text-muted",
						children: [wrong.length, " missed — they are in My Revision."]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5 flex flex-wrap gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => start(ch, mode),
							className: "h-11 rounded-xl bg-primary px-4 text-sm font-semibold text-bg",
							children: "Shuffle and retry"
						}), wrong.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => start(ch, "retry"),
							className: "h-11 rounded-xl border border-border px-4 text-sm font-semibold text-fg",
							children: "Retry missed only"
						})]
					})
				] }) : q ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs font-semibold tracking-wide text-primary",
							children: [
								"Question ",
								i + 1,
								" of ",
								bank.length,
								" · ",
								q.mark,
								"-mark · ",
								q.kind
							]
						}), clock && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-1 rounded-full border border-border px-2.5 py-1 text-xs tabular-nums text-fg",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "size-3.5" }), clock]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 whitespace-pre-line font-display text-[clamp(1.15rem,3.6vw,1.65rem)] leading-snug",
						children: q.q
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-5 grid gap-2",
						children: q.options.map((opt, idx) => {
							const show = picked !== null && !examMode;
							const correct = idx === q.ans;
							const wrongPick = show && idx === picked && !correct;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => choose(idx),
								className: cn("min-h-12 rounded-xl border px-4 py-3 text-left text-sm transition-colors", !show && "border-border bg-bg/60 hover:border-primary", show && correct && "border-ok bg-ok/20 text-ok", wrongPick && "border-danger bg-danger/20 text-danger", show && !correct && !wrongPick && "border-border opacity-60"),
								children: opt
							}, `${idx}-${opt}`);
						})
					}),
					picked !== null && !examMode && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "card-enter mt-4 rounded-2xl border border-border bg-bg/60 p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-semibold uppercase tracking-wider text-gold",
								children: picked === q.ans ? "Correct" : "Not quite — step by step"
							}),
							picked !== q.ans && picked >= 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-2 text-sm text-danger",
								children: [
									"You chose “",
									q.options[picked],
									"”. Correct answer: ",
									q.options[q.ans],
									"."
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 whitespace-pre-line text-sm leading-relaxed text-fg",
								children: q.why
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-4 flex flex-wrap gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => toggleBook("quiz", q.id),
									className: "h-11 rounded-xl border border-border px-4 text-sm font-semibold text-fg",
									children: bookQuiz.includes(q.id) ? "Saved" : "Save to revision"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => next(),
									className: "h-11 rounded-xl bg-fg px-5 text-sm font-semibold text-bg",
									children: i + 1 >= bank.length ? "Finish" : "Next question"
								})]
							})
						]
					})
				] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "No questions match these filters. Clear a filter and try again."
				})
			})
		]
	});
}
function Meta({ k, v }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl bg-bg/70 p-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
			className: "text-[10px] font-semibold uppercase tracking-wider text-muted",
			children: k
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
			className: "mt-1 text-sm leading-snug text-fg",
			children: v
		})]
	});
}
function ReactionCard({ r, index }) {
	const key = reactionKey(r);
	const starred = useStudent((s) => s.stars.includes(key));
	const flag = useStudent((s) => s.mastery[key] ?? "unset");
	const toggleStar = useStudent((s) => s.toggleStar);
	const setMastery = useStudent((s) => s.setMastery);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "card-enter rounded-3xl border border-border bg-surface p-5",
		style: { animationDelay: `${Math.min(index, 10) * 40}ms` },
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "min-w-0 font-display text-xl leading-snug text-fg",
					children: r.title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					"aria-label": starred ? "Unsave" : "Save",
					onClick: () => toggleStar(key),
					className: "mt-1 shrink-0 text-muted transition-transform duration-150 active:scale-[0.96]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: cn("size-4", starred && "fill-gold text-gold") })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-2 flex flex-wrap gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "inline-block rounded-full bg-gold/12 px-2.5 py-1 text-[11px] font-semibold text-gold",
					children: r.type
				}), flag !== "unset" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: cn("inline-block rounded-full px-2.5 py-1 text-[11px] font-semibold", flag === "learned" ? "bg-ok/15 text-ok" : "bg-gold/15 text-gold"),
					children: flag === "learned" ? "Learned" : "Needs review"
				}) : null]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
				className: "eq mt-4 max-w-full overflow-x-auto rounded-xl bg-bg px-3 py-3 text-[13px] leading-relaxed text-primary",
				children: r.eq
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
				className: "mt-4 grid gap-2 sm:grid-cols-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl bg-bg/70 p-3 sm:col-span-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-[10px] font-semibold uppercase tracking-wider text-muted",
							children: "Colour"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "mt-1 text-sm leading-snug text-fg",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ColorChips, { text: r.colour })
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meta, {
						k: "Observation",
						v: r.obs
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meta, {
						k: "Condition",
						v: r.cond
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl bg-bg/70 p-3 sm:col-span-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-[10px] font-semibold uppercase tracking-wider text-muted",
							children: "Exam tip"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "mt-1 text-sm leading-snug text-fg",
							children: r.tip
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 border-l-2 border-primary pl-3 text-sm leading-relaxed text-muted",
				children: r.desc
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 grid grid-cols-2 gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => setMastery(key, flag === "learned" ? "unset" : "learned"),
					className: cn("inline-flex h-11 items-center justify-center gap-1.5 rounded-xl border text-xs font-semibold", flag === "learned" ? "border-ok bg-ok/15 text-ok" : "border-border text-muted"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookmarkCheck, { className: "size-3.5" }), "Learned"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => setMastery(key, flag === "review" ? "unset" : "review"),
					className: cn("inline-flex h-11 items-center justify-center gap-1.5 rounded-xl border text-xs font-semibold", flag === "review" ? "border-gold bg-gold/15 text-gold" : "border-border text-muted"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "size-3.5" }), "Needs review"]
				})]
			})
		]
	});
}
function RevisionQueue({ onOpenQuiz }) {
	const stars = useStudent((s) => s.stars);
	const mastery = useStudent((s) => s.mastery);
	const bookDefs = useStudent((s) => s.bookDefs);
	const bookNotes = useStudent((s) => s.bookNotes);
	const bookQuiz = useStudent((s) => s.bookQuiz);
	const quizLog = useStudent((s) => s.quizLog);
	const toggleStar = useStudent((s) => s.toggleStar);
	const toggleBook = useStudent((s) => s.toggleBook);
	const starredRx = reactions.filter((r) => stars.includes(reactionKey(r)));
	const reviewRx = reactions.filter((r) => mastery[reactionKey(r)] === "review");
	const defs = definitions.filter((d) => bookDefs.includes(d.title));
	const noteRows = notes.filter((n) => bookNotes.includes(n.title));
	const wrongIds = [...new Set(quizLog.flatMap((l) => l.wrong))];
	const questions = quizBank.filter((q) => bookQuiz.includes(q.id) || wrongIds.includes(q.id));
	const empty = starredRx.length + reviewRx.length + defs.length + noteRows.length + questions.length === 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "revision",
		className: "scroll-mt-24 py-12",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-3xl text-fg",
				children: "My Revision"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted",
				children: "Starred reactions, needs-review cards, saved definitions and questions you missed."
			})]
		}), empty ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "rounded-2xl border border-dashed border-border px-6 py-14 text-center text-muted",
			children: "Nothing queued yet. Star a reaction, mark it for review, or miss a quiz item — it lands here."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4",
			children: [
				reviewRx.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Block, {
					title: "Needs review",
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "size-4 text-gold" }),
					children: reviewRx.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "rounded-2xl bg-bg px-4 py-3 text-sm text-fg",
						children: [r.title, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mt-1 block text-xs text-muted",
							children: r.eq
						})]
					}, reactionKey(r)))
				}),
				starredRx.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Block, {
					title: "Starred reactions",
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "size-4 text-gold" }),
					children: starredRx.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-start justify-between gap-3 rounded-2xl bg-bg px-4 py-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-fg",
							children: r.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "eq mt-1 text-xs text-primary",
							children: r.eq
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "text-xs text-muted",
							onClick: () => toggleStar(reactionKey(r)),
							children: "Remove"
						})]
					}, reactionKey(r)))
				}),
				defs.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Block, {
					title: "Saved definitions",
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "size-4 text-primary" }),
					children: defs.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-start justify-between gap-3 rounded-2xl bg-bg px-4 py-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-medium text-fg",
							children: d.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs leading-relaxed text-muted",
							children: d.body
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "text-xs text-muted",
							onClick: () => toggleBook("def", d.title),
							children: "Remove"
						})]
					}, d.title))
				}),
				noteRows.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Block, {
					title: "Saved notes",
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lightbulb, { className: "size-4 text-gold" }),
					children: noteRows.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-start justify-between gap-3 rounded-2xl bg-bg px-4 py-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-fg",
							children: n.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "text-xs text-muted",
							onClick: () => toggleBook("note", n.title),
							children: "Remove"
						})]
					}, n.title))
				}),
				questions.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Block, {
					title: "Questions to retry",
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "size-4 text-primary" }),
					children: questions.map((q) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-start justify-between gap-3 rounded-2xl bg-bg px-4 py-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-fg",
							children: q.q.replace(/\n/g, " ")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "shrink-0 text-xs font-semibold text-primary",
							onClick: () => onOpenQuiz(q.id),
							children: "Retry"
						})]
					}, q.id))
				})
			]
		})]
	});
}
function Block({ title, icon, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-3xl border border-border bg-surface p-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
			className: "mb-3 flex items-center gap-2 font-display text-lg text-fg",
			children: [icon, title]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "grid gap-2",
			children
		})]
	});
}
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var loadStudentState = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("6b006a96ba7db80aaa087efb52077d4f16ace3a5f43ca828b40000e56e11a966"));
var saveStudentState = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(createSsrRpc("82bdbdfe7762fe104451afe8e0045b3d7441b5caaed33a9717659b3440bb3443"));
function StudentHydrate() {
	const { user, isPending } = useCurrentUserState();
	const theme = useStudent((s) => s.theme);
	const updatedAt = useStudent((s) => s.updatedAt);
	useStudent((s) => s.markHydrated);
	const applyRemote = useStudent((s) => s.applyRemote);
	const booted = (0, import_react.useRef)(false);
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		Promise.resolve(useStudent.persist.rehydrate()).then(() => {
			if (cancelled) return;
			useStudent.getState().markHydrated();
			const t = useStudent.getState().theme;
			document.documentElement.classList.toggle("light", t === "light");
		});
		return () => {
			cancelled = true;
		};
	}, []);
	(0, import_react.useEffect)(() => {
		document.documentElement.classList.toggle("light", theme === "light");
	}, [theme]);
	(0, import_react.useEffect)(() => {
		if (isPending || !user) return;
		loadStudentState().then((res) => {
			if (res.ok) applyRemote(res.payload);
		}).catch(() => void 0);
	}, [
		user,
		isPending,
		applyRemote
	]);
	(0, import_react.useEffect)(() => {
		if (isPending || !user) return;
		if (!booted.current) {
			booted.current = true;
			return;
		}
		if (!updatedAt) return;
		const handle = window.setTimeout(() => {
			saveStudentState({ data: { payload: useStudent.getState().snapshot() } }).catch(() => void 0);
		}, 900);
		return () => window.clearTimeout(handle);
	}, [
		updatedAt,
		user,
		isPending
	]);
	return null;
}
function ThemeToggle() {
	const theme = useStudent((s) => s.theme);
	const setTheme = useStudent((s) => s.setTheme);
	const light = theme === "light";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		"aria-label": light ? "Switch to dark mode" : "Switch to light mode",
		onClick: () => setTheme(light ? "dark" : "light"),
		className: "relative grid size-11 shrink-0 place-items-center rounded-xl border border-border text-muted transition-[opacity,transform] duration-150 hover:text-fg active:scale-[0.96]",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "relative inline-block size-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, { className: `absolute inset-0 size-4 transition-[opacity,transform,filter] duration-300 ${light ? "scale-100 opacity-100 blur-none" : "scale-[0.25] opacity-0 blur-[4px]"}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, { className: `absolute inset-0 size-4 transition-[opacity,transform,filter] duration-300 ${light ? "scale-[0.25] opacity-0 blur-[4px]" : "scale-100 opacity-100 blur-none"}` })]
		})
	});
}
var askChem = createServerFn({ method: "POST" }).validator((input) => {
	return {
		message: (input?.message ?? "").trim().slice(0, 800),
		history: (input?.history ?? []).slice(-6)
	};
}).handler(createSsrRpc("3d9b8d195d02142ee527bd4b887243a9b9a3fbf18736926791b744105b556aa8"));
var NAV = [
	{
		id: "all",
		label: "All"
	},
	{
		id: "ch1",
		label: "Reactions"
	},
	{
		id: "ch2",
		label: "Acids"
	},
	{
		id: "ch3",
		label: "Metals"
	},
	{
		id: "ch4",
		label: "Carbon"
	},
	{
		id: "colours",
		label: "Colours"
	},
	{
		id: "lab",
		label: "Lab bench"
	},
	{
		id: "definitions",
		label: "Definitions"
	},
	{
		id: "notes",
		label: "Exam notes"
	},
	{
		id: "quiz",
		label: "Quiz"
	},
	{
		id: "revision",
		label: "My Revision"
	},
	{
		id: "ai",
		label: "Ask AI"
	},
	{
		id: "credits",
		label: "Credits"
	}
];
function scrollTo(id) {
	document.getElementById(id)?.scrollIntoView({
		behavior: "smooth",
		block: "start"
	});
}
function VaultApp() {
	const [query, setQuery] = (0, import_react.useState)("");
	const [chapter, setChapter] = (0, import_react.useState)("all");
	const [section, setSection] = (0, import_react.useState)("all");
	const [savedOnly, setSavedOnly] = (0, import_react.useState)(false);
	const [typeFilter, setTypeFilter] = (0, import_react.useState)("all");
	const [reagent, setReagent] = (0, import_react.useState)("all");
	const [progressFilter, setProgressFilter] = (0, import_react.useState)("all");
	const [searchOpen, setSearchOpen] = (0, import_react.useState)(false);
	const [quizFocus, setQuizFocus] = (0, import_react.useState)();
	const searchRef = (0, import_react.useRef)(null);
	const stars = useStudent((s) => s.stars);
	const mastery = useStudent((s) => s.mastery);
	const bookDefs = useStudent((s) => s.bookDefs);
	const bookNotes = useStudent((s) => s.bookNotes);
	const toggleBook = useStudent((s) => s.toggleBook);
	(0, import_react.useEffect)(() => {
		const onKey = (e) => {
			if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
				e.preventDefault();
				setSearchOpen(true);
			}
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, []);
	const filtered = (0, import_react.useMemo)(() => {
		const q = query.trim().toLowerCase();
		return reactions.filter((r) => {
			if (chapter !== "all" && r.ch !== chapter) return false;
			const key = reactionKey(r);
			if (savedOnly && !stars.includes(key)) return false;
			if (typeFilter !== "all" && !bucketsFor(r.type).includes(typeFilter)) return false;
			if (reagent !== "all" && !matchesReagent(r, reagent)) return false;
			const flag = mastery[key] ?? "unset";
			if (progressFilter === "learned" && flag !== "learned") return false;
			if (progressFilter === "review" && flag !== "review") return false;
			if (progressFilter === "unseen" && flag !== "unset") return false;
			if (!q) return true;
			return `${r.title} ${r.eq} ${r.type} ${r.colour} ${r.obs} ${r.cond} ${r.tip} ${r.desc}`.toLowerCase().includes(q);
		});
	}, [
		query,
		chapter,
		savedOnly,
		stars,
		typeFilter,
		reagent,
		progressFilter,
		mastery
	]);
	const go = (id) => {
		setSection(id);
		if (id === "all" || id === "ch1" || id === "ch2" || id === "ch3" || id === "ch4") {
			setChapter(id === "all" ? "all" : id);
			scrollTo("reactions");
		} else scrollTo(id);
	};
	const pickHit = (hit) => {
		setSearchOpen(false);
		if (hit.kind === "reaction") {
			const found = reactions.find((r) => reactionKey(r) === hit.id);
			if (found) setChapter(found.ch);
			setSection("all");
			scrollTo("reactions");
			return;
		}
		if (hit.kind === "quiz") {
			setQuizFocus(hit.id);
			setSection("quiz");
			scrollTo("quiz");
			return;
		}
		if (hit.kind === "chapter") {
			go(hit.id);
			return;
		}
		setSection(hit.href);
		scrollTo(hit.href);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative min-h-dvh w-full max-w-[100vw] overflow-x-clip",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StudentHydrate, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChemLab, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Onboarding, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GlobalSearch, {
				open: searchOpen,
				query,
				onQuery: setQuery,
				onClose: () => setSearchOpen(false),
				onPick: pickHit
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "relative mx-auto w-full max-w-6xl px-4 pb-10 pt-10 sm:pt-16 safe-pad",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-6 flex items-center justify-end gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PwaRegister, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeToggle, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthSlot, {})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "stagger",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-surface/80 px-3 py-1.5 text-xs font-semibold tracking-wide text-primary",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FlaskConical, { className: "size-3.5" }), "CBSE · Class 10 · Chemistry"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "font-display wordmark text-[clamp(2.05rem,9.5vw,4.6rem)] font-semibold leading-[1.05] tracking-tight",
							children: "ChemVault 10"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 max-w-xl text-base leading-relaxed text-muted sm:text-lg",
							children: "A complete NCERT revision lab — every high-yield reaction, colour, definition and exam rule, with mastery tracking, rotating chapter quizzes, and a live chemistry tutor."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-8 flex w-full flex-col gap-3 sm:flex-row",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "relative flex min-h-12 min-w-0 flex-1 items-center",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute left-4 size-4 text-muted" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										ref: searchRef,
										value: query,
										suppressHydrationWarning: true,
										onFocus: () => setSearchOpen(true),
										onChange: (e) => {
											setQuery(e.target.value);
											setSearchOpen(true);
										},
										placeholder: "Search a reaction, HCl, colour, definition…",
										className: "h-12 w-full min-w-0 rounded-2xl border border-border bg-surface pl-11 pr-16 text-sm text-fg outline-none transition placeholder:text-muted focus:border-primary"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("kbd", {
										className: "absolute right-3 hidden rounded-md border border-border px-1.5 py-0.5 text-[10px] text-muted sm:block",
										children: "⌘K"
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => scrollTo("chapter-map"),
								className: "h-12 shrink-0 rounded-2xl bg-primary px-5 text-sm font-semibold text-bg transition-transform duration-150 active:scale-[0.96]",
								children: "Explore chapters"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 flex flex-wrap gap-3 text-xs text-muted",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "rounded-full border border-border px-3 py-1",
									children: [reactions.length, " reactions"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "rounded-full border border-border px-3 py-1",
									children: [definitions.length, " definitions"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "rounded-full border border-border px-3 py-1",
									children: [colours.length, " colours"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "rounded-full border border-border px-3 py-1",
									children: [Object.values(quizData).reduce((n, q) => n + q.length, 0), " quiz items"]
								})
							]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "sticky top-0 z-40 border-b border-border/80 bg-bg/80 backdrop-blur-xl",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto flex max-w-6xl gap-1 overflow-x-auto px-3 py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden safe-pad",
					children: NAV.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => go(item.id),
						className: cn("min-h-11 whitespace-nowrap rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors", section === item.id ? "bg-primary/15 text-primary" : "text-muted hover:bg-raised hover:text-fg"),
						children: item.label
					}, item.id))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "relative mx-auto w-full max-w-6xl px-4 pb-24 safe-pad",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						id: "chapter-map",
						className: "scroll-mt-24 py-12",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHead, {
							title: "Chapter map",
							sub: "Jump straight into the four NCERT chemistry chapters."
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid gap-4 sm:grid-cols-2",
							children: chapters.map((ch) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => go(ch.id),
								className: "group rounded-3xl border border-border bg-surface p-6 text-left shadow-[0_20px_40px_rgba(0,0,0,0.18)] transition-transform duration-200 hover:-translate-y-1 active:scale-[0.99]",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-mono text-xs tracking-[0.2em] text-gold",
											children: ch.num
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-4 text-muted transition-transform group-hover:translate-x-1" })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "mt-4 font-display text-2xl text-fg",
										children: ch.title
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 text-sm leading-relaxed text-muted",
										children: ch.blurb
									})
								]
							}, ch.id))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MasteryStrip, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						id: "reactions",
						className: "scroll-mt-24 py-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-6 flex flex-wrap items-end justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHead, {
									title: "Important reactions",
									sub: `Showing ${filtered.length} of ${reactions.length}`
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => setSavedOnly((v) => !v),
									className: cn("inline-flex h-11 items-center gap-2 rounded-xl border px-3 text-sm", savedOnly ? "border-gold bg-gold/10 text-gold" : "border-border text-muted"),
									children: [savedOnly ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookmarkCheck, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bookmark, { className: "size-4" }), "Saved"]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-4 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
									active: typeFilter === "all",
									onClick: () => setTypeFilter("all"),
									children: "All types"
								}), TYPE_BUCKETS.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
									active: typeFilter === b,
									onClick: () => setTypeFilter(b),
									children: b
								}, b))]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-5 flex flex-wrap gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
									active: reagent === "all",
									onClick: () => setReagent("all"),
									children: "Any reagent"
								}), REAGENTS.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
									active: reagent === r.id,
									onClick: () => setReagent(r.id),
									children: r.id
								}, r.id))]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mb-5 flex flex-wrap gap-2",
								children: [
									["all", "All progress"],
									["unseen", "Unseen"],
									["learned", "Learned"],
									["review", "Needs review"]
								].map(([id, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
									active: progressFilter === id,
									onClick: () => setProgressFilter(id),
									children: label
								}, id))
							}),
							filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "rounded-2xl border border-dashed border-border px-6 py-16 text-center text-muted",
								children: "No reactions match. Clear a filter or try another keyword."
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid gap-4 md:grid-cols-2",
								children: filtered.map((r, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReactionCard, {
									r,
									index: i
								}, reactionKey(r)))
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						id: "colours",
						className: "scroll-mt-24 py-12",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHead, {
							title: "Colours of compounds",
							sub: "The appearance list examiners actually ask."
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "overflow-x-auto rounded-3xl border border-border bg-surface",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
								className: "w-full min-w-[36rem] text-left text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
									className: "bg-raised text-xs uppercase tracking-wider text-muted",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "px-4 py-3",
											children: "Compound"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "px-4 py-3",
											children: "Formula"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "px-4 py-3",
											children: "Colour"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "px-4 py-3",
											children: "Exam remark"
										})
									] })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: colours.map((c, ci) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: "border-t border-border/70",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-4 py-3",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "inline-flex items-center gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "size-4 shrink-0 rounded-md border border-border",
													style: { background: c.swatch }
												}), c.name]
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "eq px-4 py-3 text-primary",
											children: c.formula
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-4 py-3 text-fg",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ColorChips, { text: c.colour })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-4 py-3 text-muted",
											children: c.remarks
										})
									]
								}, `${c.name}-${c.formula}-${ci}`)) })]
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LabBench, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						id: "definitions",
						className: "scroll-mt-24 py-12",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHead, {
							title: "Quick definitions",
							sub: "Board-ready wording. Memorise these as written."
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-3",
							children: definitions.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
								className: "rounded-3xl border border-border bg-surface p-5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-start justify-between gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
										className: "flex items-center gap-2 font-display text-lg text-fg",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "size-4 shrink-0 text-primary" }), d.title]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										"aria-label": "Save definition",
										onClick: () => toggleBook("def", d.title),
										className: "text-muted",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: cn("size-4", bookDefs.includes(d.title) && "fill-gold text-gold") })
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 whitespace-pre-line text-sm leading-relaxed text-muted",
									children: d.body
								})]
							}, d.title))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						id: "notes",
						className: "scroll-mt-24 py-12",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHead, {
							title: "Core exam notes",
							sub: "Shortcuts, traps, and the rules that win marks."
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid gap-3 md:grid-cols-2",
							children: notes.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
								className: "rounded-3xl border border-border bg-surface p-5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-start justify-between gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
										className: "flex items-center gap-2 font-display text-lg text-fg",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lightbulb, { className: "size-4 shrink-0 text-gold" }), n.title]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										"aria-label": "Save note",
										onClick: () => toggleBook("note", n.title),
										className: "text-muted",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: cn("size-4", bookNotes.includes(n.title) && "fill-gold text-gold") })
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 whitespace-pre-line text-sm leading-relaxed text-muted",
									children: n.body
								})]
							}, n.title))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuizEngine, {
						focusId: quizFocus,
						onConsumedFocus: () => setQuizFocus(void 0)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RevisionQueue, { onOpenQuiz: (id) => {
						if (id) setQuizFocus(id);
						scrollTo("quiz");
						setSection("quiz");
					} }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AiSection, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreditsSection, {})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
				className: "border-t border-border py-10 text-center text-xs text-muted",
				children: "ChemVault 10 — always cross-check with the latest NCERT textbook."
			})
		]
	});
}
function Chip({ active, onClick, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick,
		className: cn("h-11 shrink-0 rounded-xl border px-3 text-sm whitespace-nowrap", active ? "border-primary bg-primary/15 text-primary" : "border-border text-muted"),
		children
	});
}
function SectionHead({ title, sub }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-display text-3xl text-fg",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm text-muted",
			children: sub
		})]
	});
}
function LabBench() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "lab",
		className: "scroll-mt-24 py-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHead, {
				title: "Lab bench",
				sub: "Indicators, pH memory, reactivity series and functional groups — the tables you rewrite in the paper."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-x-auto rounded-3xl border border-border bg-surface",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full min-w-[28rem] text-left text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
							className: "bg-raised text-xs uppercase tracking-wider text-muted",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3",
									children: "Indicator"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3",
									children: "In acid"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3",
									children: "In base"
								})
							] })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: indicators.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-t border-border/70",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
									className: "px-4 py-3 text-fg",
									children: [row.name, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-xs text-muted",
										children: row.notes
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-3",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ColorChips, { text: row.acid })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-3",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ColorChips, { text: row.base })
								})
							]
						}, row.name)) })]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-3xl border border-border bg-surface p-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-lg",
						children: "pH strip"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-3 grid gap-2",
						children: pHGuide.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center justify-between gap-3 rounded-xl bg-bg px-3 py-2 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: p.item }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "shrink-0 font-mono text-primary",
								children: [
									p.pH,
									" · ",
									p.tag
								]
							})]
						}, p.item))
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 rounded-3xl border border-border bg-surface p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-lg",
						children: "Reactivity series"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted",
						children: "Most reactive on the left. Hydrogen sits between lead and copper."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 flex gap-2 overflow-x-auto pb-2",
						children: series.map((m, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: cn("flex h-12 min-w-12 items-center justify-center rounded-xl border px-3 font-mono text-sm", m === "H" ? "border-gold text-gold" : "border-border text-fg"),
							style: { animationDelay: `${i * 40}ms` },
							children: m
						}, m))
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4",
				children: functionalGroups.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "rounded-3xl border border-border bg-surface p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs uppercase tracking-wider text-muted",
							children: g.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "eq mt-2 text-primary",
							children: g.group
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-fg",
							children: g.example
						})
					]
				}, g.name))
			})
		]
	});
}
function AiSection() {
	const [input, setInput] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [msgs, setMsgs] = (0, import_react.useState)([{
		role: "assistant",
		content: "Ask any Class 10 Chemistry question — reactions, colours, pH, extraction, ethanol, esters…"
	}]);
	const box = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		box.current?.scrollTo({
			top: box.current.scrollHeight,
			behavior: "smooth"
		});
	}, [msgs, busy]);
	const send = async () => {
		const message = input.trim();
		if (!message || busy) return;
		setInput("");
		const history = msgs.filter((m, idx) => idx > 0);
		setMsgs((m) => [...m, {
			role: "user",
			content: message
		}]);
		setBusy(true);
		try {
			const res = await askChem({ data: {
				message,
				history
			} });
			const text = res.ok ? res.text : res.error;
			setMsgs((m) => [...m, {
				role: "assistant",
				content: text
			}]);
		} catch {
			setMsgs((m) => [...m, {
				role: "assistant",
				content: "Could not reach the tutor. Try again."
			}]);
		} finally {
			setBusy(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "ai",
		className: "scroll-mt-24 py-12",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHead, {
			title: "Ask ChemVault AI",
			sub: "Powered by Grok. User-initiated, Class 10 focused."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "overflow-hidden rounded-3xl border border-border bg-surface",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 border-b border-border px-5 py-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "size-4 text-primary" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm font-semibold",
							children: "Tutor"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-semibold text-primary",
							children: "Grok"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					ref: box,
					className: "flex h-80 flex-col gap-3 overflow-y-auto px-4 py-4",
					children: [msgs.map((m, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: cn("max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm leading-relaxed", m.role === "user" ? "ml-auto bg-primary text-bg" : "bg-raised text-fg"),
						children: m.content
					}, idx)), busy && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "rounded-2xl bg-raised px-4 py-3 text-sm italic text-muted",
						children: "Thinking…"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2 border-t border-border p-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: input,
						suppressHydrationWarning: true,
						onChange: (e) => setInput(e.target.value),
						onKeyDown: (e) => {
							if (e.key === "Enter") send();
						},
						placeholder: "e.g. Why is ZnO yellow when hot?",
						className: "h-12 min-w-0 flex-1 rounded-xl border border-border bg-bg px-4 text-sm outline-none focus:border-primary"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						disabled: busy,
						onClick: () => void send(),
						className: "h-12 shrink-0 rounded-xl bg-primary px-5 text-sm font-semibold text-bg disabled:opacity-50",
						children: "Send"
					})]
				})
			]
		})]
	});
}
function CreditsSection() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "credits",
		className: "scroll-mt-24 py-12",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHead, {
			title: "Credits",
			sub: "The people who made this vault."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-3xl border border-border bg-surface p-6 sm:p-10",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm uppercase tracking-[0.2em] text-muted",
				children: "The credit of making this website goes to"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-6 grid gap-3 sm:grid-cols-2",
				children: credits.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex items-center gap-3 rounded-2xl border border-border bg-bg px-4 py-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "size-4 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-2xl text-fg",
						children: c.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted",
						children: c.role
					})] })]
				}, c.name))
			})]
		})]
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VaultApp, {});
}
//#endregion
export { Home as component };
