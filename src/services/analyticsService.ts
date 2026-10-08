import { LearningActivity, StudySession } from '../types';

const STORAGE_KEYS = {
  SESSIONS: 'lit_study_sessions_v1',
  ACTIVITIES: 'lit_learning_activities_v1'
};

export class AnalyticsService {

  // Seed data if empty for realistic Admin Reporting
  private static initSeedData(): void {
    if (!localStorage.getItem(STORAGE_KEYS.SESSIONS)) {
      const initialSessions: StudySession[] = [
        {
          id: 'sess-101',
          userId: 'usr_trang_admin_001',
          userName: 'Ms. Trần Thị Thu Trang',
          startTime: new Date(Date.now() - 3600000 * 24 * 2).toISOString(),
          endTime: new Date(Date.now() - 3600000 * 24 * 2 + 3600000 * 1.5).toISOString(),
          durationMinutes: 90,
          activeFeature: 'Chapter 1 Introduction Lesson',
          deviceInfo: 'Windows 11 / Chrome Desktop'
        },
        {
          id: 'sess-102',
          userId: 'usr_trang_admin_001',
          userName: 'Ms. Trần Thị Thu Trang',
          startTime: new Date(Date.now() - 3600000 * 24).toISOString(),
          endTime: new Date(Date.now() - 3600000 * 24 + 3600000 * 2).toISOString(),
          durationMinutes: 120,
          activeFeature: 'Writing Studio & Version Control',
          deviceInfo: 'Windows 11 / Chrome Desktop'
        },
        {
          id: 'sess-103',
          userId: 'usr_student_002',
          userName: 'Nguyen Van A (Master Student)',
          startTime: new Date(Date.now() - 3600000 * 6).toISOString(),
          endTime: new Date(Date.now() - 3600000 * 4.5).toISOString(),
          durationMinutes: 90,
          activeFeature: 'Active Recall & RAG Assistant',
          deviceInfo: 'iPad Air / Safari Mobile'
        }
      ];
      localStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(initialSessions));
    }

    if (!localStorage.getItem(STORAGE_KEYS.ACTIVITIES)) {
      const initialActivities: LearningActivity[] = [
        {
          id: 'act-001',
          userId: 'usr_trang_admin_001',
          userName: 'Ms. Trần Thị Thu Trang',
          activityType: 'lesson_viewed',
          description: 'Opened Chapter 1 Introduction Lesson in Academic English mode',
          timestamp: new Date(Date.now() - 3600000 * 5).toISOString()
        },
        {
          id: 'act-002',
          userId: 'usr_trang_admin_001',
          userName: 'Ms. Trần Thị Thu Trang',
          activityType: 'mode_switched',
          description: 'Toggled view mode from Academic English to Plain English',
          timestamp: new Date(Date.now() - 3600000 * 4).toISOString()
        },
        {
          id: 'act-003',
          userId: 'usr_trang_admin_001',
          userName: 'Ms. Trần Thị Thu Trang',
          activityType: 'quiz_completed',
          description: 'Completed Chapter 1 Concept Mastery Quiz (Score: 5/5)',
          metadata: { score: 5, total: 5 },
          timestamp: new Date(Date.now() - 3600000 * 3).toISOString()
        },
        {
          id: 'act-004',
          userId: 'usr_trang_admin_001',
          userName: 'Ms. Trần Thị Thu Trang',
          activityType: 'draft_saved',
          description: 'Saved Version 1.1 of essay draft on Language-Based Approach',
          metadata: { version: '1.1', wordCount: 310 },
          timestamp: new Date(Date.now() - 3600000 * 2).toISOString()
        },
        {
          id: 'act-005',
          userId: 'usr_student_002',
          userName: 'Nguyen Van A (Master Student)',
          activityType: 'ai_queried',
          description: 'Asked AI RAG Assistant: "Compare Language-based vs Cultural approach"',
          timestamp: new Date(Date.now() - 3600000 * 1).toISOString()
        }
      ];
      localStorage.setItem(STORAGE_KEYS.ACTIVITIES, JSON.stringify(initialActivities));
    }
  }

  public static getStudySessions(): StudySession[] {
    this.initSeedData();
    const raw = localStorage.getItem(STORAGE_KEYS.SESSIONS);
    return raw ? JSON.parse(raw) : [];
  }

  public static getLearningActivities(): LearningActivity[] {
    this.initSeedData();
    const raw = localStorage.getItem(STORAGE_KEYS.ACTIVITIES);
    return raw ? JSON.parse(raw) : [];
  }

  public static logActivity(
    userId: string,
    userName: string,
    activityType: LearningActivity['activityType'],
    description: string,
    metadata?: Record<string, any>
  ): void {
    const activities = this.getLearningActivities();
    const newAct: LearningActivity = {
      id: `act-${Date.now()}`,
      userId,
      userName,
      activityType,
      description,
      metadata,
      timestamp: new Date().toISOString()
    };
    activities.unshift(newAct);
    localStorage.setItem(STORAGE_KEYS.ACTIVITIES, JSON.stringify(activities));
  }
}
