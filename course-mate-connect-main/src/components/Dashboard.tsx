
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, 
  FileText, 
  Calendar, 
  Bell, 
  User,
  GraduationCap,
  Download
} from 'lucide-react';

interface DashboardProps {
  currentView: string;
  setCurrentView: (view: string) => void;
  notifications: number;
  studentName: string;
}

const Dashboard: React.FC<DashboardProps> = ({ 
  currentView, 
  setCurrentView, 
  notifications, 
  studentName 
}) => {
  const menuItems = [
    {
      id: 'registration',
      title: 'Course Registration',
      description: 'Register for new courses',
      icon: BookOpen,
      color: 'bg-blue-600',
      hoverColor: 'hover:bg-blue-700'
    },
    {
      id: 'results',
      title: 'Check Results',
      description: 'View academic results',
      icon: FileText,
      color: 'bg-green-600',
      hoverColor: 'hover:bg-green-700'
    },
    {
      id: 'timetable',
      title: 'Download Timetable',
      description: 'Get academic schedules',
      icon: Download,
      color: 'bg-purple-600',
      hoverColor: 'hover:bg-purple-700'
    },
    {
      id: 'notifications',
      title: 'Notifications',
      description: 'View updates and alerts',
      icon: Bell,
      color: 'bg-orange-600',
      hoverColor: 'hover:bg-orange-700',
      badge: notifications
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <GraduationCap size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">CourseMate</h1>
                <p className="text-sm text-gray-600">Welcome back, {studentName}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCurrentView('profile')}
              className="hover:bg-gray-100"
            >
              <User size={20} />
            </Button>
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Dashboard</h2>
          <p className="text-gray-600">Manage your academic activities</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {menuItems.map((item) => (
            <Card 
              key={item.id}
              className="hover:shadow-lg transition-all duration-200 cursor-pointer group"
              onClick={() => setCurrentView(item.id)}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`p-3 rounded-lg ${item.color} ${item.hoverColor} transition-colors`}>
                      <item.icon size={24} className="text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">
                        {item.title}
                      </CardTitle>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                  </div>
                  {item.badge && item.badge > 0 && (
                    <Badge variant="destructive" className="ml-2">
                      {item.badge}
                    </Badge>
                  )}
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">2023/2024</div>
              <div className="text-sm text-gray-600">Current Session</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">300L</div>
              <div className="text-sm text-gray-600">Current Level</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">18/24</div>
              <div className="text-sm text-gray-600">Credit Units</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
