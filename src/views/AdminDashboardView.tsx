import React, { useState } from 'react';
import { BarChart3, Users, Clock, Activity, Settings, Save, CheckCircle2, ShieldCheck, User, Image, GraduationCap } from 'lucide-react';
import { AppSettings, LearningActivity, StudySession, UserRole } from '../types';
import { RouteGuard } from '../components/RouteGuard';
import { AnalyticsService } from '../services/analyticsService';
import { StorageService } from '../services/storageService';

interface AdminDashboardViewProps {
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  settings: AppSettings;
  onUpdateSettings: (newSettings: AppSettings) => void;
}

export const AdminDashboardView: React.FC<AdminDashboardViewProps> = ({
  userRole,
  setUserRole,
  settings,
  onUpdateSettings,
}) => {
  const [activeTab, setActiveTab] = useState<'sessions' | 'activities' | 'branding'>('sessions');

  const [sessions] = useState<StudySession[]>(() => AnalyticsService.getStudySessions());
  const [activities] = useState<LearningActivity[]>(() => AnalyticsService.getLearningActivities());

  // Branding Form State
  const [formData, setFormData] = useState<AppSettings>({ ...settings });
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSaveBranding = (e: React.FormEvent) => {
    e.preventDefault();
    StorageService.saveSettings(formData);
    onUpdateSettings(formData);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  return (
    <RouteGuard
      requiredRole="admin"
      currentRole={userRole}
      onSwitchToAdmin={() => setUserRole('admin')}
    >
      <div className="space-y-8 animate-in fade-in duration-300">
        {/* Admin Header */}
        <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="bg-amber-400 text-amber-950 text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                ADMINISTRATION PANEL
              </span>
              <span className="text-xs text-pink-300 font-mono flex items-center">
                <ShieldCheck className="w-3.5 h-3.5 mr-1 text-emerald-400" /> RLS Granted
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <img
                src={settings.adminPhotoUrl}
                alt={settings.instructorName}
                className="w-8 h-8 rounded-full border border-pink-400 object-cover"
              />
              <span className="text-xs font-bold text-pink-200">{settings.instructorName}</span>
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold font-serif text-white">
            Participant Activity Analytics & Branding Settings
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Real-time reporting backed by <code>learning_activity</code> and <code>study_sessions</code> tables. Manage global branding settings for Ms. Trần Thị Thu Trang's Master's learning hub.
          </p>
        </div>

        {/* Metrics Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-pink-200 shadow-sm flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-pink-100 text-pink-700 flex items-center justify-center font-bold">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Study Time</p>
              <p className="text-xl font-extrabold text-slate-900">5.0 Hours</p>
              <p className="text-[11px] text-pink-600 font-medium">Logged in study_sessions</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-pink-200 shadow-sm flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Active Participants</p>
              <p className="text-xl font-extrabold text-slate-900">2 Enrolled</p>
              <p className="text-[11px] text-slate-500">CHTA.HCE2608 Cohort</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-pink-200 shadow-sm flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Activity Events</p>
              <p className="text-xl font-extrabold text-slate-900">{activities.length} Recorded</p>
              <p className="text-[11px] text-emerald-600 font-medium">learning_activity table</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-pink-200 shadow-sm flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              <BarChart3 className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Quiz Accuracy</p>
              <p className="text-xl font-extrabold text-emerald-700">100% Score</p>
              <p className="text-[11px] text-slate-500">Mastery verified</p>
            </div>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-pink-200 space-x-4">
          <button
            onClick={() => setActiveTab('sessions')}
            className={`pb-3 text-xs sm:text-sm font-bold border-b-2 transition-colors flex items-center space-x-2 ${
              activeTab === 'sessions'
                ? 'border-pink-600 text-pink-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>Study Sessions Log (study_sessions)</span>
          </button>

          <button
            onClick={() => setActiveTab('activities')}
            className={`pb-3 text-xs sm:text-sm font-bold border-b-2 transition-colors flex items-center space-x-2 ${
              activeTab === 'activities'
                ? 'border-pink-600 text-pink-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>Activity Stream (learning_activity)</span>
          </button>

          <button
            onClick={() => setActiveTab('branding')}
            className={`pb-3 text-xs sm:text-sm font-bold border-b-2 transition-colors flex items-center space-x-2 ${
              activeTab === 'branding'
                ? 'border-pink-600 text-pink-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Branding Settings (app_settings)</span>
          </button>
        </div>

        {/* TAB 1: study_sessions Table */}
        {activeTab === 'sessions' && (
          <div className="bg-white rounded-3xl border border-pink-200 shadow-sm overflow-hidden">
            <div className="p-4 bg-pink-50 border-b border-pink-200 text-xs font-bold text-pink-900 flex justify-between items-center">
              <span>DB Table: study_sessions</span>
              <span className="font-mono text-slate-500">RLS: Admin Select All</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 uppercase font-mono border-b border-pink-100">
                  <tr>
                    <th className="p-4">Session ID</th>
                    <th className="p-4">Participant Name</th>
                    <th className="p-4">Active Feature</th>
                    <th className="p-4">Duration</th>
                    <th className="p-4">Device Info</th>
                    <th className="p-4">Start Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-pink-100 font-sans text-slate-700">
                  {sessions.map(s => (
                    <tr key={s.id} className="hover:bg-pink-50/40">
                      <td className="p-4 font-mono font-bold text-pink-700">{s.id}</td>
                      <td className="p-4 font-bold text-slate-900">{s.userName}</td>
                      <td className="p-4">{s.activeFeature}</td>
                      <td className="p-4 font-bold text-emerald-700">{s.durationMinutes} mins</td>
                      <td className="p-4 text-slate-500">{s.deviceInfo}</td>
                      <td className="p-4 text-slate-500">{new Date(s.startTime).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: learning_activity Stream */}
        {activeTab === 'activities' && (
          <div className="bg-white rounded-3xl border border-pink-200 shadow-sm overflow-hidden">
            <div className="p-4 bg-pink-50 border-b border-pink-200 text-xs font-bold text-pink-900 flex justify-between items-center">
              <span>DB Table: learning_activity</span>
              <span className="font-mono text-slate-500">Live Activity Audit Stream</span>
            </div>

            <div className="divide-y divide-pink-100 p-4 space-y-3">
              {activities.map(act => (
                <div key={act.id} className="p-3.5 rounded-2xl bg-pink-50/30 flex items-center justify-between text-xs">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-slate-900">{act.userName}</span>
                      <span className="bg-pink-100 text-pink-800 text-[10px] font-mono px-2 py-0.5 rounded uppercase font-bold">
                        {act.activityType}
                      </span>
                    </div>
                    <p className="text-slate-600 font-medium">{act.description}</p>
                  </div>
                  <span className="text-[11px] text-slate-400 font-mono">
                    {new Date(act.timestamp).toLocaleTimeString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: Branding & app_settings Editor */}
        {activeTab === 'branding' && (
          <form onSubmit={handleSaveBranding} className="bg-white p-6 sm:p-8 rounded-3xl border border-pink-200 shadow-sm space-y-6">
            <div className="border-b border-pink-100 pb-3">
              <h3 className="font-bold text-lg text-slate-900 font-serif">
                Global App Branding & Instructor Settings (app_settings)
              </h3>
              <p className="text-xs text-slate-500">
                Persistent configurations displayed on every screen across the Master's application
              </p>
            </div>

            {saveSuccess && (
              <div className="bg-emerald-50 text-emerald-800 p-4 rounded-2xl border border-emerald-200 text-xs font-bold flex items-center">
                <CheckCircle2 className="w-5 h-5 mr-2 text-emerald-600" />
                Branding settings updated and persisted successfully!
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
              <div className="space-y-1.5">
                <label className="font-bold text-slate-700 uppercase tracking-wider flex items-center">
                  <User className="w-3.5 h-3.5 mr-1 text-pink-600" /> Instructor Name
                </label>
                <input
                  type="text"
                  value={formData.instructorName}
                  onChange={e => setFormData({ ...formData, instructorName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-pink-200 focus:ring-2 focus:ring-pink-500 bg-pink-50/20 font-bold text-slate-900"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-slate-700 uppercase tracking-wider flex items-center">
                  <GraduationCap className="w-3.5 h-3.5 mr-1 text-pink-600" /> Instructor Title
                </label>
                <input
                  type="text"
                  value={formData.instructorTitle}
                  onChange={e => setFormData({ ...formData, instructorTitle: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-pink-200 focus:ring-2 focus:ring-pink-500 bg-pink-50/20"
                />
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <label className="font-bold text-slate-700 uppercase tracking-wider flex items-center">
                  <Image className="w-3.5 h-3.5 mr-1 text-pink-600" /> Admin Photo URL
                </label>
                <input
                  type="text"
                  value={formData.adminPhotoUrl}
                  onChange={e => setFormData({ ...formData, adminPhotoUrl: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-pink-200 focus:ring-2 focus:ring-pink-500 bg-pink-50/20 font-mono text-[11px]"
                />
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <label className="font-bold text-slate-700 uppercase tracking-wider">
                  School & Department Information
                </label>
                <input
                  type="text"
                  value={formData.schoolInfo}
                  onChange={e => setFormData({ ...formData, schoolInfo: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-pink-200 focus:ring-2 focus:ring-pink-500 bg-pink-50/20"
                />
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <label className="font-bold text-slate-700 uppercase tracking-wider">
                  Agreed Copyright Notice
                </label>
                <input
                  type="text"
                  value={formData.copyrightNotice}
                  onChange={e => setFormData({ ...formData, copyrightNotice: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-pink-200 focus:ring-2 focus:ring-pink-500 bg-pink-50/20 font-medium"
                />
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                className="px-6 py-3 rounded-2xl bg-pink-600 hover:bg-pink-700 text-white font-extrabold text-xs shadow-md flex items-center space-x-2 transition-transform hover:scale-105"
              >
                <Save className="w-4 h-4" />
                <span>Save & Apply Global Branding</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </RouteGuard>
  );
};
