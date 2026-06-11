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
  const [proxyToggled, setProxyToggled] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  // Compute protocol constraint flags
  const isHttp = channel?.url.startsWith("http://");
  const isHttpsPage = window.location.protocol === "https:";
  const autoProxy = isHttp && isHttpsPage; // Auto proxy mixed content
  const activeProxy = proxyToggled || autoProxy;

  // Derive proxied or actual URL
  const streamUrl = (channel && activeProxy)
    ? `https://corsproxy.io/?url=${encodeURIComponent(channel.url)}`
    : (channel?.url || "");

  // Reset custom toggle when channel changes
  useEffect(() => {
    setProxyToggled(false);
    setErrorMsg(null);
  }, [channel]);

  // Dynamic stream switching
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !channel || !streamUrl) return;

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
        manifestLoadingTimeOut: 10000,
        levelLoadingTimeOut: 10000,
      });

      hls.loadSource(streamUrl);
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
              console.error("Fatal network error encountered:", data);
              setIsLoading(false);
              if (!activeProxy) {
                setErrorMsg(
                  "Stream failed to load due to CORS or secure web constraints (Mixed Content). Try enabling our built-in CORS Proxy toggle below, or install an 'Allow CORS' browser extension."
                );
              } else {
                setErrorMsg(
                  "Stream offline or blocked by remote host. Even with CORS proxy routing, this server is currently unreachable."
                );
              }
              hls?.destroy();
              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
              console.warn("Fatal media error, attempting recovery...");
              hls?.recoverMediaError();
              break;
            default:
              setIsLoading(false);
              setErrorMsg("Unable to establish live stream feed. This channel is currently offline or unsupported.");
              hls?.destroy();
              break;
          }
        }
      });
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      // Native support (Safari / iOS)
      video.src = streamUrl;
      
      const onLoadedMetadata = () => {
        setIsLoading(false);
        video.play()
          .then(() => setIsPlaying(true))
          .catch((err) => {
            console.warn("Native Safari autoplay failure:", err);
            setIsPlaying(false);
          });
      };

      const onError = () => {
        setIsLoading(false);
        if (!activeProxy) {
          setErrorMsg(
            "Stream rendering failed. This happens on Vercel/Cloud Run. Press 'Use CORS Proxy' to route securely."
          );
        } else {
          setErrorMsg("Stream offline or blocked by remote host. Try installing an 'Allow CORS' browser extension.");
        }
      };

      video.addEventListener("loadedmetadata", onLoadedMetadata);
      video.addEventListener("error", onError);

      return () => {
        video.removeEventListener("loadedmetadata", onLoadedMetadata);
        video.removeEventListener("error", onError);
      };
    } else {
      setIsLoading(false);
      setErrorMsg("This browser does not support HLS streaming.");
    }

    return () => {
      if (hls) {
        hls.destroy();
      }
    };
  }, [channel, streamUrl, retryCount]);

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
    setErrorMsg(null);
    setIsLoading(true);
    setRetryCount(prev => prev + 1);
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
          {activeProxy && <span className="text-[10px] text-rose-400 select-none mt-0.5 animate-pulse">Proxy Tunnel Enabled</span>}
          <span className="text-xs text-gray-500 select-none mt-1">{channel.name}</span>
        </div>
      )}

      {/* Error State */}
      {errorMsg && channel && (
        <div className="absolute inset-x-0 inset-y-0 flex flex-col items-center justify-center bg-zinc-950/95 backdrop-blur-md z-10 p-6 text-center">
          <AlertCircle className="w-12 h-12 text-rose-500 mb-3 animate-pulse" />
          <h3 className="text-lg font-bold text-white mb-2">Live Playback Network Error</h3>
          <p className="text-xs text-zinc-400 max-w-md mb-5 leading-relaxed bg-zinc-900 px-4 py-3 rounded-xl border border-white/5">{errorMsg}</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={handleRetry}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 active:scale-95 text-white font-medium text-xs transition-all focus:outline-none cursor-pointer border border-white/10"
              id="retry-stream-btn"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Reset & Retry
            </button>
            {!activeProxy && (
              <button
                onClick={() => {
                  setErrorMsg(null);
                  setIsLoading(true);
                  setProxyToggled(true);
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 active:scale-95 text-white font-semibold text-xs transition-all focus:outline-none cursor-pointer"
                id="error-proxy-btn"
              >
                <Tv className="w-3.5 h-3.5" />
                Use CORS Proxy
              </button>
            )}
          </div>
        </div>
      )}

      {/* Stream Overlays & Premium Glassmorphic Controls */}
      {channel && !isLoading && !errorMsg && (
        <>
          {/* Channel Logo & Category Top Bar */}
          <div className="absolute top-0 left-0 right-0 p-4 bg-linear-to-b from-black/80 to-transparent flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
            <div className="flex items-center gap-3">
              <img 
                src={channel.logo} 
                alt={channel.name} 
                className="w-10 h-10 rounded-lg object-contain bg-slate-950 p-1 border border-white/10 shadow-inner"
                onError={(e) => {
                  e.currentTarget.src = "https://ui-avatars.com/api/?name=" + encodeURIComponent(channel.name) + "&background=f43f5e&color=fff";
                }}
              />
              <div>
                <span className="text-sm font-semibold text-white pointer-events-auto">{channel.name}</span>
                <span className="block text-[10px] text-gray-400 pointer-events-auto mt-0.5">
                  {channel.category} {activeProxy && <span className="text-rose-400 font-bold ml-1.5">(PROXIED)</span>}
                </span>
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
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-linear-to-t from-black/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
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

              {/* Right Side Buttons - CORS proxy / Fullscreen / Info bar */}
              <div className="flex flex-wrap items-center gap-2.5 text-white">
                <button
                  onClick={() => {
                    setErrorMsg(null);
                    setIsLoading(true);
                    setProxyToggled(!proxyToggled);
                  }}
                  className={`flex items-center gap-1.5 text-[10px] font-bold tracking-wider uppercase px-2.5 py-1.5 rounded-lg border transition-all cursor-pointer ${
                    activeProxy
                      ? "bg-rose-500/20 text-rose-400 border-rose-500/30"
                      : "bg-white/5 text-gray-400 border-white/5 hover:bg-white/10"
                  }`}
                  title="Toggle CORS & Mixed Content Stream Proxy"
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${activeProxy ? "bg-rose-500 animate-pulse" : "bg-gray-600"}`}></span>
                  CORS Proxy: {activeProxy ? "ON" : "OFF"}
                </button>

                <span className="text-[10px] font-mono px-2 py-1.5 bg-white/5 rounded-lg text-gray-400 border border-white/5 select-none hidden sm:inline-block">
                  HLS LIVE
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
