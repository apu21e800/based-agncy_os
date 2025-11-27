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
    <div className="mx-auto flex min-h-screen max-w-7xl flex-col gap-4 px-4 py-6 sm:px-6 lg:px-8">
      <header className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-orange-600">Menu Studio · MVP</p>
          <h1 className="text-2xl font-bold text-slate-900">Professional menu in under 10 minutes</h1>
          <p className="text-sm text-slate-600">Guided flow keeps content and style separate and non-destructive.</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="rounded-full border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700">Desktop</button>
          <button className="rounded-full border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700">Mobile</button>
          <button className="rounded-full bg-orange-500 px-4 py-2 text-sm font-semibold text-white shadow-subtle">Publish</button>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
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
          <div className="mt-3 max-h-[75vh] overflow-y-auto pr-2 scrollbar-thin">
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
  );
}
