import { ReactNode } from "react";

type TitleProps = {
    children: ReactNode;
    centered?: boolean;
    href?: string;
    gradientClassName?: string;
    showUnderline?: boolean;
    as?: "h1" | "h2";
    wrapContent?: boolean;
    className?: string;
};

export const Title = ({
    children,
    centered = false,
    href,
    gradientClassName = "gradient-text",
    showUnderline = true,
    as: HeadingTag = "h2",
    wrapContent = true,
    className = ""
}: TitleProps) => {
    const underlineClassName = `h-1 w-12 rounded-full bg-[image:linear-gradient(to_right,var(--brand-from),var(--brand-via),var(--brand-to))] ${centered ? "md:mx-auto" : ""}`;
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
        <HeadingTag className={`text-4xl md:text-6xl font-bold tracking-tight mb-4 ${centered ? "md:text-center" : ""}`}>
            {content}
        </HeadingTag>
        {showUnderline && <div className={underlineClassName} />}
    </div>
);
};

