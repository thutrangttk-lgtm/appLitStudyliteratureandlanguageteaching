import React, { useState } from 'react';
import { X, Save, Tag, Bookmark, Check } from 'lucide-react';
import { StorageService } from '../services/storageService';

interface NoteDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  lessonId?: string;
  lessonTitle?: string;
}

export const NoteDrawer: React.FC<NoteDrawerProps> = ({
  isOpen,
  onClose,
  lessonId = 'intro',
  lessonTitle = 'Chapter 1: Introduction',
}) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    if (!title.trim() || !content.trim()) return;

    const tags = tagInput
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);

    StorageService.saveNote({
      userId: StorageService.getUser().id,
      lessonId,
      lessonTitle,
      title,
      content,
      tags: tags.length > 0 ? tags : ['chapter-1', 'pedagogy']
    });

    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      setTitle('');
      setContent('');
      setTagInput('');
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex justify-end">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300 border-l border-pink-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-pink-600 to-rose-600 text-white p-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Bookmark className="w-5 h-5 text-pink-200" />
            <div>
              <h3 className="font-bold text-sm text-white">
                Add Private Study Note
              </h3>
              <p className="text-xs text-pink-100 truncate max-w-xs">
                {lessonTitle}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-5 flex-1 space-y-4 overflow-y-auto">
          {savedSuccess && (
            <div className="bg-emerald-50 text-emerald-800 p-3 rounded-xl border border-emerald-200 text-xs font-bold flex items-center">
              <Check className="w-4 h-4 mr-2 text-emerald-600" />
              Private note saved securely to your personal workspace!
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Note Title
            </label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="e.g., Key insights on Lazar's Language-based Approach..."
              className="w-full px-3.5 py-2 rounded-xl border border-pink-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 bg-pink-50/30 font-medium"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Note Content / Reflection
            </label>
            <textarea
              rows={8}
              value={content}
              onChange={e => setContent(e.target.value)}
              placeholder="Write your notes, ideas for lesson plans, quotes, or Master's research questions..."
              className="w-full p-3.5 rounded-xl border border-pink-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 bg-pink-50/30 leading-relaxed font-sans"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center">
              <Tag className="w-3.5 h-3.5 text-pink-500 mr-1" />
              Tags (comma separated)
            </label>
            <input
              type="text"
              value={tagInput}
              onChange={e => setTagInput(e.target.value)}
              placeholder="pedagogy, carter-long, thesis, exam-review"
              className="w-full px-3.5 py-2 rounded-xl border border-pink-200 text-xs focus:outline-none focus:ring-2 focus:ring-pink-500 bg-pink-50/30"
            />
          </div>

          <div className="bg-pink-50 p-3 rounded-xl border border-pink-100 text-[11px] text-pink-900 font-medium">
            🔒 Private Note Security: Only accessible to your logged-in account. Protected by RLS database policy.
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-pink-100 flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!title.trim() || !content.trim()}
            className="px-5 py-2 rounded-xl bg-pink-600 hover:bg-pink-700 disabled:opacity-50 text-white text-xs font-bold flex items-center space-x-1.5 shadow-sm transition-colors"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Private Note</span>
          </button>
        </div>
      </div>
    </div>
  );
};
