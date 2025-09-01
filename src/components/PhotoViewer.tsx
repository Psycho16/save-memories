'use client';

import { useState, SetStateAction, Dispatch } from 'react';
import { CloseOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';

interface PhotoViewerProps {
  photos: string[];
  setPhotoIndex: Dispatch<SetStateAction<number>>;
  activeIndex: number;
  isOpen: boolean;
  onClose: () => void;
}

const PhotoViewer = ({ photos, activeIndex, setPhotoIndex, isOpen, onClose }: PhotoViewerProps) => {
  // const [currentIndex, setCurrentIndex] = useState(initialIndex);

  if (!isOpen || photos.length === 0) return null;

  const goToPrevious = () => {
    setPhotoIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setPhotoIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowLeft') goToPrevious();
    if (e.key === 'ArrowRight') goToNext();
  };
  console.log('photoIndexcurrentIndex', activeIndex)
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div className="relative max-w-4xl max-h-full p-4">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 text-white hover:text-gray-300 transition-colors"
        >
          <CloseOutlined style={{ fontSize: '32px' }} />
        </button>

        {/* Navigation buttons */}
        {photos.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToPrevious();
              }}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 text-white hover:text-gray-300 transition-colors"
            >
              <LeftOutlined style={{ fontSize: '40px' }} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 text-white hover:text-gray-300 transition-colors"
            >
              <RightOutlined style={{ fontSize: '40px' }} />
            </button>
          </>
        )}

        {/* Photo */}
        <div
          className="flex items-center justify-center"
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={photos[activeIndex]}
            alt={`Фото ${activeIndex + 1}`}
            className="max-w-full max-h-[80vh] object-contain"
          />
        </div>

        {/* Photo counter */}
        {photos.length > 1 && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm">
            {activeIndex + 1} / {photos.length}
          </div>
        )}
      </div>
    </div>
  );
};

export default PhotoViewer;
