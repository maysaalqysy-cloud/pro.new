export type ActivePage = 'home' | 'materials' | 'summaries' | 'plans';

export interface StudyMaterial {
  id: string;
  title: string;
  subject: string;
  doctorName?: string; // اسم الدكتور / أستاذ المادة
  category: 'كتاب' | 'ملخص' | 'أسئلة وتدريبات' | 'عروض تقديمية' | 'نماذج امتحانات';
  author: string;
  fileSize: string;
  fileType: 'pdf' | 'docx' | 'pptx' | 'zip';
  downloadsCount: number;
  uploadedDate: string;
  description: string;
  previewSnippet?: string;
  downloadUrl?: string;
}

export interface StudySummary {
  id: string;
  title: string;
  subject: string;
  doctorName?: string; // اسم الدكتور
  content: string;
  tags: string[];
  lastModified: string;
  readTimeMinutes: number;
}

export interface StudyTask {
  id: string;
  title: string;
  subject: string;
  doctorName?: string; // اسم الدكتور المكلّف
  dueDate: string;
  durationMinutes: number;
  priority: 'عالية' | 'متوسطة' | 'منخفضة';
  completed: boolean;
  notes?: string;
}

export interface WeeklyScheduleItem {
  id: string;
  day: 'الأحد' | 'الإثنين' | 'الثلاثاء' | 'الأربعاء' | 'الخميس' | 'الجمعة' | 'السبت';
  timeSlot: string;
  subject: string;
  doctorName?: string; // اسم دكتور المحاضرة
  topic: string;
  locationOrMethod: string;
}

export interface ExamCountdown {
  id: string;
  subject: string;
  doctorName?: string; // اسم الدكتور
  examDate: string; // YYYY-MM-DD
  notes: string;
}

export interface UserSubject {
  id: string;
  name: string;
  doctorName?: string;
  code?: string;
}
