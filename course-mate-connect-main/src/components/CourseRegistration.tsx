
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft, BookOpen, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface Course {
  id: string;
  code: string;
  title: string;
  credits: number;
  type: 'Compulsory' | 'Elective';
  level: number;
}

interface CourseRegistrationProps {
  setCurrentView: (view: string) => void;
}

const CourseRegistration: React.FC<CourseRegistrationProps> = ({ setCurrentView }) => {
  const [selectedLevel, setSelectedLevel] = useState(300);
  const [selectedCourses, setSelectedCourses] = useState<Set<string>>(new Set());
  const [registrationStatus, setRegistrationStatus] = useState<'idle' | 'pending' | 'approved' | 'rejected'>('idle');

  const courses: Course[] = [
    { id: '1', code: 'CSC301', title: 'Database Management Systems', credits: 3, type: 'Compulsory', level: 300 },
    { id: '2', code: 'CSC302', title: 'Software Engineering', credits: 3, type: 'Compulsory', level: 300 },
    { id: '3', code: 'CSC303', title: 'Computer Networks', credits: 3, type: 'Compulsory', level: 300 },
    { id: '4', code: 'CSC304', title: 'Operating Systems', credits: 3, type: 'Compulsory', level: 300 },
    { id: '5', code: 'CSC305', title: 'Web Programming', credits: 2, type: 'Elective', level: 300 },
    { id: '6', code: 'CSC306', title: 'Mobile App Development', credits: 2, type: 'Elective', level: 300 },
    { id: '7', code: 'MAT301', title: 'Numerical Analysis', credits: 3, type: 'Compulsory', level: 300 },
    { id: '8', code: 'STA301', title: 'Statistical Computing', credits: 2, type: 'Elective', level: 300 },
  ];

  const filteredCourses = courses.filter(course => course.level === selectedLevel);
  const compulsoryCourses = filteredCourses.filter(course => course.type === 'Compulsory');
  const electiveCourses = filteredCourses.filter(course => course.type === 'Elective');

  const totalCredits = Array.from(selectedCourses).reduce((total, courseId) => {
    const course = courses.find(c => c.id === courseId);
    return total + (course?.credits || 0);
  }, 0);

  const maxCredits = 24;
  const minCredits = 15;

  const handleCourseToggle = (courseId: string) => {
    const newSelected = new Set(selectedCourses);
    if (newSelected.has(courseId)) {
      newSelected.delete(courseId);
    } else {
      newSelected.add(courseId);
    }
    setSelectedCourses(newSelected);
  };

  const handleSubmitRegistration = () => {
    if (totalCredits >= minCredits && totalCredits <= maxCredits) {
      setRegistrationStatus('pending');
      // Simulate submission
      setTimeout(() => {
        setRegistrationStatus('approved');
      }, 2000);
    }
  };

  const levels = [100, 200, 300, 400];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center space-x-3">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setCurrentView('dashboard')}
            >
              <ArrowLeft size={20} />
            </Button>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <BookOpen size={20} className="text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">Course Registration</h1>
                <p className="text-sm text-gray-600">2023/2024 Academic Session</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Level Selection */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Select Level</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-2">
              {levels.map((level) => (
                <Button
                  key={level}
                  variant={selectedLevel === level ? 'default' : 'outline'}
                  onClick={() => setSelectedLevel(level)}
                  className={selectedLevel === level ? 'bg-blue-600' : ''}
                >
                  {level}L
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Credit Summary */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-lg font-semibold">
                  Total Credits: {totalCredits}/{maxCredits}
                </div>
                <div className="text-sm text-gray-600">
                  Minimum required: {minCredits} credits
                </div>
              </div>
              <div className="flex space-x-2">
                <Badge variant={totalCredits < minCredits ? 'destructive' : totalCredits > maxCredits ? 'destructive' : 'default'}>
                  {totalCredits < minCredits ? 'Below Minimum' : totalCredits > maxCredits ? 'Exceeds Maximum' : 'Valid'}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Registration Status */}
        {registrationStatus !== 'idle' && (
          <Alert className={`mb-6 ${registrationStatus === 'approved' ? 'border-green-200 bg-green-50' : registrationStatus === 'pending' ? 'border-yellow-200 bg-yellow-50' : 'border-red-200 bg-red-50'}`}>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {registrationStatus === 'pending' && 'Registration submitted and pending adviser approval.'}
              {registrationStatus === 'approved' && 'Registration approved by adviser. You are successfully registered!'}
              {registrationStatus === 'rejected' && 'Registration rejected. Please contact your adviser.'}
            </AlertDescription>
          </Alert>
        )}

        {/* Compulsory Courses */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Compulsory Courses
              <Badge variant="secondary">{compulsoryCourses.length} courses</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {compulsoryCourses.map((course) => (
              <div key={course.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                <Checkbox
                  checked={selectedCourses.has(course.id)}
                  onCheckedChange={() => handleCourseToggle(course.id)}
                />
                <div className="flex-1">
                  <div className="font-medium">{course.code}</div>
                  <div className="text-sm text-gray-600">{course.title}</div>
                </div>
                <Badge variant="outline">{course.credits} credits</Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Elective Courses */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Elective Courses
              <Badge variant="secondary">{electiveCourses.length} courses</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {electiveCourses.map((course) => (
              <div key={course.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                <Checkbox
                  checked={selectedCourses.has(course.id)}
                  onCheckedChange={() => handleCourseToggle(course.id)}
                />
                <div className="flex-1">
                  <div className="font-medium">{course.code}</div>
                  <div className="text-sm text-gray-600">{course.title}</div>
                </div>
                <Badge variant="outline">{course.credits} credits</Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="text-center">
          <Button
            onClick={handleSubmitRegistration}
            disabled={totalCredits < minCredits || totalCredits > maxCredits || registrationStatus !== 'idle'}
            className="bg-blue-600 hover:bg-blue-700 px-8"
          >
            {registrationStatus === 'pending' ? 'Submitting...' : 'Submit Registration'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CourseRegistration;
