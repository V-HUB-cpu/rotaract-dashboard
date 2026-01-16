import React from 'react';
import { Card } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { allUsers } from '@/app/data/users';
import { TrendingUp, Award, Plus } from 'lucide-react';
import { toast } from 'sonner';

export const AttendanceManagement: React.FC = () => {
  const displayMembers = allUsers.filter(user => user.role !== 'admin');

  const handleUpdateAttendance = (name: string) => {
    toast.success(`Attendance updated for ${name}`);
  };

  const handleAwardDPP = (name: string) => {
    toast.success(`DPP points awarded to ${name}`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Attendance & DPP Management</h1>
        <p className="text-slate-400">Update attendance records and award DPP points</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6 bg-gradient-to-br from-blue-900 to-sky-900 border-blue-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-200 text-sm mb-1">Avg Attendance</p>
              <p className="text-3xl font-bold text-white">88%</p>
            </div>
            <TrendingUp className="w-10 h-10 text-blue-400" />
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-yellow-900 to-amber-900 border-yellow-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-200 text-sm mb-1">Total DPP</p>
              <p className="text-3xl font-bold text-white">8,450</p>
            </div>
            <Award className="w-10 h-10 text-yellow-400" />
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-green-900 to-emerald-900 border-green-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-200 text-sm mb-1">Active Members</p>
              <p className="text-3xl font-bold text-white">{displayMembers.length}</p>
            </div>
            <Plus className="w-10 h-10 text-green-400" />
          </div>
        </Card>
      </div>

      {/* Members Table */}
      <Card className="p-6 bg-slate-800 border-slate-700">
        <h2 className="text-xl font-bold text-white mb-4">Member Records</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="text-left py-3 px-4 text-slate-400 font-medium">Member</th>
                <th className="text-left py-3 px-4 text-slate-400 font-medium">Department</th>
                <th className="text-left py-3 px-4 text-slate-400 font-medium">Attendance</th>
                <th className="text-left py-3 px-4 text-slate-400 font-medium">DPP Points</th>
                <th className="text-left py-3 px-4 text-slate-400 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {displayMembers.map((member) => (
                <tr key={member.id} className="border-b border-slate-700 hover:bg-slate-700/50">
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-3">
                      <img src={member.avatar} alt={member.name} className="w-8 h-8 rounded-full" />
                      <div>
                        <p className="text-white font-medium">{member.name}</p>
                        <p className="text-xs text-slate-400">{member.role === 'bearer' ? 'Office Bearer' : 'Member'}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-slate-300">
                    {member.position || member.department || '-'}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      {member.attendance !== undefined ? (
                        <>
                          <div className="flex-1 max-w-[100px]">
                            <div className="bg-slate-700 rounded-full h-2 overflow-hidden">
                              <div
                                className={`h-full rounded-full ${
                                  member.attendance >= 90 ? 'bg-green-500' :
                                  member.attendance >= 75 ? 'bg-yellow-500' :
                                  'bg-red-500'
                                }`}
                                style={{ width: `${member.attendance}%` }}
                              />
                            </div>
                          </div>
                          <span className="text-white font-medium w-12">{member.attendance}%</span>
                        </>
                      ) : (
                        <span className="text-slate-500">-</span>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    {member.dppPoints !== undefined ? (
                      <span className="text-yellow-400 font-bold text-lg">{member.dppPoints}</span>
                    ) : (
                      <span className="text-slate-500">-</span>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <Button
                        size="sm"
                        onClick={() => handleUpdateAttendance(member.name)}
                        className="bg-blue-500 hover:bg-blue-600 text-xs"
                      >
                        <TrendingUp className="w-3 h-3 mr-1" />
                        Update
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleAwardDPP(member.name)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-xs"
                      >
                        <Award className="w-3 h-3 mr-1" />
                        Award DPP
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 bg-slate-800 border-slate-700">
          <p className="text-slate-400 text-sm">Perfect Attendance</p>
          <p className="text-2xl font-bold text-white">
            {displayMembers.filter(m => (m.attendance || 0) >= 95).length}
          </p>
        </Card>
        <Card className="p-4 bg-slate-800 border-slate-700">
          <p className="text-slate-400 text-sm">Good Attendance</p>
          <p className="text-2xl font-bold text-white">
            {displayMembers.filter(m => (m.attendance || 0) >= 75 && (m.attendance || 0) < 95).length}
          </p>
        </Card>
        <Card className="p-4 bg-slate-800 border-slate-700">
          <p className="text-slate-400 text-sm">Top DPP Earner</p>
          <p className="text-2xl font-bold text-yellow-400">
            {Math.max(...displayMembers.map(m => m.dppPoints || 0))}
          </p>
        </Card>
        <Card className="p-4 bg-slate-800 border-slate-700">
          <p className="text-slate-400 text-sm">Avg DPP Per Member</p>
          <p className="text-2xl font-bold text-yellow-400">
            {Math.round(displayMembers.reduce((sum, m) => sum + (m.dppPoints || 0), 0) / displayMembers.length)}
          </p>
        </Card>
      </div>
    </div>
  );
};
