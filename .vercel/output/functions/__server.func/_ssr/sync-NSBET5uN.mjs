import { r as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-CcvdN_gc.mjs";
import { r as getSql } from "./db-CcSrRZmO.mjs";
import { n as authMiddleware, t as EMPTY_STUDENT } from "./types-CqXe4BVQ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/sync-NSBET5uN.js
var loadStudentState_createServerFn_handler = createServerRpc({
	id: "6b006a96ba7db80aaa087efb52077d4f16ace3a5f43ca828b40000e56e11a966",
	name: "loadStudentState",
	filename: "src/lib/student/sync.ts"
}, (opts) => loadStudentState.__executeServer(opts));
var loadStudentState = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(loadStudentState_createServerFn_handler, async ({ context }) => {
	const row = (await (await getSql())`
      select payload, updated_at from student_state where user_id = ${context.userId} limit 1
    `)[0];
	if (!row) return {
		ok: true,
		payload: EMPTY_STUDENT
	};
	try {
		const parsed = JSON.parse(row.payload);
		return {
			ok: true,
			payload: {
				...EMPTY_STUDENT,
				...parsed,
				v: 1
			}
		};
	} catch {
		return {
			ok: true,
			payload: EMPTY_STUDENT
		};
	}
});
var saveStudentState_createServerFn_handler = createServerRpc({
	id: "82bdbdfe7762fe104451afe8e0045b3d7441b5caaed33a9717659b3440bb3443",
	name: "saveStudentState",
	filename: "src/lib/student/sync.ts"
}, (opts) => saveStudentState.__executeServer(opts));
var saveStudentState = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(saveStudentState_createServerFn_handler, async ({ context, data }) => {
	const sql = await getSql();
	const payload = JSON.stringify(data.payload);
	await sql`
      insert into student_state (user_id, payload, updated_at)
      values (${context.userId}, ${payload}, now())
      on conflict (user_id) do update set payload = excluded.payload, updated_at = now()
    `;
	return { ok: true };
});
//#endregion
export { loadStudentState_createServerFn_handler, saveStudentState_createServerFn_handler };
