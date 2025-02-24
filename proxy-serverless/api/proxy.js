export default async (req, res) => {
    const url = 'http://m25tv.co/live/Ahmadalokla1997/964188161418/333797.m3u8'; // Het HTTP URL
    const fetch = require('node-fetch');
    
    try {
      const response = await fetch(url);
      const data = await response.text();
      
      res.setHeader('Content-Type', 'application/x-mpegURL');
      res.status(200).send(data);
    } catch (error) {
      res.status(500).send('Error fetching the resource');
    }
  };
  