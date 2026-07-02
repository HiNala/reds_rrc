import "@testing-library/jest-dom/vitest";
import { TextEncoder, TextDecoder } from "util";

// jsdom's TextEncoder produces Uint8Arrays from a different realm,
// which breaks jose's instanceof checks. Always use Node's.
globalThis.TextEncoder = TextEncoder as unknown as typeof globalThis.TextEncoder;
globalThis.TextDecoder = TextDecoder as unknown as typeof globalThis.TextDecoder;
