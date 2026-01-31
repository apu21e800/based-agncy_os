import { useMemo, useState } from 'react';
import { MenuItem } from '../state/menuConfig';

export interface CartEntry {
  id: string;
  item: MenuItem;
  quantity: number;
  totalPrice: number;
}

export function useCart() {
  const [items, setItems] = useState<CartEntry[]>([]);

  const addItem = (item: MenuItem, quantity: number, totalPrice: number) => {
    setItems((prev) => [...prev, { id: crypto.randomUUID(), item, quantity, totalPrice }]);
  };

  const count = useMemo(() => items.reduce((sum, entry) => sum + entry.quantity, 0), [items]);

  return { items, count, addItem };
}
