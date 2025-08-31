'use client';

import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { memoryStore } from '../stores/MemoryStore';
import AddEventModal from '../components/AddEventModal';
import MemoryCard from '../components/MemoryCard';
import EmptyState from '../components/EmptyState';
import ClientOnly from '../components/ClientOnly';
import { PlusOutlined, HeartOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';

const HomePage = observer(() => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const handleDeleteEvent = (id: string) => {
    if (confirm('Вы уверены, что хотите удалить это событие?')) {
      memoryStore.deleteEvent(id);
    }
  };

  const handleViewEvent = (id: string) => {
    router.push(`/event/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gray-800 shadow-lg border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <HeartOutlined style={{ fontSize: '24px', color: '#EF4444' }} className="mr-3" />
              <h1 className="text-xl font-semibold text-white">
                Save Memories
              </h1>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <PlusOutlined style={{ fontSize: '20px' }} className="mr-2" />
              Добавить событие
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ClientOnly
          fallback={
            <div className="text-center py-12">
              <div className="animate-pulse">
                <div className="h-8 bg-gray-700 rounded mb-4 mx-auto w-64"></div>
                <div className="h-4 bg-gray-700 rounded mx-auto w-48"></div>
              </div>
            </div>
          }
        >
          {memoryStore.sortedEvents.length === 0 ? (
            <EmptyState onAddEvent={() => setIsModalOpen(true)} />
          ) : (
            <>
              {/* Stats */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-2">
                  Ваши воспоминания
                </h2>
                <p className="text-gray-400">
                  Всего событий: {memoryStore.events.length}
                </p>
              </div>

              {/* Events Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {memoryStore.sortedEvents.map((event) => (
                  <MemoryCard
                    key={event.id}
                    event={event}
                    onDelete={handleDeleteEvent}
                    onView={handleViewEvent}
                  />
                ))}
              </div>
            </>
          )}
        </ClientOnly>
      </main>

      {/* Modal */}
      <AddEventModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
});

export default HomePage;
