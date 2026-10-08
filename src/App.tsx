import React, { useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { VerifiedCitationModal } from './components/VerifiedCitationModal';
import { AiAssistantDrawer } from './components/AiAssistantDrawer';
import { NoteDrawer } from './components/NoteDrawer';
import { DashboardView } from './views/DashboardView';
import { ChaptersView } from './views/ChaptersView';
import { IntroLessonView } from './views/IntroLessonView';
import { WritingStudioView } from './views/WritingStudioView';
import { NotesView } from './views/NotesView';
import { AiChatView } from './views/AiChatView';
import { AdminDashboardView } from './views/AdminDashboardView';
import { AppSettings, Citation, LearningMode, UserRole } from './types';
import { StorageService } from './services/storageService';
import { CHAPTERS_DATA } from './data/chaptersData';

export const App: React.FC = () => {
  // SPA Active Tab Router State
  const [currentTab, setCurrentTab] = useState<string>('intro-lesson'); // Begin directly with Intro Lesson for immediate evaluation!

  // Dual-mode learning state (Plain vs Academic English)
  const [learningMode, setLearningMode] = useState<LearningMode>(() => StorageService.getLearningMode());

  // User Profile & Role Guard state (admin vs student)
  const [userRole, setUserRole] = useState<UserRole>(() => StorageService.getUser().role);

  // App Branding Settings
  const [settings, setSettings] = useState<AppSettings>(() => StorageService.getSettings());

  // Modals state
  const [activeCitation, setActiveCitation] = useState<Citation | null>(null);
  const [isAiDrawerOpen, setIsAiDrawerOpen] = useState(false);
  const [isNoteDrawerOpen, setIsNoteDrawerOpen] = useState(false);

  const handleSetLearningMode = (mode: LearningMode) => {
    setLearningMode(mode);
    StorageService.setLearningMode(mode);
  };

  const handleSetUserRole = (role: UserRole) => {
    setUserRole(role);
    StorageService.setUserRole(role);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-pink-50/60 via-white to-rose-50/40 text-slate-800">
      {/* Header with persistent branding & mode toggle */}
      <Header
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        learningMode={learningMode}
        setLearningMode={handleSetLearningMode}
        userRole={userRole}
        setUserRole={handleSetUserRole}
        settings={settings}
      />

      {/* Main View Router Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8">
        {currentTab === 'dashboard' && (
          <DashboardView
            onNavigate={setCurrentTab}
            learningMode={learningMode}
            setLearningMode={handleSetLearningMode}
            settings={settings}
            chapters={CHAPTERS_DATA}
          />
        )}

        {currentTab === 'chapters' && (
          <ChaptersView
            chapters={CHAPTERS_DATA}
            onNavigateToIntroLesson={() => setCurrentTab('intro-lesson')}
          />
        )}

        {currentTab === 'intro-lesson' && (
          <IntroLessonView
            learningMode={learningMode}
            setLearningMode={handleSetLearningMode}
            onViewCitation={setActiveCitation}
            onOpenNoteDrawer={() => setIsNoteDrawerOpen(true)}
            onOpenAiAssistant={() => setIsAiDrawerOpen(true)}
            onNavigateToWritingStudio={() => setCurrentTab('writing')}
          />
        )}

        {currentTab === 'writing' && (
          <WritingStudioView />
        )}

        {currentTab === 'notes' && (
          <NotesView
            onOpenNoteDrawer={() => setIsNoteDrawerOpen(true)}
          />
        )}

        {currentTab === 'ai-assistant' && (
          <AiChatView
            learningMode={learningMode}
            onViewCitation={setActiveCitation}
          />
        )}

        {currentTab === 'admin' && (
          <AdminDashboardView
            userRole={userRole}
            setUserRole={handleSetUserRole}
            settings={settings}
            onUpdateSettings={setSettings}
          />
        )}
      </main>

      {/* Persistent Footer with Branding */}
      <Footer settings={settings} />

      {/* Global Modals & Drawers */}
      <VerifiedCitationModal
        citation={activeCitation}
        onClose={() => setActiveCitation(null)}
      />

      <AiAssistantDrawer
        isOpen={isAiDrawerOpen}
        onClose={() => setIsAiDrawerOpen(false)}
        learningMode={learningMode}
        onViewCitation={setActiveCitation}
      />

      <NoteDrawer
        isOpen={isNoteDrawerOpen}
        onClose={() => setIsNoteDrawerOpen(false)}
        lessonId="intro"
        lessonTitle="Chapter 1: Introduction - Using Literature in ELT"
      />
    </div>
  );
};

export default App;
