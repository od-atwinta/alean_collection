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
    const rewritten = source
      .replace(
        /([`"'(])\/(?!\/|alean_collection\/)([^`"'()\s?#]+\.(?:avif|gif|ico|jpe?g|png|svg|webp|mp4|webm))(?=[`"')?#])/gi,
        `$1${publicPrefix}$2`,
      )
      // Internal page routes (e.g. /hotels/alean-club-sophia, /#loyalty) need the same prefix as assets.
      .replace(
        /([`"'(])\/(?!\/|alean_collection\/)(hotels\/[^`"'()\s]*|#[^`"'()\s]*)(?=[`"')])/g,
        `$1${publicPrefix}$2`,
      );

    if (rewritten !== source) await writeFile(pathname, rewritten);
  }
}

await rewriteDirectory(outputDirectory);

const indexPath = join(outputDirectory, "index.html");
const indexSource = await readFile(indexPath, "utf8");
const cacheVersion = process.env.GITHUB_SHA?.slice(0, 12) ?? Date.now().toString(36);
const versionedIndex = indexSource.replace(
  /(\/alean_collection\/assets\/[^"'?]+\.(?:css|js))(["'])/g,
  `$1?v=${cacheVersion}$2`,
);
await writeFile(indexPath, versionedIndex);
