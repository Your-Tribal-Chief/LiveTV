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
 * Parses raw M3U text content and formats it into standard Channel JSON array
 */
export function parseM3u(rawText: string): Channel[] {
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
      }

      currentMetadata = {
        name,
        logo: logoMatch ? logoMatch[1] : "",
        groupTitle: groupMatch ? groupMatch[1] : ""
      };
    } else if (line.startsWith("http://") || line.startsWith("https://")) {
      if (currentMetadata) {
        const category = getAutoCategory(currentMetadata.name, currentMetadata.groupTitle);
        const logo = currentMetadata.logo || getFallbackLogo(category);

        channels.push({
          id: `${currentMetadata.name.toLowerCase().replace(/[^a-z0-9]/g, "-")}-${channels.length}`,
          name: currentMetadata.name,
          url: line,
          category,
          logo
        });
        currentMetadata = null;
      } else {
        // standalone URL with no metadata preceding it handles gracefully
        const name = `Channel ${channels.length + 1}`;
        const category = getAutoCategory(name);
        const logo = getFallbackLogo(category);
        channels.push({
          id: `channel-raw-${channels.length}`,
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
