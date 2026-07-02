const fs = require('fs');
const path = require('path');

const pageDirs = {
  'cc4a84e52c0f0d87': 'Home (with hero)',
  '47769ccb9f9b1156': 'Services',
  '6986a2a20dce035d': 'Our Clients',
  'ec69494d9113d28d': 'Our Story',
  '3d4bed22e1184b72': 'Home (first)',
  'a50d937238dfdfff': 'Client Callback',
  'b2f46b066843f600': "Red's Service Division",
  'd55ee22b4a6a506c': 'Book Online',
};

// Load manifest
const manifest = JSON.parse(fs.readFileSync('start/assets/asset-manifest.json', 'utf8'));
const assetByWixId = {};
const assetByFilename = {};
manifest.assets.filter(a => a.asset_type === 'image' && a.local_path).forEach(a => {
  const fname = a.local_path.split('\\').pop();
  const wixId = (a.original_url.match(/938e72_([a-f0-9]+)/) || [])[1];
  if (wixId) assetByWixId[wixId] = { fname, ...a };
  assetByFilename[fname] = a;
});

// Load AI analysis summaries
const analysisDir = 'start/ai-analysis';
const summaries = {};
if (fs.existsSync(analysisDir)) {
  fs.readdirSync(analysisDir).filter(f => f.startsWith('asset_')).forEach(f => {
    const j = JSON.parse(fs.readFileSync(path.join(analysisDir, f), 'utf8'));
    summaries[j.subject_id] = j.summary;
  });
}

// Process each page
Object.entries(pageDirs).forEach(([dirId, pageName]) => {
  const htmlPath = path.join('start/pages', dirId, 'rendered-dom.html');
  if (!fs.existsSync(htmlPath)) return;
  const html = fs.readFileSync(htmlPath, 'utf8');
  
  console.log('\n========================================');
  console.log('PAGE: ' + pageName + ' (' + dirId + ')');
  console.log('========================================\n');
  
  // Find all img tags
  const matches = [...html.matchAll(/<img[^>]*>/g)];
  matches.forEach((m, i) => {
    const alt = (m[0].match(/alt="([^"]*)"/) || [])[1] || '';
    const src = (m[0].match(/src="([^"]*)"/) || [])[1] || '';
    const wixId = (src.match(/938e72_([a-f0-9]+)/) || [])[1];
    const w = (src.match(/w_(\d+)/) || [])[1] || '?';
    const h = (src.match(/h_(\d+)/) || [])[1] || '?';
    
    const before = html.substring(Math.max(0, m.index - 800), m.index);
    const after = html.substring(m.index + m[0].length, m.index + m[0].length + 800);
    const beforeText = before.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(-200);
    const afterText = after.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 200);
    
    const asset = wixId ? assetByWixId[wixId] : null;
    const fname = asset ? asset.local_path.split('\\').pop() : 'NO LOCAL FILE';
    const summary = asset ? (summaries[asset.asset_id] || 'NO AI ANALYSIS') : '';
    
    console.log('IMG ' + i + ': alt="' + alt + '" [' + w + 'x' + h + ']');
    console.log('  WIX_ID: ' + (wixId || 'non-wix'));
    console.log('  LOCAL_FILE: ' + fname);
    console.log('  AI_DESC: ' + summary);
    console.log('  CONTEXT_BEFORE: ...' + beforeText);
    console.log('  CONTEXT_AFTER: ' + afterText + '...');
    console.log('');
  });
  
  // Also find CSS background images (Wix uses these for gallery/slideshow)
  const bgMatches = [...html.matchAll(/wixstatic\.com\/media\/([a-f0-9_]+)/g)];
  const bgIds = [...new Set(bgMatches.map(m => m[1]))].filter(id => id.startsWith('938e72_'));
  if (bgIds.length > 0) {
    console.log('--- Wixstatic media IDs found in page (including CSS/JS) ---');
    bgIds.forEach(id => {
      const wixId = id.replace('938e72_', '');
      const asset = assetByWixId[wixId];
      const fname = asset ? asset.local_path.split('\\').pop() : 'NO LOCAL FILE';
      const summary = asset ? (summaries[asset.asset_id] || '') : '';
      console.log('  ' + wixId + ' -> ' + fname + (summary ? ' (' + summary.slice(0, 80) + ')' : ''));
    });
    console.log('');
  }
});
