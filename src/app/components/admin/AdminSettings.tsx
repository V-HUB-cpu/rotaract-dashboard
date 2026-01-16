import React from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { Card } from '@/app/components/ui/card';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Button } from '@/app/components/ui/button';
import { Shield, User, Lock, Settings as SettingsIcon, Database } from 'lucide-react';
import { toast } from 'sonner';

export const AdminSettings: React.FC = () => {
  const { user } = useAuth();

  const handleUpdateProfile = () => {
    toast.success('Profile updated successfully');
  };

  const handleChangePassword = () => {
    toast.success('Password changed successfully');
  };

  const handleSystemSettings = () => {
    toast.info('System settings updated');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
        <p className="text-slate-400">Manage your profile and system settings</p>
      </div>

      {/* Admin Profile */}
      <Card className="p-6 bg-gradient-to-br from-red-900 to-pink-900 border-red-700">
        <div className="flex items-center space-x-4">
          <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">{user?.name}</h2>
            <p className="text-red-200">System Administrator</p>
            <p className="text-red-300 text-sm mt-1">Full system access granted</p>
          </div>
        </div>
      </Card>

      {/* Profile Settings */}
      <Card className="p-6 bg-slate-800 border-slate-700">
        <div className="flex items-center space-x-3 mb-6">
          <User className="w-6 h-6 text-red-400" />
          <h2 className="text-xl font-bold text-white">Profile Information</h2>
        </div>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name" className="text-slate-200">Full Name</Label>
              <Input
                id="name"
                defaultValue={user?.name}
                className="bg-slate-700 border-slate-600 text-white mt-2"
              />
            </div>
            <div>
              <Label htmlFor="email" className="text-slate-200">Email</Label>
              <Input
                id="email"
                type="email"
                defaultValue={user?.email}
                className="bg-slate-700 border-slate-600 text-white mt-2"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="phone" className="text-slate-200">Phone</Label>
              <Input
                id="phone"
                defaultValue={user?.phone}
                className="bg-slate-700 border-slate-600 text-white mt-2"
              />
            </div>
            <div>
              <Label htmlFor="username" className="text-slate-200">Username</Label>
              <Input
                id="username"
                defaultValue={user?.username}
                className="bg-slate-700 border-slate-600 text-white mt-2"
              />
            </div>
          </div>
          <Button onClick={handleUpdateProfile} className="bg-red-500 hover:bg-red-600">
            Update Profile
          </Button>
        </div>
      </Card>

      {/* Password Settings */}
      <Card className="p-6 bg-slate-800 border-slate-700">
        <div className="flex items-center space-x-3 mb-6">
          <Lock className="w-6 h-6 text-red-400" />
          <h2 className="text-xl font-bold text-white">Security</h2>
        </div>
        <div className="space-y-4">
          <div>
            <Label htmlFor="current-password" className="text-slate-200">Current Password</Label>
            <Input
              id="current-password"
              type="password"
              placeholder="Enter current password"
              className="bg-slate-700 border-slate-600 text-white mt-2"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="new-password" className="text-slate-200">New Password</Label>
              <Input
                id="new-password"
                type="password"
                placeholder="Enter new password"
                className="bg-slate-700 border-slate-600 text-white mt-2"
              />
            </div>
            <div>
              <Label htmlFor="confirm-password" className="text-slate-200">Confirm Password</Label>
              <Input
                id="confirm-password"
                type="password"
                placeholder="Confirm new password"
                className="bg-slate-700 border-slate-600 text-white mt-2"
              />
            </div>
          </div>
          <Button onClick={handleChangePassword} className="bg-red-500 hover:bg-red-600">
            Change Password
          </Button>
        </div>
      </Card>

      {/* System Settings */}
      <Card className="p-6 bg-slate-800 border-slate-700">
        <div className="flex items-center space-x-3 mb-6">
          <SettingsIcon className="w-6 h-6 text-red-400" />
          <h2 className="text-xl font-bold text-white">System Configuration</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-slate-700/50 rounded-lg">
            <h3 className="font-medium text-white mb-2">Club Name</h3>
            <Input
              defaultValue="Rotaract Club of Coimbatore City"
              className="bg-slate-700 border-slate-600 text-white"
            />
          </div>
          <div className="p-4 bg-slate-700/50 rounded-lg">
            <h3 className="font-medium text-white mb-2">District Number</h3>
            <Input
              defaultValue="3201"
              className="bg-slate-700 border-slate-600 text-white"
            />
          </div>
          <div className="p-4 bg-slate-700/50 rounded-lg">
            <h3 className="font-medium text-white mb-2">Meeting Day</h3>
            <Input
              defaultValue="Every Thursday"
              className="bg-slate-700 border-slate-600 text-white"
            />
          </div>
          <div className="p-4 bg-slate-700/50 rounded-lg">
            <h3 className="font-medium text-white mb-2">Meeting Time</h3>
            <Input
              defaultValue="6:00 PM"
              className="bg-slate-700 border-slate-600 text-white"
            />
          </div>
        </div>
        <Button onClick={handleSystemSettings} className="bg-red-500 hover:bg-red-600 mt-4">
          Save Settings
        </Button>
      </Card>

      {/* Database Stats */}
      <Card className="p-6 bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
        <div className="flex items-center space-x-3 mb-4">
          <Database className="w-6 h-6 text-red-400" />
          <h2 className="text-xl font-bold text-white">Database Information</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-slate-700/50 rounded-lg">
            <p className="text-2xl font-bold text-white">15</p>
            <p className="text-sm text-slate-400">Total Users</p>
          </div>
          <div className="text-center p-4 bg-slate-700/50 rounded-lg">
            <p className="text-2xl font-bold text-white">8</p>
            <p className="text-sm text-slate-400">Projects</p>
          </div>
          <div className="text-center p-4 bg-slate-700/50 rounded-lg">
            <p className="text-2xl font-bold text-white">5</p>
            <p className="text-sm text-slate-400">Announcements</p>
          </div>
          <div className="text-center p-4 bg-slate-700/50 rounded-lg">
            <p className="text-2xl font-bold text-white">100%</p>
            <p className="text-sm text-slate-400">Health</p>
          </div>
        </div>
      </Card>
    </div>
  );
};
