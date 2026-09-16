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

  // Determine active base path:
  // 1. Build-time environment variable (e.g. '/afterwork-1')
  // 2. Client-side runtime detection (if page is running under a subfolder like /afterwork-1/)
  let base = BASE_PATH;
  if (!base && typeof window !== "undefined") {
    const pathname = window.location.pathname;
    if (pathname.startsWith("/afterwork-1")) {
      base = "/afterwork-1";
    }
  }

  const cleanPath = path.startsWith("/") ? path : `/${path}`;

  // If basePath is already present in path, avoid double prefixing
  if (base && cleanPath.startsWith(base)) {
    return cleanPath;
  }

  return `${base}${cleanPath}`;
}

export function getHomeUrl(): string {
  return "/";
}

