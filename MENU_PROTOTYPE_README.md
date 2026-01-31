# Premium Menu Editor Prototype

A AAA-quality, premium restaurant menu viewer and editor built with React, TypeScript, Tailwind CSS, and Framer Motion. This prototype showcases high-end UX/UI design superior to platforms like Uber Eats and DoorDash.

## 🌟 Features

### Menu Viewing Experience
- **Hero Section**: Stunning gradient-based hero with restaurant branding, location, hours, and story
- **Chef's Specials**: Premium multi-course tasting menu cards with detailed course breakdowns
- **Multiple Card Styles**:
  - Compact: Image + details side-by-side
  - Feature: Large image card with prominent details
  - Square: 1:1 ratio with overlay design
  - Rectangle: Horizontal compact card
  - List: Full-width list view
  - Hero: Full-bleed image with gradient overlay
- **Premium Pills**: Featured, Chef's Favorite, Top Reviewed, Most Popular badges
- **Item Details Modal**: Full-screen modal with:
  - Image gallery with navigation
  - Star ratings and review counts
  - Ingredient lists
  - Allergen warnings with visual emphasis
  - Chef's notes
  - Food pairing recommendations
  - Call-to-action buttons

### Layout Customization
- **Column Control**: Switch between 1, 2, or 3 column layouts
- **Card Style Selection**: Real-time switching between all 6 card styles
- **Category Navigation**: Smooth animated tabs with emoji icons
- **Shadow Levels**: Off, Subtle, Medium, Strong shadow options

### Restaurant Information
- **Dedicated Info Page**: Complete restaurant details
- **Hours of Operation**: Full weekly schedule with today highlighted
- **Contact Information**: Address, phone, email with action buttons
- **Story Section**: Restaurant history and mission
- **Cuisine Types**: Visual badges for cuisine specialties
- **Rating Display**: Aggregate rating with review count

### Premium UX/UI Features
- **Framer Motion Animations**: Smooth page transitions and micro-interactions
- **Hover Effects**: Scale, shadow, and transform effects on interactive elements
- **Responsive Design**: Mobile-first approach with breakpoints for all devices
- **Visual Hierarchy**: Strategic use of color, size, and spacing
- **Accessibility**: Semantic HTML and ARIA-compliant components
- **Performance**: Optimized images and lazy loading

## 🎨 Design Philosophy

### Human Factors Considered
1. **Visual Scanning**: F-pattern layout for natural eye movement
2. **Cognitive Load**: Chunked information with clear sections
3. **Decision Making**: Progressive disclosure of details
4. **Touch Targets**: Minimum 44px for mobile interactions
5. **Color Psychology**: Orange/amber for appetite stimulation
6. **White Space**: Generous padding for reduced stress
7. **Typography**: Hierarchy through size, weight, and color

### Premium Elements
- Gradient backgrounds for depth
- Backdrop blur for modern glass-morphism
- Micro-animations for delight
- High-quality food imagery
- Professional color palette
- Consistent spacing system
- Premium shadow system

## 🚀 Technology Stack

- **React 18**: Latest features with hooks
- **TypeScript**: Type-safe development
- **Vite**: Lightning-fast build tool
- **Tailwind CSS**: Utility-first styling
- **Framer Motion**: Production-ready animations
- **Lucide React**: Beautiful icon set

## 📁 Project Structure

```
src/
├── components/
│   ├── common/           # Reusable UI components
│   ├── editor/           # Menu editor components
│   ├── layout/           # Layout components
│   ├── menu/            # Premium menu viewer components
│   │   ├── Hero.tsx              # Restaurant hero section
│   │   ├── ChefSpecialCard.tsx   # Chef's special card
│   │   ├── MenuViewer.tsx        # Main menu view
│   │   ├── ItemDetailModal.tsx   # Item detail modal
│   │   ├── RestaurantInfo.tsx    # Info page
│   │   └── Navigation.tsx        # Top navigation
│   └── preview/          # Menu preview components
├── state/
│   └── menuConfig.ts    # Data models and sample data
└── hooks/               # Custom React hooks

```

## 🎯 Key Components

### MenuViewer
The main menu viewing experience with:
- Dynamic layout switching
- Card style customization
- Category filtering
- Item detail modals

### Hero
Premium restaurant branding section featuring:
- Full-width background image
- Gradient overlays
- Restaurant info cards
- Animated entrance

### ChefSpecialCard
Luxurious multi-course menu card with:
- Diagonal ribbon banner
- Course-by-course breakdown
- Availability information
- Premium CTA buttons

### ItemDetailModal
Full-featured item detail view:
- Image gallery with controls
- Comprehensive information
- Food pairing suggestions
- Action buttons

### RestaurantInfo
Complete restaurant information page:
- Weekly hours schedule
- Contact information
- Restaurant story
- Cuisine specialties
- Rating display

## 🎨 Customization

### Card Styles
All card styles support:
- Custom colors via theme config
- Shadow levels (off, subtle, medium, strong)
- Premium pills and badges
- Rating displays
- Hover animations

### Theme Configuration
Located in `state/menuConfig.ts`:
```typescript
colors: {
  previewBackground: '#f3f4f6',
  cardBackground: '#ffffff',
  text: '#0f172a',
  accent: '#f97316'
}
```

## 📊 Data Model

### MenuItem
```typescript
{
  name: string
  description: string
  price: string
  image?: string
  gallery?: string[]
  tags: string[]
  allergens: string[]
  foodPairings?: FoodPairing[]
  chefNotes?: string
  ingredients?: string[]
  isFeatured?: boolean
  isChefFavorite?: boolean
  isTopReviewed?: boolean
  isMostPopular?: boolean
  rating?: number
  reviewCount?: number
}
```

### ChefSpecial
```typescript
{
  title: string
  subtitle: string
  description: string
  courses: MenuItem[]
  price: string
  image: string
  availableUntil?: string
}
```

### RestaurantInfo
```typescript
{
  name: string
  tagline: string
  cuisineTypes: string[]
  address: string
  phone: string
  email: string
  hours: { [day: string]: string }
  heroImage: string
  story?: string
}
```

## 🚦 Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Dev Server**
   ```bash
   node node_modules/vite/bin/vite.js
   ```

3. **View the Prototype**
   - Open http://localhost:5173
   - Navigate between Menu Preview, Restaurant Info, and Menu Editor

## 🎯 Navigation

The app has three main views accessible via the top navigation:

1. **Menu Preview**: The premium customer-facing menu experience
2. **Restaurant Info**: Detailed restaurant information and hours
3. **Menu Editor**: Backend editor for menu customization

## 💎 Premium Features Showcase

### Visual Excellence
- Professional food photography integration
- Consistent color palette with brand identity
- Strategic use of whitespace
- Premium typography with Inter font

### Interaction Design
- Smooth page transitions
- Hover state feedback
- Loading states and animations
- Gesture-friendly mobile interactions

### Information Architecture
- Clear categorization
- Progressive disclosure
- Scannable content
- Logical flow

## 🔄 Future Enhancements

Potential additions for production:
- Backend integration
- Real-time menu updates
- Online ordering
- Table reservations
- Customer reviews
- Analytics dashboard
- Multi-language support
- Dietary filter system
- Search functionality
- Print-friendly menus

## 📝 Development Notes

- All components are fully typed with TypeScript
- Responsive breakpoints: sm (640px), md (768px), lg (1024px)
- Custom shadow system defined in Tailwind config
- Framer Motion used for all animations
- Image optimization recommended for production

## 🎨 Design Decisions

1. **Orange/Amber Color Scheme**: Stimulates appetite and creates warmth
2. **Large Hero Images**: Immediate visual impact and brand identity
3. **Card-Based Layout**: Scannable, modular, and flexible
4. **Premium Pills**: Quick visual identification of special items
5. **Modal Details**: Progressive disclosure without page navigation
6. **Animated Transitions**: Smooth, delightful user experience

---

Built with ❤️ using modern web technologies for an inevitable, premium dining experience.
