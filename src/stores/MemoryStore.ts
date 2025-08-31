import { makeAutoObservable } from 'mobx';

export interface MemoryEvent {
  id: string;
  title: string;
  date: Date;
  description?: string;
  photos: string[];
  createdAt: Date;
}

class MemoryStore {
  events: MemoryEvent[] = [];

  constructor() {
    makeAutoObservable(this);
    this.loadFromLocalStorage();
  }

  addEvent = (event: Omit<MemoryEvent, 'id' | 'createdAt'>) => {
    const newEvent: MemoryEvent = {
      ...event,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    this.events.push(newEvent);
    this.saveToLocalStorage();
  };

  deleteEvent = (id: string) => {
    this.events = this.events.filter(event => event.id !== id);
    this.saveToLocalStorage();
  };

  get sortedEvents() {
    return [...this.events].sort((a, b) => b.date.getTime() - a.date.getTime());
  }

  private saveToLocalStorage = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('memoryEvents', JSON.stringify(this.events));
    }
  };

  private loadFromLocalStorage = () => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('memoryEvents');
      if (saved) {
        const parsed = JSON.parse(saved);
        this.events = parsed.map((event: any) => ({
          ...event,
          date: new Date(event.date),
          createdAt: new Date(event.createdAt),
        }));
      }
    }
  };
}

export const memoryStore = new MemoryStore();
