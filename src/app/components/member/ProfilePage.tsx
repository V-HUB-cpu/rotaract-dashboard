import React from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { Card } from '@/app/components/ui/card';
import {
  Mail,
  Phone,
  Calendar,
  Award,
  TrendingUp,
  Trophy,
  Target,
} from 'lucide-react';
import { memberProjects } from '@/app/data/projects';

export const ProfilePage: React.FC = () => {
  const { user } = useAuth();

  const totalProjects = memberProjects.length;
  const completedProjects = memberProjects.filter(
    (p) => p.status === 'Completed'
  ).length;
  const totalDPP = memberProjects.reduce(
    (sum, p) => sum + p.dppEarned,
    0
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">My Profile</h1>
        <p className="text-slate-400">
          View and manage your profile information
        </p>
      </div>

      {/* ================= PROFILE HEADER ================= */}
      <Card className="p-8 bg-gradient-to-br from-sky-900 to-blue-900 border-sky-700">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          {/* PROFILE IMAGE */}
          <img
            src={user?.avatar || '/profile/default.jpg'}
            alt={user?.name || 'Profile'}
            className="w-32 h-32 rounded-full border-4 border-white/20 object-cover"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src =
                'https://api.dicebear.com/7.x/avataaars/svg?seed=fallback';
            }}
          />

          {/* BASIC INFO */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-3xl font-bold text-white mb-2">
              {user?.name}
            </h2>

            {user?.position && (
              <p className="text-lg text-sky-200 mb-1">
                {user.position}
              </p>
            )}

            {user?.department && (
              <p className="text-sky-300 mb-3">
                {user.department}
              </p>
            )}

            {user?.rid && (
              <p className="text-sky-400 font-mono">
                RID: {user.rid}
              </p>
            )}
          </div>

          {/* BADGES */}
          <div className="flex flex-col gap-2">
            <span className="px-4 py-2 bg-white/10 rounded-lg text-sky-200 text-sm text-center">
              Member since {user?.joinDate}
            </span>

            {user?.role === 'bearer' && (
              <span className="px-4 py-2 bg-purple-500/20 rounded-lg text-purple-200 text-sm text-center">
                Office Bearer
              </span>
            )}
          </div>
        </div>
      </Card>

      {/* ================= STATS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6 bg-slate-800 border-slate-700">
          <TrendingUp className="w-8 h-8 text-blue-400 mb-2" />
          <p className="text-3xl font-bold text-white">
            {user?.attendance ?? 0}%
          </p>
          <p className="text-sm text-slate-400">Attendance</p>
        </Card>

        <Card className="p-6 bg-slate-800 border-slate-700">
          <Trophy className="w-8 h-8 text-yellow-400 mb-2" />
          <p className="text-3xl font-bold text-white">
            {user?.dppPoints ?? 0}
          </p>
          <p className="text-sm text-slate-400">DPP Points</p>
        </Card>

        <Card className="p-6 bg-slate-800 border-slate-700">
          <Target className="w-8 h-8 text-green-400 mb-2" />
          <p className="text-3xl font-bold text-white">
            {totalProjects}
          </p>
          <p className="text-sm text-slate-400">Total Projects</p>
        </Card>

        <Card className="p-6 bg-slate-800 border-slate-700">
          <Award className="w-8 h-8 text-purple-400 mb-2" />
          <p className="text-3xl font-bold text-white">
            {completedProjects}
          </p>
          <p className="text-sm text-slate-400">Completed</p>
        </Card>
      </div>

      {/* ================= CONTACT INFO ================= */}
      <Card className="p-6 bg-slate-800 border-slate-700">
        <h3 className="text-xl font-bold text-white mb-4">
          Contact Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-3 p-4 bg-slate-700/50 rounded-lg">
            <Mail className="w-5 h-5 text-sky-400" />
            <div>
              <p className="text-xs text-slate-400">Email</p>
              <p className="text-white">{user?.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 bg-slate-700/50 rounded-lg">
            <Phone className="w-5 h-5 text-sky-400" />
            <div>
              <p className="text-xs text-slate-400">Phone</p>
              <p className="text-white">{user?.phone}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 bg-slate-700/50 rounded-lg">
            <Calendar className="w-5 h-5 text-sky-400" />
            <div>
              <p className="text-xs text-slate-400">Join Date</p>
              <p className="text-white">{user?.joinDate}</p>
            </div>
          </div>

          {user?.department && (
            <div className="flex items-center gap-3 p-4 bg-slate-700/50 rounded-lg">
              <Award className="w-5 h-5 text-sky-400" />
              <div>
                <p className="text-xs text-slate-400">Department</p>
                <p className="text-white">{user.department}</p>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};
