import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';

interface ScheduleSectionProps {
  content?: {
    title?: string;
    subtitle?: string;
    description?: string;
    formTitle?: string;
  };
}

export function ScheduleSection({ content }: ScheduleSectionProps) {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const defaultContent = {
    title: 'Schedule a Visit',
    subtitle: 'WE INVITE YOU TO COME and take a TEST DIP in one of our',
    description: 'beautiful HOT TUBS to see why one is right for YOUR HOME!',
    formTitle: 'Book a showroom visit - Fargo Store'
  };

  const data = { ...defaultContent, ...content };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Booking appointment:', { selectedDate, selectedTime });
  };

  const timeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'
  ];

  return (
    <section className="py-20 bg-primary-600 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl lg:text-4xl font-bold mb-6">{data.title}</h2>
        <p className="text-xl mb-4">{data.subtitle}</p>
        <p className="text-xl mb-8">{data.description}</p>
        
        <Card className="max-w-md mx-auto">
          <CardContent className="p-8">
            <h3 className="text-xl font-bold mb-6 text-primary-600">{data.formTitle}</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="text-left">
                <Label htmlFor="date" className="text-gray-700">Select Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="mt-2"
                  required
                />
              </div>
              
              <div className="text-left">
                <Label htmlFor="time" className="text-gray-700">Select Time</Label>
                <Select value={selectedTime} onValueChange={setSelectedTime}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Choose a time" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-primary-600 hover:bg-primary-700"
                disabled={!selectedDate || !selectedTime}
              >
                Book Appointment
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
