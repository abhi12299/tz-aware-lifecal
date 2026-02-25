import { ImageResponse } from "next/og";
import { COLORS, COLUMNS } from "@/lib/calendar/constants";
import { resolveTimezone } from "@/lib/calendar/timezone";

function getDayOfYear(dateStr: string): number {
  const [year, month, day] = dateStr.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  const start = new Date(year, 0, 1);
  return Math.floor((date.getTime() - start.getTime()) / 86400000) + 1;
}

function getDaysInYear(year: number): number {
  return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0) ? 366 : 365;
}

function colorForDay(day: number, dayOfYear: number): string {
  if (day < dayOfYear) return COLORS.past;
  if (day === dayOfYear) return COLORS.today;
  return COLORS.future;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const widthStr = searchParams.get("width");
  const heightStr = searchParams.get("height");
  const tzParam = searchParams.get("tz");

  if (!widthStr || !heightStr) {
    return Response.json(
      { error: "width and height query parameters are required" },
      { status: 400 },
    );
  }

  const width = Number.parseInt(widthStr, 10);
  const height = Number.parseInt(heightStr, 10);

  if (
    !Number.isFinite(width) ||
    !Number.isFinite(height) ||
    width <= 0 ||
    height <= 0 ||
    width > 3000 ||
    height > 3000
  ) {
    return Response.json(
      { error: "width and height must be positive integers up to 3000" },
      { status: 400 },
    );
  }

  const timezone = resolveTimezone(request, tzParam);

  console.log(`[days] tz=${timezone} tzParam=${tzParam} width=${width} height=${height}`);

  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: timezone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const localDateStr = formatter.format(new Date());
  const year = Number.parseInt(localDateStr.split("-")[0], 10);
  const dayOfYear = getDayOfYear(localDateStr);
  const daysInYear = getDaysInYear(year);
  const remainingDays = daysInYear - dayOfYear;
  const percent = Math.round((dayOfYear / daysInYear) * 100);

  const rows = Math.ceil(daysInYear / COLUMNS);
  const padX = Math.round(width * 0.06);
  const padTop = Math.round(height * 0.30);
  const padBottom = Math.round(height * 0.14);
  const gridW = width - 2 * padX;
  const gridH = height - padTop - padBottom;
  const cellW = gridW / COLUMNS;
  const cellH = gridH / rows;
  const cellSize = Math.min(cellW, cellH);
  const diameter = Math.round(cellSize * 0.78);
  const gap = Math.round(cellSize - diameter);
  const totalGridW = COLUMNS * diameter + (COLUMNS - 1) * gap;
  const totalGridH = rows * diameter + (rows - 1) * gap;
  const offsetX = padX + Math.round((gridW - totalGridW) / 2);
  const offsetY = padTop + Math.round((gridH - totalGridH) / 2);
  const fontSize = Math.round(width * 0.03);

  const days = Array.from({ length: daysInYear }, (_, i) => i + 1);

  return new ImageResponse(
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        backgroundColor: COLORS.background,
        position: "relative",
      }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          position: "absolute",
          left: offsetX,
          top: offsetY,
          width: totalGridW,
          gap: gap,
        }}
      >
        {days.map((day) => (
          <div
            key={day}
            style={{
              width: diameter,
              height: diameter,
              borderRadius: "50%",
              backgroundColor: colorForDay(day, dayOfYear),
            }}
          />
        ))}
      </div>
      <div
        style={{
          display: "flex",
          position: "absolute",
          bottom: Math.round(padBottom * 0.45),
          left: 0,
          width: "100%",
          justifyContent: "center",
          color: COLORS.text,
          fontSize: fontSize,
          fontFamily: "sans-serif",
        }}
      >
        <span style={{ color: COLORS.today }}>{remainingDays}d left&nbsp;</span>
        <span style={{ color: COLORS.text }}>&nbsp;&middot; {percent}%</span>
      </div>
    </div>,
    {
      width,
      height,
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=1800",
      },
    },
  );
}
