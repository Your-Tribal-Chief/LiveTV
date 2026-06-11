import React, { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import { Play, Pause, Volume2, VolumeX, Maximize, Minimize, RefreshCw, AlertCircle, Tv } from "lucide-react";
import { Channel } from "../types";

interface VideoPlayerProps {
  channel: Channel | null;
}

export default function VideoPlayer({ channel }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [hlsInstance, setHlsInstance] = useState<Hls | null>(null);

  // Dynamic stream switching
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !channel) return;

    setIsLoading(true);
    setErrorMsg(null);
    setIsPlaying(false);

    // Clean up previous instance of hls
    if (hlsInstance) {
      hlsInstance.destroy();
    }

    let hls: Hls | null = null;

    if (Hls.isSupported()) {
      hls = new Hls({
        enableWorker: true,
        maxMaxBufferLength: 30, // 30 seconds max buffer for live stream low latency
        liveSyncDurationCount: 3,
        liveMaxLatencyDurationCount: 10,
      });

      hls.loadSource(channel.url);
      hls.attachMedia(video);
      setHlsInstance(hls);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        setIsLoading(false);
        video.play()
          .then(() => setIsPlaying(true))
          .catch((err) => {
            console.warn("Autoplay blocked or failed:", err);
            setIsPlaying(false);
          });
      });

      hls.on(Hls.Events.ERROR, (_, data) => {
        if (data.fatal) {
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              console.error("Fatal network error encountered, attempting to recover...");
              hls?.startLoad();
              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
              console.error("Fatal media error encountered, attempting to recover...");
              hls?.recoverMediaError();
              break;
            default:
              setIsLoading(false);
              setErrorMsg("Unable to establish live stream feed. Channel is currently offline.");
              hls?.destroy();
              break;
          }
        }
      });
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      // Native support (Safari / iOS)
      video.src = channel.url;
      video.addEventListener("loadedmetadata", () => {
        setIsLoading(false);
        video.play()
          .then(() => setIsPlaying(true))
          .catch((err) => {
            console.warn("Native Safari autoplay failure:", err);
            setIsPlaying(false);
          });
      });

      video.addEventListener("error", () => {
        setIsLoading(false);
        setErrorMsg("Failed to play this channel. Check if stream is active.");
      });
    } else {
      setIsLoading(false);
      setErrorMsg("This browser does not support HLS streaming.");
    }

    return () => {
      if (hls) {
        hls.destroy();
      }
    };
  }, [channel]);

  // Fullscreen event listener
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(document.fullscreenElement === containerRef.current);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
    } else {
      video.play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;

    const v = parseFloat(e.target.value);
    setVolume(v);
    video.volume = v;
    video.muted = v === 0;
    setIsMuted(v === 0);
  };

  const toggleFullscreen = () => {
    const container = containerRef.current;
    if (!container) return;

    if (!isFullscreen) {
      container.requestFullscreen().catch((err) => {
        console.error("Error enabling fullscreen:", err);
      });
    } else {
      document.exitFullscreen();
    }
  };

  const handleRetry = () => {
    // Force rebuild player to retry connection
    if (channel) {
      const video = videoRef.current;
      if (video) {
        video.load();
      }
      // Trigger metadata reload by re-triggering current stream source
      setErrorMsg(null);
      setIsLoading(true);
      if (hlsInstance) {
        hlsInstance.destroy();
        setHlsInstance(null);
      }
      const rawChannel = { ...channel };
      // Force effect reload
      videoRef.current!.src = "";
      setTimeout(() => {
        // Re-assign channel event stream trigger
        videoRef.current!.dispatchEvent(new Event("trigger-reload"));
      }, 50);
    }
  };

  return (
    <div 
      ref={containerRef} 
      className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black/90 shadow-2xl border border-white/5 group"
      id="live-tv-player"
    >
      {/* Real Video Element */}
      {channel ? (
        <video
          ref={videoRef}
          onClick={togglePlay}
          className="w-full h-full object-contain"
          playsInline
          muted={isMuted}
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 text-gray-400 bg-linear-to-b from-gray-900 to-black">
          <Tv className="w-16 h-16 mb-4 text-rose-500 animate-pulse" />
          <h3 className="text-xl font-medium text-white mb-1">No Channel Playing</h3>
          <p className="text-sm text-gray-500 max-w-sm">
            Select an active channel from the sidebar categories or compilation grid below to start streaming.
          </p>
        </div>
      )}

      {/* Loading Overlay */}
      {isLoading && channel && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 backdrop-blur-xs z-10">
          <RefreshCw className="w-10 h-10 text-rose-500 animate-spin mb-3" />
          <span className="text-sm font-medium text-white select-none">Buffering Live Stream...</span>
          <span className="text-xs text-gray-500 select-none mt-1">{channel.name}</span>
        </div>
      )}

      {/* Error State */}
      {errorMsg && channel && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/90 backdrop-blur-sm z-10 p-6 text-center">
          <AlertCircle className="w-12 h-12 text-rose-500 mb-3" />
          <h3 className="text-lg font-medium text-white mb-2">Live Playback Network Error</h3>
          <p className="text-sm text-gray-400 max-w-md mb-4">{errorMsg}</p>
          <button
            onClick={handleRetry}
            className="flex items-center gap-2 px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 active:scale-95 text-white font-medium text-sm transition-all focus:outline-none cursor-pointer"
            id="retry-stream-btn"
          >
            <RefreshCw className="w-4 h-4" />
            Retry Stream Feed
          </button>
        </div>
      )}

      {/* Stream Overlays & Premium Glassmorphic Controls */}
      {channel && !isLoading && !errorMsg && (
        <>
          {/* Channel Logo & Category Top Bar */}
          <div className="absolute top-0 left-0 right-0 p-4 bg-linear-to-b from-black/80 to-transparent flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <div className="flex items-center gap-3">
              <img 
                src={channel.logo} 
                alt={channel.name} 
                className="w-10 h-10 rounded-lg object-cover border border-white/10 shadow-inner"
                onError={(e) => {
                  e.currentTarget.src = "https://images.unsplash.com/photo-1598257006458-087169a1f08d?w=120&q=80";
                }}
              />
              <div>
                <span className="text-sm font-semibold text-white pointer-events-auto">{channel.name}</span>
                <span className="block text-[10px] text-gray-400 pointer-events-auto mt-0.5">{channel.category}</span>
              </div>
            </div>
            
            {/* Glowing Live Indicator */}
            <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 shadow-lg pointer-events-auto">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
              </span>
              <span className="text-[10px] font-bold tracking-widest text-white uppercase select-none">LIVE</span>
            </div>
          </div>

          {/* Bottom Glassmorphic Controls */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-linear-to-t from-black/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex items-center justify-between bg-black/40 backdrop-blur-md px-4 py-3 rounded-xl border border-white/5 shadow-2xl">
              {/* Play & Mute controls */}
              <div className="flex items-center gap-4">
                <button
                  onClick={togglePlay}
                  className="p-1.5 rounded-lg hover:bg-white/10 active:scale-95 text-white transition-colors cursor-pointer"
                  title={isPlaying ? "Pause stream" : "Play stream"}
                  id="play-pause-btn"
                >
                  {isPlaying ? (
                    <Pause className="w-5 h-5 fill-white text-white" />
                  ) : (
                    <Play className="w-5 h-5 fill-white text-white" />
                  )}
                </button>

                {/* Volume Controller */}
                <div className="flex items-center gap-2 group/volume">
                  <button
                    onClick={toggleMute}
                    className="p-1.5 rounded-lg hover:bg-white/10 active:scale-95 text-white transition-colors cursor-pointer"
                    title={isMuted ? "Unmute sound" : "Mute sound"}
                    id="volume-toggle-btn"
                  >
                    {isMuted ? (
                      <VolumeX className="w-5 h-5 text-gray-400" />
                    ) : (
                      <Volume2 className="w-5 h-5 text-white" />
                    )}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    className="w-0 group-hover/volume:w-20 focus:w-20 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer transition-all duration-300 accent-rose-500 outline-none"
                    title="Volume slider"
                  />
                </div>
              </div>

              {/* Right Side Buttons - Fullscreen / Info bar */}
              <div className="flex items-center gap-2 text-white">
                <span className="text-[10px] font-mono px-2 py-1 bg-white/5 rounded text-gray-400 border border-white/5 select-none">
                  HLS.JS LIVEFEED
                </span>

                <button
                  onClick={toggleFullscreen}
                  className="p-1.5 rounded-lg hover:bg-white/10 active:scale-95 transition-colors cursor-pointer"
                  title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                  id="fullscreen-toggle-btn"
                >
                  {isFullscreen ? (
                    <Minimize className="w-5 h-5" />
                  ) : (
                    <Maximize className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
