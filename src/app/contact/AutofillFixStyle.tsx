"use client";

/** Injects a tiny global style so Chrome/Safari autofill doesn't paint yellow
 *  and never shows placeholder over typed/autofilled text.
 *  Use this if you don't keep a globals.css.
 */
export default function AutofillFixStyle() {
    return (
        <style jsx global>{`
      input:-webkit-autofill, textarea:-webkit-autofill {
        -webkit-text-fill-color: #e5e7eb;
        transition: background-color 9999s ease-in-out 0s;
      }
      input:-webkit-autofill:focus, textarea:-webkit-autofill:focus {
        -webkit-text-fill-color: #ffffff;
      }
      input:-webkit-autofill::placeholder, textarea:-webkit-autofill::placeholder {
        color: transparent;
      }
    `}</style>
    );
}