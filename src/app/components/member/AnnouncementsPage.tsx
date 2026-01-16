import React from 'react';
import { Card } from '@/app/components/ui/card';
import { announcements } from '@/app/data/projects';
import { Bell, AlertCircle, Info, User } from 'lucide-react';

export const AnnouncementsPage: React.FC = () => {
  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'High':
        return <AlertCircle className="w-5 h-5 text-red-400" />;
      case 'Medium':
        return <Bell className="w-5 h-5 text-yellow-400" />;
      case 'Low':
        return <Info className="w-5 h-5 text-blue-400" />;
      default:
        return <Info className="w-5 h-5 text-blue-400" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'border-l-red-500 bg-red-500/5';
      case 'Medium':
        return 'border-l-yellow-500 bg-yellow-500/5';
      case 'Low':
        return 'border-l-blue-500 bg-blue-500/5';
      default:
        return 'border-l-blue-500 bg-blue-500/5';
    }
  };

  const highPriority = announcements.filter(a => a.priority === 'High');
  const otherAnnouncements = announcements.filter(a => a.priority !== 'High');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Announcements</h1>
        <p className="text-slate-400">Stay updated with club news and events</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 bg-gradient-to-br from-red-900 to-red-800 border-red-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-200 text-sm">High Priority</p>
              <p className="text-2xl font-bold text-white">{highPriority.length}</p>
            </div>
            <AlertCircle className="w-8 h-8 text-red-400" />
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-yellow-900 to-yellow-800 border-yellow-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-200 text-sm">Medium Priority</p>
              <p className="text-2xl font-bold text-white">
                {announcements.filter(a => a.priority === 'Medium').length}
              </p>
            </div>
            <Bell className="w-8 h-8 text-yellow-400" />
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-blue-900 to-blue-800 border-blue-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-200 text-sm">Total Announcements</p>
              <p className="text-2xl font-bold text-white">{announcements.length}</p>
            </div>
            <Info className="w-8 h-8 text-blue-400" />
          </div>
        </Card>
      </div>

      {/* High Priority Section */}
      {highPriority.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-white mb-4 flex items-center">
            <AlertCircle className="w-6 h-6 text-red-400 mr-2" />
            High Priority
          </h2>
          <div className="space-y-4">
            {highPriority.map((announcement) => (
              <Card
                key={announcement.id}
                className={`p-6 bg-slate-800 border-slate-700 border-l-4 ${getPriorityColor(announcement.priority)}`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    {getPriorityIcon(announcement.priority)}
                    <h3 className="text-lg font-bold text-white">{announcement.title}</h3>
                  </div>
                  <span className="px-3 py-1 bg-red-500/20 text-red-400 text-xs rounded-full">
                    {announcement.priority}
                  </span>
                </div>
                <p className="text-slate-300 mb-4">{announcement.message}</p>
                <div className="flex items-center justify-between text-sm text-slate-400">
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4" />
                    <span>{announcement.author}</span>
                  </div>
                  <span>{announcement.date}</span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Other Announcements */}
      <div>
        <h2 className="text-xl font-bold text-white mb-4">All Announcements</h2>
        <div className="space-y-4">
          {otherAnnouncements.map((announcement) => (
            <Card
              key={announcement.id}
              className={`p-6 bg-slate-800 border-slate-700 border-l-4 ${getPriorityColor(announcement.priority)}`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  {getPriorityIcon(announcement.priority)}
                  <h3 className="text-lg font-bold text-white">{announcement.title}</h3>
                </div>
                <span className={`px-3 py-1 text-xs rounded-full ${
                  announcement.priority === 'Medium'
                    ? 'bg-yellow-500/20 text-yellow-400'
                    : 'bg-blue-500/20 text-blue-400'
                }`}>
                  {announcement.priority}
                </span>
              </div>
              <p className="text-slate-300 mb-4">{announcement.message}</p>
              <div className="flex items-center justify-between text-sm text-slate-400">
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4" />
                  <span>{announcement.author}</span>
                </div>
                <span>{announcement.date}</span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
