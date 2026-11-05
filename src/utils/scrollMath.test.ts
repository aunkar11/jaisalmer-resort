import test from 'node:test';
import assert from 'node:assert/strict';
import {
  clamp,
  lerp,
  calculateScrollProgress,
  getFrameIndex,
  getActiveChapter,
  calculateStayPrice,
  Chapter,
} from './scrollMath';

test('clamp confines numbers to bounds', () => {
  assert.equal(clamp(-5, 0, 1), 0);
  assert.equal(clamp(1.5, 0, 1), 1);
  assert.equal(clamp(0.42, 0, 1), 0.42);
});

test('lerp calculates linear interpolation correctly', () => {
  assert.equal(lerp(10, 20, 0), 10);
  assert.equal(lerp(10, 20, 0.5), 15);
  assert.equal(lerp(10, 20, 1), 20);
});

test('calculateScrollProgress computes accurate normalized progress', () => {
  assert.equal(calculateScrollProgress(0, 1000), 0);
  assert.equal(calculateScrollProgress(500, 1000), 0.5);
  assert.equal(calculateScrollProgress(1000, 1000), 1);
  assert.equal(calculateScrollProgress(1500, 1000), 1);
  assert.equal(calculateScrollProgress(100, 0), 0);
});

test('getFrameIndex maps 0..1 to 1..totalFrames accurately', () => {
  assert.equal(getFrameIndex(0, 150), 1);
  assert.equal(getFrameIndex(1, 150), 150);
  assert.equal(getFrameIndex(0.5, 150), 76);
  assert.equal(getFrameIndex(0, 129), 1);
  assert.equal(getFrameIndex(1, 129), 129);
  assert.equal(getFrameIndex(0.5, 129), 65);
});

test('getActiveChapter resolves correct chapter for scroll progress', () => {
  const sampleChapters: Chapter[] = [
    {
      id: 'c1',
      number: '01',
      title: 'The Arrival',
      subtitle: 'Courtyard',
      description: 'First steps',
      startProgress: 0,
      endProgress: 0.35,
      location: 'Forecourt',
      tagline: 'Palace entrance',
    },
    {
      id: 'c2',
      number: '02',
      title: 'Grand Portico',
      subtitle: 'Marble Steps',
      description: 'Ascending',
      startProgress: 0.35,
      endProgress: 0.7,
      location: 'Portico',
      tagline: 'Steps of Mewar',
    },
    {
      id: 'c3',
      number: '03',
      title: 'Royal Foyer',
      subtitle: 'Reception Greeting',
      description: 'Namaste',
      startProgress: 0.7,
      endProgress: 1.0,
      location: 'Lobby',
      tagline: 'Atithi Devo Bhava',
    },
  ];

  assert.equal(getActiveChapter(0.1, sampleChapters).id, 'c1');
  assert.equal(getActiveChapter(0.5, sampleChapters).id, 'c2');
  assert.equal(getActiveChapter(0.85, sampleChapters).id, 'c3');
  assert.equal(getActiveChapter(1.0, sampleChapters).id, 'c3');
});

test('calculateStayPrice accurately computes luxury rate and taxes', () => {
  const quote = calculateStayPrice(2, 2, 25000, true);
  // Base: 2 * 25000 = 50,000
  // Breakfast: 2 * 2 * 1200 = 4,800
  // Subtotal = 54,800
  // Tax (18%) = 9,864
  // Grand total = 64,664
  assert.equal(quote.baseTotal, 50000);
  assert.equal(quote.breakfastFee, 4800);
  assert.equal(quote.taxFee, 9864);
  assert.equal(quote.grandTotal, 64664);
});
