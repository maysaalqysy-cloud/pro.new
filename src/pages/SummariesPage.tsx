import React, { useState } from 'react';
import { StudySummary } from '../types';
import { 
  FileEdit, 
  Plus, 
  Save, 
  Trash2, 
  Copy, 
  Download, 
  Printer, 
  Search, 
  Check, 
  Clock, 
  BookMarked,
  Code,
  Heading1,
  Heading2,
  List,
  Bold,
  Italic,
  Quote,
  Terminal,
  Eye,
  FileCode
} from 'lucide-react';

interface SummariesPageProps {
  summaries: StudySummary[];
  onUpdateSummaries: (summaries: StudySummary[]) => void;
}

export function SummariesPage({ summaries, onUpdateSummaries }: SummariesPageProps) {
  const [selectedSummaryId, setSelectedSummaryId] = useState<string>(summaries[0]?.id || '');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<string>('الكل');
  const [activeMode, setActiveMode] = useState<'edit' | 'preview'>('edit');
  const [copiedAlert, setCopiedAlert] = useState(false);
  const [savedAlert, setSavedAlert] = useState(false);

  // Active summary
  const currentSummary = summaries.find((s) => s.id === selectedSummaryId) || summaries[0];

  // Editor states
  const [editTitle, setEditTitle] = useState(currentSummary?.title || '');
  const [editSubject, setEditSubject] = useState(currentSummary?.subject || '');
  const [editDoctor, setEditDoctor] = useState(currentSummary?.doctorName || '');
  const [editContent, setEditContent] = useState(currentSummary?.content || '');
  const [editTags, setEditTags] = useState(currentSummary?.tags.join(', ') || '');

  // When selected summary changes
  const handleSelectSummary = (summary: StudySummary) => {
    setSelectedSummaryId(summary.id);
    setEditTitle(summary.title);
    setEditSubject(summary.subject);
    setEditDoctor(summary.doctorName || '');
    setEditContent(summary.content);
    setEditTags(summary.tags.join(', '));
  };

  // Word count & read time
  const wordsCount = editContent.trim() ? editContent.trim().split(/\s+/).length : 0;
  const readTime = Math.max(1, Math.ceil(wordsCount / 180));

  // Save current summary
  const handleSave = () => {
    if (!currentSummary) return;
    const updated = summaries.map((s) => {
      if (s.id === currentSummary.id) {
        return {
          ...s,
          title: editTitle.trim() || 'ملخص برمجي بدون عنوان',
          subject: editSubject.trim() || 'علوم الحاسوب',
          doctorName: editDoctor.trim() || undefined,
          content: editContent,
          tags: editTags.split(',').map((t) => t.trim()).filter(Boolean),
          lastModified: new Date().toISOString().split('T')[0],
          readTimeMinutes: readTime,
        };
      }
      return s;
    });
    onUpdateSummaries(updated);
    setSavedAlert(true);
    setTimeout(() => setSavedAlert(false), 2500);
  };

  // Create new summary
  const handleCreateNew = () => {
    const newSummary: StudySummary = {
      id: `sum-${Date.now()}`,
      title: 'ملخص برمجي جديد: تصميم الأنظمة والأنماط',
      subject: 'هندسة البرمجيات',
      content: `# ملخص مساق هندسة البرمجيات\n\n## 1. أهم المفاهيم والمعايير\n- دوّن الملاحظة المعمارية الأولى هنا...\n- مثال كود برمجيات نظيفة:\n\`\`\`typescript\ninterface Repository<T> {\n  findById(id: string): Promise<T>;\n  save(entity: T): Promise<void>;\n}\n\`\`\`\n\n> نصيحة للاختبار: ركز على فصل طبقات العرض عن منطق العمل (Domain Logic).`,
      tags: ['هندسة_برمجيات', 'تصميم', 'SOLID'],
      lastModified: new Date().toISOString().split('T')[0],
      readTimeMinutes: 2,
    };
    const updated = [newSummary, ...summaries];
    onUpdateSummaries(updated);
    setSelectedSummaryId(newSummary.id);
    setEditTitle(newSummary.title);
    setEditSubject(newSummary.subject);
    setEditContent(newSummary.content);
    setEditTags(newSummary.tags.join(', '));
    setActiveMode('edit');
  };

  // Delete summary
  const handleDelete = () => {
    if (!currentSummary) return;
    if (confirm('هل أنت متأكد من حذف هذا الملخص البرمجي؟')) {
      const remaining = summaries.filter((s) => s.id !== currentSummary.id);
      onUpdateSummaries(remaining);
      if (remaining.length > 0) {
        handleSelectSummary(remaining[0]);
      } else {
        setSelectedSummaryId('');
        setEditTitle('');
        setEditSubject('');
        setEditContent('');
        setEditTags('');
      }
    }
  };

  // Formatting tool helpers
  const insertFormatting = (prefix: string, suffix: string = '') => {
    const textarea = document.getElementById('summary-editor-textarea') as HTMLTextAreaElement | null;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = editContent.substring(start, end);
    const replacement = prefix + selected + suffix;

    const newText = editContent.substring(0, start) + replacement + editContent.substring(end);
    setEditContent(newText);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, end + prefix.length);
    }, 10);
  };

  // Copy to clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(`${editTitle}\nالمساق: ${editSubject}\n\n${editContent}`);
    setCopiedAlert(true);
    setTimeout(() => setCopiedAlert(false), 2000);
  };

  // Download markdown
  const handleDownload = () => {
    const blob = new Blob([`# ${editTitle}\nالمساق: ${editSubject}\n\n${editContent}`], {
      type: 'text/markdown;charset=utf-8',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${editTitle.replace(/\s+/g, '_')}.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Filter summaries list
  const filteredSummaries = summaries.filter((s) => {
    const matchesSearch =
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesSubject = selectedSubject === 'الكل' || s.subject === selectedSubject;
    return matchesSearch && matchesSubject;
  });

  const subjectsList = ['الكل', ...Array.from(new Set(summaries.map((s) => s.subject)))];

  return (
    <div className="space-y-8" dir="rtl">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#caa074] mb-1">
            <FileCode className="w-4 h-4 text-[#d89659]" />
            <span>محرر الملخصات والتوثيق البرمجي</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
            <span className="bg-gradient-to-r from-[#fef5ea] via-[#e6c29a] to-[#ca9762] bg-clip-text text-transparent">
              كتابة وتنسيق الملخصات التقنية
            </span>
          </h1>
          <p className="text-sm text-[#bda189] mt-1 font-medium">
            وثّق قوانين الخوارزميات، معماريات البرمجيات، مبادئ SOLID واستعلامات قواعد البيانات في بيئة مريحة
          </p>
        </div>

        <button
          onClick={handleCreateNew}
          className="flex items-center justify-center gap-2 px-5 py-3 text-sm font-bold text-[#faf3e8] bg-gradient-to-r from-[#8a5223] to-[#693b16] hover:from-[#9c5f2b] hover:to-[#7b461c] rounded-xl transition-all shadow-md shadow-[#4a2b13]/25 cursor-pointer whitespace-nowrap self-start sm:self-auto border border-[#b87d47]/30"
        >
          <Plus className="w-4 h-4 text-[#fceddb]" />
          <span>+ ملخص برمجي جديد</span>
        </button>
      </div>

      {/* MAIN TWO-COLUMN WORKSPACE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* SIDEBAR: SUMMARIES LIST (Warm Beige Card on Dark Brown Canvas) */}
        <div className="lg:col-span-4 bg-[#faf5ed] rounded-2xl border border-[#e4d3bf] p-4 shadow-md shadow-black/15 text-[#2c190e] space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 text-[#8a5d3b] absolute right-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث في الملخصات أو الوسوم..."
              className="w-full pl-3 pr-9 py-2 bg-[#f5ede0] border border-[#d8c3ad] rounded-xl text-xs text-[#2c190e] placeholder-[#8a6850] focus:outline-hidden focus:border-[#8f5424]"
            />
          </div>

          {/* Subjects filter dropdown */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-[#6d4d35] font-bold shrink-0">المساق:</span>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="w-full px-2.5 py-1.5 bg-[#f5ede0] border border-[#d8c3ad] rounded-lg text-xs text-[#2c190e] focus:outline-hidden"
            >
              {subjectsList.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          {/* Summaries list */}
          <div className="space-y-2 max-h-[560px] overflow-y-auto pr-1">
            {filteredSummaries.length === 0 ? (
              <p className="text-center text-xs text-[#7d5c43] py-8">لا توجد ملخصات مطابقة</p>
            ) : (
              filteredSummaries.map((s) => {
                const isSelected = s.id === currentSummary?.id;
                return (
                  <button
                    key={s.id}
                    onClick={() => handleSelectSummary(s)}
                    className={`w-full text-right p-3 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#f0e2d1] border-[#b88554] shadow-xs'
                        : 'bg-[#faf5ed] border-[#ebd9c6] hover:bg-[#f6ecde]'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs text-[#7a5840] mb-1">
                      <span className="font-bold text-[#8f5424]">{s.subject}</span>
                      <span className="font-mono text-xs">{s.readTimeMinutes} د قراءة</span>
                    </div>
                    <h4 className="font-bold text-xs sm:text-sm text-[#2b180d] leading-snug line-clamp-1 mb-1.5">
                      {s.title}
                    </h4>
                    <p className="text-xs text-[#6a4c35] line-clamp-2 leading-relaxed">
                      {s.content.replace(/[#*`>-]/g, '').trim()}
                    </p>
                    <div className="flex items-center gap-1.5 mt-2 text-xs text-[#8a6850]">
                      <span>آخر تعديل: {s.lastModified}</span>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* MAIN EDITOR / VIEWER PANEL (Warm Beige Card on Dark Brown Canvas) */}
        <div className="lg:col-span-8 bg-[#faf5ed] rounded-2xl border border-[#e4d3bf] p-6 shadow-md shadow-black/15 text-[#2c190e] space-y-6">
          {currentSummary ? (
            <>
              {/* TOP ACTIONS & METADATA BAR */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#ebd8c4]">
                {/* Mode toggle (Edit vs Preview) */}
                <div className="flex items-center gap-1 p-1 bg-[#ede0ce] rounded-xl self-start">
                  <button
                    onClick={() => setActiveMode('edit')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      activeMode === 'edit'
                        ? 'bg-[#faf5ed] text-[#2c190e] shadow-xs'
                        : 'text-[#6a4b33] hover:text-[#2c190e]'
                    }`}
                  >
                    <FileEdit className="w-3.5 h-3.5" />
                    <span>محرر وتنسيق</span>
                  </button>
                  <button
                    onClick={() => setActiveMode('preview')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      activeMode === 'preview'
                        ? 'bg-[#faf5ed] text-[#2c190e] shadow-xs'
                        : 'text-[#6a4b33] hover:text-[#2c190e]'
                    }`}
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>معاينة الملخص</span>
                  </button>
                </div>

                {/* Primary Action Buttons */}
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-[#8a5223] to-[#693b16] hover:from-[#9c5f2b] hover:to-[#7b461c] text-[#faf3e8] rounded-xl text-xs font-bold shadow-xs cursor-pointer"
                    title="حفظ التعديلات في التخزين المحلي"
                  >
                    <Save className="w-3.5 h-3.5 text-[#fceddb]" />
                    <span>حفظ التعديلات</span>
                  </button>

                  <button
                    onClick={handleCopy}
                    className="p-2 text-[#5a3a23] bg-[#ede0ce] hover:bg-[#e4d3bf] rounded-xl transition-colors cursor-pointer"
                    title="نسخ محتوى الملخص"
                  >
                    <Copy className="w-4 h-4" />
                  </button>

                  <button
                    onClick={handleDownload}
                    className="p-2 text-[#5a3a23] bg-[#ede0ce] hover:bg-[#e4d3bf] rounded-xl transition-colors cursor-pointer"
                    title="تصدير كملف Markdown (.md)"
                  >
                    <Download className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => window.print()}
                    className="p-2 text-[#5a3a23] bg-[#ede0ce] hover:bg-[#e4d3bf] rounded-xl transition-colors cursor-pointer"
                    title="طباعة الملخص"
                  >
                    <Printer className="w-4 h-4" />
                  </button>

                  <button
                    onClick={handleDelete}
                    className="p-2 text-red-700 bg-red-50 hover:bg-red-100 rounded-xl transition-colors cursor-pointer"
                    title="حذف هذا الملخص"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Status Alerts */}
              {savedAlert && (
                <div className="p-3 bg-[#e6d6c2] border border-[#c4ab91] text-[#331c0e] rounded-xl text-xs font-bold flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#8f5424]" />
                  <span>تم حفظ التعديلات بنجاح في متصفحك.</span>
                </div>
              )}
              {copiedAlert && (
                <div className="p-3 bg-[#e6d6c2] border border-[#c4ab91] text-[#331c0e] rounded-xl text-xs font-bold flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#8f5424]" />
                  <span>تم نسخ نص الملخص إلى الحافظة!</span>
                </div>
              )}

              {/* TITLE & SUBJECT & DOCTOR INPUTS */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#684931] mb-1">عنوان الملخص</label>
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    placeholder="عنوان الملخص التقني..."
                    className="w-full px-3.5 py-2.5 bg-[#f5ede0] border border-[#d8c3ad] rounded-xl text-sm font-bold text-[#2a170d] focus:outline-hidden focus:border-[#8f5424]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#684931] mb-1">المساق الأكاديمي</label>
                  <input
                    type="text"
                    value={editSubject}
                    onChange={(e) => setEditSubject(e.target.value)}
                    placeholder="هندسة البرمجيات..."
                    className="w-full px-3.5 py-2.5 bg-[#f5ede0] border border-[#d8c3ad] rounded-xl text-sm text-[#2a170d] focus:outline-hidden focus:border-[#8f5424]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#684931] mb-1">اسم الدكتور / أستاذ المادة</label>
                  <input
                    type="text"
                    value={editDoctor}
                    onChange={(e) => setEditDoctor(e.target.value)}
                    placeholder="مثال: د. ليلى الشريف"
                    className="w-full px-3.5 py-2.5 bg-[#f5ede0] border border-[#d8c3ad] rounded-xl text-sm text-[#2a170d] focus:outline-hidden focus:border-[#8f5424]"
                  />
                </div>
              </div>

              {/* MODE 1: EDIT MODE */}
              {activeMode === 'edit' && (
                <div className="space-y-3">
                  {/* Markdown Quick Toolbar */}
                  <div className="flex flex-wrap items-center gap-1.5 p-2 bg-[#f0e3d2] rounded-xl border border-[#ded0be] text-xs">
                    <button
                      type="button"
                      onClick={() => insertFormatting('# ')}
                      className="p-1.5 bg-[#faf5ed] hover:bg-[#ede0ce] text-[#3e2413] rounded-lg transition-colors cursor-pointer"
                      title="عنوان رئيسي H1"
                    >
                      <Heading1 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => insertFormatting('## ')}
                      className="p-1.5 bg-[#faf5ed] hover:bg-[#ede0ce] text-[#3e2413] rounded-lg transition-colors cursor-pointer"
                      title="عنوان فرعي H2"
                    >
                      <Heading2 className="w-3.5 h-3.5" />
                    </button>
                    <div className="w-px h-4 bg-[#d8c5b0] mx-1" />
                    <button
                      type="button"
                      onClick={() => insertFormatting('**', '**')}
                      className="p-1.5 bg-[#faf5ed] hover:bg-[#ede0ce] text-[#3e2413] rounded-lg transition-colors cursor-pointer"
                      title="خط عريض"
                    >
                      <Bold className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => insertFormatting('*', '*')}
                      className="p-1.5 bg-[#faf5ed] hover:bg-[#ede0ce] text-[#3e2413] rounded-lg transition-colors cursor-pointer"
                      title="خط مائل"
                    >
                      <Italic className="w-3.5 h-3.5" />
                    </button>
                    <div className="w-px h-4 bg-[#d8c5b0] mx-1" />
                    <button
                      type="button"
                      onClick={() => insertFormatting('- ')}
                      className="p-1.5 bg-[#faf5ed] hover:bg-[#ede0ce] text-[#3e2413] rounded-lg transition-colors cursor-pointer"
                      title="قائمة نقطية"
                    >
                      <List className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => insertFormatting('> ')}
                      className="p-1.5 bg-[#faf5ed] hover:bg-[#ede0ce] text-[#3e2413] rounded-lg transition-colors cursor-pointer"
                      title="اقتباس أو نصيحة"
                    >
                      <Quote className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => insertFormatting('```\n', '\n```')}
                      className="p-1.5 bg-[#faf5ed] hover:bg-[#ede0ce] text-[#3e2413] rounded-lg transition-colors cursor-pointer font-mono"
                      title="كتلة كود برمجي"
                    >
                      <Code className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Textarea */}
                  <textarea
                    id="summary-editor-textarea"
                    rows={16}
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    placeholder="اكتب تفاصيل الملخص التقني، الشروحات، الكود، والقوانين هنا..."
                    className="w-full p-4 bg-[#fbf8f2] border border-[#d8c3ad] rounded-2xl text-xs sm:text-sm text-[#2a170d] font-tajawal leading-relaxed focus:outline-hidden focus:border-[#8f5424] focus:ring-1 focus:ring-[#8f5424]"
                  />
                </div>
              )}

              {/* MODE 2: PREVIEW MODE */}
              {activeMode === 'preview' && (
                <div className="p-6 bg-[#fbf8f2] rounded-2xl border border-[#d8c3ad] min-h-[400px] text-[#2a170d] space-y-4">
                  <div className="pb-4 border-b border-[#ebd8c4]">
                    <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-[#8f5424] mb-1">
                      <span>{editSubject}</span>
                      {editDoctor && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span className="text-[#5c371d] bg-[#ebd8c4] px-1.5 py-0.5 rounded">👨‍🏫 د. {editDoctor}</span>
                        </>
                      )}
                      <span aria-hidden="true">·</span>
                      <span>{readTime} دقائق قراءة</span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-black">
                      <span className="bg-gradient-to-r from-[#201007] via-[#4d2813] to-[#804b22] bg-clip-text text-transparent">
                        {editTitle}
                      </span>
                    </h2>
                  </div>

                  {/* Rendered content */}
                  <div className="prose prose-stone max-w-none text-xs sm:text-sm leading-relaxed space-y-3">
                    {editContent.split('\n').map((line, idx) => {
                      if (line.startsWith('# ')) {
                        return (
                          <h1 key={idx} className="text-lg font-black text-[#231208] mt-4 mb-2">
                            {line.replace('# ', '')}
                          </h1>
                        );
                      }
                      if (line.startsWith('## ')) {
                        return (
                          <h2 key={idx} className="text-base font-bold text-[#452513] mt-3 mb-1">
                            {line.replace('## ', '')}
                          </h2>
                        );
                      }
                      if (line.startsWith('> ')) {
                        return (
                          <blockquote key={idx} className="p-3 bg-[#ede0ce] border-r-4 border-[#8f5424] rounded-lg text-[#351e10] my-2 text-xs font-semibold">
                            {line.replace('> ', '')}
                          </blockquote>
                        );
                      }
                      if (line.startsWith('```')) {
                        return null;
                      }
                      if (line.startsWith('- ')) {
                        return (
                          <li key={idx} className="list-disc list-inside text-[#493120] mr-2">
                            {line.replace('- ', '')}
                          </li>
                        );
                      }
                      if (line.trim().startsWith('|')) {
                        return (
                          <div key={idx} className="font-mono text-xs bg-[#efe2d2] p-1.5 rounded my-1 text-[#331c0e] overflow-x-auto">
                            {line}
                          </div>
                        );
                      }
                      if (!line.trim()) return <div key={idx} className="h-1.5" />;
                      return (
                        <p key={idx} className="text-[#3c2516]">
                          {line}
                        </p>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* BOTTOM META STRIP */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#ebd8c4] text-xs text-[#705039]">
                <div className="flex items-center gap-4">
                  <span>الكلمات: <strong className="font-mono text-[#2c190e]">{wordsCount}</strong></span>
                  <span aria-hidden="true">·</span>
                  <span>وقت القراءة المقدر: <strong className="font-mono text-[#2c190e]">{readTime} دقيقة</strong></span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="font-bold">الوسوم:</span>
                  <input
                    type="text"
                    value={editTags}
                    onChange={(e) => setEditTags(e.target.value)}
                    placeholder="خوارزميات, كود, امتحان"
                    className="px-2.5 py-1 bg-[#f5ede0] border border-[#d8c3ad] rounded-lg text-xs text-[#2c190e] focus:outline-hidden"
                  />
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-16 text-[#7d5c43]">
              <FileEdit className="w-12 h-12 text-[#9a643b] mx-auto mb-3" />
              <p className="font-bold">حدد ملخصاً من القائمة أو اضغط على «ملخص برمجي جديد»</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
