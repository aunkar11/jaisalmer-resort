import React, { useState } from 'react';
import { X, Calendar, Users, CheckCircle, Sparkles, Shield, ArrowRight } from 'lucide-react';
import { SuiteOption, SUITES_DATA } from './SuitesShowcase';
import { calculateStayPrice } from '../utils/scrollMath';

interface ReservationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedSuite?: SuiteOption | null;
}

export const ReservationDrawer: React.FC<ReservationDrawerProps> = ({
  isOpen,
  onClose,
  selectedSuite,
}) => {
  const [suiteId, setSuiteId] = useState(selectedSuite?.id || SUITES_DATA[0].id);
  const [nights, setNights] = useState(2);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [includeBreakfast, setIncludeBreakfast] = useState(true);
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  // Keep synced if user clicked a specific suite
  React.useEffect(() => {
    if (selectedSuite) {
      setSuiteId(selectedSuite.id);
    }
  }, [selectedSuite]);

  if (!isOpen) return null;

  const currentSuite = SUITES_DATA.find((s) => s.id === suiteId) || SUITES_DATA[0];
  const pricing = calculateStayPrice(
    nights,
    adults + children,
    currentSuite.ratePerNight,
    includeBreakfast
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName || !guestEmail || !guestPhone) return;

    const randomRef = 'AS-' + Math.floor(100000 + Math.random() * 900000);
    setBookingRef(randomRef);
    setIsConfirmed(true);
  };

  const handleReset = () => {
    setIsConfirmed(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
      />

      {/* Drawer Container */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-lg bg-stone-925 border-l border-stone-800 text-stone-100 p-6 md:p-8 flex flex-col justify-between overflow-y-auto shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between pb-6 border-b border-stone-800">
            <div>
              <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-amber-400">
                AUNKAR SINGH PALACE & RESORT · JAISALMER
              </span>
              <h3 className="font-serif text-2xl text-stone-100 font-normal mt-0.5">
                Royal Reservation
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-stone-400 hover:text-white rounded-lg hover:bg-stone-900 transition-colors cursor-pointer"
              aria-label="Close reservation drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {isConfirmed ? (
            /* Confirmation Voucher Screen */
            <div className="py-12 flex flex-col items-center text-center my-auto">
              <div className="w-16 h-16 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center mb-6">
                <CheckCircle className="w-8 h-8" />
              </div>

              <span className="text-xs font-mono uppercase tracking-[0.25em] text-amber-400">
                RESERVATION CONFIRMED
              </span>
              <h4 className="font-serif text-3xl text-stone-100 font-light mt-2 mb-1">
                Khammaghani, {guestName}!
              </h4>
              <p className="text-xs text-stone-400 max-w-xs mb-6">
                Your royal itinerary at Aunkar Singh Palace, Jaisalmer has been secured. A confirmation email and private desert chauffeur details have been sent to {guestEmail}.
              </p>

              {/* Voucher Card */}
              <div className="w-full bg-stone-900/80 rounded-xl border border-stone-800 p-5 text-left text-xs space-y-3 mb-8">
                <div className="flex justify-between border-b border-stone-800 pb-2">
                  <span className="text-stone-400">Booking Reference</span>
                  <span className="font-mono text-amber-300 font-semibold">{bookingRef}</span>
                </div>
                <div className="flex justify-between border-b border-stone-800 pb-2">
                  <span className="text-stone-400">Suite</span>
                  <span className="text-stone-200">{currentSuite.name}</span>
                </div>
                <div className="flex justify-between border-b border-stone-800 pb-2">
                  <span className="text-stone-400">Duration</span>
                  <span className="text-stone-200">{nights} Nights ({adults} Guests)</span>
                </div>
                <div className="flex justify-between border-b border-stone-800 pb-2">
                  <span className="text-stone-400">Total Amount</span>
                  <span className="font-serif text-base text-amber-300 font-medium">
                    ₹{pricing.grandTotal.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="text-[11px] text-amber-400/90 pt-1">
                  ✓ Complimentary airport pickup & royal garland welcome included
                </div>
              </div>

              <button
                onClick={handleReset}
                className="w-full py-3 rounded-lg text-xs font-semibold tracking-wider uppercase text-stone-950 bg-gradient-to-r from-amber-300 to-amber-500 hover:from-amber-400 hover:to-amber-500 transition-all cursor-pointer"
              >
                Return to Palace Tour
              </button>
            </div>
          ) : (
            /* Booking Form */
            <form onSubmit={handleSubmit} className="py-6 space-y-6 flex-grow">
              {/* Suite Selection */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-stone-400 mb-2">
                  Select Suite / Haveli
                </label>
                <select
                  value={suiteId}
                  onChange={(e) => setSuiteId(e.target.value)}
                  className="w-full bg-stone-900 border border-stone-800 rounded-lg px-4 py-3 text-xs text-stone-200 focus:outline-none focus:border-amber-500"
                >
                  {SUITES_DATA.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name} — ₹{s.ratePerNight.toLocaleString('en-IN')} / night
                    </option>
                  ))}
                </select>
              </div>

              {/* Stay length & Guests */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-stone-400 mb-2">
                    Nights
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="14"
                    value={nights}
                    onChange={(e) => setNights(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-full bg-stone-900 border border-stone-800 rounded-lg px-4 py-2.5 text-xs text-stone-200 focus:outline-none focus:border-amber-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-stone-400 mb-2">
                    Adult Guests
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="6"
                    value={adults}
                    onChange={(e) => setAdults(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-full bg-stone-900 border border-stone-800 rounded-lg px-4 py-2.5 text-xs text-stone-200 focus:outline-none focus:border-amber-500"
                    required
                  />
                </div>
              </div>

              {/* Guest Details */}
              <div className="space-y-4 pt-2">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-stone-400 mb-1.5">
                    Primary Guest Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Maharaja Vikramaditya / Elena Rossi"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="w-full bg-stone-900 border border-stone-800 rounded-lg px-4 py-2.5 text-xs text-stone-200 focus:outline-none focus:border-amber-500 placeholder-stone-600"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-stone-400 mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="guest@luxury.com"
                      value={guestEmail}
                      onChange={(e) => setGuestEmail(e.target.value)}
                      className="w-full bg-stone-900 border border-stone-800 rounded-lg px-4 py-2.5 text-xs text-stone-200 focus:outline-none focus:border-amber-500 placeholder-stone-600"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-stone-400 mb-1.5">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={guestPhone}
                      onChange={(e) => setGuestPhone(e.target.value)}
                      className="w-full bg-stone-900 border border-stone-800 rounded-lg px-4 py-2.5 text-xs text-stone-200 focus:outline-none focus:border-amber-500 placeholder-stone-600"
                      required
                    />
                  </div>
                </div>

                {/* Special Inclusions Checkbox */}
                <div className="pt-2">
                  <label className="flex items-center gap-3 p-3 rounded-lg bg-stone-900 border border-stone-800 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={includeBreakfast}
                      onChange={(e) => setIncludeBreakfast(e.target.checked)}
                      className="accent-amber-400 w-4 h-4 cursor-pointer"
                    />
                    <div className="text-xs">
                      <span className="text-stone-200 font-medium block">
                        Include Sonar Qila Royal Breakfast
                      </span>
                      <span className="text-stone-400 text-[11px]">
                        ₹1,200 / guest / night with live classical music
                      </span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="p-4 rounded-xl bg-stone-900/60 border border-stone-800/80 space-y-2 text-xs">
                <div className="flex justify-between text-stone-400">
                  <span>{currentSuite.name} ({nights} nights)</span>
                  <span>₹{pricing.baseTotal.toLocaleString('en-IN')}</span>
                </div>
                {includeBreakfast && (
                  <div className="flex justify-between text-stone-400">
                    <span>Royal Breakfast Buffet</span>
                    <span>₹{pricing.breakfastFee.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between text-stone-400">
                  <span>GST & Luxury Hospitality Tax (18%)</span>
                  <span>₹{pricing.taxFee.toLocaleString('en-IN')}</span>
                </div>
                <div className="pt-2 border-t border-stone-800 flex justify-between items-baseline font-medium">
                  <span className="text-stone-200 uppercase tracking-wider font-mono text-[11px]">
                    Total Investment
                  </span>
                  <span className="font-serif text-xl text-amber-300 tabular-nums">
                    ₹{pricing.grandTotal.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-3.5 rounded-lg text-xs font-semibold tracking-wider uppercase text-stone-950 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-500 transition-all cursor-pointer shadow-lg shadow-amber-950/30 flex items-center justify-center gap-2"
              >
                <span>Confirm & Request Royal Welcome</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* Footer note */}
          <div className="pt-4 border-t border-stone-800/80 text-[11px] text-stone-500 text-center">
            Free cancellation up to 48 hours before arrival · Best Rate Guarantee
          </div>
        </div>
      </div>
    </div>
  );
};
