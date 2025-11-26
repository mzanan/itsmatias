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
    const underlineClassName = `h-1 w-12 bg-linear-to-r from-cyan-400 to-purple-600 rounded-full ${centered ? "mx-auto" : ""}`;
    const isString = typeof children === "string";
    const shouldWrap = wrapContent && isString;
    const isH1 = HeadingTag === "h1";

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

    const headingClassName = isH1
        ? "text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-4 md:mb-6 tracking-tight leading-tight"
        : "text-5xl md:text-6xl font-bold tracking-tight mb-4";

    return (
        <div className={className}>
            <HeadingTag className={headingClassName}>
                {content}
            </HeadingTag>
            {showUnderline && <div className={underlineClassName} />}
        </div>
    );
};

