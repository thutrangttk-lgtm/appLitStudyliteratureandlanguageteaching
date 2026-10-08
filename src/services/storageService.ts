import { AppSettings, PrivateNote, WritingDraft, ReviewAttempt, UserProfile, UserRole, LearningMode } from '../types';

const STORAGE_KEYS = {
  SETTINGS: 'lit_app_settings_v1',
  CURRENT_USER: 'lit_current_user_v1',
  LEARNING_MODE: 'lit_learning_mode_v1',
  NOTES: 'lit_private_notes_v1',
  DRAFTS: 'lit_writing_drafts_v1',
  REVIEWS: 'lit_review_attempts_v1',
  CHAT: 'lit_chat_history_v1',
};

const DEFAULT_SETTINGS: AppSettings = {
  instructorName: 'Ms. Trần Thị Thu Trang',
  instructorTitle: 'Master of English Language Teaching & Pedagogy Specialist',
  adminPhotoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
  schoolInfo: 'Hanoi University of Education - Department of English Pedagogy (CHTA.HCE2608)',
  programName: 'Master of Arts in Literature & Language Teaching (MA ELT)',
  copyrightNotice: '© 2026 Ms. Trần Thị Thu Trang - Literature & Language Teaching Master\'s Learning Hub. All rights reserved.',
  pdfServiceAuthenticated: true,
  pdfApiToken: 'pdf_sec_token_trang_app_2026_x89f'
};

const DEFAULT_USER: UserProfile = {
  id: 'usr_trang_admin_001',
  name: 'Ms. Trần Thị Thu Trang',
  email: 'trang.tran@education.edu.vn',
  role: 'admin',
  program: 'Master of Arts in English Pedagogy',
  cohort: 'CHTA.HCE2608'
};

export class StorageService {
  // App Settings
  public static getSettings(): AppSettings {
    const raw = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (!raw) return DEFAULT_SETTINGS;
    try {
      return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
    } catch {
      return DEFAULT_SETTINGS;
    }
  }

  public static saveSettings(settings: AppSettings): AppSettings {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    return settings;
  }

  // Current User Profile & Role Switcher
  public static getUser(): UserProfile {
    const raw = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    if (!raw) return DEFAULT_USER;
    try {
      return JSON.parse(raw);
    } catch {
      return DEFAULT_USER;
    }
  }

  public static setUserRole(role: UserRole): UserProfile {
    const user = this.getUser();
    const updated: UserProfile = {
      ...user,
      role,
      name: role === 'admin' ? 'Ms. Trần Thị Thu Trang (Admin)' : 'Trần Thị Thu Trang (Student Participant)'
    };
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(updated));
    return updated;
  }

  // Learning Mode (Plain vs Academic English)
  public static getLearningMode(): LearningMode {
    const raw = localStorage.getItem(STORAGE_KEYS.LEARNING_MODE);
    return (raw === 'academic' ? 'academic' : 'plain') as LearningMode;
  }

  public static setLearningMode(mode: LearningMode): void {
    localStorage.setItem(STORAGE_KEYS.LEARNING_MODE, mode);
  }

  // Private Notes
  public static getNotes(): PrivateNote[] {
    const raw = localStorage.getItem(STORAGE_KEYS.NOTES);
    if (!raw) {
      const initialNotes: PrivateNote[] = [
        {
          id: 'note-001',
          userId: 'usr_trang_admin_001',
          lessonId: 'intro',
          lessonTitle: 'Chapter 1: Introduction - Using Literature in ELT',
          title: 'Key takeaways on Language-based Approach',
          content: 'Lazar (1993, p. 5) emphasizes that stylized linguistic analysis helps secondary students bridge vocabulary knowledge with literary appreciation. Must try cloze procedures with poetry in Unit 3!',
          tags: ['stylistics', 'pedagogy', 'chapter-1'],
          createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
          updatedAt: new Date(Date.now() - 86400000 * 2).toISOString()
        }
      ];
      localStorage.setItem(STORAGE_KEYS.NOTES, JSON.stringify(initialNotes));
      return initialNotes;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return [];
    }
  }

  public static saveNote(note: Omit<PrivateNote, 'id' | 'createdAt' | 'updatedAt'> & { id?: string }): PrivateNote {
    const notes = this.getNotes();
    const now = new Date().toISOString();
    
    if (note.id) {
      const index = notes.findIndex(n => n.id === note.id);
      if (index >= 0) {
        notes[index] = { ...notes[index], ...note, updatedAt: now };
        localStorage.setItem(STORAGE_KEYS.NOTES, JSON.stringify(notes));
        return notes[index];
      }
    }

    const newNote: PrivateNote = {
      ...note,
      id: `note-${Date.now()}`,
      createdAt: now,
      updatedAt: now
    };
    notes.unshift(newNote);
    localStorage.setItem(STORAGE_KEYS.NOTES, JSON.stringify(notes));
    return newNote;
  }

  public static deleteNote(id: string): void {
    const notes = this.getNotes().filter(n => n.id !== id);
    localStorage.setItem(STORAGE_KEYS.NOTES, JSON.stringify(notes));
  }

  // Writing Drafts & Version Control
  public static getDrafts(): WritingDraft[] {
    const raw = localStorage.getItem(STORAGE_KEYS.DRAFTS);
    if (!raw) {
      const initialDraft: WritingDraft = {
        id: 'draft-001',
        userId: 'usr_trang_admin_001',
        promptId: 'prompt-ch1',
        title: 'Comparative Analysis: Language-Based vs. Personal Growth Approach in High School ELT',
        currentContent: `In contemporary English Language Teaching (ELT), literature serves as both a linguistic model and a catalyst for personal reflection. This essay critically compares the Language-Based Approach (Carter & Long; Lazar 1993) with Rosenblatt's Personal Growth paradigm.

Firstly, the Language-Based Approach provides systematic tools for text analysis. By examining syntactic structures, collocations, and foregrounding (Lazar 1993, p. 5), learners develop explicit language awareness...`,
        targetWordCount: 800,
        updatedAt: new Date().toISOString(),
        versions: [
          {
            versionId: 'v1.0',
            versionNumber: '1.0',
            timestamp: new Date(Date.now() - 3600000 * 5).toISOString(),
            content: 'Initial essay skeleton outlining Carter & Long model and Lazar page 5 citations.',
            wordCount: 142,
            note: 'Initial outline draft'
          },
          {
            versionId: 'v1.1',
            versionNumber: '1.1',
            timestamp: new Date(Date.now() - 1800000).toISOString(),
            content: 'In contemporary English Language Teaching (ELT), literature serves as both a linguistic model and a catalyst for personal reflection...',
            wordCount: 310,
            note: 'Expanded body paragraph on Language-Based Approach'
          }
        ]
      };
      localStorage.setItem(STORAGE_KEYS.DRAFTS, JSON.stringify([initialDraft]));
      return [initialDraft];
    }
    try {
      return JSON.parse(raw);
    } catch {
      return [];
    }
  }

  public static saveDraft(draft: WritingDraft): WritingDraft {
    const drafts = this.getDrafts();
    const index = drafts.findIndex(d => d.id === draft.id);
    if (index >= 0) {
      drafts[index] = draft;
    } else {
      drafts.unshift(draft);
    }
    localStorage.setItem(STORAGE_KEYS.DRAFTS, JSON.stringify(drafts));
    return draft;
  }

  // Review Attempts
  public static getReviewAttempts(): ReviewAttempt[] {
    const raw = localStorage.getItem(STORAGE_KEYS.REVIEWS);
    if (!raw) return [];
    try {
      return JSON.parse(raw);
    } catch {
      return [];
    }
  }

  public static addReviewAttempt(attempt: Omit<ReviewAttempt, 'id' | 'completedAt'>): ReviewAttempt {
    const attempts = this.getReviewAttempts();
    const newAttempt: ReviewAttempt = {
      ...attempt,
      id: `rev-${Date.now()}`,
      completedAt: new Date().toISOString()
    };
    attempts.unshift(newAttempt);
    localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(attempts));
    return newAttempt;
  }
}
