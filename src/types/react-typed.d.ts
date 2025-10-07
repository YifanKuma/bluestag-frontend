// src/types/react-typed.d.ts
declare module "react-typed" {
    import * as React from "react";

    export interface TypedProps {
        strings: string[];
        typeSpeed?: number;
        backSpeed?: number;
        startDelay?: number;
        backDelay?: number;
        loop?: boolean;
        smartBackspace?: boolean;
        shuffle?: boolean;
        fadeOut?: boolean;
        fadeOutClass?: string;
        fadeOutDelay?: number;
        showCursor?: boolean;
        cursorChar?: string;
        attr?: string;
        bindInputFocusEvents?: boolean;
        contentType?: "html" | "null";
        onBegin?: () => void;
        onComplete?: () => void;
        preStringTyped?: (arrayPos: number) => void;
        onStringTyped?: (arrayPos: number) => void;
        onLastStringBackspaced?: () => void;
        onTypingPaused?: (arrayPos: number) => void;
        onTypingResumed?: (arrayPos: number) => void;
        onReset?: () => void;
        onStop?: (arrayPos: number) => void;
        onStart?: (arrayPos: number) => void;
        onDestroy?: () => void;
        className?: string;
    }

    // expose both named and default to avoid import-form issues
    export const Typed: React.ComponentType<TypedProps>;
    const DefaultTyped: React.ComponentType<TypedProps>;
    export default DefaultTyped;
}