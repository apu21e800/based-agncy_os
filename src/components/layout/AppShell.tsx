import { useState } from 'react';
import { MenuConfig } from '../../state/menuConfig';
import { MenuConfigActions } from '../../hooks/useMenuConfig';
import { MenuPreview } from '../preview/MenuPreview';
import { MenuItemEditor } from '../editor/MenuItemEditor';
import { StyleEditor } from '../editor/StyleEditor';

interface AppShellProps {
  config: MenuConfig;
  actions: MenuConfigActions;
}

type Tab = 'items' | 'style';
type PreviewMode = 'desktop' | 'mobile';

export function AppShell({ config, actions }: AppShellProps) {
  const [tab, setTab] = useState<Tab>('items');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>(config.categories[0]?.id ?? '');
  const [previewMode, setPreviewMode] = useState<PreviewMode>('desktop');
  const [isPublishOpen, setPublishOpen] = useState(false);

  // Keep editor + preview scrolled independently so the overall page height stays comfortable.
  const panelMaxHeight = 'calc(100vh - 220px)';

  const previewToggleClasses = (mode: PreviewMode) =>
    `rounded-full border px-3 py-2 text-sm font-semibold transition-colors ${
      previewMode === mode
        ? 'border-orange-500 bg-orange-500 text-white shadow-subtle'
        : 'border-slate-200 bg-white text-slate-700 hover:border-orange-300'
    }`;

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col gap-4 px-4 py-6 sm:px-6 lg:px-8">
        <header className="flex flex-wrap items-center justify-between gap-3 rounded-3xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-orange-600">Menu Studio · MVP</p>
            <h1 className="text-2xl font-bold text-slate-900">Professional menu in under 10 minutes</h1>
            <p className="text-sm text-slate-600">Guided flow keeps content and style separate and non-destructive.</p>
          </div>
          <div className="flex items-center gap-2">
            <button className={previewToggleClasses('desktop')} onClick={() => setPreviewMode('desktop')}>
              Desktop
            </button>
            <button className={previewToggleClasses('mobile')} onClick={() => setPreviewMode('mobile')}>
              Mobile
            </button>
            <button
              className="rounded-full bg-orange-500 px-4 py-2 text-sm font-semibold text-white shadow-subtle hover:bg-orange-600"
              onClick={() => setPublishOpen(true)}
            >
              Publish
            </button>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 lg:flex-row lg:items-start">
          <div className="w-full flex-shrink-0 lg:w-[380px] xl:w-[420px]">
            <div className="rounded-2xl border border-slate-200 bg-white p-2 shadow-sm">
              <div className="flex rounded-lg bg-slate-100 p-1 text-sm font-semibold text-slate-600">
                <button
                  className={`flex-1 rounded-md px-3 py-2 ${
                    tab === 'items' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
                  }`}
                  onClick={() => setTab('items')}
                >
                  Step 1 · Menu Item Editor
                </button>
                <button
                  className={`flex-1 rounded-md px-3 py-2 ${
                    tab === 'style' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
                  }`}
                  onClick={() => setTab('style')}
                >
                  Step 2 · Style Editor
                </button>
              </div>
              <div className="mt-3 overflow-y-auto pr-2 scrollbar-thin" style={{ maxHeight: panelMaxHeight }}>
                {tab === 'items' ? (
                  <MenuItemEditor
                    config={config}
                    selectedCategoryId={selectedCategoryId}
                    onSelectCategory={setSelectedCategoryId}
                    actions={actions}
                  />
                ) : (
                  <StyleEditor config={config} actions={actions} />
                )}
              </div>
            </div>
          </div>

          <div className="flex-1">
            <div className="overflow-y-auto scrollbar-thin" style={{ maxHeight: panelMaxHeight }}>
              <MenuPreview
                config={config}
                selectedCategoryId={selectedCategoryId}
                onSelectCategory={setSelectedCategoryId}
                mode={previewMode}
              />
            </div>
          </div>
        </div>
      </div>

      {isPublishOpen && (
        <div className="fixed inset-0 z-40 flex justify-end bg-black/30 backdrop-blur-sm">
          <div className="h-full w-full max-w-md transform bg-white shadow-strong transition-all">
            <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-orange-600">Publish flow</p>
                <h3 className="text-lg font-semibold text-slate-900">Launch checklist</h3>
              </div>
              <button
                className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700"
                onClick={() => setPublishOpen(false)}
              >
                Close
              </button>
            </div>
            <div className="space-y-4 px-4 py-4">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <h4 className="text-base font-semibold text-slate-900">Ready to publish?</h4>
                <p className="mt-1 text-sm text-slate-600">
                  Run through these last checks before your menu goes live.
                </p>
              </div>
              <ul className="space-y-3 text-sm text-slate-700">
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 h-5 w-5 rounded-full bg-green-100 text-center text-xs font-semibold text-green-700">✓</span>
                  Confirm categories & at least 3 items per category.
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 h-5 w-5 rounded-full bg-blue-100 text-center text-xs font-semibold text-blue-700">✓</span>
                  Check mobile preview for spacing and readability.
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 h-5 w-5 rounded-full bg-amber-100 text-center text-xs font-semibold text-amber-700">•</span>
                  Add allergen + dietary tags where helpful.
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 h-5 w-5 rounded-full bg-slate-100 text-center text-xs font-semibold text-slate-700">•</span>
                  Connect payments & delivery zones (coming soon).
                </li>
              </ul>
              <div className="flex flex-wrap gap-2">
                <button className="rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-white shadow-subtle">
                  Publish now
                </button>
                <button
                  className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-800"
                  onClick={() => setPublishOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
