import React, { useState, useEffect } from 'react';
import { ActivePage, StudyMaterial, StudySummary, StudyTask, ExamCountdown } from '../types';
import { 
  DownloadCloud, 
  FileEdit, 
  CalendarCheck, 
  Clock, 
  ArrowLeft, 
  BookOpen, 
  CheckCircle2, 
  Play, 
  Pause, 
  RotateCcw,
  Sparkles,
  Terminal,
  Cpu,
  Plus,
  GraduationCap,
  Layers,
  Check,
  ChevronLeft
} from 'lucide-react';
import { playNotificationSound } from '../utils/audio';

interface HomePageProps {
  onNavigate: (page: ActivePage) => void;
  onOpenClock: () => void;
  onOpenSourceCode: () => void;
  materials: StudyMaterial[];
  summaries: StudySummary[];
  tasks: StudyTask[];
  exams: ExamCountdown[];
  onUpdateTasks?: (tasks: StudyTask[]) => void;
  onUpdateMaterials?: (materials: StudyMaterial[]) => void;
}

export function HomePage({
  onNavigate,
  onOpenClock,
  onOpenSourceCode,
  materials,
  summaries,
  tasks,
  exams,
  onUpdateTasks,
  onUpdateMaterials,
}: HomePageProps) {
  // Live home clock & mini pomodoro
  const [liveTime, setLiveTime] = useState(new Date());
  const [homeTimerSeconds, setHomeTimerSeconds] = useState(25 * 60);
  const [isHomeTimerActive, setIsHomeTimerActive] = useState(false);

  // Quick Inline Task Creator State
  const [showQuickTask, setShowQuickTask] = useState(false);
  const [quickTitle, setQuickTitle] = useState('');
  const [quickSubject, setQuickSubject] = useState('هياكل البيانات والخوارزميات');
  const [quickDoctor, setQuickDoctor] = useState('');
  const [quickPriority, setQuickPriority] = useState<StudyTask['priority']>('متوسطة');

  useEffect(() => {
    const clockInterval = setInterval(() => {
      setLiveTime(new Date());
    }, 1000);
    return () => clearInterval(clockInterval);
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (isHomeTimerActive && homeTimerSeconds > 0) {
      timer = setInterval(() => {
        setHomeTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (homeTimerSeconds === 0 && isHomeTimerActive) {
      playNotificationSound();
      setIsHomeTimerActive(false);
      setHomeTimerSeconds(25 * 60);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isHomeTimerActive, homeTimerSeconds]);

  const formatTimerMinSec = (totalSeconds: number) => {
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleToggleTask = (taskId: string) => {
    if (!onUpdateTasks) return;
    const updated = tasks.map((t) => (t.id === taskId ? { ...t, completed: !t.completed } : t));
    onUpdateTasks(updated);
  };

  const handleCreateQuickTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickTitle.trim() || !onUpdateTasks) return;
    const newTask: StudyTask = {
      id: `tsk-${Date.now()}`,
      title: quickTitle.trim(),
      subject: quickSubject,
      doctorName: quickDoctor.trim() || undefined,
      dueDate: new Date().toISOString().split('T')[0],
      durationMinutes: 45,
      priority: quickPriority,
      completed: false,
    };
    onUpdateTasks([newTask, ...tasks]);
    setQuickTitle('');
    setQuickDoctor('');
    setShowQuickTask(false);
  };

  const completedTasksCount = tasks.filter((t) => t.completed).length;
  const nearestExam = exams[0];

  // Distinct subjects and doctors
  const distinctSubjects = Array.from(new Set(materials.map((m) => m.subject).concat(tasks.map((t) => t.subject))));
  const distinctDoctors = Array.from(
    new Set(
      materials
        .map((m) => m.doctorName)
        .concat(tasks.map((t) => t.doctorName))
        .filter(Boolean) as string[]
    )
  );

  return (
    <div className="space-y-10" dir="rtl">
      {/* HERO SECTION - Modern Warm Cream Surfaces against Deep Espresso Background */}
      <section className="relative overflow-hidden rounded-3xl bg-[#faf5ed] border border-[#e4d3bf] shadow-2xl shadow-black/30 text-[#2a170d]">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
          {/* Text Content */}
          <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-between">
            <div>
              {/* Modern badge with live pill indicator */}
              <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-[#8d5427] mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f1e3d3] border border-[#dec9b4] text-[#733f17]">
                  <span className="w-2 h-2 rounded-full bg-[#c7864e] animate-ping" />
                  <span>منصة هندسة البرمجيات وعلوم الحاسوب</span>
                </span>
                <span className="text-[#a47b59] font-medium hidden sm:inline">نظام دراسي متكامل للطلاب والدكاترة</span>
              </div>

              {/* Headline with High-end Gradient Typography */}
              <h1 
                className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.2] mb-4" 
                style={{ textWrap: 'balance' }}
              >
                <span className="bg-gradient-to-l from-[#201007] via-[#542c13] to-[#8f5223] bg-clip-text text-transparent">
                  منصتك المتكاملة لتفوق هندسة البرمجيات وعلوم الحاسوب
                </span>
              </h1>

              <p className="text-sm sm:text-base text-[#5c3e29] leading-relaxed mb-8 max-w-xl font-normal">
                مكتبة شاملة لمقررات ومراجع البرمجة، إدارة مهام المشاريع بدقة مع ربطها بأسماء الدكاترة، جداول أسبوعية منظمة، وتدوين الملخصات التقنية وساعة بومودورو للتركيز.
              </p>

              {/* Action Buttons styled in Ultra-Modern Beige & Caramel Palette */}
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => onNavigate('materials')}
                  className="flex items-center gap-2 px-5 py-3 text-sm font-bold text-[#faf3e8] bg-gradient-to-r from-[#8a5223] via-[#7d481d] to-[#613613] hover:from-[#9c5f2b] hover:to-[#744119] rounded-2xl transition-all shadow-md shadow-[#4a2b13]/25 cursor-pointer active:scale-95"
                >
                  <DownloadCloud className="w-4 h-4 text-[#fceddb]" />
                  <span>مكتبة المواد والمقررات</span>
                </button>

                <button
                  onClick={() => onNavigate('plans')}
                  className="flex items-center gap-2 px-5 py-3 text-sm font-bold text-[#3d2516] bg-[#efe1cf] hover:bg-[#e4d0ba] border border-[#d6beaa] rounded-2xl transition-colors cursor-pointer active:scale-95"
                >
                  <CalendarCheck className="w-4 h-4 text-[#7d481f]" />
                  <span>تحديد المهام والجدول</span>
                </button>

                <button
                  onClick={() => onNavigate('summaries')}
                  className="flex items-center gap-2 px-5 py-3 text-sm font-bold text-[#3d2516] bg-[#efe1cf] hover:bg-[#e4d0ba] border border-[#d6beaa] rounded-2xl transition-colors cursor-pointer active:scale-95"
                >
                  <FileEdit className="w-4 h-4 text-[#7d481f]" />
                  <span>كتابة ملخص برمجي</span>
                </button>

                <button
                  onClick={onOpenSourceCode}
                  className="flex items-center gap-2 px-4 py-3 text-sm font-bold text-[#442813] bg-[#f5ede2] hover:bg-[#ebd9c5] rounded-2xl transition-colors border border-[#dcc5ae] shadow-xs cursor-pointer"
                  title="عرض وتحميل كود المشروع المستقل"
                >
                  <Terminal className="w-4 h-4 text-[#8a5223]" />
                  <span>الكود المستقل</span>
                </button>
              </div>
            </div>

            {/* Quick Metrics Bar on Beige Card */}
            <div className="mt-10 pt-6 border-t border-[#ebd8c4] flex flex-wrap items-center gap-6 sm:gap-10 text-xs text-[#6e4e37]">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl font-black font-mono tabular-nums bg-gradient-to-r from-[#2c160b] to-[#6a3b18] bg-clip-text text-transparent">
                  {materials.length}
                </span>
                <span className="font-semibold text-[#5a3b25]">مقررات ومراجع برمجية</span>
              </div>
              <div className="w-px h-8 bg-[#dfc9b3] hidden sm:block" />
              <div className="flex items-center gap-2.5">
                <span className="text-2xl font-black font-mono tabular-nums bg-gradient-to-r from-[#2c160b] to-[#6a3b18] bg-clip-text text-transparent">
                  {distinctDoctors.length}
                </span>
                <span className="font-semibold text-[#5a3b25]">دكاترة ومحاضرين مسجلين</span>
              </div>
              <div className="w-px h-8 bg-[#dfc9b3] hidden sm:block" />
              <div className="flex items-center gap-2.5">
                <span className="text-2xl font-black font-mono tabular-nums bg-gradient-to-r from-[#2c160b] to-[#6a3b18] bg-clip-text text-transparent">
                  {completedTasksCount} / {tasks.length}
                </span>
                <span className="font-semibold text-[#5a3b25]">مهام برمجية منجزة</span>
              </div>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="lg:col-span-5 relative min-h-[300px] lg:min-h-full bg-[#f0e3d2]">
            <img
              src="/src/assets/images/hero_software_engineering_cs_1791568428381.jpg"
              alt="طالب هندسة برمجيات يدرس على مكتبه مع أكواد ومقررات"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#20130b]/60 via-transparent to-transparent lg:hidden" />
          </div>
        </div>
      </section>

      {/* LIVE CLOCK & FOCUS TIMER WIDGET (BANNER STRIP) */}
      <section className="bg-gradient-to-r from-[#29170e] via-[#3b2215] to-[#25150d] text-[#f7efe4] rounded-3xl p-6 sm:p-7 shadow-xl shadow-black/25 border border-[#4d2f1d]/80">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          {/* Clock Display */}
          <div className="flex items-center gap-4 w-full lg:w-auto">
            <div className="w-13 h-13 rounded-2xl bg-[#523321]/50 flex items-center justify-center shrink-0 border border-[#6b442b]/60">
              <Clock className="w-6 h-6 text-[#e8c199]" />
            </div>
            <div>
              <div className="flex items-baseline gap-3">
                <span className="text-2xl sm:text-3xl font-extrabold font-mono tabular-nums tracking-wider bg-gradient-to-r from-[#fdf7ee] via-[#ecd1b0] to-[#cca072] bg-clip-text text-transparent">
                  {liveTime.toLocaleTimeString('ar-EG', {
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    hour12: true,
                  })}
                </span>
              </div>
              <p className="text-xs text-[#d8beaa] font-medium mt-0.5">
                {liveTime.toLocaleDateString('ar-EG', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </p>
            </div>
          </div>

          {/* Home Mini Focus Timer */}
          <div className="flex flex-wrap items-center justify-center gap-4 bg-[#1f120a]/80 px-5 py-3 rounded-2xl border border-[#4e2f1d] w-full sm:w-auto">
            <div className="text-right">
              <span className="text-xs text-[#d1b59c] block font-medium">جلسة تركيز بومودورو للبرمجة</span>
              <span className="font-mono text-2xl font-bold tabular-nums text-[#faeedc]">
                {formatTimerMinSec(homeTimerSeconds)}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsHomeTimerActive(!isHomeTimerActive)}
                className={`p-2.5 rounded-xl font-bold text-xs transition-colors cursor-pointer ${
                  isHomeTimerActive
                    ? 'bg-[#d98b48] hover:bg-[#e49b5c] text-[#1a0e07]'
                    : 'bg-[#8f5424] hover:bg-[#a2612c] text-[#faf3e8]'
                }`}
                title={isHomeTimerActive ? 'إيقاف مؤقت' : 'بدء جلسة المذاكرة'}
              >
                {isHomeTimerActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>

              <button
                onClick={() => {
                  setIsHomeTimerActive(false);
                  setHomeTimerSeconds(25 * 60);
                }}
                className="p-2.5 text-[#d8beaa] hover:text-[#faf3e8] hover:bg-[#3d2417] rounded-xl transition-colors cursor-pointer"
                title="إعادة ضبط 25 دقيقة"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Launch Full Clock Modal */}
          <div className="w-full lg:w-auto text-center lg:text-left">
            <button
              onClick={onOpenClock}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#422718] hover:bg-[#52321f] text-[#faedd8] font-bold text-xs rounded-xl border border-[#5d3b25] transition-all cursor-pointer"
            >
              <Clock className="w-3.5 h-3.5 text-[#e5be96]" />
              <span>فتح ساعة التوقيت الكاملة</span>
            </button>
          </div>
        </div>
      </section>

      {/* QUICK PREVIEW TILES (Warm Beige Surfaces against Dark Brown Canvas) */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Tasks Preview with Interactive Check & Quick Add */}
        <div className="bg-[#faf5ed] rounded-3xl border border-[#e4d3bf] p-6 sm:p-7 shadow-lg shadow-black/15 text-[#2c190f]">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#8f5424]" />
              <h3 className="font-bold text-base">
                <span className="bg-gradient-to-r from-[#201007] to-[#6d3c1a] bg-clip-text text-transparent">
                  مهام الخطة ومشاريع الكود
                </span>
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowQuickTask(!showQuickTask)}
                className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#efe2d2] hover:bg-[#e4d1bd] text-[#5c3718] rounded-lg text-xs font-bold transition-colors border border-[#decab5] cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>إضافة مهمة</span>
              </button>
              <button
                onClick={() => onNavigate('plans')}
                className="text-xs text-[#8f5424] hover:text-[#5c3514] font-bold cursor-pointer transition-colors"
              >
                إدارة الخطة ({tasks.length})
              </button>
            </div>
          </div>

          {/* Quick Task Form Dropdown */}
          {showQuickTask && (
            <form onSubmit={handleCreateQuickTask} className="mb-4 p-3.5 bg-[#f5ecdf] rounded-2xl border border-[#ded0bf] space-y-3">
              <div className="text-xs font-bold text-[#6a3f1d] flex items-center justify-between">
                <span>إضافة مهمة سريعة مع تحديد المادة والدكتور:</span>
                <button
                  type="button"
                  onClick={() => setShowQuickTask(false)}
                  className="text-[#9e7a5c] hover:text-[#4d2813] text-xs cursor-pointer"
                >
                  ✕ إغلاق
                </button>
              </div>
              <input
                type="text"
                required
                value={quickTitle}
                onChange={(e) => setQuickTitle(e.target.value)}
                placeholder="عنوان المهمة (مثال: تسليم مشروع بنية الأشجار الثنائية)..."
                className="w-full px-3 py-2 text-xs bg-[#ffffff] border border-[#d6beaa] rounded-xl text-[#2a170d] placeholder:text-[#a0846d] focus:outline-hidden focus:border-[#8f5424]"
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div>
                  <label className="block text-[11px] font-bold text-[#6a3f1d] mb-1">المادة / المقرر:</label>
                  <select
                    value={quickSubject}
                    onChange={(e) => setQuickSubject(e.target.value)}
                    className="w-full px-2 py-1.5 bg-[#ffffff] border border-[#d6beaa] rounded-xl text-[#2a170d] text-xs"
                  >
                    {distinctSubjects.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-[#6a3f1d] mb-1">اسم الدكتور / المحاضر:</label>
                  <input
                    type="text"
                    value={quickDoctor}
                    onChange={(e) => setQuickDoctor(e.target.value)}
                    placeholder="مثال: د. حسام السعيد"
                    className="w-full px-2 py-1.5 bg-[#ffffff] border border-[#d6beaa] rounded-xl text-[#2a170d] text-xs placeholder:text-[#a0846d]"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-[#6a3f1d] font-bold">الأولوية:</span>
                  {(['عالية', 'متوسطة', 'منخفضة'] as const).map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setQuickPriority(p)}
                      className={`px-2 py-0.5 rounded-md text-[11px] font-bold cursor-pointer transition-colors ${
                        quickPriority === p
                          ? 'bg-[#8f5424] text-[#faf3e8]'
                          : 'bg-[#ebdcd0] text-[#5f3c21]'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-gradient-to-r from-[#8a5223] to-[#693b16] text-[#faf3e8] rounded-xl font-bold text-xs shadow-xs hover:brightness-105 cursor-pointer"
                >
                  حفظ المهمة
                </button>
              </div>
            </form>
          )}

          <div className="divide-y divide-[#ebd9c6] text-xs">
            {tasks.slice(0, 4).map((task) => (
              <div key={task.id} className="py-3 flex items-center justify-between gap-3 group">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleToggleTask(task.id)}
                    className={`w-5 h-5 rounded-lg border flex items-center justify-center shrink-0 cursor-pointer transition-all ${
                      task.completed 
                        ? 'bg-[#8f5424] border-[#8f5424] text-[#faf3e8]' 
                        : 'border-[#cbb39d] hover:border-[#8f5424] bg-white'
                    }`}
                    title={task.completed ? 'إلغاء الإنجاز' : 'تحديد كمكتمل'}
                  >
                    {task.completed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </button>
                  <div>
                    <span
                      className={`font-semibold block text-xs sm:text-sm ${
                        task.completed ? 'line-through text-[#9d806a]' : 'text-[#2e190e]'
                      }`}
                    >
                      {task.title}
                    </span>
                    <div className="text-[#7a5840] text-xs flex flex-wrap items-center gap-2 mt-1">
                      <span className="font-medium bg-[#f0e2d1] px-2 py-0.5 rounded-md text-[#523117] border border-[#dfceba]">
                        {task.subject}
                      </span>
                      {task.doctorName && (
                        <span className="inline-flex items-center gap-1 text-[#8f5424] font-bold bg-[#faedd9] px-2 py-0.5 rounded-md border border-[#edd7bc]">
                          <GraduationCap className="w-3 h-3 text-[#945522]" />
                          <span>د. {task.doctorName.replace(/^(د\.|أ\.د\.)\s*/, '')}</span>
                        </span>
                      )}
                      <span className="text-[#8e7159] font-mono">{task.durationMinutes} دقيقة</span>
                    </div>
                  </div>
                </div>
                <div className="text-left shrink-0">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md block mb-1 text-center ${
                    task.priority === 'عالية' 
                      ? 'bg-red-100 text-red-800' 
                      : task.priority === 'متوسطة' 
                      ? 'bg-amber-100 text-amber-800' 
                      : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {task.priority}
                  </span>
                  <span className="text-[#7a5840] font-mono text-[11px] block">{task.dueDate}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-3 border-t border-[#ebd8c4] flex justify-between items-center text-xs text-[#7d5c44]">
            <span>إنجاز المهام: {Math.round((completedTasksCount / (tasks.length || 1)) * 100)}%</span>
            <button
              onClick={() => onNavigate('plans')}
              className="text-[#8f5424] font-bold hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>عرض كافة المهام وتحديدها</span>
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Recent Materials Preview with Doctor Highlights */}
        <div className="bg-[#faf5ed] rounded-3xl border border-[#e4d3bf] p-6 sm:p-7 shadow-lg shadow-black/15 text-[#2c190f]">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#8f5424]" />
              <h3 className="font-bold text-base">
                <span className="bg-gradient-to-r from-[#201007] to-[#6d3c1a] bg-clip-text text-transparent">
                  أحدث المراجع والمقررات الدراسية
                </span>
              </h3>
            </div>
            <button
              onClick={() => onNavigate('materials')}
              className="text-xs text-[#8f5424] hover:text-[#5c3514] font-bold cursor-pointer transition-colors"
            >
              المكتبة كاملة ({materials.length})
            </button>
          </div>

          <div className="divide-y divide-[#ebd9c6] text-xs">
            {materials.slice(0, 4).map((item) => (
              <div key={item.id} className="py-3 flex items-center justify-between gap-3">
                <div className="truncate">
                  <span className="font-bold text-[#2d180d] block truncate text-xs sm:text-sm">{item.title}</span>
                  <div className="text-[#7a5840] text-xs flex flex-wrap items-center gap-2 mt-1">
                    <span className="bg-[#f0e2d1] px-2 py-0.5 rounded-md text-[#523117] border border-[#dfceba]">
                      {item.subject}
                    </span>
                    {item.doctorName && (
                      <span className="inline-flex items-center gap-1 text-[#8f5424] font-bold bg-[#faedd9] px-2 py-0.5 rounded-md border border-[#edd7bc]">
                        <GraduationCap className="w-3 h-3 text-[#945522]" />
                        <span>د. {item.doctorName.replace(/^(د\.|أ\.د\.)\s*/, '')}</span>
                      </span>
                    )}
                    <span className="font-mono text-[#8e7159]">{item.fileSize}</span>
                  </div>
                </div>
                <button
                  onClick={() => onNavigate('materials')}
                  className="px-3 py-1.5 bg-[#efe2d2] hover:bg-[#e4d2bd] text-[#341d0f] rounded-xl text-xs font-bold whitespace-nowrap transition-colors border border-[#d7c1aa] cursor-pointer"
                >
                  معاينة وتحميل
                </button>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-3 border-t border-[#ebd8c4] flex justify-between items-center text-xs text-[#7d5c44]">
            <span>التصنيفات: كتب · سلايدات · ملخصات · امتحانات</span>
            <button
              onClick={() => onNavigate('materials')}
              className="text-[#8f5424] font-bold hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>إضافة مادة وتحديد الدكتور</span>
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* FEATURE CARDS: 3 Pillars with Modern Elevation */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-[#faf1e4]">
              أقسام المنصة الرئيسية
            </h2>
            <p className="text-xs sm:text-sm text-[#bca188] mt-1">
              تنقل بسهولة بين المقررات والملخصات والخطط الدراسية
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* CARD 1: مكتبة المواد والمقررات */}
          <div className="flex flex-col justify-between bg-[#faf5ed] rounded-3xl border border-[#e4d3bf] overflow-hidden hover:border-[#b88554] transition-all shadow-lg shadow-black/15 group">
            <div>
              <div className="relative aspect-[4/3] bg-[#f0e4d2] overflow-hidden">
                <img
                  src="/src/assets/images/feature_cs_materials_library_1791568439167.jpg"
                  alt="مكتبة مراجع ومقررات هندسة البرمجيات وعلوم الحاسوب"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 right-3 bg-[#faf5ed]/95 backdrop-blur-xs px-3 py-1.5 rounded-xl text-xs font-bold text-[#351e11] shadow-xs flex items-center gap-1.5 border border-[#dfcdba]">
                  <DownloadCloud className="w-3.5 h-3.5 text-[#8f5424]" />
                  <span>المواد والمقررات</span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-base sm:text-lg font-bold mb-2">
                  <span className="bg-gradient-to-r from-[#201007] via-[#4d2813] to-[#804b22] bg-clip-text text-transparent">
                    1. مكتبة المواد وتحديد الدكاترة
                  </span>
                </h3>
                <p className="text-xs text-[#63442e] leading-relaxed mb-4 font-normal">
                  إمكانية إضافة مواد ومقررات دراسية جديدة، كتابة وتعديل أسماء الدكاترة والمحاضرين، وتحميل الكتب وسلايدات الشروحات بروابط سريعة.
                </p>

                <div className="text-xs text-[#705039] space-y-1.5 mb-4 border-t border-[#ebd9c6] pt-3">
                  <div className="flex justify-between">
                    <span>المواد المتوفرة:</span>
                    <span className="font-bold text-[#2e190e] font-mono tabular-nums">{materials.length} مقرر</span>
                  </div>
                  <div className="flex justify-between">
                    <span>الميزات:</span>
                    <span className="font-medium text-[#462816]">تحديد الدكتور، تصنيفات، تحميل مباشر</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 pt-0">
              <button
                onClick={() => onNavigate('materials')}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-[#f0e2d1] hover:bg-[#e7d4be] text-[#331c0e] font-bold text-xs rounded-xl transition-colors border border-[#d8c2ab] cursor-pointer"
              >
                <span>دخول مكتبة المقررات</span>
                <ArrowLeft className="w-3.5 h-3.5 text-[#8f5424]" />
              </button>
            </div>
          </div>

          {/* CARD 2: كتابة وتنسيق الملخصات */}
          <div className="flex flex-col justify-between bg-[#faf5ed] rounded-3xl border border-[#e4d3bf] overflow-hidden hover:border-[#b88554] transition-all shadow-lg shadow-black/15 group">
            <div>
              <div className="relative aspect-[4/3] bg-[#f0e4d2] overflow-hidden">
                <img
                  src="/src/assets/images/feature_cs_code_summaries_1791568449767.jpg"
                  alt="محرر كتابة وتنسيق الملخصات البرمجية والأكاديمية"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 right-3 bg-[#faf5ed]/95 backdrop-blur-xs px-3 py-1.5 rounded-xl text-xs font-bold text-[#351e11] shadow-xs flex items-center gap-1.5 border border-[#dfcdba]">
                  <FileEdit className="w-3.5 h-3.5 text-[#8f5424]" />
                  <span>محرر الملخصات</span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-base sm:text-lg font-bold mb-2">
                  <span className="bg-gradient-to-r from-[#201007] via-[#4d2813] to-[#804b22] bg-clip-text text-transparent">
                    2. كتابة وتنسيق الملخصات
                  </span>
                </h3>
                <p className="text-xs text-[#63442e] leading-relaxed mb-4 font-normal">
                  بيئة مخصصة لتوثيق وتلخيص شروحات الدكاترة والمحاضرات، مع دعم تنسيق الأكواد، حساب وقت القراءة، ووسوم المراجعة الذكية.
                </p>

                <div className="text-xs text-[#705039] space-y-1.5 mb-4 border-t border-[#ebd9c6] pt-3">
                  <div className="flex justify-between">
                    <span>الملخصات المحفوظة:</span>
                    <span className="font-bold text-[#2e190e] font-mono tabular-nums">{summaries.length} ملخص</span>
                  </div>
                  <div className="flex justify-between">
                    <span>الميزات:</span>
                    <span className="font-medium text-[#462816]">دعم الكود، حفظ تلقائي، طباعة وتصدير</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 pt-0">
              <button
                onClick={() => onNavigate('summaries')}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-[#f0e2d1] hover:bg-[#e7d4be] text-[#331c0e] font-bold text-xs rounded-xl transition-colors border border-[#d8c2ab] cursor-pointer"
              >
                <span>بدء كتابة وتصفح الملخصات</span>
                <ArrowLeft className="w-3.5 h-3.5 text-[#8f5424]" />
              </button>
            </div>
          </div>

          {/* CARD 3: الخطط والجداول الدراسية */}
          <div className="flex flex-col justify-between bg-[#faf5ed] rounded-3xl border border-[#e4d3bf] overflow-hidden hover:border-[#b88554] transition-all shadow-lg shadow-black/15 group">
            <div>
              <div className="relative aspect-[4/3] bg-[#f0e4d2] overflow-hidden">
                <img
                  src="/src/assets/images/feature_cs_study_planner_1791568459639.jpg"
                  alt="مخطط جداول المذاكرة ومهام مشاريع هندسة البرمجيات"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 right-3 bg-[#faf5ed]/95 backdrop-blur-xs px-3 py-1.5 rounded-xl text-xs font-bold text-[#351e11] shadow-xs flex items-center gap-1.5 border border-[#dfcdba]">
                  <CalendarCheck className="w-3.5 h-3.5 text-[#8f5424]" />
                  <span>الجدول والخطة</span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-base sm:text-lg font-bold mb-2">
                  <span className="bg-gradient-to-r from-[#201007] via-[#4d2813] to-[#804b22] bg-clip-text text-transparent">
                    3. تحديد المهام وجدول المحاضرات
                  </span>
                </h3>
                <p className="text-xs text-[#63442e] leading-relaxed mb-4 font-normal">
                  تحديد ومتابعة مهام الواجبات والمشاريع، جدولة محاضرات الأسبوع وتحديد قاعات وأسماء الدكاترة، والعد التنازلي لمواعيد الاختبارات.
                </p>

                <div className="text-xs text-[#705039] space-y-1.5 mb-4 border-t border-[#ebd9c6] pt-3">
                  <div className="flex justify-between">
                    <span>نسبة إنجاز المهام:</span>
                    <span className="font-bold text-[#2e190e] font-mono tabular-nums">
                      {Math.round((completedTasksCount / (tasks.length || 1)) * 100)}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>أقرب اختبار:</span>
                    <span className="font-medium text-[#462816] truncate max-w-[150px]">
                      {nearestExam ? nearestExam.subject : 'لا توجد اختبارات'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 pt-0">
              <button
                onClick={() => onNavigate('plans')}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-[#f0e2d1] hover:bg-[#e7d4be] text-[#331c0e] font-bold text-xs rounded-xl transition-colors border border-[#d8c2ab] cursor-pointer"
              >
                <span>تنظيم جدول المهام والاختبارات</span>
                <ArrowLeft className="w-3.5 h-3.5 text-[#8f5424]" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
