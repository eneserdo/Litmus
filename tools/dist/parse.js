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
}
const VERDICTS = [
    "stable",
    "diverged",
    "expectation_violated",
];
const EXPECTATIONS = [
    "deterministic",
    "flaky",
    "unspecified",
];
function asVerdict(value) {
    if (VERDICTS.includes(value)) {
        return value;
    }
    throw new EvidenceError(`unknown verdict: ${JSON.stringify(value)}`);
}
function asExpectation(value) {
    if (EXPECTATIONS.includes(value)) {
        return value;
    }
    throw new EvidenceError(`unknown expectation: ${JSON.stringify(value)}`);
}
function parseGroup(value, index) {
    if (!isObject(value)) {
        throw new EvidenceError(`groups[${index}] must be an object`);
    }
    const run_indices = requireArray(value, "run_indices").map((n, i) => {
        if (typeof n !== "number" || !Number.isInteger(n)) {
            throw new EvidenceError(`groups[${index}].run_indices[${i}] must be an integer`);
        }
        return n;
    });
    return {
        fingerprint: requireString(value, "fingerprint"),
        count: requireNumber(value, "count"),
