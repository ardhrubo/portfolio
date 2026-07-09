const https = require('https');
const http = require('http');

const urls = [
  'https://www.horizontaxsolutions.com.au/',
  'https://scrapeautomate.com/',
  'https://admissionbondhu.com/',
  'https://chromewebstore.google.com/detail/copippkpbpdkhjpcbaibpjdmaanccocc',
  'https://passwordgeneratordhrubo.vercel.app/'
];

async function fetchOgImage(url) {
  return new Promise((resolve) => {
    const client = url.startsWith('https') ? https : http;
    client.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const match = data.match(/<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["'][^>]*>/i) ||
                      data.match(/<meta[^>]*content=["']([^"']+)["'][^>]*property=["']og:image["'][^>]*>/i);
        resolve({url, ogImage: match ? match[1] : null});
      });
    }).on('error', () => resolve({url, ogImage: null}));
  });
}

Promise.all(urls.map(fetchOgImage)).then(console.log);
