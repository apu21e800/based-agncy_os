import clsx from 'classnames';
import { CardStyle, ShadowLevel, ThemeConfig } from '../../state/menuConfig';
import { BadgePill } from '../common/BadgePill';

interface MenuItemCardProps {
  style: CardStyle;
  item: {
    id: string;
    name: string;
    description: string;
    price: string;
    image?: string;
    tags: string[];
    allergens: string[];
    isSample?: boolean;
  };
  theme: ThemeConfig;
  shadow: ShadowLevel;
}

const shadowClass: Record<ShadowLevel, string> = {
  off: 'shadow-none',
  subtle: 'shadow-subtle',
  medium: 'shadow-medium',
  strong: 'shadow-strong'
};

export function MenuItemCard({ style, item, theme, shadow }: MenuItemCardProps) {
  const baseCard = clsx(
    'flex h-full w-full gap-3 rounded-xl border border-slate-100 bg-white transition-shadow',
    shadowClass[shadow]
  );

  if (style === 'hero') {
    return (
      <article
        className={clsx(
          'relative overflow-hidden rounded-2xl text-white',
          shadowClass[shadow]
        )}
        style={{ backgroundColor: theme.cardBackground }}
      >
        <div className="absolute inset-0">
          <img src={item.image} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/10" />
        </div>
        <div className="relative flex h-full flex-col justify-end gap-2 p-6">
          <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-orange-200">
            <span>Hero</span>
            {item.isSample && <span className="rounded-full bg-white/20 px-2 py-0.5">Sample</span>}
          </div>
          <h3 className="text-2xl font-bold">{item.name}</h3>
          <p className="text-sm text-slate-100">{item.description}</p>
          <div className="flex items-center justify-between text-sm font-semibold">
            <div className="flex flex-wrap gap-2">
              {item.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-white/20 px-2 py-0.5">
                  {tag}
                </span>
              ))}
            </div>
            <span className="rounded-full bg-black/40 px-3 py-1">{item.price}</span>
          </div>
        </div>
      </article>
    );
  }

  if (style === 'feature') {
    return (
      <article className={clsx('flex h-full flex-col overflow-hidden rounded-xl border bg-white', shadowClass[shadow])}>
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          <img src={item.image} alt="" className="h-full w-full object-cover" />
          {item.isSample && (
            <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2 py-1 text-xs font-semibold text-orange-700">
              Sample
            </span>
          )}
        </div>
        <div className="flex flex-1 flex-col gap-3 p-4" style={{ backgroundColor: theme.cardBackground, color: theme.text }}>
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-lg font-semibold">{item.name}</h3>
              <p className="mt-1 text-sm text-slate-600">{item.description}</p>
            </div>
            <span className="rounded-full bg-orange-50 px-3 py-1 text-sm font-semibold text-orange-700">{item.price}</span>
          </div>
          <div className="flex flex-wrap gap-2 text-xs text-slate-500">
            {item.tags.map((tag) => (
              <BadgePill key={tag} label={tag} selected />
            ))}
            {item.allergens.map((tag) => (
              <BadgePill key={tag} label={tag} tone="allergen" selected />
            ))}
          </div>
        </div>
      </article>
    );
  }

  if (style === 'list') {
    return (
      <article className={clsx(baseCard, 'items-center justify-between p-4')} style={{ backgroundColor: theme.cardBackground }}>
        <div className="flex flex-1 flex-col gap-2">
          <h3 className="text-base font-semibold" style={{ color: theme.text }}>
            {item.name}
          </h3>
          <p className="text-sm text-slate-600">{item.description}</p>
          <div className="flex flex-wrap gap-2 text-xs text-slate-500">
            {item.tags.map((tag) => (
              <BadgePill key={tag} label={tag} selected />
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-800">{item.price}</span>
          {item.image && <img src={item.image} alt="" className="h-16 w-20 rounded-lg object-cover" />}
        </div>
      </article>
    );
  }

  return (
    <article className={clsx(baseCard, 'p-3 sm:p-4')} style={{ backgroundColor: theme.cardBackground }}>
      {item.image && <img src={item.image} alt="" className="h-20 w-24 rounded-lg object-cover" />}
      <div className="flex flex-1 flex-col gap-2">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-base font-semibold" style={{ color: theme.text }}>
              {item.name}
            </h3>
            <p className="text-sm text-slate-600">{item.description}</p>
          </div>
          <span className="rounded-full bg-orange-50 px-3 py-1 text-sm font-semibold text-orange-700">{item.price}</span>
        </div>
        <div className="flex flex-wrap gap-2 text-xs text-slate-500">
          {item.tags.map((tag) => (
            <BadgePill key={tag} label={tag} selected />
          ))}
          {item.allergens.map((tag) => (
            <BadgePill key={tag} label={tag} tone="allergen" selected />
          ))}
          {item.isSample && (
            <span className="rounded-full bg-slate-100 px-2 py-1 text-[11px] font-semibold text-slate-700">Sample</span>
          )}
        </div>
      </div>
    </article>
  );
}
