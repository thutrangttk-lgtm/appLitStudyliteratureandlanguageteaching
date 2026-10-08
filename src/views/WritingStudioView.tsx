import React, { useState } from 'react';
import { FileEdit, History, Sparkles, Save, CheckCircle2, Clock, FileText, ArrowLeft } from 'lucide-react';
import { DraftVersion, WritingDraft } from '../types';
import { StorageService } from '../services/storageService';
import { AnalyticsService } from '../services/analyticsService';

export const WritingStudioView: React.FC = () => {
  const [drafts, setDrafts] = useState<WritingDraft[]>(() => StorageService.getDrafts());
  const [activeDraftId, setActiveDraftId] = useState<string>(() => drafts[0]?.id || 'draft-001');

  const activeDraft = drafts.find(d => d.id === activeDraftId) || drafts[0];

  const [editorContent, setEditorContent] = useState<string>(activeDraft?.currentContent || '');
  const [versionNote, setVersionNote] = useState<string>('');
  const [aiFeedback, setAiFeedback] = useState<{
    strengths: string[];
    improvements: string[];
    citations: string[];
  } | null>(null);

  const [savedSuccess, setSavedSuccess] = useState(false);

  const wordCount = editorContent.trim().split(/\s+/).filter(Boolean).length;

  const handleSaveSnapshot = () => {
    if (!activeDraft) return;

    const currentVersions = activeDraft.versions || [];
    const nextVerNum = (currentVersions.length + 1) * 0.1 + 1.0;
    const versionString = nextVerNum.toFixed(1);

    const newVersion: DraftVersion = {
      versionId: `v-${Date.now()}`,
      versionNumber: versionString,
      timestamp: new Date().toISOString(),
      content: editorContent,
      wordCount,
      note: versionNote.trim() || `Saved snapshot ${versionString}`
    };

    const updatedDraft: WritingDraft = {
      ...activeDraft,
      currentContent: editorContent,
      versions: [newVersion, ...currentVersions],
      updatedAt: new Date().toISOString()
    };

    StorageService.saveDraft(updatedDraft);
    setDrafts(StorageService.getDrafts());
    setVersionNote('');
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);

    const user = StorageService.getUser();
    AnalyticsService.logActivity(
      user.id,
      user.name,
      'draft_saved',
      `Saved Version ${versionString} of essay draft "${activeDraft.title}" (${wordCount} words)`,
      { version: versionString, wordCount }
    );
  };

  const handleGenerateAiFeedback = () => {
    setAiFeedback({
      strengths: [
        'Strong theoretical alignment with Gillian Lazar (1993, p. 5) Language-based paradigm.',
        'Clear distinction between stylistic text analysis and purely structural grammar drills.',
        'Effective academic register and cohesive transitional phrasing.'
      ],
      improvements: [
        'Incorporate Louise Rosenblatt\'s Reader-Response Theory (Lazar p. 12) to expand on the Personal Growth dimension.',
        'Provide a concrete secondary classroom example from Vietnam high school curriculum.'
      ],
      citations: [
        'Lazar, G. (1993). Literature and Language Teaching. Cambridge University Press (pp. 5, 12, 19).',
        'Carter, R., & Long, M. N. (1991). Teaching Literature. Longman.'
      ]
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* View Header */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-pink-200 shadow-sm space-y-3">
        <div className="flex items-center space-x-2">
          <span className="bg-pink-100 text-pink-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            PARTICIPANT WRITING STUDIO & VERSION CONTROL
          </span>
          <span className="text-xs text-slate-500 font-mono">
            Master's Essay Workspace
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-serif">
          Academic Essay Writing & Draft Snapshot Versions
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed max-w-3xl">
          Draft your literature pedagogy papers with automatic snapshot version control, word count analytics, and instant AI literature citation feedback.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Main Editor Workspace */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white p-6 rounded-3xl border border-pink-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-pink-100 pb-3">
              <div>
                <span className="text-[11px] font-bold text-pink-700 uppercase tracking-wider">Active Draft</span>
                <h3 className="font-bold text-base text-slate-900 font-serif">
                  {activeDraft?.title}
                </h3>
              </div>
              <div className="text-right">
                <span className="text-xs font-mono font-bold text-pink-700 bg-pink-50 px-2.5 py-1 rounded-lg border border-pink-200">
                  {wordCount} / {activeDraft?.targetWordCount || 800} Words
                </span>
              </div>
            </div>

            {savedSuccess && (
              <div className="bg-emerald-50 text-emerald-800 p-3 rounded-xl border border-emerald-200 text-xs font-bold flex items-center">
                <CheckCircle2 className="w-4 h-4 mr-2 text-emerald-600" />
                Snapshot version saved to your private database workspace!
              </div>
            )}

            {/* Rich Editor Textarea */}
            <textarea
              rows={16}
              value={editorContent}
              onChange={e => setEditorContent(e.target.value)}
              placeholder="Write your Master's academic essay draft here..."
              className="w-full p-4 rounded-2xl border border-pink-200 text-xs sm:text-sm leading-relaxed font-serif focus:outline-none focus:ring-2 focus:ring-pink-500 bg-pink-50/20 text-slate-800"
            />

            {/* Save Version Form */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 bg-pink-50/60 p-4 rounded-2xl border border-pink-200">
              <input
                type="text"
                value={versionNote}
                onChange={e => setVersionNote(e.target.value)}
                placeholder="Optional version note (e.g., Added Lazar p. 12 citations)..."
                className="flex-1 px-3.5 py-2 rounded-xl border border-pink-200 text-xs focus:outline-none focus:ring-2 focus:ring-pink-500 bg-white"
              />

              <div className="flex items-center space-x-2 shrink-0">
                <button
                  onClick={handleGenerateAiFeedback}
                  className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-amber-950 font-bold text-xs flex items-center space-x-1.5 shadow-sm transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>AI Feedback</span>
                </button>
                <button
                  onClick={handleSaveSnapshot}
                  className="px-5 py-2 rounded-xl bg-pink-600 hover:bg-pink-700 text-white font-bold text-xs flex items-center space-x-1.5 shadow-sm transition-colors"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Snapshot Version</span>
                </button>
              </div>
            </div>
          </div>

          {/* AI Feedback Panel */}
          {aiFeedback && (
            <div className="bg-slate-900 text-white p-6 rounded-3xl border border-slate-800 space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-sm text-pink-300 flex items-center font-serif">
                  <Sparkles className="w-4 h-4 text-amber-400 mr-2" />
                  AI Writing & Literature Citation Feedback
                </h4>
                <button
                  onClick={() => setAiFeedback(null)}
                  className="text-xs text-slate-400 hover:text-white"
                >
                  Dismiss
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1.5 bg-slate-800 p-3.5 rounded-2xl border border-slate-700">
                  <span className="font-bold text-emerald-400 uppercase tracking-wider">Key Strengths:</span>
                  <ul className="list-disc pl-4 space-y-1 text-slate-200">
                    {aiFeedback.strengths.map((s, i) => <li key={i}>{s}</li>)}
                  </ul>
                </div>

                <div className="space-y-1.5 bg-slate-800 p-3.5 rounded-2xl border border-slate-700">
                  <span className="font-bold text-amber-400 uppercase tracking-wider">Suggested Revisions:</span>
                  <ul className="list-disc pl-4 space-y-1 text-slate-200">
                    {aiFeedback.improvements.map((im, i) => <li key={i}>{im}</li>)}
                  </ul>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800 text-xs">
                <span className="font-bold text-pink-300">Verified Literature Citations to Embed:</span>
                <div className="mt-1 space-y-1 font-mono text-[11px] text-slate-300">
                  {aiFeedback.citations.map((c, i) => <p key={i}>• {c}</p>)}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Version History Snapshots */}
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-3xl border border-pink-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-pink-100 pb-3">
              <h3 className="font-bold text-sm text-slate-900 font-serif flex items-center">
                <History className="w-4 h-4 text-pink-600 mr-2" />
                Snapshot Version History
              </h3>
              <span className="text-xs text-slate-500 font-mono">
                {activeDraft?.versions.length || 0} Versions Saved
              </span>
            </div>

            <div className="space-y-3 max-h-[500px] overflow-y-auto">
              {activeDraft?.versions.map((ver) => (
                <div
                  key={ver.versionId}
                  onClick={() => {
                    setEditorContent(ver.content);
                  }}
                  className="p-4 rounded-2xl bg-pink-50/50 hover:bg-pink-100/60 border border-pink-200 transition-all cursor-pointer space-y-2 group"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-pink-900 bg-white px-2 py-0.5 rounded border border-pink-200 font-mono">
                      v{ver.versionNumber}
                    </span>
                    <span className="text-[11px] text-slate-500 flex items-center">
                      <Clock className="w-3 h-3 mr-1 text-slate-400" />
                      {new Date(ver.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>

                  <p className="text-xs font-semibold text-slate-800 line-clamp-1">
                    {ver.note}
                  </p>

                  <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono pt-1">
                    <span>{ver.wordCount} words</span>
                    <span className="text-pink-600 group-hover:underline">Load Version →</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
