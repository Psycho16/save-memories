'use client';

import { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { memoryStore } from '../../../stores/MemoryStore';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { ArrowLeftOutlined, CalendarOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import PhotoViewer from '../../../components/PhotoViewer';

interface EventPageProps {
  params: {
    id: string;
  };
}

const EventPage = observer(({ params }: EventPageProps) => {
  const router = useRouter();
  const [photoViewerOpen, setPhotoViewerOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  const event = memoryStore.events.find(e => e.id === params.id);

  useEffect(() => {
    if (!event) {
      router.push('/');
    }
  }, [event, router]);

  if (!event) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Событие не найдено</h1>
          <button
            onClick={() => router.push('/')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Вернуться на главную
          </button>
        </div>
      </div>
    );
  }

  const formatDate = (date: Date) => {
    return format(date, 'dd MMMM yyyy', { locale: ru });
  };

  const handlePhotoClick = (index: number) => {
    console.log('photoIndex 2', photoIndex)
    setPhotoIndex(index);
    setPhotoViewerOpen(true);
  };

  const handleDelete = () => {
    if (confirm('Вы уверены, что хотите удалить это событие?')) {
      memoryStore.deleteEvent(event.id);
      router.push('/');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gray-800 shadow-lg border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={() => router.push('/')}
                className="mr-4 text-gray-400 hover:text-white transition-colors"
              >
                <ArrowLeftOutlined style={{ fontSize: '24px' }} />
              </button>
              <h1 className="text-xl font-semibold text-white line-clamp-1">
                {event.title}
              </h1>
            </div>

            <button
              onClick={handleDelete}
              className="text-gray-400 hover:text-red-400 transition-colors p-2"
              title="Удалить событие"
            >
              <DeleteOutlined style={{ fontSize: '20px' }} />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Event Info */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8 border border-gray-700">
          <h2 className="text-3xl font-bold text-white mb-4">{event.title}</h2>

          <div className="flex items-center text-gray-400 mb-6">
            <CalendarOutlined style={{ fontSize: '20px' }} className="mr-3" />
            <span className="text-lg">{formatDate(event.date)}</span>
          </div>

          {event.description && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-white mb-2">Описание</h3>
              <p className="text-gray-300 leading-relaxed">{event.description}</p>
            </div>
          )}
        </div>

        {/* Photos */}
        {event.photos.length > 0 && (
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white">Фотографии</h3>
              <span className="text-gray-400">{event.photos.length} фото</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {event.photos.map((photo, index) => (
                <div key={index} className="relative group cursor-pointer" onClick={() => handlePhotoClick(index)}>
                  <img
                    src={photo}
                    alt={`Фото ${index + 1}`}
                    className="w-full h-64 object-cover rounded-lg transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all rounded-lg flex items-center justify-center">
                    <EyeOutlined style={{ fontSize: '32px', color: 'white', opacity: 0 }} className="group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Photo Viewer */}
        <PhotoViewer
          photos={event.photos}
          activeIndex={photoIndex}
          setPhotoIndex={setPhotoIndex}
          isOpen={photoViewerOpen}
          onClose={() => setPhotoViewerOpen(false)}
        />
      </main>
    </div>
  );
});

export default EventPage;
