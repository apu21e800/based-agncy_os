import { MenuConfig } from '../../state/menuConfig';
import { MenuConfigActions } from '../../hooks/useMenuConfig';
import { ColorPickerRow } from '../common/ColorPickerRow';
import { ShadowSelector } from '../common/ShadowSelector';

interface StyleEditorProps {
  config: MenuConfig;
  actions: MenuConfigActions;
}

export function StyleEditor({ config, actions }: StyleEditorProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Step 2 · Style Editor</h2>
            <p className="text-sm text-slate-600">These settings change how cards look, not what they say.</p>
          </div>
          <div className="rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-700">
            Visual only · Non-destructive
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <h3 className="text-base font-semibold text-slate-900">Navigation</h3>
          <p className="text-sm text-slate-600">Controls how category buttons look everywhere.</p>
          <div className="mt-3 flex flex-wrap gap-2 text-sm">
            {[{ value: 'horizontal', label: 'Top bar' }, { value: 'sidebar', label: 'Sidebar' }].map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => actions.updateNavigationLayout(option.value as MenuConfig['navigationLayout'])}
                className={`rounded-full border px-3 py-1 ${
                  config.navigationLayout === option.value
                    ? 'border-orange-500 bg-orange-50 text-orange-800'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-orange-300'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
          <div className="mt-3 flex flex-wrap gap-2 text-sm">
            {[{ value: 'filled', label: 'Filled' }, { value: 'outlined', label: 'Outlined' }, { value: 'ghost', label: 'Ghost' }].map(
              (option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => actions.updateNavigationStyle(option.value as MenuConfig['navigationStyle'])}
                  className={`rounded-full border px-3 py-1 ${
                    config.navigationStyle === option.value
                      ? 'border-orange-500 bg-orange-50 text-orange-800'
                      : 'border-slate-200 bg-white text-slate-700 hover:border-orange-300'
                  }`}
                >
                  {option.label}
                </button>
              )
            )}
          </div>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <h3 className="text-base font-semibold text-slate-900">Global Defaults</h3>
          <p className="text-sm text-slate-600">Set the starting point for new categories.</p>
          <div className="mt-3 flex flex-wrap gap-2 text-sm">
            {[{ value: 'compact', label: 'Compact' }, { value: 'feature', label: 'Feature' }, { value: 'list', label: 'List' }, { value: 'hero', label: 'Hero' }].map(
              (option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => actions.setDefaultStyle(option.value as MenuConfig['cardStyleDefault'])}
                  className={`rounded-full border px-3 py-1 ${
                    config.cardStyleDefault === option.value
                      ? 'border-orange-500 bg-orange-50 text-orange-800'
                      : 'border-slate-200 bg-white text-slate-700 hover:border-orange-300'
                  }`}
                >
                  {option.label}
                </button>
              )
            )}
          </div>
          <div className="mt-3 flex flex-wrap gap-2 text-sm">
            {[1, 2, 3].map((col) => (
              <button
                key={col}
                type="button"
                onClick={() => actions.setDefaultColumns(col)}
                className={`rounded-full border px-3 py-1 ${
                  config.columnsDefault === col
                    ? 'border-orange-500 bg-orange-50 text-orange-800'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-orange-300'
                }`}
              >
                {col} col default
              </button>
            ))}
          </div>
        </section>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm lg:col-span-2">
          <h3 className="text-base font-semibold text-slate-900">Colors</h3>
          <div className="mt-3 space-y-3">
            <ColorPickerRow
              label="Preview background"
              value={config.colors.previewBackground}
              onChange={(value) => actions.updateThemeColor('previewBackground', value)}
            />
            <ColorPickerRow
              label="Card background"
              value={config.colors.cardBackground}
              onChange={(value) => actions.updateThemeColor('cardBackground', value)}
            />
            <ColorPickerRow
              label="Text color"
              value={config.colors.text}
              onChange={(value) => actions.updateThemeColor('text', value)}
            />
            <ColorPickerRow
              label="Accent color"
              value={config.colors.accent}
              onChange={(value) => actions.updateThemeColor('accent', value)}
            />
          </div>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <h3 className="text-base font-semibold text-slate-900">Card Shadow</h3>
          <p className="text-sm text-slate-600">Previewed live on the cards.</p>
          <div className="mt-3">
            <ShadowSelector value={config.shadow} onChange={(value) => actions.updateShadow(value)} />
          </div>
        </section>
      </div>
    </div>
  );
}
