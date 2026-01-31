import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { MenuConfig, MenuItem, CategoryConfig } from '../../state/menuConfig';
import { Hero } from './Hero';
import { ChefSpecialCard } from './ChefSpecialCard';
import { MenuItemCard } from '../preview/MenuItemCard';
import { ItemDetailModal } from './ItemDetailModal';

interface MenuViewerProps {
  config: MenuConfig;
}

export function MenuViewer({ config }: MenuViewerProps) {
  const [selectedCategory, setSelectedCategory] = useState(config.categories[0]?.id);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [layoutColumns, setLayoutColumns] = useState(2);
  const [cardStyle, setCardStyle] = useState<'compact' | 'feature' | 'list' | 'hero' | 'square' | 'rectangle'>('feature');

  const category = config.categories.find((cat) => cat.id === selectedCategory) ?? config.categories[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50/30">
      {/* Hero Section */}
      <Hero info={config.restaurantInfo} />

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        {/* Chef's Special Section */}
        {config.chefSpecials && config.chefSpecials.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-16"
          >
            <div className="mb-8">
              <h2 className="text-4xl font-bold text-slate-900 mb-2">Chef's Specials</h2>
              <p className="text-lg text-slate-600">Exclusive culinary experiences curated by our chef</p>
            </div>
            <div className="space-y-8">
              {config.chefSpecials.map((special) => (
                <ChefSpecialCard key={special.id} special={special} />
              ))}
            </div>
          </motion.section>
        )}

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-8 flex flex-wrap items-center justify-between gap-4 rounded-xl bg-white p-6 shadow-lg border border-slate-200"
        >
          {/* Layout Controls */}
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold text-slate-700">Layout:</span>
            <div className="flex gap-2">
              {[1, 2, 3].map((cols) => (
                <button
                  key={cols}
                  onClick={() => setLayoutColumns(cols)}
                  className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                    layoutColumns === cols
                      ? 'bg-orange-600 text-white shadow-md'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {cols} {cols === 1 ? 'Column' : 'Columns'}
                </button>
              ))}
            </div>
          </div>

          {/* Card Style Controls */}
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold text-slate-700">Card Style:</span>
            <select
              value={cardStyle}
              onChange={(e) => setCardStyle(e.target.value as typeof cardStyle)}
              className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition-all hover:border-orange-400 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
            >
              <option value="compact">Compact</option>
              <option value="feature">Feature</option>
              <option value="square">Square</option>
              <option value="rectangle">Rectangle</option>
              <option value="list">List</option>
              <option value="hero">Hero</option>
            </select>
          </div>
        </motion.div>

        {/* Category Navigation */}
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8 overflow-x-auto"
        >
          <div className="flex gap-3 pb-3">
            {config.categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex-shrink-0 rounded-full px-6 py-3 text-sm font-semibold transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-lg scale-105'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat.icon && <span className="mr-2">{cat.icon}</span>}
                {cat.name}
              </button>
            ))}
          </div>
        </motion.nav>

        {/* Menu Items Grid */}
        <motion.div
          key={selectedCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="grid gap-6"
          style={{
            gridTemplateColumns: `repeat(${layoutColumns}, minmax(0, 1fr))`,
          }}
        >
          {category.items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <MenuItemCard
                item={item}
                style={cardStyle}
                theme={config.colors}
                shadow={config.shadow}
                onClick={() => setSelectedItem(item)}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {category.items.length === 0 && (
          <div className="text-center py-16">
            <p className="text-slate-500 text-lg">No items in this category yet.</p>
          </div>
        )}
      </div>

      {/* Item Detail Modal */}
      <AnimatePresence>
        {selectedItem && (
          <ItemDetailModal
            item={selectedItem}
            onClose={() => setSelectedItem(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
