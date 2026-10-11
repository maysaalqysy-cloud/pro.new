import React, { useState, useEffect } from 'react';
import { ActivePage, StudyMaterial, StudySummary, StudyTask, WeeklyScheduleItem, ExamCountdown, UserSubject } from './types';
import {
  getStoredMaterials,
  saveStoredMaterials,
  getStoredSummaries,
  saveStoredSummaries,
  getStoredTasks,
  saveStoredTasks,
  getStoredSchedule,
  saveStoredSchedule,
  getStoredExams,
  saveStoredExams,
  getStoredSubjects,
  saveStoredSubjects
} from './utils/storage';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ClockWidget } from './components/ClockWidget';
import { SourceCodeModal } from './components/SourceCodeModal';
import { HomePage } from './pages/HomePage';
import { MaterialsPage } from './pages/MaterialsPage';
import { SummariesPage } from './pages/SummariesPage';
import { PlansPage } from './pages/PlansPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<ActivePage>('home');
  const [isClockOpen, setIsClockOpen] = useState(false);
  const [isSourceCodeOpen, setIsSourceCodeOpen] = useState(false);

  // Stored state
  const [subjects, setSubjects] = useState<UserSubject[]>([]);
  const [materials, setMaterials] = useState<StudyMaterial[]>([]);
  const [summaries, setSummaries] = useState<StudySummary[]>([]);
  const [tasks, setTasks] = useState<StudyTask[]>([]);
  const [schedule, setSchedule] = useState<WeeklyScheduleItem[]>([]);
  const [exams, setExams] = useState<ExamCountdown[]>([]);

  // Load initial data
  useEffect(() => {
    setSubjects(getStoredSubjects());
    setMaterials(getStoredMaterials());
    setSummaries(getStoredSummaries());
    setTasks(getStoredTasks());
    setSchedule(getStoredSchedule());
    setExams(getStoredExams());
  }, []);

  // Update handlers with persistence
  const handleUpdateSubjects = (newSubjects: UserSubject[]) => {
    setSubjects(newSubjects);
    saveStoredSubjects(newSubjects);
  };

  const handleUpdateMaterials = (newMaterials: StudyMaterial[]) => {
    setMaterials(newMaterials);
    saveStoredMaterials(newMaterials);
  };

  const handleUpdateSummaries = (newSummaries: StudySummary[]) => {
    setSummaries(newSummaries);
    saveStoredSummaries(newSummaries);
  };

  const handleUpdateTasks = (newTasks: StudyTask[]) => {
    setTasks(newTasks);
    saveStoredTasks(newTasks);
  };

  const handleUpdateSchedule = (newSchedule: WeeklyScheduleItem[]) => {
    setSchedule(newSchedule);
    saveStoredSchedule(newSchedule);
  };

  const handleUpdateExams = (newExams: ExamCountdown[]) => {
    setExams(newExams);
    saveStoredExams(newExams);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#19110b] text-[#f7efe4] font-tajawal selection:bg-[#9c6631] selection:text-white" dir="rtl">
      {/* Top Navbar */}
      <Navbar
        currentPage={currentPage}
        onNavigate={(page) => {
          setCurrentPage(page);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenClock={() => setIsClockOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {currentPage === 'home' && (
          <HomePage
            onNavigate={(page) => {
              setCurrentPage(page);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenClock={() => setIsClockOpen(true)}
            onOpenSourceCode={() => setIsSourceCodeOpen(true)}
            materials={materials}
            summaries={summaries}
            tasks={tasks}
            exams={exams}
            onUpdateTasks={handleUpdateTasks}
            onUpdateMaterials={handleUpdateMaterials}
          />
        )}

        {currentPage === 'materials' && (
          <MaterialsPage
            materials={materials}
            onUpdateMaterials={handleUpdateMaterials}
            subjects={subjects}
            onUpdateSubjects={handleUpdateSubjects}
          />
        )}

        {currentPage === 'summaries' && (
          <SummariesPage
            summaries={summaries}
            onUpdateSummaries={handleUpdateSummaries}
          />
        )}

        {currentPage === 'plans' && (
          <PlansPage
            tasks={tasks}
            onUpdateTasks={handleUpdateTasks}
            schedule={schedule}
            onUpdateSchedule={handleUpdateSchedule}
            exams={exams}
            onUpdateExams={handleUpdateExams}
            subjects={subjects}
          />
        )}
      </main>

      {/* Global Interactive Clock & Pomodoro Modal */}
      <ClockWidget
        isOpen={isClockOpen}
        onClose={() => setIsClockOpen(false)}
      />

      {/* Standalone Source Code Modal */}
      <SourceCodeModal
        isOpen={isSourceCodeOpen}
        onClose={() => setIsSourceCodeOpen(false)}
      />

      {/* Modern Minimal Footer */}
      <Footer
        onNavigate={(page) => {
          setCurrentPage(page);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenClock={() => setIsClockOpen(true)}
        onOpenSourceCode={() => setIsSourceCodeOpen(true)}
      />
    </div>
  );
}
