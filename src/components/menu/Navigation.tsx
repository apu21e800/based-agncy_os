import { motion } from 'framer-motion';
import { Menu, Info, Settings, Eye } from 'lucide-react';

interface NavigationProps {
  currentView: 'editor' | 'menu' | 'info';
  onViewChange: (view: 'editor' | 'menu' | 'info') => void;
  restaurantName: string;
}

export function Navigation({ currentView, onViewChange, restaurantName }: NavigationProps) {
  const navItems = [
    { id: 'menu' as const, label: 'Menu Preview', icon: Eye },
    { id: 'info' as const, label: 'Restaurant Info', icon: Info },
    { id: 'editor' as const, label: 'Menu Editor', icon: Settings },
  ];

  return (
    <nav className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur-lg shadow-sm">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-gradient-to-br from-orange-600 to-amber-600 p-2">
              <Menu className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-900">{restaurantName}</h1>
              <p className="text-xs text-slate-600">Menu Studio</p>
            </div>
          </div>

          {/* Navigation Items */}
          <div className="flex items-center gap-2">
            {navItems.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => onViewChange(id)}
                className={`relative rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                  currentView === id
                    ? 'text-orange-600'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{label}</span>
                </div>
                {currentView === id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-600 to-amber-600"
                    initial={false}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
