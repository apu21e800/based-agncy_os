import clsx from 'classnames';

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  variant?: 'success' | 'error';
}

interface ToastStackProps {
  toasts: ToastMessage[];
}

export function ToastStack({ toasts }: ToastStackProps) {
  if (!toasts.length) return null;
  return (
    <div className="pointer-events-none fixed top-4 left-1/2 z-50 flex w-full max-w-md -translate-x-1/2 flex-col gap-3 px-4" aria-live="polite">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={clsx(
            'pointer-events-auto rounded-2xl border px-4 py-3 shadow-lg backdrop-blur-sm transition-all',
            toast.variant === 'error'
              ? 'border-rose-200 bg-rose-50 text-rose-800'
              : 'border-emerald-200 bg-white/95 text-slate-900'
          )}
        >
          <p className="text-sm font-semibold">{toast.title}</p>
          {toast.description && <p className="mt-1 text-xs text-slate-600">{toast.description}</p>}
        </div>
      ))}
    </div>
  );
}
