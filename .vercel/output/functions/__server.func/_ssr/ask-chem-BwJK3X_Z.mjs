import { r as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-CcvdN_gc.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ask-chem-BwJK3X_Z.js
var SYSTEM = `You are ChemVault AI, a precise Class 10 CBSE Chemistry tutor.
Use NCERT Class 10 language. Prefer balanced equations with state symbols.
Cover chemical reactions, acids bases salts, metals and non-metals, carbon compounds.
If a question is outside Class 10 chemistry, say so briefly then give a short helpful pointer.
Keep answers under 220 words. Use plain text, not markdown tables.`;
var askChem_createServerFn_handler = createServerRpc({
	id: "3d9b8d195d02142ee527bd4b887243a9b9a3fbf18736926791b744105b556aa8",
	name: "askChem",
	filename: "src/lib/ask-chem.ts"
}, (opts) => askChem.__executeServer(opts));
var askChem = createServerFn({ method: "POST" }).validator((input) => {
	return {
		message: (input?.message ?? "").trim().slice(0, 800),
		history: (input?.history ?? []).slice(-6)
	};
}).handler(askChem_createServerFn_handler, async ({ data }) => {
	const apiKey = process.env.XAI_API_KEY;
	if (!apiKey) return {
		ok: false,
		error: "AI is not available in this environment."
	};
	if (!data.message) return {
		ok: false,
		error: "Type a chemistry question first."
	};
	const res = await fetch("https://api.x.ai/v1/chat/completions", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${apiKey}`
		},
		body: JSON.stringify({
			model: "grok-4.5",
			max_tokens: 420,
			temperature: .3,
			messages: [
				{
					role: "system",
					content: SYSTEM
				},
				...data.history,
				{
					role: "user",
					content: data.message
				}
			]
		})
	});
	if (!res.ok) return {
		ok: false,
		error: "The tutor is busy. Try again in a moment."
	};
	const text = (await res.json()).choices?.[0]?.message?.content?.trim() ?? "";
	if (!text) return {
		ok: false,
		error: "Empty reply. Try rephrasing."
	};
	return {
		ok: true,
		text
	};
});
//#endregion
export { askChem_createServerFn_handler };
