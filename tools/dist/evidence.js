/**
 * Type definitions for litmus JSON evidence (schema `litmus/evidence@1`).
 *
 * These mirror the structure emitted by the Rust `litmus emit` command. The
 * renderer and authoring helper share these types. No runtime dependencies.
 */
/** Thrown when a parsed JSON blob does not conform to the evidence schema. */
export class EvidenceError extends Error {
