import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Star, AlertCircle, Wine, ChefHat } from 'lucide-react';
import { MenuItem } from '../../state/menuConfig';

interface ItemDetailModalProps {
  item: MenuItem;
  onClose: () => void;
}

export function ItemDetailModal({ item, onClose }: ItemDetailModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const gallery = item.gallery ?? (item.image ? [item.image] : []);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % gallery.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + gallery.length) % gallery.length);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[90vh] w-full max-w-5xl overflow-auto rounded-2xl bg-white shadow-2xl"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 rounded-full bg-white/90 backdrop-blur-sm p-2 text-slate-700 transition-all hover:bg-white hover:scale-110 shadow-lg"
        >
          <X className="h-6 w-6" />
        </button>

        {/* Image Gallery */}
        <div className="relative h-80 sm:h-96 overflow-hidden bg-slate-900">
          {gallery.length > 0 && (
            <>
              <img
                src={gallery[currentImageIndex]}
                alt={item.name}
                className="h-full w-full object-cover"
              />

              {/* Gallery Navigation */}
              {gallery.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 backdrop-blur-sm p-2 text-slate-700 transition-all hover:bg-white hover:scale-110 shadow-lg"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 backdrop-blur-sm p-2 text-slate-700 transition-all hover:bg-white hover:scale-110 shadow-lg"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>

                  {/* Gallery Dots */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {gallery.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`h-2 rounded-full transition-all ${
                          index === currentImageIndex
                            ? 'w-8 bg-white'
                            : 'w-2 bg-white/50 hover:bg-white/75'
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}

              {/* Premium Badges Overlay */}
              <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                {item.isFeatured && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-amber-50/95 backdrop-blur-sm px-3 py-1.5 text-sm font-semibold text-amber-700 border border-amber-200 shadow-lg">
                    <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                    Featured
                  </span>
                )}
                {item.isChefFavorite && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-purple-50/95 backdrop-blur-sm px-3 py-1.5 text-sm font-semibold text-purple-700 border border-purple-200 shadow-lg">
                    <ChefHat className="h-4 w-4" />
                    Chef's Favorite
                  </span>
                )}
              </div>
            </>
          )}
        </div>

        {/* Content */}
        <div className="p-8">
          {/* Header */}
          <div className="mb-6 flex items-start justify-between gap-4">
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
                {item.name}
              </h2>
              <p className="mt-2 text-lg text-slate-600">
                {item.description}
              </p>

              {/* Rating */}
              {item.rating && (
                <div className="mt-3 flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.floor(item.rating!)
                            ? 'fill-amber-400 text-amber-400'
                            : 'fill-slate-200 text-slate-200'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-semibold text-slate-900">
                    {item.rating.toFixed(1)}
                  </span>
                  {item.reviewCount && (
                    <span className="text-sm text-slate-500">
                      ({item.reviewCount} reviews)
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Price */}
            <div className="flex-shrink-0">
              <div className="rounded-2xl bg-gradient-to-br from-orange-500 to-amber-600 px-6 py-4 shadow-lg">
                <p className="text-3xl font-bold text-white">{item.price}</p>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="mb-6 flex flex-wrap gap-2">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Ingredients */}
            {item.ingredients && item.ingredients.length > 0 && (
              <div className="rounded-xl bg-slate-50 p-6 border border-slate-200">
                <h3 className="mb-4 text-lg font-bold text-slate-900">Ingredients</h3>
                <ul className="space-y-2">
                  {item.ingredients.map((ingredient, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm text-slate-700">
                      <div className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                      {ingredient}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Allergens */}
            {item.allergens && item.allergens.length > 0 && (
              <div className="rounded-xl bg-red-50 p-6 border border-red-200">
                <div className="flex items-center gap-2 mb-4">
                  <AlertCircle className="h-5 w-5 text-red-600" />
                  <h3 className="text-lg font-bold text-red-900">Allergen Information</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {item.allergens.map((allergen) => (
                    <span
                      key={allergen}
                      className="rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-700 border border-red-200"
                    >
                      {allergen}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Chef's Notes */}
          {item.chefNotes && (
            <div className="mt-6 rounded-xl bg-gradient-to-br from-purple-50 to-blue-50 p-6 border border-purple-200">
              <div className="flex items-start gap-3">
                <ChefHat className="h-6 w-6 text-purple-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Chef's Notes</h3>
                  <p className="text-sm text-slate-700 leading-relaxed">{item.chefNotes}</p>
                </div>
              </div>
            </div>
          )}

          {/* Food Pairings */}
          {item.foodPairings && item.foodPairings.length > 0 && (
            <div className="mt-6 rounded-xl bg-gradient-to-br from-amber-50 to-yellow-50 p-6 border border-amber-200">
              <div className="flex items-center gap-2 mb-4">
                <Wine className="h-6 w-6 text-amber-700" />
                <h3 className="text-lg font-bold text-slate-900">Recommended Pairings</h3>
              </div>
              <div className="space-y-4">
                {item.foodPairings.map((pairing, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-600 text-white flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">{pairing.name}</p>
                      <p className="text-sm text-slate-600 mt-1">{pairing.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Button */}
          <div className="mt-8 flex gap-4">
            <button className="flex-1 rounded-full bg-gradient-to-r from-orange-600 to-amber-600 px-8 py-4 text-lg font-bold text-white shadow-lg transition-all hover:shadow-xl hover:scale-105">
              Add to Order
            </button>
            <button className="rounded-full border-2 border-orange-600 px-8 py-4 text-lg font-bold text-orange-600 transition-all hover:bg-orange-50">
              Share
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
