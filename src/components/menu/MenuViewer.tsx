import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import { MenuConfig, MenuItem } from '../../state/menuConfig';
import { Hero } from './Hero';
import { MenuCard } from './MenuCard';
import { ItemDetailModal } from './ItemDetailModal';
import { ToastMessage, ToastStack } from '../common/Toast';
import { useCategoryScroll } from '../../hooks/useCategoryScroll';
import { useCart } from '../../hooks/useCart';
import { parsePrice } from '../../utils/price';

interface MenuViewerProps {
  config: MenuConfig;
}

const gapClasses = {
  compact: 'gap-4',
  comfortable: 'gap-6',
  spacious: 'gap-8'
};

const navSpacingClasses = {
  compact: 'px-4 py-2',
  comfortable: 'px-6 py-3',
  spacious: 'px-7 py-4'
};

const typographyClasses = {
  sm: 'text-sm',
  base: 'text-base',
  lg: 'text-lg'
};

const weightClasses = {
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold'
};

export function MenuViewer({ config }: MenuViewerProps) {
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const { count, addItem } = useCart();
  const categoryIds = useMemo(() => config.categories.map((category) => category.id), [config.categories]);
  const { activeId, registerSectionRef, scrollToCategory } = useCategoryScroll({ categoryIds });
  const navLayout =
    config.navigationSettings.layout === 'auto'
      ? config.navigationLayout === 'sidebar'
        ? 'sidebar'
        : 'top'
      : config.navigationSettings.layout;

  const pushToast = (toast: Omit<ToastMessage, 'id'>) => {
    const id = crypto.randomUUID();
    setToasts((prev) => [...prev, { ...toast, id }]);
    window.setTimeout(() => {
      setToasts((prev) => prev.filter((message) => message.id !== id));
    }, 3000);
  };

  const handleQuickAdd = (item: MenuItem) => {
    const total = parsePrice(item.price);
    addItem(item, 1, total);
    pushToast({ title: `${item.name} added`, description: 'Added to your cart.' });
  };

  const handleAddToCart = (item: MenuItem, quantity: number, totalPrice: number, notes: string) => {
    addItem(item, quantity, totalPrice);
    pushToast({
      title: `${quantity} × ${item.name}`,
      description: notes ? 'Special instructions saved.' : 'Added to your cart.'
    });
  };

  const handleAddPairing = (pairing: MenuItem) => {
    addItem(pairing, 1, parsePrice(pairing.price));
    pushToast({ title: `${pairing.name} added`, description: 'Pairing added to your cart.' });
  };

  const navButtonBase = (isActive: boolean) => {
    const style = config.navigationSettings.style;
    const base = `rounded-full transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${navSpacingClasses[config.navigationSettings.spacing]} ${typographyClasses[config.navigationSettings.typography.size]} ${weightClasses[config.navigationSettings.typography.weight]}`;
    const textTransform = config.navigationSettings.typography.transform === 'uppercase' ? 'uppercase tracking-wide' : '';
    if (style === 'outlined') {
      return `${base} ${textTransform} border ${isActive ? 'border-purple-500 text-purple-700 bg-purple-50' : 'border-slate-200 text-slate-700 hover:border-purple-300'}`;
    }
    if (style === 'ghost') {
      return `${base} ${textTransform} text-slate-700 hover:bg-slate-100 ${isActive ? 'text-purple-700' : ''}`;
    }
    return `${base} ${textTransform} ${isActive ? 'text-white shadow-lg' : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'}`;
  };

  const gridColumnsClass = useMemo(() => {
    switch (config.menuDisplay.columns) {
      case '1':
        return 'grid-cols-1';
      case '2':
        return 'grid-cols-1 md:grid-cols-2';
      case '3':
        return 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3';
      default:
        return 'grid-cols-1';
    }
  }, [config.menuDisplay.columns]);

  const navStickyClass =
    config.navigationSettings.sticky && navLayout !== 'sidebar'
      ? 'sticky top-20 z-20 bg-slate-50/90 backdrop-blur'
      : '';

  return (
    <div className="min-h-screen" style={{ background: config.theme.background }}>
      <a
        href="#menu-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold"
      >
        Skip to menu content
      </a>
      <Hero info={config.restaurantInfo} gradient={config.theme.primaryGradient} />

      <ToastStack toasts={toasts} />

      <main className="relative mx-auto flex max-w-7xl flex-col gap-8 px-6 py-10 lg:px-8" id="menu-content">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold" style={{ color: config.theme.textPrimary }}>
              Browse the menu
            </h2>
            <p className="mt-2" style={{ color: config.theme.textSecondary }}>
              Tap a category to jump or scroll seamlessly.
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm">
            <ShoppingBag className="h-4 w-4" aria-hidden="true" />
            {count} items
          </div>
        </div>

        <div className={navLayout === 'sidebar' ? 'flex flex-col gap-8 lg:flex-row' : ''}>
          <nav
            className={`flex gap-3 overflow-x-auto pb-2 ${
              navLayout === 'sidebar'
                ? `${config.navigationSettings.sticky ? 'lg:sticky lg:top-28' : ''} lg:flex-col lg:overflow-visible lg:pb-0`
                : navStickyClass
            }`}
            aria-label="Menu categories"
          >
            {config.categories.map((category) => {
              const isActive = activeId === category.id;
              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => scrollToCategory(category.id)}
                  className={navButtonBase(isActive)}
                  style={
                    config.navigationSettings.style === 'filled' && isActive
                      ? {
                          background: `linear-gradient(135deg, ${config.theme.primaryGradient.start} 0%, ${config.theme.primaryGradient.end} 100%)`
                        }
                      : undefined
                  }
                  aria-current={isActive ? 'true' : undefined}
                >
                  {config.navigationSettings.showIcons && category.icon && <span className="mr-2">{category.icon}</span>}
                  {category.name}
                  {config.navigationSettings.showCounts && (
                    <span className="ml-2 text-xs text-slate-500">({category.items.length})</span>
                  )}
                </button>
              );
            })}
          </nav>

          <div className="flex-1">
            {config.categories.map((category) => (
              <motion.section
                key={category.id}
                ref={registerSectionRef(category.id)}
                data-category-id={category.id}
                className="mb-12 scroll-mt-28"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-semibold" style={{ color: config.theme.textPrimary }}>
                      {category.name}
                    </h3>
                    <p className="text-sm" style={{ color: config.theme.textSecondary }}>
                      {category.items.length} items
                    </p>
                  </div>
                </div>
                <div
                  className={`grid ${gapClasses[config.menuDisplay.gap]} ${gridColumnsClass}`}
                  style={
                    config.menuDisplay.columns === 'auto'
                      ? { gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }
                      : undefined
                  }
                >
                  {category.items.map((item) => (
                    <MenuCard
                      key={item.id}
                      item={item}
                      settings={config.menuDisplay}
                      theme={config.theme}
                      onClick={() => setSelectedItem(item)}
                      onQuickAdd={() => handleQuickAdd(item)}
                    />
                  ))}
                </div>
                {category.items.length === 0 && (
                  <div className="rounded-xl border border-dashed border-slate-200 p-6 text-center text-sm text-slate-500">
                    No items in this category yet.
                  </div>
                )}
              </motion.section>
            ))}
          </div>
        </div>
      </main>

      <AnimatePresence>
        {selectedItem && (
          <ItemDetailModal
            item={selectedItem}
            theme={config.theme}
            onClose={() => setSelectedItem(null)}
            onAddToCart={handleAddToCart}
            onAddPairing={handleAddPairing}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
