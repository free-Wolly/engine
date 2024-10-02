import { google } from 'googleapis';

export interface EventDetails {
  summary: string;
  location: string;
  description: string;
  start: {
    dateTime: string;
    timeZone: string;
  };
  end: {
    dateTime: string;
    timeZone: string;
  };
}

export async function createEvent(event: EventDetails) {
  const client = new google.auth.JWT({
    email: process.env.CALENDAR_CLIENT_EMAIL,
    key: process.env.CALENDAR_PRIVATE_KEY ? process.env.CALENDAR_PRIVATE_KEY.replace(/\\n/gm, '\n') : undefined,
    scopes: ['https://www.googleapis.com/auth/calendar.events'],
  });

  const calendar = google.calendar({ version: 'v3' });

  try {
    const res = await calendar.events.insert({
      calendarId: process.env.CALENDAR_ID,
      auth: client,
      requestBody: event,
    });

    return res.data;
  } catch (error) {
    console.error(error);
    throw new Error(`Could not create event: ${(error as any).message}`);
  }
}

export async function deleteEvent(eventId: string) {
  const client = new google.auth.JWT({
    email: process.env.CALENDAR_CLIENT_EMAIL,
    key: process.env.CALENDAR_PRIVATE_KEY ? process.env.CALENDAR_PRIVATE_KEY.replace(/\\n/gm, '\n') : undefined,
    scopes: ['https://www.googleapis.com/auth/calendar.events'],
  });

  const calendar = google.calendar({ version: 'v3' });

  console.log({eventId});

  try {
    await calendar.events.delete({
      calendarId: process.env.CALENDAR_ID,
      eventId: eventId,
      auth: client,
    });
    console.log(`Event with ID: ${eventId} deleted successfully.`);
  } catch (error) {
    console.log(error);
    throw new Error(`Could not delete event: ${(error as any).message}`);
  }
}
