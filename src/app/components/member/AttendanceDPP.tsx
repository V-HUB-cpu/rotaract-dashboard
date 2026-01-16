import React from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { Card } from '@/app/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { attendanceData, dppMonthlyData } from '@/app/data/projects';
import { TrendingUp, Award } from 'lucide-react';

export const AttendanceDPP: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Attendance & DPP</h1>
        <p className="text-slate-400">Track your attendance and District Points of Pride</p>
      </div>

      {/* Current Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-6 bg-gradient-to-br from-blue-900 to-sky-900 border-blue-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-white">Your Attendance</h3>
            <TrendingUp className="w-8 h-8 text-blue-400" />
          </div>
          <p className="text-5xl font-bold text-white mb-2">{user?.attendance}%</p>
          <p className="text-blue-200">Excellent attendance record!</p>
          <div className="mt-4 bg-white/10 rounded-full h-3 overflow-hidden">
            <div
              className="bg-blue-400 h-full rounded-full"
              style={{ width: `${user?.attendance}%` }}
            />
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-yellow-900 to-amber-900 border-yellow-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-white">Your DPP Points</h3>
            <Award className="w-8 h-8 text-yellow-400" />
          </div>
          <p className="text-5xl font-bold text-white mb-2">{user?.dppPoints}</p>
          <p className="text-yellow-200">Keep earning more points!</p>
          <div className="mt-4 flex items-center space-x-2">
            <div className="flex-1 bg-white/10 rounded-full h-3 overflow-hidden">
              <div
                className="bg-yellow-400 h-full rounded-full"
                style={{ width: `${((user?.dppPoints || 0) / 1000) * 100}%` }}
              />
            </div>
            <span className="text-xs text-yellow-200">/{1000}</span>
          </div>
        </Card>
      </div>

      {/* Attendance Trend */}
      <Card className="p-6 bg-slate-800 border-slate-700">
        <h2 className="text-xl font-bold text-white mb-4">Club Attendance Trend</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={attendanceData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="month" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip
              contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }}
              labelStyle={{ color: '#e2e8f0' }}
            />
            <Line type="monotone" dataKey="attendance" stroke="#0ea5e9" strokeWidth={2} dot={{ fill: '#0ea5e9' }} />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* DPP Monthly Distribution */}
      <Card className="p-6 bg-slate-800 border-slate-700">
        <h2 className="text-xl font-bold text-white mb-4">Monthly DPP Distribution</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={dppMonthlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="month" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip
              contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }}
              labelStyle={{ color: '#e2e8f0' }}
            />
            <Bar dataKey="points" fill="#eab308" />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Performance Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6 bg-slate-800 border-slate-700">
          <p className="text-slate-400 text-sm mb-1">Club Average Attendance</p>
          <p className="text-2xl font-bold text-white">88%</p>
          <p className="text-xs text-green-400 mt-2">↑ 3% from last month</p>
        </Card>

        <Card className="p-6 bg-slate-800 border-slate-700">
          <p className="text-slate-400 text-sm mb-1">Club Total DPP</p>
          <p className="text-2xl font-bold text-white">8,450</p>
          <p className="text-xs text-green-400 mt-2">↑ 250 from last month</p>
        </Card>

        <Card className="p-6 bg-slate-800 border-slate-700">
          <p className="text-slate-400 text-sm mb-1">Your Rank</p>
          <p className="text-2xl font-bold text-white">Top 30%</p>
          <p className="text-xs text-yellow-400 mt-2">Great performance!</p>
        </Card>
      </div>
    </div>
  );
};
