import { createHash } from "node:crypto";
import { readFile, writeFile, copyFile, mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { execFileSync } from "node:child_process";

// Only pure education data travels between apps. Auth, billing, storage, types and
// catalog/client assembly intentionally remain owned by each application.
const manifestPath = resolve("curriculum-manifest.json");
const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
const args = process.argv.slice(2);
const from = args.includes("--from") ? args[args.indexOf("--from") + 1] : null;
const refresh = args.includes("--refresh");
const digest = async (file) =>
  createHash("sha256")
    .update(await readFile(file))
    .digest("hex");
if (from) {
  if (!args.includes("--write"))
    throw Error(
      "Use --from <reviewed source> --write to explicitly copy content.",
    );
  for (const file of Object.keys(manifest.files)) {
    if (
      execFileSync("git", ["status", "--porcelain", "--", file], {
        encoding: "utf8",
      }).trim()
    )
      throw Error(`Refusing to overwrite modified content: ${file}`);
  }
  for (const file of Object.keys(manifest.files)) {
    await mkdir(dirname(resolve(file)), { recursive: true });
    await copyFile(resolve(from, file), resolve(file));
  }
}
let mismatch = false;
for (const file of Object.keys(manifest.files)) {
  const actual = await digest(resolve(file));
  if (refresh || from) manifest.files[file] = actual;
  else if (actual !== manifest.files[file]) {
    process.stderr.write(`Content hash differs: ${file}\n`);
    mismatch = true;
  }
}
if (refresh || from)
  await writeFile(manifestPath, JSON.stringify(manifest, null, 2) + "\n");
if (mismatch) process.exitCode = 1;
else
  process.stdout.write(
    `Verified ${Object.keys(manifest.files).length} shared curriculum modules.\n`,
  );
