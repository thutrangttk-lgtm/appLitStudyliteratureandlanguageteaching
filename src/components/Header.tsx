import React from 'react';
import { BookOpen, GraduationCap, ShieldCheck, Sparkles, User, Settings, FileEdit, HelpCircle, BarChart3, Bookmark } from 'lucide-react';
import { AppSettings, LearningMode, UserRole } from '../types';

interface HeaderProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  learningMode: LearningMode;
  setLearningMode: (mode: LearningMode) => void;
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  settings: AppSettings;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  setCurrentTab,
  learningMode,
  setLearningMode,
  userRole,
  setUserRole,
  settings,
}) => {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-pink-200 shadow-sm">
      {/* Top Banner - Mandatory Branding for Ms. Trần Thị Thu Trang & Program Info */}
      <div className="bg-gradient-to-r from-pink-700 via-rose-700 to-pink-800 text-white px-4 py-2 shadow-inner">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-xs md:text-sm gap-2">
          {/* Program & Institution */}
          <div className="flex items-center space-x-2 font-medium">
            <span className="bg-pink-100 text-pink-900 font-bold px-2.5 py-0.5 rounded-full text-[11px] shadow-sm tracking-wide">
              MASTER'S DEGREE
            </span>
            <span className="truncate max-w-md font-sans opacity-95">
              {settings.schoolInfo}
            </span>
          </div>

          {/* Instructor Identity & Role Guard Toggle */}
          <div className="flex items-center space-x-3">
            {/* Instructor Profile Badge */}
            <div className="flex items-center space-x-2 bg-white/15 px-3 py-1 rounded-full border border-white/20 backdrop-blur-sm">
              <img
                src={settings.adminPhotoUrl}
                alt={settings.instructorName}
                className="w-5 h-5 rounded-full object-cover border border-white/40"
              />
              <span className="font-bold text-pink-100 tracking-wide">
                {settings.instructorName}
              </span>
              <span className="text-pink-200 text-[11px] hidden lg:inline">
                | {settings.instructorTitle}
              </span>
            </div>

            {/* Role Guard Switcher (Admin vs Student) */}
            <button
              onClick={() => setUserRole(userRole === 'admin' ? 'student' : 'admin')}
              title="Click to toggle between Admin and Student role permissions"
              className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all ${
                userRole === 'admin'
                  ? 'bg-amber-300 text-amber-950 hover:bg-amber-400'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Role: {userRole === 'admin' ? 'Admin' : 'Student'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-col lg:flex-row items-center justify-between gap-4">
        {/* App Title & Logo */}
        <div
          onClick={() => setCurrentTab('dashboard')}
          className="flex items-center space-x-3 cursor-pointer group"
        >
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-pink-500 to-rose-400 flex items-center justify-center text-white shadow-pink-soft group-hover:scale-105 transition-transform">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-bold text-lg sm:text-xl text-slate-900 group-hover:text-pink-600 transition-colors flex items-center gap-2">
              Literature & Language Teaching
              <span className="text-xs font-mono bg-pink-100 text-pink-700 px-2 py-0.5 rounded border border-pink-200">
                Lazar 1993
              </span>
            </h1>
            <p className="text-xs text-slate-500 font-medium">
              Master's ELT Pedagogy & Literature Learning Hub
            </p>
          </div>
        </div>

        {/* Center: Dual-Mode Toggle (Plain English vs Academic English) */}
        <div className="flex items-center bg-pink-50 p-1 rounded-2xl border border-pink-200 shadow-inner">
          <button
            onClick={() => setLearningMode('plain')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              learningMode === 'plain'
                ? 'bg-white text-pink-700 shadow-sm border border-pink-200'
                : 'text-slate-600 hover:text-pink-600'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-pink-500" />
            <span>Plain English</span>
          </button>
          <button
            onClick={() => setLearningMode('academic')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              learningMode === 'academic'
                ? 'bg-pink-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-pink-600'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Academic English</span>
          </button>
        </div>

        {/* SPA Routing Navigation Buttons */}
        <nav className="flex items-center space-x-1 overflow-x-auto max-w-full pb-1 lg:pb-0">
          <button
            onClick={() => setCurrentTab('dashboard')}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-colors ${
              currentTab === 'dashboard'
                ? 'bg-pink-100 text-pink-800'
                : 'text-slate-700 hover:bg-pink-50'
            }`}
          >
            Dashboard
          </button>

          <button
            onClick={() => setCurrentTab('intro-lesson')}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-colors flex items-center space-x-1 ${
              currentTab === 'intro-lesson'
                ? 'bg-pink-600 text-white shadow-sm'
                : 'bg-pink-50 text-pink-700 hover:bg-pink-100'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Intro Lesson</span>
          </button>

          <button
            onClick={() => setCurrentTab('chapters')}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-colors ${
              currentTab === 'chapters'
                ? 'bg-pink-100 text-pink-800'
                : 'text-slate-700 hover:bg-pink-50'
            }`}
          >
            Chapters
          </button>

          <button
            onClick={() => setCurrentTab('writing')}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-colors flex items-center space-x-1 ${
              currentTab === 'writing'
                ? 'bg-pink-100 text-pink-800'
                : 'text-slate-700 hover:bg-pink-50'
            }`}
          >
            <FileEdit className="w-3.5 h-3.5" />
            <span>Writing Studio</span>
          </button>

          <button
            onClick={() => setCurrentTab('notes')}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-colors flex items-center space-x-1 ${
              currentTab === 'notes'
                ? 'bg-pink-100 text-pink-800'
                : 'text-slate-700 hover:bg-pink-50'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>Notes</span>
          </button>

          <button
            onClick={() => setCurrentTab('ai-assistant')}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-colors flex items-center space-x-1 ${
              currentTab === 'ai-assistant'
                ? 'bg-pink-100 text-pink-800'
                : 'text-slate-700 hover:bg-pink-50'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5 text-pink-500" />
            <span>AI RAG</span>
          </button>

          <button
            onClick={() => setCurrentTab('admin')}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-colors flex items-center space-x-1 ${
              currentTab === 'admin'
                ? 'bg-slate-900 text-pink-300'
                : 'text-slate-700 hover:bg-pink-50'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Admin</span>
          </button>
        </nav>
      </div>
    </header>
  );
};
