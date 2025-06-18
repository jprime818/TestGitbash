
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, FileText, Download } from 'lucide-react';

interface ResultsProps {
  setCurrentView: (view: string) => void;
}

interface CourseResult {
  code: string;
  title: string;
  credits: number;
  score: number;
  grade: string;
}

const Results: React.FC<ResultsProps> = ({ setCurrentView }) => {
  const [matricNumber, setMatricNumber] = useState('');
  const [session, setSession] = useState('');
  const [semester, setSemester] = useState('');
  const [results, setResults] = useState<CourseResult[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const sampleResults: CourseResult[] = [
    { code: 'CSC301', title: 'Database Management Systems', credits: 3, score: 85, grade: 'A' },
    { code: 'CSC302', title: 'Software Engineering', credits: 3, score: 78, grade: 'B+' },
    { code: 'CSC303', title: 'Computer Networks', credits: 3, score: 92, grade: 'A+' },
    { code: 'CSC304', title: 'Operating Systems', credits: 3, score: 74, grade: 'B' },
    { code: 'CSC305', title: 'Web Programming', credits: 2, score: 88, grade: 'A' },
    { code: 'MAT301', title: 'Numerical Analysis', credits: 3, score: 81, grade: 'A-' },
  ];

  const calculateGPA = (results: CourseResult[]) => {
    const gradePoints: { [key: string]: number } = {
      'A+': 4.0, 'A': 4.0, 'A-': 3.7, 'B+': 3.3, 'B': 3.0, 'B-': 2.7,
      'C+': 2.3, 'C': 2.0, 'C-': 1.7, 'D+': 1.3, 'D': 1.0, 'F': 0.0
    };
    
    let totalPoints = 0;
    let totalCredits = 0;
    
    results.forEach(result => {
      totalPoints += gradePoints[result.grade] * result.credits;
      totalCredits += result.credits;
    });
    
    return totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : '0.00';
  };

  const handleViewResults = () => {
    setIsLoading(true);
    setTimeout(() => {
      setResults(sampleResults);
      setIsLoading(false);
    }, 1500);
  };

  const handleDownloadPDF = () => {
    console.log('Downloading results as PDF...');
  };

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
              <div className="p-2 bg-green-600 rounded-lg">
                <FileText size={20} className="text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">Check Results</h1>
                <p className="text-sm text-gray-600">View your academic performance</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Search Form */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Enter Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="matric">Matric Number</Label>
                <Input
                  id="matric"
                  placeholder="e.g., CSC/2021/001"
                  value={matricNumber}
                  onChange={(e) => setMatricNumber(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Session</Label>
                <Select value={session} onValueChange={setSession}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select session" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2023/2024">2023/2024</SelectItem>
                    <SelectItem value="2022/2023">2022/2023</SelectItem>
                    <SelectItem value="2021/2022">2021/2022</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Semester</Label>
                <Select value={semester} onValueChange={setSemester}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select semester" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="first">First Semester</SelectItem>
                    <SelectItem value="second">Second Semester</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button 
              onClick={handleViewResults}
              disabled={!matricNumber || !session || !semester || isLoading}
              className="bg-green-600 hover:bg-green-700"
            >
              {isLoading ? 'Loading Results...' : 'View Results'}
            </Button>
          </CardContent>
        </Card>

        {/* Results Display */}
        {results && (
          <>
            {/* Student Info & Summary */}
            <Card className="mb-6">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Results Summary</CardTitle>
                  <Button onClick={handleDownloadPDF} variant="outline">
                    <Download size={16} className="mr-2" />
                    Download PDF
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <div className="text-sm text-gray-600">Matric Number</div>
                    <div className="font-semibold">{matricNumber}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Session</div>
                    <div className="font-semibold">{session}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Semester</div>
                    <div className="font-semibold">{semester === 'first' ? 'First' : 'Second'}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">GPA</div>
                    <div className="font-semibold text-green-600">{calculateGPA(results)}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Course Results */}
            <Card>
              <CardHeader>
                <CardTitle>Course Results</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2">Course Code</th>
                        <th className="text-left py-2">Course Title</th>
                        <th className="text-center py-2">Credits</th>
                        <th className="text-center py-2">Score</th>
                        <th className="text-center py-2">Grade</th>
                      </tr>
                    </thead>
                    <tbody>
                      {results.map((result, index) => (
                        <tr key={index} className="border-b hover:bg-gray-50">
                          <td className="py-3 font-medium">{result.code}</td>
                          <td className="py-3">{result.title}</td>
                          <td className="py-3 text-center">{result.credits}</td>
                          <td className="py-3 text-center">{result.score}</td>
                          <td className="py-3 text-center">
                            <Badge 
                              variant={result.grade.startsWith('A') ? 'default' : result.grade.startsWith('B') ? 'secondary' : 'outline'}
                            >
                              {result.grade}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 pt-4 border-t">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-sm text-gray-600">Total Credits: </span>
                      <span className="font-semibold">{results.reduce((sum, r) => sum + r.credits, 0)}</span>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Semester GPA: </span>
                      <span className="font-semibold text-green-600">{calculateGPA(results)}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
};

export default Results;
