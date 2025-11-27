import { sampleItems } from '../sampleData';

export type NavigationLayout = 'horizontal' | 'sidebar';
export type NavigationStyle = 'filled' | 'outlined' | 'ghost';
export type CardStyle = 'compact' | 'feature' | 'list' | 'hero';
export type ShadowLevel = 'off' | 'subtle' | 'medium' | 'strong';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  image?: string;
  tags: string[];
  allergens: string[];
  isSample?: boolean;
}

export interface CategoryConfig {
  id: string;
  name: string;
  cardStyleOverride?: CardStyle;
  columnsOverride?: number;
  items: MenuItem[];
}

export interface ThemeConfig {
  previewBackground: string;
  cardBackground: string;
  text: string;
  accent: string;
}

export interface MenuConfig {
  navigationLayout: NavigationLayout;
  navigationStyle: NavigationStyle;
  cardStyleDefault: CardStyle;
  columnsDefault: number;
  shadow: ShadowLevel;
  colors: ThemeConfig;
  categories: CategoryConfig[];
}

export const defaultMenuConfig: MenuConfig = {
  navigationLayout: 'horizontal',
  navigationStyle: 'filled',
  cardStyleDefault: 'compact',
  columnsDefault: 2,
  shadow: 'medium',
  colors: {
    previewBackground: '#f8fafc',
    cardBackground: '#ffffff',
    text: '#0f172a',
    accent: '#ef4444'
  },
  categories: [
    {
      id: 'cat-1',
      name: 'Starters',
      items: sampleItems
    }
  ]
};

export const badgePalette = {
  tags: ['Bestseller', 'Spicy', 'Vegan', 'Vegetarian', 'Gluten Free'],
  allergens: ['Dairy', 'Gluten', 'Nuts', 'Shellfish', 'Seeds']
};

export function createEmptyCategory(name: string, id: string): CategoryConfig {
  return {
    id,
    name,
    items: []
  };
}

export function createEmptyItem(id: string): MenuItem {
  return {
    id,
    name: 'New Item',
    description: '',
    price: '$0.00',
    tags: [],
    allergens: []
  };
}

export function getCardStyleForCategory(category: CategoryConfig, config: MenuConfig): CardStyle {
  return category.cardStyleOverride ?? config.cardStyleDefault;
}

export function getColumnsForCategory(category: CategoryConfig, config: MenuConfig): number {
  return category.columnsOverride ?? config.columnsDefault;
}
