import { useMemo, useState } from 'react';
import { BadgePill } from '../common/BadgePill';
import { EmptyState } from '../common/EmptyState';
import { Stepper } from '../common/Stepper';
import {
  MenuConfig,
  CardStyle,
  badgePalette,
  getCardStyleForCategory,
  getColumnsForCategory
} from '../../state/menuConfig';
import { MenuConfigActions } from '../../hooks/useMenuConfig';

interface MenuItemEditorProps {
  config: MenuConfig;
  selectedCategoryId: string;
  onSelectCategory: (id: string) => void;
  actions: MenuConfigActions;
}

const styles: { value: CardStyle; label: string; description: string }[] = [
  { value: 'compact', label: 'Compact', description: 'Thumb on left, text on right' },
  { value: 'feature', label: 'Feature Image', description: 'Image on top with ratio' },
  { value: 'list', label: 'List', description: 'Text-first with price on right' },
  { value: 'hero', label: 'Hero', description: 'Full bleed image with overlay' }
];

const columnOptions = [1, 2, 3];

export function MenuItemEditor({ config, selectedCategoryId, onSelectCategory, actions }: MenuItemEditorProps) {
  const [newCategory, setNewCategory] = useState('');
  const [editingItemId, setEditingItemId] = useState<string | null>(null);

  const category = useMemo(
    () => config.categories.find((cat) => cat.id === selectedCategoryId) ?? config.categories[0],
    [config.categories, selectedCategoryId]
  );

  const currentStyle = getCardStyleForCategory(category, config);
  const currentColumns = getColumnsForCategory(category, config);

  const checklist = [
    { id: 1, label: 'Add a category', completed: config.categories.length > 0, active: true },
    { id: 2, label: 'Add at least 3 items', completed: category.items.length >= 3, hint: 'Keeps preview full' },
    { id: 3, label: 'Pick a card style', completed: Boolean(category.cardStyleOverride), hint: 'Compact by default' }
  ];

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Step 1 · Menu Item Editor</h2>
            <p className="text-sm text-slate-600">Start here: add categories and items. Style comes next.</p>
          </div>
          <Stepper steps={checklist} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-slate-900">Categories</h3>
            <span className="text-xs text-slate-500">{config.categories.length} total</span>
          </div>
          <div className="mt-3 flex gap-2">
            <input
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="Add category"
              className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none"
            />
            <button
              type="button"
              onClick={() => {
                if (!newCategory.trim()) return;
                actions.addCategory(newCategory.trim());
                setNewCategory('');
              }}
              className="rounded-lg bg-orange-500 px-3 py-2 text-sm font-semibold text-white shadow-subtle"
            >
              Add
            </button>
          </div>
          <div className="mt-4 space-y-2">
            {config.categories.map((cat) => (
              <button
                key={cat.id}
                className={`flex w-full items-center justify-between rounded-lg border px-3 py-2 text-left text-sm ${
                  cat.id === category.id
                    ? 'border-orange-500 bg-orange-50 text-orange-800'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-orange-300'
                }`}
                onClick={() => onSelectCategory(cat.id)}
              >
                <span>{cat.name}</span>
                <span className="text-xs text-slate-500">{cat.items.length} items</span>
              </button>
            ))}
            {config.categories.length === 0 && (
              <EmptyState
                title="No categories yet"
                description="Create your first category to unlock the preview."
                action={<span className="text-sm text-orange-700">Add a category to begin</span>}
              />
            )}
          </div>
        </section>

        <section className="lg:col-span-2">
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-base font-semibold text-slate-900">Card layout for {category.name}</h3>
                <p className="text-sm text-slate-600">Changes apply only to this category. Reset to use global defaults.</p>
              </div>
              <button
                type="button"
                className="text-sm font-semibold text-orange-700"
                onClick={() => {
                  actions.updateCategoryStyle(category.id, config.cardStyleDefault);
                  actions.updateCategoryColumns(category.id, config.columnsDefault);
                }}
              >
                Reset to global
              </button>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2 md:grid-cols-4">
              {styles.map((style) => (
                <button
                  key={style.value}
                  type="button"
                  className={`flex flex-col rounded-lg border px-3 py-2 text-left text-sm ${
                    currentStyle === style.value
                      ? 'border-orange-500 bg-orange-50 text-orange-800'
                      : 'border-slate-200 bg-white text-slate-700 hover:border-orange-300'
                  }`}
                  onClick={() => actions.updateCategoryStyle(category.id, style.value)}
                >
                  <span className="font-semibold">{style.label}</span>
                  <span className="text-xs text-slate-500">{style.description}</span>
                </button>
              ))}
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
              <span className="font-semibold text-slate-800">Columns</span>
              {columnOptions.map((col) => (
                <button
                  key={col}
                  type="button"
                  className={`rounded-full border px-3 py-1 ${
                    currentColumns === col
                      ? 'border-orange-500 bg-orange-50 text-orange-800'
                      : 'border-slate-200 bg-white text-slate-700 hover:border-orange-300'
                  }`}
                  onClick={() => actions.updateCategoryColumns(category.id, col)}
                >
                  {col} col
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold text-slate-900">Items in {category.name}</h3>
                <p className="text-sm text-slate-600">Add details, tags, and allergens. Preview updates instantly.</p>
              </div>
              <button
                type="button"
                onClick={() => actions.addItem(category.id)}
                className="rounded-lg bg-slate-900 px-3 py-2 text-sm font-semibold text-white shadow-subtle"
              >
                + Add item
              </button>
            </div>

            {category.items.length === 0 && (
              <div className="mt-3">
                <EmptyState
                  title="No items yet"
                  description="Add at least 3 items so your preview feels real."
                  action={<span className="text-sm text-orange-700">Add your first item</span>}
                />
              </div>
            )}

            <div className="mt-3 space-y-3">
              {category.items.map((item) => (
                <div key={item.id} className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <input
                        value={item.name}
                        onChange={(e) => actions.updateItem(category.id, { ...item, name: e.target.value })}
                        className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold focus:border-orange-500 focus:outline-none"
                      />
                      <textarea
                        value={item.description}
                        onChange={(e) => actions.updateItem(category.id, { ...item, description: e.target.value })}
                        placeholder="Description"
                        className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none"
                      />
                      <div className="mt-2 flex items-center gap-2">
                        <input
                          value={item.price}
                          onChange={(e) => actions.updateItem(category.id, { ...item, price: e.target.value })}
                          className="w-28 rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none"
                        />
                        <input
                          value={item.image ?? ''}
                          onChange={(e) => actions.updateItem(category.id, { ...item, image: e.target.value })}
                          placeholder="Image URL"
                          className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none"
                        />
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setEditingItemId(editingItemId === item.id ? null : item.id)}
                      className="rounded-full border border-slate-200 px-2 py-1 text-xs text-slate-600"
                    >
                      {editingItemId === item.id ? 'Hide tags' : 'Tags + Allergens'}
                    </button>
                  </div>

                  {editingItemId === item.id && (
                    <div className="mt-3 space-y-2">
                      <div>
                        <p className="text-xs font-semibold text-slate-700">Tags</p>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {badgePalette.tags.map((tag) => (
                            <BadgePill
                              key={tag}
                              label={tag}
                              selected={item.tags.includes(tag)}
                              onToggle={() => actions.toggleBadge(category.id, item.id, 'tags', tag)}
                            />
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-slate-700">Allergens</p>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {badgePalette.allergens.map((tag) => (
                            <BadgePill
                              key={tag}
                              label={tag}
                              tone="allergen"
                              selected={item.allergens.includes(tag)}
                              onToggle={() => actions.toggleBadge(category.id, item.id, 'allergens', tag)}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
