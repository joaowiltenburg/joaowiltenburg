import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { stripTypeScriptTypes } from "node:module";

// O Next resolve o guard server-only na build. Aqui, só neste teste em Node, ele sai.
const source = (await readFile(new URL("../app/age.ts", import.meta.url), "utf8")).replace('import "server-only";', "");
const { currentAge } = await import(`data:text/javascript;base64,${Buffer.from(stripTypeScriptTypes(source)).toString("base64")}`);
assert.equal(currentAge(new Date("2026-09-16T12:00:00Z")), 18);
assert.equal(currentAge(new Date("2026-10-09T02:59:59Z")), 18);
assert.equal(currentAge(new Date("2026-10-09T03:00:00Z")), 19);
assert.equal(currentAge(new Date("2027-01-01T12:00:00Z")), 19);
assert.equal(currentAge(new Date("2027-10-09T03:00:00Z")), 20);
console.log("OK: idade muda no aniversário, à meia-noite de São Paulo.");
