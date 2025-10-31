
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/common/Card';
import { useAuth } from '../../hooks/useAuth';
import { getStudentTimetable } from '../../services/firebase';
import { TimetableSlot } from '../../types';

const Timetable: React.FC = () => {
  const { user } = useAuth();
  const [timetable, setTimetable] = useState<TimetableSlot[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      getStudentTimetable(user.userId).then(data => {
        setTimetable(data);
        setLoading(false);
      });
    }
  }, [user]);

  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const timetableByDay = daysOfWeek.map((_, index) => 
    timetable
      .filter(slot => slot.dayOfWeek === index)
      .sort((a, b) => a.startTime.localeCompare(b.startTime))
  );

  if (loading) return <div>Loading timetable...</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Weekly Timetable</h1>
      
      {/* Mobile View */}
      <div className="md:hidden space-y-4">
        {daysOfWeek.slice(1, 6).map((day, dayIndex) => (
          timetableByDay[dayIndex + 1].length > 0 && (
            <Card key={day}>
              <CardHeader>
                <CardTitle>{day}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {timetableByDay[dayIndex + 1].map(slot => (
                    <li key={slot.slotId} className="p-3 bg-gray-100 dark:bg-gray-800 rounded-md">
                      <p className="font-bold">{slot.subject}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{slot.startTime} - {slot.endTime}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-300">Room {slot.room} - {slot.teacher}</p>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )
        ))}
      </div>
      
      {/* Desktop View */}
      <div className="hidden md:block">
        <Card>
            <CardContent className="p-0">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-gray-100 dark:bg-gray-800">
                                {daysOfWeek.slice(1, 6).map(day => (
                                    <th key={day} className="p-4 text-center font-semibold border-b dark:border-gray-700">{day}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                {daysOfWeek.slice(1, 6).map((day, dayIndex) => (
                                    <td key={day} className="p-2 border-l border-r dark:border-gray-700 align-top" style={{minWidth: '150px'}}>
                                        <ul className="space-y-2">
                                            {timetableByDay[dayIndex + 1].map(slot => (
                                                <li key={slot.slotId} className="p-2 bg-blue-50 dark:bg-blue-900/40 rounded-md border border-blue-200 dark:border-blue-800">
                                                    <p className="font-bold text-blue-800 dark:text-blue-200">{slot.subject}</p>
                                                    <p className="text-xs text-gray-600 dark:text-gray-400">{slot.startTime} - {slot.endTime}</p>
                                                    <p className="text-xs text-gray-500 dark:text-gray-300">Room {slot.room}</p>
                                                </li>
                                            ))}
                                        </ul>
                                    </td>
                                ))}
                            </tr>
                        </tbody>
                    </table>
                </div>
            </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Timetable;
