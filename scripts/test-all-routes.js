const http = require('http');
const fs = require('fs');
const path = require('path');

const blogDataRaw = fs.readFileSync(path.join(__dirname, '..', 'lib', 'blog-data.ts'), 'utf8');
const blogSlugs = [...blogDataRaw.matchAll(/slug:\s*["']([^"']+)["']/g)].map(m => m[1]);

const urls = [
  '/',
  '/blogs',
  '/services',
  '/work',
  '/faq',
  '/testimonials',
  '/book-a-call',
  '/privacy',
  '/terms',
  ...blogSlugs.map(s => '/blogs/' + s),
  '/services/websites',
  '/services/systems',
  '/services/ai-tools',
  '/services/automation',
  '/services/design',
  '/services/go-to-market-strategy',
  '/invalid-url-should-be-404'
];

const PORT = process.env.PORT || 3001;
console.log(`Testing ${urls.length} routes on localhost:${PORT}...\n`);

async function run() {
  const results = [];
  for (const url of urls) {
    const res = await new Promise((resolve) => {
      http.get(`http://localhost:${PORT}` + url, response => {
        resolve({ url, status: response.statusCode });
      }).on('error', err => {
        resolve({ url, status: 'ERROR: ' + err.message });
      });
    });
    results.push(res);
  }

  const errors = results.filter(r => 
    (r.url !== '/invalid-url-should-be-404' && r.status !== 200) || 
    (r.url === '/invalid-url-should-be-404' && r.status !== 404)
  );

  console.log(`Summary: ${results.length - errors.length} / ${results.length} passed.`);
  if (errors.length === 0) {
    console.log('✅ ALL ROUTES PASSED! All 35 valid routes returned HTTP 200 OK, and invalid routes correctly return HTTP 404.');
  } else {
    console.log('❌ Status mismatches found:');
    errors.forEach(e => console.log(`  - ${e.url} -> ${e.status}`));
  }
}

run();
