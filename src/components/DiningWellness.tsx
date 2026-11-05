import React, { useState } from 'react';
import { Utensils, Sparkles, Clock, Calendar, Wine, Heart } from 'lucide-react';

interface DiningWellnessProps {
  onOpenBooking: () => void;
}

export const DiningWellness: React.FC<DiningWellnessProps> = ({ onOpenBooking }) => {
  const [activeTab, setActiveTab] = useState<'dining' | 'spa'>('dining');

  const menuHighlights = [
    {
      name: 'Royal Jaisalmer Thali',
      tag: 'Chef Signature',
      desc: 'An imperial banquet featuring traditional Dal Baati Churma, Ker Sangri with desert capers, Gatte ki Sabzi, and hot Bajra Roti with fresh white butter.',
      price: '₹3,400',
    },
    {
      name: 'Royal Laal Maas',
      tag: 'Heritage Recipe',
      desc: 'Slow-simmered tender mutton prepared in brass pots with Mathania red chilies, garlic, whole spices, and pure Rajasthani cow ghee.',
      price: '₹2,600',
    },
    {
      name: 'Kesari Malpua Rabri',
      tag: 'Palace Confection',
      desc: 'Delicate cardamom pancakes dipped in saffron sugar syrup, topped with slow-reduced creamy pistachio rabri and 24k silver leaf.',
      price: '₹950',
    },
  ];

  const spaTreatments = [
    {
      name: 'Royal Shirodhara & Abhyanga',
      duration: '90 Mins',
      desc: 'Continuous stream of warm herbal Brahmi oil poured rhythmically over the third eye, accompanied by full-body lymphatic herbal massage.',
      price: '₹7,500',
    },
    {
      name: 'Jaisalmer Sandalwood Ubtan Polish',
      duration: '60 Mins',
      desc: 'Exfoliation with pure Mysore sandalwood powder, desert saffron threads, turmeric, and almond paste to restore radiant palatial glow.',
      price: '₹5,800',
    },
    {
      name: 'Thar Desert Herbal Floral Soak',
      duration: '45 Mins',
      desc: 'Private outdoor stone tub infused with freshly picked frangipani blossoms, sweet almond milk, and rose water amidst evening desert breezes.',
      price: '₹4,200',
    },
  ];

  return (
    <section id="dining" className="py-24 px-6 md:px-12 bg-stone-925 text-stone-100">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs tracking-[0.25em] uppercase text-amber-400 font-mono mb-2">
              CHAPTERS 04 & 05 · FLAVORS & HEALING
            </div>
            <h2 className="font-serif text-3xl md:text-5xl font-light tracking-wide text-stone-100">
              Sonar Qila Dining & Mudra Spa
            </h2>
          </div>

          {/* Tab Selector */}
          <div className="flex items-center gap-1 p-1 bg-stone-900 rounded-lg border border-stone-800">
            <button
              onClick={() => setActiveTab('dining')}
              className={`px-4 py-2 text-xs font-medium tracking-wider uppercase rounded-md transition-all cursor-pointer ${
                activeTab === 'dining'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 shadow-sm'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              Sonar Qila Dining
            </button>
            <button
              onClick={() => setActiveTab('spa')}
              className={`px-4 py-2 text-xs font-medium tracking-wider uppercase rounded-md transition-all cursor-pointer ${
                activeTab === 'spa'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 shadow-sm'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              Mudra Desert Spa
            </button>
          </div>
        </div>

        {/* Content Box */}
        {activeTab === 'dining' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Visual Panel */}
            <div className="lg:col-span-5 relative rounded-xl overflow-hidden min-h-[350px] bg-stone-900">
              <img
                src="/assets/aistudio/frame_05.jpg"
                alt="Sonar Qila Dining"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-[11px] font-mono tracking-widest text-amber-400 uppercase">
                  ATMOSPHERE & CELLAR
                </span>
                <h3 className="font-serif text-2xl text-stone-100 font-normal mt-1">
                  Candlelit Mirrors & Desert Sitar
                </h3>
                <p className="text-xs text-stone-300 font-light mt-1.5 leading-relaxed">
                  Dine beneath soaring archways as master Manganiyar and sitar musicians serenade your evening under Jaisalmer’s starlit desert sky.
                </p>
              </div>
            </div>

            {/* Menu Highlights List */}
            <div className="lg:col-span-7 flex flex-col justify-between bg-stone-900/50 p-6 md:p-8 rounded-xl border border-stone-800">
              <div>
                <div className="flex items-center justify-between pb-4 mb-6 border-b border-stone-800 text-xs font-mono uppercase tracking-wider text-stone-400">
                  <span>Jaisalmeri Degustation Highlights</span>
                  <span className="text-amber-400">Dinner Service 7:00 PM – 11:30 PM</span>
                </div>

                <div className="space-y-6">
                  {menuHighlights.map((item, idx) => (
                    <div key={idx} className="group">
                      <div className="flex items-baseline justify-between gap-4 mb-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-serif text-lg md:text-xl text-stone-100 group-hover:text-amber-300 transition-colors">
                            {item.name}
                          </h4>
                          <span className="text-[10px] uppercase font-mono tracking-wider text-amber-400/80">
                            {item.tag}
                          </span>
                        </div>
                        <span className="font-mono text-sm text-amber-300 font-medium">
                          {item.price}
                        </span>
                      </div>
                      <p className="text-xs text-stone-400 leading-relaxed font-light">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-stone-800 flex items-center justify-between">
                <span className="text-xs text-stone-400 font-light">
                  Dietary preferences & royal private dining setup available upon request.
                </span>
                <button
                  onClick={onOpenBooking}
                  className="px-4 py-2 rounded bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs tracking-wider uppercase font-medium transition-all cursor-pointer whitespace-nowrap"
                >
                  Reserve Table
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Visual Panel */}
            <div className="lg:col-span-5 relative rounded-xl overflow-hidden min-h-[350px] bg-stone-900">
              <img
                src="/assets/aistudio/frame_03.jpg"
                alt="Mudra Ayurvedic Spa"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-[11px] font-mono tracking-widest text-amber-400 uppercase">
                  ANCIENT SCIENCE OF LIFE
                </span>
                <h3 className="font-serif text-2xl text-stone-100 font-normal mt-1">
                  Mudra Ayurvedic Sanctuary
                </h3>
                <p className="text-xs text-stone-300 font-light mt-1.5 leading-relaxed">
                  Certified Vaidyas (Ayurvedic physicians) prepare bespoke oils from handpicked Himalayan herbs, sesame, and wild saffron.
                </p>
              </div>
            </div>

            {/* Spa Highlights List */}
            <div className="lg:col-span-7 flex flex-col justify-between bg-stone-900/50 p-6 md:p-8 rounded-xl border border-stone-800">
              <div>
                <div className="flex items-center justify-between pb-4 mb-6 border-b border-stone-800 text-xs font-mono uppercase tracking-wider text-stone-400">
                  <span>Curated Ayurvedic Rituals</span>
                  <span className="text-amber-400">Open Daily 8:00 AM – 8:00 PM</span>
                </div>

                <div className="space-y-6">
                  {spaTreatments.map((item, idx) => (
                    <div key={idx} className="group">
                      <div className="flex items-baseline justify-between gap-4 mb-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-serif text-lg md:text-xl text-stone-100 group-hover:text-amber-300 transition-colors">
                            {item.name}
                          </h4>
                          <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400">
                            {item.duration}
                          </span>
                        </div>
                        <span className="font-mono text-sm text-amber-300 font-medium">
                          {item.price}
                        </span>
                      </div>
                      <p className="text-xs text-stone-400 leading-relaxed font-light">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-stone-800 flex items-center justify-between">
                <span className="text-xs text-stone-400 font-light">
                  Includes pre-treatment herbal tea consultation and steam pavilion pass.
                </span>
                <button
                  onClick={onOpenBooking}
                  className="px-4 py-2 rounded bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs tracking-wider uppercase font-medium transition-all cursor-pointer whitespace-nowrap"
                >
                  Book Therapy
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
