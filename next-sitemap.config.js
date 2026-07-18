/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://www.launchlive.studio',
  generateRobotsTxt: true, // Automatically generate robots.txt
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
      // Example of AI crawler management as per Technical SEO best practices
      {
        userAgent: 'GPTBot',
        disallow: ['/'], // You can adjust this based on your AI visibility strategy
      },
      {
        userAgent: 'Google-Extended',
        disallow: ['/'], // Disallow Gemini training, but keep Googlebot indexing
      }
    ],
  },
  exclude: ['/server-sitemap.xml'], // exclude dynamic server sitemap if you add one later
}
