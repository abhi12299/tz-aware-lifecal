# [lifecal](https://tz-aware-lifecal.vercel.app/)

A timezone-aware year progress calendar that generates dynamic iPhone wallpapers. Every day, a dot fills in — past days turn light, today glows orange, and the rest wait in the dark. Set it as your lock screen and it refreshes each morning via iOS Shortcuts.

## How it works

1. Pick your iPhone model so the wallpaper renders at native resolution
2. Create a daily automation in the iOS Shortcuts app
3. The automation fetches a fresh calendar image from the API and sets it as your lock screen

## API

`GET /api/days?width=1179&height=2556`

| Parameter | Required | Description |
|-----------|----------|-------------|
| `width` | Yes | Image width in pixels (1–3000) |
| `height` | Yes | Image height in pixels (1–3000) |
| `tz` | No | IANA timezone (e.g. `America/New_York`). Auto-detected via Vercel headers or falls back to server timezone |

Returns a dynamically generated image with colored dots for each day of the year.

## Getting started

```bash
# Install dependencies
pnpm install

# Run dev server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

## Tech stack

- Next.js 16 (App Router)
- Tailwind CSS v4
- `next/og` ImageResponse for dynamic image generation
- Biome for linting/formatting
