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
  mode: 'desktop' | 'mobile';
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

export function MenuPreview({ config, selectedCategoryId, onSelectCategory, mode }: MenuPreviewProps) {
  const category = useMemo(
    () => config.categories.find((cat) => cat.id === selectedCategoryId) ?? config.categories[0],
    [config.categories, selectedCategoryId]
  );
  const cardStyle = getCardStyleForCategory(category, config);
  const columns = getColumnsForCategory(category, config);
  const items = withPlaceholder(category.items, cardStyle);

  const gridTemplate = mode === 'mobile' ? 'repeat(1, minmax(0, 1fr))' : `repeat(${columns}, minmax(0, 1fr))`;
  const frameClasses =
    mode === 'mobile'
      ? 'mx-auto max-w-sm rounded-[28px] border border-slate-200 bg-slate-100 p-4 shadow-medium'
      : 'rounded-3xl border border-slate-200 bg-white/70 p-4 shadow-subtle';

  return (
    <div className="flex h-full flex-col gap-4">
      <header className="flex items-start justify-between gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-orange-700">Live preview</p>
          <h2 className="text-xl font-bold text-slate-900">Bella Vista Restaurant</h2>
          <p className="text-sm text-slate-600">123 Elm Street · Mon-Sun 11am-10pm · Dine-in / Takeout</p>
        </div>
        <div className="flex flex-col items-end gap-1 text-right text-xs font-semibold text-slate-500">
          <span className="rounded-full bg-slate-100 px-3 py-1">
            {category.items.length === 0 ? 'Showing sample items' : 'Using your items'}
          </span>
          <span className="text-[11px] text-slate-400">{mode === 'mobile' ? 'Mobile frame' : 'Desktop canvas'}</span>
        </div>
      </header>

      <div className={frameClasses} style={{ backgroundColor: config.colors.previewBackground }}>
        <div className="flex flex-col gap-3 rounded-2xl bg-white/90 p-3 shadow-sm">
          <CategoryNav
            categories={config.categories}
            selectedId={category.id}
            onSelect={onSelectCategory}
            layout={config.navigationLayout}
            style={config.navigationStyle}
          />

          <div className="grid grid-cols-1 gap-3" style={{ gridTemplateColumns: gridTemplate }}>
            {items.map((item) => (
              <MenuItemCard
                key={item.id}
                item={{
                  ...item,
                  image:
                    item.image ??
                    'https://images.unsplash.com/photo-1499028344343-cd173ffc68a9?auto=format&fit=crop&w=800&q=80'
                }}
                style={cardStyle}
                theme={config.colors}
                shadow={config.shadow}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
