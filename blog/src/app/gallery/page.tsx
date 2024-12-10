'use client';

import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import Masonry from 'react-masonry-css';
import { FaImages, FaUpload, FaChevronDown, FaCalendarAlt, FaExpand, FaCompress } from 'react-icons/fa';

interface Photo {
  id: string;
  src: string;
  title: string;
  thumbnailUrl: string;
  fullUrl: string;
  createdTime: string;
  description?: string;
  tags?: string[];
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
}

export default function GalleryPage() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [isModalImageLoading, setIsModalImageLoading] = useState(false);
  const [modalImageUrl, setModalImageUrl] = useState<string | null>(null);
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const [expandedMonths, setExpandedMonths] = useState<string[]>(['current']);
  const [exifData, setExifData] = useState<ExifData | null>(null);
  const [showDateGroups, setShowDateGroups] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const breakpointColumns = {
    default: 4,
    1536: 3,
    1024: 2,
    640: 1
  };

  useEffect(() => {
    async function loadImages() {
      setIsLoading(true);
      try {
        const response = await fetch('/api/gallery/list');
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.details || 'Failed to fetch images');
        }
        const images = await response.json();
        setPhotos(images);
      } catch (error) {
        console.error('Error loading images:', error);
        alert('이미지를 불러오는데 실패했습니다. 잠시 후 다시 시도해주세요.');
      } finally {
        setIsLoading(false);
      }
    }

    loadImages();
  }, []);

  const handlePhotoClick = async (photo: Photo) => {
    setSelectedPhoto(photo);
    setIsModalImageLoading(true);
    setModalImageUrl(null);
    setExifData(null);

    try {
      const imageResponse = await fetch(`/api/gallery/${photo.id}`);
      if (!imageResponse.ok) throw new Error('Failed to load image');
      
      const imageBlob = await imageResponse.blob();
      const imageUrl = URL.createObjectURL(imageBlob);
      setModalImageUrl(imageUrl);

      const metadataResponse = await fetch(`/api/gallery/${photo.id}/metadata`);
      if (metadataResponse.ok) {
        const metadata = await metadataResponse.json();
        setExifData(metadata);
      }
    } catch (error) {
      console.error('Error loading image or metadata:', error);
      alert('이미지를 불러오는데 실패했습니다.');
    } finally {
      setIsModalImageLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      if (modalImageUrl) {
        URL.revokeObjectURL(modalImageUrl);
      }
    };
  }, [modalImageUrl]);

  // 사진들을 날짜별로 그룹화하는 함수
  const groupPhotosByDate = (photos: Photo[]) => {
    const groups = photos.reduce((acc, photo) => {
      const date = new Date(photo.takenAt);
      const dateKey = new Intl.DateTimeFormat('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }).format(date);

      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }
      acc[dateKey].push(photo);
      return acc;
    }, {} as Record<string, Photo[]>);

    // 날짜순으로 정렬
    return Object.entries(groups).sort((a, b) => {
      const dateA = new Date(a[1][0].takenAt);
      const dateB = new Date(b[1][0].takenAt);
      return dateB.getTime() - dateA.getTime();
    });
  };

  // 한달 이내의 사진만 필터링하는 함수
  const filterRecentPhotos = (photos: Photo[]) => {
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    
    return photos.filter(photo => 
      new Date(photo.takenAt) > oneMonthAgo
    );
  };

  // 사진들을 월별로 그룹화하는 함수
  const groupPhotosByMonth = (photos: Photo[]) => {
    const groups = photos.reduce((acc, photo) => {
      const date = new Date(photo.takenAt);
      const monthKey = `${date.getFullYear()}년 ${date.getMonth() + 1}월`;
      
      if (!acc[monthKey]) {
        acc[monthKey] = [];
      }
      acc[monthKey].push(photo);
      return acc;
    }, {} as Record<string, Photo[]>);

    // 월별로 정렬
    return Object.entries(groups).sort((a, b) => {
      const dateA = new Date(a[0].replace(/년 /, '-').replace(/월/, ''));
      const dateB = new Date(b[0].replace(/년 /, '-').replace(/월/, ''));
      return dateB.getTime() - dateA.getTime();
    });
  };

  // 표시할 사진 결정
  const displayedPhotos = useMemo(() => {
    const recentPhotos = filterRecentPhotos(photos);
    const olderPhotos = photos.filter(photo => 
      new Date(photo.takenAt) <= new Date(new Date().setMonth(new Date().getMonth() - 1))
    );

    const groupedOlderPhotos = groupPhotosByMonth(olderPhotos);
    
    return {
      recent: recentPhotos,
      older: groupedOlderPhotos
    };
  }, [photos]);

  const toggleMonth = (month: string) => {
    setExpandedMonths(prev => 
      prev.includes(month)
        ? prev.filter(m => m !== month)
        : [...prev, month]
    );
  };

  // 전체화면 토글 함수
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      // 전체화면으로 전환
      const modalElement = document.querySelector('.modal-box');
      if (modalElement) {
        modalElement.requestFullscreen();
        setIsFullscreen(true);
      }
    } else {
      // 전체화면 해제
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  // 전체화면 변경 감지
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <FaImages className="w-8 h-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold text-base-content">갤러리</h1>
          <h3 className="text-lg text-base-content/70">
            {showAllPhotos ? '모든 이미지' : '직접 촬영한 이미지'}
          </h3>
        </div>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center items-center min-h-[200px]">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : (
        <div className="space-y-12">
          {/* 최근 한달 사진 */}
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-base-content">최근 한달</h2>
              <button
                onClick={() => setShowDateGroups(!showDateGroups)}
                className="btn btn-sm btn-outline gap-2"
              >
                <FaCalendarAlt className="w-4 h-4" />
                {showDateGroups ? '날짜별 보기 해제' : '날짜별 보기'}
              </button>
            </div>

            {showDateGroups ? (
              // 날짜별로 그룹화된 보기
              <div className="space-y-8">
                {groupPhotosByDate(displayedPhotos.recent).map(([date, datePhotos]) => (
                  <div key={date} className="space-y-4">
                    <div className="flex items-center gap-4">
                      <h2 className="text-xl font-semibold text-primary">{date}</h2>
                      <div className="flex-1 border-b border-base-content/20"></div>
                    </div>
                    
                    <Masonry
                      breakpointCols={breakpointColumns}
                      className="my-masonry-grid"
                      columnClassName="my-masonry-grid_column"
                    >
                      {datePhotos.map((photo) => (
                        <div 
                          key={photo.id} 
                          className="mb-4 overflow-hidden transition-all duration-300 rounded-lg shadow-lg hover:shadow-xl cursor-pointer"
                          onClick={() => handlePhotoClick(photo)}
                        >
                          <div className="relative aspect-auto max-h-[600px] group">
                            <Image
                              src={photo.thumbnailUrl}
                              alt={photo.title}
                              width={200}
                              height={200}
                              loading="lazy"
                              className="transition-transform duration-300 group-hover:scale-105 object-contain w-full h-full"
                              quality={75}
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
                  </div>
                ))}
              </div>
            ) : (
              // 날짜 구분 없는 기본 보기
              <Masonry
                breakpointCols={breakpointColumns}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column"
              >
                {displayedPhotos.recent.map((photo) => (
                  <div 
                    key={photo.id} 
                    className="mb-4 overflow-hidden transition-all duration-300 rounded-lg shadow-lg hover:shadow-xl cursor-pointer"
                    onClick={() => handlePhotoClick(photo)}
                  >
                    <div className="relative aspect-auto max-h-[600px] group">
                      <Image
                        src={photo.thumbnailUrl}
                        alt={photo.title}
                        width={200}
                        height={200}
                        loading="lazy"
                        className="transition-transform duration-300 group-hover:scale-105 object-contain w-full h-full"
                        quality={75}
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
            )}
          </div>

          {/* 이전 사진들 (월별) */}
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-base-content">이전 사진</h2>
            {displayedPhotos.older.map(([month, monthPhotos]) => (
              <div key={month} className="space-y-4">
                <button
                  onClick={() => toggleMonth(month)}
                  className="flex items-center gap-4 w-full"
                >
                  <h3 className="text-xl font-semibold text-primary">{month}</h3>
                  <div className="flex-1 border-b border-base-content/20"></div>
                  <FaChevronDown
                    className={`w-4 h-4 transition-transform ${
                      expandedMonths.includes(month) ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                
                {expandedMonths.includes(month) && (
                  <Masonry
                    breakpointCols={breakpointColumns}
                    className="my-masonry-grid"
                    columnClassName="my-masonry-grid_column"
                  >
                    {monthPhotos.map((photo) => (
                      <div 
                        key={photo.id} 
                        className="mb-4 overflow-hidden transition-all duration-300 rounded-lg shadow-lg hover:shadow-xl cursor-pointer"
                        onClick={() => handlePhotoClick(photo)}
                      >
                        <div className="relative aspect-auto max-h-[600px] group">
                          <Image
                            src={photo.thumbnailUrl}
                            alt={photo.title}
                            width={200}
                            height={200}
                            loading="lazy"
                            className="transition-transform duration-300 group-hover:scale-105 object-contain w-full h-full"
                            quality={75}
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
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 모달 */}
      {selectedPhoto && (
        <dialog className="modal modal-open">
          <div className={`modal-box max-w-5xl max-h-[90vh] overflow-auto ${isFullscreen ? 'fixed inset-0 w-full h-full max-w-none max-h-none rounded-none' : ''}`}>
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
                  <Image
                    src={modalImageUrl}
                    alt={selectedPhoto.title}
                    width={1200}
                    height={1200}
                    className={`object-contain w-auto h-auto ${isFullscreen ? 'max-h-screen' : 'max-h-[80vh]'}`}
                    quality={100}
                  />
                )}
              </div>

              {/* 메타데이터 영역 */}
              <div className={`mt-4 space-y-4 ${isFullscreen ? 'bg-base-100/80 p-4 rounded-lg backdrop-blur' : ''}`}>
                <h3 className="text-lg font-bold">{selectedPhoto.title}</h3>
                
                {/* EXIF 데이터 표시 */}
                {exifData && (
                  <div className="grid grid-cols-2 gap-4 p-4 bg-base-200 rounded-lg text-sm">
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
                    </div>
                  </div>
                )}

                {/* 기존 태그와 설명 표시 유지 */}
                {selectedPhoto.description && (
                  <p className="text-base-content/80">{selectedPhoto.description}</p>
                )}
                {selectedPhoto.tags && selectedPhoto.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {selectedPhoto.tags.map((tag, index) => (
                      <span key={index} className="badge badge-primary">{tag}</span>
                    ))}
                  </div>
                )}
              </div>
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