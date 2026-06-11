import { Newspaper, Film, Smile, Activity, Music, Tv, AppWindow, Search, PlusCircle, BookmarkCheck } from "lucide-react";
import { Category, Channel } from "../types";

interface SidebarProps {
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onOpenParser: () => void;
  activeChannel: Channel | null;
}

export default function Sidebar({
  categories,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  onOpenParser,
  activeChannel
}: SidebarProps) {
  
  // Custom helper to pair categories with relevant Lucide icon descriptors
  const getCategoryIcon = (catName: string) => {
    switch (catName.toLowerCase()) {
      case "all":
        return <AppWindow className="w-4 h-4" />;
      case "news":
        return <Newspaper className="w-4 h-4" />;
      case "movies":
        return <Film className="w-4 h-4" />;
      case "kids":
        return <Smile className="w-4 h-4" />;
      case "sports":
        return <Activity className="w-4 h-4" />;
      case "music":
        return <Music className="w-4 h-4" />;
      case "bangla":
        return <Tv className="w-4 h-4" />;
      default:
        return <Tv className="w-4 h-4" />;
    }
  };

  return (
    <aside 
      className="w-full lg:w-72 bg-gray-950/80 backdrop-blur-xl border-r lg:border-r border-b lg:border-b-0 border-white/5 flex flex-col h-auto lg:h-[calc(100vh-4rem)] text-white"
      id="side-control-deck"
    >
      {/* Search Bar Section */}
      <div className="p-5 border-b border-white/5 space-y-4">
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
            <Search className="w-4 h-4" />
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search channels..."
            className="w-full pl-9 pr-4 py-2 bg-black/40 border border-white/5 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-rose-500/50 focus:ring-4 focus:ring-blue-500 transition-colors"
          />
        </div>

        {/* Custom M3u import trigger */}
        <button
          onClick={onOpenParser}
          className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-rose-600/10 hover:bg-rose-600/20 text-rose-400 border border-rose-500/20 hover:border-rose-500/40 rounded-xl text-sm font-semibold transition-all cursor-pointer active:scale-95 focus:ring-4 focus:outline-none focus:ring-blue-500"
          id="trigger-m3u-panel-btn"
        >
          <PlusCircle className="w-4 h-4" />
          Import Personal M3U list
        </button>
      </div>

      {/* Categories listing */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-3 block mb-3 select-none">
          Categories Selection
        </span>
        
        {/* All choice */}
        <button
          onClick={() => onSelectCategory("all")}
          className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm transition-all cursor-pointer focus:ring-4 focus:outline-none focus:ring-blue-500 ${
            selectedCategory === "all"
              ? "bg-rose-600 text-white font-bold shadow-lg shadow-rose-950/30"
              : "text-gray-400 hover:text-white hover:bg-white/5"
          }`}
          id="category-all-btn"
        >
          <div className="flex items-center gap-3">
            {getCategoryIcon("all")}
            <span>All Streams</span>
          </div>
          <span className="text-xs bg-black/40 px-2 py-0.5 rounded-md border border-white/5">
            {categories.reduce((acc, c) => acc + c.count, 0)}
          </span>
        </button>

        {/* Mapped Categories */}
        {categories.map((cat) => (
          <button
            key={cat.name}
            onClick={() => onSelectCategory(cat.name)}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm transition-all cursor-pointer focus:ring-4 focus:outline-none focus:ring-blue-500 ${
              selectedCategory === cat.name
                ? "bg-rose-600 text-white font-bold shadow-lg shadow-rose-950/30"
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
            id={`category-${cat.name.toLowerCase()}-btn`}
          >
            <div className="flex items-center gap-3">
              {getCategoryIcon(cat.name)}
              <span>{cat.name}</span>
            </div>
            <span className="text-xs bg-black/40 px-2 py-0.5 rounded-md border border-white/5">
              {cat.count}
            </span>
          </button>
        ))}
      </div>

      {/* Currently Streaming mini status box */}
      {activeChannel && (
        <div className="p-4 border-t border-white/5 bg-black/45 shadow-inner">
          <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest block mb-2 select-none">
            Active Channel Stream
          </span>
          <div className="flex items-center gap-3 p-2 bg-white/5 rounded-xl border border-white/5">
            <img 
              src={activeChannel.logo || `https://ui-avatars.com/api/?name=${encodeURIComponent(activeChannel.name)}&background=random&color=fff&size=256&bold=true`} 
              alt={activeChannel.name} 
              className="w-9 h-9 rounded-lg object-contain border border-white/10"
              onError={(e) => {
                e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(activeChannel.name)}&background=random&color=fff&size=256&bold=true`;
              }}
            />
            <div className="min-w-0 flex-1">
              <span className="block text-xs font-semibold text-white truncate">{activeChannel.name}</span>
              <span className="block text-[10px] text-emerald-400 font-medium tracking-tight mt-0.5 flex items-center gap-1 leading-none">
                <BookmarkCheck className="w-3 h-3 flex-shrink-0" />
                Buffered Online
              </span>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
