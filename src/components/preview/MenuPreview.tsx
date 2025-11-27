import { useMemo } from 'react';
import {
  CardStyle,
  MenuConfig,
  MenuItem,
  getCardStyleForCategory,
  getColumnsForCategory
} from '../../state/menuConfig';
import { CategoryNav } from './CategoryNav';
import { MenuItemCard } from './MenuItemCard';

interface MenuPreviewProps {
  config: MenuConfig;
  selectedCategoryId: string;
  onSelectCategory: (id: string) => void;
}

function withPlaceholder(items: MenuItem[], cardStyle: CardStyle): MenuItem[] {
  if (items.length > 0) return items;
  const base: MenuItem[] = [
    {
      id: 'placeholder-1',
      name: 'Sample Item',
      description: 'Add your real menu items to replace these.',
      price: '$12.00',
      tags: ['Sample'],
      allergens: [],
      isSample: true
    },
    {
      id: 'placeholder-2',
      name: 'Sample Item',
      description: 'Switch card styles to see layout options.',
      price: '$14.50',
      tags: ['Sample'],
      allergens: [],
      isSample: true
    }
  ];
  if (cardStyle === 'feature' || cardStyle === 'hero' || cardStyle === 'compact') {
    base[0].image =
      'https://images.unsplash.com/photo-1499028344343-cd173ffc68a9?auto=format&fit=crop&w=800&q=80';
    base[1].image =
      'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=800&q=80';
  }
  return base;
}

export function MenuPreview({ config, selectedCategoryId, onSelectCategory }: MenuPreviewProps) {
  const category = useMemo(
    () => config.categories.find((cat) => cat.id === selectedCategoryId) ?? config.categories[0],
    [config.categories, selectedCategoryId]
  );
  const cardStyle = getCardStyleForCategory(category, config);
  const columns = getColumnsForCategory(category, config);
  const items = withPlaceholder(category.items, cardStyle);

  const handleAdd = (id: string) => {
    // Front-end only affordance to imply ordering.
    // eslint-disable-next-line no-console
    console.log(`Add to order from preview: ${id}`);
  };

  return (
    <div
      className="flex h-full flex-col gap-4 rounded-3xl border border-slate-200 bg-gradient-to-b from-white/80 to-slate-50 p-5 shadow-medium"
      style={{ backgroundColor: config.colors.previewBackground }}
    >
      <header className="flex flex-col gap-3 rounded-2xl border border-slate-100 bg-white/90 p-4 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-orange-600">Live preview</p>
            <h2 className="text-2xl font-bold text-slate-900">Bella Vista · Ordering</h2>
            <p className="text-sm text-slate-600">Fast-casual favorites · 25–35 min · $1.99 delivery fee</p>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600">
            <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            {category.items.length === 0 ? 'Showing sample items' : 'Using your items'}
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <span className="rounded-full bg-orange-50 px-2 py-1 font-semibold text-orange-700">Step 2</span>
          <span>Pick a card style, tweak colors, and watch the preview respond.</span>
        </div>
      </header>

      <div className="rounded-2xl border border-slate-100 bg-white/90 p-3 shadow-subtle">
        <CategoryNav
          categories={config.categories}
          selectedId={category.id}
          onSelect={onSelectCategory}
          layout={config.navigationLayout}
          style={config.navigationStyle}
        />
      </div>

      <div
        className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
        style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
      >
        {items.map((item) => (
          <MenuItemCard
            key={item.id}
            item={{ ...item, image: item.image ?? 'https://images.unsplash.com/photo-1499028344343-cd173ffc68a9?auto=format&fit=crop&w=800&q=80' }}
            style={cardStyle}
            theme={config.colors}
            shadow={config.shadow}
            onAdd={handleAdd}
          />
        ))}
      </div>
    </div>
  );
}
