const fs = require('fs');
const path = require('path');

// Extract slugs from blog-data.ts and services-data.ts via regex
const blogDataRaw = fs.readFileSync(path.join(__dirname, '..', 'lib', 'blog-data.ts'), 'utf8');
const blogSlugs = [...blogDataRaw.matchAll(/slug:\s*["']([^"']+)["']/g)].map(m => m[1]);

const servicesDataRaw = fs.readFileSync(path.join(__dirname, '..', 'lib', 'services-data.ts'), 'utf8');
const serviceSlugs = [...servicesDataRaw.matchAll(/slug:\s*["']([^"']+)["']/g)].map(m => m[1]);

const validRoutes = new Set([
  '/',
  '/blogs',
  '/book-a-call',
  '/faq',
  '/privacy',
  '/services',
  '/terms',
  '/testimonials',
  '/work',
  ...blogSlugs.map(s => `/blogs/${s}`),
  ...serviceSlugs.map(s => `/services/${s}`),
]);

console.log('Total valid routes registered:', validRoutes.size);
console.log('Blog slugs count:', blogSlugs.length);
console.log('Service slugs count:', serviceSlugs.length);

function scanDir(dir, fileList = []) {
  const items = fs.readdirSync(dir);
  for (const item of items) {
    if (item === 'node_modules' || item === '.next' || item === '.git' || item === 'scripts') continue;
    const full = path.join(dir, item);
    if (fs.statSync(full).isDirectory()) {
      scanDir(full, fileList);
    } else if (item.endsWith('.tsx') || item.endsWith('.ts') || item.endsWith('.md')) {
      fileList.push(full);
    }
  }
  return fileList;
}

const allFiles = scanDir(path.join(__dirname, '..'));
const linkPattern = /href=[\"'](\/[^\"'#?]*)/g;
const mdLinkPattern = /\[.*?\]\((\/[^\"'#?\s)]*)/g;

const brokenLinks = [];

for (const file of allFiles) {
  const content = fs.readFileSync(file, 'utf8');
  const relPath = path.relative(path.join(__dirname, '..'), file);
  const lines = content.split('\n');

  lines.forEach((line, idx) => {
    let match;
    const linkRe = /href=[\"'](\/[^\"'#?]*)/g;
    while ((match = linkRe.exec(line)) !== null) {
      const raw = match[1];
      if (raw.startsWith('/api') || raw.match(/\.(png|jpg|jpeg|svg|webp|ico|xml|txt|json)$/)) continue;
      const route = raw.replace(/\/$/, '') || '/';
      if (!validRoutes.has(route)) {
        brokenLinks.push({ file: relPath, line: idx + 1, link: raw, cleanRoute: route, snippet: line.trim() });
      }
    }

    const mdRe = /\[.*?\]\((\/[^\"'#?\s)]*)/g;
    while ((match = mdRe.exec(line)) !== null) {
      const raw = match[1];
      if (raw.startsWith('/api') || raw.match(/\.(png|jpg|jpeg|svg|webp|ico|xml|txt|json)$/)) continue;
      const route = raw.replace(/\/$/, '') || '/';
      if (!validRoutes.has(route)) {
        brokenLinks.push({ file: relPath, line: idx + 1, link: raw, cleanRoute: route, snippet: line.trim() });
      }
    }
  });
}

console.log('\n--- SCAN RESULTS ---');
if (brokenLinks.length === 0) {
  console.log('No broken internal links found in static code scanning!');
} else {
  console.log(`Found ${brokenLinks.length} broken links:\n`);
  brokenLinks.forEach((b, i) => {
    console.log(`[${i + 1}] ${b.file}:L${b.line} -> "${b.link}"`);
    console.log(`    Snippet: ${b.snippet.slice(0, 120)}`);
  });
}

