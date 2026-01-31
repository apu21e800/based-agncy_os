import clsx from 'classnames';
import { CardStyle, ShadowLevel, ThemeConfig } from '../../state/menuConfig';
import { BadgePill } from '../common/BadgePill';
import { Star, TrendingUp, ChefHat, Award } from 'lucide-react';

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
    isFeatured?: boolean;
    isChefFavorite?: boolean;
    isTopReviewed?: boolean;
    isMostPopular?: boolean;
    rating?: number;
    reviewCount?: number;
  };
  theme: ThemeConfig;
  shadow: ShadowLevel;
  onClick?: () => void;
}

const shadowClass: Record<ShadowLevel, string> = {
  off: 'shadow-none',
  subtle: 'shadow-subtle',
  medium: 'shadow-medium',
  strong: 'shadow-strong'
};

function PremiumPills({ item }: { item: MenuItemCardProps['item'] }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {item.isFeatured && (
        <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-semibold text-amber-700 border border-amber-200">
          <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
          Featured
        </span>
      )}
      {item.isChefFavorite && (
        <span className="inline-flex items-center gap-1 rounded-full bg-purple-50 px-2 py-0.5 text-[10px] font-semibold text-purple-700 border border-purple-200">
          <ChefHat className="h-3 w-3" />
          Chef's Favorite
        </span>
      )}
      {item.isTopReviewed && (
        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 border border-emerald-200">
          <Award className="h-3 w-3" />
          Top Reviewed
        </span>
      )}
      {item.isMostPopular && (
        <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-2 py-0.5 text-[10px] font-semibold text-rose-700 border border-rose-200">
          <TrendingUp className="h-3 w-3" />
          Most Popular
        </span>
      )}
    </div>
  );
}

function RatingDisplay({ rating, reviewCount }: { rating?: number; reviewCount?: number }) {
  if (!rating) return null;
  return (
    <div className="flex items-center gap-1 text-xs text-slate-600">
      <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
      <span className="font-semibold">{rating.toFixed(1)}</span>
      {reviewCount && <span className="text-slate-400">({reviewCount})</span>}
    </div>
  );
}

export function MenuItemCard({ style, item, theme, shadow, onClick }: MenuItemCardProps) {
  const baseCard = clsx(
    'flex h-full w-full gap-3 rounded-xl border border-slate-100 bg-white transition-all duration-200',
    shadowClass[shadow],
    onClick && 'cursor-pointer hover:shadow-lg hover:-translate-y-0.5'
  );

  if (style === 'hero') {
    return (
      <article
        onClick={onClick}
        className={clsx(
          'relative overflow-hidden rounded-2xl text-white min-h-[280px]',
          shadowClass[shadow],
          onClick && 'cursor-pointer hover:shadow-2xl transition-all duration-300'
        )}
        style={{ backgroundColor: theme.cardBackground }}
      >
        <div className="absolute inset-0">
          <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
        </div>
        <div className="relative flex h-full flex-col justify-end gap-3 p-6">
          <div className="flex items-center gap-2">
            <PremiumPills item={item} />
          </div>
          <div className="space-y-2">
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-2xl font-bold leading-tight">{item.name}</h3>
              <span className="rounded-full bg-white/20 backdrop-blur-sm px-3 py-1.5 text-base font-bold whitespace-nowrap">{item.price}</span>
            </div>
            <p className="text-sm text-slate-100 leading-relaxed">{item.description}</p>
          </div>
          <div className="flex items-center justify-between">
            <RatingDisplay rating={item.rating} reviewCount={item.reviewCount} />
            <div className="flex flex-wrap gap-1.5">
              {item.tags.slice(0, 2).map((tag) => (
                <span key={tag} className="rounded-full bg-white/15 backdrop-blur-sm px-2.5 py-1 text-xs font-medium">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </article>
    );
  }

  if (style === 'feature') {
    return (
      <article
        onClick={onClick}
        className={clsx('flex h-full flex-col overflow-hidden rounded-xl border bg-white', shadowClass[shadow], onClick && 'cursor-pointer hover:shadow-xl transition-all duration-200')}
      >
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          <img src={item.image} alt={item.name} className="h-full w-full object-cover transition-transform duration-300 hover:scale-105" />
          <div className="absolute left-3 top-3">
            <PremiumPills item={item} />
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-3 p-4" style={{ backgroundColor: theme.cardBackground, color: theme.text }}>
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold leading-tight">{item.name}</h3>
              <p className="mt-1.5 text-sm text-slate-600 line-clamp-2">{item.description}</p>
            </div>
            <span className="rounded-full bg-orange-50 px-3 py-1.5 text-sm font-bold text-orange-700 whitespace-nowrap">{item.price}</span>
          </div>
          <div className="flex items-center justify-between gap-2">
            <RatingDisplay rating={item.rating} reviewCount={item.reviewCount} />
            <div className="flex flex-wrap gap-1.5 justify-end">
              {item.tags.slice(0, 3).map((tag) => (
                <BadgePill key={tag} label={tag} selected />
              ))}
            </div>
          </div>
        </div>
      </article>
    );
  }

  if (style === 'square') {
    return (
      <article
        onClick={onClick}
        className={clsx('flex flex-col overflow-hidden rounded-xl border bg-white aspect-square', shadowClass[shadow], onClick && 'cursor-pointer hover:shadow-xl transition-all duration-200')}
      >
        <div className="relative h-2/3 w-full overflow-hidden">
          <img src={item.image} alt={item.name} className="h-full w-full object-cover transition-transform duration-300 hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="absolute bottom-3 left-3 right-3">
            <PremiumPills item={item} />
          </div>
        </div>
        <div className="flex flex-1 flex-col justify-between gap-2 p-3" style={{ backgroundColor: theme.cardBackground }}>
          <div>
            <h3 className="text-base font-bold leading-tight" style={{ color: theme.text }}>{item.name}</h3>
            <p className="mt-1 text-xs text-slate-600 line-clamp-1">{item.description}</p>
          </div>
          <div className="flex items-center justify-between">
            <RatingDisplay rating={item.rating} reviewCount={item.reviewCount} />
            <span className="rounded-full bg-orange-50 px-2.5 py-1 text-sm font-bold text-orange-700">{item.price}</span>
          </div>
        </div>
      </article>
    );
  }

  if (style === 'rectangle') {
    return (
      <article
        onClick={onClick}
        className={clsx('flex overflow-hidden rounded-xl border bg-white h-32', shadowClass[shadow], onClick && 'cursor-pointer hover:shadow-xl transition-all duration-200')}
      >
        <div className="relative w-32 flex-shrink-0 overflow-hidden">
          <img src={item.image} alt={item.name} className="h-full w-full object-cover transition-transform duration-300 hover:scale-105" />
        </div>
        <div className="flex flex-1 flex-col justify-between gap-2 p-3" style={{ backgroundColor: theme.cardBackground }}>
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-bold leading-tight" style={{ color: theme.text }}>{item.name}</h3>
              <p className="mt-1 text-xs text-slate-600 line-clamp-2">{item.description}</p>
            </div>
            <span className="rounded-full bg-orange-50 px-2.5 py-1 text-xs font-bold text-orange-700 whitespace-nowrap">{item.price}</span>
          </div>
          <div className="flex items-center justify-between gap-2">
            <PremiumPills item={item} />
            <RatingDisplay rating={item.rating} reviewCount={item.reviewCount} />
          </div>
        </div>
      </article>
    );
  }

  if (style === 'list') {
    return (
      <article onClick={onClick} className={clsx(baseCard, 'items-center justify-between p-4')} style={{ backgroundColor: theme.cardBackground }}>
        <div className="flex flex-1 flex-col gap-2.5 min-w-0">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <h3 className="text-base font-semibold leading-tight" style={{ color: theme.text }}>
                {item.name}
              </h3>
              <p className="mt-1 text-sm text-slate-600 line-clamp-2">{item.description}</p>
            </div>
            <span className="rounded-full bg-orange-50 px-3 py-1.5 text-sm font-bold text-orange-700 whitespace-nowrap">{item.price}</span>
          </div>
          <div className="flex items-center justify-between gap-2">
            <PremiumPills item={item} />
            <RatingDisplay rating={item.rating} reviewCount={item.reviewCount} />
          </div>
        </div>
        {item.image && (
          <div className="ml-4 flex-shrink-0">
            <img src={item.image} alt={item.name} className="h-20 w-24 rounded-lg object-cover transition-transform duration-200 hover:scale-105" />
          </div>
        )}
      </article>
    );
  }

  return (
    <article onClick={onClick} className={clsx(baseCard, 'p-3 sm:p-4')} style={{ backgroundColor: theme.cardBackground }}>
      {item.image && (
        <div className="flex-shrink-0">
          <img src={item.image} alt={item.name} className="h-20 w-24 rounded-lg object-cover transition-transform duration-200 hover:scale-105" />
        </div>
      )}
      <div className="flex flex-1 flex-col gap-2.5 min-w-0">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-semibold leading-tight" style={{ color: theme.text }}>
              {item.name}
            </h3>
            <p className="mt-1 text-sm text-slate-600 line-clamp-2">{item.description}</p>
          </div>
          <span className="rounded-full bg-orange-50 px-3 py-1.5 text-sm font-bold text-orange-700 whitespace-nowrap">{item.price}</span>
        </div>
        <div className="flex items-center justify-between gap-2">
          <PremiumPills item={item} />
          <RatingDisplay rating={item.rating} reviewCount={item.reviewCount} />
        </div>
      </div>
    </article>
  );
}
