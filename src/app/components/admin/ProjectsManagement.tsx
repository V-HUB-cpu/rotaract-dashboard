import React, { useState } from 'react';
import { Card } from '@/app/components/ui/card';
import { Input } from '@/app/components/ui/input';
import { Button } from '@/app/components/ui/button';
import { projects } from '@/app/data/projects';
import { Search, Plus, Edit, Trash2 } from 'lucide-react';
import { Badge } from '@/app/components/ui/badge';
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

export const ProjectsManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');

  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || project.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleAddProject = () => {
    toast.success('Add project functionality ready for implementation');
  };

  const handleEditProject = (title: string) => {
    toast.info(`Edit project: ${title}`);
  };

  const handleDeleteProject = (title: string) => {
    toast.success(`Project ${title} deleted successfully`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Projects Management</h1>
          <p className="text-slate-400">Create, edit, or remove club projects</p>
        </div>
        <Button onClick={handleAddProject} className="bg-red-500 hover:bg-red-600">
          <Plus className="w-4 h-4 mr-2" />
          Add Project
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 bg-slate-800 border-slate-700">
          <p className="text-slate-400 text-sm">Total Projects</p>
          <p className="text-3xl font-bold text-white">{projects.length}</p>
        </Card>
        <Card className="p-4 bg-slate-800 border-slate-700">
          <p className="text-slate-400 text-sm">Completed</p>
          <p className="text-3xl font-bold text-green-400">
            {projects.filter(p => p.status === 'Completed').length}
          </p>
        </Card>
        <Card className="p-4 bg-slate-800 border-slate-700">
          <p className="text-slate-400 text-sm">Ongoing</p>
          <p className="text-3xl font-bold text-blue-400">
            {projects.filter(p => p.status === 'Ongoing').length}
          </p>
        </Card>
        <Card className="p-4 bg-slate-800 border-slate-700">
          <p className="text-slate-400 text-sm">Planned</p>
          <p className="text-3xl font-bold text-yellow-400">
            {projects.filter(p => p.status === 'Planned').length}
          </p>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
          <Input
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-slate-800 border-slate-700 text-white"
          />
        </div>
        <div className="flex gap-2">
          {['All', 'Completed', 'Ongoing', 'Planned'].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                statusFilter === status
                  ? 'bg-red-500 text-white'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Table */}
      <Card className="p-6 bg-slate-800 border-slate-700">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="text-left py-3 px-4 text-slate-400 font-medium">Project</th>
                <th className="text-left py-3 px-4 text-slate-400 font-medium">Status</th>
                <th className="text-left py-3 px-4 text-slate-400 font-medium">Date</th>
                <th className="text-left py-3 px-4 text-slate-400 font-medium">Category</th>
                <th className="text-left py-3 px-4 text-slate-400 font-medium">Participants</th>
                <th className="text-left py-3 px-4 text-slate-400 font-medium">DPP</th>
                <th className="text-left py-3 px-4 text-slate-400 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProjects.map((project) => (
                <tr key={project.id} className="border-b border-slate-700 hover:bg-slate-700/50">
                  <td className="py-3 px-4">
                    <div>
                      <p className="text-white font-medium">{project.title}</p>
                      <p className="text-xs text-slate-400 mt-1">{project.description.slice(0, 50)}...</p>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <Badge className={
                      project.status === 'Completed' ? 'bg-green-500' :
                      project.status === 'Ongoing' ? 'bg-blue-500' :
                      'bg-yellow-500'
                    }>
                      {project.status}
                    </Badge>
                  </td>
                  <td className="py-3 px-4 text-slate-300">{project.date}</td>
                  <td className="py-3 px-4 text-slate-300">{project.category}</td>
                  <td className="py-3 px-4 text-white">{project.participants}</td>
                  <td className="py-3 px-4 text-yellow-400 font-medium">{project.dppAwarded}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleEditProject(project.title)}
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
                            <AlertDialogTitle className="text-white">Delete Project</AlertDialogTitle>
                            <AlertDialogDescription className="text-slate-400">
                              Are you sure you want to delete {project.title}? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel className="bg-slate-700 text-white border-slate-600">
                              Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDeleteProject(project.title)}
                              className="bg-red-500 hover:bg-red-600"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
