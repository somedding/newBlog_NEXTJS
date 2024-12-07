import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';

export interface FileMetadata {
  id: string;
  name: string;
  mimeType: string;
  size?: string;
}

let auth: OAuth2Client | null = null;

export function getGoogleDriveClient() {
  if (!auth) {
    auth = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    );

    auth.setCredentials({
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN
    });
  }

  return google.drive({ version: 'v3', auth });
}

export async function getFileMetadata(fileId: string): Promise<FileMetadata> {
  const drive = getGoogleDriveClient();
  const response = await drive.files.get({
    fileId,
    fields: 'id, name, mimeType, size'
  });

  if (!response.data) {
    throw new Error('File not found');
  }

  return response.data as FileMetadata;
} 