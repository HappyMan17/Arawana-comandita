/* eslint-disable max-len */
import { normalizePlate } from "./plateHelper";

function isValidDate(dateString: string) {
  // Try creating a new Date object with the given string
  if (dateString === '' || !dateString) return false;

  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    return false;
  }

  return date instanceof Date;
}

export const getInitTimer = (time: string): number | null => {
  if (isValidDate(time)) {
    // returns the difference between the time and the current time
    return new Date().getTime() - new Date(time).getTime() ;
  }
  return null;
};

export const normalizeTable = (table: any) => {
  return {
    ...table,
    commands: table.commands || [],
    plates: (table.plates || []).map((plate: any) => normalizePlate(plate)),
    total: table.total || 0,
    comments: table.comments || '',
    name: table.name || '',
  };
};

export type TableStatus = 'free' | 'occupied' | 'waiting';

// "Food delivered" can't be derived: handleFoodDelivered deletes the command
export const getTableStatus = (table: { plates?: unknown[]; commands?: unknown[] }): TableStatus => {
  if (table.commands && table.commands.length > 0) return 'waiting';
  if (table.plates && table.plates.length > 0) return 'occupied';
  return 'free';
};

export const tableStatusStyles: Record<TableStatus, { label: string; badge: string; ring: string }> = {
  free: { label: 'Free', badge: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300', ring: '' },
  occupied: { label: 'Occupied', badge: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300', ring: 'ring-2 ring-blue-500' },
  waiting: { label: 'Waiting for food', badge: 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300', ring: 'ring-2 ring-amber-500' },
};
