import clsx from 'classnames';
import { CategoryConfig, NavigationLayout, NavigationStyle } from '../../state/menuConfig';

interface CategoryNavProps {
  categories: CategoryConfig[];
  selectedId: string;
  onSelect: (id: string) => void;
  layout: NavigationLayout;
  style: NavigationStyle;
}

export function CategoryNav({ categories, selectedId, onSelect, layout, style }: CategoryNavProps) {
  const buttonStyle = (active: boolean) =>
    clsx(
      'flex w-full items-center justify-between gap-2 rounded-full px-3 py-2 text-sm font-semibold transition-colors',
      style === 'filled' &&
        (active
          ? 'bg-orange-500 text-white shadow-subtle'
          : 'bg-white text-slate-700 border border-slate-200 hover:bg-orange-50'),
      style === 'outlined' &&
        (active
          ? 'border border-orange-500 bg-orange-50 text-orange-700'
          : 'border border-slate-200 bg-white text-slate-700 hover:border-orange-300'),
      style === 'ghost' && (active ? 'bg-orange-50 text-orange-700' : 'text-slate-700 hover:bg-slate-100')
    );

  return (
    <nav
      className={clsx(
        'flex gap-2 overflow-x-auto scrollbar-thin',
        layout === 'sidebar' ? 'flex-col pr-3' : 'flex-row'
      )}
    >
      {categories.map((cat) => (
        <button key={cat.id} className={buttonStyle(cat.id === selectedId)} onClick={() => onSelect(cat.id)}>
          <span>{cat.name}</span>
          <span className="text-xs font-medium text-slate-400">{cat.items.length}</span>
        </button>
      ))}
    </nav>
  );
}
