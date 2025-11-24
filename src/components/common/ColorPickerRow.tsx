interface ColorPickerRowProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

export function ColorPickerRow({ label, value, onChange }: ColorPickerRowProps) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-slate-100 bg-white px-3 py-2 shadow-sm">
      <div>
        <p className="text-sm font-medium text-slate-800">{label}</p>
        <p className="text-xs text-slate-500">Apply across the preview</p>
      </div>
      <input
        aria-label={label}
        type="color"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-10 w-16 cursor-pointer rounded-md border border-slate-200"
      />
    </div>
  );
}
