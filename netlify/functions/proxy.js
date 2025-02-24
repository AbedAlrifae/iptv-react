// netlify/functions/proxy.js
import https from 'https';
import http from 'http';

export async function handler(event, context) {
  const url = event.queryStringParameters.url; // Haal de URL op via een querystring.

  if (!url) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'URL is vereist.' }),
    };
  }

  return new Promise((resolve, reject) => {
    const proxyRequest = url.startsWith('https') ? https : http;

    proxyRequest
      .get(url, (proxyResponse) => {
        let data = '';

        proxyResponse.on('data', (chunk) => {
          data += chunk;
        });

        proxyResponse.on('end', () => {
          resolve({
            statusCode: proxyResponse.statusCode,
            body: data,
            headers: { 'Content-Type': 'application/json' },
          });
        });
      })
      .on('error', (error) => {
        reject({
          statusCode: 500,
          body: JSON.stringify({ error: 'Fout bij het proxyen van de aanvraag.', details: error.message }),
        });
      });
  });
}
