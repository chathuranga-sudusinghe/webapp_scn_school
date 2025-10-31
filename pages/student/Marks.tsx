
import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '../../components/common/Card';
import { useAuth } from '../../hooks/useAuth';
import { getStudentMarks } from '../../services/firebase';
import { Mark } from '../../types';

interface MarksByExam {
  examName: string;
  marks: Mark[];
}

const StudentMarks: React.FC = () => {
  const { user } = useAuth();
  const [marksData, setMarksData] = useState<MarksByExam[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        try {
          setLoading(true);
          const data = await getStudentMarks(user.userId);
          setMarksData(data);
        } catch (error) {
          console.error("Failed to fetch marks data:", error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchData();
  }, [user]);

  if (loading) {
    return <div>Loading marks...</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">My Marks</h1>
      
      {marksData.length === 0 && (
        <Card>
          <CardContent>
            <p className="text-center py-8 text-gray-500">No marks have been published yet.</p>
          </CardContent>
        </Card>
      )}

      {marksData.map(({ examName, marks }) => (
        <Card key={examName}>
          <CardHeader>
            <CardTitle>{examName}</CardTitle>
            <CardDescription>
                Total Subjects: {marks.length} | Average Score: {(marks.reduce((sum, m) => sum + m.score, 0) / marks.length).toFixed(2)}%
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">Subject</th>
                    <th scope="col" className="px-6 py-3 text-center">Score</th>
                    <th scope="col" className="px-6 py-3 text-center">Grade</th>
                    <th scope="col" className="px-6 py-3">Teacher's Comment</th>
                  </tr>
                </thead>
                <tbody>
                  {marks.map((mark) => (
                    <tr key={mark.markId} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {mark.subject}
                      </th>
                      <td className="px-6 py-4 text-center">{mark.score} / 100</td>
                      <td className="px-6 py-4 text-center">
                        <span className="font-bold">{mark.gradeLetter}</span>
                      </td>
                      <td className="px-6 py-4">{mark.teacherComment || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StudentMarks;
