import { BlockMapType } from "react-notion";
import { SITE_CONFIG } from "./config";

export async function getNotionPage(pageId: string): Promise<BlockMapType> {
  const res = await fetch(`${SITE_CONFIG.apiUrl}/${pageId}`);
  const raw = await res.json();
  return normalizeBlockMap(raw);
}

// The upstream Notion proxy now wraps each block as { spaceId, value: { value: <block> } }.
// react-notion expects the flat { value: <block> } shape — unwrap to keep rendering working.
function normalizeBlockMap(raw: any): BlockMapType {
  if (!raw || typeof raw !== "object") return raw;
  const out: any = {};
  for (const id of Object.keys(raw)) {
    const entry = raw[id];
    if (entry && entry.value && entry.value.value) {
      out[id] = { ...entry, value: entry.value.value };
      delete out[id].spaceId;
    } else {
      out[id] = entry;
    }
  }
  return out;
}

export function getPageTitle(blockMap: BlockMapType): string {
  if (!blockMap || Object.keys(blockMap).length === 0) {
    return SITE_CONFIG.name;
  }
  const firstBlock = blockMap[Object.keys(blockMap)[0]];
  return firstBlock?.value?.properties?.title?.[0]?.[0] || SITE_CONFIG.name;
}
