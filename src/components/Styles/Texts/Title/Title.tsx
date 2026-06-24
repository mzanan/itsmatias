import { ReactNode } from "react";

type TitleProps = {
    children: ReactNode;
    variant?: "display" | "heading";
    centered?: boolean;
    href?: string;
    gradientClassName?: string;
    showUnderline?: boolean;
    as?: "h1" | "h2";
    wrapContent?: boolean;
    className?: string;
};

const variantSize: Record<NonNullable<TitleProps["variant"]>, string> = {
    display: "text-display",
    heading: "text-heading",
};

export const Title = ({
    children,
    variant = "heading",
    centered = false,
    href,
    gradientClassName = "gradient-text",
    showUnderline = true,
    as: HeadingTag = "h2",
    wrapContent = true,
    className = ""
}: TitleProps) => {
    const underlineClassName = `h-1 w-12 rounded-full bg-[image:linear-gradient(to_right,var(--brand-from),var(--brand-via),var(--brand-to))] ${centered ? "mx-auto" : ""}`;
    const isString = typeof children === "string";
    const shouldWrap = wrapContent && isString;

    const content = href ? (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={`${gradientClassName} hover:opacity-80 transition-opacity cursor-pointer`}
        >
            {children}
        </a>
    ) : shouldWrap ? (
        <span className={gradientClassName}>{children}</span>
    ) : (
        children
    );

return (
    <div className={className}>
        <HeadingTag className={`${variantSize[variant]} font-display font-semibold tracking-tight text-balance ${showUnderline ? "mb-4" : ""} ${centered ? "text-center" : ""}`}>
            {content}
        </HeadingTag>
        {showUnderline && <div className={underlineClassName} />}
    </div>
);
};

