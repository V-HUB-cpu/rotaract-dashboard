import React from 'react';
import { Card } from '@/app/components/ui/card';
import { memberProjects } from '@/app/data/projects';
import { CheckCircle2, Clock, Trophy } from 'lucide-react';

export const MyProjects: React.FC = () => {
  const completedProjects = memberProjects.filter(p => p.status === 'Completed');
  const ongoingProjects = memberProjects.filter(p => p.status === 'Ongoing');
  const totalDPP = memberProjects.reduce((sum, p) => sum + p.dppEarned, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">My Projects</h1>
        <p className="text-slate-400">Track your project participation and earned DPP</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6 bg-gradient-to-br from-green-900 to-emerald-900 border-green-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-200 text-sm mb-1">Completed</p>
              <p className="text-3xl font-bold text-white">{completedProjects.length}</p>
            </div>
            <CheckCircle2 className="w-10 h-10 text-green-400" />
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-blue-900 to-sky-900 border-blue-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-200 text-sm mb-1">Ongoing</p>
              <p className="text-3xl font-bold text-white">{ongoingProjects.length}</p>
            </div>
            <Clock className="w-10 h-10 text-blue-400" />
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-yellow-900 to-amber-900 border-yellow-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-200 text-sm mb-1">Total DPP Earned</p>
              <p className="text-3xl font-bold text-white">{totalDPP}</p>
            </div>
            <Trophy className="w-10 h-10 text-yellow-400" />
          </div>
        </Card>
      </div>

      {/* Projects List */}
      <Card className="p-6 bg-slate-800 border-slate-700">
        <h2 className="text-xl font-bold text-white mb-4">Project History</h2>
        <div className="space-y-3">
          {memberProjects.map((project, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  project.status === 'Completed' ? 'bg-green-500/20' : 'bg-blue-500/20'
                }`}>
                  {project.status === 'Completed' ? (
                    <CheckCircle2 className="w-5 h-5 text-green-400" />
                  ) : (
                    <Clock className="w-5 h-5 text-blue-400" />
                  )}
                </div>
                <div>
                  <h3 className="font-medium text-white">{project.projectTitle}</h3>
                  <p className="text-sm text-slate-400">{project.date}</p>
                </div>
              </div>

              <div className="flex items-center space-x-6">
                <div className="text-right">
                  <span className={`inline-block px-3 py-1 rounded-full text-sm ${
                    project.status === 'Completed'
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-blue-500/20 text-blue-400'
                  }`}>
                    {project.status}
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-500">DPP Earned</p>
                  <p className="text-lg font-bold text-sky-400">+{project.dppEarned}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Achievement Message */}
      <Card className="p-6 bg-gradient-to-r from-purple-900 to-pink-900 border-purple-700">
        <div className="flex items-center space-x-4">
          <Trophy className="w-12 h-12 text-yellow-400" />
          <div>
            <h3 className="text-xl font-bold text-white mb-1">Great Progress!</h3>
            <p className="text-purple-200">
              You've participated in {memberProjects.length} projects and earned {totalDPP} DPP points. Keep up the excellent work!
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};
