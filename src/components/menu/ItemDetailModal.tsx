import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  ArrowLeft,
  X,
  Clock,
  Flame,
  Leaf,
  WheatOff,
  Droplet,
  ShieldCheck,
  Check,
  Minus,
  Plus
} from 'lucide-react';
import { MenuConfig, MenuItem } from '../../state/menuConfig';
import { useItemCustomization } from '../../hooks/useItemCustomization';
import { formatPrice, parsePrice } from '../../utils/price';

interface ItemDetailModalProps {
  item: MenuItem;
  theme: MenuConfig['theme'];
  onClose: () => void;
  onAddToCart: (item: MenuItem, quantity: number, totalPrice: number, notes: string) => void;
  onAddPairing: (item: MenuItem) => void;
}

const dietaryIcons: Record<string, typeof Leaf> = {
  vegan: Leaf,
  vegetarian: Leaf,
  'gluten-free': WheatOff,
  'dairy-free': Droplet,
  'nut-free': ShieldCheck
};

function getDietaryIcon(type: string) {
  return dietaryIcons[type] ?? Leaf;
}

export function ItemDetailModal({ item, theme, onClose, onAddToCart, onAddPairing }: ItemDetailModalProps) {
  const prefersReducedMotion = useReducedMotion();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [addedPairings, setAddedPairings] = useState<string[]>([]);
  const [pricePulse, setPricePulse] = useState(false);
  const {
    selectedModifiers,
    quantity,
    specialInstructions,
    errors,
    modifiers,
    setQuantity,
    setSpecialInstructions,
    selectOption,
    toggleOption,
    validate,
    resetErrors
  } = useItemCustomization(item);

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  const { basePrice, modifierTotal } = useMemo(() => {
    let base = parsePrice(item.price);
    let modifierSum = 0;
    modifiers.forEach((group) => {
      const selection = selectedModifiers[group.id];
      if (!selection) return;
      const isSizeGroup = group.required && group.name.toLowerCase().includes('size');
      if (typeof selection === 'string') {
        const option = group.options.find((opt) => opt.id === selection);
        if (isSizeGroup && option) {
          base = option.price;
          return;
        }
        modifierSum += option?.price ?? 0;
        return;
      }
      modifierSum += selection.reduce((groupSum, optionId) => {
        const option = group.options.find((opt) => opt.id === optionId);
        return groupSum + (option?.price ?? 0);
      }, 0);
    });
    return { basePrice: base, modifierTotal: modifierSum };
  }, [item.price, modifiers, selectedModifiers]);

  const totalPrice = useMemo(() => {
    return (basePrice + modifierTotal) * quantity;
  }, [basePrice, modifierTotal, quantity]);

  useEffect(() => {
    setPricePulse(true);
    const timer = window.setTimeout(() => setPricePulse(false), 300);
    return () => window.clearTimeout(timer);
  }, [totalPrice]);

  const handleAddToCart = () => {
    if (!validate()) return;
    onAddToCart(item, quantity, totalPrice, specialInstructions);
    onClose();
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="dialog"
      aria-modal="true"
      aria-label={`${item.name} details`}
    >
      <motion.div
        className="relative flex h-full w-full max-w-5xl flex-col overflow-hidden bg-white"
        initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 30, scale: prefersReducedMotion ? 1 : 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: prefersReducedMotion ? 0 : 30, scale: prefersReducedMotion ? 1 : 0.98 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute left-4 top-4 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow-lg backdrop-blur-sm transition hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          aria-label="Back to menu"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow-lg backdrop-blur-sm transition hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          aria-label="Close item details"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="relative h-[320px] w-full sm:h-[480px]">
          {item.image && (
            <button
              type="button"
              onClick={() => setLightboxOpen(true)}
              className="h-full w-full"
              aria-label="Open image preview"
            >
              <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
            </button>
          )}
          <div className="absolute left-6 top-6 flex flex-wrap gap-2">
            {item.badges?.map((badge) => (
              <span
                key={badge.label}
                className="inline-flex items-center gap-1 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-900"
              >
                {badge.label}
              </span>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-3xl px-6 py-8">
            <div className="mb-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <h2 className="text-3xl font-bold sm:text-4xl" style={{ color: theme.textPrimary }}>
                  {item.name}
                </h2>
                <span className="text-2xl font-bold" style={{ color: theme.textPrimary }}>
                  {item.price}
                </span>
              </div>
              <div className="mt-4 flex flex-wrap gap-4 text-sm" style={{ color: theme.textSecondary }}>
                {item.dietary?.map((tag) => {
                  const Icon = getDietaryIcon(tag.type);
                  return (
                    <span key={tag.label} className="inline-flex items-center gap-1">
                      <Icon className="h-4 w-4" aria-hidden="true" />
                      {tag.label}
                    </span>
                  );
                })}
                {item.prepTime && (
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-4 w-4" aria-hidden="true" />
                    {item.prepTime} min
                  </span>
                )}
                {item.calories && (
                  <span className="inline-flex items-center gap-1">
                    <Flame className="h-4 w-4" aria-hidden="true" />
                    {item.calories} cal
                  </span>
                )}
              </div>
              <p className="mt-4 text-base leading-relaxed" style={{ color: theme.textSecondary }}>
                {item.description}
              </p>
            </div>

            {modifiers.map((group) => {
              const selected = selectedModifiers[group.id];
              const groupError = errors[group.id];
              return (
                <section key={group.id} className="border-t border-slate-200 py-6">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-lg font-semibold" style={{ color: theme.textPrimary }}>
                      {group.name}
                    </h3>
                    {group.required ? (
                      <span className="rounded bg-red-100 px-2 py-1 text-xs font-semibold uppercase text-red-700">
                        Required
                      </span>
                    ) : (
                      <span className="text-xs text-slate-500">Optional</span>
                    )}
                  </div>
                  <div className="space-y-3">
                    {group.options.map((option) => {
                      const isSelected =
                        typeof selected === 'string'
                          ? selected === option.id
                          : Array.isArray(selected) && selected.includes(option.id);
                      return (
                        <button
                          key={option.id}
                          type="button"
                          onClick={() => {
                            resetErrors(group.id);
                            if (group.required) {
                              selectOption(group.id, option.id);
                              return;
                            }
                            toggleOption(group.id, option.id);
                          }}
                          className={
                            'flex w-full items-center justify-between rounded-xl border-2 px-4 py-4 text-left transition ' +
                            (isSelected
                              ? 'border-purple-500 bg-purple-50/50'
                              : groupError
                              ? 'border-red-400 bg-red-50/40'
                              : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50')
                          }
                        >
                          <div className="flex items-start gap-3">
                            <div
                              className={
                                'mt-1 flex h-6 w-6 items-center justify-center rounded-full border-2 transition ' +
                                (group.required ? 'rounded-full' : 'rounded-md') +
                                (isSelected ? 'border-purple-500' : 'border-slate-300')
                              }
                              style={
                                isSelected
                                  ? {
                                      background: `linear-gradient(135deg, ${theme.primaryGradient.start} 0%, ${theme.primaryGradient.end} 100%)`
                                    }
                                  : undefined
                              }
                            >
                              {isSelected && <Check className="h-4 w-4 text-white" />}
                            </div>
                            <div>
                              <p className="text-sm font-semibold" style={{ color: theme.textPrimary }}>
                                {option.name}
                              </p>
                              {option.description && (
                                <p className="mt-1 text-xs" style={{ color: theme.textSecondary }}>
                                  {option.description}
                                </p>
                              )}
                            </div>
                          </div>
                          <span className="text-sm font-semibold" style={{ color: theme.textPrimary }}>
                            {formatPrice(option.price)}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                  {groupError && <p className="mt-2 text-sm text-red-600">{groupError}</p>}
                </section>
              );
            })}

            <section className="border-t border-slate-200 py-6">
              <h3 className="mb-3 text-lg font-semibold" style={{ color: theme.textPrimary }}>
                Special Instructions
              </h3>
              <textarea
                value={specialInstructions}
                onChange={(event) => setSpecialInstructions(event.target.value)}
                placeholder='E.g., "No garlic" or "Extra spicy"'
                className="min-h-[100px] w-full rounded-xl border-2 border-slate-200 px-4 py-3 text-sm text-slate-900 focus:border-purple-500 focus:outline-none"
              />
            </section>

            {item.pairings && item.pairings.length > 0 && (
              <section className="border-t border-slate-200 py-6">
                <h3 className="mb-4 text-xl font-semibold" style={{ color: theme.textPrimary }}>
                  Perfect Pairings
                </h3>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {item.pairings.map((pairing) => {
                    const added = addedPairings.includes(pairing.id);
                    return (
                      <button
                        key={pairing.id}
                        type="button"
                        onClick={() => {
                          setAddedPairings((prev) => {
                            if (prev.includes(pairing.id)) {
                              return prev.filter((id) => id !== pairing.id);
                            }
                            onAddPairing(pairing);
                            return [...prev, pairing.id];
                          });
                        }}
                        className={
                          'overflow-hidden rounded-xl border-2 text-left transition hover:scale-[1.02] ' +
                          (added ? 'border-purple-500' : 'border-slate-200')
                        }
                      >
                        {pairing.image && (
                          <img src={pairing.image} alt={pairing.name} className="aspect-square w-full object-cover" loading="lazy" />
                        )}
                        <div className="p-3">
                          <div className="flex items-center justify-between">
                          <p className="text-sm font-semibold" style={{ color: theme.textPrimary }}>
                            {pairing.name}
                          </p>
                            {added && (
                              <span
                                className="inline-flex h-6 w-6 items-center justify-center rounded-full text-white"
                                style={{
                                  background: `linear-gradient(135deg, ${theme.primaryGradient.start} 0%, ${theme.primaryGradient.end} 100%)`
                                }}
                              >
                                <Check className="h-4 w-4" />
                              </span>
                            )}
                          </div>
                          <p className="mt-1 text-xs" style={{ color: theme.textSecondary }}>
                            {pairing.price}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </section>
            )}
          </div>
        </div>

        <div className="sticky bottom-0 border-t border-slate-200 bg-white px-6 py-4 shadow-[0_-4px_12px_rgba(0,0,0,0.05)]">
          <div className="mx-auto flex w-full max-w-3xl flex-col gap-4 sm:flex-row sm:items-center">
            <div className="flex items-center justify-center gap-4 rounded-xl border-2 border-slate-200 px-4 py-2">
              <button
                type="button"
                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                className="flex h-11 w-11 items-center justify-center rounded-md text-slate-600 transition hover:bg-slate-100"
                disabled={quantity === 1}
                aria-label="Decrease quantity"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="min-w-[32px] text-center text-lg font-semibold text-slate-900">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity((prev) => prev + 1)}
                className="flex h-11 w-11 items-center justify-center rounded-md text-slate-600 transition hover:bg-slate-100"
                aria-label="Increase quantity"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <button
              type="button"
              onClick={handleAddToCart}
              className="flex h-14 flex-1 items-center justify-center gap-2 rounded-xl text-base font-semibold text-white shadow-lg transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              style={{
                background: `linear-gradient(135deg, ${theme.primaryGradient.start} 0%, ${theme.primaryGradient.end} 100%)`
              }}
            >
              Add to Cart · <span className={pricePulse ? 'price-pulse' : ''}>{formatPrice(totalPrice)}</span>
            </button>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {lightboxOpen && item.image && (
          <motion.button
            type="button"
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxOpen(false)}
            aria-label="Close image preview"
          >
            <img src={item.image} alt={item.name} className="max-h-[90vh] w-auto rounded-2xl" />
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
