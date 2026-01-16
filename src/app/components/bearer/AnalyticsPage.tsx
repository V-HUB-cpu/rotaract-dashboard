import React from 'react';
import { Card } from '@/app/components/ui/card';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import {
  memberGrowthData,
  projectDistributionData,
  attendanceData,
  dppMonthlyData,
} from '@/app/data/projects';
import { TrendingUp, Users, Award, Activity, Crown } from 'lucide-react';

export const AnalyticsPage: React.FC = () => {
  const COLORS = ['#0ea5e9', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444'];

  const insights = [
    {
      title: 'Member Retention',
      value: '95%',
      change: '+5%',
      trend: 'up',
      icon: Users,
      color: 'blue',
    },
    {
      title: 'Avg. Project Participation',
      value: '42',
      change: '+8',
      trend: 'up',
      icon: Activity,
      color: 'green',
    },
    {
      title: 'DPP Per Member',
      value: '130',
      change: '+15',
      trend: 'up',
      icon: Award,
      color: 'yellow',
    },
    {
      title: 'Monthly Growth',
      value: '3.2%',
      change: '+1.2%',
      trend: 'up',
      icon: TrendingUp,
      color: 'purple',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg p-6 text-white">
        <div className="flex items-center space-x-3 mb-2">
          <Crown className="w-8 h-8" />
          <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
        </div>
        <p className="text-purple-100">Office Bearer Exclusive - Comprehensive club insights and trends</p>
      </div>

      {/* Key Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {insights.map((insight, index) => {
          const Icon = insight.icon;
          const colorClasses = {
            blue: 'from-blue-900 to-sky-900 border-blue-700',
            green: 'from-green-900 to-emerald-900 border-green-700',
            yellow: 'from-yellow-900 to-amber-900 border-yellow-700',
            purple: 'from-purple-900 to-pink-900 border-purple-700',
          };

          return (
            <Card
              key={index}
              className={`p-6 bg-gradient-to-br ${colorClasses[insight.color as keyof typeof colorClasses]}`}
            >
              <div className="flex items-start justify-between mb-4">
                <Icon className="w-8 h-8 text-white/80" />
                <span className="text-xs px-2 py-1 bg-white/20 text-white rounded">
                  {insight.trend === 'up' ? '↑' : '↓'} {insight.change}
                </span>
              </div>
              <p className="text-3xl font-bold text-white mb-1">{insight.value}</p>
              <p className="text-sm text-white/80">{insight.title}</p>
            </Card>
          );
        })}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Member Growth Trend */}
        <Card className="p-6 bg-slate-800 border-slate-700">
          <h2 className="text-xl font-bold text-white mb-4">Member Growth Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={memberGrowthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="month" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1e293b',
                  border: '1px solid #475569',
                  borderRadius: '8px',
                }}
                labelStyle={{ color: '#e2e8f0' }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="members"
                stroke="#a855f7"
                strokeWidth={3}
                dot={{ fill: '#a855f7', r: 5 }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Project Distribution */}
        <Card className="p-6 bg-slate-800 border-slate-700">
          <h2 className="text-xl font-bold text-white mb-4">Project Distribution by Category</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={projectDistributionData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {projectDistributionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1e293b',
                  border: '1px solid #475569',
                  borderRadius: '8px',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        {/* Attendance Trends */}
        <Card className="p-6 bg-slate-800 border-slate-700">
          <h2 className="text-xl font-bold text-white mb-4">Attendance Trends</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={attendanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="month" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1e293b',
                  border: '1px solid #475569',
                  borderRadius: '8px',
                }}
                labelStyle={{ color: '#e2e8f0' }}
              />
              <Legend />
              <Bar dataKey="attendance" fill="#0ea5e9" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* DPP Monthly Analysis */}
        <Card className="p-6 bg-slate-800 border-slate-700">
          <h2 className="text-xl font-bold text-white mb-4">Monthly DPP Analysis</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dppMonthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="month" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1e293b',
                  border: '1px solid #475569',
                  borderRadius: '8px',
                }}
                labelStyle={{ color: '#e2e8f0' }}
              />
              <Legend />
              <Bar dataKey="points" fill="#eab308" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Performance Summary */}
      <Card className="p-6 bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
        <h2 className="text-xl font-bold text-white mb-4">Performance Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-slate-700/50 rounded-lg">
            <p className="text-slate-400 text-sm mb-2">Top Performing Department</p>
            <p className="text-2xl font-bold text-white mb-1">Environment</p>
            <p className="text-green-400 text-sm">30% of total projects</p>
          </div>
          <div className="p-4 bg-slate-700/50 rounded-lg">
            <p className="text-slate-400 text-sm mb-2">Best Attendance Month</p>
            <p className="text-2xl font-bold text-white mb-1">November</p>
            <p className="text-green-400 text-sm">90% average attendance</p>
          </div>
          <div className="p-4 bg-slate-700/50 rounded-lg">
            <p className="text-slate-400 text-sm mb-2">Highest DPP Month</p>
            <p className="text-2xl font-bold text-white mb-1">December</p>
            <p className="text-green-400 text-sm">1,550 points earned</p>
          </div>
        </div>
      </Card>

      {/* Recommendations */}
      <Card className="p-6 bg-purple-900/20 border-purple-700">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center">
          <Crown className="w-6 h-6 text-purple-400 mr-2" />
          Leadership Insights
        </h2>
        <ul className="space-y-3">
          <li className="flex items-start space-x-3">
            <span className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-purple-400" />
            <p className="text-slate-300">
              <strong className="text-white">Member growth is steady:</strong> Continue current recruitment strategies while focusing on retention.
            </p>
          </li>
          <li className="flex items-start space-x-3">
            <span className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-purple-400" />
            <p className="text-slate-300">
              <strong className="text-white">Attendance is strong:</strong> 88% average attendance shows excellent engagement.
            </p>
          </li>
          <li className="flex items-start space-x-3">
            <span className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-purple-400" />
            <p className="text-slate-300">
              <strong className="text-white">Consider diversifying:</strong> Professional Development projects are underrepresented at 10%.
            </p>
          </li>
          <li className="flex items-start space-x-3">
            <span className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-purple-400" />
            <p className="text-slate-300">
              <strong className="text-white">DPP growth is positive:</strong> Monthly DPP has increased by 29% since July.
            </p>
          </li>
        </ul>
      </Card>
    </div>
  );
};
