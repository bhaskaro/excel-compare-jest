// tests/fixtures/makeSample.js (optional generator)
const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

const data = [
  { Id: 1, Name: 'Alice', Amount: 123.45, Date: '2025-11-03' },
  { Id: 2, Name: 'Bob',   Amount: 67.89,  Date: '2025-11-01' }
];

const ws = XLSX.utils.json_to_sheet(data);
const wb = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

const outPath = path.resolve(__dirname, 'sample.xlsx');
XLSX.writeFile(wb, outPath);
console.log('Wrote', outPath);
