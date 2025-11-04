const fs = require("fs");
const path = require("path");
const { parseExcel } = require("../src/parseExcel");

function loadJsonStrict(p) {
    const raw = fs.readFileSync(p, "utf8").replace(/^\uFEFF/, "");
    try {
        return JSON.parse(raw);
    } catch (e) {
        console.error(`\nInvalid JSON in: ${p}\n--- BEGIN FILE ---\n${raw}\n--- END FILE ---\n`);
        throw e;
    }
}

function normalizeRow(row) {
    const out = {};
    for (const [k, v] of Object.entries(row)) {
        if (v == null) {
            out[k] = v;
            continue;
        }
        if (typeof v === "string") {
            const s = v.trim();
            if (/^[+-]?\d+$/.test(s)) {
                out[k] = Number(s);
                continue;
            }
            if (/^[+-]?\d*\.\d+$/.test(s)) {
                out[k] = parseFloat(s);
                continue;
            }
            out[k] = s;
            continue;
        }
        out[k] = v;
    }
    return out;
}

const sortByKey = (arr, key) =>
    [...arr].sort((a, b) => (a[key] === b[key] ? 0 : a[key] < b[key] ? -1 : 1));

describe("Excel to JSON → compare with expected.json", () => {
    const excelFile = path.join(__dirname, "fixtures", "sample.xlsx");
    const expectedJsonPath = path.join(__dirname, "fixtures", "expected.json");
    const EXPECTED = loadJsonStrict(expectedJsonPath);

    test("matches expected data exactly", () => {
        const parsed = parseExcel(excelFile, { dateFormat: "yyyy-mm-dd" }).map(normalizeRow);

        console.log("Parsed Data:\n", JSON.stringify(parsed, null, 2));
        console.log("Expected Data:\n", JSON.stringify(EXPECTED, null, 2));

        const parsedSorted = sortByKey(parsed, "Id");
        const expectedSorted = sortByKey(EXPECTED, "Id");

        expect(parsedSorted).toStrictEqual(expectedSorted);
    });

    test("contains at least expected rows (subset check)", () => {
        const parsed = parseExcel(excelFile, { dateFormat: "yyyy-mm-dd" }).map(normalizeRow);

        EXPECTED.forEach((exp) =>
            expect(parsed).toEqual(expect.arrayContaining([expect.objectContaining(exp)]))
        );
    });
});
