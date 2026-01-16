import React, { useState } from 'react';
import { Card } from '@/app/components/ui/card';
import { Input } from '@/app/components/ui/input';
import { projects } from '@/app/data/projects';
import { Search, Filter } from 'lucide-react';
import { Badge } from '@/app/components/ui/badge';

export const ClubActivity: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');

  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || project.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Club Activity</h1>
        <p className="text-slate-400">View all club projects and activities</p>
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
                  ? 'bg-sky-500 text-white'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProjects.map((project) => (
          <Card key={project.id} className="p-6 bg-slate-800 border-slate-700 hover:border-sky-500 transition-colors">
            <div className="flex items-start justify-between mb-3">
              <Badge variant={
                project.status === 'Completed' ? 'default' :
                project.status === 'Ongoing' ? 'secondary' :
                'outline'
              } className={
                project.status === 'Completed' ? 'bg-green-500' :
                project.status === 'Ongoing' ? 'bg-blue-500' :
                'bg-yellow-500'
              }>
                {project.status}
              </Badge>
              <span className="text-xs text-slate-400">{project.date}</span>
            </div>
            
            <h3 className="text-lg font-bold text-white mb-2">{project.title}</h3>
            <p className="text-sm text-slate-400 mb-4">{project.description}</p>
            
            <div className="flex items-center justify-between text-sm">
              <div>
                <p className="text-slate-500">Participants</p>
                <p className="text-white font-medium">{project.participants}</p>
              </div>
              <div>
                <p className="text-slate-500">DPP Awarded</p>
                <p className="text-sky-400 font-medium">{project.dppAwarded}</p>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-700">
              <span className="text-xs text-slate-500">Category: </span>
              <span className="text-xs text-sky-400">{project.category}</span>
            </div>
          </Card>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <p className="text-slate-400">No projects found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};
