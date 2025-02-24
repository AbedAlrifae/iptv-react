exports.handler = async (event, context) => {
    const url = event.queryStringParameters.url;

    if (!url) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: 'URL is vereist.' }),
        };
    }

    return new Promise((resolve, reject) => {
        const proxyRequest = url.startsWith('https') ? https : http;

        proxyRequest.get(url, (proxyResponse) => {
            let data = '';

            proxyResponse.on('data', (chunk) => {
                data += chunk;
            });

            proxyResponse.on('end', () => {
                console.log('M3U8 Content:', data); // Log the content here
                resolve({
                    statusCode: proxyResponse.statusCode,
                    body: data,
                    headers: { 
                        'Content-Type': 'application/vnd.apple.mpegurl',
                    },
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
};