import React, { useState } from 'react';
import { X, Code2, Film, Zap, Layers, Copy, Check, Terminal } from 'lucide-react';

interface TechExplainerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TechExplainerModal: React.FC<TechExplainerModalProps> = ({ isOpen, onClose }) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const ffmpegCommand = `mkdir -p public/frames
ffmpeg -i input_video.mp4 -vf "fps=15,scale=1280:-1" -q:v 4 public/frames/frame_%04d.jpg`;

  const canvasLerpSnippet = `// 60FPS Silky Smooth Inertia Lerp Loop
useEffect(() => {
  const loop = () => {
    const diff = targetProgress - currentProgress;
    if (Math.abs(diff) > 0.0005) {
      currentProgress = currentProgress + diff * 0.14; // Lerp inertia
      const frameIdx = Math.round(currentProgress * (totalFrames - 1)) + 1;
      drawFrameToCanvas(frameIdx);
    }
    requestAnimationFrame(loop);
  };
  requestAnimationFrame(loop);
}, []);`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4 md:p-6">
      <div className="relative w-full max-w-3xl bg-stone-925 rounded-2xl border border-stone-800 text-stone-100 shadow-2xl p-6 md:p-8 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-6 border-b border-stone-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Film className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-amber-400">
                ARCHITECTURE & CRAFT
              </span>
              <h3 className="font-serif text-2xl text-stone-100 font-normal">
                How This Scrolling Effect Works
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-white rounded-lg hover:bg-stone-900 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Core Pillars */}
        <div className="py-6 space-y-6">
          <p className="text-xs md:text-sm text-stone-300 leading-relaxed font-light">
            High-end luxury sites (like Apple, Porsche, and Aunkar Singh Palace) achieve this cinematic scrub effect through three precision layers:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-stone-900/60 border border-stone-800">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-mono uppercase tracking-wider mb-2">
                <Zap className="w-4 h-4" />
                <span>1. Canvas vs Video</span>
              </div>
              <p className="text-[11px] text-stone-400 leading-relaxed font-light">
                Setting <code className="text-amber-300">video.currentTime</code> on scroll stutters due to I-frame GOP seeking. Instead, we extract 129 JPEG frames and draw to HTML5 Canvas instantly at 0ms seek latency.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-stone-900/60 border border-stone-800">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-mono uppercase tracking-wider mb-2">
                <Layers className="w-4 h-4" />
                <span>2. Sticky 450vh Track</span>
              </div>
              <p className="text-[11px] text-stone-400 leading-relaxed font-light">
                A tall container gives the user 450vh of natural scroll distance. A sticky 100vh canvas locks in place while computing normalized progress: <code className="text-amber-300">scroll / maxScroll</code>.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-stone-900/60 border border-stone-800">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-mono uppercase tracking-wider mb-2">
                <Code2 className="w-4 h-4" />
                <span>3. Lerp Inertia</span>
              </div>
              <p className="text-[11px] text-stone-400 leading-relaxed font-light">
                Directly binding scroll to frames feels jagged on stepped mouse wheels. We interpolate with <code className="text-amber-300">lerp(current, target, 0.14)</code> in a 60fps <code className="text-amber-300">requestAnimationFrame</code> loop.
              </p>
            </div>
          </div>

          {/* Code Recipe 1: ffmpeg */}
          <div className="rounded-xl bg-stone-950 border border-stone-800 p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 text-xs font-mono text-stone-300">
                <Terminal className="w-3.5 h-3.5 text-amber-400" />
                <span>Step 1: Extract 15fps JPEG sequence from MP4</span>
              </div>
              <button
                onClick={() => handleCopy(ffmpegCommand, 'ffmpeg')}
                className="flex items-center gap-1 text-[11px] text-amber-400 hover:text-amber-300 cursor-pointer font-mono"
              >
                {copiedKey === 'ffmpeg' ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span>COPIED</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>COPY</span>
                  </>
                )}
              </button>
            </div>
            <pre className="text-xs font-mono text-amber-300/90 overflow-x-auto p-3 bg-stone-900/80 rounded-lg">
              {ffmpegCommand}
            </pre>
          </div>

          {/* Code Recipe 2: Lerp loop */}
          <div className="rounded-xl bg-stone-950 border border-stone-800 p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 text-xs font-mono text-stone-300">
                <Code2 className="w-3.5 h-3.5 text-amber-400" />
                <span>Step 2: Smooth 60FPS Canvas Render Loop</span>
              </div>
              <button
                onClick={() => handleCopy(canvasLerpSnippet, 'lerp')}
                className="flex items-center gap-1 text-[11px] text-amber-400 hover:text-amber-300 cursor-pointer font-mono"
              >
                {copiedKey === 'lerp' ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span>COPIED</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>COPY</span>
                  </>
                )}
              </button>
            </div>
            <pre className="text-xs font-mono text-amber-300/90 overflow-x-auto p-3 bg-stone-900/80 rounded-lg">
              {canvasLerpSnippet}
            </pre>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="pt-4 border-t border-stone-800 flex items-center justify-between">
          <span className="text-[11px] text-stone-500 font-mono">
            Optimized for Retina DPR & Mobile Touch
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-medium cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
