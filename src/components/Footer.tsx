import React from 'react';
import { BookOpen, ShieldCheck, Heart } from 'lucide-react';
import { AppSettings } from '../types';

interface FooterProps {
  settings: AppSettings;
}

export const Footer: React.FC<FooterProps> = ({ settings }) => {
  return (
    <footer className="bg-white border-t border-pink-200 py-8 px-4 text-xs text-slate-600 mt-16">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Branding & Instructor */}
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-pink-100 flex items-center justify-center text-pink-700 font-bold border border-pink-200">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <p className="font-bold text-slate-900 text-sm">
              Literature and Language Teaching Master's App
            </p>
            <p className="text-slate-500 font-medium">
              Course Instructor & Master Specialist: <span className="font-bold text-pink-700">{settings.instructorName}</span>
            </p>
          </div>
        </div>

        {/* Institution & Security Status */}
        <div className="text-center md:text-right">
          <p className="font-semibold text-slate-700">
            {settings.schoolInfo}
          </p>
          <div className="flex items-center justify-center md:justify-end space-x-2 mt-1">
            <span className="inline-flex items-center text-[11px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              <ShieldCheck className="w-3 h-3 mr-1" /> PDF Storage RAG Authenticated
            </span>
          </div>
        </div>
      </div>

      {/* Agreed Copyright Notice */}
      <div className="max-w-7xl mx-auto border-t border-pink-100 mt-6 pt-6 flex flex-col sm:flex-row justify-between items-center text-slate-400 gap-2">
        <p className="text-[11px] text-slate-500 font-medium">
          {settings.copyrightNotice}
        </p>
        <p className="text-[11px] text-pink-500 flex items-center">
          Designed for Master's ELT Studies <Heart className="w-3 h-3 ml-1 fill-pink-500 text-pink-500" />
        </p>
      </div>
    </footer>
  );
};
