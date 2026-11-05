import React from 'react';
import { Volume2, VolumeX, Calendar, Sparkles } from 'lucide-react';

interface NavigationProps {
  isAudioPlaying: boolean;
  onToggleAudio: () => void;
  onOpenBooking: () => void;
  onOpenTechModal: () => void;
  activeChapterIndex: number;
}

export const Navigation: React.FC<NavigationProps> = ({
  isAudioPlaying,
  onToggleAudio,
  onOpenBooking,
  onOpenTechModal,
  activeChapterIndex,
}) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between gap-2 md:gap-8 px-3.5 md:px-12 py-3 md:py-5 bg-gradient-to-b from-black/85 via-black/50 to-transparent backdrop-blur-[2px] transition-all duration-300">
      {/* Zone 1: Wordmark */}
      <div className="flex items-center gap-1.5 md:gap-3 shrink-0">
        <a
          href="#arrival"
          className="group flex flex-col text-left transition-opacity hover:opacity-90"
        >
          <div className="flex items-center gap-1.5 md:gap-2">
            <span className="w-1.5 h-1.5 bg-amber-400/80 rounded-full inline-block"></span>
            <span className="font-serif text-base sm:text-lg md:text-2xl tracking-[0.15em] md:tracking-[0.18em] uppercase text-white font-medium">
              Aunkar Singh
            </span>
          </div>
          <span className="text-[8.5px] md:text-[10px] tracking-[0.2em] md:tracking-[0.25em] uppercase text-stone-400 font-light pl-2 md:pl-3.5">
            Palace & Haveli · Jaisalmer
          </span>
        </a>
      </div>

      {/* Zone 2: Navigation Links (Single-line, clean typography) */}
      <nav className="hidden lg:flex items-center gap-8 text-xs tracking-[0.2em] uppercase text-stone-300 font-medium">
        <a
          href="#arrival"
          className={`hover:text-amber-300 transition-colors whitespace-nowrap shrink-0 ${
            activeChapterIndex === 0 ? 'text-amber-300 font-semibold' : ''
          }`}
        >
          The Arrival
        </a>
        <a
          href="#chapters"
          className="hover:text-amber-300 transition-colors whitespace-nowrap shrink-0"
        >
          Resort Chapters
        </a>
        <a
          href="#suites"
          className="hover:text-amber-300 transition-colors whitespace-nowrap shrink-0"
        >
          Suites & Haveli
        </a>
        <a
          href="#dining"
          className="hover:text-amber-300 transition-colors whitespace-nowrap shrink-0"
        >
          Royal Dining
        </a>
        <button
          onClick={onOpenTechModal}
          className="hover:text-amber-300 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 text-stone-400 cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>How It Works</span>
        </button>
      </nav>

      {/* Zone 3: Audio toggle & Primary Action */}
      <div className="flex items-center gap-2 md:gap-4 shrink-0">
        {/* Sound toggle button styled faithfully like the reference */}
        <button
          onClick={onToggleAudio}
          className="flex items-center gap-1.5 md:gap-2.5 px-2.5 md:px-3.5 py-1.5 rounded-full border border-stone-700/80 bg-stone-900/70 hover:bg-stone-850 hover:border-amber-500/50 text-stone-200 transition-all text-xs tracking-wider cursor-pointer backdrop-blur-sm"
          aria-label={isAudioPlaying ? 'Mute ambient sound' : 'Unmute ambient sound'}
        >
          {isAudioPlaying ? (
            <>
              <div className="flex items-center gap-0.5 h-3">
                <span className="w-0.5 bg-amber-400 rounded-full animate-[pulse_0.7s_infinite_ease-in-out] h-3"></span>
                <span className="w-0.5 bg-amber-400 rounded-full animate-[pulse_0.9s_infinite_ease-in-out_0.2s] h-2"></span>
                <span className="w-0.5 bg-amber-400 rounded-full animate-[pulse_0.6s_infinite_ease-in-out_0.4s] h-3.5"></span>
                <span className="w-0.5 bg-amber-400 rounded-full animate-[pulse_0.8s_infinite_ease-in-out_0.1s] h-1.5"></span>
              </div>
              <span className="text-[10px] md:text-[11px] font-medium tracking-[0.15em] text-amber-300">
                SOUND ON
              </span>
            </>
          ) : (
            <>
              <VolumeX className="w-3 md:w-3.5 h-3 md:h-3.5 text-stone-400" />
              <span className="text-[10px] md:text-[11px] font-medium tracking-[0.15em] text-stone-400">
                SOUND OFF
              </span>
            </>
          )}
        </button>

        {/* Primary Booking CTA */}
        <button
          onClick={onOpenBooking}
          className="flex items-center gap-1.5 md:gap-2 px-3 md:px-5 py-1.5 md:py-2 text-[11px] md:text-xs font-semibold tracking-[0.15em] uppercase text-stone-950 bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 rounded-md shadow-lg shadow-amber-950/20 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer whitespace-nowrap shrink-0"
        >
          <Calendar className="w-3 md:w-3.5 h-3 md:h-3.5" />
          <span>Book</span>
        </button>
      </div>
    </header>
  );
};
