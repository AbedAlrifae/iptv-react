import React, { useEffect, useState, useRef } from 'react';
import Hls from 'hls.js';

const IPTVPlayer = () => {
    const [channels, setChannels] = useState([]);
    const [loading, setLoading] = useState(true);
    const videoRef = useRef(null);
    let hls = null;

    useEffect(() => {
        const fileUrl = 'playlist.m3u';
    
        fetch(fileUrl)
            .then(response => response.text())
            .then(content => {
                const lines = content.split('\n');
                const loadedChannels = [];
    
                for (let i = 0; i < lines.length; i++) {
                    const line = lines[i].trim();
    
                    if (line.startsWith('#EXTINF')) {
                        const channelName = line.split(',')[1].trim();
                        const channelUrl = lines[i + 1]?.trim(); // Pak de volgende regel als URL
    
                        if (channelUrl && channelUrl.startsWith('http')) {
                            loadedChannels.push({ name: channelName, url: channelUrl });
                        }
                    }
                }
    
                setChannels(loadedChannels); // Update de state met de geladen kanalen
                setLoading(false); // Zet de loading-status uit
            })
            .catch(error => {
                console.error("Fout bij het ophalen van het bestand:", error);
                setLoading(false);
            });
    
        return () => {
            if (hls) {
                hls.destroy();
            }
        };
    }, []);

    const playChannel = (url) => {
        if (hls) {
            hls.destroy();
        }

        if (Hls.isSupported()) {
            hls = new Hls();
            hls.loadSource(url);
            hls.attachMedia(videoRef.current);

            hls.on(Hls.Events.MANIFEST_PARSED, function () {
                videoRef.current.play();
            });

            hls.on(Hls.Events.ERROR, function (event, data) {
                console.error("Fout bij het laden van de stream:", data);
            });
        } else if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
            videoRef.current.src = url;
            videoRef.current.play();
        }
    };

    return (
        <div>
            <h1>IPTV Player</h1>
            <div style={{ maxHeight: '300px', overflowY: 'auto', border: '1px solid #ccc', padding: '10px', marginBottom: '20px' }}>
                {loading ? (
                    <div>Kanalen worden geladen...</div>
                ) : channels.length > 0 ? (
                    channels.map((channel, index) => (
                        <div key={index} onClick={() => playChannel(channel.url)} style={{ cursor: 'pointer', margin: '5px 0', padding: '5px', border: '1px solid #ddd' }}>
                            {channel.name}
                        </div>
                    ))
                ) : (
                    <div>Geen kanalen gevonden in het bestand.</div>
                )}
            </div>
            <video ref={videoRef} controls style={{ width: '100%', maxWidth: '600px' }}>
                Je browser ondersteunt geen video-afspelen.
            </video>
        </div>
    );
};

export default IPTVPlayer;