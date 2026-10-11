import React from 'react';
import { ActivePage } from '../types';
import { Code2, Clock } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: ActivePage) => void;
  onOpenClock: () => void;
  onOpenSourceCode?: () => void;
}

export function Footer({ onNavigate, onOpenClock, onOpenSourceCode }: FooterProps) {
  return (
    <footer className="mt-16 border-t border-[#342215]/60 bg-[#120a06]/90 backdrop-blur-md text-[#d5c2af]" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Minimal Brand */}
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#c7864e] shadow-xs shadow-[#c7864e]/50 animate-pulse" />
            <span className="text-sm font-extrabold tracking-tight bg-gradient-to-r from-[#faeedd] via-[#e5c199] to-[#c79460] bg-clip-text text-transparent">
              منصة دراستي
            </span>
          </div>

          {/* Minimal Clean Nav */}
          <nav className="flex flex-wrap items-center justify-center gap-5 text-xs text-[#b89b80]">
            <button
              onClick={() => {
                onNavigate('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-[#faeedd] transition-colors cursor-pointer"
            >
              الرئيسية
            </button>
            <button
              onClick={() => {
                onNavigate('materials');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-[#faeedd] transition-colors cursor-pointer"
            >
              المواد والمقررات
            </button>
            <button
              onClick={() => {
                onNavigate('plans');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-[#faeedd] transition-colors cursor-pointer"
            >
              المهام والجدول
            </button>
            <button
              onClick={() => {
                onNavigate('summaries');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-[#faeedd] transition-colors cursor-pointer"
            >
              الملخصات
            </button>
            <button
              onClick={onOpenClock}
              className="hover:text-[#faeedd] transition-colors cursor-pointer flex items-center gap-1 text-[#d8a474]"
            >
              <Clock className="w-3.5 h-3.5" />
              <span>ساعة المذاكرة</span>
            </button>
            {onOpenSourceCode && (
              <button
                onClick={onOpenSourceCode}
                className="hover:text-[#faeedd] text-[#c7864e] transition-colors cursor-pointer flex items-center gap-1 font-semibold"
              >
                <Code2 className="w-3.5 h-3.5" />
                <span>الكود</span>
              </button>
            )}
          </nav>
        </div>
      </div>
    </footer>
  );
}
