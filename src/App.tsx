/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { Navigation } from './components/Navigation';
import { CinematicScroller } from './components/CinematicScroller';
import { ChapterNavigation } from './components/ChapterNavigation';
import { SuitesShowcase, SuiteOption } from './components/SuitesShowcase';
import { DiningWellness } from './components/DiningWellness';
import { ReservationDrawer } from './components/ReservationDrawer';
import { TechExplainerModal } from './components/TechExplainerModal';
import { Footer } from './components/Footer';

export default function App() {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isTechModalOpen, setIsTechModalOpen] = useState(false);
  const [selectedSuite, setSelectedSuite] = useState<SuiteOption | null>(null);
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize background ambient audio
  useEffect(() => {
    const audio = new Audio('/assets/aistudio/jaisalmer_ambient.mp3');
    audio.loop = true;
    audio.volume = 0.45;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  const toggleAudio = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isAudioPlaying) {
      audio.pause();
      setIsAudioPlaying(false);
    } else {
      audio
        .play()
        .then(() => setIsAudioPlaying(true))
        .catch((err) => {
          console.warn('Audio playback restricted by browser policy:', err);
        });
    }
  };

  const handleOpenBookingWithSuite = (suite: SuiteOption) => {
    setSelectedSuite(suite);
    setIsBookingOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-stone-950 text-stone-100 selection:bg-amber-500/30 selection:text-amber-200">
      {/* Fixed Top Bar Navigation */}
      <Navigation
        isAudioPlaying={isAudioPlaying}
        onToggleAudio={toggleAudio}
        onOpenBooking={() => {
          setSelectedSuite(null);
          setIsBookingOpen(true);
        }}
        onOpenTechModal={() => setIsTechModalOpen(true)}
        activeChapterIndex={activeChapterIndex}
      />

      {/* Main Content Area */}
      <main>
        {/* Chapter 01: The Cinematic Scroll Walkthrough */}
        <CinematicScroller
          onProgressChange={(progress) => {
            if (progress < 0.95) {
              setActiveChapterIndex(0);
            } else {
              setActiveChapterIndex(1);
            }
          }}
          onOpenBooking={() => setIsBookingOpen(true)}
        />

        {/* The 6 Palace Chapters Overview */}
        <ChapterNavigation
          onSelectChapter={(id) => {
            const el = document.getElementById(id);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          onOpenBooking={() => setIsBookingOpen(true)}
        />

        {/* Chapter 02: Royal Suites & Haveli Showcase */}
        <SuitesShowcase onSelectSuite={handleOpenBookingWithSuite} />

        {/* Chapters 04 & 05: Royal Dining & Mudra Spa */}
        <DiningWellness onOpenBooking={() => setIsBookingOpen(true)} />
      </main>

      {/* Footer */}
      <Footer
        onOpenBooking={() => setIsBookingOpen(true)}
        onOpenTechModal={() => setIsTechModalOpen(true)}
      />

      {/* Slide-over Reservation Drawer */}
      <ReservationDrawer
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        selectedSuite={selectedSuite}
      />

      {/* Interactive Tech Explainer Modal */}
      <TechExplainerModal
        isOpen={isTechModalOpen}
        onClose={() => setIsTechModalOpen(false)}
      />
    </div>
  );
}
