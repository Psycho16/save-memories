'use client';

import { observer } from 'mobx-react-lite';
import { MemoryEvent } from '../stores/MemoryStore';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { Calendar, Trash2, Image } from 'lucide-react';

interface MemoryCardProps {
  event: MemoryEvent;
  onDelete: (id: string) => void;
}

const MemoryCard = observer(({ event, onDelete }: MemoryCardProps) => {
  const formatDate = (date: Date) => {
    return format(date, 'dd MMMM yyyy', { locale: ru });
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {/* Photos */}
      <div className="relative">
        {event.photos.length > 0 ? (
          <div className="grid grid-cols-3 gap-1 p-1">
            {event.photos.slice(0, 3).map((photo, index) => (
              <div key={index} className="aspect-square overflow-hidden">
                <img
                  src={photo}
                  alt={`Фото ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="h-48 bg-gray-100 flex items-center justify-center">
            <div className="text-center text-gray-400">
              <Image size={48} className="mx-auto mb-2" />
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
          <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">
            {event.title}
          </h3>
          <button
            onClick={() => onDelete(event.id)}
            className="text-gray-400 hover:text-red-500 transition-colors p-1"
            title="Удалить событие"
          >
            <Trash2 size={16} />
          </button>
        </div>

        <div className="flex items-center text-gray-600 mb-3">
          <Calendar size={16} className="mr-2" />
          <span className="text-sm">{formatDate(event.date)}</span>
        </div>

        {event.description && (
          <p className="text-gray-600 text-sm line-clamp-3">
            {event.description}
          </p>
        )}
      </div>
    </div>
  );
});

export default MemoryCard;
