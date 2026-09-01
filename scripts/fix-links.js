const fs = require('fs');
const path = require('path');

const blogDataPath = path.join(__dirname, '..', 'lib', 'blog-data.ts');
let blogContent = fs.readFileSync(blogDataPath, 'utf8');

// Replace /services/consulting with /services/go-to-market-strategy
blogContent = blogContent.replaceAll('/services/consulting', '/services/go-to-market-strategy');

// Replace /services/seo with /services/websites
blogContent = blogContent.replaceAll('/services/seo', '/services/websites');

// Replace /services/branding with /services/design
blogContent = blogContent.replaceAll('/services/branding', '/services/design');

fs.writeFileSync(blogDataPath, blogContent, 'utf8');
console.log('Successfully updated blog-data.ts links!');
