// Validate the HTML file's JavaScript syntax
const fs = require('fs');
const content = fs.readFileSync('d:\\project website\\game racing\\marvel_speedstorm_ctr_3d_racing (1).html', 'utf8');

// Extract all script content
const scriptMatches = content.match(/<script[^>]*>([\s\S]*?)<\/script>/gi);
if (!scriptMatches) {
    console.log('ERROR: No script tags found!');
    process.exit(1);
}

let allScript = '';
scriptMatches.forEach((match, i) => {
    // Skip CDN script tags (those with src attribute)
    if (match.includes('src=')) {
        console.log(`Script block ${i+1}: External CDN (skipped)`);
        return;
    }
    const inner = match.replace(/<script[^>]*>/i, '').replace(/<\/script>/i, '');
    allScript += inner + '\n';
    console.log(`Script block ${i+1}: ${inner.length} chars`);
});

console.log(`\nTotal inline JS: ${allScript.length} chars`);

try {
    new Function(allScript);
    console.log('\n*** SYNTAX CHECK: PASSED - Zero errors! ***');
} catch (e) {
    console.log(`\n*** SYNTAX ERROR: ${e.message} ***`);
    // Try to find the line
    const lines = allScript.split('\n');
    const lineMatch = e.message.match(/position (\d+)/);
    if (e.stack) {
        console.log('Stack:', e.stack.split('\n').slice(0,3).join('\n'));
    }
}
