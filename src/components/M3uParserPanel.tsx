import { useState } from "react";
import { Upload, Link, AlertCircle, Code2, RefreshCw, X, Play } from "lucide-react";
import { parseM3u, fetchAndParseM3u } from "../utils/m3uParser";
import { Channel } from "../types";
import { RAW_M3U_TEXT } from "../data/channels";

interface M3uParserPanelProps {
  onPlaylistLoaded: (channels: Channel[]) => void;
  onResetDefault: () => void;
  onClose: () => void;
}

export default function M3uParserPanel({ onPlaylistLoaded, onResetDefault, onClose }: M3uParserPanelProps) {
  const [activeTab, setActiveTab] = useState<"paste" | "url">("paste");
  const [rawText, setRawText] = useState("");
  const [playlistUrl, setPlaylistUrl] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handlePasteParse = () => {
    if (!rawText.trim()) {
      setFeedbackMsg({ type: "error", text: "Please paste your M3U playlist content first." });
      return;
    }
    
    setIsProcessing(true);
    setFeedbackMsg(null);

    try {
      const parsed = parseM3u(rawText);
      if (parsed.length === 0) {
        throw new Error("No active channels detected in raw input. Verify it contains valid #EXTINF tags.");
      }
      onPlaylistLoaded(parsed);
      setFeedbackMsg({
        type: "success",
        text: `Successfully parsed & categorized ${parsed.length} television channels!`
      });
    } catch (err: any) {
      setFeedbackMsg({
        type: "error",
        text: err.message || "Failed to parse M3U. Check data syntax."
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleUrlFetch = async () => {
    if (!playlistUrl.trim() || !playlistUrl.startsWith("http")) {
      setFeedbackMsg({ type: "error", text: "Please enter a valid HTTP/HTTPS M3U stream URL." });
      return;
    }

    setIsProcessing(true);
    setFeedbackMsg(null);

    try {
      const parsed = await fetchAndParseM3u(playlistUrl);
      if (parsed.length === 0) {
        throw new Error("No channels found. Verify URL points to a valid M3U8/M3U server.");
      }
      onPlaylistLoaded(parsed);
      setFeedbackMsg({
        type: "success",
        text: `Successfully fetched & compiled ${parsed.length} channels from remote link!`
      });
    } catch (err: any) {
      setFeedbackMsg({
        type: "error",
        text: "Error loading remote feed. Verify CORS permission, check network address, and retry."
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const loadOriginalPdfRaw = () => {
    setRawText(RAW_M3U_TEXT);
    setFeedbackMsg({
      type: "success",
      text: "Default PDF channels loaded in editor workspace! Click 'Parse Compilation' to compile."
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4">
      <div 
        className="relative w-full max-w-2xl bg-gray-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
        id="m3u-parsing-panel"
      >
        {/* Header bar */}
        <div className="flex items-center justify-between p-5 border-b border-white/5 bg-gray-900/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-rose-500/10 flex items-center justify-center border border-rose-500/20 text-rose-500">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Import M3U Playlist</h3>
              <p className="text-xs text-gray-400 mt-0.5">Parse, compile, and stream custom TV playlist assemblies</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors cursor-pointer"
            id="close-panel-btn"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form area */}
        <div className="p-6 overflow-y-auto flex-1 space-y-5">
          {/* Tabs header */}
          <div className="flex bg-black/40 p-1 rounded-xl border border-white/5">
            <button
              onClick={() => { setActiveTab("paste"); setFeedbackMsg(null); }}
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                activeTab === "paste" ? "bg-rose-500 text-white shadow-md" : "text-gray-400 hover:text-white"
              }`}
            >
              <Upload className="w-4 h-4" />
              Paste Raw M3U Content
            </button>
            <button
              onClick={() => { setActiveTab("url"); setFeedbackMsg(null); }}
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                activeTab === "url" ? "bg-rose-500 text-white shadow-md" : "text-gray-400 hover:text-white"
              }`}
            >
              <Link className="w-4 h-4" />
              Load Remote M3U URL
            </button>
          </div>

          {/* Feedback messages */}
          {feedbackMsg && (
            <div className={`flex items-start gap-3 p-3.5 rounded-xl border text-sm ${
              feedbackMsg.type === "success" 
                ? "bg-emerald-950/25 border-emerald-500/30 text-emerald-400" 
                : "bg-rose-950/25 border-rose-500/30 text-rose-400"
            }`}>
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <div>{feedbackMsg.text}</div>
            </div>
          )}

          {/* Paste Tab */}
          {activeTab === "paste" && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
                  Clipped Raw EXTM3U Playlist
                </label>
                <button
                  onClick={loadOriginalPdfRaw}
                  className="text-xs text-rose-400 hover:text-rose-300 transition-colors font-medium cursor-pointer"
                  id="fill-sample-playlist-btn"
                >
                  Load Original Raw PDF M3U
                </button>
              </div>
              <textarea
                value={rawText}
                onChange={(e) => setRawText(e.target.value)}
                placeholder="#EXTM3U&#10;#EXTINF:-1 ,Channel Name&#10;https://example.com/stream.m3u8"
                className="w-full h-48 bg-black/40 border border-white/5 rounded-xl p-4 text-xs font-mono text-gray-300 focus:border-rose-500/50 outline-none resize-none transition-colors"
              />
            </div>
          )}

          {/* URL Fetch Tab */}
          {activeTab === "url" && (
            <div className="space-y-3">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
                M3U / M3U8 Playlist Address Link
              </label>
              <div className="flex gap-2">
                <span className="bg-black/40 border border-white/5 rounded-xl px-3 flex items-center text-gray-500 text-sm font-mono tracking-tighter">
                  HTTP(S)
                </span>
                <input
                  type="url"
                  value={playlistUrl}
                  onChange={(e) => setPlaylistUrl(e.target.value)}
                  placeholder="https://raw.githubusercontent.com/.../playlist.m3u"
                  className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-2.5 text-sm font-mono text-white focus:border-rose-500/50 outline-none transition-colors"
                />
              </div>
              <span className="block text-[11px] text-gray-500 leading-relaxed font-normal">
                Important: Remote servers must allow CORS permissions, or fall back to client proxy redirection (automatically attempted).
              </span>
            </div>
          )}
        </div>

        {/* Action bounds */}
        <div className="p-5 border-t border-white/5 bg-black/40 flex flex-col sm:flex-row gap-3 justify-between items-center">
          <button
            onClick={() => {
              onResetDefault();
              setFeedbackMsg({
                type: "success",
                text: "Television list restored successfully to the default PDF compilation."
              });
            }}
            className="w-full sm:w-auto px-5 py-2 hover:bg-white/5 rounded-xl text-gray-400 hover:text-white transition-all text-sm font-semibold border border-transparent hover:border-white/5 cursor-pointer"
            id="reset-presets-btn"
          >
            Reset Default Presets
          </button>

          <div className="flex gap-2 w-full sm:w-auto">
            {activeTab === "paste" ? (
              <button
                onClick={handlePasteParse}
                disabled={isProcessing}
                className="w-full sm:w-auto px-6 py-2 bg-rose-600 hover:bg-rose-500 active:scale-95 text-white font-semibold rounded-xl text-sm transition-all focus:outline-none flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                id="compile-pasted-btn"
              >
                {isProcessing ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <Play className="w-4 h-4" />
                )}
                Compile Playlist
              </button>
            ) : (
              <button
                onClick={handleUrlFetch}
                disabled={isProcessing}
                className="w-full sm:w-auto px-6 py-2 bg-rose-600 hover:bg-rose-500 active:scale-95 text-white font-semibold rounded-xl text-sm transition-all focus:outline-none flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                id="fetch-url-btn"
              >
                {isProcessing ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <Link className="w-4 h-4" />
                )}
                Fetch & Load Link
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
