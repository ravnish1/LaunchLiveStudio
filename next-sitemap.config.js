/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://www.launchlive.studio',
  generateRobotsTxt: true, // Automatically generate robots.txt
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
      {
        userAgent: ['GPTBot', 'PerplexityBot', 'ClaudeBot', 'Google-Extended', 'Applebot-Extended', 'Amazonbot', 'Bytespider', 'CCBot'],
        allow: '/',
        disallow: ['/api/'],
      },
    ],
  },
  exclude: ['/server-sitemap.xml', '/api/*'],
}

