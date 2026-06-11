import { useState, useMemo, useEffect } from "react";
import { Tv, Info, Github, RotateCcw, Loader2, HelpCircle } from "lucide-react";
import { Channel, Category } from "./types";
import { DEFAULT_CHANNELS } from "./data/channels";
import Sidebar from "./components/Sidebar";
import VideoPlayer from "./components/VideoPlayer";
import ChannelCard from "./components/ChannelCard";
import M3uParserPanel from "./components/M3uParserPanel";

export default function App() {
  const [channels, setChannels] = useState<Channel[]>(DEFAULT_CHANNELS);
  const [activeChannel, setActiveChannel] = useState<Channel | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isParserOpen, setIsParserOpen] = useState<boolean>(false);

  // Set the first channel as active on load for automated live player boot
  useEffect(() => {
    if (channels.length > 0 && !activeChannel) {
      setActiveChannel(channels[0]);
    }
  }, [channels]);

  // Compute live categories based on active channels list
  const categories = useMemo(() => {
    const countsMap: { [key: string]: number } = {};
    channels.forEach((channel) => {
      countsMap[channel.category] = (countsMap[channel.category] || 0) + 1;
    });

    return Object.entries(countsMap).map(([name, count]) => ({
      name,
      count,
    })).sort((a, b) => b.count - a.count); // sort by channel volume
  }, [channels]);

  // Filter channels based on selected category and direct search queries
  const filteredChannels = useMemo(() => {
    return channels.filter((channel) => {
      const matchCategory = selectedCategory === "all" || channel.category === selectedCategory;
      const matchSearch = channel.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          channel.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [channels, selectedCategory, searchQuery]);

  const handlePlaylistLoaded = (newChannels: Channel[]) => {
    setChannels(newChannels);
    setSelectedCategory("all");
    setSearchQuery("");
    if (newChannels.length > 0) {
      setActiveChannel(newChannels[0]);
    }
    setIsParserOpen(false);
  };

  const handleResetDefault = () => {
    setChannels(DEFAULT_CHANNELS);
    setSelectedCategory("all");
    setSearchQuery("");
    if (DEFAULT_CHANNELS.length > 0) {
      setActiveChannel(DEFAULT_CHANNELS[0]);
    }
    setIsParserOpen(false);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col font-sans" id="applet-main-container">
      {/* Premium Sticky Top Navbar */}
      <header className="sticky top-0 z-40 bg-gray-950/85 backdrop-blur-md border-b border-white/5 h-16 flex items-center justify-between px-5">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-linear-to-tr from-rose-500 to-amber-500 flex items-center justify-center border border-rose-400/20 shadow-lg shadow-rose-950/20">
            <Tv className="w-5 h-5 text-white animate-pulse" />
          </div>
          <div>
            <span className="text-sm font-black tracking-tight uppercase bg-linear-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
              Live TV Streamer
            </span>
            <span className="block text-[10px] text-rose-500 font-extrabold tracking-widest uppercase leading-none">
              Personal Edition
            </span>
          </div>
        </div>

        {/* Global actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleResetDefault}
            className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-rose-400 font-semibold px-2.5 py-1.5 rounded-lg hover:bg-white/5 transition-colors duration-150 cursor-pointer"
            title="Restore original channel presets"
            id="global-restore-btn"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset Channels</span>
          </button>

          <span className="h-4 w-px bg-white/10 hidden sm:block"></span>

          {/* Quick guide trigger */}
          <div className="relative group/tooltip">
            <button className="p-1.5 hover:bg-white/5 rounded-lg text-gray-400 hover:text-white transition-colors cursor-pointer">
              <HelpCircle className="w-4 h-4" />
            </button>
            <div className="absolute right-0 top-full mt-2 w-72 bg-gray-900 border border-white/10 p-3.5 rounded-xl text-xs text-gray-400 shadow-2xl opacity-0 group-hover/tooltip:opacity-100 pointer-events-none transition-opacity duration-200 z-50 leading-relaxed font-normal">
              <div className="text-white font-bold mb-1.5">Personal Streamer Guide</div>
              Provide a direct HLS (.m3u8) string, or paste any standard EXTM3U list. Ensure your streams accommodate the requested browser format. Use proxy toggle for local restrictions.
            </div>
          </div>
        </div>
      </header>

      {/* Workspace Framework Layout */}
      <div className="flex flex-col lg:flex-row flex-1">
        {/* Navigation panel */}
        <Sidebar
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onOpenParser={() => setIsParserOpen(true)}
          activeChannel={activeChannel}
        />

        {/* Core Media Area */}
        <main className="flex-1 overflow-y-auto p-5 sm:p-6 lg:p-8 space-y-8" id="media-content-workspace">
          {/* Top Hero player */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                  <span className="inline-block w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping"></span>
                  Active Feed Stream
                </h1>
                <p className="text-xs text-gray-500 mt-1">Netflix style minimal dark media player wrapper</p>
              </div>
              {activeChannel && (
                <div className="text-xs text-gray-400 font-mono bg-white/5 px-2.5 py-1 rounded-md border border-white/5 select-all max-w-[200px] sm:max-w-xs truncate" title={activeChannel.url}>
                  {activeChannel.url}
                </div>
              )}
            </div>

            <VideoPlayer channel={activeChannel} />
          </section>

          {/* Channels Compilation grid panel */}
          <section className="space-y-4">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3">
              <div>
                <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest select-none">
                  {selectedCategory === "all" ? "All Streams" : `${selectedCategory} Collection`}
                </h2>
                <p className="text-xs text-gray-500 mt-1">
                  Displaying {filteredChannels.length} TV feeds of {channels.length} parsed channels
                </p>
              </div>

              <div className="text-xs font-mono text-gray-500">
                Category: <span className="text-rose-400 font-semibold">{selectedCategory.toUpperCase()}</span>
              </div>
            </div>

            {/* Channels grid */}
            {filteredChannels.length > 0 ? (
              <div 
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
                id="channels-grid-container"
              >
                {filteredChannels.map((channel) => (
                  <ChannelCard
                    key={channel.id}
                    channel={channel}
                    isActive={activeChannel?.id === channel.id}
                    onSelect={setActiveChannel}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center p-12 text-center border border-dashed border-white/5 bg-gray-900/10 rounded-2xl">
                <Tv className="w-12 h-12 text-gray-600 mb-3 animate-pulse" />
                <h4 className="text-base font-semibold text-gray-300">No Channels Found</h4>
                <p className="text-xs text-gray-500 max-w-sm mt-1 leading-relaxed">
                  No active channels match standard category query or search parameters. Try resetting compilations or customizing query parameters.
                </p>
              </div>
            )}
          </section>
        </main>
      </div>

      {/* Parser Configuration overlay container */}
      {isParserOpen && (
        <M3uParserPanel
          onPlaylistLoaded={handlePlaylistLoaded}
          onResetDefault={handleResetDefault}
          onClose={() => setIsParserOpen(false)}
        />
      )}
    </div>
  );
}
