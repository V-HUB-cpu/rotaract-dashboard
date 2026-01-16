import React, { useState } from 'react';
import { Card } from '@/app/components/ui/card';
import { Input } from '@/app/components/ui/input';
import { allUsers } from '@/app/data/users';
import { Search, Mail, Phone, Award } from 'lucide-react';

export const MembersPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const displayMembers = allUsers.filter(user => user.role !== 'admin');
  const filteredMembers = displayMembers.filter((member) =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (member.department && member.department.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Members Directory</h1>
        <p className="text-slate-400">Connect with fellow Rotaractors</p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
        <Input
          placeholder="Search members by name, email, or department..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 bg-slate-800 border-slate-700 text-white"
        />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 bg-slate-800 border-slate-700">
          <p className="text-slate-400 text-sm">Total Members</p>
          <p className="text-3xl font-bold text-sky-400">{displayMembers.length}</p>
        </Card>
        <Card className="p-4 bg-slate-800 border-slate-700">
          <p className="text-slate-400 text-sm">Office Bearers</p>
          <p className="text-3xl font-bold text-purple-400">
            {displayMembers.filter(m => m.role === 'bearer').length}
          </p>
        </Card>
        <Card className="p-4 bg-slate-800 border-slate-700">
          <p className="text-slate-400 text-sm">Active Members</p>
          <p className="text-3xl font-bold text-green-400">
            {displayMembers.filter(m => m.role === 'member').length}
          </p>
        </Card>
      </div>

      {/* Members Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredMembers.map((member) => (
          <Card key={member.id} className="p-6 bg-slate-800 border-slate-700 hover:border-sky-500 transition-colors">
            <div className="flex items-start space-x-4">
              <img
                src={member.avatar}
                alt={member.name}
                className="w-16 h-16 rounded-full"
              />
              <div className="flex-1">
                <h3 className="font-bold text-white">{member.name}</h3>
                {member.position && (
                  <p className="text-xs text-purple-400 font-medium mb-1">{member.position}</p>
                )}
                {member.department && (
                  <p className="text-xs text-sky-400">{member.department}</p>
                )}
                {member.rid && (
                  <p className="text-xs text-slate-500 mt-1">RID: {member.rid}</p>
                )}
              </div>
              {member.role === 'bearer' && (
                <Award className="w-5 h-5 text-purple-400" />
              )}
            </div>

            <div className="mt-4 space-y-2 text-sm">
              <div className="flex items-center space-x-2 text-slate-400">
                <Mail className="w-4 h-4" />
                <span className="truncate">{member.email}</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-400">
                <Phone className="w-4 h-4" />
                <span>{member.phone}</span>
              </div>
            </div>

            {member.attendance !== undefined && member.dppPoints !== undefined && (
              <div className="mt-4 pt-4 border-t border-slate-700 flex justify-between text-sm">
                <div>
                  <p className="text-slate-500">Attendance</p>
                  <p className="text-white font-medium">{member.attendance}%</p>
                </div>
                <div>
                  <p className="text-slate-500">DPP</p>
                  <p className="text-sky-400 font-medium">{member.dppPoints}</p>
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>

      {filteredMembers.length === 0 && (
        <div className="text-center py-12">
          <p className="text-slate-400">No members found matching your search.</p>
        </div>
      )}
    </div>
  );
};
