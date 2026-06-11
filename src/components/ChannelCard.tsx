import { useState } from "react";
import { Play, Tv } from "lucide-react";
import { Channel } from "../types";

interface ChannelCardProps {
  key?: string;
  channel: Channel;
  isActive: boolean;
  onSelect: (channel: Channel) => void;
}

export default function ChannelCard({ channel, isActive, onSelect }: ChannelCardProps) {
  const [hasError, setHasError] = useState(false);

  // Derive elegant color gradients for fallbacks
  const getGradientClass = (category: string) => {
    switch (category) {
      case "News": return "from-blue-600/30 to-slate-900/80 text-blue-400 border-blue-500/20";
      case "Movies": return "from-purple-600/30 to-slate-900/80 text-purple-400 border-purple-500/20";
      case "Kids": return "from-amber-500/30 to-slate-900/80 text-amber-400 border-amber-500/20";
      case "Sports": return "from-emerald-600/30 to-slate-900/80 text-emerald-400 border-emerald-500/20";
      case "Music": return "from-fuchsia-600/30 to-slate-900/80 text-fuchsia-400 border-fuchsia-500/20";
      case "Bangla": return "from-rose-600/30 to-slate-900/80 text-rose-400 border-rose-500/20";
      default: return "from-gray-700/30 to-slate-900/80 text-gray-400 border-gray-500/20";
    }
  };

  return (
    <button
      onClick={() => onSelect(channel)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect(channel);
        }
      }}
      id={`channel-card-${channel.id}`}
      tabIndex={0}
      className={`relative group flex flex-col w-full text-left bg-gray-900/50 hover:bg-gray-800/60 backdrop-blur-md rounded-xl p-3 border border-white/5 hover:border-rose-500/30 shadow-lg cursor-pointer transition-all duration-300 transform select-none hover:-translate-y-1 active:scale-95 focus:ring-4 focus:outline-none focus:ring-blue-500 ${
        isActive ? "ring-4 ring-rose-500/80 bg-rose-950/20 border-rose-500/50" : ""
      }`}
    >
      {/* Channel Logo Image Workspace */}
      <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-black mb-3 border border-white/5 flex items-center justify-center">
        {hasError ? (
          <img
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(channel.name)}&background=random&color=fff&size=256&bold=true`}
            alt={channel.name}
            className="w-full h-full object-contain p-2 max-h-[85%] transition-transform duration-500 group-hover:scale-110"
            referrerPolicy="no-referrer"
          />
        ) : (
          <img
            src={channel.logo || `https://ui-avatars.com/api/?name=${encodeURIComponent(channel.name)}&background=random&color=fff&size=256&bold=true`}
            alt={channel.name}
            className="w-full h-full object-contain p-2 max-h-[85%] transition-transform duration-500 group-hover:scale-110"
            onError={() => {
              setHasError(true);
            }}
            referrerPolicy="no-referrer"
            loading="lazy"
          />
        )}
        
        {/* Play Icon Backdrop Overlay */}
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-10 h-10 rounded-full bg-rose-500 flex items-center justify-center shadow-lg transform scale-75 group-hover:scale-100 transition-transform duration-300">
            <Play className="w-5 h-5 fill-white text-white translate-x-0.5" />
          </div>
        </div>

        {/* Floating Category Tag */}
        <div className="absolute bottom-2 left-2 px-1.5 py-0.5 rounded-md bg-black/70 backdrop-blur-md border border-white/10 text-[10px] font-medium text-gray-300">
          {channel.category}
        </div>
      </div>

      {/* Channel metadata */}
      <div className="flex items-start justify-between min-w-0 w-full">
        <div className="min-w-0 flex-1">
          <h4 className="text-sm font-semibold text-white group-hover:text-rose-400 transition-colors truncate">
            {channel.name}
          </h4>
          <span className="text-[11px] text-gray-400 block truncate mt-0.5 group-hover:text-gray-300">
            {channel.url}
          </span>
        </div>

        <div className="flex-shrink-0 ml-2">
          {isActive ? (
            <span className="relative flex h-2 w-2 mt-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
            </span>
          ) : (
            <Tv className="w-3.5 h-3.5 text-gray-600 mt-0.5 group-hover:text-gray-400 transition-colors" />
          )}
        </div>
      </div>
    </button>
  );
}
