/**
 * Pure calculation utilities for the cinematic scroll engine and resort booking.
 */

export interface Chapter {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  startProgress: number; // 0 to 1
  endProgress: number;   // 0 to 1
  location: string;
  tagline: string;
}

/**
 * Clamps a number between min and max.
 */
export function clamp(value: number, min = 0, max = 1): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Linear interpolation between a and b.
 */
export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * clamp(t, 0, 1);
}

/**
 * Calculates current scroll progress between 0 and 1.
 */
export function calculateScrollProgress(scrollTop: number, scrollDistance: number): number {
  if (scrollDistance <= 0) return 0;
  return clamp(scrollTop / scrollDistance, 0, 1);
}

/**
 * Maps a progress value [0, 1] to an integer frame index between 1 and totalFrames.
 */
export function getFrameIndex(progress: number, totalFrames: number): number {
  if (totalFrames <= 1) return 1;
  const index = Math.round(progress * (totalFrames - 1)) + 1;
  return Math.min(Math.max(index, 1), totalFrames);
}

/**
 * Finds the active chapter based on the current normalized scroll progress.
 */
export function getActiveChapter(progress: number, chapters: Chapter[]): Chapter {
  if (!chapters.length) {
    throw new Error('Chapters list cannot be empty');
  }
  const clampedProgress = clamp(progress, 0, 1);
  const found = chapters.find(
    (ch) => clampedProgress >= ch.startProgress && clampedProgress <= ch.endProgress
  );
  return found || chapters[chapters.length - 1];
}

/**
 * Calculates the total cost of a reservation stay.
 */
export function calculateStayPrice(
  nights: number,
  guests: number,
  baseRatePerNight: number,
  isRoyalBreakfastIncluded = true
): { baseTotal: number; breakfastFee: number; taxFee: number; grandTotal: number } {
  const safeNights = Math.max(1, nights);
  const safeGuests = Math.max(1, guests);
  const baseTotal = safeNights * baseRatePerNight;
  const breakfastFee = isRoyalBreakfastIncluded ? safeNights * safeGuests * 1200 : 0;
  const taxFee = Math.round((baseTotal + breakfastFee) * 0.18); // 18% luxury GST in India
  const grandTotal = baseTotal + breakfastFee + taxFee;

  return {
    baseTotal,
    breakfastFee,
    taxFee,
    grandTotal,
  };
}
