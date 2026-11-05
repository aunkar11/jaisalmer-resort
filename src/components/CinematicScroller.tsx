import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Play, Pause, ChevronDown, Compass, RotateCcw, Volume2, Sparkles } from 'lucide-react';
import { clamp, lerp, getFrameIndex } from '../utils/scrollMath';

interface CinematicScrollerProps {
  onProgressChange?: (progress: number) => void;
  onOpenBooking: () => void;
}

const TOTAL_FRAMES = 150;

const STORY_BEATS = [
  {
    range: [0, 0.28],
    title: 'The Artisan Street of Jaisalmer',
    caption: 'Stroll down ancient paved stone lanes lined with vibrant Rajasthani marionettes, handcrafted brassware, and golden havelis.',
    label: '01 / 04 ARTISAN BAZAAR',
  },
  {
    range: [0.28, 0.55],
    title: 'The Scalloped Torana Gate',
    caption: 'Approach the towering golden sandstone portal of Aunkar Singh Haveli, crowned by hand-carved stone filigree.',
    label: '02 / 04 PALACE PORTAL',
  },
  {
    range: [0.55, 0.78],
    title: 'Through the Royal Gateway',
    caption: 'Pass beneath the monumental arch and antique iron-studded teak doors into the inner royal sanctuary.',
    label: '03 / 04 THE THRESHOLD',
  },
  {
    range: [0.78, 1.0],
    title: 'The Grand Haveli Courtyard',
    caption: 'Emerge into the awe-inspiring inner quadrangle surrounded by multi-tiered jharokhas, carved stone balconies, and a central fountain.',
    label: '04 / 04 HAVELI CHOWK',
  },
];

export const CinematicScroller: React.FC<CinematicScrollerProps> = ({
  onProgressChange,
  onOpenBooking,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [loadedCount, setLoadedCount] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [activeBeatIndex, setActiveBeatIndex] = useState(0);

  // Cache for loaded HTML images
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const animFrameIdRef = useRef<number | null>(null);
  const autoPlayIntervalRef = useRef<number | null>(null);

  // Preload frame sequence progressively
  useEffect(() => {
    let isCancelled = false;
    const loadedImages: HTMLImageElement[] = new Array(TOTAL_FRAMES);

    let count = 0;
    // Load first frame immediately for fast first paint
    const loadFrame = (index: number) => {
      const img = new Image();
      const frameNum = String(index).padStart(4, '0');
      img.src = `/frames/frame_${frameNum}.jpg`;

      img.onload = () => {
        if (isCancelled) return;
        loadedImages[index - 1] = img;
        count++;
        setLoadedCount(count);

        // If this is the first frame, render immediately
        if (index === 1 && canvasRef.current) {
          renderFrame(1);
        }
      };

      img.onerror = () => {
        // Fallback or retry frame
        if (isCancelled) return;
        count++;
        setLoadedCount(count);
      };
    };

    // Load key frames first (1, 35, 75, 115, 150), then fill rest
    const priorityIndices = [1, 35, 75, 115, 150];
    priorityIndices.forEach((idx) => loadFrame(idx));

    // Load remaining frames
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      if (!priorityIndices.includes(i)) {
        loadFrame(i);
      }
    }

    imagesRef.current = loadedImages;

    return () => {
      isCancelled = true;
    };
  }, []);

  // High performance draw routine on Canvas with cover-fit math
  const renderFrame = useCallback((frameIdx: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    // Retrieve target image or nearest loaded neighbor
    let img = imagesRef.current[frameIdx - 1];
    if (!img || !img.complete || img.naturalWidth === 0) {
      // Find nearest loaded frame
      for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
        const left = imagesRef.current[frameIdx - 1 - offset];
        if (left && left.complete && left.naturalWidth > 0) {
          img = left;
          break;
        }
        const right = imagesRef.current[frameIdx - 1 + offset];
        if (right && right.complete && right.naturalWidth > 0) {
          img = right;
          break;
        }
      }
    }

    if (!img || !img.complete || img.naturalWidth === 0) return;

    const w = canvas.width;
    const h = canvas.height;
    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = w / h;

    let drawW = w;
    let drawH = h;
    let drawX = 0;
    let drawY = 0;

    if (canvasRatio > imgRatio) {
      drawH = w / imgRatio;
      drawY = (h - drawH) / 2;
    } else {
      drawW = h * imgRatio;
      drawX = (w - drawW) / 2;
    }

    ctx.drawImage(img, drawX, drawY, drawW, drawH);
  }, []);

  // Resize canvas to match screen pixel ratio
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      const currentIdx = getFrameIndex(currentProgressRef.current, TOTAL_FRAMES);
      renderFrame(currentIdx);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [renderFrame]);

  // Buttery 60fps smoothing render loop using lerp
  useEffect(() => {
    const loop = () => {
      // Lerp current towards target with 0.12 factor for silky cinematic inertia
      const diff = targetProgressRef.current - currentProgressRef.current;
      if (Math.abs(diff) > 0.0005) {
        currentProgressRef.current = lerp(
          currentProgressRef.current,
          targetProgressRef.current,
          0.14
        );
        const frameIdx = getFrameIndex(currentProgressRef.current, TOTAL_FRAMES);
        renderFrame(frameIdx);
        setScrollProgress(currentProgressRef.current);

        // Notify parent
        onProgressChange?.(currentProgressRef.current);

        // Update active story beat
        const beatIdx = STORY_BEATS.findIndex(
          (b) =>
            currentProgressRef.current >= b.range[0] &&
            currentProgressRef.current <= b.range[1]
        );
        if (beatIdx !== -1) {
          setActiveBeatIndex(beatIdx);
        }
      }
      animFrameIdRef.current = requestAnimationFrame(loop);
    };

    animFrameIdRef.current = requestAnimationFrame(loop);
    return () => {
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
    };
  }, [renderFrame, onProgressChange]);

  // Window scroll event listener mapped to container height
  useEffect(() => {
    const onScroll = () => {
      if (isAutoPlaying) return; // Do not fight auto tour
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const containerHeight = containerRef.current.offsetHeight - window.innerHeight;
      if (containerHeight <= 0) return;

      const scrolled = -rect.top;
      const progress = clamp(scrolled / containerHeight, 0, 1);
      targetProgressRef.current = progress;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isAutoPlaying]);

  // Auto-tour playback mechanism
  useEffect(() => {
    if (!isAutoPlaying) {
      if (autoPlayIntervalRef.current) {
        window.clearInterval(autoPlayIntervalRef.current);
        autoPlayIntervalRef.current = null;
      }
      return;
    }

    const interval = window.setInterval(() => {
      let next = targetProgressRef.current + 0.004;
      if (next >= 1) {
        next = 1;
        setIsAutoPlaying(false);
      }
      targetProgressRef.current = next;

      // Also gently sync the scroll position of the window
      if (containerRef.current) {
        const containerHeight = containerRef.current.offsetHeight - window.innerHeight;
        const targetScrollTop =
          containerRef.current.offsetTop + next * containerHeight;
        window.scrollTo({
          top: targetScrollTop,
          behavior: 'instant' as ScrollBehavior,
        });
      }
    }, 33); // ~30 updates per second

    autoPlayIntervalRef.current = interval;
    return () => {
      window.clearInterval(interval);
    };
  }, [isAutoPlaying]);

  // Manual scrub jump handler
  const handleSeek = (newProgress: number) => {
    targetProgressRef.current = clamp(newProgress, 0, 1);
    if (containerRef.current) {
      const containerHeight = containerRef.current.offsetHeight - window.innerHeight;
      const targetScrollTop =
        containerRef.current.offsetTop + targetProgressRef.current * containerHeight;
      window.scrollTo({
        top: targetScrollTop,
        behavior: 'smooth',
      });
    }
  };

  const currentBeat = STORY_BEATS[activeBeatIndex] || STORY_BEATS[0];
  const progressPercent = Math.round(scrollProgress * 100);

  return (
    <section
      id="arrival"
      ref={containerRef}
      className="relative w-full h-[450vh] bg-stone-950"
    >
      {/* Sticky Fullscreen Cinematic Viewport */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden select-none bg-stone-950">
        {/* The Canvas Frame Surface */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />

        {/* Cinematic Vignette and Subtle Grain Scrim */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-stone-950/80 via-transparent to-stone-950/60" />
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_transparent_40%,_rgba(0,0,0,0.6)_100%)]" />

        {/* Loading Indicator Pill during initial frame stream */}
        {loadedCount < 20 && (
          <div className="absolute top-24 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-stone-900/80 backdrop-blur-md border border-amber-500/30 text-amber-300 text-xs tracking-widest flex items-center gap-2 z-40">
            <div className="w-3 h-3 border-2 border-amber-400 border-t-transparent rounded-full animate-spin"></div>
            <span>PREPARING PALACE TOUR ({loadedCount}/{TOTAL_FRAMES})</span>
          </div>
        )}

        {/* HUD ELEMENT: TOP-LEFT REFERENCE BRAND & CHAPTER */}
        <div
          className={`absolute top-16 md:top-24 left-4 md:left-12 z-30 flex flex-col text-left text-white drop-shadow-md transition-opacity duration-300 max-w-[60vw] ${
            scrollProgress > 0.96 ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        >
          <div className="flex items-center gap-2 md:gap-3 text-stone-300 text-[11px] md:text-sm tracking-[0.2em] md:tracking-[0.25em] uppercase font-light">
            <span className="font-mono text-amber-400/90 font-medium">||</span>
            <span className="w-5 md:w-8 h-px bg-stone-500/70"></span>
            <span className="font-serif text-amber-100 font-semibold tracking-[0.15em] md:tracking-[0.2em] truncate">
              Aunkar Singh
            </span>
          </div>
          <h1 className="font-serif text-xl sm:text-2xl md:text-4xl text-stone-100 tracking-[0.12em] md:tracking-[0.15em] uppercase mt-0.5 md:mt-1">
            THE ARRIVAL
          </h1>
          <div className="text-[10px] md:text-xs text-amber-300/80 tracking-[0.15em] md:tracking-[0.2em] uppercase font-mono">
            {currentBeat.label}
          </div>
        </div>

        {/* HUD ELEMENT: TOP-RIGHT REFERENCE BADGE */}
        <div
          className={`absolute top-16 md:top-24 right-4 md:right-12 z-30 flex flex-col items-end text-right text-stone-300 drop-shadow-md transition-opacity duration-300 ${
            scrollProgress > 0.96 ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        >
          <div className="text-[9px] md:text-xs tracking-[0.25em] md:tracking-[0.3em] uppercase text-stone-400 font-mono hidden sm:block">
            EST. JAISALMER · RAJASTHAN
          </div>
          <div className="text-[11px] md:text-sm tracking-[0.15em] md:tracking-[0.2em] uppercase text-amber-200 font-medium font-serif mt-0.5">
            01 / 06 CHAPTER
          </div>
        </div>

        {/* STORY OVERLAY CARD: FLOATING AT MID-LOWER SCREEN */}
        <div
          className={`absolute bottom-28 md:bottom-24 left-6 md:left-12 max-w-sm md:max-w-md z-30 transition-all duration-500 ${
            scrollProgress > 0.96 ? 'opacity-0 pointer-events-none translate-y-4' : 'opacity-100 translate-y-0'
          }`}
        >
          <div className="p-4 md:p-6 rounded-lg bg-stone-950/80 backdrop-blur-md border border-stone-800/80 shadow-2xl">
            <div className="flex items-center justify-between gap-4 mb-1.5 md:mb-2">
              <span className="text-[10px] md:text-[11px] tracking-[0.25em] uppercase text-amber-400 font-mono">
                {currentBeat.label}
              </span>
              <span className="text-xs font-mono tabular-nums text-stone-400">
                {progressPercent}% ARRIVED
              </span>
            </div>
            <h2 className="font-serif text-lg md:text-2xl text-stone-100 tracking-wide font-normal">
              {currentBeat.title}
            </h2>
            <p className="text-[11px] md:text-sm text-stone-300/90 leading-relaxed mt-1.5 md:mt-2 font-light">
              {currentBeat.caption}
            </p>

            {/* Quick interactive scrub checkpoints */}
            <div className="flex items-center gap-1.5 mt-3 md:mt-4 pt-2.5 md:pt-3 border-t border-stone-800/60">
              {STORY_BEATS.map((beat, i) => (
                <button
                  key={i}
                  onClick={() => handleSeek(beat.range[0])}
                  className={`h-1.5 flex-1 rounded-full transition-all cursor-pointer ${
                    activeBeatIndex === i
                      ? 'bg-amber-400 shadow-sm shadow-amber-400/50'
                      : i < activeBeatIndex
                      ? 'bg-stone-500 hover:bg-stone-400'
                      : 'bg-stone-800 hover:bg-stone-700'
                  }`}
                  aria-label={`Jump to ${beat.title}`}
                  title={beat.title}
                />
              ))}
            </div>
          </div>
        </div>

        {/* BOTTOM RIGHT REFERENCE EMBLEM */}
        <div
          className={`absolute bottom-6 right-6 md:right-12 z-30 flex items-center gap-3 md:gap-4 transition-opacity duration-300 ${
            scrollProgress > 0.96 ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        >
          <div className="text-[10px] tracking-[0.2em] uppercase text-stone-400 hidden sm:block font-mono">
            ROYAL JAISALMER HERITAGE
          </div>
          {/* Authentic 4-pointed palace star icon from reference */}
          <div className="w-8 h-8 rounded-full border border-amber-500/40 bg-stone-900/60 backdrop-blur-sm flex items-center justify-center text-amber-400">
            <svg
              className="w-4 h-4 fill-current animate-[spin_20s_linear_infinite]"
              viewBox="0 0 24 24"
            >
              <path d="M12 0L14 9.5L24 12L14 14.5L12 24L10 14.5L0 12L10 9.5L12 0Z" />
            </svg>
          </div>
        </div>

        {/* CONTROLS BAR: CENTER BOTTOM */}
        <div
          className={`absolute bottom-5 md:bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 md:gap-3 px-3 md:px-4 py-2 rounded-full bg-stone-950/85 backdrop-blur-md border border-stone-800/90 text-stone-300 shadow-xl transition-all duration-300 max-w-[90vw] ${
            scrollProgress > 0.96 ? 'opacity-0 pointer-events-none translate-y-3' : 'opacity-100 translate-y-0'
          }`}
        >
          {/* Auto tour button */}
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className="flex items-center gap-1.5 md:gap-2 px-2.5 md:px-3 py-1 rounded-full bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-[11px] md:text-xs tracking-wider transition-all cursor-pointer whitespace-nowrap"
            aria-label={isAutoPlaying ? 'Pause automatic walkthrough' : 'Play automatic walkthrough'}
          >
            {isAutoPlaying ? (
              <>
                <Pause className="w-3 md:w-3.5 h-3 md:h-3.5" />
                <span className="font-medium">PAUSE</span>
              </>
            ) : (
              <>
                <Play className="w-3 md:w-3.5 h-3 md:h-3.5 fill-current" />
                <span className="font-medium">AUTO TOUR</span>
              </>
            )}
          </button>

          <div className="w-px h-3.5 bg-stone-700"></div>

          {/* Reset button */}
          <button
            onClick={() => handleSeek(0)}
            className="p-1 hover:text-amber-300 transition-colors text-stone-400 cursor-pointer"
            aria-label="Restart walkthrough from forecourt"
            title="Restart from forecourt"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          <div className="w-px h-3.5 bg-stone-700"></div>

          {/* Direct slider scrubbing affordance */}
          <div className="flex items-center gap-1.5 md:gap-2">
            <input
              type="range"
              min="0"
              max="1"
              step="0.005"
              value={scrollProgress}
              onChange={(e) => handleSeek(parseFloat(e.target.value))}
              className="w-16 sm:w-28 md:w-36 h-1 bg-stone-700 rounded-lg appearance-none cursor-pointer accent-amber-400"
              aria-label="Scroll scrubber progress"
            />
            <span className="text-[10px] md:text-[11px] font-mono tabular-nums text-stone-400 min-w-7 text-right">
              {progressPercent}%
            </span>
          </div>
        </div>

        {/* INITIAL SCROLL HINT (Fades out once user has scrolled past 5%) */}
        <div
          className={`absolute bottom-20 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center pointer-events-none transition-opacity duration-700 ${
            scrollProgress > 0.05 ? 'opacity-0' : 'opacity-90'
          }`}
        >
          <span className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-stone-300 font-light drop-shadow">
            SCROLL DOWN TO WALK THROUGH
          </span>
          <div className="w-px h-8 bg-gradient-to-b from-amber-400 via-amber-200 to-transparent mt-2 animate-bounce"></div>
        </div>
      </div>
    </section>
  );
};
