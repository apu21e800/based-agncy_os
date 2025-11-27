import { MenuItem } from './state/menuConfig';

export const sampleItems: MenuItem[] = [
  {
    id: 'sample-1',
    name: 'Smash Burger',
    description: 'Juicy double patty, melted cheddar, brioche bun, house pickles.',
    price: '$12.00',
    image: 'https://images.unsplash.com/photo-1606756790138-2530420702ce?auto=format&fit=crop&w=800&q=80',
    tags: ['Bestseller'],
    allergens: ['Gluten'],
    isSample: true
  },
  {
    id: 'sample-2',
    name: 'Citrus Crunch Salad',
    description: 'Mixed greens, roasted seeds, citrus vinaigrette, orange segments.',
    price: '$10.50',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80',
    tags: ['Vegan'],
    allergens: ['Seeds'],
    isSample: true
  },
  {
    id: 'sample-3',
    name: 'Slow-Braised Short Rib',
    description: 'Herb mash, roasted carrots, rich demi-glace, fresh herbs.',
    price: '$18.00',
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=800&q=80',
    tags: ['Comfort'],
    allergens: ['Gluten', 'Dairy'],
    isSample: true
  },
  {
    id: 'sample-4',
    name: 'Chili Crisp Dumplings',
    description: 'Pork + chive filling, black vinegar dip, crispy chili oil.',
    price: '$11.00',
    image: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=800&q=80',
    tags: ['Spicy'],
    allergens: ['Gluten'],
    isSample: true
  }
];
