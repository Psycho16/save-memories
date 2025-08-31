'use client';

import { PictureOutlined, PlusOutlined } from '@ant-design/icons';

interface EmptyStateProps {
  onAddEvent: () => void;
}

const EmptyState = ({ onAddEvent }: EmptyStateProps) => {
  return (
    <div className="text-center py-12">
      <div className="mx-auto w-24 h-24 bg-gray-700 rounded-full flex items-center justify-center mb-6">
        <PictureOutlined style={{ fontSize: '48px', color: '#9CA3AF' }} />
      </div>

      <h3 className="text-xl font-semibold text-white mb-2">
        Нет сохраненных воспоминаний
      </h3>

      <p className="text-gray-400 mb-8 max-w-md mx-auto">
        Начните сохранять свои воспоминания, добавив первое событие с фотографиями
      </p>

      <button
        onClick={onAddEvent}
        className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        <PlusOutlined style={{ fontSize: '20px' }} className="mr-2" />
        Добавить событие
      </button>
    </div>
  );
};

export default EmptyState;
