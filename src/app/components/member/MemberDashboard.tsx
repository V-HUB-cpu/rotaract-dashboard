import React, { useState } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { Home, Activity, FolderKanban, BarChart3, Users as UsersIcon, Bell, User, LogOut, Menu, X } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { MemberHome } from './MemberHome';
import { ClubActivity } from './ClubActivity';
import { MyProjects } from './MyProjects';
import { AttendanceDPP } from './AttendanceDPP';
import { MembersPage } from './MembersPage';
import { AnnouncementsPage } from './AnnouncementsPage';
import { ProfilePage } from './ProfilePage';

type MemberPage = 'home' | 'activity' | 'projects' | 'attendance' | 'members' | 'announcements' | 'profile';

export const MemberDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [currentPage, setCurrentPage] = useState<MemberPage>('home');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { id: 'home' as MemberPage, icon: Home, label: 'Home' },
    { id: 'activity' as MemberPage, icon: Activity, label: 'Club Activity' },
    { id: 'projects' as MemberPage, icon: FolderKanban, label: 'My Projects' },
    { id: 'attendance' as MemberPage, icon: BarChart3, label: 'Attendance & DPP' },
    { id: 'members' as MemberPage, icon: UsersIcon, label: 'Members' },
    { id: 'announcements' as MemberPage, icon: Bell, label: 'Announcements' },
    { id: 'profile' as MemberPage, icon: User, label: 'My Profile' },
  ];

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <MemberHome />;
      case 'activity':
        return <ClubActivity />;
      case 'projects':
        return <MyProjects />;
      case 'attendance':
        return <AttendanceDPP />;
      case 'members':
        return <MembersPage />;
      case 'announcements':
        return <AnnouncementsPage />;
      case 'profile':
        return <ProfilePage />;
      default:
        return <MemberHome />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-900">
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 lg:hidden text-white"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <X /> : <Menu />}
      </Button>

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-slate-800 border-r border-slate-700 transform transition-transform duration-200 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-slate-700">
            <h1 className="text-2xl font-bold text-sky-400">Rotaract</h1>
            <p className="text-sm text-slate-400">Member Dashboard</p>
          </div>

          {/* User Info */}
          <div className="p-4 border-b border-slate-700">
            <div className="flex items-center space-x-3">
              <img src={user?.avatar} alt={user?.name} className="w-10 h-10 rounded-full" />
              <div>
                <p className="text-sm font-medium text-white">{user?.name}</p>
                <p className="text-xs text-slate-400">RID: {user?.rid}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentPage(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    currentPage === item.id
                      ? 'bg-sky-500 text-white'
                      : 'text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-slate-700">
            <Button
              variant="ghost"
              className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-slate-700"
              onClick={logout}
            >
              <LogOut className="w-5 h-5 mr-3" />
              Logout
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-4 lg:p-8">{renderPage()}</div>
      </main>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};
