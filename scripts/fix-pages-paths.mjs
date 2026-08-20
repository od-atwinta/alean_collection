import { readdir, readFile, writeFile } from "node:fs/promises";
import { extname, join } from "node:path";
import { fileURLToPath } from "node:url";

const outputDirectory = fileURLToPath(new URL("../pages-dist/", import.meta.url));
const publicPrefix = "/alean_collection/";
const textExtensions = new Set([".html", ".css", ".js"]);

async function rewriteDirectory(directory) {
  const entries = await readdir(directory, { withFileTypes: true });

  for (const entry of entries) {
    const pathname = join(directory, entry.name);

    if (entry.isDirectory()) {
      await rewriteDirectory(pathname);
      continue;
    }

    if (!textExtensions.has(extname(entry.name))) continue;

    const source = await readFile(pathname, "utf8");
    const rewritten = source.replace(
      /(["'(])\/(?!\/|alean_collection\/)([^"'()\s?#]+\.(?:avif|gif|ico|jpe?g|png|svg|webp))(?=["')?#])/gi,
      `$1${publicPrefix}$2`,
    );

    if (rewritten !== source) await writeFile(pathname, rewritten);
  }
}

await rewriteDirectory(outputDirectory);
