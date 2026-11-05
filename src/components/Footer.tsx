import React from 'react';
import { Compass, MapPin, Phone, Mail } from 'lucide-react';

interface FooterProps {
  onOpenBooking: () => void;
  onOpenTechModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking, onOpenTechModal }) => {
  return (
    <footer className="bg-stone-950 border-t border-stone-800 text-stone-400 py-16 px-6 md:px-12 text-xs">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-stone-850">
        {/* Brand & Ethos */}
        <div className="md:col-span-5 space-y-4">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-amber-400 rounded-full inline-block"></span>
            <span className="font-serif text-2xl tracking-[0.2em] uppercase text-stone-100 font-medium">
              Aunkar Singh
            </span>
          </div>
          <p className="text-stone-400 leading-relaxed max-w-sm font-light">
            A sanctuary of royal Marwari palatial grandeur rising amidst the golden Thar desert of Jaisalmer. Dedicated to preserving Rajput heritage, quiet desert luxury, and the sacred spirit of Atithi Devo Bhava.
          </p>
          <div className="flex items-center gap-2 text-[11px] font-mono text-amber-400/90 pt-1">
            <MapPin className="w-3.5 h-3.5" />
            <span>Near Sam Sand Dunes, Fort View Road, Jaisalmer, Rajasthan 345001</span>
          </div>
        </div>

        {/* Quick Nav */}
        <div className="md:col-span-3 space-y-3">
          <h4 className="font-mono text-[11px] tracking-widest uppercase text-stone-200">
            Resort Realms
          </h4>
          <ul className="space-y-2">
            <li>
              <a href="#arrival" className="hover:text-amber-300 transition-colors">
                The Arrival Walkthrough
              </a>
            </li>
            <li>
              <a href="#chapters" className="hover:text-amber-300 transition-colors">
                The 6 Palace Chapters
              </a>
            </li>
            <li>
              <a href="#suites" className="hover:text-amber-300 transition-colors">
                Aunkar Singh Haveli Suites
              </a>
            </li>
            <li>
              <a href="#dining" className="hover:text-amber-300 transition-colors">
                Sonar Qila Dining & Bar
              </a>
            </li>
            <li>
              <button
                onClick={onOpenTechModal}
                className="text-amber-400 hover:text-amber-300 transition-colors cursor-pointer text-left"
              >
                Engine Documentation & Specs
              </button>
            </li>
          </ul>
        </div>

        {/* Reservations & Contact */}
        <div className="md:col-span-4 space-y-3">
          <h4 className="font-mono text-[11px] tracking-widest uppercase text-stone-200">
            Concierge & Bookings
          </h4>
          <p className="text-stone-400 font-light leading-relaxed">
            Our royal desert concierge desk is at your service 24 hours a day for bespoke airport / desert welcomes, private dune safaris, and palace weddings.
          </p>
          <div className="space-y-1.5 pt-1 text-stone-300">
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>+91 (2992) 252-800 / 801</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-amber-400" />
              <span>concierge@aunkarsinghpalace.com</span>
            </div>
          </div>
          <div className="pt-2">
            <button
              onClick={onOpenBooking}
              className="px-4 py-2 rounded-lg bg-amber-500/15 border border-amber-500/40 text-amber-300 hover:bg-amber-500/25 transition-all text-xs tracking-wider uppercase font-medium cursor-pointer"
            >
              Plan Your Stay
            </button>
          </div>
        </div>
      </div>

      {/* Copyright Line */}
      <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-stone-500">
        <div>
          © {new Date().getFullYear()} Aunkar Singh Palace & Resort. Jaisalmer, Rajasthan. All Rights Reserved.
        </div>
        <div className="flex items-center gap-6">
          <span>Privacy Policy</span>
          <span className="text-stone-700">·</span>
          <span>Terms of Royal Hospitality</span>
          <span className="text-stone-700">·</span>
          <span>Crafted with 60FPS Canvas Scrub Engine</span>
        </div>
      </div>
    </footer>
  );
};
