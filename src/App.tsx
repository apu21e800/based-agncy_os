import { useState } from 'react';
import { AppShell } from './components/layout/AppShell';
import { useMenuConfig } from './hooks/useMenuConfig';
import { Navigation } from './components/menu/Navigation';
import { MenuViewer } from './components/menu/MenuViewer';
import { RestaurantInfo } from './components/menu/RestaurantInfo';

// Developer note:
// - To add a new card style: extend the CardStyle union in state/menuConfig.ts, add rendering to MenuItemCard, and expose a
//   button in MenuItemEditor + defaults in StyleEditor.
// - To add a new navigation style: extend NavigationStyle in state/menuConfig.ts, update CategoryNav to style buttons, and
//   add a toggle in StyleEditor.
// - To wire backend data: replace defaultMenuConfig in state/menuConfig.ts with fetched config and hydrate useMenuConfig
//   with that payload; persist actions to the API as mutations.

function App() {
  const [config, actions] = useMenuConfig();
  const [currentView, setCurrentView] = useState<'editor' | 'menu' | 'info'>('menu');

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation
        currentView={currentView}
        onViewChange={setCurrentView}
        restaurantName={config.restaurantInfo.name}
      />

      {currentView === 'editor' && <AppShell config={config} actions={actions} />}
      {currentView === 'menu' && <MenuViewer config={config} />}
      {currentView === 'info' && <RestaurantInfo info={config.restaurantInfo} />}
    </div>
  );
}

export default App;
