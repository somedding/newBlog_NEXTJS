import { google } from 'googleapis';

export function getGoogleDriveClient() {
  if (!process.env.GOOGLE_CLIENT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY || !process.env.GOOGLE_DRIVE_FOLDER_ID) {
    throw new Error('Missing required Google Drive configuration');
  }

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/drive.readonly'],
  });

  return google.drive({ version: 'v3', auth });
}

export async function getFileMetadata(fileId: string) {
  const drive = getGoogleDriveClient();
  const response = await drive.files.get({
    fileId,
    fields: 'id, name, mimeType, size',
  });
  return response.data;
} 