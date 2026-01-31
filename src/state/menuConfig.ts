export type NavigationLayout = 'horizontal' | 'sidebar';
export type NavigationStyle = 'filled' | 'outlined' | 'ghost';
export type CardStyle = 'compact' | 'feature' | 'list' | 'hero' | 'square' | 'rectangle';
export type ShadowLevel = 'off' | 'subtle' | 'medium' | 'strong';
export type GridColumns = '1' | '2' | '3' | 'auto';
export type GridGap = 'compact' | 'comfortable' | 'spacious';
export type CardStyleVariant = 'elevated' | 'flat' | 'outlined' | 'minimal';
export type ImageAspectRatio = 'square' | 'landscape' | 'portrait' | 'none';
export type ImagePosition = 'top' | 'left' | 'right' | 'background';
export type DescriptionDisplay = 'full' | 'truncated' | 'hidden';
export type ContentDensity = 'compact' | 'comfortable' | 'spacious';
export type NavigationLayoutSetting = 'top' | 'sidebar' | 'auto';
export type NavigationSpacing = 'compact' | 'comfortable' | 'spacious';
export type TypographyTransform = 'none' | 'uppercase';
export type TypographyWeight = 'medium' | 'semibold' | 'bold';
export type TypographySize = 'sm' | 'base' | 'lg';
export type ShadowElevation = 'none' | 'low' | 'medium' | 'high';

export interface FoodPairing {
  name: string;
  description: string;
}

export interface MenuBadge {
  type: 'popular' | 'new' | 'spicy' | 'custom';
  label: string;
  color?: string;
  icon?: string;
}

export interface DietaryTag {
  type: 'vegan' | 'vegetarian' | 'gluten-free' | 'dairy-free' | 'nut-free';
  label: string;
  icon?: string;
}

export interface ModifierOption {
  id: string;
  name: string;
  description?: string;
  price: number;
  default?: boolean;
}

export interface ModifierGroup {
  id: string;
  name: string;
  required: boolean;
  min?: number;
  max?: number;
  options: ModifierOption[];
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  image?: string;
  gallery?: string[];
  tags: string[];
  allergens: string[];
  foodPairings?: FoodPairing[];
  chefNotes?: string;
  ingredients?: string[];
  prepTime?: number;
  calories?: number;
  badges?: MenuBadge[];
  dietary?: DietaryTag[];
  modifierGroups?: ModifierGroup[];
  pairings?: MenuItem[];
  isSample?: boolean;
  isFeatured?: boolean;
  isChefFavorite?: boolean;
  isTopReviewed?: boolean;
  isMostPopular?: boolean;
  rating?: number;
  reviewCount?: number;
}

export interface ChefSpecial {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  courses: MenuItem[];
  price: string;
  image: string;
  availableUntil?: string;
}

export interface RestaurantInfo {
  name: string;
  tagline: string;
  cuisineTypes: string[];
  address: string;
  phone: string;
  email: string;
  hours: {
    [key: string]: string;
  };
  heroImage: string;
  story?: string;
}

export interface CategoryConfig {
  id: string;
  name: string;
  icon?: string;
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

export interface MenuDisplaySettings {
  columns: GridColumns;
  gap: GridGap;
  cardStyle: CardStyleVariant;
  imageAspectRatio: ImageAspectRatio;
  imagePosition: ImagePosition;
  density: ContentDensity;
  descriptionDisplay: DescriptionDisplay;
  showPrepTime: boolean;
  showDietaryIcons: boolean;
  showCalories: boolean;
  showBadges: boolean;
}

export interface NavigationSettings {
  layout: NavigationLayoutSetting;
  style: NavigationStyle;
  sticky: boolean;
  showIcons: boolean;
  showCounts: boolean;
  spacing: NavigationSpacing;
  typography: {
    size: TypographySize;
    weight: TypographyWeight;
    transform: TypographyTransform;
  };
}

export interface ThemeSettings {
  primaryGradient: { start: string; end: string };
  background: string;
  textPrimary: string;
  textSecondary: string;
  cardBackground: string;
  cardBorder: string;
  borderRadius: number;
  shadowElevation: ShadowElevation;
}

export interface MenuConfig {
  navigationLayout: NavigationLayout;
  navigationStyle: NavigationStyle;
  cardStyleDefault: CardStyle;
  columnsDefault: number;
  shadow: ShadowLevel;
  colors: ThemeConfig;
  menuDisplay: MenuDisplaySettings;
  navigationSettings: NavigationSettings;
  theme: ThemeSettings;
  categories: CategoryConfig[];
  restaurantInfo: RestaurantInfo;
  chefSpecials?: ChefSpecial[];
}

const defaultSizeModifiers: ModifierGroup[] = [
  {
    id: 'size',
    name: 'Choose Your Size',
    required: true,
    options: [
      { id: 'small', name: 'Small Plate (2 pieces)', price: 8.99 },
      { id: 'regular', name: 'Regular (3 pieces)', price: 12.99, default: true },
      { id: 'large', name: 'Large Platter (6 pieces)', price: 22.99 }
    ]
  }
];

const defaultExtraModifiers: ModifierGroup[] = [
  {
    id: 'extras',
    name: 'Add Extras',
    required: false,
    max: 3,
    options: [
      { id: 'olive-oil', name: 'Extra Virgin Olive Oil', price: 1.5 },
      { id: 'burrata', name: 'Burrata Cheese', price: 4 },
      { id: 'prosciutto', name: 'Prosciutto', price: 5 }
    ]
  }
];

const premiumMenuItems: MenuItem[] = [
  {
    id: 'truffle-flatbread',
    name: 'Truffle Mushroom Flatbread',
    description: 'House-made dough, black truffle oil, wild mushrooms, mozzarella, thyme.',
    price: '$18.00',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80'
    ],
    tags: ['Vegetarian', 'Chef\'s Favorite'],
    allergens: ['Gluten', 'Dairy'],
    prepTime: 12,
    calories: 620,
    badges: [
      { type: 'popular', label: 'Popular' },
      { type: 'new', label: 'New' }
    ],
    dietary: [{ type: 'vegetarian', label: 'Vegetarian' }],
    modifierGroups: [...defaultSizeModifiers, ...defaultExtraModifiers],
    pairings: [
      {
        id: 'caprese-salad',
        name: 'Caprese Salad',
        description: 'Heirloom tomatoes, basil, buffalo mozzarella.',
        price: '$8.99',
        image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=400&q=80',
        tags: ['Vegetarian'],
        allergens: ['Dairy']
      },
      {
        id: 'arancini-balls',
        name: 'Arancini Balls',
        description: 'Crispy saffron risotto, truffle aioli.',
        price: '$7.99',
        image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=400&q=80',
        tags: ['Popular'],
        allergens: ['Dairy', 'Gluten']
      },
      {
        id: 'pinot-grigio',
        name: 'Pinot Grigio',
        description: 'Crisp, floral white wine pairing.',
        price: '$12.00',
        image: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=400&q=80',
        tags: ['Wine'],
        allergens: []
      }
    ],
    ingredients: ['Pizza dough', 'Black truffle oil', 'Shiitake mushrooms', 'Oyster mushrooms', 'Mozzarella', 'Fresh thyme', 'Parmesan'],
    foodPairings: [
      { name: 'Pinot Noir', description: 'Earthy notes complement the truffle' },
      { name: 'Belgian Ale', description: 'Rich maltiness balances mushroom umami' }
    ],
    chefNotes: 'We source our truffles from Piedmont, Italy. The mushrooms are locally foraged daily.',
    isFeatured: true,
    isChefFavorite: true,
    rating: 4.8,
    reviewCount: 127
  },
  {
    id: 'crispy-calamari',
    name: 'Crispy Calamari',
    description: 'Served with spicy marinara and lemon aioli.',
    price: '$16.50',
    image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?auto=format&fit=crop&w=800&q=80'
    ],
    tags: ['Spicy', 'Popular'],
    allergens: ['Shellfish', 'Gluten'],
    prepTime: 8,
    calories: 480,
    badges: [{ type: 'popular', label: 'Popular' }, { type: 'spicy', label: 'Spicy' }],
    dietary: [{ type: 'dairy-free', label: 'Dairy-Free' }],
    modifierGroups: [...defaultSizeModifiers, ...defaultExtraModifiers],
    ingredients: ['Fresh squid', 'Semolina flour', 'San Marzano tomatoes', 'Calabrian chili', 'Lemon', 'Garlic aioli'],
    foodPairings: [
      { name: 'Prosecco', description: 'Crisp bubbles cut through the richness' },
      { name: 'Sauvignon Blanc', description: 'Bright acidity pairs with fried seafood' }
    ],
    isMostPopular: true,
    isTopReviewed: true,
    rating: 4.7,
    reviewCount: 203
  }
];

const mainCourseItems: MenuItem[] = [
  {
    id: 'pan-seared-salmon',
    name: 'Pan Seared Salmon',
    description: 'With quinoa and roasted vegetables.',
    price: '$28.00',
    image: 'https://images.unsplash.com/photo-1485921325833-c519f76c4927?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1485921325833-c519f76c4927?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=800&q=80'
    ],
    tags: ['Gluten Free', 'Healthy'],
    allergens: ['Fish'],
    prepTime: 18,
    calories: 540,
    badges: [{ type: 'popular', label: 'Popular' }],
    dietary: [{ type: 'gluten-free', label: 'Gluten-Free' }],
    ingredients: ['Atlantic salmon', 'Tri-color quinoa', 'Asparagus', 'Cherry tomatoes', 'Lemon herb butter'],
    foodPairings: [
      { name: 'Chardonnay', description: 'Buttery richness enhances the salmon' },
      { name: 'Pale Ale', description: 'Hoppy notes complement the char' }
    ],
    chefNotes: 'Our salmon is sustainably sourced from Norwegian fjords. We recommend medium-rare for optimal flavor.',
    isTopReviewed: true,
    rating: 4.9,
    reviewCount: 156
  },
  {
    id: 'wagyu-burger',
    name: 'Wagyu Burger',
    description: 'Brioche bun, aged cheddar, bacon jam.',
    price: '$24.00',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80'
    ],
    tags: ['Signature', 'Popular'],
    allergens: ['Gluten', 'Dairy'],
    prepTime: 15,
    calories: 780,
    badges: [{ type: 'popular', label: 'Popular' }],
    dietary: [{ type: 'nut-free', label: 'Nut-Free' }],
    ingredients: ['Wagyu beef', 'Brioche bun', '18-month aged cheddar', 'House bacon jam', 'Arugula', 'Truffle aioli'],
    foodPairings: [
      { name: 'Cabernet Sauvignon', description: 'Bold tannins match the rich beef' },
      { name: 'IPA', description: 'Strong hops cut through the fat' }
    ],
    chefNotes: 'Our Wagyu comes from a local farm using traditional Japanese feeding techniques.',
    isFeatured: true,
    isMostPopular: true,
    isChefFavorite: true,
    rating: 5.0,
    reviewCount: 342
  },
  {
    id: 'lobster-ravioli',
    name: 'Lobster Ravioli',
    description: 'Vodka sauce, fresh basil.',
    price: '$32.00',
    image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1587740908075-9ea9e34fada5?auto=format&fit=crop&w=800&q=80'
    ],
    tags: ['Premium', 'Chef\'s Favorite'],
    allergens: ['Shellfish', 'Gluten', 'Dairy'],
    prepTime: 16,
    calories: 640,
    badges: [{ type: 'new', label: 'New' }],
    dietary: [{ type: 'dairy-free', label: 'Dairy-Free' }],
    ingredients: ['Fresh pasta', 'Maine lobster', 'Tomato cream sauce', 'Vodka', 'Fresh basil', 'Parmesan'],
    foodPairings: [
      { name: 'Pinot Grigio', description: 'Light and crisp to complement shellfish' },
      { name: 'Champagne', description: 'Elegant pairing for luxurious lobster' }
    ],
    chefNotes: 'Pasta made fresh daily. Lobster is wild-caught from Maine waters.',
    isFeatured: true,
    isChefFavorite: true,
    rating: 4.8,
    reviewCount: 98
  }
];

const saladItems: MenuItem[] = [
  {
    id: 'caesar-salad',
    name: 'Caesar Salad',
    description: 'Romaine, parmesan, croutons.',
    price: '$14.00',
    image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&w=800&q=80',
    tags: ['Classic'],
    allergens: ['Gluten', 'Dairy', 'Eggs'],
    ingredients: ['Romaine hearts', 'Aged parmesan', 'House-made croutons', 'Caesar dressing', 'Anchovies'],
    foodPairings: [
      { name: 'Chardonnay', description: 'Creamy texture matches the dressing' }
    ]
  },
  {
    id: 'kale-quinoa',
    name: 'Kale & Quinoa',
    description: 'Lemon vinaigrette, almonds.',
    price: '$15.00',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80',
    tags: ['Vegan', 'Gluten Free', 'Healthy'],
    allergens: ['Nuts'],
    ingredients: ['Tuscan kale', 'Quinoa', 'Toasted almonds', 'Dried cranberries', 'Lemon vinaigrette'],
    foodPairings: [
      { name: 'Rosé', description: 'Light and refreshing pairing' }
    ],
    isTopReviewed: true,
    rating: 4.6,
    reviewCount: 89
  }
];

const dessertItems: MenuItem[] = [
  {
    id: 'tiramisu',
    name: 'Tiramisu',
    description: 'Classic Italian coffee-soaked layers.',
    price: '$10.00',
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1534353436294-0dbd4bdac845?auto=format&fit=crop&w=800&q=80'
    ],
    tags: ['Classic', 'Popular'],
    allergens: ['Gluten', 'Dairy', 'Eggs'],
    ingredients: ['Ladyfinger cookies', 'Mascarpone', 'Espresso', 'Cocoa powder', 'Marsala wine'],
    foodPairings: [
      { name: 'Espresso', description: 'Double down on the coffee notes' },
      { name: 'Vin Santo', description: 'Traditional Italian dessert wine' }
    ],
    isMostPopular: true,
    rating: 4.9,
    reviewCount: 178
  },
  {
    id: 'cheesecake',
    name: 'Cheesecake',
    description: 'New York style with berry compote.',
    price: '$12.00',
    image: 'https://images.unsplash.com/photo-1533134242820-3ea26d6f9f09?auto=format&fit=crop&w=800&q=80',
    tags: ['Signature'],
    allergens: ['Gluten', 'Dairy', 'Eggs'],
    ingredients: ['Cream cheese', 'Graham cracker crust', 'Fresh berries', 'Vanilla bean'],
    foodPairings: [
      { name: 'Late Harvest Riesling', description: 'Sweet wine complements the creamy dessert' }
    ],
    rating: 4.7,
    reviewCount: 134
  }
];

const restaurantInfo: RestaurantInfo = {
  name: 'Bella Vista Restaurant',
  tagline: 'Modern Italian Cuisine with a Creative Twist',
  cuisineTypes: ['Italian', 'Pasta', 'Pizza', 'Seafood'],
  address: '123 Elm Street, Downtown District',
  phone: '(555) 123-4567',
  email: 'reservations@bellavista.com',
  hours: {
    'Monday': '11:00 AM - 10:00 PM',
    'Tuesday': '11:00 AM - 10:00 PM',
    'Wednesday': '11:00 AM - 10:00 PM',
    'Thursday': '11:00 AM - 10:00 PM',
    'Friday': '11:00 AM - 11:00 PM',
    'Saturday': '10:00 AM - 11:00 PM',
    'Sunday': '10:00 AM - 9:00 PM'
  },
  heroImage: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1600&q=80',
  story: 'Since 2010, Bella Vista has been bringing authentic Italian flavors with a modern twist to our community. Our chefs craft each dish with locally-sourced ingredients and traditional techniques passed down through generations.'
};

const chefSpecials: ChefSpecial[] = [
  {
    id: 'tasting-menu',
    title: 'Chef\'s Tasting Menu',
    subtitle: '5-Course Culinary Journey',
    description: 'Experience our chef\'s finest creations in this carefully curated tasting menu. Each course is perfectly paired with premium wines.',
    price: '$95.00',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1600&q=80',
    availableUntil: 'Available Friday - Sunday',
    courses: [
      {
        id: 'course-1',
        name: 'Amuse-Bouche',
        description: 'Parmesan crisp with truffle cream',
        price: '',
        tags: [],
        allergens: ['Dairy', 'Gluten']
      },
      {
        id: 'course-2',
        name: 'Lobster Bisque',
        description: 'Cognac cream, herb oil',
        price: '',
        tags: [],
        allergens: ['Shellfish', 'Dairy']
      },
      {
        id: 'course-3',
        name: 'Seared Scallops',
        description: 'Cauliflower puree, crispy prosciutto',
        price: '',
        tags: [],
        allergens: ['Shellfish']
      },
      {
        id: 'course-4',
        name: 'Beef Tenderloin',
        description: 'Red wine reduction, truffle potato',
        price: '',
        tags: [],
        allergens: []
      },
      {
        id: 'course-5',
        name: 'Dark Chocolate Soufflé',
        description: 'Vanilla bean gelato',
        price: '',
        tags: [],
        allergens: ['Dairy', 'Eggs', 'Gluten']
      }
    ]
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
  menuDisplay: {
    columns: 'auto',
    gap: 'comfortable',
    cardStyle: 'elevated',
    imageAspectRatio: 'landscape',
    imagePosition: 'top',
    density: 'comfortable',
    descriptionDisplay: 'truncated',
    showPrepTime: true,
    showDietaryIcons: true,
    showCalories: true,
    showBadges: true
  },
  navigationSettings: {
    layout: 'auto',
    style: 'filled',
    sticky: true,
    showIcons: true,
    showCounts: true,
    spacing: 'comfortable',
    typography: {
      size: 'base',
      weight: 'semibold',
      transform: 'none'
    }
  },
  theme: {
    primaryGradient: { start: '#A855F7', end: '#06B6D4' },
    background: '#F8FAFC',
    textPrimary: '#111827',
    textSecondary: '#6B7280',
    cardBackground: '#FFFFFF',
    cardBorder: '#E5E7EB',
    borderRadius: 12,
    shadowElevation: 'medium'
  },
  restaurantInfo,
  chefSpecials,
  categories: [
    {
      id: 'popular',
      name: 'Popular Items',
      icon: '🔥',
      items: premiumMenuItems
    },
    {
      id: 'mains',
      name: 'Main Courses',
      icon: '🍖',
      items: mainCourseItems
    },
    {
      id: 'salads',
      name: 'Salads',
      icon: '🥗',
      items: saladItems
    },
    {
      id: 'desserts',
      name: 'Desserts',
      icon: '🍰',
      items: dessertItems
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
    allergens: [],
    badges: [],
    dietary: [],
    modifierGroups: []
  };
}

export function getCardStyleForCategory(category: CategoryConfig, config: MenuConfig): CardStyle {
  return category.cardStyleOverride ?? config.cardStyleDefault;
}

export function getColumnsForCategory(category: CategoryConfig, config: MenuConfig): number {
  return category.columnsOverride ?? config.columnsDefault;
}
