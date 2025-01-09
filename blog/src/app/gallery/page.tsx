'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import Masonry from 'react-masonry-css';
import { FaExpand, FaCompress } from 'react-icons/fa';

interface Photo {
  id: string;
  src: string;
  title: string;
  thumbnailUrl: string;
  fullUrl: string;
  createdTime: string;
  description: string;
  tags: string[];
  uploadedAt: string;
  modifiedTime: string;
  takenAt: string;
}

interface ExifData {
  camera: string;
  lens: string;
  focalLength: string;
  aperture: string;
  shutterSpeed: string;
  iso: string;
  takenAt: string;
  location: string;
}

const PHOTOS_PER_PAGE = 20;  // 한 번에 로드할 사진 수

export default function GalleryPage() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [modalImageUrl, setModalImageUrl] = useState<string | null>(null);
  const [isModalImageLoading, setIsModalImageLoading] = useState(false);
  const [exifData, setExifData] = useState<ExifData | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [pageToken, setPageToken] = useState<string | null>(null);  // pageToken 추가
  
  const observerTarget = useRef<HTMLDivElement>(null);

  const breakpointColumns = {
    default: 4,
    1536: 3,
    1024: 2,
    640: 1,
  };

  const loadPhotos = useCallback(async () => {
    if (isLoading || !hasMore) return;
    
    setIsLoading(true);
    try {
      const response = await fetch(`/api/gallery/list?${pageToken ? `pageToken=${pageToken}` : ''}&limit=${PHOTOS_PER_PAGE}`);
      const data = await response.json();
      
      if (!data || !data.images) {
        console.error('Invalid response format:', data);
        setHasMore(false);
        return;
      }

      const newPhotos: Photo[] = data.images.map((photo: any) => ({
        id: photo.id,
        src: photo.src,
        title: photo.title,
        thumbnailUrl: photo.thumbnailUrl,
        fullUrl: photo.fullUrl,
        createdTime: photo.createdTime,
        description: photo.description,
        tags: photo.tags,
        uploadedAt: photo.uploadedAt,
        modifiedTime: photo.modifiedTime,
        takenAt: photo.takenAt
      }));
      
      if (!data.nextPageToken) {
        setHasMore(false);
      } else {
        setPageToken(data.nextPageToken);
      }
      
      setPhotos(prev => [...prev, ...newPhotos]);
    } catch (error) {
      console.error('Error loading photos:', error);
      setHasMore(false);
    } finally {
      setIsLoading(false);
    }
  }, [hasMore, isLoading, pageToken]);

  // Intersection Observer 설정
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && hasMore && !isLoading) {
          loadPhotos();
        }
      },
      {
        root: null,
        rootMargin: '100px',  // 하단에서 100px 전에 로딩 시작
        threshold: 0.1
      }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [hasMore, isLoading, loadPhotos]);

  // 초기 로딩
  useEffect(() => {
    loadPhotos();
  }, [loadPhotos]);

  // 사진 클릭 핸들러
  const handlePhotoClick = async (photo: Photo) => {
    setSelectedPhoto(photo);
    setIsModalImageLoading(true);
    setModalImageUrl(null);
    setExifData(null);

    try {
      const [imageResponse, metadataResponse] = await Promise.all([
        fetch(`/api/gallery/${photo.id}`),
        fetch(`/api/gallery/${photo.id}/metadata`)
      ]);

      if (!imageResponse.ok) throw new Error('Failed to load image');
      
      const imageBlob = await imageResponse.blob();
      const imageUrl = URL.createObjectURL(imageBlob);
      setModalImageUrl(imageUrl);

      if (metadataResponse.ok) {
        const metadata = await metadataResponse.json();
        setExifData(metadata);
      }
    } catch (error) {
      console.error('Error loading image or metadata:', error);
    } finally {
      setIsModalImageLoading(false);
    }
  };

  // 전체화면 토글
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      const imageElement = document.querySelector('.modal-image');
      if (imageElement) {
        imageElement.requestFullscreen();
        setIsFullscreen(true);
      }
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  return (
    <div className="container px-4 py-8 mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-base-content">갤러리</h1>

      {/* 갤러리 그리드 */}
      <Masonry
        breakpointCols={breakpointColumns}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {photos.map((photo) => (
          <div 
            key={photo.id} 
            className="mb-4 overflow-hidden transition-all duration-300 rounded-lg shadow-lg hover:shadow-xl cursor-pointer"
            onClick={() => handlePhotoClick(photo)}
          >
            <div className="relative aspect-auto max-h-[600px] group">
              <Image
                src={photo.thumbnailUrl}
                alt={photo.title}
                width={600}
                height={600}
                className="transition-transform duration-300 group-hover:scale-105 object-contain w-full h-full"
                quality={85}
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSEkLzYxMC8vMTQ3PEFGODlLPTQ5RWFJTlNTVW9qanFXYWNqa2T/2wBDARUXFx4aHR4eHWRQOEBkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGT/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
              />
              <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-black/50 group-hover:opacity-100">
                <div className="flex flex-col items-center justify-center w-full h-full p-4">
                  <p className="text-lg font-semibold text-white mb-2">
                    {photo.title}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Masonry>

      {/* 로딩 인디케이터 & 관찰 대상 */}
      <div ref={observerTarget} className="h-10 flex items-center justify-center mt-4">
        {isLoading && <span className="loading loading-spinner loading-md"></span>}
      </div>

      {/* 모달 */}
      {selectedPhoto && (
        <dialog className="modal modal-open">
          <div className="modal-box max-w-5xl max-h-[90vh] overflow-auto">
            <div className="relative w-full h-full flex flex-col">
              {/* 상단 버튼 영역 */}
              <div className="absolute top-2 right-2 flex gap-2 z-10">
                <button
                  onClick={toggleFullscreen}
                  className="btn btn-circle btn-ghost"
                  title={isFullscreen ? '전체화면 나가기' : '전체화면으로 보기'}
                >
                  {isFullscreen ? (
                    <FaCompress className="w-5 h-5" />
                  ) : (
                    <FaExpand className="w-5 h-5" />
                  )}
                </button>
                <button 
                  className="btn btn-circle btn-ghost" 
                  onClick={() => {
                    if (isFullscreen) {
                      document.exitFullscreen();
                    }
                    setSelectedPhoto(null);
                    setModalImageUrl(null);
                    setIsModalImageLoading(false);
                  }}
                >
                  ✕
                </button>
              </div>

              {/* 이미지 영역 */}
              <div className="relative w-full flex-1 flex items-center justify-center min-h-[200px]">
                {isModalImageLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-base-100/50">
                    <span className="loading loading-spinner loading-lg text-primary"></span>
                  </div>
                )}
                {modalImageUrl && (
                  <div className="modal-image w-full h-full flex items-center justify-center">
                    <Image
                      src={modalImageUrl}
                      alt={selectedPhoto.title}
                      width={1200}
                      height={1200}
                      className="object-contain w-auto h-auto max-h-[100vh]"
                      quality={85}
                      priority
                      style={{ margin: 'auto' }}
                    />
                  </div>
                )}
              </div>

              {/* EXIF 데이터 표시 */}
              {exifData && (
                <div className="grid grid-cols-2 gap-4 p-4 bg-base-200 rounded-lg text-sm mt-4">
                  <div className="space-y-2">
                    <p><span className="font-semibold">카메라:</span> {exifData.camera}</p>
                    <p><span className="font-semibold">렌즈:</span> {exifData.lens}</p>
                    <p><span className="font-semibold">초점거리:</span> {exifData.focalLength}</p>
                  </div>
                  <div className="space-y-2">
                    <p><span className="font-semibold">조리개:</span> {exifData.aperture}</p>
                    <p><span className="font-semibold">셔터스피드:</span> {exifData.shutterSpeed}</p>
                    <p><span className="font-semibold">ISO:</span> {exifData.iso}</p>
                  </div>
                  <div className="col-span-2">
                    <p><span className="font-semibold">촬영일시:</span> {exifData.takenAt}</p>
                    <p><span className="font-semibold">촬영장소:</span> {exifData.location}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
          {!isFullscreen && (
            <form method="dialog" className="modal-backdrop">
              <button onClick={() => {
                setSelectedPhoto(null);
                setModalImageUrl(null);
                setIsModalImageLoading(false);
              }}>
                닫기
              </button>
            </form>
          )}
        </dialog>
      )}
    </div>
  );
} 