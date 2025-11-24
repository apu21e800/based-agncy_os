interface Step {
  id: number;
  label: string;
  completed: boolean;
  active?: boolean;
  hint?: string;
}

interface StepperProps {
  steps: Step[];
}

export function Stepper({ steps }: StepperProps) {
  return (
    <ol className="flex items-center gap-3 text-sm text-slate-600">
      {steps.map((step, index) => (
        <li key={step.id} className="flex items-center gap-2">
          <span
            className={`flex h-7 w-7 items-center justify-center rounded-full border text-xs font-semibold ${
              step.completed || step.active
                ? 'border-accent bg-orange-50 text-orange-700'
                : 'border-slate-300 bg-white text-slate-500'
            }`}
          >
            {step.completed ? '✓' : step.id}
          </span>
          <div>
            <p className={`font-medium ${step.active ? 'text-slate-900' : 'text-slate-600'}`}>{step.label}</p>
            {step.hint && <p className="text-xs text-slate-500">{step.hint}</p>}
          </div>
          {index < steps.length - 1 && <span className="mx-2 text-slate-300">›</span>}
        </li>
      ))}
    </ol>
  );
}
