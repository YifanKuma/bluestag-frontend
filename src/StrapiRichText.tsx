"use client";

import {BlocksRenderer, type BlocksContent} from "@strapi/blocks-react-renderer";
import {JSX} from "react";

type StrapiRichTextProps = {
    content: BlocksContent | null | undefined;
};

export default function StrapiRichText({content}: StrapiRichTextProps) {
    if (!content) return null;

    return (
        <BlocksRenderer
            content={content}
            blocks={{
                paragraph: ({children}) => (
                    <p className="text-white/70 mb-3 leading-relaxed">
                        {children}
                    </p>
                ),

                heading: ({children, level}) => {
                    const Tag = `h${level}` as keyof JSX.IntrinsicElements;
                    return <Tag className="font-bold my-3">{children}</Tag>;
                },
            }}
        />
    );
}
