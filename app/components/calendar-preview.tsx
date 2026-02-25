"use client";

import { COLORS, COLUMNS } from "@/lib/calendar/constants";

function getDayOfYear(): number {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 1);
  return Math.floor((now.getTime() - start.getTime()) / 86400000) + 1;
}

function getDaysInYear(): number {
  const year = new Date().getFullYear();
  return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0) ? 366 : 365;
}

export function CalendarPreview() {
  const dayOfYear = getDayOfYear();
  const daysInYear = getDaysInYear();
  const remainingDays = daysInYear - dayOfYear;
  const percent = Math.round((dayOfYear / daysInYear) * 100);

  return (
    <div className="relative w-[220px] mx-auto">
      {/* Phone frame — iPhone-like 1:2.17 aspect ratio */}
      <div
        className="relative bg-[#1C1C1E] rounded-[2.5rem] p-2.5 shadow-[0_0_80px_rgba(255,107,53,0.06)]"
        style={{ aspectRatio: "1 / 2.17" }}
      >
        <div className="rounded-[2rem] overflow-hidden bg-[#1C1C1E] h-full flex flex-col justify-center px-2.5">
          {/* Dot grid */}
          <div
            className="grid gap-[2px] mx-auto w-full"
            style={{
              gridTemplateColumns: `repeat(${COLUMNS}, 1fr)`,
            }}
          >
            {Array.from({ length: daysInYear }, (_, i) => {
              const day = i + 1;
              const color =
                day < dayOfYear
                  ? COLORS.past
                  : day === dayOfYear
                    ? COLORS.today
                    : COLORS.future;
              return (
                <div
                  key={day}
                  className="aspect-square rounded-full"
                  style={{ backgroundColor: color }}
                />
              );
            })}
          </div>

          {/* Bottom text */}
          <div className="flex items-center justify-center gap-1.5 mt-3 text-[9px] font-mono">
            <span style={{ color: COLORS.today }}>{remainingDays}d left</span>
            <span style={{ color: COLORS.text }}>&middot; {percent}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
