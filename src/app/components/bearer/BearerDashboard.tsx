import React, { useState } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { Home, Activity, FolderKanban, BarChart3, Users as UsersIcon, Bell, User, LogOut, Menu, X, LineChart } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { MemberHome } from '@/app/components/member/MemberHome';
import { ClubActivity } from '@/app/components/member/ClubActivity';
import { MyProjects } from '@/app/components/member/MyProjects';
import { AttendanceDPP } from '@/app/components/member/AttendanceDPP';
import { MembersPage } from '@/app/components/member/MembersPage';
import { AnnouncementsPage } from '@/app/components/member/AnnouncementsPage';
import { ProfilePage } from '@/app/components/member/ProfilePage';
import { AnalyticsPage } from './AnalyticsPage';

type BearerPage = 'home' | 'activity' | 'projects' | 'attendance' | 'members' | 'announcements' | 'profile' | 'analytics';

export const BearerDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [currentPage, setCurrentPage] = useState<BearerPage>('home');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { id: 'home' as BearerPage, icon: Home, label: 'Home' },
    { id: 'analytics' as BearerPage, icon: LineChart, label: 'Analytics', exclusive: true },
    { id: 'activity' as BearerPage, icon: Activity, label: 'Club Activity' },
    { id: 'projects' as BearerPage, icon: FolderKanban, label: 'My Projects' },
    { id: 'attendance' as BearerPage, icon: BarChart3, label: 'Attendance & DPP' },
    { id: 'members' as BearerPage, icon: UsersIcon, label: 'Members' },
    { id: 'announcements' as BearerPage, icon: Bell, label: 'Announcements' },
    { id: 'profile' as BearerPage, icon: User, label: 'My Profile' },
  ];

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <MemberHome />;
      case 'analytics':
        return <AnalyticsPage />;
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
            <h1 className="text-2xl font-bold text-purple-400">Rotaract</h1>
            <p className="text-sm text-slate-400">Office Bearer Dashboard</p>
          </div>

          {/* User Info */}
          <div className="p-4 border-b border-slate-700">
            <div className="flex items-center space-x-3">
              <img src={user?.avatar} alt={user?.name} className="w-10 h-10 rounded-full" />
              <div>
                <p className="text-sm font-medium text-white">{user?.name}</p>
                <p className="text-xs text-purple-400">{user?.position}</p>
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
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
                    currentPage === item.id
                      ? 'bg-purple-500 text-white'
                      : 'text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </div>
                  {item.exclusive && (
                    <span className="text-xs px-2 py-0.5 bg-yellow-500/20 text-yellow-400 rounded">
                      Exclusive
                    </span>
                  )}
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
