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

export function AppShell({ config, actions }: AppShellProps) {
  const [tab, setTab] = useState<Tab>('items');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>(config.categories[0]?.id ?? '');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 px-4 py-6 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl space-y-6">
        <header className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-slate-200 bg-white/90 px-5 py-4 shadow-subtle">
          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-600">Menu Studio</p>
            <h1 className="text-3xl font-bold text-slate-900">Build a polished menu in minutes</h1>
            <p className="text-sm text-slate-600">Follow the two steps: add items, then refine styling. Live preview stays in sync.</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="rounded-full border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 hover:border-orange-300">Desktop</button>
            <button className="rounded-full border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 hover:border-orange-300">Mobile</button>
            <button className="rounded-full bg-orange-500 px-4 py-2 text-sm font-semibold text-white shadow-medium hover:bg-orange-600">Publish</button>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white/95 p-3 shadow-subtle">
            <div className="flex gap-2 rounded-xl bg-slate-100 p-1 text-sm font-semibold text-slate-600">
              <button
                className={`flex-1 rounded-lg px-3 py-2 transition ${
                  tab === 'items'
                    ? 'bg-white text-slate-900 shadow-sm ring-1 ring-slate-200'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                onClick={() => setTab('items')}
              >
                Step 1 · Menu Items
              </button>
              <button
                className={`flex-1 rounded-lg px-3 py-2 transition ${
                  tab === 'style'
                    ? 'bg-white text-slate-900 shadow-sm ring-1 ring-slate-200'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                onClick={() => setTab('style')}
              >
                Step 2 · Styling
              </button>
            </div>
            <div className="mt-4 max-h-[78vh] overflow-y-auto pr-2 scrollbar-thin">
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

          <div className="lg:col-span-2">
            <MenuPreview config={config} selectedCategoryId={selectedCategoryId} onSelectCategory={setSelectedCategoryId} />
          </div>
        </div>
      </div>
    </div>
  );
}
