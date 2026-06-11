import { Channel } from "../types";

/**
 * Automatically assigns a category based on the channel name and existing group metadata
 */
export function getAutoCategory(name: string, groupTitle?: string): string {
  if (groupTitle) {
    const gt = groupTitle.trim();
    if (gt.toLowerCase().includes("news")) return "News";
    if (gt.toLowerCase().includes("movie") || gt.toLowerCase().includes("cinema") || gt.toLowerCase().includes("action") || gt.toLowerCase().includes("drama") || gt.toLowerCase().includes("film")) return "Movies";
    if (gt.toLowerCase().includes("kid") || gt.toLowerCase().includes("cartoon") || gt.toLowerCase().includes("pogo") || gt.toLowerCase().includes("pbs") || gt.toLowerCase().includes("baby")) return "Kids";
    if (gt.toLowerCase().includes("sport") || gt.toLowerCase().includes("live24") || gt.toLowerCase().includes("arena")) return "Sports";
    if (gt.toLowerCase().includes("music") || gt.toLowerCase().includes("song") || gt.toLowerCase().includes("vevo") || gt.toLowerCase().includes("hit")) return "Music";
    if (gt.toLowerCase().includes("bangla") || gt.toLowerCase().includes("bengal")) return "Bangla";
    return gt.charAt(0).toUpperCase() + gt.slice(1);
  }

  const normalized = name.toLowerCase();

  // Automatic heuristic grouping based on name keywords
  if (
    normalized.includes("news") ||
    normalized.includes("khabar") ||
    normalized.includes("times") ||
    normalized.includes("today") ||
    normalized.includes("jazeera") ||
    normalized.includes("dw") ||
    normalized.includes("abc") ||
    normalized.includes("cnn") ||
    normalized.includes("republic") ||
    normalized.includes("ndtv") ||
    normalized.includes("weather") ||
    normalized.includes("bloomberg") ||
    normalized.includes("journal") ||
    normalized.includes("al-jazeera") ||
    normalized.includes("nagorik") ||
    normalized.includes("somoy") ||
    normalized.includes("ekattor") ||
    normalized.includes("atn news") ||
    normalized.includes("national")
  ) {
    return "News";
  }

  if (
    normalized.includes("movie") ||
    normalized.includes("film") ||
    normalized.includes("cinema") ||
    normalized.includes("goldmines") ||
    normalized.includes("hbo") ||
    normalized.includes("action") ||
    normalized.includes("jalsha") ||
    normalized.includes("anmol") ||
    normalized.includes("b4u") ||
    normalized.includes("classic") ||
    normalized.includes("screem") ||
    normalized.includes("crime") ||
    normalized.includes("thriller") ||
    normalized.includes("stories") ||
    normalized.includes("detective") ||
    normalized.includes("star movies")
  ) {
    return "Movies";
  }

  if (
    normalized.includes("kid") ||
    normalized.includes("cartoon") ||
    normalized.includes("pogo") ||
    normalized.includes("toons") ||
    normalized.includes("doraemon") ||
    normalized.includes("gopal") ||
    normalized.includes("motu") ||
    normalized.includes("cbeebies") ||
    normalized.includes("toddler") ||
    normalized.includes("baby") ||
    normalized.includes("nick") ||
    normalized.includes("hungama") ||
    normalized.includes("sonic") ||
    normalized.includes("yay") ||
    normalized.includes("shark") ||
    normalized.includes("jerry") ||
    normalized.includes("zoo") ||
    normalized.includes("buddystar") ||
    normalized.includes("jungle")
  ) {
    return "Kids";
  }

  if (
    normalized.includes("sport") ||
    normalized.includes("live24") ||
    normalized.includes("game") ||
    normalized.includes("football") ||
    normalized.includes("match") ||
    normalized.includes("athletic") ||
    normalized.includes("stadium")
  ) {
    return "Sports";
  }

  if (
    normalized.includes("music") ||
    normalized.includes("song") ||
    normalized.includes("hits") ||
    normalized.includes("sing") ||
    normalized.includes("9x") ||
    normalized.includes("vevo") ||
    normalized.includes("dhoom") ||
    normalized.includes("dj") ||
    normalized.includes("beats") ||
    normalized.includes("yrf") ||
    normalized.includes("bollyraga") ||
    normalized.includes("sangeet")
  ) {
    return "Music";
  }

  if (
    normalized.includes("bangla") ||
    normalized.includes("boishakhi") ||
    normalized.includes("sangsad") ||
    normalized.includes("ntv") ||
    normalized.includes("ekushey") ||
    normalized.includes("kolkata") ||
    normalized.includes("aath") ||
    normalized.includes("bengal") ||
    normalized.includes("deshi") ||
    normalized.includes("deepto") ||
    normalized.includes("jago")
  ) {
    return "Bangla";
  }

  return "Entertainment";
}

/**
 * Returns a high-quality fallback category image
 */
export function getFallbackLogo(category: string): string {
  switch (category) {
    case "News":
      return "https://images.unsplash.com/photo-1495020689067-958852a6565d?w=150&q=80";
    case "Movies":
      return "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=150&q=80";
    case "Kids":
      return "https://images.unsplash.com/photo-1482440308425-276ad0f28b19?w=150&q=80";
    case "Sports":
      return "https://images.unsplash.com/photo-1508847154043-be12a62861c1?w=150&q=80";
    case "Music":
      return "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=150&q=80";
    case "Bangla":
      return "https://images.unsplash.com/photo-1598257006458-087169a1f08d?w=150&q=80";
    default:
      return "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=150&q=80";
  }
}

/**
 * Smart automatic logo finder with dictionary matching popular channels
 * and elegant text-to-graphics fallback (Method A & B)
 */
export function getSmartLogo(name: string, category: string): string {
  const norm = name.toLowerCase().trim();

  // Dictionary mapping for popular channels
  const dictionary: Record<string, string> = {
    "boishakhi": "https://upload.wikimedia.org/wikipedia/commons/d/df/Boishakhi_Television_logo.png",
    "omtv tamil": "https://upload.wikimedia.org/wikipedia/commons/d/d3/TV9_Logo.png",
    "ananda tv": "https://seeklogo.com/images/A/ananda-tv-logo-FB14D7FE1B-seeklogo.com.png",
    "g-series": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/G-Series_logo.jpg/220px-G-Series_logo.jpg",
    "jalsha movies": "https://upload.wikimedia.org/wikipedia/en/9/91/Jalsha_Movies_logo.png",
    "aakash aath": "https://upload.wikimedia.org/wikipedia/en/a/ad/Aakash_Aath.png",
    "jamuna tv": "https://upload.wikimedia.org/wikipedia/commons/e/e9/Jamuna_TV_Logo.png",
    "somoy tv": "https://upload.wikimedia.org/wikipedia/commons/2/2f/Somoy_TV_logo.png",
    "channel 24": "https://upload.wikimedia.org/wikipedia/commons/6/6f/Channel_24_Logo.png",
    "independent tv": "https://upload.wikimedia.org/wikipedia/commons/1/1d/Independent_Television_logo.png",
    "independent": "https://upload.wikimedia.org/wikipedia/commons/1/1d/Independent_Television_logo.png",
    "ekattor tv": "https://upload.wikimedia.org/wikipedia/commons/7/7b/Ekattor_TV_Logo.png",
    "atn news": "https://upload.wikimedia.org/wikipedia/commons/8/87/ATN_News_logo.png",
    "news 24": "https://upload.wikimedia.org/wikipedia/commons/a/af/News_24_logo.png",
    "btv": "https://upload.wikimedia.org/wikipedia/commons/d/df/Bangladesh_Television_logo.png",
    "star news": "https://upload.wikimedia.org/wikipedia/commons/2/28/Star_News_Europe.png",
    "deepto tv hd": "https://upload.wikimedia.org/wikipedia/commons/3/30/Deepto_tv_logo.png",
    "deepto tv": "https://upload.wikimedia.org/wikipedia/commons/3/30/Deepto_tv_logo.png",
    "sangsad tv": "https://upload.wikimedia.org/wikipedia/commons/f/ff/Sangsad_Television_logo.png",
    "sangsad": "https://upload.wikimedia.org/wikipedia/commons/f/ff/Sangsad_Television_logo.png",
    "bangla vision": "https://upload.wikimedia.org/wikipedia/commons/0/07/Banglavision_logo.png",
    "banglavision": "https://upload.wikimedia.org/wikipedia/commons/0/07/Banglavision_logo.png",
    "ntv": "https://upload.wikimedia.org/wikipedia/commons/c/cc/NTV_BD_Logo.png",
    "ntv uk": "https://upload.wikimedia.org/wikipedia/commons/c/cc/NTV_BD_Logo.png",
    "sa tv": "https://upload.wikimedia.org/wikipedia/commons/c/cb/SATV_Logo.png",
    "al-jazeera": "https://upload.wikimedia.org/wikipedia/commons/f/f2/Al_jazeera_red_logo.png",
    "al jazeera": "https://upload.wikimedia.org/wikipedia/commons/f/f2/Al_jazeera_red_logo.png",
    "maasranga tv": "https://upload.wikimedia.org/wikipedia/commons/a/ab/Maasranga_TV_Logo.png",
    "maasranga": "https://upload.wikimedia.org/wikipedia/commons/a/ab/Maasranga_TV_Logo.png",
    "channel i": "https://upload.wikimedia.org/wikipedia/commons/e/eb/Channel_i_logo.png",
    "islamic tv": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Bangladesh_Television_logo.png/120px-Bangladesh_Television_logo.png",
    "dbc news": "https://upload.wikimedia.org/wikipedia/commons/0/0f/DBC_News_Logo.png",
    "channel 9": "https://upload.wikimedia.org/wikipedia/commons/d/d4/Channel_9_Bangladesh_Logo.png",
    "ekushey tv": "https://upload.wikimedia.org/wikipedia/commons/9/91/Ekushey_Television-Logo.png",
    "ekushey": "https://upload.wikimedia.org/wikipedia/commons/9/91/Ekushey_Television-Logo.png",
    "kolkata tv": "https://upload.wikimedia.org/wikipedia/commons/1/18/Kolkata_TV_Logo.png",
    "tv9 bangla": "https://upload.wikimedia.org/wikipedia/commons/d/d3/TV9_Logo.png",
    "r bangla": "https://upload.wikimedia.org/wikipedia/commons/b/b3/Republic_Bangla_logo.png",
    "republic bangla": "https://upload.wikimedia.org/wikipedia/commons/b/b3/Republic_Bangla_logo.png",
    "abp ananda": "https://upload.wikimedia.org/wikipedia/commons/f/fe/ABP_Ananda_logo.png",
    "zee 24 ghanta": "https://upload.wikimedia.org/wikipedia/commons/1/17/Zee_24_Ghanta_Logo.png",
    "zee anmol": "https://upload.wikimedia.org/wikipedia/commons/e/ee/Zee_Anmol_logo.png",
    "zee anmol tv": "https://upload.wikimedia.org/wikipedia/commons/e/ee/Zee_Anmol_logo.png",
    "zee anmol cinema": "https://upload.wikimedia.org/wikipedia/commons/e/ee/Zee_Anmol_logo.png",
    "zee news": "https://upload.wikimedia.org/wikipedia/commons/2/21/Zee_News_Logo.png",
    "zee business": "https://upload.wikimedia.org/wikipedia/commons/b/b0/Zee_Business.png",
    "cartoon network": "https://upload.wikimedia.org/wikipedia/commons/8/80/Cartoon_Network_2011_logo.png",
    "cartoon network hd": "https://upload.wikimedia.org/wikipedia/commons/8/80/Cartoon_Network_2011_logo.png",
    "cartoon network sd": "https://upload.wikimedia.org/wikipedia/commons/8/80/Cartoon_Network_2011_logo.png",
    "pogo": "https://upload.wikimedia.org/wikipedia/commons/d/da/Pogo_asia_logo.png",
    "pogo sd": "https://upload.wikimedia.org/wikipedia/commons/d/da/Pogo_asia_logo.png",
    "discovery kids": "https://upload.wikimedia.org/wikipedia/commons/e/e0/Discovery_Kids_2016_logo.svg.png",
    "duranta tv": "https://upload.wikimedia.org/wikipedia/commons/5/50/Duranta_TV_logo.png",
    "hungama": "https://upload.wikimedia.org/wikipedia/en/1/10/Hungama_TV_Logo.png",
    "nick": "https://upload.wikimedia.org/wikipedia/commons/c/c9/Nickelodeon_2023_logo.png",
    "nick jr": "https://upload.wikimedia.org/wikipedia/commons/4/4e/Nickelodeon_Junior_logo_2023.png",
    "sonic": "https://upload.wikimedia.org/wikipedia/en/9/9f/Nickelodeon_Sonic_logo.png",
    "sony yay": "https://upload.wikimedia.org/wikipedia/en/2/29/Sony_YAY%21_Logo.png",
    "sony yay vip": "https://upload.wikimedia.org/wikipedia/en/2/29/Sony_YAY%21_Logo.png",
    "bal bharat": "https://upload.wikimedia.org/wikipedia/en/thumb/e/ef/Sony_YAY%21_Logo.png/220px-Sony_YAY%21_Logo.png",
    "sky news": "https://upload.wikimedia.org/wikipedia/commons/c/cd/Sky_News_logo_2022.svg.png",
    "cnn": "https://upload.wikimedia.org/wikipedia/commons/b/b1/CNN.svg.png",
    "dw": "https://upload.wikimedia.org/wikipedia/commons/5/5c/Deutsche_Welle_logo_2012.svg.png",
    "dw news": "https://upload.wikimedia.org/wikipedia/commons/5/5c/Deutsche_Welle_logo_2012.svg.png",
    "france 24": "https://upload.wikimedia.org/wikipedia/commons/d/d9/France_24_Logo.png",
    "france 24 english": "https://upload.wikimedia.org/wikipedia/commons/d/d9/France_24_Logo.png",
    "bloomberg": "https://upload.wikimedia.org/wikipedia/commons/c/cb/Bloomberg_logo.svg.png",
    "bloomberg tv": "https://upload.wikimedia.org/wikipedia/commons/c/cb/Bloomberg_logo.svg.png",
    "cnbc": "https://upload.wikimedia.org/wikipedia/commons/e/e3/CNBC_logo.svg.png",
    "abc news": "https://upload.wikimedia.org/wikipedia/commons/c/ca/ABC_News_logo_2021.svg.png",
    "fox news": "https://upload.wikimedia.org/wikipedia/commons/6/67/Fox_News_Channel_logo.svg.png",
    "nhk world": "https://upload.wikimedia.org/wikipedia/commons/8/8f/NHK_World_logo.svg.png",
    "discovery": "https://upload.wikimedia.org/wikipedia/commons/a/ac/Discovery_Channel_Logo_2019.png",
    "discovery hd": "https://upload.wikimedia.org/wikipedia/commons/a/ac/Discovery_Channel_Logo_2019.png",
    "discovery bangla": "https://upload.wikimedia.org/wikipedia/commons/a/ac/Discovery_Channel_Logo_2019.png",
    "animal planet hd": "https://upload.wikimedia.org/wikipedia/commons/2/2c/Animal_Planet_2018.svg.png",
    "national geographic": "https://upload.wikimedia.org/wikipedia/commons/a/aa/National_Geographic_Corporate_Logo.png",
    "nat geo hd": "https://upload.wikimedia.org/wikipedia/commons/a/aa/National_Geographic_Corporate_Logo.png",
    "star movies": "https://upload.wikimedia.org/wikipedia/commons/0/07/Star_Movies_Asia_2017.png",
  };

  // Direct exact match
  if (dictionary[norm]) return dictionary[norm];

  // Try substring matching
  for (const [key, val] of Object.entries(dictionary)) {
    if (norm.includes(key)) return val;
  }

  // Fallback to Category default or elegant UI Avatars (Method B)
  const colors = ["24408e", "f43f5e", "10b981", "f59e0b", "8b5cf6", "ec4899", "3b82f6"];
  const charSum = Array.from(name).reduce((sum, c) => sum + c.charCodeAt(0), 0);
  const color = colors[charSum % colors.length];

  const cleanName = encodeURIComponent(
    name
      .replace(/[^a-zA-Z0-9\s]/g, "")
      .trim()
      .split(" ")
      .slice(0, 2)
      .join(" ")
  );

  return `https://ui-avatars.com/api/?name=${cleanName || "TV"}&background=${color}&color=ffffff&size=256&bold=true&font-size=0.35&semibold=true`;
}

/**
 * Parses raw M3U text content and formats it into standard Channel JSON array
 */
export function parseM3u(rawText: string, categoryOverride?: string): Channel[] {
  const lines = rawText.split("\n");
  const channels: Channel[] = [];
  let currentMetadata: { name: string; logo: string; groupTitle: string } | null = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    if (line.startsWith("#EXTINF:")) {
      // Parse main info line
      // Format: #EXTINF:-1 tvg-logo="url" group-title="category",Channel Name
      const logoMatch = line.match(/tvg-logo="([^"]+)"/) || line.match(/logo="([^"]+)"/);
      const groupMatch = line.match(/group-title="([^"]+)"/) || line.match(/category="([^"]+)"/);

      // Channel name is after the last comma
      const commaIndex = line.lastIndexOf(",");
      let name = "Unknown Channel";
      if (commaIndex !== -1) {
        name = line.substring(commaIndex + 1).trim();
      } else {
        // Fallback if no comma but has something else
        const parts = line.split(" ");
        const lastPart = parts[parts.length - 1];
        if (lastPart && !lastPart.includes("=")) {
          name = lastPart.trim();
        }
      }

      currentMetadata = {
        name: name || "Unknown Channel",
        logo: logoMatch ? logoMatch[1] : "",
        groupTitle: groupMatch ? groupMatch[1] : ""
      };
    } else if (line.startsWith("http://") || line.startsWith("https://")) {
      if (currentMetadata) {
        const category = categoryOverride || getAutoCategory(currentMetadata.name, currentMetadata.groupTitle);
        const logo = currentMetadata.logo && currentMetadata.logo.trim().startsWith("http")
          ? currentMetadata.logo.trim()
          : `https://ui-avatars.com/api/?name=${encodeURIComponent(currentMetadata.name)}&background=random&color=fff&size=256&bold=true`;

        channels.push({
          id: `${currentMetadata.name.toLowerCase().replace(/[^a-z0-9]/g, "-")}-${channels.length}-${Math.random().toString(36).substr(2, 5)}`,
          name: currentMetadata.name,
          url: line,
          category,
          logo
        });
        currentMetadata = null;
      } else {
        // standalone URL with no metadata preceding it handles gracefully
        const name = `Channel ${channels.length + 1}`;
        const category = categoryOverride || getAutoCategory(name);
        const logo = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&color=fff&size=256&bold=true`;
        channels.push({
          id: `channel-raw-${channels.length}-${Math.random().toString(36).substr(2, 5)}`,
          name,
          url: line,
          category,
          logo
        });
      }
    }
  }

  return channels;
}

/**
 * Automates content fetching from a remote server/url in client side, or proxies it.
 * Highly useful for dynamic playlists parsing dynamically.
 */
export async function fetchAndParseM3u(url: string, useProxy = true): Promise<Channel[]> {
  try {
    // If we're parsing live urls, they might throw mixed content/CORS on basic browsers. 
    // We offer a direct fetch fallbacked by a public open proxy when needed.
    const targetUrl = useProxy 
      ? `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}` 
      : url;

    const response = await fetch(targetUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch remote playlist. Status: ${response.status}`);
    }
    const text = await response.text();
    return parseM3u(text);
  } catch (error) {
    console.error("Error fetching or parsing remote M3U:", error);
    // Try without proxy as fallback if first attempt failed and proxy was true
    if (useProxy) {
      return fetchAndParseM3u(url, false);
    }
    throw error;
  }
}
