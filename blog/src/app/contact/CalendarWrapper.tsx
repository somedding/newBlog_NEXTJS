// 서버 컴포넌트
export const dynamic = 'force-dynamic';
export const revalidate = 30;

export default async function CalendarWrapper() {
  return {
    googleCalendarApiKey: process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_API_KEY,
    googleCalendarId: process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_ID,
  };
} 