/**
 * Asset Path Utility
 * Ensures assets resolve correctly both on localhost (root '/')
 * and on production subpaths (e.g. '/afterwork-1/').
 */

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

export function getAssetPath(path: string | undefined | null): string {
  if (!path) return "";
  
  // Return untouched if already an external or protocol-relative URL or data URI
  if (
    path.startsWith("http://") ||
    path.startsWith("https://") ||
    path.startsWith("//") ||
    path.startsWith("data:")
  ) {
    return path;
  }

  // If basePath is already present in path, avoid double prefixing
  if (BASE_PATH && path.startsWith(BASE_PATH)) {
    return path;
  }

  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${BASE_PATH}${cleanPath}`;
}
