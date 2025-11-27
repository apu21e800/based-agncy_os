import clsx from 'classnames';

interface BadgePillProps {
  label: string;
  selected?: boolean;
  onToggle?: () => void;
  tone?: 'tag' | 'allergen';
}

export function BadgePill({ label, selected, onToggle, tone = 'tag' }: BadgePillProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={clsx(
        'inline-flex items-center rounded-full border px-3 py-1 text-sm transition-colors',
        selected
          ? 'border-accent/70 bg-accent/10 text-orange-700 shadow-sm'
          : 'border-slate-200 bg-white text-slate-700 hover:border-accent/40 hover:bg-orange-50',
        tone === 'allergen' && 'text-purple-700'
      )}
    >
      {label}
    </button>
  );
}
