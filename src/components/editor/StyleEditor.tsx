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

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <h3 className="text-base font-semibold text-slate-900">Menu Display</h3>
          <p className="text-sm text-slate-600">Control grid density, card visuals, and content visibility.</p>
          <div className="mt-4 space-y-4 text-sm">
            <div>
              <p className="font-semibold text-slate-800">Grid columns</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {['1', '2', '3', 'auto'].map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => actions.updateMenuDisplay('columns', value as MenuConfig['menuDisplay']['columns'])}
                    className={`rounded-full border px-3 py-1 ${
                      config.menuDisplay.columns === value
                        ? 'border-purple-500 bg-purple-50 text-purple-800'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-purple-300'
                    }`}
                  >
                    {value === 'auto' ? 'Auto' : `${value} col`}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="font-semibold text-slate-800">Grid spacing</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {['compact', 'comfortable', 'spacious'].map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => actions.updateMenuDisplay('gap', value as MenuConfig['menuDisplay']['gap'])}
                    className={`rounded-full border px-3 py-1 capitalize ${
                      config.menuDisplay.gap === value
                        ? 'border-purple-500 bg-purple-50 text-purple-800'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-purple-300'
                    }`}
                  >
                    {value}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="font-semibold text-slate-800">Card style</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {['elevated', 'flat', 'outlined', 'minimal'].map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => actions.updateMenuDisplay('cardStyle', value as MenuConfig['menuDisplay']['cardStyle'])}
                    className={`rounded-full border px-3 py-1 capitalize ${
                      config.menuDisplay.cardStyle === value
                        ? 'border-purple-500 bg-purple-50 text-purple-800'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-purple-300'
                    }`}
                  >
                    {value}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="font-semibold text-slate-800">Image layout</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {['top', 'left', 'right', 'background'].map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => actions.updateMenuDisplay('imagePosition', value as MenuConfig['menuDisplay']['imagePosition'])}
                    className={`rounded-full border px-3 py-1 capitalize ${
                      config.menuDisplay.imagePosition === value
                        ? 'border-purple-500 bg-purple-50 text-purple-800'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-purple-300'
                    }`}
                  >
                    {value}
                  </button>
                ))}
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {['square', 'landscape', 'portrait', 'none'].map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => actions.updateMenuDisplay('imageAspectRatio', value as MenuConfig['menuDisplay']['imageAspectRatio'])}
                    className={`rounded-full border px-3 py-1 capitalize ${
                      config.menuDisplay.imageAspectRatio === value
                        ? 'border-purple-500 bg-purple-50 text-purple-800'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-purple-300'
                    }`}
                  >
                    {value}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="font-semibold text-slate-800">Content density</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {['compact', 'comfortable', 'spacious'].map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => actions.updateMenuDisplay('density', value as MenuConfig['menuDisplay']['density'])}
                    className={`rounded-full border px-3 py-1 capitalize ${
                      config.menuDisplay.density === value
                        ? 'border-purple-500 bg-purple-50 text-purple-800'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-purple-300'
                    }`}
                  >
                    {value}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="font-semibold text-slate-800">Description display</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {['full', 'truncated', 'hidden'].map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => actions.updateMenuDisplay('descriptionDisplay', value as MenuConfig['menuDisplay']['descriptionDisplay'])}
                    className={`rounded-full border px-3 py-1 capitalize ${
                      config.menuDisplay.descriptionDisplay === value
                        ? 'border-purple-500 bg-purple-50 text-purple-800'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-purple-300'
                    }`}
                  >
                    {value}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              {[
                { key: 'showPrepTime', label: 'Show prep time' },
                { key: 'showDietaryIcons', label: 'Show dietary icons' },
                { key: 'showCalories', label: 'Show calories' },
                { key: 'showBadges', label: 'Show badges' }
              ].map((option) => (
                <label key={option.key} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-slate-300 text-purple-600 focus:ring-purple-500"
                    checked={config.menuDisplay[option.key as keyof MenuConfig['menuDisplay']] as boolean}
                    onChange={(event) =>
                      actions.updateMenuDisplay(
                        option.key as keyof MenuConfig['menuDisplay'],
                        event.target.checked as MenuConfig['menuDisplay'][keyof MenuConfig['menuDisplay']]
                      )
                    }
                  />
                  <span className="text-slate-700">{option.label}</span>
                </label>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <h3 className="text-base font-semibold text-slate-900">Navigation & Theme</h3>
          <p className="text-sm text-slate-600">Match category navigation and global brand styling.</p>
          <div className="mt-4 space-y-4 text-sm">
            <div>
              <p className="font-semibold text-slate-800">Navigation layout</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {['top', 'sidebar', 'auto'].map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => actions.updateNavigationSettings('layout', value as MenuConfig['navigationSettings']['layout'])}
                    className={`rounded-full border px-3 py-1 capitalize ${
                      config.navigationSettings.layout === value
                        ? 'border-purple-500 bg-purple-50 text-purple-800'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-purple-300'
                    }`}
                  >
                    {value}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="font-semibold text-slate-800">Navigation style</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {['filled', 'outlined', 'ghost'].map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => actions.updateNavigationSettings('style', value as MenuConfig['navigationSettings']['style'])}
                    className={`rounded-full border px-3 py-1 capitalize ${
                      config.navigationSettings.style === value
                        ? 'border-purple-500 bg-purple-50 text-purple-800'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-purple-300'
                    }`}
                  >
                    {value}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { key: 'sticky', label: 'Sticky on scroll' },
                { key: 'showIcons', label: 'Show icons' },
                { key: 'showCounts', label: 'Show item counts' }
              ].map((option) => (
                <label key={option.key} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-slate-300 text-purple-600 focus:ring-purple-500"
                    checked={config.navigationSettings[option.key as keyof MenuConfig['navigationSettings']] as boolean}
                    onChange={(event) =>
                      actions.updateNavigationSettings(
                        option.key as keyof MenuConfig['navigationSettings'],
                        event.target.checked as MenuConfig['navigationSettings'][keyof MenuConfig['navigationSettings']]
                      )
                    }
                  />
                  <span className="text-slate-700">{option.label}</span>
                </label>
              ))}
            </div>
            <div>
              <p className="font-semibold text-slate-800">Primary gradient</p>
              <div className="mt-2 grid grid-cols-2 gap-2">
                <input
                  type="color"
                  value={config.theme.primaryGradient.start}
                  onChange={(event) =>
                    actions.updateThemeSettings('primaryGradient', {
                      ...config.theme.primaryGradient,
                      start: event.target.value
                    })
                  }
                  className="h-10 w-full cursor-pointer rounded border border-slate-200"
                  aria-label="Primary gradient start"
                />
                <input
                  type="color"
                  value={config.theme.primaryGradient.end}
                  onChange={(event) =>
                    actions.updateThemeSettings('primaryGradient', {
                      ...config.theme.primaryGradient,
                      end: event.target.value
                    })
                  }
                  className="h-10 w-full cursor-pointer rounded border border-slate-200"
                  aria-label="Primary gradient end"
                />
              </div>
            </div>
            <div>
              <p className="font-semibold text-slate-800">Theme colors</p>
              <div className="mt-2 grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-xs text-slate-500">Background</label>
                  <input
                    type="color"
                    value={config.theme.background}
                    onChange={(event) => actions.updateThemeSettings('background', event.target.value)}
                    className="h-10 w-full cursor-pointer rounded border border-slate-200"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-slate-500">Primary text</label>
                  <input
                    type="color"
                    value={config.theme.textPrimary}
                    onChange={(event) => actions.updateThemeSettings('textPrimary', event.target.value)}
                    className="h-10 w-full cursor-pointer rounded border border-slate-200"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-slate-500">Secondary text</label>
                  <input
                    type="color"
                    value={config.theme.textSecondary}
                    onChange={(event) => actions.updateThemeSettings('textSecondary', event.target.value)}
                    className="h-10 w-full cursor-pointer rounded border border-slate-200"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-slate-500">Card background</label>
                  <input
                    type="color"
                    value={config.theme.cardBackground}
                    onChange={(event) => actions.updateThemeSettings('cardBackground', event.target.value)}
                    className="h-10 w-full cursor-pointer rounded border border-slate-200"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-slate-500">Card border</label>
                  <input
                    type="color"
                    value={config.theme.cardBorder}
                    onChange={(event) => actions.updateThemeSettings('cardBorder', event.target.value)}
                    className="h-10 w-full cursor-pointer rounded border border-slate-200"
                  />
                </div>
              </div>
            </div>
            <div>
              <p className="font-semibold text-slate-800">Border radius</p>
              <input
                type="range"
                min={0}
                max={24}
                value={config.theme.borderRadius}
                onChange={(event) => actions.updateThemeSettings('borderRadius', Number(event.target.value))}
                className="mt-2 w-full"
              />
              <p className="mt-1 text-xs text-slate-500">{config.theme.borderRadius}px</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
