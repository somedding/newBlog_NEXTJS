import CalendarWrapper from './CalendarWrapper';
import ContactPage from './page';

export default async function ContactLayout() {
  const calendarData = await CalendarWrapper();
  
  return <ContactPage calendarData={calendarData} />;
} 