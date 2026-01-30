import { BlockMapType } from "react-notion";
import { SITE_CONFIG } from "./config";

export async function getNotionPage(pageId: string): Promise<BlockMapType> {
  const res = await fetch(`${SITE_CONFIG.apiUrl}/${pageId}`);
  return res.json();
}

export function getPageTitle(blockMap: BlockMapType): string {
  if (!blockMap || Object.keys(blockMap).length === 0) {
    return SITE_CONFIG.name;
  }
  const firstBlock = blockMap[Object.keys(blockMap)[0]];
  return firstBlock?.value?.properties?.title?.[0]?.[0] || SITE_CONFIG.name;
}
