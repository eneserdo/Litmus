/**
 * Runtime validation of litmus evidence. `JSON.parse` gives us `unknown`;
 * these guards turn it into a strongly-typed {@link Evidence} object or throw
 * an {@link EvidenceError} describing exactly what was wrong. No dependencies.
 */
import { EvidenceError, } from "./evidence.js";
function isObject(value) {
    return typeof value === "object" && value !== null && !Array.isArray(value);
}
function requireString(obj, key) {
    const v = obj[key];
    if (typeof v !== "string") {
        throw new EvidenceError(`field "${key}" must be a string`);
    }
    return v;
}
function requireNumber(obj, key) {
    const v = obj[key];
    if (typeof v !== "number" || !Number.isFinite(v)) {
        throw new EvidenceError(`field "${key}" must be a finite number`);
    }
    return v;
}
function requireBool(obj, key) {
    const v = obj[key];
    if (typeof v !== "boolean") {
        throw new EvidenceError(`field "${key}" must be a boolean`);
    }
    return v;
}
function requireArray(obj, key) {
    const v = obj[key];
    if (!Array.isArray(v)) {
        throw new EvidenceError(`field "${key}" must be an array`);
    }
    return v;
