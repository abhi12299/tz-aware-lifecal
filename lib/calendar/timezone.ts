function isValidTimezone(tz: string): boolean {
  try {
    Intl.DateTimeFormat("en-US", { timeZone: tz });
    return true;
  } catch {
    return false;
  }
}

export function resolveTimezone(
  request: Request,
  tzParam?: string | null,
): string {
  const ipTz = request.headers.get("x-vercel-ip-timezone");
  if (ipTz && isValidTimezone(ipTz)) return ipTz;

  if (tzParam && isValidTimezone(tzParam)) return tzParam;

  return Intl.DateTimeFormat().resolvedOptions().timeZone;
}
