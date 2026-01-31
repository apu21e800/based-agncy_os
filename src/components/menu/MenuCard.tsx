import { memo } from 'react';
import clsx from 'classnames';
import { Clock, Flame, Leaf, WheatOff, Droplet, ShieldCheck, Plus } from 'lucide-react';
import { MenuConfig, MenuItem } from '../../state/menuConfig';

interface MenuCardProps {
  item: MenuItem;
  settings: MenuConfig['menuDisplay'];
  theme: MenuConfig['theme'];
  onClick: () => void;
  onQuickAdd: () => void;
}

const densityClasses = {
  compact: {
    padding: 'p-3',
    title: 'text-base',
    description: 'text-xs',
    button: 'h-11 text-xs',
  },
  comfortable: {
    padding: 'p-4',
    title: 'text-lg',
    description: 'text-sm',
    button: 'h-11 text-sm',
  },
  spacious: {
    padding: 'p-5',
    title: 'text-xl',
    description: 'text-[15px]',
    button: 'h-12 text-sm',
  }
};

const badgeStyles: Record<string, string> = {
  popular: 'bg-gradient-to-r from-purple-500 to-cyan-500 text-white',
  new: 'bg-red-600 text-white',
  spicy: 'bg-orange-600 text-white',
  custom: 'bg-slate-900 text-white'
};

function getAspectRatio(ratio: MenuConfig['menuDisplay']['imageAspectRatio']) {
  if (ratio === 'square') return '1 / 1';
  if (ratio === 'portrait') return '4 / 5';
  return '16 / 9';
}

function getDietaryIcon(type: string) {
  switch (type) {
    case 'vegan':
    case 'vegetarian':
      return Leaf;
    case 'gluten-free':
      return WheatOff;
    case 'dairy-free':
      return Droplet;
    case 'nut-free':
      return ShieldCheck;
    default:
      return Leaf;
  }
}

export const MenuCard = memo(function MenuCard({ item, settings, theme, onClick, onQuickAdd }: MenuCardProps) {
  const density = densityClasses[settings.density];
  const showImage = settings.imageAspectRatio !== 'none' && Boolean(item.image);
  const cardBase = clsx(
    'group relative overflow-hidden transition-all duration-200 focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
    {
      'bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)] hover:scale-[1.02]':
        settings.cardStyle === 'elevated',
      'bg-[#F9FAFB] shadow-none hover:bg-[#F3F4F6]': settings.cardStyle === 'flat',
      'bg-white border border-[#E5E7EB] shadow-none hover:border-[#D1D5DB] hover:shadow-[0_2px_8px_rgba(0,0,0,0.06)]':
        settings.cardStyle === 'outlined',
      'bg-transparent shadow-none border border-transparent hover:bg-black/5': settings.cardStyle === 'minimal'
    }
  );

  const cardStyle = {
    borderRadius: theme.borderRadius,
    backgroundColor:
      settings.cardStyle === 'minimal'
        ? 'transparent'
        : settings.cardStyle === 'flat'
        ? '#F9FAFB'
        : theme.cardBackground,
    borderColor: settings.cardStyle === 'outlined' ? theme.cardBorder : undefined
  } as const;

  const content = (
    <div className={clsx('relative z-10 flex h-full flex-col', density.padding)}>
      <div className="mb-2 flex flex-wrap gap-1.5">
        {settings.showBadges &&
          item.badges?.map((badge) => (
            <span
              key={badge.label}
              className={clsx(
                'inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold',
                badgeStyles[badge.type] ?? badgeStyles.custom
              )}
              style={badge.color ? { background: badge.color, color: '#fff' } : undefined}
            >
              {badge.icon && <span>{badge.icon}</span>}
              {badge.label}
            </span>
          ))}
      </div>
      <h3 className={clsx(density.title, 'font-semibold')} style={{ color: theme.textPrimary }}>
        {item.name}
      </h3>
      {settings.descriptionDisplay !== 'hidden' && (
        <p
          className={clsx(density.description, 'mt-1 leading-relaxed', settings.descriptionDisplay === 'truncated' && 'line-clamp-2')}
          style={{ color: theme.textSecondary }}
        >
          {item.description}
        </p>
      )}
      {(settings.showDietaryIcons || settings.showPrepTime || settings.showCalories) && (
        <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-slate-600">
          {settings.showDietaryIcons &&
            item.dietary?.map((tag) => {
              const Icon = getDietaryIcon(tag.type);
              return (
                <span key={tag.label} className="inline-flex items-center gap-1">
                  <Icon className="h-4 w-4 text-slate-500" aria-hidden="true" />
                  {tag.label}
                </span>
              );
            })}
          {settings.showPrepTime && item.prepTime && (
            <span className="inline-flex items-center gap-1">
              <Clock className="h-4 w-4 text-slate-500" aria-hidden="true" />
              {item.prepTime}m
            </span>
          )}
          {settings.showCalories && item.calories && (
            <span className="inline-flex items-center gap-1">
              <Flame className="h-4 w-4 text-slate-500" aria-hidden="true" />
              {item.calories} cal
            </span>
          )}
        </div>
      )}
      <div className="mt-4 flex items-center justify-between">
        <span className="text-lg font-bold" style={{ color: theme.textPrimary }}>
          {item.price}
        </span>
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onQuickAdd();
          }}
          className={clsx(
            'inline-flex items-center gap-2 rounded-lg px-4 text-white shadow-sm transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
            density.button
          )}
          style={{
            background: `linear-gradient(135deg, ${theme.primaryGradient.start} 0%, ${theme.primaryGradient.end} 100%)`
          }}
          aria-label={`Quick add ${item.name}`}
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
          Add
        </button>
      </div>
    </div>
  );

  if (settings.imagePosition === 'background' && showImage) {
    return (
      <article
        onClick={onClick}
        className={clsx(cardBase, 'min-h-[240px] cursor-pointer text-white')}
        style={cardStyle}
        role="button"
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            onClick();
          }
        }}
      >
        <div className="absolute inset-0">
          <img src={item.image} alt={item.name} className="h-full w-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        </div>
        <div className={clsx(density.padding, 'relative z-10 flex h-full flex-col justify-end')}>
          <div className="mb-2 flex flex-wrap gap-1.5">
            {settings.showBadges &&
              item.badges?.map((badge) => (
                <span key={badge.label} className="inline-flex items-center gap-1 rounded-full bg-white/20 px-2.5 py-1 text-[11px] font-semibold">
                  {badge.label}
                </span>
              ))}
          </div>
          <h3 className={clsx(density.title, 'font-semibold text-white')}>{item.name}</h3>
          {settings.descriptionDisplay !== 'hidden' && (
            <p
              className={clsx(
                density.description,
                'mt-1 text-white/80',
                settings.descriptionDisplay === 'truncated' && 'line-clamp-2'
              )}
            >
              {item.description}
            </p>
          )}
          <div className="mt-4 flex items-center justify-between">
            <span className="text-lg font-bold text-white">{item.price}</span>
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                onQuickAdd();
              }}
              className={clsx(
                'inline-flex items-center gap-2 rounded-lg px-4 text-white shadow-sm transition-all',
                density.button
              )}
              style={{
                background: `linear-gradient(135deg, ${theme.primaryGradient.start} 0%, ${theme.primaryGradient.end} 100%)`
              }}
              aria-label={`Quick add ${item.name}`}
            >
              <Plus className="h-4 w-4" aria-hidden="true" />
              Add
            </button>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article
      onClick={onClick}
      className={clsx(cardBase, 'cursor-pointer')}
      style={cardStyle}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onClick();
        }
      }}
    >
      {settings.imagePosition === 'top' && showImage && (
        <div className="relative w-full overflow-hidden" style={{ aspectRatio: getAspectRatio(settings.imageAspectRatio) }}>
          <img src={item.image} alt={item.name} className="h-full w-full object-cover" loading="lazy" />
        </div>
      )}
      {settings.imagePosition !== 'top' ? (
        <div className={clsx('flex h-full', settings.imagePosition === 'right' && 'flex-row-reverse')}>
          {showImage && (
            <div className="relative h-full w-[120px] flex-shrink-0 overflow-hidden">
              <img src={item.image} alt={item.name} className="h-full w-full object-cover" loading="lazy" />
            </div>
          )}
          {content}
        </div>
      ) : (
        content
      )}
    </article>
  );
});
