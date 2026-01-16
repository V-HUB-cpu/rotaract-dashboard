import React from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { Card } from '@/app/components/ui/card';
import { Users, FolderKanban, Trophy, TrendingUp } from 'lucide-react';
import { projects, announcements } from '@/app/data/projects';

export const MemberHome: React.FC = () => {
  const { user } = useAuth();

  const stats = [
    { icon: Users, label: 'Total Members', value: '65', color: 'bg-blue-500' },
    { icon: FolderKanban, label: 'Active Projects', value: '3', color: 'bg-green-500' },
    { icon: Trophy, label: 'Total DPP', value: '8,450', color: 'bg-yellow-500' },
    { icon: TrendingUp, label: 'Avg Attendance', value: '88%', color: 'bg-purple-500' },
  ];

  const upcomingEvents = projects.filter(p => p.status === 'Ongoing' || p.status === 'Planned').slice(0, 3);
  const recentAnnouncements = announcements.slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-sky-500 to-blue-600 rounded-lg p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.name}!</h1>
        <p className="text-sky-100">Here's what's happening in your club</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="p-6 bg-slate-800 border-slate-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400 mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Events */}
        <Card className="p-6 bg-slate-800 border-slate-700">
          <h2 className="text-xl font-bold text-white mb-4">Upcoming Events</h2>
          <div className="space-y-4">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="flex items-start space-x-3 p-3 bg-slate-700/50 rounded-lg">
                <div className={`mt-1 w-2 h-2 rounded-full ${
                  event.status === 'Ongoing' ? 'bg-green-500' : 'bg-yellow-500'
                }`} />
                <div className="flex-1">
                  <h3 className="font-medium text-white">{event.title}</h3>
                  <p className="text-sm text-slate-400">{event.date}</p>
                  <span className={`inline-block mt-1 px-2 py-1 text-xs rounded ${
                    event.status === 'Ongoing' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {event.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Announcements */}
        <Card className="p-6 bg-slate-800 border-slate-700">
          <h2 className="text-xl font-bold text-white mb-4">Recent Announcements</h2>
          <div className="space-y-4">
            {recentAnnouncements.map((announcement) => (
              <div key={announcement.id} className="p-3 bg-slate-700/50 rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-medium text-white">{announcement.title}</h3>
                  <span className={`px-2 py-1 text-xs rounded ${
                    announcement.priority === 'High' ? 'bg-red-500/20 text-red-400' :
                    announcement.priority === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-blue-500/20 text-blue-400'
                  }`}>
                    {announcement.priority}
                  </span>
                </div>
                <p className="text-sm text-slate-400">{announcement.message}</p>
                <p className="text-xs text-slate-500 mt-2">{announcement.date} • {announcement.author}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Personal Stats */}
      <Card className="p-6 bg-gradient-to-br from-sky-900 to-blue-900 border-sky-700">
        <h2 className="text-xl font-bold text-white mb-4">Your Stats</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-white/10 rounded-lg">
            <p className="text-3xl font-bold text-sky-400">{user?.attendance}%</p>
            <p className="text-sm text-sky-200 mt-1">Attendance</p>
          </div>
          <div className="text-center p-4 bg-white/10 rounded-lg">
            <p className="text-3xl font-bold text-sky-400">{user?.dppPoints}</p>
            <p className="text-sm text-sky-200 mt-1">DPP Points</p>
          </div>
          <div className="text-center p-4 bg-white/10 rounded-lg">
            <p className="text-3xl font-bold text-sky-400">{user?.department}</p>
            <p className="text-sm text-sky-200 mt-1">Department</p>
          </div>
        </div>
      </Card>
    </div>
  );
};
