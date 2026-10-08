import React, { useState } from 'react';
import { Bookmark, Plus, Tag, Trash2, Calendar, Search } from 'lucide-react';
import { PrivateNote } from '../types';
import { StorageService } from '../services/storageService';

interface NotesViewProps {
  onOpenNoteDrawer: () => void;
}

export const NotesView: React.FC<NotesViewProps> = ({ onOpenNoteDrawer }) => {
  const [notes, setNotes] = useState<PrivateNote[]>(() => StorageService.getNotes());
  const [searchQuery, setSearchQuery] = useState('');

  const handleDelete = (id: string) => {
    StorageService.deleteNote(id);
    setNotes(StorageService.getNotes());
  };

  const filteredNotes = notes.filter(n =>
    n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    n.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    n.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-pink-200 shadow-sm space-y-3 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="bg-pink-100 text-pink-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              PRIVATE PARTICIPANT WORKSPACE
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-serif mt-1">
            Private Study Notes & Research Ideas
          </h1>
          <p className="text-xs sm:text-sm text-slate-600">
            Protected by database Row Level Security (RLS). Only accessible by your login credentials.
          </p>
        </div>

        <button
          onClick={onOpenNoteDrawer}
          className="px-5 py-3 rounded-2xl bg-pink-600 hover:bg-pink-700 text-white font-extrabold text-xs sm:text-sm shadow-md flex items-center space-x-2 shrink-0 transition-transform hover:scale-105"
        >
          <Plus className="w-4 h-4" />
          <span>New Private Note</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 text-pink-400 absolute left-3.5 top-3.5" />
        <input
          type="text"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="Search notes by title, tag, or content..."
          className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-pink-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 bg-white shadow-sm"
        />
      </div>

      {/* Notes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNotes.map(note => (
          <div
            key={note.id}
            className="p-6 rounded-3xl bg-white border border-pink-200 shadow-sm flex flex-col justify-between space-y-4 hover:border-pink-300 transition-all"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <span className="text-[11px] font-mono font-bold text-pink-700 bg-pink-50 px-2.5 py-0.5 rounded-full border border-pink-200">
                  {note.lessonTitle}
                </span>
                <button
                  onClick={() => handleDelete(note.id)}
                  className="text-slate-400 hover:text-red-500 p-1"
                  title="Delete Note"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <h3 className="font-bold text-base text-slate-900 font-serif leading-snug">
                {note.title}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-sans whitespace-pre-wrap">
                {note.content}
              </p>
            </div>

            <div className="pt-4 border-t border-pink-100 flex items-center justify-between text-xs">
              <div className="flex flex-wrap gap-1">
                {note.tags.map((t, idx) => (
                  <span key={idx} className="bg-pink-50 text-pink-800 text-[10px] font-mono px-2 py-0.5 rounded border border-pink-100">
                    #{t}
                  </span>
                ))}
              </div>
              <span className="text-[10px] text-slate-400 flex items-center">
                <Calendar className="w-3 h-3 mr-1" />
                {new Date(note.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
