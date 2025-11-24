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

const sampleItems: MenuItem[] = [
  {
    id: 'sample-1',
    name: 'Sample Burger',
    description: 'Juicy patty with cheddar, tomato, and house sauce.',
    price: '$12.00',
    image:
      'https://images.unsplash.com/photo-1606756790138-2530420702ce?auto=format&fit=crop&w=800&q=80',
    tags: ['Bestseller'],
    allergens: ['Gluten'],
    isSample: true
  },
  {
    id: 'sample-2',
    name: 'Sample Salad',
    description: 'Mixed greens, citrus vinaigrette, toasted seeds.',
    price: '$10.50',
    image:
      'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80',
    tags: ['Vegan'],
    allergens: ['Seeds'],
    isSample: true
  },
  {
    id: 'sample-3',
    name: 'Sample Pasta',
    description: 'Rigatoni with slow-cooked tomato basil sauce.',
    price: '$14.00',
    image:
      'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=800&q=80',
    tags: ['Classic'],
    allergens: ['Gluten', 'Dairy'],
    isSample: true
  }
];

export const defaultMenuConfig: MenuConfig = {
  navigationLayout: 'horizontal',
  navigationStyle: 'filled',
  cardStyleDefault: 'compact',
  columnsDefault: 2,
  shadow: 'subtle',
  colors: {
    previewBackground: '#f3f4f6',
    cardBackground: '#ffffff',
    text: '#0f172a',
    accent: '#f97316'
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
