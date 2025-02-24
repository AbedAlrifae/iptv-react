import fetch from 'node-fetch';

export async function handler(event, context) {
  const url = 'http://m25tv.co/live/Ahmadalokla1997/964188161418/333797.m3u8'; // Het HTTP URL
  
  try {
    const response = await fetch(url);
    const data = await response.text();
    
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/x-mpegURL'
      },
      body: data
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: 'Error fetching the resource'
    };
  }
}
