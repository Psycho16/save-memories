'use client';

import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { memoryStore } from '../stores/MemoryStore';
import AddEventModal from '../components/AddEventModal';
import MemoryCard from '../components/MemoryCard';
import EmptyState from '../components/EmptyState';
import { Plus, Heart } from 'lucide-react';

const HomePage = observer(() => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDeleteEvent = (id: string) => {
    if (confirm('Вы уверены, что хотите удалить это событие?')) {
      memoryStore.deleteEvent(id);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Heart className="text-red-500 mr-3" size={24} />
              <h1 className="text-xl font-semibold text-gray-800">
                Save Memories
              </h1>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus size={20} className="mr-2" />
              Добавить событие
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {memoryStore.sortedEvents.length === 0 ? (
          <EmptyState onAddEvent={() => setIsModalOpen(true)} />
        ) : (
          <>
            {/* Stats */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Ваши воспоминания
              </h2>
              <p className="text-gray-600">
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
                />
              ))}
            </div>
          </>
        )}
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
