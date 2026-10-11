import { StudyMaterial, StudySummary, StudyTask, WeeklyScheduleItem, ExamCountdown, UserSubject } from '../types';

export const INITIAL_SUBJECTS: UserSubject[] = [
  { id: 'sub-1', name: 'هياكل البيانات والخوارزميات', code: 'CS201', doctorName: 'أ.د. حسام السعيد' },
  { id: 'sub-2', name: 'هندسة البرمجيات وتصميم الأنظمة', code: 'SE301', doctorName: 'د. ليلى الشريف' },
  { id: 'sub-3', name: 'قواعد البيانات ونظم المعلومات', code: 'CS240', doctorName: 'د. سامي العتيبي' },
  { id: 'sub-4', name: 'أنظمة التشغيل والبرمجة المتزامنة', code: 'CS310', doctorName: 'د. عمر عبد الرحمن' },
  { id: 'sub-5', name: 'شبكات الحاسوب وأمن المعلومات', code: 'CS220', doctorName: 'د. فراس النجار' },
  { id: 'sub-6', name: 'الذكاء الاصطناعي وتعلم الآلة', code: 'CS410', doctorName: 'د. رانيا المهدي' }
];

export const INITIAL_MATERIALS: StudyMaterial[] = [
  {
    id: 'mat-1',
    title: 'مرجع هياكل البيانات والخوارزميات المتقدمة (Data Structures & Algorithms)',
    subject: 'هياكل البيانات والخوارزميات',
    doctorName: 'أ.د. حسام السعيد',
    category: 'كتاب',
    author: 'أ.د. حسام السعيد',
    fileSize: '6.4 MB',
    fileType: 'pdf',
    downloadsCount: 1840,
    uploadedDate: '2026-10-01',
    description: 'مرجع أكاديمي شامل يغطي الأشجار الثنائية، الرسوم البيانية (Graphs)، وخوارزميات البحث والترتيب، مع تحليل التعقيد الزمني Big-O وتطبيقات بـ C++ و Python.',
    previewSnippet: 'الفصل الثالث: أشجار البحث الثنائية المتوازنة (AVL & Red-Black Trees). تحليل التعقيد O(log n) لعمليات الإدراج والحذف والبحث...'
  },
  {
    id: 'mat-2',
    title: 'كتاب هندسة البرمجيات وتصميم الأنظمة (Software Engineering & Clean Architecture)',
    subject: 'هندسة البرمجيات وتصميم الأنظمة',
    doctorName: 'د. ليلى الشريف',
    category: 'كتاب',
    author: 'د. ليلى الشريف',
    fileSize: '7.8 MB',
    fileType: 'pdf',
    downloadsCount: 1520,
    uploadedDate: '2026-09-28',
    description: 'دليل منهجي لمبادئ SOLID، أنماط التصميم (Design Patterns - GoF)، دورة حياة تطوير البرمجيات SDLC، ومخططات UML مع أمثلة عملية معمارية.',
    previewSnippet: 'المبدأ الأول: مبدأ المسؤولية الفردية (SRP) - يجب ألا يكون للصنف سوى سبب واحد للتغيير. كيفية فصل طبقات Business Logic عن واجهة العرض...'
  },
  {
    id: 'mat-3',
    title: 'سلايدات نظم إدارة قواعد البيانات الموزعة واستعلامات SQL (DBMS & SQL Optimization)',
    subject: 'قواعد البيانات ونظم المعلومات',
    doctorName: 'د. سامي العتيبي',
    category: 'عروض تقديمية',
    author: 'د. سامي العتيبي',
    fileSize: '8.2 MB',
    fileType: 'pptx',
    downloadsCount: 2210,
    uploadedDate: '2026-10-04',
    description: 'شرح معماريات قواعد البيانات العلائقية وغير العلائقية (SQL & NoSQL)، مفاهيم ACID Transactions، تقنيات الفهرسة B-Tree، وتطبيع الجداول Normalization.',
    previewSnippet: 'المحاضرة 5: تحسين استعلامات SQL المعقدة وفهم خطط التنفيذ (Explain Query Plan). الفروق الجوهرية بين B-Tree Index و Hash Index...'
  },
  {
    id: 'mat-4',
    title: 'ملخص أنظمة التشغيل وإدارة العمليات والذاكرة (Operating Systems & Concurrency)',
    subject: 'أنظمة التشغيل والبرمجة المتزامنة',
    doctorName: 'د. عمر عبد الرحمن',
    category: 'ملخص',
    author: 'د. عمر عبد الرحمن',
    fileSize: '3.9 MB',
    fileType: 'pdf',
    downloadsCount: 1390,
    uploadedDate: '2026-09-22',
    description: 'خلاصة مكثفة لإدارة العمليات والخيوط (Threads)، خوارزميات جدولة المعالج CPU Scheduling، الذاكرة الافتراضية Paging، وحلول التزامن Semaphores.',
    previewSnippet: 'مفاهيم التزامن: مشكلة القسم الحرج (Critical Section Problem)، شروط حظر الاستعصاء (Deadlock Prevention) الأربعة ونظرية المصرفي Banker\'s Algorithm...'
  },
  {
    id: 'mat-5',
    title: 'بنك أسئلة وتدريبات شبكات الحاسوب وأمن المعلومات (Computer Networks & Cyber Security)',
    subject: 'شبكات الحاسوب وأمن المعلومات',
    doctorName: 'د. فراس النجار',
    category: 'أسئلة وتدريبات',
    author: 'د. فراس النجار',
    fileSize: '4.5 MB',
    fileType: 'pdf',
    downloadsCount: 980,
    uploadedDate: '2026-10-06',
    description: 'أكثر من 200 مسألة وتدريب على نموذج OSI طبقة بطبقة، بروتوكولات TCP/IP، توجيه الحزم، مصافحة TLS/SSL، وتقنيات الحماية والتشفير.',
    previewSnippet: 'السؤال 18: اشرح المصافحة الثلاثية (Three-Way Handshake) في بروتوكول TCP ودور أعلام SYN و ACK في بدء الاتصال الموثوق...'
  },
  {
    id: 'mat-6',
    title: 'نماذج الامتحانات النصفية والنهائية السابقة لمسارات علوم الحاسوب',
    subject: 'هياكل البيانات والخوارزميات',
    doctorName: 'أ.د. حسام السعيد & د. ليلى الشريف',
    category: 'نماذج امتحانات',
    author: 'لجنة الامتحانات الأكاديمية',
    fileSize: '3.1 MB',
    fileType: 'pdf',
    downloadsCount: 2450,
    uploadedDate: '2026-09-18',
    description: 'نماذج اختبارات الأعوام الثلاثة السابقة تشمل أسئلة كتابة كود وتتبع خوارزميات وتصميم أنظمة مع الحلول النموذجية وسلم التصحيح المعتمد.',
    previewSnippet: 'القسم الأول: تتبع الكود وحساب التعقيد Big-O. القسم الثاني: تصميم معمارية نظام تواصل مصغر وتحديد الجداول والواجهات البرمجية...'
  }
];

export const INITIAL_SUMMARIES: StudySummary[] = [
  {
    id: 'sum-1',
    title: 'ملخص شامل: مبادئ تصميم البرمجيات SOLID والأنماط المعمارية',
    subject: 'هندسة البرمجيات وتصميم الأنظمة',
    doctorName: 'د. ليلى الشريف',
    tags: ['هندسة_برمجيات', 'SOLID', 'تصميم_الأنظمة', 'نظافة_الكود'],
    readTimeMinutes: 6,
    lastModified: '2026-10-08',
    content: `# مبادئ تصميم البرمجيات الصلبة (SOLID Principles)

## 1. مبدأ المسؤولية الفردية (Single Responsibility Principle - SRP)
- يجب أن يكون لكل كلاس أو موديول هدف ومسؤولية واحدة فقط وسبب وحيد للتغيير.
- **الفائدة:** سهولة الاختبار وإعادة الاستخدام وتقليل الاعتماديات المتشابكة.

## 2. مبدأ الفتح والإغلاق (Open/Closed Principle - OCP)
- الكيانات البرمجية يجب أن تكون مفتوحة للتوسعة (Open for Extension) ومغلقة أمام التعديل (Closed for Modification).
- **التطبيق:** استخدام واجهات (Interfaces) والفئات المجردة (Abstract Classes) لحقن السلوكيات الجديدة دون لمس الكود القديم.

## 3. مبدأ استبدال لسكوف (Liskov Substitution Principle - LSP)
- يجب أن تكون الكائنات من الفئات الفرعية قادرة على استبدال كائنات الفئة الأب دون التأثير على صحة وسلوك البرنامج.

## 4. مبدأ فصل الواجهات (Interface Segregation Principle - ISP)
- لا تجبر العملاء على الاعتماد على واجهات تحتوي دوالاً لا يحتاجون إليها.

## 5. مبدأ عكس التبعية (Dependency Inversion Principle - DIP)
- يجب ألا تعتمد الموديولات عالية المستوى على الموديولات منخفضة المستوى؛ كلاهما يجب أن يعتمد على التجريد (Abstractions).`
  },
  {
    id: 'sum-2',
    title: 'خلاصة خوارزميات الترتيب والبحث وتحليل التعقيد Big-O Notation',
    subject: 'هياكل البيانات والخوارزميات',
    doctorName: 'أ.د. حسام السعيد',
    tags: ['خوارزميات', 'Big-O', 'هياكل_بيانات', 'LeetCode'],
    readTimeMinutes: 8,
    lastModified: '2026-10-07',
    content: `# مقارنة استراتيجيات الفرز والبحث وتحليل الكفاءة

## 1. تحليل التعقيد الزمني (Time Complexity)
- **O(1) الثابت:** الوصول لعنصر في مصفوفة بواسطة الفهرس.
- **O(log n) اللوغاريتمي:** البحث الثنائي (Binary Search).
- **O(n) الخطي:** البحث الخطي واجتياز عناصر القائمة المترابطة.
- **O(n log n) الخطي اللوغاريتمي:** خوارزميات MergeSort و QuickSort و HeapSort.
- **O(n^2) التربيعي:** خوارزميات BubbleSort و SelectionSort.`
  },
  {
    id: 'sum-3',
    title: 'دليل معماريات قواعد البيانات: الفرق بين SQL و NoSQL وخصائص ACID',
    subject: 'قواعد البيانات ونظم المعلومات',
    doctorName: 'د. سامي العتيبي',
    tags: ['قواعد_بيانات', 'SQL', 'NoSQL', 'ACID'],
    readTimeMinutes: 5,
    lastModified: '2026-10-05',
    content: `# هندسة قواعد البيانات وإدارة المعاملات

## خصائص المعاملات الأكاديمية (ACID Properties)
1. **الذرية (Atomicity):** المعاملة إما أن تنفذ بالكامل أو تُلغى بالكامل (All or Nothing).
2. **الاتساق (Consistency):** الانتقال بالقاعدة من حالة صحيحة إلى حالة صحيحة أخرى دون كسر القيود.
3. **العزل (Isolation):** المعاملات المتزامنة لا تتداخل ولا تؤثر نتائجها غير المكتملة على بعضها.
4. **الديمومة (Durability):** بمجرد تأكيد المعاملة (Commit)، فإن نتائجها محفوظة نهائياً.`
  }
];

export const INITIAL_TASKS: StudyTask[] = [
  {
    id: 'tsk-1',
    title: 'برمجة خوارزمية Dijkstra لإيجاد أقصر مسار في مشروع هياكل البيانات',
    subject: 'هياكل البيانات والخوارزميات',
    doctorName: 'أ.د. حسام السعيد',
    dueDate: '2026-10-14',
    durationMinutes: 90,
    priority: 'عالية',
    completed: true,
    notes: 'تسليم ملف C++ على منصة الجامعة مع اختبارات الحالات الحدية (Edge Cases).'
  },
  {
    id: 'tsk-2',
    title: 'رسم مخطط الأصناف (Class Diagram) ونموذج التتابع (Sequence) لنظام المتجر',
    subject: 'هندسة البرمجيات وتصميم الأنظمة',
    doctorName: 'د. ليلى الشريف',
    dueDate: '2026-10-15',
    durationMinutes: 60,
    priority: 'عالية',
    completed: false,
    notes: 'مراعاة مبادئ SOLID وتحديد Design Pattern مناسب لإدارة الدفع.'
  },
  {
    id: 'tsk-3',
    title: 'تصميم استعلامات SQL متقدمة وتطبيق تقنية Indexing لقاعدة البيانات',
    subject: 'قواعد البيانات ونظم المعلومات',
    doctorName: 'د. سامي العتيبي',
    dueDate: '2026-10-16',
    durationMinutes: 45,
    priority: 'متوسطة',
    completed: false,
    notes: 'تحليل خطة الاستعلام Explain Query Plan وإثبات تحسين السرعة.'
  },
  {
    id: 'tsk-4',
    title: 'مراجعة خوارزميات جدولة المعالج CPU Scheduling وحل المسائل الحسابية',
    subject: 'أنظمة التشغيل والبرمجة المتزامنة',
    doctorName: 'د. عمر عبد الرحمن',
    dueDate: '2026-10-18',
    durationMinutes: 50,
    priority: 'متوسطة',
    completed: false,
    notes: 'التركيز على خوارزميات Round Robin و Shortest Job First.'
  },
  {
    id: 'tsk-5',
    title: 'حل واجب تحليل حزم البيانات باستخدام Wireshark وتتبع بروتوكول TCP',
    subject: 'شبكات الحاسوب وأمن المعلومات',
    doctorName: 'د. فراس النجار',
    dueDate: '2026-10-20',
    durationMinutes: 60,
    priority: 'منخفضة',
    completed: false,
    notes: 'التقاط حركة TCP Handshake وكتابة تقرير بالنتائج.'
  }
];

export const INITIAL_SCHEDULE: WeeklyScheduleItem[] = [
  {
    id: 'sch-1',
    day: 'الأحد',
    timeSlot: '08:30 - 10:30',
    subject: 'هياكل البيانات والخوارزميات',
    doctorName: 'أ.د. حسام السعيد',
    topic: 'أشجار البحث الثنائية المتوازنة AVL وتطبيقات Big-O',
    locationOrMethod: 'قاعة الخوارزميات CS102'
  },
  {
    id: 'sch-2',
    day: 'الأحد',
    timeSlot: '16:00 - 18:00',
    subject: 'هندسة البرمجيات وتصميم الأنظمة',
    doctorName: 'د. ليلى الشريف',
    topic: 'تطبيق عملي لمبادئ SOLID وتصميم معمارية Clean Code',
    locationOrMethod: 'مختبر البرمجيات 04'
  },
  {
    id: 'sch-3',
    day: 'الإثنين',
    timeSlot: '09:00 - 11:30',
    subject: 'أنظمة التشغيل والبرمجة المتزامنة',
    doctorName: 'د. عمر عبد الرحمن',
    topic: 'تطبيقات عملية على خيوط المعالجة Threads والتزامن بـ Semaphores',
    locationOrMethod: 'مختبر نظم التشغيل 02'
  },
  {
    id: 'sch-4',
    day: 'الثلاثاء',
    timeSlot: '10:00 - 12:30',
    subject: 'قواعد البيانات ونظم المعلومات',
    doctorName: 'د. سامي العتيبي',
    topic: 'تحسين أداء الاستعلامات وتطبيع الجداول Normalization',
    locationOrMethod: 'قاعة قواعد البيانات 201'
  },
  {
    id: 'sch-5',
    day: 'الأربعاء',
    timeSlot: '13:00 - 15:30',
    subject: 'شبكات الحاسوب وأمن المعلومات',
    doctorName: 'د. فراس النجار',
    topic: 'تحليل حزم البيانات بـ Wireshark ودراسة طبقات OSI',
    locationOrMethod: 'مختبر الشبكات الأكاديمي'
  },
  {
    id: 'sch-6',
    day: 'الخميس',
    timeSlot: '11:00 - 13:30',
    subject: 'الذكاء الاصطناعي وتعلم الآلة',
    doctorName: 'د. رانيا المهدي',
    topic: 'خوارزميات الانحدار والتصنيف وتطبيقات بايثون',
    locationOrMethod: 'مدرج الذكاء الاصطناعي A'
  }
];

export const INITIAL_EXAMS: ExamCountdown[] = [
  {
    id: 'ex-1',
    subject: 'امتحان منتصف الفصل: هياكل البيانات والخوارزميات (CS201)',
    doctorName: 'أ.د. حسام السعيد',
    examDate: '2026-10-24',
    notes: 'يشمل المصفوفات، القوائم المترابطة، الأشجار الثنائية، وتحليل التعقيد Big-O.'
  },
  {
    id: 'ex-2',
    subject: 'الاختبار العملي: هندسة البرمجيات وتصميم النظم (SE301)',
    doctorName: 'د. ليلى الشريف',
    examDate: '2026-10-29',
    notes: 'تسليم وثيقة متطلبات النظام SRS ومخططات UML وتطبيق Design Patterns.'
  },
  {
    id: 'ex-3',
    subject: 'الاختبار الشهري: نظم إدارة قواعد البيانات (CS240)',
    doctorName: 'د. سامي العتيبي',
    examDate: '2026-11-06',
    notes: 'يشمل استعلامات SQL المعقدة وخواص معاملات ACID وتطبيع 3NF.'
  },
  {
    id: 'ex-4',
    subject: 'الامتحان النهائي: أنظمة التشغيل والبرمجة المتزامنة (CS310)',
    doctorName: 'د. عمر عبد الرحمن',
    examDate: '2026-11-19',
    notes: 'يشمل إدارة الذاكرة الافتراضية وخوارزميات تجنب الاستعصاء Deadlock.'
  }
];

const STORAGE_PREFIX = 'study_cs_v3_';

export function getStoredSubjects(): UserSubject[] {
  try {
    const item = localStorage.getItem(`${STORAGE_PREFIX}subjects`);
    return item ? JSON.parse(item) : INITIAL_SUBJECTS;
  } catch {
    return INITIAL_SUBJECTS;
  }
}

export function saveStoredSubjects(subjects: UserSubject[]) {
  try {
    localStorage.setItem(`${STORAGE_PREFIX}subjects`, JSON.stringify(subjects));
  } catch (e) {
    console.error('Failed to save subjects', e);
  }
}

export function getStoredMaterials(): StudyMaterial[] {
  try {
    const item = localStorage.getItem(`${STORAGE_PREFIX}materials`);
    return item ? JSON.parse(item) : INITIAL_MATERIALS;
  } catch {
    return INITIAL_MATERIALS;
  }
}

export function saveStoredMaterials(materials: StudyMaterial[]) {
  try {
    localStorage.setItem(`${STORAGE_PREFIX}materials`, JSON.stringify(materials));
  } catch (e) {
    console.error('Failed to save materials', e);
  }
}

export function getStoredSummaries(): StudySummary[] {
  try {
    const item = localStorage.getItem(`${STORAGE_PREFIX}summaries`);
    return item ? JSON.parse(item) : INITIAL_SUMMARIES;
  } catch {
    return INITIAL_SUMMARIES;
  }
}

export function saveStoredSummaries(summaries: StudySummary[]) {
  try {
    localStorage.setItem(`${STORAGE_PREFIX}summaries`, JSON.stringify(summaries));
  } catch (e) {
    console.error('Failed to save summaries', e);
  }
}

export function getStoredTasks(): StudyTask[] {
  try {
    const item = localStorage.getItem(`${STORAGE_PREFIX}tasks`);
    return item ? JSON.parse(item) : INITIAL_TASKS;
  } catch {
    return INITIAL_TASKS;
  }
}

export function saveStoredTasks(tasks: StudyTask[]) {
  try {
    localStorage.setItem(`${STORAGE_PREFIX}tasks`, JSON.stringify(tasks));
  } catch (e) {
    console.error('Failed to save tasks', e);
  }
}

export function getStoredSchedule(): WeeklyScheduleItem[] {
  try {
    const item = localStorage.getItem(`${STORAGE_PREFIX}schedule`);
    return item ? JSON.parse(item) : INITIAL_SCHEDULE;
  } catch {
    return INITIAL_SCHEDULE;
  }
}

export function saveStoredSchedule(schedule: WeeklyScheduleItem[]) {
  try {
    localStorage.setItem(`${STORAGE_PREFIX}schedule`, JSON.stringify(schedule));
  } catch (e) {
    console.error('Failed to save schedule', e);
  }
}

export function getStoredExams(): ExamCountdown[] {
  try {
    const item = localStorage.getItem(`${STORAGE_PREFIX}exams`);
    return item ? JSON.parse(item) : INITIAL_EXAMS;
  } catch {
    return INITIAL_EXAMS;
  }
}

export function saveStoredExams(exams: ExamCountdown[]) {
  try {
    localStorage.setItem(`${STORAGE_PREFIX}exams`, JSON.stringify(exams));
  } catch (e) {
    console.error('Failed to save exams', e);
  }
}
