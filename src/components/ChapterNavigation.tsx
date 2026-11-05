import React from 'react';
import { Compass, Sparkles, ArrowRight, ShieldCheck, Star } from 'lucide-react';

export interface ChapterItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  image: string;
  description: string;
  highlight: string;
  actionText: string;
}

export const RESORT_CHAPTERS: ChapterItem[] = [
  {
    id: 'arrival',
    number: '01 / 06',
    title: 'The Grand Arrival',
    subtitle: 'Golden Sandstone Gates & Foyer',
    image: '/assets/aistudio/frame_01.jpg',
    description:
      'Begin your journey at the grand golden sandstone gates, ascending royal steps into the regal welcoming foyer greeted with folded hands and traditional Marwari aarti.',
    highlight: 'Jaisalmer Yellow Stone & Carved Arches',
    actionText: 'Scroll Walkthrough Above',
  },
  {
    id: 'suites',
    number: '02 / 06',
    title: 'Golden Haveli Suites',
    subtitle: 'Heritage Living Chambers',
    image: '/assets/aistudio/frame_04.jpg',
    description:
      'Immerse in palatial luxury featuring antique Marwari furniture, private jharokha balconies overlooking the Thar sand dunes, and bespoke royal butler service.',
    highlight: 'Private Balconies & Hand-Carved Teak',
    actionText: 'Explore Suites Below',
  },
  {
    id: 'courtyard',
    number: '03 / 06',
    title: 'Courtyard & Oasis Pool',
    subtitle: 'Sanctuary amidst the Dunes',
    image: '/assets/aistudio/frame_02.jpg',
    description:
      'Unwind by serene lotus ponds and a turquoise marble swimming pool shaded by date palms, flowering bougainvillea, and warm Thar desert breezes.',
    highlight: 'Lotus Fountains & Sunset Terrace',
    actionText: 'View Pool Sanctuary',
  },
  {
    id: 'spa',
    number: '04 / 06',
    title: 'Mudra Desert Spa',
    subtitle: 'Sanctuary of Ayurvedic Healing',
    image: '/assets/aistudio/frame_03.jpg',
    description:
      'Ancient holistic wellness rituals, aromatic desert herbal steam baths, warm sesame oil Abhyanga massages, and tranquil meditation courtyards.',
    highlight: 'Authentic 5000-Year Ayurvedic Recipes',
    actionText: 'Discover Treatments',
  },
  {
    id: 'dining',
    number: '05 / 06',
    title: 'Sonar Qila Dining',
    subtitle: 'Royal Rajasthani Gastronomy',
    image: '/assets/aistudio/frame_05.jpg',
    description:
      'An opulent dining hall surrounded by antique Belgian cut-glass mirror work and candlelit chandeliers, serving authentic Jaisalmeri and Marwari delicacies.',
    highlight: 'Royal Thalis & Live Manganiyar Music',
    actionText: 'Browse Royal Menu',
  },
  {
    id: 'celebrations',
    number: '06 / 06',
    title: 'Palatial Desert Celebrations',
    subtitle: 'Destination Royal Weddings',
    image: '/assets/aistudio/frame_01.jpg',
    description:
      'A majestic setting for fairy-tale weddings, royal sangeet banquets, and intimate desert palace ceremonies under the starlit sky of Jaisalmer.',
    highlight: 'Banqueting for up to 1,200 Guests',
    actionText: 'Plan Celebration',
  },
];

interface ChapterNavigationProps {
  onSelectChapter: (chapterId: string) => void;
  onOpenBooking: () => void;
}

export const ChapterNavigation: React.FC<ChapterNavigationProps> = ({
  onSelectChapter,
  onOpenBooking,
}) => {
  return (
    <section id="chapters" className="py-24 px-6 md:px-12 bg-stone-925 text-stone-100">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-8 border-b border-stone-800">
          <div>
            <div className="flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-amber-400 font-mono mb-2">
              <Compass className="w-3.5 h-3.5 text-amber-400" />
              <span>THE 6 CHAPTERS OF AUNKAR SINGH</span>
            </div>
            <h2 className="font-serif text-3xl md:text-5xl font-light tracking-wide text-stone-100">
              A Symphony of Golden Sands & Royalty
            </h2>
          </div>
          <p className="max-w-md text-stone-400 text-sm leading-relaxed font-light">
            Every corner of the palace is an unfolded chapter in Jaisalmer yellow sandstone artistry, peaceful indulgence, and timeless desert grandeur.
          </p>
        </div>

        {/* 6 Chapters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {RESORT_CHAPTERS.map((chapter) => (
            <div
              key={chapter.id}
              className="group relative flex flex-col bg-stone-900/60 rounded-xl border border-stone-800/80 hover:border-amber-500/50 transition-all duration-300 overflow-hidden hover:-translate-y-1"
            >
              {/* Image Preview with Scrim */}
              <div className="relative aspect-[16/10] overflow-hidden bg-stone-950">
                <img
                  src={chapter.image}
                  alt={chapter.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent" />

                {/* Chapter Number Badge */}
                <div className="absolute top-4 left-4 px-2.5 py-1 rounded bg-stone-950/80 backdrop-blur-md border border-stone-800 text-[11px] font-mono tracking-widest text-amber-300">
                  {chapter.number}
                </div>

                {/* Highlight Tag */}
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-stone-300 font-light">
                  <span className="truncate">{chapter.highlight}</span>
                </div>
              </div>

              {/* Content Body */}
              <div className="p-6 flex flex-col flex-grow justify-between">
                <div>
                  <div className="text-[11px] tracking-[0.2em] uppercase text-amber-400/90 font-mono mb-1">
                    {chapter.subtitle}
                  </div>
                  <h3 className="font-serif text-2xl text-stone-100 font-normal mb-3 group-hover:text-amber-200 transition-colors">
                    {chapter.title}
                  </h3>
                  <p className="text-xs md:text-sm text-stone-400 leading-relaxed font-light mb-6">
                    {chapter.description}
                  </p>
                </div>

                {/* Action button */}
                <div className="pt-4 border-t border-stone-800/80 flex items-center justify-between">
                  <button
                    onClick={() => {
                      if (chapter.id === 'arrival') {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      } else if (chapter.id === 'suites') {
                        document.getElementById('suites')?.scrollIntoView({ behavior: 'smooth' });
                      } else if (chapter.id === 'dining') {
                        document.getElementById('dining')?.scrollIntoView({ behavior: 'smooth' });
                      } else {
                        onOpenBooking();
                      }
                    }}
                    className="flex items-center gap-2 text-xs font-medium tracking-wider text-amber-400 hover:text-amber-300 transition-colors uppercase group/btn cursor-pointer"
                  >
                    <span>{chapter.actionText}</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
