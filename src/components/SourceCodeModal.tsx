import React, { useState } from 'react';
import { X, Copy, Download, Check, FileCode, Layers } from 'lucide-react';
import { STANDALONE_HTML, STANDALONE_CSS, STANDALONE_JS } from '../utils/standaloneCode';

interface SourceCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SourceCodeModal({ isOpen, onClose }: SourceCodeModalProps) {
  const [activeTab, setActiveTab] = useState<'html' | 'css' | 'js'>('html');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const currentCode =
    activeTab === 'html'
      ? STANDALONE_HTML
      : activeTab === 'css'
      ? STANDALONE_CSS
      : STANDALONE_JS;

  const currentFileName =
    activeTab === 'html'
      ? 'index.html'
      : activeTab === 'css'
      ? 'style.css'
      : 'script.js';

  const handleCopy = () => {
    navigator.clipboard.writeText(currentCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadFile = (fileName: string, content: string, mime: string) => {
    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDownloadAll = () => {
    handleDownloadFile('index.html', STANDALONE_HTML, 'text/html;charset=utf-8');
    setTimeout(() => {
      handleDownloadFile('style.css', STANDALONE_CSS, 'text/css;charset=utf-8');
    }, 200);
    setTimeout(() => {
      handleDownloadFile('script.js', STANDALONE_JS, 'text/javascript;charset=utf-8');
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#100905]/85 backdrop-blur-xs p-4" dir="rtl">
      <div className="bg-[#faf5ed] rounded-3xl max-w-4xl w-full shadow-2xl border border-[#decbb7] overflow-hidden flex flex-col max-h-[90vh] text-[#2c190e]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#ebd8c4] bg-[#f5ede0]">
          <div className="flex items-center gap-2">
            <FileCode className="w-5 h-5 text-[#8f5424]" />
            <div>
              <h2 className="text-base font-bold text-[#2a170d]">ملفات المشروع المستقلة (HTML / CSS / JS)</h2>
              <p className="text-xs text-[#705039]">مشروع كامل يعمل مباشرة في أي متصفح دون الحاجة لأي خادم أو تثبيت</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#7c5b43] hover:text-[#2c190e] hover:bg-[#ede0ce] rounded-xl transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab & Action Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-3 bg-[#ede0ce] border-b border-[#ded0bf]">
          <div className="flex items-center gap-1 font-bold">
            <button
              onClick={() => setActiveTab('html')}
              className={`px-4 py-1.5 text-xs rounded-xl transition-all cursor-pointer ${
                activeTab === 'html' ? 'bg-[#faf5ed] text-[#2c190e] shadow-xs' : 'text-[#6a4c35] hover:text-[#2c190e]'
              }`}
            >
              index.html
            </button>
            <button
              onClick={() => setActiveTab('css')}
              className={`px-4 py-1.5 text-xs rounded-xl transition-all cursor-pointer ${
                activeTab === 'css' ? 'bg-[#faf5ed] text-[#2c190e] shadow-xs' : 'text-[#6a4c35] hover:text-[#2c190e]'
              }`}
            >
              style.css
            </button>
            <button
              onClick={() => setActiveTab('js')}
              className={`px-4 py-1.5 text-xs rounded-xl transition-all cursor-pointer ${
                activeTab === 'js' ? 'bg-[#faf5ed] text-[#2c190e] shadow-xs' : 'text-[#6a4c35] hover:text-[#2c190e]'
              }`}
            >
              script.js
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#faf5ed] hover:bg-[#f3e7d6] text-[#331c0e] border border-[#d8c3ad] rounded-xl text-xs font-bold transition-colors shadow-xs cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[#8f5424]" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'تم النسخ!' : `نسخ كود ${currentFileName}`}</span>
            </button>

            <button
              onClick={() =>
                handleDownloadFile(
                  currentFileName,
                  currentCode,
                  activeTab === 'html' ? 'text/html' : activeTab === 'css' ? 'text/css' : 'text/javascript'
                )
              }
              className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-[#8a5223] to-[#693b16] text-[#faf3e8] rounded-xl text-xs font-bold transition-colors shadow-xs cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>تحميل {currentFileName}</span>
            </button>

            <button
              onClick={handleDownloadAll}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#3a2213] hover:bg-[#4b2d1a] text-[#faf3e8] rounded-xl text-xs font-bold transition-colors shadow-xs cursor-pointer"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>تحميل الملفات الثلاثة معاً</span>
            </button>
          </div>
        </div>

        {/* Code Viewer in Espresso Terminal */}
        <div className="flex-1 p-4 bg-[#1b1008] overflow-y-auto text-left" dir="ltr">
          <pre className="text-xs font-mono text-[#faecd8] leading-relaxed whitespace-pre-wrap select-all">
            {currentCode}
          </pre>
        </div>

        {/* Footer info */}
        <div className="px-6 py-3 bg-[#f5ede0] border-t border-[#ebd8c4] flex items-center justify-between text-xs text-[#705039]">
          <span>
            💡 <strong>طريقة التشغيل:</strong> احفظ الملفات الثلاثة في مجلد واحد وافتح ملف <code className="text-[#8f5424] font-mono font-bold">index.html</code> مباشرة بنقرتين في أي متصفح.
          </span>
          <button onClick={onClose} className="px-3.5 py-1 bg-[#ede0ce] hover:bg-[#e4d3bf] rounded-xl text-[#331c0e] font-bold cursor-pointer">
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
}
