'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Masonry from 'react-masonry-css';

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
}

export default function GalleryPage() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [isModalImageLoading, setIsModalImageLoading] = useState(false);

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

  return (
    <div className="container px-4 py-8 mx-auto">
      <h1 className="mb-8 text-3xl font-bold text-base-content">갤러리</h1>
      
      {isLoading ? (
        <div className="flex justify-center items-center min-h-[200px]">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : (
        <Masonry
          breakpointCols={breakpointColumns}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {photos.map((photo) => (
            <div 
              key={photo.id} 
              className="mb-4 overflow-hidden transition-all duration-300 rounded-lg shadow-lg hover:shadow-xl cursor-pointer"
              onClick={() => setSelectedPhoto(photo)}
            >
              <div className="relative aspect-auto max-h-[600px] group">
                <Image
                  src={photo.thumbnailUrl}
                  alt={photo.title}
                  width={600}
                  height={600}
                  className="transition-transform duration-300 group-hover:scale-105 object-contain w-full h-full"
                  quality={95}
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSEkLzYxMC8vMTQ3PEFGODlLPTQ5RWFJTlNTVW9qanFXYWNqa2T/2wBDARUXFx4aHR4eHWRQOEBkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGT/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                />
                <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-black/50 group-hover:opacity-100">
                  <div className="flex flex-col items-center justify-center w-full h-full p-4">
                    <p className="text-lg font-semibold text-white mb-2">
                      {photo.title}
                    </p>
                    <p className="text-sm text-white/80">
                      {photo.uploadedAt}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Masonry>
      )}

      {/* 모달 */}
      {selectedPhoto && (
        <dialog className="modal modal-open">
          <div className="modal-box max-w-5xl max-h-[90vh] overflow-auto">
            <div className="relative w-full h-full flex items-center justify-center min-h-[200px]">
              {isModalImageLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-base-100/50">
                  <span className="loading loading-spinner loading-lg text-primary"></span>
                </div>
              )}
              <Image
                src={selectedPhoto.fullUrl}
                alt={selectedPhoto.title}
                width={1200}
                height={1200}
                className={`object-contain max-h-[80vh] w-auto h-auto transition-opacity duration-300 ${
                  isModalImageLoading ? 'opacity-0' : 'opacity-100'
                }`}
                quality={100}
                onLoadingComplete={() => setIsModalImageLoading(false)}
                onLoad={() => setIsModalImageLoading(false)}
                onLoadStart={() => setIsModalImageLoading(true)}
              />
            </div>
            <div className="mt-4 space-y-2">
              <h3 className="text-lg font-bold">{selectedPhoto.title}</h3>
              <p className="text-sm text-base-content/70">{selectedPhoto.uploadedAt}</p>
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
            <div className="modal-action">
              <button 
                className="btn" 
                onClick={() => {
                  setSelectedPhoto(null);
                  setIsModalImageLoading(false);
                }}
              >
                닫기
              </button>
            </div>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button onClick={() => {
              setSelectedPhoto(null);
              setIsModalImageLoading(false);
            }}>
              닫기
            </button>
          </form>
        </dialog>
      )}
    </div>
  );
} 