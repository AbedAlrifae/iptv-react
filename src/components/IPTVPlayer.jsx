import React, { useEffect, useState, useRef } from "react";
import Hls from "hls.js";
import "../styles/channels/Channels.css"; // CSS-bestand importeren

const IPTVPlayer = () => {
  const [channels, setChannels] = useState([]);
  const [loading, setLoading] = useState(true);
  const videoRef = useRef(null);
  let hls = null;

  useEffect(() => {
    const fileUrl = "playlist.m3u";

    fetch(fileUrl)
      .then((response) => response.text())
      .then((content) => {
        const lines = content.split("\n");
        const loadedChannels = [];

        for (let i = 0; i < lines.length; i++) {
          const line = lines[i].trim();

          if (line.startsWith("#EXTINF")) {
            const channelName = line.split(",")[1].trim();
            const channelUrl = lines[i + 1]?.trim();

            if (channelUrl && channelUrl.startsWith("http")) {
              loadedChannels.push({ name: channelName, url: channelUrl });
            }
          }
        }

        setChannels(loadedChannels);
        setLoading(false);
      }) 
      .catch((error) => {
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
      const proxyUrl = `http://localhost:5173/api/proxy?url=${(url)}`; // Dit gebruikt de serverless functie.

      hls.loadSource(proxyUrl);
      hls.attachMedia(videoRef.current);

      hls.on(Hls.Events.MANIFEST_PARSED, function () {
        videoRef.current.play();
      });

      hls.on(Hls.Events.ERROR, function (event, data) {
        console.error("Fout bij het laden van de stream:", data);
      });
    } else if (videoRef.current.canPlayType("application/vnd.apple.mpegurl")) {
      videoRef.current.src = url;
      videoRef.current.play();
    }
  };

  return (
    <div className="iptv-container">
      <h1 className="iptv-title">📺 IPTV Player</h1>
      <div className="channel-list">
        {loading ? (
          <div className="loading">Kanalen worden geladen...</div>
        ) : channels.length > 0 ? (
          channels.map((channel, index) => (
            <div
              key={index}
              className="channel-item"
              onClick={() => playChannel(channel.url)}
            >
              {channel.name}
            </div>
          ))
        ) : (
          <div className="no-channels">Geen kanalen gevonden.</div>
        )}
      </div>
      <video ref={videoRef} controls className="video-player">
        Je browser ondersteunt geen video-afspelen.
      </video>
    </div>
  );
};

export default IPTVPlayer;
