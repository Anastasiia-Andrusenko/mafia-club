/**
 * Webpack loader: unpacks a dotLottie (.lottie) container at build time and
 * exports the first animation as a plain Lottie JSON object.
 *
 * `src/lotties/load.json` is a dotLottie archive (a ZIP holding manifest.json +
 * animations/<id>.json), even though it carries a .json extension. Doing the
 * unzip here means the browser never needs a WASM dotLottie runtime, a zip
 * parser, or any request to lottie.host: the animation ships as ordinary JSON
 * inside a lazily loaded chunk and is rendered by lottie-web's light SVG player.
 *
 * Only used for imports that carry the `?dotlottie` query (see next.config.mjs).
 */
const zlib = require("node:zlib");

const EOCD_SIGNATURE = 0x06054b50;
const CENTRAL_SIGNATURE = 0x02014b50;
const LOCAL_SIGNATURE = 0x04034b50;

/** Reads every entry of a ZIP archive via its central directory. */
function readZipEntries(buf) {
  let eocd = -1;
  for (let i = buf.length - 22; i >= 0; i--) {
    if (buf.readUInt32LE(i) === EOCD_SIGNATURE) {
      eocd = i;
      break;
    }
  }
  if (eocd < 0) throw new Error("not a ZIP archive (no end-of-central-directory)");

  const count = buf.readUInt16LE(eocd + 10);
  let offset = buf.readUInt32LE(eocd + 16);
  const entries = new Map();

  for (let n = 0; n < count; n++) {
    if (buf.readUInt32LE(offset) !== CENTRAL_SIGNATURE) {
      throw new Error("corrupt ZIP central directory");
    }
    const method = buf.readUInt16LE(offset + 10);
    const compressedSize = buf.readUInt32LE(offset + 20);
    const nameLength = buf.readUInt16LE(offset + 28);
    const extraLength = buf.readUInt16LE(offset + 30);
    const commentLength = buf.readUInt16LE(offset + 32);
    const localOffset = buf.readUInt32LE(offset + 42);
    const name = buf.toString("utf8", offset + 46, offset + 46 + nameLength);

    if (buf.readUInt32LE(localOffset) !== LOCAL_SIGNATURE) {
      throw new Error(`corrupt ZIP local header for ${name}`);
    }
    const dataStart =
      localOffset + 30 + buf.readUInt16LE(localOffset + 26) + buf.readUInt16LE(localOffset + 28);
    const data = buf.subarray(dataStart, dataStart + compressedSize);

    entries.set(
      name,
      method === 0 ? data : method === 8 ? zlib.inflateRawSync(data) : null,
    );
    offset += 46 + nameLength + extraLength + commentLength;
  }
  return entries;
}

module.exports = function dotLottieLoader(source) {
  const entries = readZipEntries(source);
  const animationName = [...entries.keys()].find(
    (name) => name.startsWith("animations/") && name.endsWith(".json"),
  );
  const animationBytes = animationName && entries.get(animationName);
  if (!animationBytes) {
    throw new Error("dotLottie archive has no animations/*.json entry");
  }

  // Re-serialise to drop any whitespace, then ship it as a JSON.parse() string
  // (cheaper for the JS engine to parse than an equivalent object literal).
  const json = JSON.stringify(JSON.parse(animationBytes.toString("utf8")));
  return `export default JSON.parse(${JSON.stringify(json)});`;
};

// Receive the raw archive bytes instead of a UTF-8 decoded string.
module.exports.raw = true;
