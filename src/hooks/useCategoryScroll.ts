import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

interface UseCategoryScrollOptions {
  categoryIds: string[];
  offset?: string;
}

export function useCategoryScroll({ categoryIds, offset = '-30% 0px -60% 0px' }: UseCategoryScrollOptions) {
  const sectionRefs = useRef(new Map<string, HTMLElement>());
  const [activeId, setActiveId] = useState<string | null>(categoryIds[0] ?? null);
  const debounceRef = useRef<number | null>(null);

  const registerSectionRef = useCallback((id: string) => {
    return (node: HTMLElement | null) => {
      if (!node) {
        sectionRefs.current.delete(id);
        return;
      }
      sectionRefs.current.set(id, node);
    };
  }, []);

  useEffect(() => {
    if (!categoryIds.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => (a.boundingClientRect.top > b.boundingClientRect.top ? 1 : -1));

        if (!visible.length) return;
        const nextId = visible[0].target.getAttribute('data-category-id');
        if (!nextId) return;
        if (debounceRef.current) window.clearTimeout(debounceRef.current);
        debounceRef.current = window.setTimeout(() => {
          setActiveId(nextId);
        }, 150);
      },
      { rootMargin: offset, threshold: [0, 0.5, 1] }
    );

    sectionRefs.current.forEach((node) => observer.observe(node));

    return () => {
      if (debounceRef.current) window.clearTimeout(debounceRef.current);
      observer.disconnect();
    };
  }, [categoryIds, offset]);

  const scrollToCategory = useCallback((id: string) => {
    const node = sectionRefs.current.get(id);
    if (!node) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    node.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
  }, []);

  const isActive = useCallback(
    (id: string) => {
      return activeId === id;
    },
    [activeId]
  );

  return useMemo(
    () => ({
      activeId,
      isActive,
      registerSectionRef,
      scrollToCategory
    }),
    [activeId, isActive, registerSectionRef, scrollToCategory]
  );
}
