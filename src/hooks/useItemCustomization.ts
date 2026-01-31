import { useMemo, useState } from 'react';
import { MenuItem, ModifierGroup } from '../state/menuConfig';

function buildInitialSelection(groups: ModifierGroup[] = []) {
  const selected: Record<string, string | string[]> = {};
  groups.forEach((group) => {
    const defaultOption = group.options.find((option) => option.default);
    if (group.required) {
      selected[group.id] = defaultOption?.id ?? '';
    } else {
      selected[group.id] = defaultOption ? [defaultOption.id] : [];
    }
  });
  return selected;
}

export function useItemCustomization(item: MenuItem) {
  const [selectedModifiers, setSelectedModifiers] = useState<Record<string, string | string[]>>(() =>
    buildInitialSelection(item.modifierGroups)
  );
  const [quantity, setQuantity] = useState(1);
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const selectOption = (groupId: string, optionId: string) => {
    setSelectedModifiers((prev) => ({ ...prev, [groupId]: optionId }));
  };

  const toggleOption = (groupId: string, optionId: string) => {
    setSelectedModifiers((prev) => {
      const current = (prev[groupId] as string[]) ?? [];
      if (current.includes(optionId)) {
        return { ...prev, [groupId]: current.filter((id) => id !== optionId) };
      }
      return { ...prev, [groupId]: [...current, optionId] };
    });
  };

  const validate = () => {
    const nextErrors: Record<string, string> = {};
    (item.modifierGroups ?? []).forEach((group) => {
      if (!group.required) return;
      const selection = selectedModifiers[group.id];
      if (!selection || (typeof selection === 'string' && selection.length === 0)) {
        nextErrors[group.id] = `Please select ${group.name.toLowerCase()}.`;
      }
    });
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const resetErrors = (groupId?: string) => {
    if (!groupId) {
      setErrors({});
      return;
    }
    setErrors((prev) => {
      const next = { ...prev };
      delete next[groupId];
      return next;
    });
  };

  const modifiers = useMemo(() => item.modifierGroups ?? [], [item.modifierGroups]);

  return {
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
  };
}
