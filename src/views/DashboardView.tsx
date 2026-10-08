import React from 'react';
import { BookOpen, Sparkles, GraduationCap, ShieldCheck, ArrowRight, Award, FileEdit, HelpCircle, CheckCircle2, Clock, Zap } from 'lucide-react';
import { AppSettings, Chapter, LearningMode } from '../types';
import { pdfRetrievalService } from '../services/pdfRetrievalService';

interface DashboardViewProps {
  onNavigate: (tab: string) => void;
  learningMode: LearningMode;
  setLearningMode: (mode: LearningMode) => void;
  settings: AppSettings;
  chapters: Chapter[];
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  onNavigate,
  learningMode,
  setLearningMode,
  settings,
  chapters,
}) => {
  const pdfStatus = pdfRetrievalService.getStatus();

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-pink-700 via-rose-700 to-pink-900 text-white p-6 sm:p-10 shadow-pink-soft">
        <div className="absolute right-0 top-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
        
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="bg-pink-100 text-pink-900 font-extrabold text-xs px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
              Welcome Master's Scholar
            </span>
            <span className="bg-white/15 text-pink-100 text-xs font-semibold px-3 py-1 rounded-full border border-white/20 backdrop-blur-sm flex items-center">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-300 mr-1" />
              PDF RAG Connected (Lazar 1993)
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight text-white font-serif">
            Transforming Literature Pedagogy for Master's ELT Teachers
          </h1>

          <p className="text-sm sm:text-base text-pink-100 leading-relaxed max-w-2xl font-sans">
            Curated by <strong className="text-white underline decoration-pink-300">{settings.instructorName}</strong> for {settings.programName}. Master Gillian Lazar's landmark textbook with dual Plain/Academic English explanations, verified page citations, and interactive writing tools.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate('intro-lesson')}
              className="px-6 py-3.5 rounded-2xl bg-white text-pink-800 hover:bg-pink-50 font-extrabold text-xs sm:text-sm shadow-lg flex items-center space-x-2 transition-transform hover:scale-105"
            >
              <BookOpen className="w-4 h-4 text-pink-600" />
              <span>Start Chapter 1 Intro Lesson</span>
              <ArrowRight className="w-4 h-4 text-pink-600" />
            </button>

            <button
              onClick={() => onNavigate('ai-assistant')}
              className="px-5 py-3.5 rounded-2xl bg-pink-800/80 hover:bg-pink-800 text-white font-bold text-xs sm:text-sm border border-pink-400/30 flex items-center space-x-2 transition-colors"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Ask AI RAG Assistant</span>
            </button>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-pink-200 shadow-sm flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-pink-100 text-pink-700 flex items-center justify-center font-bold">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Book Coverage</p>
            <p className="text-xl font-extrabold text-slate-900">8 Chapters / 288 Pgs</p>
            <p className="text-[11px] text-pink-600 font-medium">Gillian Lazar (1993)</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-pink-200 shadow-sm flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Learning Mode</p>
            <p className="text-xl font-extrabold text-slate-900 capitalize">{learningMode} English</p>
            <button
              onClick={() => setLearningMode(learningMode === 'plain' ? 'academic' : 'plain')}
              className="text-[11px] text-pink-600 font-bold hover:underline"
            >
              Click to toggle mode →
            </button>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-pink-200 shadow-sm flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">RAG PDF Status</p>
            <p className="text-xl font-extrabold text-emerald-700">Authenticated</p>
            <p className="text-[11px] text-slate-500">288 Pages Chunked</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-pink-200 shadow-sm flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Instructor</p>
            <p className="text-sm font-extrabold text-slate-900 truncate max-w-[120px]">{settings.instructorName}</p>
            <p className="text-[11px] text-pink-600 font-medium">Master Specialist</p>
          </div>
        </div>
      </div>

      {/* Featured Intro Lesson Highlight Card */}
      <div className="bg-gradient-to-r from-pink-50 via-rose-50 to-pink-100 p-6 sm:p-8 rounded-3xl border-2 border-pink-300 shadow-pink-soft flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-3 max-w-2xl">
          <div className="flex items-center space-x-2">
            <span className="bg-pink-600 text-white font-extrabold text-[11px] px-3 py-1 rounded-full uppercase tracking-wider">
              FLAGSHIP INTRODUCTION LESSON
            </span>
            <span className="text-xs font-semibold text-pink-800 bg-white px-2.5 py-0.5 rounded-full border border-pink-200">
              Pages 1–22 • Complete
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-serif">
            Chapter 1: Using Literature in the Language Classroom: Reasons and Approaches
          </h2>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            Experience the complete interactive lesson right now! Understand why literature works in ELT, toggle Plain vs Academic explanations, review Carter & Long's Language-based model, test yourself with active recall flashcards, and draft an academic essay.
          </p>
          <div className="flex flex-wrap gap-4 text-xs font-semibold text-pink-800">
            <span className="flex items-center"><CheckCircle2 className="w-4 h-4 text-emerald-600 mr-1" /> Verified Citations</span>
            <span className="flex items-center"><CheckCircle2 className="w-4 h-4 text-emerald-600 mr-1" /> Active Recall Flashcards</span>
            <span className="flex items-center"><CheckCircle2 className="w-4 h-4 text-emerald-600 mr-1" /> Interactive Quiz</span>
          </div>
        </div>

        <button
          onClick={() => onNavigate('intro-lesson')}
          className="px-8 py-4 rounded-2xl bg-pink-600 hover:bg-pink-700 text-white font-extrabold text-sm shadow-md transition-all hover:scale-105 shrink-0 flex items-center space-x-2"
        >
          <span>Open Full Lesson</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

      {/* Chapters Grid Preview */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900 font-serif">
              Book Structure & Chapter Workflow
            </h3>
            <p className="text-xs text-slate-500">
              Gillian Lazar (1993) "Literature and Language Teaching" (Cambridge University Press)
            </p>
          </div>
          <button
            onClick={() => onNavigate('chapters')}
            className="text-xs font-bold text-pink-700 hover:text-pink-800"
          >
            View All 8 Chapters →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {chapters.slice(0, 4).map(ch => (
            <div
              key={ch.id}
              onClick={() => ch.id === 'intro' ? onNavigate('intro-lesson') : onNavigate('chapters')}
              className={`p-5 rounded-2xl bg-white border transition-all cursor-pointer ${
                ch.isFeatured
                  ? 'border-pink-300 ring-2 ring-pink-400/20 shadow-pink-soft'
                  : 'border-pink-100 hover:border-pink-300'
              }`}
            >
              <div className="flex items-start justify-between">
                <span className="w-8 h-8 rounded-xl bg-pink-100 text-pink-700 font-bold text-xs flex items-center justify-center">
                  #{ch.number}
                </span>
                <span className="text-[11px] font-mono text-pink-600 bg-pink-50 px-2 py-0.5 rounded border border-pink-200">
                  {ch.pageRange}
                </span>
              </div>
              <h4 className="font-bold text-sm text-slate-900 mt-3 font-serif line-clamp-1">
                {ch.title}
              </h4>
              <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                {ch.description}
              </p>
              <div className="mt-4 pt-3 border-t border-pink-50 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium">
                  {ch.topicsCount} Pedagogy Modules
                </span>
                <span className="font-bold text-pink-600 flex items-center">
                  {ch.id === 'intro' ? 'Explore Lesson →' : 'View Chapter →'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
