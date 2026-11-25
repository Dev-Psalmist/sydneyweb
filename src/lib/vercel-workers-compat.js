import { waitUntil as vercelWaitUntil } from "@vercel/functions";

// Minimal Vercel equivalent for the two Cloudflare Workers APIs used by
// Base44's generated error-capture module.
export const env = process.env;
export const waitUntil = vercelWaitUntil;
