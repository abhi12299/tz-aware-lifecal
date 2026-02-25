"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { CalendarPreview } from "./components/calendar-preview";
import { InstallationModal } from "./components/installation-modal";

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#08080a] text-white">
      {/* Subtle radial gradient behind the hero */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(255,107,53,0.04)_0%,transparent_70%)]" />
      </div>

      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between px-6 sm:px-10 py-6 max-w-5xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#FF6B35]" />
          <span className="text-sm font-medium tracking-tight text-white/90">
            lifecal
          </span>
        </div>
        <a
          href="https://github.com/abhi12299/tz-aware-lifecal"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-white/30 hover:text-white/60 transition-colors"
        >
          GitHub
        </a>
      </nav>

      {/* Hero */}
      <main className="relative z-10 max-w-5xl mx-auto px-6 sm:px-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20 pt-12 sm:pt-20 pb-24">
          {/* Left text */}
          <div className="flex-1 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/6 bg-white/3 mb-8">
              <div className="w-1.5 h-1.5 rounded-full bg-[#FF6B35] animate-pulse" />
              <span className="text-xs text-white/50 font-medium">
                Timezone-aware &middot; Updates daily
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-semibold tracking-tight leading-[1.1] text-white">
              See your year
              <br />
              <span className="text-white/40">fade into view.</span>
            </h1>

            <p className="mt-6 text-base sm:text-lg text-[#999] leading-relaxed max-w-md">
              A single dot for every day. Past days light up, today glows
              orange, and the rest wait in the dark. Set it as your lock screen
              &mdash; it refreshes each morning.
            </p>

            <div className="flex flex-col sm:flex-row items-start gap-3 mt-10">
              <button
                onClick={() => setModalOpen(true)}
                className="group flex items-center gap-2.5 px-6 py-3 bg-white text-black text-sm font-medium rounded-lg hover:bg-white/90 transition-colors"
              >
                Set up wallpaper
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </button>
              <a
                href="#how-it-works"
                className="flex items-center px-6 py-3 text-sm text-white/40 hover:text-white/60 transition-colors"
              >
                How it works
              </a>
            </div>
          </div>

          {/* Right preview */}
          <div className="shrink-0">
            <CalendarPreview />
          </div>
        </div>

        {/* How it works */}
        <section id="how-it-works" className="py-20 border-t border-white/5">
          <h2 className="text-xs font-semibold text-[#888] uppercase tracking-widest mb-12">
            How it works
          </h2>

          <div className="grid sm:grid-cols-3 gap-10">
            <div>
              <div className="w-8 h-8 flex items-center justify-center text-sm font-bold text-[#FF6B35] border border-[#FF6B35]/20 rounded mb-4">
                1
              </div>
              <h3 className="text-sm font-medium text-white mb-2">
                Pick your iPhone
              </h3>
              <p className="text-sm text-[#888] leading-relaxed">
                Select your model so the wallpaper renders at the exact native
                resolution. No stretching, no cropping.
              </p>
            </div>

            <div>
              <div className="w-8 h-8 flex items-center justify-center text-sm font-bold text-[#FF6B35] border border-[#FF6B35]/20 rounded mb-4">
                2
              </div>
              <h3 className="text-sm font-medium text-white mb-2">
                Create an automation
              </h3>
              <p className="text-sm text-[#888] leading-relaxed">
                A Shortcuts automation runs once a day, fetches the latest
                calendar image, and sets it as your lock screen.
              </p>
            </div>

            <div>
              <div className="w-8 h-8 flex items-center justify-center text-sm font-bold text-[#FF6B35] border border-[#FF6B35]/20 rounded mb-4">
                3
              </div>
              <h3 className="text-sm font-medium text-white mb-2">
                Watch the dots fill in
              </h3>
              <p className="text-sm text-[#888] leading-relaxed">
                Every morning your wallpaper updates. Past days turn light,
                today glows orange. Time made tangible.
              </p>
            </div>
          </div>
        </section>

        {/* Legend */}
        <section className="py-16 border-t border-white/5">
          <div className="flex flex-wrap items-center justify-center gap-8">
            <div className="flex items-center gap-2.5">
              <div className="w-3 h-3 rounded-full bg-[#E5E5EA]" />
              <span className="text-xs text-[#888]">Days passed</span>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="w-3 h-3 rounded-full bg-[#FF6B35]" />
              <span className="text-xs text-[#888]">Today</span>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="w-3 h-3 rounded-full bg-[#48484A]" />
              <span className="text-xs text-[#888]">Days remaining</span>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-10 border-t border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#FF6B35]" />
            <span className="text-xs text-white/40">lifecal</span>
          </div>
          <p className="text-xs text-white/30">
            Time-aware. Privacy-first. No tracking.
          </p>
        </footer>
      </main>

      <InstallationModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
}
