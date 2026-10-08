import React from 'react';
import { ShieldAlert, Lock, UserCheck } from 'lucide-react';
import { UserRole } from '../types';

interface RouteGuardProps {
  requiredRole: UserRole;
  currentRole: UserRole;
  onSwitchToAdmin: () => void;
  children: React.ReactNode;
}

export const RouteGuard: React.FC<RouteGuardProps> = ({
  requiredRole,
  currentRole,
  onSwitchToAdmin,
  children,
}) => {
  if (requiredRole === 'admin' && currentRole !== 'admin') {
    return (
      <div className="max-w-4xl mx-auto my-12 p-8 bg-white rounded-3xl border-2 border-red-200 shadow-xl text-center space-y-6 animate-in zoom-in-95 duration-200">
        <div className="w-16 h-16 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto border border-red-200 shadow-sm">
          <ShieldAlert className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="bg-red-100 text-red-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            403 Access Restricted
          </span>
          <h2 className="text-2xl font-bold text-slate-900">
            Admin Privilege Authorization Required
          </h2>
          <p className="text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
            This module (Participant Activity Analytics & Branding Settings) requires <strong>Admin Role (Ms. Trần Thị Thu Trang)</strong> authorization enforced by frontend route guards and backend RLS policies.
          </p>
        </div>

        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs font-mono text-slate-600 max-w-md mx-auto text-left space-y-1">
          <p className="font-bold text-slate-800 flex items-center">
            <Lock className="w-3.5 h-3.5 mr-1 text-red-500" /> Security Check Failure:
          </p>
          <p>Current Active Role: <span className="text-amber-700 font-bold">{currentRole}</span></p>
          <p>Required Role: <span className="text-emerald-700 font-bold">{requiredRole}</span></p>
          <p>RLS Status: <span className="text-red-600">DENIED BY POLICY</span></p>
        </div>

        <div className="pt-2 flex items-center justify-center space-x-3">
          <button
            onClick={onSwitchToAdmin}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white font-bold text-xs sm:text-sm flex items-center space-x-2 shadow-md transition-all"
          >
            <UserCheck className="w-4 h-4" />
            <span>Switch Role to Admin (Ms. Trần Thị Thu Trang)</span>
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
