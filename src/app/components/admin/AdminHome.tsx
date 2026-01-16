import React from 'react';
import { Card } from '@/app/components/ui/card';
import { Users, FolderKanban, Trophy, TrendingUp, Shield, Activity, Bell } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { memberGrowthData, dppMonthlyData } from '@/app/data/projects';

export const AdminHome: React.FC = () => {
  const stats = [
    { icon: Users, label: 'Total Members', value: '65', change: '+5', color: 'bg-blue-500' },
    { icon: FolderKanban, label: 'Active Projects', value: '3', change: '+1', color: 'bg-green-500' },
    { icon: Trophy, label: 'Total DPP', value: '8,450', change: '+250', color: 'bg-yellow-500' },
    { icon: TrendingUp, label: 'Avg Attendance', value: '88%', change: '+3%', color: 'bg-purple-500' },
    { icon: Activity, label: 'Completed Projects', value: '3', change: '+1', color: 'bg-pink-500' },
    { icon: Shield, label: 'Office Bearers', value: '5', change: '0', color: 'bg-red-500' },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-red-600 to-pink-600 rounded-lg p-6 text-white">
        <div className="flex items-center space-x-3 mb-2">
          <Shield className="w-8 h-8" />
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        </div>
        <p className="text-red-100">System overview and management controls</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="p-6 bg-slate-800 border-slate-700 hover:border-red-500 transition-colors">
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded">
                  +{stat.change}
                </span>
              </div>
              <p className="text-sm text-slate-400 mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-white">{stat.value}</p>
            </Card>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Member Growth */}
        <Card className="p-6 bg-slate-800 border-slate-700">
          <h2 className="text-xl font-bold text-white mb-4">Member Growth</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={memberGrowthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="month" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip
                contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }}
                labelStyle={{ color: '#e2e8f0' }}
              />
              <Line
                type="monotone"
                dataKey="members"
                stroke="#ef4444"
                strokeWidth={2}
                dot={{ fill: '#ef4444' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* DPP Monthly */}
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
              <Bar dataKey="points" fill="#ef4444" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="p-6 bg-slate-800 border-slate-700">
        <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg hover:bg-blue-500/20 transition-colors text-left">
            <Users className="w-6 h-6 text-blue-400 mb-2" />
            <p className="font-medium text-white">Add New Member</p>
            <p className="text-sm text-slate-400">Register a new club member</p>
          </button>
          <button className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg hover:bg-green-500/20 transition-colors text-left">
            <FolderKanban className="w-6 h-6 text-green-400 mb-2" />
            <p className="font-medium text-white">Create Project</p>
            <p className="text-sm text-slate-400">Add a new club project</p>
          </button>
          <button className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg hover:bg-yellow-500/20 transition-colors text-left">
            <Bell className="w-6 h-6 text-yellow-400 mb-2" />
            <p className="font-medium text-white">Post Announcement</p>
            <p className="text-sm text-slate-400">Notify all members</p>
          </button>
        </div>
      </Card>

      {/* System Status */}
      <Card className="p-6 bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
        <h2 className="text-xl font-bold text-white mb-4">System Status</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 bg-green-500/10 rounded-lg">
            <p className="text-green-400 text-sm mb-1">Database</p>
            <p className="text-xl font-bold text-white">Online</p>
          </div>
          <div className="p-4 bg-green-500/10 rounded-lg">
            <p className="text-green-400 text-sm mb-1">Authentication</p>
            <p className="text-xl font-bold text-white">Active</p>
          </div>
          <div className="p-4 bg-green-500/10 rounded-lg">
            <p className="text-green-400 text-sm mb-1">Total Users</p>
            <p className="text-xl font-bold text-white">15</p>
          </div>
          <div className="p-4 bg-green-500/10 rounded-lg">
            <p className="text-green-400 text-sm mb-1">Last Updated</p>
            <p className="text-xl font-bold text-white">Today</p>
          </div>
        </div>
      </Card>
    </div>
  );
};
