import React, { useState } from 'react';
import { Bed, Users, Maximize2, Bath, Check, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

export interface SuiteOption {
  id: string;
  name: string;
  subtitle: string;
  ratePerNight: number;
  size: string;
  occupancy: string;
  view: string;
  description: string;
  image: string;
  features: string[];
}

export const SUITES_DATA: SuiteOption[] = [
  {
    id: 'aunkar-royal',
    name: 'The Aunkar Singh Royal Haveli',
    subtitle: 'Golden Fort Wing · First Floor',
    ratePerNight: 32000,
    size: '850 sq.ft',
    occupancy: 'Up to 3 Guests',
    view: 'Thar Sand Dunes & Golden Fort Panoramas',
    description:
      'A masterwork of Jaisalmer stone craftsmanship with a hand-carved four-poster teak bed, arched stained-glass windows, hand-woven silk fabrics, and a deep marble soaking tub overlooking the golden desert horizon.',
    image: '/assets/aistudio/frame_04.jpg',
    features: [
      'Private Rajput jharokha balcony over desert dunes',
      'Makrana marble bathroom with rainfall shower',
      '24-Hour bespoke royal butler service',
      'Daily ceremonial desert sunset high tea on terrace',
      'Complimentary airport / station vintage car transfer',
    ],
  },
  {
    id: 'haveli-pool',
    name: 'Thar Royal Oasis Plunge Pool Villa',
    subtitle: 'Secluded Desert Palace Courtyard',
    ratePerNight: 48000,
    size: '1,250 sq.ft',
    occupancy: 'Up to 4 Guests',
    view: 'Private Lotus Garden & Private Plunge Pool',
    description:
      'An exclusive desert oasis enclosed by golden sandstone walls for absolute privacy. Features a heated turquoise marble plunge pool, private courtyard daybed, dining gazebo, and open-sky outdoor rain shower.',
    image: '/assets/aistudio/frame_05.jpg',
    features: [
      'Temperature-controlled private plunge pool',
      'Private walled garden with candlelit cabana',
      'In-villa chef breakfast and evening dune barbecue',
      'Complimentary Mudra Spa herbal desert body polish',
      'Curated private wine and single malt cellar',
    ],
  },
  {
    id: 'sonar-club',
    name: 'Sonar Club Chamber',
    subtitle: 'Heritage Courtyard Wing',
    ratePerNight: 22000,
    size: '620 sq.ft',
    occupancy: 'Up to 2 Guests',
    view: 'Courtyard Palace Gardens',
    description:
      'Intimate luxury infused with golden sandstone warmth and authentic royal charm. Hand-painted fresco motifs on high arches, custom brass lamps, and plush bedding designed for peaceful retreat after a day exploring Jaisalmer.',
    image: '/assets/aistudio/frame_02.jpg',
    features: [
      'Hand-painted desert floral ceiling frescoes',
      'Artisan brass reading lamps and writing desk',
      'Pillow menu with 6 Ayurvedic options',
      'Heritage evening Manganiyar desert music access',
      'Complimentary high-speed satellite Wi-Fi',
    ],
  },
];

interface SuitesShowcaseProps {
  onSelectSuite: (suite: SuiteOption) => void;
}

export const SuitesShowcase: React.FC<SuitesShowcaseProps> = ({ onSelectSuite }) => {
  const [activeSuiteId, setActiveSuiteId] = useState(SUITES_DATA[0].id);

  const activeSuite = SUITES_DATA.find((s) => s.id === activeSuiteId) || SUITES_DATA[0];

  return (
    <section id="suites" className="py-24 px-6 md:px-12 bg-stone-950 text-stone-100">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs tracking-[0.25em] uppercase text-amber-400 font-mono mb-2">
              CHAPTER 02 · RESIDENCE OF KINGS
            </div>
            <h2 className="font-serif text-3xl md:text-5xl font-light tracking-wide text-stone-100">
              Palatial Suites & Desert Havelis
            </h2>
          </div>
          <p className="max-w-md text-stone-400 text-sm leading-relaxed font-light">
            Designed in reverence to the Jaisalmer Rajput architectural legacy, where timeless yellow stone carvings meet personalized royal luxury.
          </p>
        </div>

        {/* Suite Selector Tabs */}
        <div className="flex items-center gap-2 pb-4 overflow-x-auto no-scrollbar border-b border-stone-800 mb-10">
          {SUITES_DATA.map((suite) => (
            <button
              key={suite.id}
              onClick={() => setActiveSuiteId(suite.id)}
              className={`px-5 py-3 rounded-lg text-xs md:text-sm font-medium tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                activeSuiteId === suite.id
                  ? 'bg-amber-500/15 text-amber-300 border border-amber-500/40 shadow-sm'
                  : 'text-stone-400 hover:text-stone-200 hover:bg-stone-900 border border-transparent'
              }`}
            >
              {suite.name}
            </button>
          ))}
        </div>

        {/* Active Suite Display Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch bg-stone-900/40 rounded-2xl border border-stone-800 p-6 md:p-8">
          {/* Left Column: Image with Subtle Hover Zoom */}
          <div className="lg:col-span-7 relative rounded-xl overflow-hidden min-h-[340px] md:min-h-[460px] bg-stone-925">
            <img
              src={activeSuite.image}
              alt={activeSuite.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent pointer-events-none" />

            {/* Room specs overlay at bottom of image */}
            <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center gap-4 text-xs text-stone-200 backdrop-blur-md bg-stone-950/70 p-3.5 rounded-lg border border-stone-800">
              <div className="flex items-center gap-1.5">
                <Maximize2 className="w-3.5 h-3.5 text-amber-400" />
                <span>{activeSuite.size}</span>
              </div>
              <span className="text-stone-600">·</span>
              <div className="flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-amber-400" />
                <span>{activeSuite.occupancy}</span>
              </div>
              <span className="text-stone-600">·</span>
              <div className="flex items-center gap-1.5">
                <Bed className="w-3.5 h-3.5 text-amber-400" />
                <span>King Bed</span>
              </div>
              <span className="text-stone-600">·</span>
              <span className="text-amber-300/90">{activeSuite.view}</span>
            </div>
          </div>

          {/* Right Column: Details & Pricing */}
          <div className="lg:col-span-5 flex flex-col justify-between py-2">
            <div>
              <div className="text-xs font-mono tracking-widest text-amber-400 uppercase mb-1">
                {activeSuite.subtitle}
              </div>
              <h3 className="font-serif text-2xl md:text-3xl text-stone-100 font-normal mb-4">
                {activeSuite.name}
              </h3>
              <p className="text-xs md:text-sm text-stone-300 leading-relaxed font-light mb-6">
                {activeSuite.description}
              </p>

              {/* Feature checklist */}
              <div className="space-y-2.5 mb-8">
                <div className="text-[11px] tracking-wider uppercase text-stone-400 font-medium">
                  SUITE AMENITIES & INCLUSIONS
                </div>
                {activeSuite.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-stone-300">
                    <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Price block & Action */}
            <div className="pt-6 border-t border-stone-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="text-[10px] tracking-widest uppercase text-stone-400 font-mono">
                  STARTING FROM
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className="font-serif text-3xl font-medium text-amber-300 tabular-nums">
                    ₹{activeSuite.ratePerNight.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs text-stone-400 font-light">/ night + taxes</span>
                </div>
              </div>

              <button
                onClick={() => onSelectSuite(activeSuite)}
                className="px-6 py-3 rounded-lg text-xs font-semibold tracking-wider uppercase text-stone-950 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-500 shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 whitespace-nowrap"
              >
                <span>Reserve Suite</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
