import { getGoogleDriveClient } from '@/utils/googleDrive';
import { NextRequest, NextResponse } from 'next/server';
import * as exifr from 'exifr';

export async function GET(
  request: NextRequest,
  { params }: { params: { imageId: string } }
) {
  try {
    const drive = getGoogleDriveClient();
    const response = await drive.files.get({
      fileId: params.imageId,
      alt: 'media',
      fields: '*'
    }, {
      responseType: 'arraybuffer'
    });

    const buffer = Buffer.from(response.data);
    
    // exifr을 사용하여 EXIF 데이터 파싱
    const exifData = await exifr.parse(buffer, {
      // 필요한 태그들만 지정
      pick: [
        'Make', 'Model', 'LensModel',
        'FocalLength', 'FNumber', 'ExposureTime',
        'ISO', 'DateTimeOriginal'
      ]
    });

    console.log('Found EXIF data:', exifData); // 디버깅용 로그

    if (exifData) {
      return NextResponse.json({
        camera: exifData.Make && exifData.Model 
          ? `${exifData.Make} ${exifData.Model}` 
          : '정보 없음',
        lens: exifData.LensModel || '정보 없음',
        focalLength: exifData.FocalLength 
          ? `${Math.round(exifData.FocalLength)}mm` 
          : '정보 없음',
        aperture: exifData.FNumber 
          ? `f/${exifData.FNumber.toFixed(1)}` 
          : '정보 없음',
        shutterSpeed: exifData.ExposureTime 
          ? `1/${Math.round(1/exifData.ExposureTime)}초` 
          : '정보 없음',
        iso: exifData.ISO || '정보 없음',
        takenAt: exifData.DateTimeOriginal 
          ? new Date(exifData.DateTimeOriginal).toLocaleString('ko-KR') 
          : '정보 없음'
      });
    }

    // EXIF 데이터를 찾지 못한 경우
    console.log('No EXIF data found in image');
    return NextResponse.json({
      camera: '정보 없음',
      lens: '정보 없음',
      focalLength: '정보 없음',
      aperture: '정보 없음',
      shutterSpeed: '정보 없음',
      iso: '정보 없음',
      takenAt: '정보 없음'
    });

  } catch (error) {
    console.error('Error reading EXIF data:', error);
    return NextResponse.json({ error: 'Failed to read EXIF data' }, { status: 500 });
  }
} 