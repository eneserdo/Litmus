/**
 * A dependency-free helper for *authoring* litmus scenario files
 * programmatically. This mirrors the Rust parser's grammar so scenarios can be
 * generated (e.g. from a test matrix) and written out as `.litmus` files.
 */
/** Quote a command token if it contains whitespace or quote characters. */
export function quoteToken(token) {
    if (token.length === 0) {
        return '""';
    }
    if (!/[\s"']/.test(token)) {
        return token;
    }
    if (!token.includes('"')) {
        return `"${token}"`;
    }
    if (!token.includes("'")) {
        return `'${token}'`;
    }
    // Contains both quote types: fall back to double-quotes and rely on the
    // authoring caller to avoid embedding raw double quotes (documented).
    return `"${token.replace(/"/g, "")}"`;
