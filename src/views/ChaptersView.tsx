import React from 'react';
import { BookOpen, CheckCircle2, ShieldCheck, ArrowRight, Sparkles, FileText } from 'lucide-react';
import { Chapter } from '../types';

interface ChaptersViewProps {
  chapters: Chapter[];
  onNavigateToIntroLesson: () => void;
}

export const ChaptersView: React.FC<ChaptersViewProps> = ({
  chapters,
  onNavigateToIntroLesson,
}) => {
  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-pink-200 shadow-sm space-y-3">
        <div className="flex items-center space-x-2">
          <span className="bg-pink-100 text-pink-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            BOOK-TO-LESSON WORKFLOW
          </span>
          <span className="text-xs text-slate-500 font-mono">
            Cambridge University Press Edition
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-serif">
          Gillian Lazar (1993) Textbook Chapter Index
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed max-w-3xl">
          Each chapter follows our verified book-to-lesson workflow: verified PDF extraction, chapter structure breakdown, Plain vs Academic explanations, critical theoretical analysis, source references, and interactive review activities.
        </p>
      </div>

      {/* Chapters Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {chapters.map(ch => (
          <div
            key={ch.id}
            className={`p-6 rounded-3xl bg-white border transition-all flex flex-col justify-between ${
              ch.isFeatured
                ? 'border-pink-400 ring-2 ring-pink-400/20 shadow-pink-soft'
                : 'border-pink-200 shadow-sm hover:border-pink-300'
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="w-10 h-10 rounded-2xl bg-pink-600 text-white font-extrabold text-sm flex items-center justify-center shadow-sm">
                    {ch.number}
                  </span>
                  <span className="text-xs font-mono font-bold text-pink-700 bg-pink-50 px-2.5 py-1 rounded-lg border border-pink-200">
                    {ch.pageRange}
                  </span>
                </div>

                {ch.isFeatured ? (
                  <span className="bg-emerald-100 text-emerald-800 text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center">
                    <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-emerald-600" /> Complete Lesson
                  </span>
                ) : (
                  <span className="bg-slate-100 text-slate-600 text-[11px] font-semibold px-2.5 py-1 rounded-full">
                    Syllabus Standard
                  </span>
                )}
              </div>

              <h3 className="font-bold text-lg text-slate-900 font-serif leading-snug">
                {ch.title}
              </h3>
              <p className="text-xs text-pink-700 font-semibold">
                {ch.subtitle}
              </p>
              <p className="text-xs text-slate-600 leading-relaxed">
                {ch.description}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-pink-100 flex items-center justify-between">
              <div className="text-[11px] text-slate-500 font-medium">
                {ch.topicsCount} Pedagogy Modules • Flashcards & Quiz
              </div>

              {ch.id === 'intro' ? (
                <button
                  onClick={onNavigateToIntroLesson}
                  className="px-4 py-2 rounded-xl bg-pink-600 hover:bg-pink-700 text-white text-xs font-extrabold shadow-sm flex items-center space-x-1.5 transition-all hover:scale-105"
                >
                  <span>Launch Chapter 1 Lesson</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  onClick={onNavigateToIntroLesson}
                  className="px-3.5 py-1.5 rounded-xl bg-pink-50 text-pink-700 hover:bg-pink-100 text-xs font-bold border border-pink-200 transition-colors"
                >
                  Preview Syllabus
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
