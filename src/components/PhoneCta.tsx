"use client";

import {useState} from "react";
import {PhoneInput, defaultCountries} from "react-international-phone";
import {parsePhoneNumber} from "libphonenumber-js";

export default function PhoneCta() {
    const [value, setValue] = useState("+61");
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // ✅ validation
    const isValid = (() => {
        try {
            const p = parsePhoneNumber(value);
            return p?.isValid() ?? false;
        } catch {
            return false;
        }
    })();

    // ✅ button click
    async function handleClick() {
        setError(null);
        if (!isValid) {
            setError("Please enter a valid phone number.");
            return;
        }
        setBusy(true);

        // TODO: hook to your API
        setTimeout(() => {
            setBusy(false);
            alert(`Demo started for ${value}`);
        }, 800);
    }

    return (
        <div className="mt-8 flex justify-center">
            <div
                className="relative max-w-lg w-full flex items-center gap-2 rounded-full bg-white px-3 py-2 shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
                <div className="flex-1">
                    <PhoneInput
                        defaultCountry="au"
                        value={value}
                        onChange={setValue}
                        countries={defaultCountries}
                        className="w-full"
                        inputStyle={{
                            border: "none",
                            outline: "none",
                            width: "100%",
                            background: "transparent",
                            fontSize: "16px",
                        }}
                        placeholder="Enter number"
                    />
                </div>

                <button
                    onClick={handleClick}
                    disabled={!isValid || busy}
                    className="flex-shrink-0 rounded-md bg-black px-5 py-2 text-white disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {busy ? "Starting..." : "Try Ringg"}
                </button>
            </div>
        </div>
    );
}