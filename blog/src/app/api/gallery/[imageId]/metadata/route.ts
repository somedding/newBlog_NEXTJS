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
    
    // GPS 정보를 포함하여 EXIF 데이터 파싱
    const exifData = await exifr.parse(buffer, {
      pick: [
        'Make', 'Model', 'LensModel',
        'FocalLength', 'FNumber', 'ExposureTime',
        'ISO', 'DateTimeOriginal',
        'GPSLatitude', 'GPSLongitude', 'GPSLatitudeRef', 'GPSLongitudeRef'
      ]
    });

    // GPS 좌표를 주소로 변환하는 함수
    const getLocationString = async (lat: number, lng: number) => {
      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.GOOGLE_MAPS_API_KEY}&language=ko`
        );
        const data = await response.json();
        if (data.results && data.results[0]) {
          return data.results[0].formatted_address;
        }
        return '정보 없음';
      } catch (error) {
        console.error('Error getting location:', error);
        return '정보 없음';
      }
    };

    // GPS 정보가 있는 경우 위치 정보 가져오기
    let locationString = '정보 없음';
    if (exifData?.GPSLatitude && exifData?.GPSLongitude) {
      const lat = exifData.GPSLatitude * (exifData.GPSLatitudeRef === 'S' ? -1 : 1);
      const lng = exifData.GPSLongitude * (exifData.GPSLongitudeRef === 'W' ? -1 : 1);
      locationString = await getLocationString(lat, lng);
    }

    return NextResponse.json({
      camera: exifData?.Make && exifData?.Model 
        ? `${exifData.Make} ${exifData.Model}` 
        : '정보 없음',
      lens: exifData?.LensModel || '정보 없음',
      focalLength: exifData?.FocalLength 
        ? `${Math.round(exifData.FocalLength)}mm` 
        : '정보 없음',
      aperture: exifData?.FNumber 
        ? `f/${exifData.FNumber.toFixed(1)}` 
        : '정보 없음',
      shutterSpeed: exifData?.ExposureTime 
        ? `1/${Math.round(1/exifData.ExposureTime)}초` 
        : '정보 없음',
      iso: exifData?.ISO || '정보 없음',
      takenAt: exifData?.DateTimeOriginal 
        ? new Date(exifData.DateTimeOriginal).toLocaleString('ko-KR') 
        : '정보 없음',
      location: locationString
    });
  } catch (error) {
    console.error('Error reading EXIF data:', error);
    return NextResponse.json({ error: 'Failed to read EXIF data' }, { status: 500 });
  }
} 