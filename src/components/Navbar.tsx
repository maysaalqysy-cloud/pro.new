import React, { useEffect, useState } from 'react';
import { ActivePage } from '../types';
import { Clock } from 'lucide-react';

interface NavbarProps {
  currentPage: ActivePage;
  onNavigate: (page: ActivePage) => void;
  onOpenClock: () => void;
}

export function Navbar({ currentPage, onNavigate, onOpenClock }: NavbarProps) {
  const [miniTime, setMiniTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setMiniTime(
        now.toLocaleTimeString('ar-EG', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-[#20140c]/95 backdrop-blur-md border-b border-[#3a2618] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Single text element wordmark with gradient typography */}
          <button
            onClick={() => onNavigate('home')}
            className="text-xl font-extrabold tracking-tight whitespace-nowrap shrink-0 transition-opacity hover:opacity-90"
          >
            <span className="bg-gradient-to-r from-[#fdf6ec] via-[#e9c79f] to-[#cf9b66] bg-clip-text text-transparent">
              منصة دراستي
            </span>
          </button>

          {/* Zone 2: 4 clean single-line text navigation links */}
          <nav className="flex items-center gap-6 sm:gap-8 text-sm font-medium text-[#d9c5b2]">
            <button
              onClick={() => onNavigate('home')}
              className={`hover:text-[#faeedd] transition-colors whitespace-nowrap shrink-0 relative py-1 ${
                currentPage === 'home' ? 'text-[#faeedd] font-bold' : ''
              }`}
            >
              الرئيسية
              {currentPage === 'home' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#d9a26c] to-[#f5ebd7] rounded-full" />
              )}
            </button>

            <button
              onClick={() => onNavigate('materials')}
              className={`hover:text-[#faeedd] transition-colors whitespace-nowrap shrink-0 relative py-1 ${
                currentPage === 'materials' ? 'text-[#faeedd] font-bold' : ''
              }`}
            >
              المواد والمقررات
              {currentPage === 'materials' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#d9a26c] to-[#f5ebd7] rounded-full" />
              )}
            </button>

            <button
              onClick={() => onNavigate('summaries')}
              className={`hover:text-[#faeedd] transition-colors whitespace-nowrap shrink-0 relative py-1 ${
                currentPage === 'summaries' ? 'text-[#faeedd] font-bold' : ''
              }`}
            >
              الملخصات البرمجية
              {currentPage === 'summaries' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#d9a26c] to-[#f5ebd7] rounded-full" />
              )}
            </button>

            <button
              onClick={() => onNavigate('plans')}
              className={`hover:text-[#faeedd] transition-colors whitespace-nowrap shrink-0 relative py-1 ${
                currentPage === 'plans' ? 'text-[#faeedd] font-bold' : ''
              }`}
            >
              الخطط والجداول
              {currentPage === 'plans' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#d9a26c] to-[#f5ebd7] rounded-full" />
              )}
            </button>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenClock}
              className="flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-bold text-[#faf3e8] bg-gradient-to-r from-[#9c6332] to-[#75441b] hover:from-[#ab713c] hover:to-[#854f21] rounded-xl shadow-xs transition-all whitespace-nowrap shrink-0 cursor-pointer border border-[#b87d47]/30"
              title="فتح ساعة التوقيت وبومودورو"
            >
              <Clock className="w-4 h-4 shrink-0 text-[#fdedd8]" />
              <span>ساعة المذاكرة</span>
              {miniTime && (
                <span className="hidden sm:inline-block font-mono text-[#fcedda] bg-black/25 px-1.5 py-0.5 rounded text-xs tabular-nums">
                  {miniTime}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
