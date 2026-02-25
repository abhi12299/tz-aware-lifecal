"use client";

import { useState, useEffect, useCallback } from "react";
import { X, Copy, Check, ChevronDown } from "lucide-react";
import { PHONE_MODELS } from "@/lib/calendar/constants";

const BASE_URL =
  typeof window !== "undefined"
    ? window.location.origin
    : "https://lifecal-virid.vercel.app";

export function InstallationModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [selectedModel, setSelectedModel] = useState("iphone_15");
  const [copied, setCopied] = useState(false);

  const model = PHONE_MODELS.find((m) => m.value === selectedModel)!;
  const wallpaperUrl = `${BASE_URL}/api/days?height=${model.height}&width=${model.width}`;

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(wallpaperUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [wallpaperUrl]);

  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div
        className="absolute inset-0 bg-black/70 modal-backdrop"
        onClick={onClose}
      />

      <div className="relative w-full max-w-lg max-h-[90vh] bg-[#0e0e11] border border-white/[0.08] sm:rounded-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4 shrink-0">
          <h2 className="text-xl font-semibold text-white tracking-tight">
            Installation Steps
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-white/40 hover:text-white hover:bg-white/[0.06] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="px-6 pb-5 text-sm text-[#777] leading-relaxed">
          First, define your wallpaper settings. Then create an automation to run
          daily. Finally, add the shortcut actions to update your lock screen.
        </p>

        {/* Content */}
        <div className="overflow-y-auto modal-scroll px-6 pb-6 space-y-5 flex-1 min-h-0">
          {/* Step 1 */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white text-black flex items-center justify-center font-bold text-sm shrink-0 rounded">
                1
              </div>
              <h3 className="text-lg font-semibold text-white">
                Define your Wallpaper
              </h3>
            </div>
            <div className="ml-11 space-y-4">
              <div>
                <label className="block text-xs font-medium text-[#666] uppercase tracking-wider mb-2">
                  iPhone Model
                </label>
                <div className="relative">
                  <select
                    value={selectedModel}
                    onChange={(e) => setSelectedModel(e.target.value)}
                    className="w-full bg-[#111114] border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-white/20 cursor-pointer pr-10"
                  >
                    {PHONE_MODELS.map((m) => (
                      <option key={m.value} value={m.value}>
                        {m.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white text-black flex items-center justify-center font-bold text-sm shrink-0 rounded">
                2
              </div>
              <h3 className="text-lg font-semibold text-white">
                Create Automation
              </h3>
            </div>
            <div className="ml-11 bg-[#111114] border border-white/10 rounded-lg p-4 space-y-2">
              <p className="text-sm text-white leading-relaxed">
                Open{" "}
                <span className="font-medium text-white">Shortcuts</span> app{" "}
                <span className="text-[#888]">&rarr;</span> Go to{" "}
                <span className="font-medium text-white">Automation</span> tab{" "}
                <span className="text-[#888]">&rarr;</span>{" "}
                <span className="font-medium text-white">New Automation</span>
              </p>
              <p className="text-sm text-white leading-relaxed">
                <span className="text-[#888]">&rarr;</span>{" "}
                <span className="font-medium text-white">Time of Day</span>{" "}
                <span className="text-[#888]">&rarr;</span>{" "}
                <span className="font-medium text-white">6:00 AM</span>{" "}
                <span className="text-[#888]">&rarr;</span> Repeat{" "}
                <span className="font-medium text-white">&quot;Daily&quot;</span>
              </p>
              <p className="text-sm text-white leading-relaxed">
                <span className="text-[#888]">&rarr;</span> Select{" "}
                <span className="font-medium text-white">
                  &quot;Run Immediately&quot;
                </span>{" "}
                <span className="text-[#888]">&rarr;</span>{" "}
                <span className="font-medium text-white">
                  &quot;Create New Shortcut&quot;
                </span>
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white text-black flex items-center justify-center font-bold text-sm shrink-0 rounded">
                3
              </div>
              <h3 className="text-lg font-semibold text-white">
                Create Shortcut
              </h3>
            </div>
            <div className="ml-11 bg-[#111114] border border-white/10 rounded-lg p-4 space-y-4">
              <p className="text-xs font-semibold text-[#666] uppercase tracking-wider">
                Add these actions:
              </p>

              <div className="space-y-3">
                {/* 3.1 */}
                <div className="flex gap-2 min-w-0">
                  <span className="text-white/50 text-sm shrink-0 tabular-nums">
                    3.1
                  </span>
                  <div className="text-sm text-white min-w-0 flex-1">
                    <p>
                      <span className="font-medium">
                        &quot;Get Contents of URL&quot;
                      </span>
                      <span className="text-[#888]">
                        {" "}
                        &rarr; paste the following URL there:
                      </span>
                    </p>
                    <div className="flex gap-2 mt-2 min-w-0">
                      <div className="flex-1 min-w-0 bg-[#0A0A0D] border border-white/10 rounded px-3 py-2 text-xs font-mono truncate text-[#888] select-all overflow-hidden">
                        {wallpaperUrl}
                      </div>
                      <button
                        onClick={handleCopy}
                        className="shrink-0 h-[34px] w-[34px] flex items-center justify-center border border-white/10 rounded bg-transparent hover:bg-white hover:text-black text-white/60 transition-all"
                      >
                        {copied ? (
                          <Check className="w-3.5 h-3.5" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* 3.2 */}
                <div className="flex gap-2">
                  <span className="text-white/50 text-sm tabular-nums">
                    3.2
                  </span>
                  <p className="text-sm text-white">
                    <span className="font-medium">
                      &quot;Set Wallpaper Photo&quot;
                    </span>
                    <span className="text-[#888]">
                      {" "}
                      &rarr; choose &quot;Lock Screen&quot;
                    </span>
                  </p>
                </div>
              </div>

              {/* Important note */}
              <div className="bg-[#1A1508] border border-[#3D3000] rounded p-3 -mx-4 -mb-4 rounded-t-none">
                <p className="text-sm text-[#C4A000]">
                  <strong>Important:</strong> In &quot;Set Wallpaper Photo&quot;,
                  tap the arrow (&rarr;) to show options &rarr; disable both{" "}
                  <strong>&quot;Crop to Subject&quot;</strong> and{" "}
                  <strong>&quot;Show Preview&quot;</strong>
                </p>
                <p className="text-xs text-[#8B7500] mt-1">
                  This prevents iOS from cropping and asking for confirmation
                  each time
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
