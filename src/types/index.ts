// Core domain types for Literature and Language Teaching Master's App

export type LearningMode = 'plain' | 'academic';

export type UserRole = 'student' | 'admin';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  program: string;
  cohort: string;
}

export interface AppSettings {
  instructorName: string;
  instructorTitle: string;
  adminPhotoUrl: string;
  schoolInfo: string;
  programName: string;
  copyrightNotice: string;
  pdfServiceAuthenticated: boolean;
  pdfApiToken: string;
}

export interface Chapter {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  pageRange: string;
  description: string;
  topicsCount: number;
  status: 'completed' | 'in_progress' | 'not_started';
  isFeatured?: boolean;
}

export interface Citation {
  pageNumber: number;
  bookTitle: string;
  author: string;
  year: number;
  excerpt: string;
  verificationHash: string;
}

export interface LessonContent {
  id: string;
  chapterId: string;
  title: string;
  subtitle: string;
  pageRange: string;
  estimatedMinutes: number;
  
  // Dual-mode content
  plainEnglish: {
    summary: string;
    coreConcepts: { title: string; explanation: string; practicalTip: string }[];
    realWorldScenario: string;
  };
  
  academicEnglish: {
    abstract: string;
    theoreticalFrameworks: { title: string; analysis: string; citations: Citation[] }[];
    pedagogicalImplications: string;
  };

  verifiedCitations: Citation[];
  
  flashcards: {
    id: string;
    front: string;
    back: string;
    academicTerm: string;
  }[];
  
  quizQuestions: {
    id: string;
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
    citedPage: number;
  }[];
  
  writingPrompt: {
    id: string;
    title: string;
    description: string;
    suggestedOutline: string[];
    academicKeywords: string[];
  };
}

export interface PrivateNote {
  id: string;
  userId: string;
  lessonId: string;
  lessonTitle: string;
  title: string;
  content: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface DraftVersion {
  versionId: string;
  versionNumber: string;
  timestamp: string;
  content: string;
  wordCount: number;
  note: string;
}

export interface WritingDraft {
  id: string;
  userId: string;
  promptId: string;
  title: string;
  currentContent: string;
  targetWordCount: number;
  versions: DraftVersion[];
  aiFeedback?: {
    strengths: string[];
    areasForImprovement: string[];
    suggestedCitations: string[];
  };
  updatedAt: string;
}

export interface ReviewAttempt {
  id: string;
  userId: string;
  lessonId: string;
  type: 'quiz' | 'flashcard' | 'outline';
  score: number;
  maxScore: number;
  confidence: 'high' | 'medium' | 'low';
  completedAt: string;
}

export interface StudySession {
  id: string;
  userId: string;
  userName: string;
  startTime: string;
  endTime?: string;
  durationMinutes: number;
  activeFeature: string;
  deviceInfo: string;
}

export interface LearningActivity {
  id: string;
  userId: string;
  userName: string;
  activityType: 'lesson_viewed' | 'mode_switched' | 'quiz_completed' | 'draft_saved' | 'note_created' | 'ai_queried';
  description: string;
  metadata?: Record<string, any>;
  timestamp: string;
}

export interface RagResponse {
  answer: string;
  retrievedPassages: Citation[];
  modeUsed: LearningMode;
  confidenceScore: number;
}
