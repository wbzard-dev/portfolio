// Ported from pdfme playground — handles quoted fields and BOM
export const parseCsv = (csvText) => {
    const cleanText = csvText.replace(/^﻿/, '');
    const lines = cleanText.split(/\r?\n/);
    if (lines.length < 2) return [];

    const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''));
    const records = [];

    for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;

        const values = [];
        let current = '';
        let inQuotes = false;

        for (let j = 0; j < line.length; j++) {
            const char = line[j];
            if (char === '"') {
                inQuotes = !inQuotes;
            } else if (char === ',' && !inQuotes) {
                values.push(current.trim().replace(/^"|"$/g, ''));
                current = '';
            } else {
                current += char;
            }
        }
        values.push(current.trim().replace(/^"|"$/g, ''));

        const record = {};
        headers.forEach((header, index) => {
            record[header] = values[index] !== undefined ? values[index] : '';
        });
        records.push(record);
    }

    return records;
};
