import { useMemo, useState } from 'react';
import {
  CardStyle,
  CategoryConfig,
  MenuConfig,
  MenuItem,
  NavigationLayout,
  NavigationStyle,
  ShadowLevel,
  createEmptyCategory,
  createEmptyItem,
  defaultMenuConfig
} from '../state/menuConfig';

export interface MenuConfigActions {
  addCategory: (name: string) => void;
  removeCategory: (id: string) => void;
  addItem: (categoryId: string) => void;
  updateItem: (categoryId: string, item: MenuItem) => void;
  updateCategoryStyle: (categoryId: string, style: CardStyle) => void;
  updateCategoryColumns: (categoryId: string, columns: number) => void;
  updateNavigationLayout: (layout: NavigationLayout) => void;
  updateNavigationStyle: (style: NavigationStyle) => void;
  updateThemeColor: (key: keyof MenuConfig['colors'], value: string) => void;
  updateShadow: (shadow: ShadowLevel) => void;
  setDefaultStyle: (style: CardStyle) => void;
  setDefaultColumns: (columns: number) => void;
  toggleBadge: (categoryId: string, itemId: string, type: 'tags' | 'allergens', label: string) => void;
  updateMenuDisplay: <K extends keyof MenuConfig['menuDisplay']>(key: K, value: MenuConfig['menuDisplay'][K]) => void;
  updateNavigationSettings: <K extends keyof MenuConfig['navigationSettings']>(
    key: K,
    value: MenuConfig['navigationSettings'][K]
  ) => void;
  updateThemeSettings: <K extends keyof MenuConfig['theme']>(key: K, value: MenuConfig['theme'][K]) => void;
}

export function useMenuConfig(): [MenuConfig, MenuConfigActions] {
  const [config, setConfig] = useState<MenuConfig>(defaultMenuConfig);

  const actions = useMemo<MenuConfigActions>(
    () => ({
      addCategory: (name: string) => {
        setConfig((prev) => ({
          ...prev,
          categories: [...prev.categories, createEmptyCategory(name, crypto.randomUUID())]
        }));
      },
      removeCategory: (id: string) => {
        setConfig((prev) => ({
          ...prev,
          categories: prev.categories.filter((cat) => cat.id !== id)
        }));
      },
      addItem: (categoryId: string) => {
        setConfig((prev) => ({
          ...prev,
          categories: prev.categories.map((cat) =>
            cat.id === categoryId ? { ...cat, items: [...cat.items, createEmptyItem(crypto.randomUUID())] } : cat
          )
        }));
      },
      updateItem: (categoryId: string, item: MenuItem) => {
        setConfig((prev) => ({
          ...prev,
          categories: prev.categories.map((cat) => {
            if (cat.id !== categoryId) return cat;
            return {
              ...cat,
              items: cat.items.map((i) => (i.id === item.id ? item : i))
            };
          })
        }));
      },
      updateCategoryStyle: (categoryId: string, style: CardStyle) => {
        setConfig((prev) => ({
          ...prev,
          categories: prev.categories.map((cat) =>
            cat.id === categoryId ? { ...cat, cardStyleOverride: style } : cat
          )
        }));
      },
      updateCategoryColumns: (categoryId: string, columns: number) => {
        setConfig((prev) => ({
          ...prev,
          categories: prev.categories.map((cat) =>
            cat.id === categoryId ? { ...cat, columnsOverride: columns } : cat
          )
        }));
      },
      updateNavigationLayout: (layout: NavigationLayout) => {
        setConfig((prev) => ({
          ...prev,
          navigationLayout: layout,
          navigationSettings: {
            ...prev.navigationSettings,
            layout: layout === 'sidebar' ? 'sidebar' : 'top'
          }
        }));
      },
      updateNavigationStyle: (style: NavigationStyle) => {
        setConfig((prev) => ({
          ...prev,
          navigationStyle: style,
          navigationSettings: {
            ...prev.navigationSettings,
            style
          }
        }));
      },
      updateThemeColor: (key, value) => {
        setConfig((prev) => ({
          ...prev,
          colors: {
            ...prev.colors,
            [key]: value
          }
        }));
      },
      updateShadow: (shadow: ShadowLevel) => {
        setConfig((prev) => ({
          ...prev,
          shadow
        }));
      },
      setDefaultStyle: (style: CardStyle) => {
        setConfig((prev) => ({
          ...prev,
          cardStyleDefault: style
        }));
      },
      setDefaultColumns: (columns: number) => {
        setConfig((prev) => ({
          ...prev,
          columnsDefault: columns
        }));
      },
      toggleBadge: (categoryId, itemId, type, label) => {
        setConfig((prev) => ({
          ...prev,
          categories: prev.categories.map((cat) => {
            if (cat.id !== categoryId) return cat;
            return {
              ...cat,
              items: cat.items.map((i) => {
                if (i.id !== itemId) return i;
                const current = i[type];
                const exists = current.includes(label);
                return {
                  ...i,
                  [type]: exists ? current.filter((t) => t !== label) : [...current, label]
                };
              })
            };
          })
        }));
      },
      updateMenuDisplay: (key, value) => {
        setConfig((prev) => ({
          ...prev,
          menuDisplay: {
            ...prev.menuDisplay,
            [key]: value
          }
        }));
      },
      updateNavigationSettings: (key, value) => {
        setConfig((prev) => ({
          ...prev,
          navigationSettings: {
            ...prev.navigationSettings,
            [key]: value
          }
        }));
      },
      updateThemeSettings: (key, value) => {
        setConfig((prev) => ({
          ...prev,
          theme: {
            ...prev.theme,
            [key]: value
          }
        }));
      }
    }),
    []
  );

  return [config, actions];
}
