'use client';

import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { MemoryEvent } from '../stores/MemoryStore';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { CalendarOutlined, DeleteOutlined, PictureOutlined, EyeOutlined } from '@ant-design/icons';
import PhotoViewer from './PhotoViewer';

interface MemoryCardProps {
  event: MemoryEvent;
  onDelete: (id: string) => void;
  onView: (id: string) => void;
}

const MemoryCard = observer(({ event, onDelete, onView }: MemoryCardProps) => {
  const [photoViewerOpen, setPhotoViewerOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  const formatDate = (date: Date) => {
    return format(date, 'dd MMMM yyyy', { locale: ru });
  };

  const handlePhotoClick = (index: number) => {
    setPhotoIndex(index);
    setPhotoViewerOpen(true);
  };

  return (
    <>
      <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow border border-gray-700">
        {/* Photos */}
        <div className="relative">
          {event.photos.length > 0 ? (
            <div className="grid grid-cols-3 gap-1 p-1">
              {event.photos.slice(0, 3).map((photo, index) => (
                <div key={index} className="aspect-square overflow-hidden relative group">
                  <img
                    src={photo}
                    alt={`Фото ${index + 1}`}
                    className="w-full h-full object-cover cursor-pointer transition-transform group-hover:scale-105"
                    onClick={() => handlePhotoClick(index)}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-center justify-center">
                    <EyeOutlined style={{ fontSize: '24px', color: 'white', opacity: 0 }} className="group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="h-48 bg-gray-700 flex items-center justify-center">
              <div className="text-center text-gray-400">
                <PictureOutlined style={{ fontSize: '48px' }} className="mx-auto mb-2" />
                <p>Нет фотографий</p>
              </div>
            </div>
          )}

          {/* Photo count badge */}
          {event.photos.length > 0 && (
            <div className="absolute top-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded-full text-xs">
              {event.photos.length} фото
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-lg font-semibold text-white line-clamp-2">
              {event.title}
            </h3>
            <div className="flex gap-2">
              <button
                onClick={() => onView(event.id)}
                className="text-gray-400 hover:text-blue-400 transition-colors p-1"
                title="Просмотреть событие"
              >
                <EyeOutlined style={{ fontSize: '16px' }} />
              </button>
              <button
                onClick={() => onDelete(event.id)}
                className="text-gray-400 hover:text-red-400 transition-colors p-1"
                title="Удалить событие"
              >
                <DeleteOutlined style={{ fontSize: '16px' }} />
              </button>
            </div>
          </div>

          <div className="flex items-center text-gray-400 mb-3">
            <CalendarOutlined style={{ fontSize: '16px' }} className="mr-2" />
            <span className="text-sm">{formatDate(event.date)}</span>
          </div>

          {event.description && (
            <p className="text-gray-300 text-sm line-clamp-3">
              {event.description}
            </p>
          )}
        </div>
      </div>

      {/* Photo Viewer */}
      <PhotoViewer
        photos={event.photos}
        initialIndex={photoIndex}
        isOpen={photoViewerOpen}
        onClose={() => setPhotoViewerOpen(false)}
      />
    </>
  );
});

export default MemoryCard;
