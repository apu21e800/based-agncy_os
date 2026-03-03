// A simple check script for Claude to run before pushing
const fs = require('fs');
const path = require('path');

const mediaDir = './Media_Library/Final';
const files = fs.readdirSync(mediaDir);

console.log("🚀 Checking Agency Media Assets...");
files.forEach(file => {
    const stats = fs.statSync(path.join(mediaDir, file));
    const sizeInMB = (stats.size / (1024 * 1024)).toFixed(2);
    if (sizeInMB > 50) {
        console.warn(`⚠️ WARNING: ${file} is ${sizeInMB}MB. Consider compressing for web.`);
    } else {
        console.log(`✅ ${file} is optimized (${sizeInMB}MB).`);
    }
});