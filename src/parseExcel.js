// src/parseExcel.js
const XLSX = require('xlsx');
const path = require('path');
const fs = require('fs');

/**
 * Parse the first sheet (or a named sheet) of an .xlsx file into an array of objects.
 * - Trims header names
 * - Keeps empty cells as null (defval)
 * - Parses dates using cellDates + raw:false
 */
function parseExcel(filePath, opts = {}) {
    const {
        sheetName = null,
        dateFormat = 'yyyy-mm-dd', // Excel date display format
    } = opts;

    const absPath = path.resolve(filePath);
    if (!fs.existsSync(absPath)) {
        throw new Error(`Excel file not found at: ${absPath}`);
    }

    const wb = XLSX.readFile(absPath, {
        cellDates: true, // read Excel dates as Date
    });

    const wsName = sheetName || wb.SheetNames[0];
    if (!wsName) throw new Error('No sheets found in workbook.');

    const ws = wb.Sheets[wsName];
    if (!ws) throw new Error(`Sheet "${wsName}" not found in workbook.`);

    // Convert to JSON. raw:false applies number/date formatting.
    const rows = XLSX.utils.sheet_to_json(ws, {
        defval: null,     // keep empty cells as null
        raw: false,       // allow dateNF to format dates into strings
        dateNF: dateFormat,
        header: 1         // get rows as arrays first to normalize headers
    });

    if (rows.length === 0) return [];

    // Build header array (trim & normalize)
    const headers = rows[0].map(h => (h !== null ? String(h).trim() : ''));

    // Convert the rest of the rows to objects
    const data = rows.slice(1).map((arr) => {
        const obj = {};
        headers.forEach((h, i) => {
            if (!h) return; // skip truly empty header cells
            obj[h] = i < arr.length ? arr[i] : null;
        });
        return obj;
    });

    return data;
}

module.exports = { parseExcel };
