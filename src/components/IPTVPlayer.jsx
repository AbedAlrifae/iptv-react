import React, { useState, useEffect } from "react";
import Hls from "hls.js";

const IPTVPlayer = () => {
    const [channels, setChannels] = useState([]);
    const [currentUrl, setCurrentUrl] = useState(null);
  
    useEffect(() => {
      // Laad het M3U-bestand vanuit de public map
      const fileUrl = "/playlist.m3u";
      fetch(fileUrl)
        .then((response) => response.text())
        .then((content) => {
          const loadedChannels = parseM3U(content);
          setChannels(loadedChannels);
        })
        .catch((error) => console.error("Fout bij het ophalen van het bestand:", error));
    }, []);
  
    const parseM3U = (content) => {
      const lines = content.split("\n");
      const channels = [];
      let currentChannel = null;
  
      lines.forEach((line) => {
        if (line.startsWith("#EXTINF")) {
          currentChannel = line.split(",")[1]?.trim();
        } else if (line.startsWith("http") && currentChannel) {
          channels.push({ name: currentChannel, url: line.trim() });
          currentChannel = null;
        }
      });
  
      return channels;
    };
  
    const playChannel = (url) => {
      setCurrentUrl(url);
    };
  
    useEffect(() => {
      if (currentUrl) {
        const video = document.getElementById("videoPlayer");
  
        // Controleer of de browser HLS ondersteunt
        if (Hls.isSupported()) {
          const hls = new Hls();
          hls.loadSource(currentUrl);
          hls.attachMedia(video);
  
          hls.on(Hls.Events.MANIFEST_PARSED, function () {
            video.play();
          });
  
          hls.on(Hls.Events.ERROR, function (event, data) {
            console.error("Fout bij het laden van de stream:", data);
          });
  
          return () => hls.destroy();
        } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
          video.src = currentUrl;
          video.play();
        }
      }
    }, [currentUrl]);
  
    return (
      <div style={{ fontFamily: "Arial, sans-serif", margin: "20px" }}>
        <h1>IPTV Player</h1>
        <div
          id="channelList"
          style={{
            maxHeight: "300px",
            overflowY: "auto",
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "20px",
          }}
        >
          {channels.length > 0 ? (
            channels.map((channel, index) => (
              <div
                key={index}
                className="channel"
                style={{
                  margin: "5px 0",
                  padding: "5px",
                  border: "1px solid #ddd",
                  cursor: "pointer",
                }}
                onClick={() => playChannel(channel.url)}
              >
                {channel.name}
              </div>
            ))
          ) : (
            <p>Kanalen worden hier geladen...</p>
          )}
        </div>
        <video
          id="videoPlayer"
          controls
          style={{ width: "100%", maxWidth: "600px", marginTop: "20px" }}
        >
          Je browser ondersteunt geen video-afspelen.
        </video>
      </div>
    );
  };

export default IPTVPlayer;
