import React from 'react';
import { Citation } from '../types';
import { X, ShieldCheck, BookOpen, ExternalLink, CheckCircle2 } from 'lucide-react';

interface VerifiedCitationModalProps {
  citation: Citation | null;
  onClose: () => void;
}

export const VerifiedCitationModal: React.FC<VerifiedCitationModalProps> = ({ citation, onClose }) => {
  if (!citation) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-pink-200 overflow-hidden">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-pink-600 via-rose-600 to-pink-700 text-white p-6 flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-pink-100">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="bg-pink-100 text-pink-900 text-xs font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  Verified Page Citation
                </span>
                <span className="text-xs text-pink-200 font-mono flex items-center">
                  <ShieldCheck className="w-3.5 h-3.5 mr-1 text-emerald-300" /> Authenticated Chunk
                </span>
              </div>
              <h3 className="font-bold text-lg text-white mt-1">
                {citation.bookTitle}
              </h3>
              <p className="text-xs text-pink-100">
                Author: <span className="font-semibold text-white">{citation.author} ({citation.year})</span>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5">
          {/* Page Badge & Verification Info */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-pink-50 p-4 rounded-2xl border border-pink-200">
            <div className="flex items-center space-x-3">
              <span className="w-12 h-12 rounded-xl bg-pink-600 text-white font-extrabold text-lg flex items-center justify-center shadow-sm">
                P.{citation.pageNumber}
              </span>
              <div>
                <p className="text-xs font-bold text-slate-900">
                  Verified Textbook Location
                </p>
                <p className="text-xs text-slate-500">
                  Extracted from Cambridge University Press Original Edition
                </p>
              </div>
            </div>
            <div className="text-right font-mono text-[11px] text-slate-500 bg-white px-3 py-1.5 rounded-lg border border-pink-100">
              <span className="text-slate-400">HASH: </span>
              <span className="text-pink-700 font-semibold">{citation.verificationHash}</span>
            </div>
          </div>

          {/* Exact Text Excerpt */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 mr-1.5" />
              Exact Extracted Textbook Excerpt
            </h4>
            <div className="p-5 rounded-2xl bg-slate-900 text-pink-50 font-serif italic text-sm leading-relaxed border border-slate-800 shadow-inner relative">
              <span className="text-4xl text-pink-500/30 font-serif absolute top-2 left-3 leading-none">“</span>
              <p className="relative z-10 pl-4">{citation.excerpt}</p>
              <span className="text-4xl text-pink-500/30 font-serif absolute bottom-0 right-3 leading-none">”</span>
            </div>
          </div>

          {/* Theoretical Note */}
          <div className="text-xs text-slate-600 bg-pink-50/50 p-3 rounded-xl border border-pink-100 flex items-start space-x-2">
            <ExternalLink className="w-4 h-4 text-pink-500 shrink-0 mt-0.5" />
            <p>
              This verified quote is part of the indexed vector corpus for Gillian Lazar's <em>Literature and Language Teaching</em>. Used for Master's thesis referencing and pedagogical analysis.
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-pink-600 hover:bg-pink-700 text-white font-bold text-xs shadow-sm transition-colors"
          >
            Close Citation
          </button>
        </div>
      </div>
    </div>
  );
};
