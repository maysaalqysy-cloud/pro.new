import React, { useState } from 'react';
import { StudyTask, WeeklyScheduleItem, ExamCountdown, UserSubject } from '../types';
import { 
  CalendarCheck, 
  CheckCircle2, 
  Clock, 
  Plus, 
  Trash2, 
  Calendar, 
  Target, 
  GraduationCap, 
  Edit3, 
  Check, 
  X,
  CheckSquare,
  Square,
  ListFilter,
  Sparkles,
  ChevronDown,
  AlertCircle
} from 'lucide-react';

interface PlansPageProps {
  tasks: StudyTask[];
  onUpdateTasks: (tasks: StudyTask[]) => void;
  schedule: WeeklyScheduleItem[];
  onUpdateSchedule: (schedule: WeeklyScheduleItem[]) => void;
  exams: ExamCountdown[];
  onUpdateExams: (exams: ExamCountdown[]) => void;
  subjects?: UserSubject[];
}

export function PlansPage({
  tasks,
  onUpdateTasks,
  schedule,
  onUpdateSchedule,
  exams,
  onUpdateExams,
  subjects = [],
}: PlansPageProps) {
  const [selectedDay, setSelectedDay] = useState<WeeklyScheduleItem['day']>('الأحد');
  const [taskFilter, setTaskFilter] = useState<'all' | 'pending' | 'completed'>('all');
  const [doctorTaskFilter, setDoctorTaskFilter] = useState<string>('الكل');
  const [subjectTaskFilter, setSubjectTaskFilter] = useState<string>('الكل');

  // Selected Tasks for batch actions ("تحديد المهام")
  const [selectedTaskIds, setSelectedTaskIds] = useState<string[]>([]);

  // Modals state
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);

  const [isAddScheduleOpen, setIsAddScheduleOpen] = useState(false);
  const [isAddExamOpen, setIsAddExamOpen] = useState(false);

  // Quick inline task creation state
  const [quickTitle, setQuickTitle] = useState('');
  const [quickSubject, setQuickSubject] = useState('');
  const [quickDoctor, setQuickDoctor] = useState('');
  const [quickPriority, setQuickPriority] = useState<StudyTask['priority']>('متوسطة');
  const [isQuickOpen, setIsQuickOpen] = useState(false);

  // Detailed Task form state
  const [taskTitle, setTaskTitle] = useState('');
  const [taskSubject, setTaskSubject] = useState('');
  const [customSubjectInput, setCustomSubjectInput] = useState('');
  const [taskDoctor, setTaskDoctor] = useState('');
  const [taskDate, setTaskDate] = useState(new Date().toISOString().split('T')[0]);
  const [taskDuration, setTaskDuration] = useState(45);
  const [taskPriority, setTaskPriority] = useState<StudyTask['priority']>('متوسطة');
  const [taskNotes, setTaskNotes] = useState('');

  // Schedule form state
  const [newSchDay, setNewSchDay] = useState<WeeklyScheduleItem['day']>('الأحد');
  const [newSchTime, setNewSchTime] = useState('09:00 - 11:00');
  const [newSchSubject, setNewSchSubject] = useState('');
  const [newSchDoctor, setNewSchDoctor] = useState('');
  const [newSchTopic, setNewSchTopic] = useState('');
  const [newSchLocation, setNewSchLocation] = useState('مختبر الحاسوب');

  // Exam form state
  const [newExamSubject, setNewExamSubject] = useState('');
  const [newExamDoctor, setNewExamDoctor] = useState('');
  const [newExamDate, setNewExamDate] = useState('');
  const [newExamNotes, setNewExamNotes] = useState('');

  // Unique lists for suggestions
  const allSubjectNames = Array.from(
    new Set([
      ...tasks.map((t) => t.subject),
      ...schedule.map((s) => s.subject),
      ...exams.map((e) => e.subject),
      ...subjects.map((s) => s.name),
      'هياكل البيانات والخوارزميات',
      'هندسة البرمجيات وتصميم الأنظمة',
      'قواعد البيانات ونظم المعلومات',
      'أنظمة التشغيل والبرمجة المتزامنة',
      'شبكات الحاسوب وأمن المعلومات'
    ])
  ).filter(Boolean);

  const allDoctorNames = Array.from(
    new Set([
      ...tasks.map((t) => t.doctorName).filter(Boolean),
      ...schedule.map((s) => s.doctorName).filter(Boolean),
      ...exams.map((e) => e.doctorName).filter(Boolean),
      ...subjects.map((s) => s.doctorName).filter(Boolean),
      'أ.د. حسام السعيد',
      'د. ليلى الشريف',
      'د. سامي العتيبي',
      'د. عمر عبد الرحمن',
      'د. فراس النجار'
    ])
  ) as string[];

  const doctorsList = ['الكل', ...allDoctorNames];
  const subjectsFilterList = ['الكل', ...allSubjectNames];

  // Task single toggle
  const toggleTask = (id: string) => {
    const updated = tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t));
    onUpdateTasks(updated);
  };

  const deleteTask = (id: string) => {
    if (confirm('هل أنت متأكد من حذف هذه المهمة؟')) {
      const updated = tasks.filter((t) => t.id !== id);
      onUpdateTasks(updated);
      setSelectedTaskIds((prev) => prev.filter((item) => item !== id));
    }
  };

  // Batch Task Selection actions ("تحديد المهام")
  const toggleTaskSelection = (id: string) => {
    setSelectedTaskIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const selectAllFilteredTasks = () => {
    const filteredIds = filteredTasks.map((t) => t.id);
    setSelectedTaskIds(filteredIds);
  };

  const deselectAllTasks = () => {
    setSelectedTaskIds([]);
  };

  const batchMarkCompleted = () => {
    const updated = tasks.map((t) =>
      selectedTaskIds.includes(t.id) ? { ...t, completed: true } : t
    );
    onUpdateTasks(updated);
  };

  const batchMarkPending = () => {
    const updated = tasks.map((t) =>
      selectedTaskIds.includes(t.id) ? { ...t, completed: false } : t
    );
    onUpdateTasks(updated);
  };

  const batchDeleteTasks = () => {
    if (confirm(`هل أنت متأكد من حذف ${selectedTaskIds.length} مهام محددة؟`)) {
      const updated = tasks.filter((t) => !selectedTaskIds.includes(t.id));
      onUpdateTasks(updated);
      setSelectedTaskIds([]);
    }
  };

  // Quick inline task creation
  const handleCreateQuickInlineTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickTitle.trim()) return;

    const newTask: StudyTask = {
      id: `tsk-${Date.now()}`,
      title: quickTitle.trim(),
      subject: quickSubject || allSubjectNames[0] || 'هندسة البرمجيات',
      doctorName: quickDoctor.trim() || undefined,
      dueDate: new Date().toISOString().split('T')[0],
      durationMinutes: 45,
      priority: quickPriority,
      completed: false,
    };

    onUpdateTasks([newTask, ...tasks]);
    setQuickTitle('');
    setQuickDoctor('');
  };

  const openNewTaskModal = () => {
    setEditingTaskId(null);
    setTaskTitle('');
    setTaskSubject(allSubjectNames[0] || 'هياكل البيانات والخوارزميات');
    setCustomSubjectInput('');
    setTaskDoctor(allDoctorNames[0] || '');
    setTaskDate(new Date().toISOString().split('T')[0]);
    setTaskDuration(45);
    setTaskPriority('متوسطة');
    setTaskNotes('');
    setIsTaskModalOpen(true);
  };

  const openEditTaskModal = (task: StudyTask) => {
    setEditingTaskId(task.id);
    setTaskTitle(task.title);
    setTaskSubject(task.subject);
    setCustomSubjectInput('');
    setTaskDoctor(task.doctorName || '');
    setTaskDate(task.dueDate);
    setTaskDuration(task.durationMinutes);
    setTaskPriority(task.priority);
    setTaskNotes(task.notes || '');
    setIsTaskModalOpen(true);
  };

  const handleSaveTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskTitle.trim()) return;

    const finalSubject = taskSubject === '__custom__' && customSubjectInput.trim()
      ? customSubjectInput.trim()
      : taskSubject;

    const finalDoctor = taskDoctor.trim() || undefined;

    if (editingTaskId) {
      const updated = tasks.map((t) => {
        if (t.id === editingTaskId) {
          return {
            ...t,
            title: taskTitle.trim(),
            subject: finalSubject,
            doctorName: finalDoctor,
            dueDate: taskDate,
            durationMinutes: Number(taskDuration) || 30,
            priority: taskPriority,
            notes: taskNotes.trim() || undefined,
          };
        }
        return t;
      });
      onUpdateTasks(updated);
    } else {
      const newTask: StudyTask = {
        id: `tsk-${Date.now()}`,
        title: taskTitle.trim(),
        subject: finalSubject,
        doctorName: finalDoctor,
        dueDate: taskDate,
        durationMinutes: Number(taskDuration) || 30,
        priority: taskPriority,
        completed: false,
        notes: taskNotes.trim() || undefined,
      };
      onUpdateTasks([newTask, ...tasks]);
    }

    setIsTaskModalOpen(false);
  };

  // Schedule operations
  const handleAddSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSchTopic.trim()) return;

    const newSch: WeeklyScheduleItem = {
      id: `sch-${Date.now()}`,
      day: newSchDay,
      timeSlot: newSchTime.trim(),
      subject: newSchSubject.trim() || 'هندسة البرمجيات',
      doctorName: newSchDoctor.trim() || undefined,
      topic: newSchTopic.trim(),
      locationOrMethod: newSchLocation.trim(),
    };
    onUpdateSchedule([...schedule, newSch]);
    setIsAddScheduleOpen(false);
    setNewSchTopic('');
    setNewSchDoctor('');
  };

  const deleteSchedule = (id: string) => {
    const updated = schedule.filter((s) => s.id !== id);
    onUpdateSchedule(updated);
  };

  // Exam operations
  const handleAddExam = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newExamSubject.trim() || !newExamDate) return;

    const newEx: ExamCountdown = {
      id: `ex-${Date.now()}`,
      subject: newExamSubject.trim(),
      doctorName: newExamDoctor.trim() || undefined,
      examDate: newExamDate,
      notes: newExamNotes.trim() || 'اختبار فصلي لمساقات علوم الحاسوب',
    };
    onUpdateExams([...exams, newEx]);
    setIsAddExamOpen(false);
    setNewExamSubject('');
    setNewExamDoctor('');
    setNewExamDate('');
    setNewExamNotes('');
  };

  const deleteExam = (id: string) => {
    const updated = exams.filter((e) => e.id !== id);
    onUpdateExams(updated);
  };

  // Filter tasks
  const daysOfWeek: WeeklyScheduleItem['day'][] = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
  const filteredSchedule = schedule.filter((s) => s.day === selectedDay);

  const filteredTasks = tasks.filter((t) => {
    const matchesFilter =
      taskFilter === 'all' ? true :
      taskFilter === 'pending' ? !t.completed :
      t.completed;

    const matchesDoctor =
      doctorTaskFilter === 'الكل' ? true :
      (t.doctorName || '') === doctorTaskFilter;

    const matchesSubject =
      subjectTaskFilter === 'الكل' ? true :
      t.subject === subjectTaskFilter;

    return matchesFilter && matchesDoctor && matchesSubject;
  });

  const completedCount = tasks.filter((t) => t.completed).length;
  const progressPercent = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  const getDaysRemaining = (targetDateStr: string) => {
    const target = new Date(targetDateStr);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    target.setHours(0, 0, 0, 0);
    const diffTime = target.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="space-y-8" dir="rtl">
      {/* HEADER - Modern & Expressive */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#caa074] mb-1">
            <CalendarCheck className="w-4 h-4 text-[#d89659]" />
            <span>تنظيم المسار الأكاديمي والمهام البرمجية</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
            <span className="bg-gradient-to-r from-[#fef5ea] via-[#e6c29a] to-[#ca9762] bg-clip-text text-transparent">
              تحديد المهام وجدول المحاضرات
            </span>
          </h1>
          <p className="text-sm text-[#bda189] mt-1 font-medium">
            حدد واجباتك ومشاريعك، وثّق أسماء الدكاترة، وتابع مواعيد المحاضرات والاختبارات
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={openNewTaskModal}
            className="flex items-center gap-1.5 px-4 py-2.5 bg-gradient-to-r from-[#8a5223] to-[#693b16] hover:from-[#9c5f2b] hover:to-[#7b461c] text-[#faf3e8] rounded-xl text-xs sm:text-sm font-bold shadow-md shadow-[#4a2b13]/25 cursor-pointer border border-[#b87d47]/30 transition-all active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>+ تحديد مهمة جديدة</span>
          </button>
          <button
            onClick={() => setIsAddScheduleOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2.5 bg-[#f0e2d1] hover:bg-[#e7d4be] text-[#331c0e] rounded-xl text-xs sm:text-sm font-bold border border-[#d8c2ab] shadow-xs cursor-pointer transition-colors active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>+ إضافة حصة للجدول</span>
          </button>
          <button
            onClick={() => setIsAddExamOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2.5 bg-[#f0e2d1] hover:bg-[#e7d4be] text-[#331c0e] rounded-xl text-xs sm:text-sm font-bold border border-[#d8c2ab] shadow-xs cursor-pointer transition-colors active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>+ موعد اختبار</span>
          </button>
        </div>
      </div>

      {/* OVERVIEW PROGRESS CARD (Modern Warm Beige Card) */}
      <div className="bg-[#faf5ed] rounded-3xl border border-[#e4d3bf] p-6 shadow-md shadow-black/15 text-[#2c190e]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-[#8f5424]" />
              <h3 className="font-bold text-base">
                <span className="bg-gradient-to-r from-[#201007] to-[#6d3c1a] bg-clip-text text-transparent">
                  معدل إنجاز المهام ومشاريع الكود
                </span>
              </h3>
            </div>
            <p className="text-xs text-[#705039]">
              تم إنجاز <strong className="text-[#2b180d]">{completedCount}</strong> من إجمالي <strong className="text-[#2b180d]">{tasks.length}</strong> مهام محددة لهذا الفصل
            </p>
          </div>

          <div className="flex items-center gap-4 flex-1 max-w-md">
            <div className="flex-1 bg-[#ede0ce] h-3 rounded-full overflow-hidden border border-[#d8c2ab]">
              <div
                className="bg-gradient-to-r from-[#8a5223] via-[#b47136] to-[#d89659] h-full rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="font-mono text-base font-black text-[#2e190e] tabular-nums">
              {progressPercent}%
            </span>
          </div>
        </div>
      </div>

      {/* TWO SECTIONS: WEEKLY SCHEDULE & TASKS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* SECTION 1: TASKS CHECKLIST WITH MULTI-SELECTION & DOCTORS (7 COLS) */}
        <div className="lg:col-span-7 bg-[#faf5ed] rounded-3xl border border-[#e4d3bf] p-6 shadow-md shadow-black/15 text-[#2c190e] space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#8f5424]" />
              <h2 className="font-bold text-base">
                <span className="bg-gradient-to-r from-[#201007] to-[#6d3c1a] bg-clip-text text-transparent">
                  قائمة وتحديد المهام الدراسية
                </span>
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsQuickOpen(!isQuickOpen)}
                className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#f0e2d1] hover:bg-[#e5d4be] text-[#553216] rounded-xl text-xs font-bold transition-colors border border-[#d8c2ab] cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>إضافة سريعة</span>
              </button>
              <button
                onClick={openNewTaskModal}
                className="text-xs text-[#8f5424] hover:text-[#5c3514] font-bold cursor-pointer transition-colors"
              >
                + نموذج تفصيلي
              </button>
            </div>
          </div>

          {/* Quick Inline Task Creator */}
          {isQuickOpen && (
            <form onSubmit={handleCreateQuickInlineTask} className="p-4 bg-[#f4ebdf] rounded-2xl border border-[#ded0bf] space-y-3 animate-in fade-in">
              <div className="flex items-center justify-between text-xs font-bold text-[#623a1a]">
                <span>تحديد مهمة دراسية جديدة:</span>
                <button
                  type="button"
                  onClick={() => setIsQuickOpen(false)}
                  className="text-[#997455] hover:text-[#42240e] text-xs cursor-pointer"
                >
                  ✕ إغلاق
                </button>
              </div>

              <input
                type="text"
                required
                value={quickTitle}
                onChange={(e) => setQuickTitle(e.target.value)}
                placeholder="عنوان المهمة (مثال: حل شيت هياكل البيانات رقم 3)..."
                className="w-full px-3 py-2 text-xs bg-white border border-[#d6beaa] rounded-xl text-[#2a170d] placeholder-[#9a7e67] focus:outline-hidden focus:border-[#8f5424]"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div>
                  <label className="block text-[11px] font-bold text-[#6a3f1d] mb-1">المادة / المقرر:</label>
                  <select
                    value={quickSubject || allSubjectNames[0]}
                    onChange={(e) => setQuickSubject(e.target.value)}
                    className="w-full px-2 py-1.5 bg-white border border-[#d6beaa] rounded-xl text-[#2a170d] text-xs"
                  >
                    {allSubjectNames.map((s) => (
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
                    className="w-full px-2 py-1.5 bg-white border border-[#d6beaa] rounded-xl text-[#2a170d] text-xs placeholder-[#9a7e67]"
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
                  className="px-4 py-1.5 bg-gradient-to-r from-[#8a5223] to-[#693b16] text-[#faf3e8] rounded-xl font-bold text-xs shadow-xs hover:brightness-105 cursor-pointer"
                >
                  إضافة المهمة
                </button>
              </div>
            </form>
          )}

          {/* Status Filter Segment */}
          <div className="flex items-center gap-1 p-1 bg-[#ede0ce] rounded-xl text-xs font-bold">
            <button
              onClick={() => setTaskFilter('all')}
              className={`flex-1 py-1.5 rounded-lg transition-colors cursor-pointer ${
                taskFilter === 'all' ? 'bg-[#faf5ed] text-[#2c190e] shadow-xs' : 'text-[#6a4c35]'
              }`}
            >
              الكل ({tasks.length})
            </button>
            <button
              onClick={() => setTaskFilter('pending')}
              className={`flex-1 py-1.5 rounded-lg transition-colors cursor-pointer ${
                taskFilter === 'pending' ? 'bg-[#faf5ed] text-[#2c190e] shadow-xs' : 'text-[#6a4c35]'
              }`}
            >
              قيد الانتظار ({tasks.filter((t) => !t.completed).length})
            </button>
            <button
              onClick={() => setTaskFilter('completed')}
              className={`flex-1 py-1.5 rounded-lg transition-colors cursor-pointer ${
                taskFilter === 'completed' ? 'bg-[#faf5ed] text-[#2c190e] shadow-xs' : 'text-[#6a4c35]'
              }`}
            >
              المنجزة ({completedCount})
            </button>
          </div>

          {/* Doctor Quick Filter */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            <span className="text-[#72523a] font-bold shrink-0 ml-1">الدكتور:</span>
            {doctorsList.map((doc) => (
              <button
                key={doc}
                onClick={() => setDoctorTaskFilter(doc)}
                className={`px-2.5 py-1 rounded-lg font-bold whitespace-nowrap transition-colors cursor-pointer ${
                  doctorTaskFilter === doc
                    ? 'bg-[#8f5424] text-[#faf3e8]'
                    : 'bg-[#ede0ce] text-[#553723] hover:bg-[#e4d3bf]'
                }`}
              >
                {doc}
              </button>
            ))}
          </div>

          {/* BATCH SELECTION TOOLBAR ("تحديد المهام") */}
          <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 bg-[#f2e7d8] rounded-xl border border-[#ded0be] text-xs">
            <div className="flex items-center gap-3">
              <button
                onClick={selectedTaskIds.length === filteredTasks.length && filteredTasks.length > 0 ? deselectAllTasks : selectAllFilteredTasks}
                className="flex items-center gap-1 font-bold text-[#5c371d] hover:text-[#2c170a] cursor-pointer"
              >
                {selectedTaskIds.length === filteredTasks.length && filteredTasks.length > 0 ? (
                  <CheckSquare className="w-4 h-4 text-[#8f5424]" />
                ) : (
                  <Square className="w-4 h-4 text-[#8f5424]" />
                )}
                <span>{selectedTaskIds.length === filteredTasks.length && filteredTasks.length > 0 ? 'إلغاء تحديد الكل' : 'تحديد الكل'}</span>
              </button>
              {selectedTaskIds.length > 0 && (
                <span className="text-[#8f5424] font-bold bg-[#faedd9] px-2 py-0.5 rounded-md">
                  تم تحديد {selectedTaskIds.length} مهمة
                </span>
              )}
            </div>

            {selectedTaskIds.length > 0 && (
              <div className="flex items-center gap-2">
                <button
                  onClick={batchMarkCompleted}
                  className="px-2.5 py-1 bg-[#8f5424] text-[#faf3e8] rounded-lg font-bold hover:bg-[#a2612c] transition-colors cursor-pointer"
                  title="تعليم المحدد كمكتمل"
                >
                  ✓ إنجاز المحدد
                </button>
                <button
                  onClick={batchMarkPending}
                  className="px-2.5 py-1 bg-[#ede0ce] text-[#4d2c14] rounded-lg font-bold hover:bg-[#e4d2bd] transition-colors cursor-pointer"
                  title="تعليم المحدد كقيد الانتظار"
                >
                  قيد الانتظار
                </button>
                <button
                  onClick={batchDeleteTasks}
                  className="px-2.5 py-1 bg-red-100 text-red-800 rounded-lg font-bold hover:bg-red-200 transition-colors cursor-pointer"
                  title="حذف المهام المحددة"
                >
                  حذف
                </button>
              </div>
            )}
          </div>

          {/* Tasks list */}
          <div className="space-y-2.5 max-h-[500px] overflow-y-auto pr-1">
            {filteredTasks.length === 0 ? (
              <div className="text-center text-xs text-[#7d5c43] py-10 bg-[#f8f1e6] rounded-2xl border border-dashed border-[#d8c3ad]">
                <CheckCircle2 className="w-8 h-8 text-[#9a643b] mx-auto mb-2 opacity-80" />
                <p className="font-bold">لا توجد مهام مطابقة للشروط الحالية</p>
                <button
                  onClick={openNewTaskModal}
                  className="mt-2 text-[#8f5424] font-bold hover:underline cursor-pointer"
                >
                  + أضف مهمة جديدة الآن
                </button>
              </div>
            ) : (
              filteredTasks.map((t) => {
                const isSelected = selectedTaskIds.includes(t.id);
                return (
                  <div
                    key={t.id}
                    className={`p-3.5 rounded-2xl border transition-all flex items-start justify-between gap-3 ${
                      isSelected
                        ? 'bg-[#faedd9] border-[#c48753] shadow-xs'
                        : t.completed
                        ? 'bg-[#f4ebe0]/60 border-[#e4d6c7] opacity-80'
                        : 'bg-[#faf5ed] border-[#ebd9c6] hover:bg-[#f8ede0]'
                    }`}
                  >
                    {/* Selection Checkbox & Toggle */}
                    <div className="flex items-start gap-3 flex-1">
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <button
                          onClick={() => toggleTaskSelection(t.id)}
                          className="text-[#8f5424] hover:text-[#5c371d] cursor-pointer"
                          title="تحديد لإجراء جماعي"
                        >
                          {isSelected ? (
                            <CheckSquare className="w-4 h-4 text-[#8f5424]" />
                          ) : (
                            <Square className="w-4 h-4 text-[#a6866d]" />
                          )}
                        </button>
                        <button
                          onClick={() => toggleTask(t.id)}
                          className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 cursor-pointer transition-colors ${
                            t.completed
                              ? 'bg-[#8f5424] border-[#8f5424] text-[#faf3e8]'
                              : 'border-[#c2a892] bg-white'
                          }`}
                          title={t.completed ? 'إلغاء الإنجاز' : 'إتمام المهمة'}
                        >
                          {t.completed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </button>
                      </div>

                      <div className="space-y-1">
                        <span
                          className={`text-xs sm:text-sm font-bold block leading-snug ${
                            t.completed ? 'line-through text-[#9d806a]' : 'text-[#2a170d]'
                          }`}
                        >
                          {t.title}
                        </span>

                        {/* Doctor & Subject metadata */}
                        <div className="text-xs text-[#7a5840] flex flex-wrap items-center gap-2">
                          <span className="font-semibold text-[#8f5424] bg-[#f2e5d5] px-2 py-0.5 rounded-md border border-[#dfceba]">
                            {t.subject}
                          </span>
                          {t.doctorName && (
                            <span className="inline-flex items-center gap-1 font-bold text-[#5c371d] bg-[#ebd8c4] px-2 py-0.5 rounded-md text-[11px] border border-[#dcc5ae]">
                              <GraduationCap className="w-3 h-3 text-[#8f5424]" />
                              <span>{t.doctorName}</span>
                            </span>
                          )}
                          <span className="text-[#8e7159] font-mono">{t.durationMinutes} دقيقة</span>
                        </div>

                        {t.notes && (
                          <p className="text-[11px] text-[#7d5d45] mt-1 bg-[#ede0ce]/60 p-1.5 rounded-lg border border-[#e2d0bd]">
                            {t.notes}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Actions and priority */}
                    <div className="flex flex-col items-end gap-1.5 shrink-0">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                        t.priority === 'عالية' 
                          ? 'bg-red-100 text-red-800' 
                          : t.priority === 'متوسطة' 
                          ? 'bg-amber-100 text-amber-800' 
                          : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {t.priority}
                      </span>
                      <span className="text-[#7a5840] font-mono text-[11px]">{t.dueDate}</span>
                      <div className="flex items-center gap-1 mt-1">
                        <button
                          onClick={() => openEditTaskModal(t)}
                          className="p-1 text-[#8f5424] hover:bg-[#ede0ce] rounded-md transition-colors cursor-pointer"
                          title="تعديل المهمة والدكتور"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => deleteTask(t.id)}
                          className="p-1 text-[#a65d5d] hover:bg-red-100 rounded-md transition-colors cursor-pointer"
                          title="حذف المهمة"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* SECTION 2: WEEKLY TIMETABLE & EXAMS (5 COLS) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Weekly Timetable */}
          <div className="bg-[#faf5ed] rounded-3xl border border-[#e4d3bf] p-6 shadow-md shadow-black/15 text-[#2c190e] space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-[#8f5424]" />
                <h2 className="font-bold text-base">
                  <span className="bg-gradient-to-r from-[#201007] to-[#6d3c1a] bg-clip-text text-transparent">
                    الجدول الدراسي الأسبوعي
                  </span>
                </h2>
              </div>
              <button
                onClick={() => setIsAddScheduleOpen(true)}
                className="text-xs text-[#8f5424] hover:text-[#5c3514] font-bold cursor-pointer transition-colors"
              >
                + إضافة موعد
              </button>
            </div>

            {/* Days Tabs (Segmented controls) */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
              {daysOfWeek.map((day) => (
                <button
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-colors cursor-pointer ${
                    selectedDay === day
                      ? 'bg-[#8f5424] text-[#faf3e8] shadow-xs'
                      : 'bg-[#ede0ce] text-[#553723] hover:bg-[#e4d3bf]'
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>

            {/* Schedule slots for selected day */}
            <div className="space-y-3">
              {filteredSchedule.length === 0 ? (
                <div className="text-center py-8 bg-[#f7efe3] rounded-2xl border border-dashed border-[#d8c3ad] text-xs text-[#705039]">
                  <Clock className="w-7 h-7 text-[#9a643b] mx-auto mb-2 opacity-80" />
                  <p className="font-bold">لا توجد محاضرات مسجلة ليوم {selectedDay}</p>
                  <button
                    onClick={() => {
                      setNewSchDay(selectedDay);
                      setIsAddScheduleOpen(true);
                    }}
                    className="mt-2 text-xs font-bold text-[#8f5424] hover:underline cursor-pointer"
                  >
                    + أضف محاضرة لهذا اليوم
                  </button>
                </div>
              ) : (
                filteredSchedule.map((item) => (
                  <div
                    key={item.id}
                    className="p-3.5 bg-[#f9f3ea] hover:bg-[#f3e7d6] rounded-2xl border border-[#ebd8c4] transition-all flex items-start justify-between gap-3 group"
                  >
                    <div className="space-y-1.5 flex-1">
                      <div className="flex flex-wrap items-center gap-2 text-xs">
                        <span className="font-mono font-bold text-[#8f5424] bg-[#ebd8c4] px-2 py-0.5 rounded-md">
                          {item.timeSlot}
                        </span>
                        <span className="font-bold text-[#2e190e]">{item.subject}</span>
                        {item.doctorName && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#8f5424] bg-[#ebd9c5] px-2 py-0.5 rounded-md">
                            <GraduationCap className="w-3 h-3" />
                            <span>{item.doctorName}</span>
                          </span>
                        )}
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold text-[#201007]">
                        {item.topic}
                      </h4>
                      <p className="text-xs text-[#705039]">
                        📍 {item.locationOrMethod}
                      </p>
                    </div>

                    <button
                      onClick={() => deleteSchedule(item.id)}
                      className="p-1.5 text-[#8a6850] hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                      title="حذف هذا الموعد"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Exam Countdowns */}
          <div className="bg-[#faf5ed] rounded-3xl border border-[#e4d3bf] p-6 shadow-md shadow-black/15 text-[#2c190e] space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-[#8f5424]" />
                <h3 className="font-bold text-base">
                  <span className="bg-gradient-to-r from-[#201007] to-[#6d3c1a] bg-clip-text text-transparent">
                    العد التنازلي للاختبارات
                  </span>
                </h3>
              </div>
              <button
                onClick={() => setIsAddExamOpen(true)}
                className="text-xs text-[#8f5424] hover:text-[#5c3514] font-bold cursor-pointer"
              >
                + إضافة اختبار
              </button>
            </div>

            <div className="space-y-3">
              {exams.length === 0 ? (
                <p className="text-xs text-[#7d5d45] text-center py-4">لا توجد اختبارات مسجلة حالياً</p>
              ) : (
                exams.map((ex) => {
                  const daysLeft = getDaysRemaining(ex.examDate);
                  return (
                    <div
                      key={ex.id}
                      className="p-3 bg-[#f8f1e7] rounded-2xl border border-[#ebd8c5] flex items-center justify-between gap-3"
                    >
                      <div>
                        <div className="flex items-center gap-2 text-xs font-bold text-[#2c170d]">
                          <span>{ex.subject}</span>
                          {ex.doctorName && (
                            <span className="text-[11px] text-[#8f5424] bg-[#ebd8c4] px-1.5 py-0.5 rounded-md font-semibold">
                              د. {ex.doctorName.replace(/^(د\.|أ\.د\.)\s*/, '')}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-[#7d5d45] mt-0.5">{ex.notes}</p>
                        <span className="text-[10px] text-[#9c7f68] font-mono">{ex.examDate}</span>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span className={`px-2.5 py-1 rounded-xl text-xs font-black font-mono tabular-nums ${
                          daysLeft <= 3 
                            ? 'bg-red-100 text-red-800' 
                            : daysLeft <= 7 
                            ? 'bg-amber-100 text-amber-800' 
                            : 'bg-[#ebd8c4] text-[#4d2c14]'
                        }`}>
                          {daysLeft > 0 ? `${daysLeft} يوم متبقي` : daysLeft === 0 ? 'اليوم!' : 'انتهى'}
                        </span>
                        <button
                          onClick={() => deleteExam(ex.id)}
                          className="text-[#997962] hover:text-red-700 p-1 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>

      {/* MODAL: ADD / EDIT TASK */}
      {isTaskModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#120a06]/80 backdrop-blur-xs">
          <div className="bg-[#faf5ed] rounded-3xl border border-[#decbb7] p-6 sm:p-8 max-w-lg w-full text-[#2c190e] shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#ebd8c4] pb-3">
              <h3 className="font-black text-lg">
                <span className="bg-gradient-to-r from-[#201007] to-[#7d481f] bg-clip-text text-transparent">
                  {editingTaskId ? 'تعديل المهمة الدراسية' : 'تحديد مهمة دراسية جديدة'}
                </span>
              </h3>
              <button
                onClick={() => setIsTaskModalOpen(false)}
                className="p-1 text-[#7c5b43] hover:text-[#2c190e] rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveTask} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-[#5c3e29] mb-1">عنوان المهمة *</label>
                <input
                  type="text"
                  required
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                  placeholder="مثال: تسليم كود مشروع الأشجار الثنائية Red-Black Trees..."
                  className="w-full px-3 py-2 bg-[#f5ede0] border border-[#d8c3ad] rounded-xl text-[#2c190e] focus:outline-hidden focus:border-[#8f5424]"
                />
              </div>

              {/* Subject Selector */}
              <div>
                <label className="block font-bold text-[#5c3e29] mb-1">المساق / المادة *</label>
                <select
                  value={taskSubject}
                  onChange={(e) => setTaskSubject(e.target.value)}
                  className="w-full px-3 py-2 bg-[#f5ede0] border border-[#d8c3ad] rounded-xl text-[#2c190e] focus:outline-hidden focus:border-[#8f5424]"
                >
                  {allSubjectNames.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                  <option value="__custom__">+ مادة جديدة أخرى...</option>
                </select>
                {taskSubject === '__custom__' && (
                  <input
                    type="text"
                    required
                    value={customSubjectInput}
                    onChange={(e) => setCustomSubjectInput(e.target.value)}
                    placeholder="اكتب اسم المادة الجديدة هنا..."
                    className="w-full mt-2 px-3 py-2 bg-[#f5ede0] border border-[#d8c3ad] rounded-xl text-[#2c190e]"
                  />
                )}
              </div>

              {/* Doctor Name Input with suggestions */}
              <div>
                <label className="block font-bold text-[#5c3e29] mb-1 flex items-center justify-between">
                  <span>اسم الدكتور / الأستاذ المشرف</span>
                  <span className="text-[11px] text-[#8f5424] font-normal">يمكنك كتابة أي اسم</span>
                </label>
                <input
                  type="text"
                  value={taskDoctor}
                  onChange={(e) => setTaskDoctor(e.target.value)}
                  placeholder="مثال: أ.د. حسام السعيد"
                  className="w-full px-3 py-2 bg-[#f5ede0] border border-[#d8c3ad] rounded-xl text-[#2c190e] focus:outline-hidden focus:border-[#8f5424]"
                />
                {/* Doctor quick suggestions */}
                <div className="flex flex-wrap items-center gap-1.5 mt-2">
                  <span className="text-[11px] text-[#7d5d45]">اقتراحات سريعة:</span>
                  {allDoctorNames.slice(0, 4).map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => setTaskDoctor(d)}
                      className="px-2 py-0.5 bg-[#ede0ce] hover:bg-[#e2ceb8] rounded-md text-[11px] font-bold text-[#4d2c14] transition-colors cursor-pointer"
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#5c3e29] mb-1">تاريخ التسليم / الموعد</label>
                  <input
                    type="date"
                    required
                    value={taskDate}
                    onChange={(e) => setTaskDate(e.target.value)}
                    className="w-full px-3 py-2 bg-[#f5ede0] border border-[#d8c3ad] rounded-xl text-[#2c190e]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#5c3e29] mb-1">الوقت المقدر (بالدقائق)</label>
                  <input
                    type="number"
                    min={5}
                    step={5}
                    value={taskDuration}
                    onChange={(e) => setTaskDuration(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-[#f5ede0] border border-[#d8c3ad] rounded-xl text-[#2c190e]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#5c3e29] mb-1">الأولوية</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['عالية', 'متوسطة', 'منخفضة'] as const).map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setTaskPriority(p)}
                      className={`py-2 rounded-xl font-bold transition-all cursor-pointer ${
                        taskPriority === p
                          ? 'bg-[#8f5424] text-[#faf3e8] shadow-xs'
                          : 'bg-[#ede0ce] text-[#553723] hover:bg-[#e4d3bf]'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#5c3e29] mb-1">ملاحظات إضافية</label>
                <textarea
                  rows={2}
                  value={taskNotes}
                  onChange={(e) => setTaskNotes(e.target.value)}
                  placeholder="ملاحظات حول متطلبات التسليم، الروابط، أو تعليمات الدكتور..."
                  className="w-full px-3 py-2 bg-[#f5ede0] border border-[#d8c3ad] rounded-xl text-[#2c190e]"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#ebd8c4]">
                <button
                  type="button"
                  onClick={() => setIsTaskModalOpen(false)}
                  className="px-4 py-2 bg-[#ede0ce] text-[#422714] rounded-xl font-bold cursor-pointer"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-gradient-to-r from-[#8a5223] to-[#693b16] text-[#faf3e8] rounded-xl font-bold cursor-pointer shadow-xs"
                >
                  حفظ المهمة
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD TIMETABLE SESSION */}
      {isAddScheduleOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#120a06]/80 backdrop-blur-xs">
          <div className="bg-[#faf5ed] rounded-3xl border border-[#decbb7] p-6 sm:p-8 max-w-lg w-full text-[#2c190e] shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#ebd8c4] pb-3">
              <h3 className="font-black text-lg">
                <span className="bg-gradient-to-r from-[#201007] to-[#7d481f] bg-clip-text text-transparent">
                  إضافة محاضرة أو جلسة دراسية للجدول
                </span>
              </h3>
              <button
                onClick={() => setIsAddScheduleOpen(false)}
                className="p-1 text-[#7c5b43] hover:text-[#2c190e] rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSchedule} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#5c3e29] mb-1">اليوم</label>
                  <select
                    value={newSchDay}
                    onChange={(e) => setNewSchDay(e.target.value as any)}
                    className="w-full px-3 py-2 bg-[#f5ede0] border border-[#d8c3ad] rounded-xl text-[#2c190e]"
                  >
                    {daysOfWeek.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-[#5c3e29] mb-1">التوقيت</label>
                  <input
                    type="text"
                    required
                    value={newSchTime}
                    onChange={(e) => setNewSchTime(e.target.value)}
                    placeholder="مثال: 10:00 - 12:00"
                    className="w-full px-3 py-2 bg-[#f5ede0] border border-[#d8c3ad] rounded-xl text-[#2c190e]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#5c3e29] mb-1">المساق / المادة</label>
                <input
                  type="text"
                  required
                  value={newSchSubject}
                  onChange={(e) => setNewSchSubject(e.target.value)}
                  placeholder="مثال: هياكل البيانات والخوارزميات (CS201)"
                  className="w-full px-3 py-2 bg-[#f5ede0] border border-[#d8c3ad] rounded-xl text-[#2c190e]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#5c3e29] mb-1">اسم الدكتور / المحاضر</label>
                <input
                  type="text"
                  value={newSchDoctor}
                  onChange={(e) => setNewSchDoctor(e.target.value)}
                  placeholder="مثال: أ.د. حسام السعيد"
                  className="w-full px-3 py-2 bg-[#f5ede0] border border-[#d8c3ad] rounded-xl text-[#2c190e]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#5c3e29] mb-1">موضوع الجلسة / المحاضرة</label>
                <input
                  type="text"
                  required
                  value={newSchTopic}
                  onChange={(e) => setNewSchTopic(e.target.value)}
                  placeholder="مثال: خوارزميات الترتيب والبحث الثنائي والتطبيقات"
                  className="w-full px-3 py-2 bg-[#f5ede0] border border-[#d8c3ad] rounded-xl text-[#2c190e]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#5c3e29] mb-1">القاعة أو طريقة الحضور</label>
                <input
                  type="text"
                  value={newSchLocation}
                  onChange={(e) => setNewSchLocation(e.target.value)}
                  placeholder="مثال: مدرج كلية الحاسبات B2 أو مختبر البرمجة 104"
                  className="w-full px-3 py-2 bg-[#f5ede0] border border-[#d8c3ad] rounded-xl text-[#2c190e]"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#ebd8c4]">
                <button
                  type="button"
                  onClick={() => setIsAddScheduleOpen(false)}
                  className="px-4 py-2 bg-[#ede0ce] text-[#422714] rounded-xl font-bold cursor-pointer"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-gradient-to-r from-[#8a5223] to-[#693b16] text-[#faf3e8] rounded-xl font-bold cursor-pointer shadow-xs"
                >
                  إضافة للجدول
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD EXAM COUNTDOWN */}
      {isAddExamOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#120a06]/80 backdrop-blur-xs">
          <div className="bg-[#faf5ed] rounded-3xl border border-[#decbb7] p-6 sm:p-8 max-w-lg w-full text-[#2c190e] shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#ebd8c4] pb-3">
              <h3 className="font-black text-lg">
                <span className="bg-gradient-to-r from-[#201007] to-[#7d481f] bg-clip-text text-transparent">
                  إضافة موعد اختبار ومقرر
                </span>
              </h3>
              <button
                onClick={() => setIsAddExamOpen(false)}
                className="p-1 text-[#7c5b43] hover:text-[#2c190e] rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddExam} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-[#5c3e29] mb-1">المساق / المادة *</label>
                <input
                  type="text"
                  required
                  value={newExamSubject}
                  onChange={(e) => setNewExamSubject(e.target.value)}
                  placeholder="مثال: هندسة البرمجيات (SE301)"
                  className="w-full px-3 py-2 bg-[#f5ede0] border border-[#d8c3ad] rounded-xl text-[#2c190e]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#5c3e29] mb-1">اسم الدكتور المشرف على الاختبار</label>
                <input
                  type="text"
                  value={newExamDoctor}
                  onChange={(e) => setNewExamDoctor(e.target.value)}
                  placeholder="مثال: د. ليلى الشريف"
                  className="w-full px-3 py-2 bg-[#f5ede0] border border-[#d8c3ad] rounded-xl text-[#2c190e]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#5c3e29] mb-1">تاريخ الاختبار *</label>
                <input
                  type="date"
                  required
                  value={newExamDate}
                  onChange={(e) => setNewExamDate(e.target.value)}
                  className="w-full px-3 py-2 bg-[#f5ede0] border border-[#d8c3ad] rounded-xl text-[#2c190e]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#5c3e29] mb-1">ملاحظات ومقرر الامتحان</label>
                <textarea
                  rows={2}
                  value={newExamNotes}
                  onChange={(e) => setNewExamNotes(e.target.value)}
                  placeholder="يشمل مبادئ SOLID، أنماط التصميم Design Patterns، ومخططات UML..."
                  className="w-full px-3 py-2 bg-[#f5ede0] border border-[#d8c3ad] rounded-xl text-[#2c190e]"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#ebd8c4]">
                <button
                  type="button"
                  onClick={() => setIsAddExamOpen(false)}
                  className="px-4 py-2 bg-[#ede0ce] text-[#422714] rounded-xl font-bold cursor-pointer"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-gradient-to-r from-[#8a5223] to-[#693b16] text-[#faf3e8] rounded-xl font-bold cursor-pointer shadow-xs"
                >
                  حفظ موعد الاختبار
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
