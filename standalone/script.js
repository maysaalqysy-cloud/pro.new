// === جافاسكريبت منصة دراستي الأكاديمية (Pure Vanilla JS) ===

// 1. البيانات الأولية مع دعم التخزين المحلي LocalStorage (علوم الحاسوب وهندسة البرمجيات)
const INITIAL_MATERIALS = [
  {
    id: 'mat-1',
    title: 'مرجع هياكل البيانات والخوارزميات المتقدمة (Data Structures & Algorithms)',
    subject: 'هياكل البيانات والخوارزميات',
    category: 'كتاب',
    author: 'أ.د. حسام السعيد',
    fileSize: '6.4 MB',
    fileType: 'pdf',
    downloadsCount: 1840,
    uploadedDate: '2026-10-01',
    description: 'مرجع أكاديمي شامل يغطي الأشجار الثنائية، الرسوم البيانية، خوارزميات الترتيب والبحث، وتحليل التعقيد Big-O.'
  },
  {
    id: 'mat-2',
    title: 'كتاب هندسة البرمجيات وتصميم الأنظمة (Software Engineering & Architecture)',
    subject: 'هندسة البرمجيات',
    category: 'كتاب',
    author: 'د. ليلى الشريف',
    fileSize: '7.8 MB',
    fileType: 'pdf',
    downloadsCount: 1520,
    uploadedDate: '2026-09-28',
    description: 'دليل منهجي لمبادئ SOLID، أنماط التصميم (Design Patterns)، دورة حياة تطوير البرمجيات ومخططات UML.'
  },
  {
    id: 'mat-3',
    title: 'سلايدات نظم إدارة قواعد البيانات الموزعة واستعلامات SQL (DBMS Optimization)',
    subject: 'قواعد البيانات',
    category: 'عروض تقديمية',
    author: 'د. سامي العتيبي',
    fileSize: '8.2 MB',
    fileType: 'pptx',
    downloadsCount: 2210,
    uploadedDate: '2026-10-04',
    description: 'شرح معماريات قواعد البيانات SQL & NoSQL، معاملات ACID، تقنيات الفهرسة B-Tree، وتطبيع الجداول Normalization.'
  },
  {
    id: 'mat-4',
    title: 'ملخص أنظمة التشغيل وإدارة العمليات والذاكرة (Operating Systems & Concurrency)',
    subject: 'أنظمة التشغيل',
    category: 'ملخص',
    author: 'م. عمر عبد الرحمن',
    fileSize: '3.9 MB',
    fileType: 'pdf',
    downloadsCount: 1390,
    uploadedDate: '2026-09-22',
    description: 'خلاصة مكثفة لإدارة العمليات والخيوط (Threads)، خوارزميات جدولة المعالج، الذاكرة الافتراضية، وحلول التزامن Semaphores.'
  }
];

const INITIAL_SUMMARIES = [
  {
    id: 'sum-1',
    title: 'ملخص شامل: مبادئ تصميم البرمجيات SOLID والأنماط المعمارية',
    subject: 'هندسة البرمجيات',
    tags: ['هندسة_برمجيات', 'SOLID', 'تصميم_أنظمة'],
    lastModified: '2026-10-08',
    content: `# مبادئ تصميم البرمجيات الصلبة (SOLID Principles)\n\n## 1. مبدأ المسؤولية الفردية (SRP)\n- يجب أن يكون للكلاس سبب واحد فقط للتغيير.\n\n## 2. مبدأ الفتح والإغلاق (OCP)\n- الكيانات مفتوحة للتوسعة ومغلقة أمام التعديل المباشر.\n\n## 3. مبدأ عكس التبعية (DIP)\n- اعتمد دائماً على التجريد (Abstractions) وليس التنفيذ المباشر.\n\n> نصيحة: تطبيق حقن التبعيات (Dependency Injection) يسهل اختبار الكود وفحصه.`
  },
  {
    id: 'sum-2',
    title: 'خلاصة خوارزميات الترتيب والبحث وتحليل التعقيد Big-O Notation',
    subject: 'هياكل البيانات والخوارزميات',
    tags: ['خوارزميات', 'Big-O', 'LeetCode'],
    lastModified: '2026-10-07',
    content: `# مقارنة استراتيجيات الفرز والبحث\n\n## 1. التعقيد الزمني (Time Complexity)\n- O(1): وصول مباشر بالمصفوفة.\n- O(log n): البحث الثنائي Binary Search.\n- O(n log n): خوارزميات MergeSort و QuickSort.\n\n## 2. البحث في الرسوم البيانية\n- BFS: طابور (Queue)، إيجاد أقصر مسار.\n- DFS: مكدس (Stack)، كشف الدورات في الرسم البياني.`
  }
];

const INITIAL_TASKS = [
  { id: 'tsk-1', title: 'برمجة خوارزمية Dijkstra لإيجاد أقصر مسار في مشروع هياكل البيانات', subject: 'هياكل البيانات والخوارزميات', dueDate: '2026-10-12', durationMinutes: 90, priority: 'عالية', completed: true },
  { id: 'tsk-2', title: 'رسم مخطط الأصناف Class Diagram لنظام التجارة الإلكترونية', subject: 'هندسة البرمجيات', dueDate: '2026-10-13', durationMinutes: 60, priority: 'عالية', completed: false },
  { id: 'tsk-3', title: 'تصميم استعلامات SQL متقدمة وتطبيق تقنية Indexing', subject: 'قواعد البيانات', dueDate: '2026-10-14', durationMinutes: 45, priority: 'متوسطة', completed: false }
];

const INITIAL_SCHEDULE = [
  { id: 'sch-1', day: 'الأحد', timeSlot: '08:30 - 10:30', subject: 'هياكل البيانات (CS201)', topic: 'أشجار البحث الثنائية المتوازنة وحل مسائل LeetCode', locationOrMethod: 'قاعة الخوارزميات' },
  { id: 'sch-2', day: 'الأحد', timeSlot: '16:00 - 18:00', subject: 'هندسة البرمجيات (SE301)', topic: 'تطبيق عملي لمبادئ SOLID وتصميم معمارية Clean Code', locationOrMethod: 'المكتبة المركزية' },
  { id: 'sch-3', day: 'الإثنين', timeSlot: '09:00 - 11:30', subject: 'أنظمة التشغيل (CS310)', topic: 'تطبيقات عملية على خيوط المعالجة Threads والتزامن', locationOrMethod: 'مختبر نظم التشغيل 02' },
  { id: 'sch-4', day: 'الثلاثاء', timeSlot: '10:00 - 12:30', subject: 'قواعد البيانات (CS240)', topic: 'تحسين أداء الاستعلامات وتطبيع الجداول Normalization', locationOrMethod: 'قاعة قواعد البيانات' }
];

const INITIAL_EXAMS = [
  { id: 'ex-1', subject: 'امتحان منتصف الفصل: هياكل البيانات والخوارزميات (CS201)', examDate: '2026-10-22', notes: 'يشمل الأشجار الثنائية، الرسوم البيانية، وتحليل Big-O' },
  { id: 'ex-2', subject: 'الاختبار العملي: هندسة البرمجيات وتصميم النظم (SE301)', examDate: '2026-10-28', notes: 'تسليم مخططات UML ومبدأي Single Responsibility و Open-Closed' }
];

// استرجاع البيانات من LocalStorage مع كود علوم الحاسوب
let materials = JSON.parse(localStorage.getItem('study_cs_v2_materials') || 'null') || INITIAL_MATERIALS;
let summaries = JSON.parse(localStorage.getItem('study_cs_v2_summaries') || 'null') || INITIAL_SUMMARIES;
let tasks = JSON.parse(localStorage.getItem('study_cs_v2_tasks') || 'null') || INITIAL_TASKS;
let schedule = JSON.parse(localStorage.getItem('study_cs_v2_schedule') || 'null') || INITIAL_SCHEDULE;
let exams = JSON.parse(localStorage.getItem('study_cs_v2_exams') || 'null') || INITIAL_EXAMS;

let currentSelectedSummaryId = summaries[0]?.id || null;
let currentSelectedDay = 'الأحد';
let currentSelectedSubjectFilter = 'الكل';

function saveData() {
  localStorage.setItem('study_cs_v2_materials', JSON.stringify(materials));
  localStorage.setItem('study_cs_v2_summaries', JSON.stringify(summaries));
  localStorage.setItem('study_cs_v2_tasks', JSON.stringify(tasks));
  localStorage.setItem('study_cs_v2_schedule', JSON.stringify(schedule));
  localStorage.setItem('study_cs_v2_exams', JSON.stringify(exams));
}

// 2. التنقل بين الصفحات الأربع
function showPage(pageId) {
  document.querySelectorAll('.page-view').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));

  const targetPage = document.getElementById(`page-${pageId}`);
  const targetNav = document.getElementById(`nav-${pageId}`);

  if (targetPage) targetPage.classList.add('active');
  if (targetNav) targetNav.classList.add('active');

  window.scrollTo({ top: 0, behavior: 'smooth' });

  // تحديث المحتويات عند الدخول
  if (pageId === 'materials') renderMaterials();
  if (pageId === 'summaries') renderSummariesList();
  if (pageId === 'plans') renderPlans();
  updateHomeStats();
}

// 3. الساعة الحية ومؤقت التركيز
function updateClock() {
  const now = new Date();
  const timeStr = now.toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
  const miniTimeStr = now.toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit', hour12: true });
  const dateStr = now.toLocaleDateString('ar-EG', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  const miniClockEl = document.getElementById('nav-mini-clock');
  const liveTimeEl = document.getElementById('live-time-display');
  const liveDateEl = document.getElementById('live-date-display');
  const modalClockEl = document.getElementById('modal-digital-clock');
  const modalDateEl = document.getElementById('modal-digital-date');

  if (miniClockEl) miniClockEl.textContent = miniTimeStr;
  if (liveTimeEl) liveTimeEl.textContent = timeStr;
  if (liveDateEl) liveDateEl.textContent = dateStr;
  if (modalClockEl) modalClockEl.textContent = timeStr;
  if (modalDateEl) modalDateEl.textContent = dateStr;

  const clock24El = document.getElementById('clock-detail-24');
  if (clock24El) clock24El.textContent = now.toLocaleTimeString('en-US', { hour12: false });
  const tzEl = document.getElementById('clock-detail-tz');
  if (tzEl) tzEl.textContent = Intl.DateTimeFormat().resolvedOptions().timeZone;
}
setInterval(updateClock, 1000);
updateClock();

// تشغيل نغمة صوتية إلكترونية عند انتهاء المؤقت
function playNotificationChime() {
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const playTone = (freq, start, duration) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + start);
      gain.gain.setValueAtTime(0.01, ctx.currentTime + start);
      gain.gain.exponentialRampToValueAtTime(0.2, ctx.currentTime + start + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + start + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + start);
      osc.stop(ctx.currentTime + start + duration);
    };
    playTone(659.25, 0, 0.3);
    playTone(830.61, 0.2, 0.3);
    playTone(987.77, 0.4, 0.6);
  } catch(e) {
    console.warn(e);
  }
}

// مؤقت بومودورو
let pomodoroSeconds = 25 * 60;
let isPomodoroRunning = false;
let pomodoroTimerInterval = null;
let completedCycles = 0;

function formatMinSec(sec) {
  const m = Math.floor(sec / 60).toString().padStart(2, '0');
  const s = (sec % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

function updatePomodoroDisplays() {
  const txt = formatMinSec(pomodoroSeconds);
  const homeTimerEl = document.getElementById('home-timer-display');
  const modalTimerEl = document.getElementById('pomodoro-time-display');
  if (homeTimerEl) homeTimerEl.textContent = txt;
  if (modalTimerEl) modalTimerEl.textContent = txt;
}

function togglePomodoro() {
  const btn = document.getElementById('pomodoro-toggle-btn');
  const homeBtn = document.getElementById('home-timer-toggle');

  if (isPomodoroRunning) {
    clearInterval(pomodoroTimerInterval);
    isPomodoroRunning = false;
    if (btn) btn.textContent = 'بدء المؤقت';
    if (homeBtn) homeBtn.textContent = 'بدء';
  } else {
    isPomodoroRunning = true;
    if (btn) btn.textContent = 'إيقاف مؤقت';
    if (homeBtn) homeBtn.textContent = 'إيقاف';
    pomodoroTimerInterval = setInterval(() => {
      if (pomodoroSeconds > 0) {
        pomodoroSeconds--;
        updatePomodoroDisplays();
      } else {
        clearInterval(pomodoroTimerInterval);
        isPomodoroRunning = false;
        playNotificationChime();
        completedCycles++;
        const cyclesEl = document.getElementById('pomodoro-cycles');
        if (cyclesEl) cyclesEl.textContent = completedCycles;
        alert('🎉 أحسنت! انتهت جلسة التركيز.');
        resetPomodoro();
      }
    }, 1000);
  }
}

function toggleHomeTimer() {
  togglePomodoro();
}

function resetPomodoro() {
  clearInterval(pomodoroTimerInterval);
  isPomodoroRunning = false;
  pomodoroSeconds = 25 * 60;
  updatePomodoroDisplays();
  const btn = document.getElementById('pomodoro-toggle-btn');
  const homeBtn = document.getElementById('home-timer-toggle');
  if (btn) btn.textContent = 'بدء المؤقت';
  if (homeBtn) homeBtn.textContent = 'بدء';
}

function resetHomeTimer() {
  resetPomodoro();
}

function setPomodoroDuration(mins, btnElement) {
  clearInterval(pomodoroTimerInterval);
  isPomodoroRunning = false;
  pomodoroSeconds = mins * 60;
  updatePomodoroDisplays();
  document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
  if (btnElement) btnElement.classList.add('active');
  const label = document.getElementById('pomodoro-status-text');
  if (label) label.textContent = mins === 25 ? 'وقت التركيز والإنتاج' : 'استراحة استعادة النشاط';
}

// نافذة الساعة المنبثقة
function openClockModal() {
  document.getElementById('clock-modal').style.display = 'flex';
}
function closeClockModal() {
  document.getElementById('clock-modal').style.display = 'none';
}
function switchClockTab(tab) {
  document.querySelectorAll('.clock-tab-view').forEach(v => v.style.display = 'none');
  document.querySelectorAll('.modal-tabs .tab-btn').forEach(b => b.classList.remove('active'));
  document.getElementById(`view-${tab}`).style.display = 'block';
  document.getElementById(`clock-tab-${tab}`).classList.add('active');
}

// ساعة الإيقاف
let stopwatchSec = 0;
let isStopwatchRunning = false;
let stopwatchInterval = null;
let stopwatchLaps = [];

function toggleStopwatch() {
  const btn = document.getElementById('stopwatch-toggle-btn');
  const lapBtn = document.getElementById('stopwatch-lap-btn');
  if (isStopwatchRunning) {
    clearInterval(stopwatchInterval);
    isStopwatchRunning = false;
    btn.textContent = 'بدء الحساب';
    lapBtn.textContent = 'تصفير';
  } else {
    isStopwatchRunning = true;
    btn.textContent = 'إيقاف';
    lapBtn.textContent = 'جولة';
    stopwatchInterval = setInterval(() => {
      stopwatchSec++;
      document.getElementById('stopwatch-display').textContent = formatMinSec(stopwatchSec);
    }, 1000);
  }
}

function lapStopwatch() {
  if (isStopwatchRunning) {
    stopwatchLaps.push(stopwatchSec);
    renderLaps();
  } else {
    stopwatchSec = 0;
    stopwatchLaps = [];
    document.getElementById('stopwatch-display').textContent = '00:00';
    renderLaps();
  }
}

function renderLaps() {
  const container = document.getElementById('stopwatch-laps-list');
  if (!container) return;
  container.innerHTML = stopwatchLaps.map((sec, idx) => `
    <div style="padding: 6px 12px; display: flex; justify-content: space-between; font-size: 12px; border-bottom: 1px solid #f1f5f9;">
      <span>جولة ${idx + 1}</span>
      <strong>${formatMinSec(sec)}</strong>
    </div>
  `).join('');
}

// 4. إدارة المواد الدراسية
function renderMaterials() {
  const container = document.getElementById('materials-container');
  const tabsContainer = document.getElementById('subject-filter-tabs');
  if (!container) return;

  // استخراج المواد
  const subjects = ['الكل', ...new Set(materials.map(m => m.subject))];
  if (tabsContainer) {
    tabsContainer.innerHTML = subjects.map(s => `
      <button class="filter-tab ${currentSelectedSubjectFilter === s ? 'active' : ''}" onclick="setSubjectFilter('${s}')">${s}</button>
    `).join('');
  }

  const query = (document.getElementById('materials-search')?.value || '').toLowerCase();
  const filtered = materials.filter(m => {
    const matchSub = currentSelectedSubjectFilter === 'الكل' || m.subject === currentSelectedSubjectFilter;
    const matchQuery = m.title.toLowerCase().includes(query) || m.author.toLowerCase().includes(query);
    return matchSub && matchQuery;
  });

  if (filtered.length === 0) {
    container.innerHTML = '<p style="text-align:center; grid-column: 1/-1; padding: 40px; color:#94a3b8;">لا توجد مواد مطابقة للبحث.</p>';
    return;
  }

  container.innerHTML = filtered.map(m => `
    <div class="material-card">
      <div>
        <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
          <span style="font-size:11px; font-weight:700; color:var(--primary);">${m.category} · ${m.fileType.toUpperCase()}</span>
          <span style="font-size:11px; color:#94a3b8;">${m.fileSize}</span>
        </div>
        <h4>${m.title}</h4>
        <div class="material-meta">${m.subject} · ${m.author} · ${m.downloadsCount} تحميل</div>
        <p class="material-desc">${m.description}</p>
      </div>
      <div class="material-actions">
        <button class="btn btn-primary btn-sm btn-full" onclick="downloadMaterial('${m.id}')">تحميل الملف</button>
        <button class="btn btn-danger btn-sm" onclick="deleteMaterial('${m.id}')">حذف</button>
      </div>
    </div>
  `).join('');
}

function setSubjectFilter(s) {
  currentSelectedSubjectFilter = s;
  renderMaterials();
}

function filterMaterials() {
  renderMaterials();
}

function downloadMaterial(id) {
  const mat = materials.find(m => m.id === id);
  if (!mat) return;
  const content = `=== منصة دراستي ===\nالعنوان: ${mat.title}\nالمادة: ${mat.subject}\nالمؤلف: ${mat.author}\n\nالوصف:\n${mat.description}`;
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${mat.title.replace(/\s+/g, '_')}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  mat.downloadsCount++;
  saveData();
  renderMaterials();
}

function deleteMaterial(id) {
  if (confirm('هل تريد حذف هذه المادة؟')) {
    materials = materials.filter(m => m.id !== id);
    saveData();
    renderMaterials();
    updateHomeStats();
  }
}

function openAddMaterialModal() {
  document.getElementById('add-material-modal').style.display = 'flex';
}
function closeAddMaterialModal() {
  document.getElementById('add-material-modal').style.display = 'none';
}

function handleAddMaterial(e) {
  e.preventDefault();
  const title = document.getElementById('mat-title').value.trim();
  const subject = document.getElementById('mat-subject').value.trim();
  const category = document.getElementById('mat-category').value;
  const fileType = document.getElementById('mat-filetype').value;
  const author = document.getElementById('mat-author').value.trim() || 'الطالب';
  const desc = document.getElementById('mat-desc').value.trim() || 'مادة دراسية أضيفت حديثاً.';

  if (!title) return;

  const newMat = {
    id: `mat-${Date.now()}`,
    title,
    subject,
    category,
    author,
    fileSize: '3.2 MB',
    fileType,
    downloadsCount: 1,
    uploadedDate: new Date().toISOString().split('T')[0],
    description: desc
  };

  materials.unshift(newMat);
  saveData();
  closeAddMaterialModal();
  e.target.reset();
  renderMaterials();
  updateHomeStats();
  alert('تمت إضافة المادة بنجاح!');
}

// 5. محرر كتابة الملخصات
function renderSummariesList() {
  const container = document.getElementById('summaries-list');
  if (!container) return;

  const query = (document.getElementById('summary-search')?.value || '').toLowerCase();
  const filtered = summaries.filter(s => s.title.toLowerCase().includes(query) || s.content.toLowerCase().includes(query));

  container.innerHTML = filtered.map(s => `
    <div class="summary-item ${s.id === currentSelectedSummaryId ? 'active' : ''}" onclick="selectSummary('${s.id}')">
      <div class="summary-item-title">${s.title}</div>
      <div class="summary-item-meta">${s.subject} · ${s.lastModified}</div>
    </div>
  `).join('');

  loadActiveSummary();
}

function filterSummaries() {
  renderSummariesList();
}

function selectSummary(id) {
  currentSelectedSummaryId = id;
  renderSummariesList();
}

function loadActiveSummary() {
  const current = summaries.find(s => s.id === currentSelectedSummaryId) || summaries[0];
  if (!current) return;
  currentSelectedSummaryId = current.id;
  document.getElementById('editor-title').value = current.title;
  document.getElementById('editor-subject').value = current.subject;
  document.getElementById('editor-content').value = current.content;
  document.getElementById('editor-tags').value = (current.tags || []).join(', ');
  updateEditorStats();
  renderPreview();
}

function updateEditorStats() {
  const text = document.getElementById('editor-content').value;
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const chars = text.length;
  const readTime = Math.max(1, Math.ceil(words / 180));
  const statsEl = document.getElementById('summary-meta-stats');
  if (statsEl) statsEl.textContent = `${words} كلمة · ${chars} حرف · ~${readTime} دقيقة قراءة`;
}

function markUnsaved() {
  // تغذية راجعة خفيفة عند الكتابة
}

function setEditorMode(mode) {
  document.getElementById('mode-edit-btn').classList.toggle('active', mode === 'edit');
  document.getElementById('mode-preview-btn').classList.toggle('active', mode === 'preview');
  document.getElementById('editor-edit-box').style.display = mode === 'edit' ? 'block' : 'none';
  document.getElementById('markdown-toolbar').style.display = mode === 'edit' ? 'flex' : 'none';
  document.getElementById('editor-preview-box').style.display = mode === 'preview' ? 'block' : 'none';
  if (mode === 'preview') renderPreview();
}

function renderPreview() {
  const content = document.getElementById('editor-content').value;
  const previewBox = document.getElementById('editor-preview-box');
  if (!previewBox) return;

  const lines = content.split('\n');
  let html = '';
  lines.forEach(line => {
    if (line.startsWith('# ')) html += `<h1>${line.replace('# ', '')}</h1>`;
    else if (line.startsWith('## ')) html += `<h2>${line.replace('## ', '')}</h2>`;
    else if (line.startsWith('- ')) html += `<li>${line.replace('- ', '')}</li>`;
    else if (line.startsWith('> ')) html += `<blockquote>${line.replace('> ', '')}</blockquote>`;
    else if (line.startsWith('`') && line.endsWith('`')) html += `<pre><code>${line.replace(/`/g, '')}</code></pre>`;
    else html += `<p>${line}</p>`;
  });
  previewBox.innerHTML = html;
}

function insertFormat(prefix, suffix) {
  const textarea = document.getElementById('editor-content');
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const text = textarea.value;
  const sel = text.substring(start, end) || 'النص المختار';
  textarea.value = text.substring(0, start) + prefix + sel + suffix + text.substring(end);
  textarea.focus();
  updateEditorStats();
}

function saveCurrentSummary() {
  const current = summaries.find(s => s.id === currentSelectedSummaryId);
  if (!current) return;

  current.title = document.getElementById('editor-title').value.trim() || 'ملخص بدون عنوان';
  current.subject = document.getElementById('editor-subject').value.trim() || 'عام';
  current.content = document.getElementById('editor-content').value;
  current.tags = document.getElementById('editor-tags').value.split(',').map(t => t.trim()).filter(Boolean);
  current.lastModified = new Date().toISOString().split('T')[0];

  saveData();
  renderSummariesList();
  alert('تم حفظ الملخص بنجاح!');
}

function createNewSummary() {
  const newSum = {
    id: `sum-${Date.now()}`,
    title: 'ملخص دراسي جديد',
    subject: 'الرياضيات',
    tags: ['مذاكرة'],
    lastModified: new Date().toISOString().split('T')[0],
    content: '# عنوان الدرس الأول\n\n- أهم النقاط:\n- اكتب ملاحظاتك هنا...'
  };
  summaries.unshift(newSum);
  currentSelectedSummaryId = newSum.id;
  saveData();
  renderSummariesList();
  setEditorMode('edit');
  updateHomeStats();
}

function deleteCurrentSummary() {
  if (summaries.length <= 1) {
    alert('يجب أن يبقى ملخص واحد على الأقل.');
    return;
  }
  if (confirm('هل تريد حذف هذا الملخص؟')) {
    summaries = summaries.filter(s => s.id !== currentSelectedSummaryId);
    currentSelectedSummaryId = summaries[0].id;
    saveData();
    renderSummariesList();
    updateHomeStats();
  }
}

function copySummaryText() {
  const text = document.getElementById('editor-title').value + '\n\n' + document.getElementById('editor-content').value;
  navigator.clipboard.writeText(text);
  alert('تم نسخ الملخص إلى الحافظة!');
}

function exportSummaryTxt() {
  const title = document.getElementById('editor-title').value;
  const content = document.getElementById('editor-content').value;
  const blob = new Blob([`${title}\n\n${content}`], { type: 'text/markdown;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${title.replace(/\s+/g, '_')}.md`;
  a.click();
  URL.revokeObjectURL(url);
}

// 6. إدارة الخطط الدراسية
function renderPlans() {
  renderTasks();
  renderSchedule();
  renderExams();
}

function renderTasks(filter = 'all') {
  const container = document.getElementById('tasks-container');
  if (!container) return;

  const completedCount = tasks.filter(t => t.completed).length;
  const progressPercent = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  const progressText = document.getElementById('tasks-progress-text');
  const progressBar = document.getElementById('tasks-progress-bar');
  if (progressText) progressText.textContent = `${completedCount} من ${tasks.length} (${progressPercent}%)`;
  if (progressBar) progressBar.style.width = `${progressPercent}%`;

  const filtered = tasks.filter(t => {
    if (filter === 'pending') return !t.completed;
    if (filter === 'completed') return t.completed;
    return true;
  });

  container.innerHTML = filtered.map(t => `
    <div class="task-item ${t.completed ? 'completed' : ''}">
      <div style="display:flex; align-items:center; gap:12px;">
        <input type="checkbox" ${t.completed ? 'checked' : ''} onchange="toggleTask('${t.id}')" style="width:18px; height:18px; cursor:pointer;">
        <div>
          <strong style="font-size:13px; color:var(--text-main);">${t.title}</strong>
          <div style="font-size:11px; color:#94a3b8;">${t.subject} · ${t.durationMinutes} دقيقة · تسليم: ${t.dueDate}</div>
        </div>
      </div>
      <div style="display:flex; align-items:center; gap:8px;">
        <span style="font-size:11px; padding:3px 8px; border-radius:4px; background:#f1f5f9;">أولوية ${t.priority}</span>
        <button class="btn btn-sm" onclick="deleteTask('${t.id}')">🗑️</button>
      </div>
    </div>
  `).join('');
}

function toggleTask(id) {
  const t = tasks.find(item => item.id === id);
  if (t) {
    t.completed = !t.completed;
    saveData();
    renderTasks();
    updateHomeStats();
  }
}

function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  saveData();
  renderTasks();
  updateHomeStats();
}

function filterTasks(f) {
  renderTasks(f);
}

function openAddTaskModal() {
  document.getElementById('add-task-modal').style.display = 'flex';
}
function closeAddTaskModal() {
  document.getElementById('add-task-modal').style.display = 'none';
}

function handleAddTask(e) {
  e.preventDefault();
  const title = document.getElementById('task-title').value.trim();
  const subject = document.getElementById('task-subject').value.trim();
  const priority = document.getElementById('task-priority').value;
  const duration = Number(document.getElementById('task-duration').value) || 30;
  const date = document.getElementById('task-date').value;

  if (!title) return;

  tasks.unshift({
    id: `tsk-${Date.now()}`,
    title,
    subject,
    priority,
    durationMinutes: duration,
    dueDate: date || '2026-10-15',
    completed: false
  });

  saveData();
  closeAddTaskModal();
  e.target.reset();
  renderTasks();
  updateHomeStats();
}

function renderSchedule() {
  const days = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
  const dayTabs = document.getElementById('day-tabs');
  const container = document.getElementById('schedule-container');

  if (dayTabs) {
    dayTabs.innerHTML = days.map(d => `
      <button class="day-tab ${currentSelectedDay === d ? 'active' : ''}" onclick="selectScheduleDay('${d}')">${d}</button>
    `).join('');
  }

  const items = schedule.filter(s => s.day === currentSelectedDay);
  if (container) {
    if (items.length === 0) {
      container.innerHTML = `<p style="grid-column:1/-1; text-align:center; padding:30px; color:#94a3b8;">لا توجد جلسات مجدولة ليوم ${currentSelectedDay}</p>`;
    } else {
      container.innerHTML = items.map(s => `
        <div class="schedule-slot-card">
          <div style="font-size:11px; font-weight:700; color:var(--purple); margin-bottom:4px;">${s.timeSlot}</div>
          <strong style="font-size:14px; display:block; margin-bottom:4px;">${s.subject}</strong>
          <p style="font-size:12px; color:#475569; margin-bottom:8px;">${s.topic}</p>
          <div style="font-size:11px; color:#94a3b8;">المكان: ${s.locationOrMethod}</div>
        </div>
      `).join('');
    }
  }
}

function selectScheduleDay(d) {
  currentSelectedDay = d;
  renderSchedule();
}

function renderExams() {
  const container = document.getElementById('exams-container');
  if (!container) return;

  const today = new Date();
  today.setHours(0,0,0,0);

  container.innerHTML = exams.map(ex => {
    const exDate = new Date(ex.examDate);
    exDate.setHours(0,0,0,0);
    const diff = Math.ceil((exDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return `
      <div class="exam-card">
        <div style="display:flex; justify-content:space-between; font-size:11px; color:#94a3b8; margin-bottom:6px;">
          <span>${ex.examDate}</span>
          <strong style="color:var(--purple);">${diff > 0 ? `متبقي ${diff} يوم` : 'اليوم!'}</strong>
        </div>
        <strong style="font-size:14px; display:block; margin-bottom:6px;">${ex.subject}</strong>
        <p style="font-size:12px; color:#64748b;">${ex.notes}</p>
      </div>
    `;
  }).join('');

  const nearestEl = document.getElementById('nearest-exam-title');
  const countEl = document.getElementById('nearest-exam-countdown');
  if (exams[0] && nearestEl) nearestEl.textContent = exams[0].subject;
  if (exams[0] && countEl) countEl.textContent = `خلال موعد قريب (${exams[0].examDate})`;
}

// 7. تحديث إحصائيات الصفحة الرئيسية
function updateHomeStats() {
  const matCount = document.getElementById('home-materials-count');
  const sumCount = document.getElementById('home-summaries-count');
  const taskProg = document.getElementById('home-tasks-progress');

  if (matCount) matCount.textContent = materials.length;
  if (sumCount) sumCount.textContent = summaries.length;
  if (taskProg) {
    const comp = tasks.filter(t => t.completed).length;
    const pct = tasks.length > 0 ? Math.round((comp / tasks.length) * 100) : 0;
    taskProg.textContent = `${pct}%`;
  }
}

// التهيئة عند تشغيل الصفحة
document.addEventListener('DOMContentLoaded', () => {
  updateHomeStats();
  updateClock();
});
