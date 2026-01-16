import React from 'react';
import { Card } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { announcements } from '@/app/data/projects';
import { Plus, Edit, Trash2, AlertCircle, Bell, Info } from 'lucide-react';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/app/components/ui/alert-dialog';

export const AnnouncementsManagement: React.FC = () => {
  const handleAddAnnouncement = () => {
    toast.success('Add announcement functionality ready for implementation');
  };

  const handleEditAnnouncement = (title: string) => {
    toast.info(`Edit announcement: ${title}`);
  };

  const handleDeleteAnnouncement = (title: string) => {
    toast.success(`Announcement ${title} deleted successfully`);
  };

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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Announcements Management</h1>
          <p className="text-slate-400">Create, edit, or remove club announcements</p>
        </div>
        <Button onClick={handleAddAnnouncement} className="bg-red-500 hover:bg-red-600">
          <Plus className="w-4 h-4 mr-2" />
          New Announcement
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 bg-slate-800 border-slate-700">
          <p className="text-slate-400 text-sm">Total</p>
          <p className="text-3xl font-bold text-white">{announcements.length}</p>
        </Card>
        <Card className="p-4 bg-gradient-to-br from-red-900 to-red-800 border-red-700">
          <p className="text-red-200 text-sm">High Priority</p>
          <p className="text-3xl font-bold text-white">
            {announcements.filter(a => a.priority === 'High').length}
          </p>
        </Card>
        <Card className="p-4 bg-gradient-to-br from-yellow-900 to-yellow-800 border-yellow-700">
          <p className="text-yellow-200 text-sm">Medium Priority</p>
          <p className="text-3xl font-bold text-white">
            {announcements.filter(a => a.priority === 'Medium').length}
          </p>
        </Card>
        <Card className="p-4 bg-gradient-to-br from-blue-900 to-blue-800 border-blue-700">
          <p className="text-blue-200 text-sm">Low Priority</p>
          <p className="text-3xl font-bold text-white">
            {announcements.filter(a => a.priority === 'Low').length}
          </p>
        </Card>
      </div>

      {/* Announcements List */}
      <div className="space-y-4">
        {announcements.map((announcement) => (
          <Card key={announcement.id} className="p-6 bg-slate-800 border-slate-700">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4 flex-1">
                {getPriorityIcon(announcement.priority)}
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-bold text-white">{announcement.title}</h3>
                    <span className={`px-3 py-1 text-xs rounded-full ${
                      announcement.priority === 'High' ? 'bg-red-500/20 text-red-400' :
                      announcement.priority === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-blue-500/20 text-blue-400'
                    }`}>
                      {announcement.priority}
                    </span>
                  </div>
                  <p className="text-slate-300 mb-3">{announcement.message}</p>
                  <div className="flex items-center space-x-4 text-sm text-slate-400">
                    <span>By {announcement.author}</span>
                    <span>•</span>
                    <span>{announcement.date}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2 ml-4">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleEditAnnouncement(announcement.title)}
                  className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/10"
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="bg-slate-800 border-slate-700">
                    <AlertDialogHeader>
                      <AlertDialogTitle className="text-white">Delete Announcement</AlertDialogTitle>
                      <AlertDialogDescription className="text-slate-400">
                        Are you sure you want to delete "{announcement.title}"? This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className="bg-slate-700 text-white border-slate-600">
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDeleteAnnouncement(announcement.title)}
                        className="bg-red-500 hover:bg-red-600"
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card className="p-6 bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
        <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => toast.info('Creating high priority announcement')}
            className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg hover:bg-red-500/20 transition-colors text-left"
          >
            <AlertCircle className="w-6 h-6 text-red-400 mb-2" />
            <p className="font-medium text-white">High Priority</p>
            <p className="text-sm text-slate-400">Urgent announcements</p>
          </button>
          <button
            onClick={() => toast.info('Creating medium priority announcement')}
            className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg hover:bg-yellow-500/20 transition-colors text-left"
          >
            <Bell className="w-6 h-6 text-yellow-400 mb-2" />
            <p className="font-medium text-white">Medium Priority</p>
            <p className="text-sm text-slate-400">Important updates</p>
          </button>
          <button
            onClick={() => toast.info('Creating low priority announcement')}
            className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg hover:bg-blue-500/20 transition-colors text-left"
          >
            <Info className="w-6 h-6 text-blue-400 mb-2" />
            <p className="font-medium text-white">Low Priority</p>
            <p className="text-sm text-slate-400">General information</p>
          </button>
        </div>
      </Card>
    </div>
  );
};
