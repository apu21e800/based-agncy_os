import clsx from 'classnames';
import { ShadowLevel } from '../../state/menuConfig';

const shadowCopy: Record<ShadowLevel, string> = {
  off: 'No shadow',
  subtle: 'Subtle',
  medium: 'Medium',
  strong: 'Strong'
};

interface ShadowSelectorProps {
  value: ShadowLevel;
  onChange: (value: ShadowLevel) => void;
}

export function ShadowSelector({ value, onChange }: ShadowSelectorProps) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {Object.entries(shadowCopy).map(([key, label]) => {
        const shadowKey = key as ShadowLevel;
        return (
          <button
            key={key}
            type="button"
            onClick={() => onChange(shadowKey)}
            className={clsx(
              'rounded-lg border px-3 py-2 text-left text-sm transition-all',
              value === shadowKey
                ? 'border-accent/70 bg-orange-50 text-orange-800 shadow-sm'
                : 'border-slate-200 bg-white text-slate-700 hover:border-accent/40'
            )}
          >
            <div
              className={clsx(
                'mb-2 h-10 rounded-md bg-white',
                shadowKey === 'off' && 'shadow-none',
                shadowKey === 'subtle' && 'shadow-subtle',
                shadowKey === 'medium' && 'shadow-medium',
                shadowKey === 'strong' && 'shadow-strong'
              )}
            />
            {label}
          </button>
        );
      })}
    </div>
  );
}
