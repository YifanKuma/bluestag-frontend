"use client";

type Props = {
    id: string;
    label: string;
    name?: string;
    rows?: number;
    required?: boolean;
    defaultValue?: string;
};

export default function TextareaField({
                                          id, label, name = id, rows = 4, required, defaultValue
                                      }: Props) {
    return (
        <div className="relative">
      <textarea
          id={id}
          name={name}
          rows={rows}
          required={required}
          defaultValue={defaultValue}
          autoComplete="off"
          placeholder=" "
          className="peer w-full bg-transparent border border-white/10 rounded-xl px-4 pt-5 pb-2
                   outline-none focus:border-sky-500 transition-all duration-300 placeholder-transparent resize-none"
          aria-required={required ? "true" : undefined}
      />
            <label
                htmlFor={id}
                className="pointer-events-none absolute left-4 top-3 text-sm text-gray-400 transition-all duration-200
                   peer-focus:top-2 peer-focus:text-xs peer-focus:text-sky-400
                   peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs"
            >
                {label}
            </label>
        </div>
    );
}