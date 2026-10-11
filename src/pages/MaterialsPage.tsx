import React, { useState } from 'react';
import { StudyMaterial, UserSubject } from '../types';
import { 
  DownloadCloud, 
  Search, 
  Plus, 
  FileText, 
  Eye, 
  Download, 
  Trash2, 
  X, 
  Check, 
  Terminal, 
  BookOpen,
  GraduationCap,
  Edit3,
  User,
  Filter,
  Layers
} from 'lucide-react';

interface MaterialsPageProps {
  materials: StudyMaterial[];
  onUpdateMaterials: (materials: StudyMaterial[]) => void;
  subjects?: UserSubject[];
  onUpdateSubjects?: (subjects: UserSubject[]) => void;
}

export function MaterialsPage({ materials, onUpdateMaterials, subjects = [], onUpdateSubjects }: MaterialsPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<string>('الكل');
  const [selectedCategory, setSelectedCategory] = useState<string>('الكل');
  const [selectedDoctor, setSelectedDoctor] = useState<string>('الكل');

  // Preview modal state
  const [previewItem, setPreviewItem] = useState<StudyMaterial | null>(null);

  // Upload/Edit modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formTitle, setFormTitle] = useState('');
  const [formSubject, setFormSubject] = useState('هياكل البيانات والخوارزميات');
  const [customSubjectInput, setCustomSubjectInput] = useState('');
  const [formDoctor, setFormDoctor] = useState('');
  const [formCategory, setFormCategory] = useState<StudyMaterial['category']>('كتاب');
  const [formFileType, setFormFileType] = useState<'pdf' | 'docx' | 'pptx' | 'zip'>('pdf');
  const [formDescription, setFormDescription] = useState('');
  const [formSnippet, setFormSnippet] = useState('');
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  // Manage Subjects Modal
  const [isSubjectsModalOpen, setIsSubjectsModalOpen] = useState(false);
  const [newSubName, setNewSubName] = useState('');
  const [newSubCode, setNewSubCode] = useState('');
  const [newSubDoctor, setNewSubDoctor] = useState('');

  // Extract unique subjects & doctors from current materials and stored subjects
  const allSubjectNames = Array.from(
    new Set([
      ...materials.map((m) => m.subject),
      ...subjects.map((s) => s.name)
    ])
  ).filter(Boolean);

  const subjectsList = ['الكل', ...allSubjectNames];

  const allDoctorNames = Array.from(
    new Set([
      ...materials.map((m) => m.doctorName || m.author),
      ...subjects.map((s) => s.doctorName || '')
    ])
  ).filter(Boolean);

  const doctorsList = ['الكل', ...allDoctorNames];
  const categoriesList = ['الكل', 'كتاب', 'ملخص', 'أسئلة وتدريبات', 'عروض تقديمية', 'نماذج امتحانات'];

  // Filter materials
  const filteredMaterials = materials.filter((item) => {
    const itemDoctor = item.doctorName || item.author || '';
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      itemDoctor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubject = selectedSubject === 'الكل' || item.subject === selectedSubject;
    const matchesCategory = selectedCategory === 'الكل' || item.category === selectedCategory;
    const matchesDoctor = selectedDoctor === 'الكل' || itemDoctor === selectedDoctor;
    return matchesSearch && matchesSubject && matchesCategory && matchesDoctor;
  });

  // Download file blob
  const handleDownload = (material: StudyMaterial) => {
    const doctorDisplay = material.doctorName || material.author || 'دكتور المساق';
    const fileContent = `=== منصة دراستي الأكاديمية - هندسة البرمجيات وعلوم الحاسوب ===\nالعنوان: ${material.title}\nالمساق الأكاديمي: ${material.subject}\nأستاذ المادة / الدكتور: ${doctorDisplay}\nالتصنيف: ${material.category}\nتاريخ الرفع: ${material.uploadedDate}\nالحجم: ${material.fileSize}\n\nالوصف والملخص:\n${material.description}\n\nمقتطف من المحتوى الأكاديمي والبرمجي:\n${material.previewSnippet || 'تم تحميل هذا المستند الأكاديمي بنجاح من مكتبة منصة دراستي.'}\n`;
    const blob = new Blob([fileContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${material.title.replace(/\s+/g, '_')}.${material.fileType === 'pdf' ? 'txt' : material.fileType}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    // Increase download count
    const updated = materials.map((m) => {
      if (m.id === material.id) {
        return { ...m, downloadsCount: m.downloadsCount + 1 };
      }
      return m;
    });
    onUpdateMaterials(updated);
  };

  const handleDelete = (id: string) => {
    if (confirm('هل أنت متأكد من رغبتك في حذف هذا المقرر من المكتبة؟')) {
      const updated = materials.filter((m) => m.id !== id);
      onUpdateMaterials(updated);
      if (previewItem?.id === id) setPreviewItem(null);
      showAlert('تم حذف المقرر بنجاح');
    }
  };

  const showAlert = (msg: string) => {
    setAlertMessage(msg);
    setTimeout(() => setAlertMessage(null), 3000);
  };

  // Open modal for new item
  const openNewModal = () => {
    setEditingId(null);
    setFormTitle('');
    setFormSubject(allSubjectNames[0] || 'هياكل البيانات والخوارزميات');
    setCustomSubjectInput('');
    setFormDoctor(allDoctorNames[0] || '');
    setFormCategory('كتاب');
    setFormFileType('pdf');
    setFormDescription('');
    setFormSnippet('');
    setIsModalOpen(true);
  };

  // Open modal for editing
  const openEditModal = (item: StudyMaterial) => {
    setEditingId(item.id);
    setFormTitle(item.title);
    setFormSubject(item.subject);
    setCustomSubjectInput('');
    setFormDoctor(item.doctorName || item.author || '');
    setFormCategory(item.category);
    setFormFileType(item.fileType);
    setFormDescription(item.description);
    setFormSnippet(item.previewSnippet || '');
    setIsModalOpen(true);
  };

  const handleSaveMaterial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) return;

    const finalSubject = formSubject === '__custom__' && customSubjectInput.trim()
      ? customSubjectInput.trim()
      : formSubject;

    const finalDoctor = formDoctor.trim() || 'دكتور المساق';

    if (editingId) {
      // Update existing
      const updated = materials.map((m) => {
        if (m.id === editingId) {
          return {
            ...m,
            title: formTitle.trim(),
            subject: finalSubject,
            doctorName: finalDoctor,
            author: finalDoctor,
            category: formCategory,
            fileType: formFileType,
            description: formDescription.trim() || 'مرجع أكاديمي تم تحديثه من قبل الطالب.',
            previewSnippet: formSnippet.trim(),
          };
        }
        return m;
      });
      onUpdateMaterials(updated);
      showAlert('تم تعديل بيانات المقرر والدكتور بنجاح');
    } else {
      // Add new
      const newItem: StudyMaterial = {
        id: `mat-${Date.now()}`,
        title: formTitle.trim(),
        subject: finalSubject,
        doctorName: finalDoctor,
        author: finalDoctor,
        category: formCategory,
        fileSize: `${(Math.random() * 4 + 2).toFixed(1)} MB`,
        fileType: formFileType,
        downloadsCount: 1,
        uploadedDate: new Date().toISOString().split('T')[0],
        description: formDescription.trim() || 'مرجع أكاديمي تمت إضافته لمساقات علوم الحاسوب.',
        previewSnippet: formSnippet.trim() || 'مقتطف من المحتوى والتمارين البرمجية للمقرر...',
      };
      onUpdateMaterials([newItem, ...materials]);
      showAlert('تمت إضافة المقرر البرمجي وتوثيق اسم الدكتور بنجاح');
    }

    setIsModalOpen(false);
  };

  const handleAddCustomSubject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubName.trim()) return;

    if (onUpdateSubjects) {
      const newSub: UserSubject = {
        id: `sub-${Date.now()}`,
        name: newSubName.trim(),
        code: newSubCode.trim() || undefined,
        doctorName: newSubDoctor.trim() || undefined
      };
      onUpdateSubjects([...subjects, newSub]);
    }
    showAlert(`تمت إضافة مساق "${newSubName.trim()}" إلى قائمتك`);
    setNewSubName('');
    setNewSubCode('');
    setNewSubDoctor('');
    setIsSubjectsModalOpen(false);
  };

  return (
    <div className="space-y-8" dir="rtl">
      {/* HEADER SECTION - Modern & Expressive */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#caa074] mb-1">
            <Terminal className="w-4 h-4 text-[#d89659]" />
            <span>المكتبة الأكاديمية لهندسة البرمجيات وعلوم الحاسوب</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
            <span className="bg-gradient-to-r from-[#fef5ea] via-[#e6c29a] to-[#ca9762] bg-clip-text text-transparent">
              المواد والمقررات الدراسية
            </span>
          </h1>
          <p className="text-sm text-[#bda189] mt-1 font-medium">
            تصفح وحمل مراجعك، خصص المقررات حسب رغبتك، ووثّق أسماء الدكاترة والمحاضرين
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setIsSubjectsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-[#3d2414] bg-[#f0e2d1] hover:bg-[#e6d3bf] rounded-xl transition-all border border-[#d8c1ab] shadow-xs cursor-pointer"
            title="تحديد وإدارة المقررات الدراسية الخاصة بك"
          >
            <Layers className="w-4 h-4 text-[#8a5223]" />
            <span>تحديد المقررات الخاصة بي</span>
          </button>

          <button
            onClick={openNewModal}
            className="flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-bold text-[#faf3e8] bg-gradient-to-r from-[#8a5223] to-[#693b16] hover:from-[#9c5f2b] hover:to-[#7b461c] rounded-xl transition-all shadow-md shadow-[#4a2b13]/25 cursor-pointer border border-[#b87d47]/30"
          >
            <Plus className="w-4 h-4 text-[#fceddb]" />
            <span>+ إضافة مادة / مقرر جديد</span>
          </button>
        </div>
      </div>

      {alertMessage && (
        <div className="p-4 rounded-xl bg-[#2e1d13] border border-[#7a4823] text-[#faecd8] flex items-center gap-3 text-xs font-bold shadow-lg animate-in fade-in duration-200">
          <Check className="w-4 h-4 text-[#d89659]" />
          <span>{alertMessage}</span>
        </div>
      )}

      {/* FILTER & SEARCH PANEL (Modern Glassmorphic Beige Card) */}
      <div className="bg-[#faf5ed] rounded-2xl border border-[#e4d3bf] p-5 shadow-lg shadow-black/15 text-[#2c190e] space-y-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-[#8a5d3b] absolute right-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث باسم المقرر، اسم الدكتور (مثال: د. حسام، د. ليلى)، أو الموضوع البرمجي..."
            className="w-full pl-4 pr-10 py-2.5 bg-[#f5ede0] border border-[#d8c3ad] rounded-xl text-xs sm:text-sm text-[#2c190e] placeholder-[#8a6850] focus:outline-hidden focus:border-[#8f5424] focus:ring-1 focus:ring-[#8f5424] transition-all"
          />
        </div>

        {/* Filter Rows */}
        <div className="space-y-3 pt-2 border-t border-[#ebd8c4]">
          {/* Subjects Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            <span className="text-[#72523a] font-bold shrink-0 ml-2 flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5 text-[#8f5424]" />
              <span>المساق:</span>
            </span>
            {subjectsList.map((subj) => (
              <button
                key={subj}
                onClick={() => setSelectedSubject(subj)}
                className={`px-3 py-1.5 rounded-lg font-bold whitespace-nowrap transition-colors cursor-pointer ${
                  selectedSubject === subj
                    ? 'bg-[#8f5424] text-[#faf3e8] shadow-xs'
                    : 'bg-[#ede0ce] text-[#553723] hover:bg-[#e4d3bf]'
                }`}
              >
                {subj}
              </button>
            ))}
          </div>

          {/* Doctor / Professor Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            <span className="text-[#72523a] font-bold shrink-0 ml-2 flex items-center gap-1">
              <GraduationCap className="w-3.5 h-3.5 text-[#8f5424]" />
              <span>الدكتور:</span>
            </span>
            {doctorsList.map((doc) => (
              <button
                key={doc}
                onClick={() => setSelectedDoctor(doc)}
                className={`px-3 py-1.5 rounded-lg font-bold whitespace-nowrap transition-colors cursor-pointer ${
                  selectedDoctor === doc
                    ? 'bg-[#5c371d] text-[#faf3e8] shadow-xs'
                    : 'bg-[#ede0ce] text-[#553723] hover:bg-[#e4d3bf]'
                }`}
              >
                {doc}
              </button>
            ))}
          </div>

          {/* Categories Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            <span className="text-[#72523a] font-bold shrink-0 ml-2">النوع:</span>
            {categoriesList.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1.5 rounded-lg font-bold whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#3b2313] text-[#faf3e8]'
                    : 'bg-[#ede0ce] text-[#553723] hover:bg-[#e4d3bf]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* MATERIALS GRID - Modern Beige Cards popped on Dark Espresso */}
      {filteredMaterials.length === 0 ? (
        <div className="bg-[#faf5ed] rounded-2xl border border-[#e4d3bf] p-12 text-center text-[#5c3e29] shadow-md">
          <BookOpen className="w-12 h-12 text-[#9a643b] mx-auto mb-3 opacity-80" />
          <h3 className="text-base font-bold text-[#2e190e]">لا توجد مواد مطابقة للبحث</h3>
          <p className="text-xs text-[#705039] mt-1 mb-4">جرّب تغيير كلمات البحث أو إضافة مادة جديدة باسم دكتورك.</p>
          <button
            onClick={openNewModal}
            className="px-4 py-2 bg-[#8f5424] text-[#faf3e8] rounded-xl text-xs font-bold shadow-xs hover:bg-[#a2612c] transition-colors cursor-pointer"
          >
            + إضافة مادة جديدة الآن
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMaterials.map((item) => {
            const doctorDisplay = item.doctorName || item.author || 'غير محدد';
            return (
              <div
                key={item.id}
                className="flex flex-col justify-between bg-[#faf5ed] rounded-2xl border border-[#e4d3bf] p-6 shadow-md shadow-black/15 hover:border-[#b88554] hover:-translate-y-0.5 transition-all duration-300 text-[#2a170d] group"
              >
                <div>
                  {/* Top Header metadata */}
                  <div className="flex items-center justify-between text-xs text-[#7b593f] mb-3">
                    <span className="font-bold text-[#8f5424] truncate max-w-[200px]">{item.subject}</span>
                    <span className="font-mono text-xs uppercase bg-[#ede0ce] text-[#4d2f1c] px-2 py-0.5 rounded font-bold shrink-0">
                      {item.fileType}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-bold tracking-tight mb-2 leading-snug">
                    <span className="bg-gradient-to-r from-[#201007] via-[#4d2813] to-[#804b22] bg-clip-text text-transparent group-hover:from-[#351b0e] group-hover:to-[#9c5f2b] transition-all">
                      {item.title}
                    </span>
                  </h3>

                  {/* PROMINENT DOCTOR BADGE */}
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#ede1d1] border border-[#dccebd] rounded-lg text-xs font-bold text-[#3a2213] mb-3">
                    <GraduationCap className="w-3.5 h-3.5 text-[#8f5424] shrink-0" />
                    <span>الدكتور:</span>
                    <span className="text-[#8f5424] truncate max-w-[180px]">{doctorDisplay}</span>
                  </div>

                  <p className="text-xs text-[#63442e] leading-relaxed mb-4 line-clamp-3">
                    {item.description}
                  </p>

                  {/* Additional unboxed details */}
                  <div className="text-xs text-[#7b593f] flex items-center justify-between border-t border-[#ebd8c4] pt-3 mb-4 font-mono">
                    <span>{item.category}</span>
                    <div className="flex items-center gap-2">
                      <span>{item.fileSize}</span>
                      <span aria-hidden="true">·</span>
                      <span>{item.downloadsCount} تحميل</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons with Edit affordance */}
                <div className="space-y-2 pt-2 border-t border-[#ebd8c4]">
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setPreviewItem(item)}
                      className="flex items-center justify-center gap-1.5 py-2 px-3 bg-[#ede0ce] hover:bg-[#e4d3bf] text-[#3c2314] font-bold text-xs rounded-xl transition-colors cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5 text-[#8f5424]" />
                      <span>معاينة المقتطف</span>
                    </button>

                    <button
                      onClick={() => handleDownload(item)}
                      className="flex items-center justify-center gap-1.5 py-2 px-3 bg-gradient-to-r from-[#8a5223] to-[#693b16] hover:from-[#9c5f2b] hover:to-[#7b461c] text-[#faf3e8] font-bold text-xs rounded-xl transition-all shadow-xs cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5 text-[#fdedda]" />
                      <span>تحميل المرجع</span>
                    </button>
                  </div>

                  {/* Secondary edit/delete row */}
                  <div className="flex items-center justify-end gap-3 text-xs pt-1">
                    <button
                      onClick={() => openEditModal(item)}
                      className="flex items-center gap-1 text-[#8f5424] hover:text-[#5a3415] font-bold cursor-pointer"
                      title="تعديل المادة أو اسم الدكتور"
                    >
                      <Edit3 className="w-3 h-3" />
                      <span>تعديل المادة</span>
                    </button>
                    <span className="text-[#d8c2ab]">|</span>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="flex items-center gap-1 text-red-700 hover:text-red-900 font-semibold cursor-pointer"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>حذف</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* PREVIEW MODAL */}
      {previewItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#120a06]/80 backdrop-blur-xs">
          <div className="bg-[#faf5ed] rounded-3xl border border-[#decbb7] p-6 sm:p-8 max-w-2xl w-full text-[#2c190e] shadow-2xl space-y-5 animate-in fade-in duration-200">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-[#8f5424] mb-1">
                  <span>{previewItem.subject}</span>
                  <span aria-hidden="true">·</span>
                  <span>{previewItem.category}</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold">
                  <span className="bg-gradient-to-r from-[#201007] via-[#4d2813] to-[#804b22] bg-clip-text text-transparent">
                    {previewItem.title}
                  </span>
                </h3>
              </div>
              <button
                onClick={() => setPreviewItem(null)}
                className="p-1.5 text-[#7c5b43] hover:text-[#2c190e] hover:bg-[#ede0ce] rounded-xl transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 bg-[#f3e7d6] rounded-2xl border border-[#ded0bf] space-y-2 text-xs">
              <div className="flex flex-wrap items-center justify-between gap-3 text-[#684a34]">
                <div className="flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4 text-[#8f5424]" />
                  <span>أستاذ المادة: <strong className="text-[#2b180d]">{previewItem.doctorName || previewItem.author}</strong></span>
                </div>
                <span>الحجم: <strong className="text-[#2b180d] font-mono">{previewItem.fileSize}</strong></span>
                <span>تاريخ الرفع: <strong className="text-[#2b180d]">{previewItem.uploadedDate}</strong></span>
              </div>
              <p className="text-[#4e321e] leading-relaxed pt-2 border-t border-[#e2d2bf]">
                {previewItem.description}
              </p>
            </div>

            <div>
              <h4 className="text-xs font-bold text-[#6a4b33] uppercase tracking-wider mb-2">
                مقتطف من المحتوى الأكاديمي والبرمجي:
              </h4>
              <div className="p-4 bg-[#f8f1e7] rounded-xl border border-[#e2d5c4] text-xs font-mono text-[#382315] leading-relaxed max-h-48 overflow-y-auto whitespace-pre-wrap">
                {previewItem.previewSnippet || 'لا يتوفر مقتطف نصي إضافي لهذا المستند.'}
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-[#ebd8c4]">
              <button
                onClick={() => {
                  const item = previewItem;
                  setPreviewItem(null);
                  openEditModal(item);
                }}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-[#8f5424] hover:bg-[#ede0ce] rounded-xl transition-colors cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>تعديل المقرر</span>
              </button>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setPreviewItem(null)}
                  className="px-4 py-2 bg-[#ede0ce] hover:bg-[#e4d3bf] text-[#3a2213] rounded-xl text-xs font-bold cursor-pointer"
                >
                  إغلاق
                </button>
                <button
                  onClick={() => {
                    handleDownload(previewItem);
                    setPreviewItem(null);
                  }}
                  className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#8a5223] to-[#693b16] hover:from-[#9c5f2b] hover:to-[#7b461c] text-[#faf3e8] rounded-xl text-xs font-bold shadow-sm cursor-pointer"
                >
                  <Download className="w-4 h-4 text-[#fdedda]" />
                  <span>تحميل الملف الآن</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ADD / EDIT MATERIAL MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#120a06]/85 backdrop-blur-xs">
          <div className="bg-[#faf5ed] rounded-3xl border border-[#decbb7] p-6 sm:p-8 max-w-lg w-full text-[#2c190e] shadow-2xl space-y-4 animate-in fade-in duration-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold">
                <span className="bg-gradient-to-r from-[#201007] via-[#4d2813] to-[#804b22] bg-clip-text text-transparent">
                  {editingId ? 'تعديل بيانات المقرر' : 'إضافة وتحديد مادة دراسية جديدة'}
                </span>
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 text-[#7c5b43] hover:text-[#2c190e] hover:bg-[#ede0ce] rounded-xl transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveMaterial} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-[#5c3e29] mb-1">عنوان المادة أو الكتاب أو المرجع *</label>
                <input
                  type="text"
                  required
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="مثال: هندسة المتطلبات ونمذجة الأنظمة UML"
                  className="w-full px-3 py-2 bg-[#f5ede0] border border-[#d8c3ad] rounded-xl text-[#2c190e] focus:outline-hidden focus:border-[#8f5424]"
                />
              </div>

              {/* Subject selector + Custom subject */}
              <div>
                <label className="block font-bold text-[#5c3e29] mb-1">المساق الأكاديمي *</label>
                <select
                  value={formSubject}
                  onChange={(e) => setFormSubject(e.target.value)}
                  className="w-full px-3 py-2 bg-[#f5ede0] border border-[#d8c3ad] rounded-xl text-[#2c190e] focus:outline-hidden focus:border-[#8f5424] mb-2"
                >
                  {allSubjectNames.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                  <option value="__custom__">+ كتابة اسم مساق جديد مخصص...</option>
                </select>

                {formSubject === '__custom__' && (
                  <input
                    type="text"
                    required
                    value={customSubjectInput}
                    onChange={(e) => setCustomSubjectInput(e.target.value)}
                    placeholder="اكتب اسم المساق الجديد (مثال: أمن البرمجيات والتشفير)..."
                    className="w-full px-3 py-2 bg-[#fbf8f3] border border-[#8f5424] rounded-xl text-[#2c190e] focus:outline-hidden"
                  />
                )}
              </div>

              {/* DOCTOR NAME INPUT (EXPLICIT) */}
              <div>
                <label className="block font-bold text-[#5c3e29] mb-1 flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4 text-[#8f5424]" />
                  <span>اسم الدكتور / أستاذ المادة *</span>
                </label>
                <input
                  type="text"
                  required
                  value={formDoctor}
                  onChange={(e) => setFormDoctor(e.target.value)}
                  placeholder="مثال: د. حسام السعيد أو د. ليلى الشريف"
                  className="w-full px-3 py-2 bg-[#f5ede0] border border-[#d8c3ad] rounded-xl text-[#2c190e] focus:outline-hidden focus:border-[#8f5424]"
                  list="doctors-datalist"
                />
                <datalist id="doctors-datalist">
                  {allDoctorNames.map((d) => (
                    <option key={d} value={d} />
                  ))}
                </datalist>
                <p className="text-[11px] text-[#8a6850] mt-1">
                  💡 يمكنك اختيار دكتور سابق أو كتابة اسم دكتور جديد وسيحفظ تلقائياً.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#5c3e29] mb-1">نوع المستند</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as StudyMaterial['category'])}
                    className="w-full px-3 py-2 bg-[#f5ede0] border border-[#d8c3ad] rounded-xl text-[#2c190e] focus:outline-hidden focus:border-[#8f5424]"
                  >
                    <option value="كتاب">كتاب</option>
                    <option value="ملخص">ملخص</option>
                    <option value="عروض تقديمية">عروض تقديمية</option>
                    <option value="أسئلة وتدريبات">أسئلة وتدريبات</option>
                    <option value="نماذج امتحانات">نماذج امتحانات</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-[#5c3e29] mb-1">صيغة الملف</label>
                  <select
                    value={formFileType}
                    onChange={(e) => setFormFileType(e.target.value as 'pdf' | 'docx' | 'pptx' | 'zip')}
                    className="w-full px-3 py-2 bg-[#f5ede0] border border-[#d8c3ad] rounded-xl text-[#2c190e] focus:outline-hidden focus:border-[#8f5424]"
                  >
                    <option value="pdf">PDF (.pdf)</option>
                    <option value="docx">Word (.docx)</option>
                    <option value="pptx">PowerPoint (.pptx)</option>
                    <option value="zip">أرشيف مضغوط (.zip)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#5c3e29] mb-1">وصف مختصر للمادة</label>
                <textarea
                  rows={2}
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="وصف مختصر لمحتوى الملف والأبواب التي يغطيها..."
                  className="w-full px-3 py-2 bg-[#f5ede0] border border-[#d8c3ad] rounded-xl text-[#2c190e] focus:outline-hidden focus:border-[#8f5424]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#5c3e29] mb-1">مقتطف من المحتوى (اختياري)</label>
                <textarea
                  rows={2}
                  value={formSnippet}
                  onChange={(e) => setFormSnippet(e.target.value)}
                  placeholder="مقتطف أولي أو كود أو ملاحظات من داخل المستند..."
                  className="w-full px-3 py-2 bg-[#f5ede0] border border-[#d8c3ad] rounded-xl text-[#2c190e] focus:outline-hidden focus:border-[#8f5424]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#ebd8c4]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-[#ede0ce] hover:bg-[#e4d3bf] text-[#3a2213] rounded-xl font-bold cursor-pointer"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-gradient-to-r from-[#8a5223] to-[#693b16] hover:from-[#9c5f2b] hover:to-[#7b461c] text-[#faf3e8] rounded-xl font-bold shadow-xs cursor-pointer"
                >
                  {editingId ? 'حفظ التعديلات' : 'حفظ المادة في المكتبة'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MANAGE SUBJECTS MODAL */}
      {isSubjectsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#120a06]/85 backdrop-blur-xs">
          <div className="bg-[#faf5ed] rounded-3xl border border-[#decbb7] p-6 sm:p-8 max-w-lg w-full text-[#2c190e] shadow-2xl space-y-4 animate-in fade-in duration-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Layers className="w-5 h-5 text-[#8f5424]" />
                <h3 className="text-base font-bold text-[#2a170d]">تحديد المقررات والدكاترة لهذا الفصل</h3>
              </div>
              <button
                onClick={() => setIsSubjectsModalOpen(false)}
                className="p-1.5 text-[#7c5b43] hover:text-[#2c190e] hover:bg-[#ede0ce] rounded-xl transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-[#705039]">
              حدد المواد التي تدرسها حالياً واسم دكتور كل مادة لتظهر لك في القوائم المنسدلة والتصفية السريعة.
            </p>

            {/* Existing Subjects list */}
            <div className="max-h-48 overflow-y-auto space-y-2 p-2 bg-[#f4ebe0] rounded-xl border border-[#ded0bf] text-xs">
              {allSubjectNames.map((sName) => (
                <div key={sName} className="flex items-center justify-between p-2 bg-[#faf5ed] rounded-lg border border-[#e4d3bf]">
                  <span className="font-bold text-[#2e190e]">{sName}</span>
                </div>
              ))}
            </div>

            {/* Add New Subject Form */}
            <form onSubmit={handleAddCustomSubject} className="space-y-3 pt-2 border-t border-[#ebd8c4] text-xs">
              <h4 className="font-bold text-[#5c3e29]">إضافة مادة جديدة لقائمتك:</h4>
              <div>
                <label className="block text-[#705039] mb-1">اسم المادة / المقرر *</label>
                <input
                  type="text"
                  required
                  value={newSubName}
                  onChange={(e) => setNewSubName(e.target.value)}
                  placeholder="مثال: الحوسبة السحابية وهندسة DevOps"
                  className="w-full px-3 py-2 bg-[#f5ede0] border border-[#d8c3ad] rounded-xl text-[#2c190e]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#705039] mb-1">رمز المساق (اختياري)</label>
                  <input
                    type="text"
                    value={newSubCode}
                    onChange={(e) => setNewSubCode(e.target.value)}
                    placeholder="CS430"
                    className="w-full px-3 py-2 bg-[#f5ede0] border border-[#d8c3ad] rounded-xl text-[#2c190e]"
                  />
                </div>
                <div>
                  <label className="block text-[#705039] mb-1">اسم الدكتور المشرف</label>
                  <input
                    type="text"
                    value={newSubDoctor}
                    onChange={(e) => setNewSubDoctor(e.target.value)}
                    placeholder="د. ماجد الفهد"
                    className="w-full px-3 py-2 bg-[#f5ede0] border border-[#d8c3ad] rounded-xl text-[#2c190e]"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsSubjectsModalOpen(false)}
                  className="px-3 py-1.5 bg-[#ede0ce] rounded-xl font-bold cursor-pointer"
                >
                  إغلاق
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-gradient-to-r from-[#8a5223] to-[#693b16] text-[#faf3e8] rounded-xl font-bold cursor-pointer"
                >
                  + حفظ المساق
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
