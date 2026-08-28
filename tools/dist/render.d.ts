/**
 * Renders {@link Evidence} into a self-contained, dependency-free HTML report.
 * The output inlines all CSS so the file can be opened directly in a browser
 * or attached to a CI artifact. No network requests, no external assets.
 */
import { Evidence } from "./evidence.js";
/** Escape a string for safe embedding in HTML text/attribute context. */
export declare function escapeHtml(input: string): string;
/** Collapse a list of run indices into compact ranges, e.g. "0-3, 5, 7-9". */
export declare function summarizeIndices(indices: readonly number[]): string;
/** Produce a complete HTML document string for the given evidence. */
export declare function renderHtml(ev: Evidence): string;
/** Produce a compact plain-text summary (used for terminal previews / tests). */
export declare function renderText(ev: Evidence): string;
