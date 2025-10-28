"use client";
import {HTMLInputTypeAttribute} from "react";

type Props = {
    id: string;
    label: string;
    name?: string;
    type?: HTMLInputTypeAttribute;
    autoComplete?: string;
    required?: boolean;
    defaultValue?: string;
};

export default function InputField({
                                       id, label, name = id, type = "text", autoComplete, required, defaultValue
                                   }: Props) {
    return (
        <div className="relative">
            <input
                id={id}
                name={name}
                type={type}
                autoComplete={autoComplete}
                required={required}
                defaultValue={defaultValue}
                placeholder=" "
                className="peer w-full bg-transparent border border-white/10 rounded-xl px-4 pt-5 pb-2
                   outline-none focus:border-sky-500 transition-all duration-300 placeholder-transparent"
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