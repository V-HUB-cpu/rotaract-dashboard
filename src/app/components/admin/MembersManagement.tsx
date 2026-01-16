import React, { useState } from 'react';
import { Card } from '@/app/components/ui/card';
import { Input } from '@/app/components/ui/input';
import { Button } from '@/app/components/ui/button';
import { allUsers } from '@/app/data/users';
import { Search, Plus, Edit, Trash2, Award } from 'lucide-react';
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

export const MembersManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const displayMembers = allUsers.filter(user => user.role !== 'admin');
  const filteredMembers = displayMembers.filter((member) =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (member.rid && member.rid.includes(searchTerm))
  );

  const handleAddMember = () => {
    toast.success('Add member functionality ready for implementation');
  };

  const handleEditMember = (name: string) => {
    toast.info(`Edit member: ${name}`);
  };

  const handleDeleteMember = (name: string) => {
    toast.success(`Member ${name} deleted successfully`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Members Management</h1>
          <p className="text-slate-400">Add, edit, or remove club members</p>
        </div>
        <Button onClick={handleAddMember} className="bg-red-500 hover:bg-red-600">
          <Plus className="w-4 h-4 mr-2" />
          Add Member
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 bg-slate-800 border-slate-700">
          <p className="text-slate-400 text-sm">Total Members</p>
          <p className="text-3xl font-bold text-white">{displayMembers.length}</p>
        </Card>
        <Card className="p-4 bg-slate-800 border-slate-700">
          <p className="text-slate-400 text-sm">Regular Members</p>
          <p className="text-3xl font-bold text-sky-400">
            {displayMembers.filter(m => m.role === 'member').length}
          </p>
        </Card>
        <Card className="p-4 bg-slate-800 border-slate-700">
          <p className="text-slate-400 text-sm">Office Bearers</p>
          <p className="text-3xl font-bold text-purple-400">
            {displayMembers.filter(m => m.role === 'bearer').length}
          </p>
        </Card>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
        <Input
          placeholder="Search by name, email, or RID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 bg-slate-800 border-slate-700 text-white"
        />
      </div>

      {/* Members Table */}
      <Card className="p-6 bg-slate-800 border-slate-700">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="text-left py-3 px-4 text-slate-400 font-medium">Member</th>
                <th className="text-left py-3 px-4 text-slate-400 font-medium">RID</th>
                <th className="text-left py-3 px-4 text-slate-400 font-medium">Role</th>
                <th className="text-left py-3 px-4 text-slate-400 font-medium">Department</th>
                <th className="text-left py-3 px-4 text-slate-400 font-medium">Attendance</th>
                <th className="text-left py-3 px-4 text-slate-400 font-medium">DPP</th>
                <th className="text-left py-3 px-4 text-slate-400 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredMembers.map((member) => (
                <tr key={member.id} className="border-b border-slate-700 hover:bg-slate-700/50">
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-3">
                      <img src={member.avatar} alt={member.name} className="w-8 h-8 rounded-full" />
                      <div>
                        <p className="text-white font-medium">{member.name}</p>
                        <p className="text-xs text-slate-400">{member.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-slate-300">{member.rid || '-'}</td>
                  <td className="py-3 px-4">
                    {member.role === 'bearer' ? (
                      <span className="flex items-center space-x-1 text-purple-400">
                        <Award className="w-4 h-4" />
                        <span>Bearer</span>
                      </span>
                    ) : (
                      <span className="text-sky-400">Member</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-slate-300">
                    {member.position || member.department || '-'}
                  </td>
                  <td className="py-3 px-4">
                    {member.attendance !== undefined ? (
                      <span className="text-white">{member.attendance}%</span>
                    ) : (
                      <span className="text-slate-500">-</span>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    {member.dppPoints !== undefined ? (
                      <span className="text-yellow-400 font-medium">{member.dppPoints}</span>
                    ) : (
                      <span className="text-slate-500">-</span>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleEditMember(member.name)}
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
                            <AlertDialogTitle className="text-white">Delete Member</AlertDialogTitle>
                            <AlertDialogDescription className="text-slate-400">
                              Are you sure you want to delete {member.name}? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel className="bg-slate-700 text-white border-slate-600">
                              Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDeleteMember(member.name)}
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

      {filteredMembers.length === 0 && (
        <div className="text-center py-12">
          <p className="text-slate-400">No members found matching your search.</p>
        </div>
      )}
    </div>
  );
};
