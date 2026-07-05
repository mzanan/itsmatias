"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type Variant = "outline" | "solid" | "ghost";
type Size = "sm" | "md" | "lg";

type CommonProps = {
  variant?: Variant;
  size?: Size;
  Icon?: React.ComponentType<{ className?: string }>;
  iconPosition?: "left" | "right";
  iconClassName?: string;
  className?: string;
  children?: React.ReactNode;
};

type ButtonElProps = CommonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> & {
    as?: "button";
    href?: never;
  };

type AnchorElProps = CommonProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonProps> & {
    as: "a";
    href: string;
    type?: never;
    disabled?: never;
  };

type SpanElProps = CommonProps &
  Omit<React.HTMLAttributes<HTMLSpanElement>, keyof CommonProps> & {
    as: "span";
    href?: never;
    type?: never;
    disabled?: never;
  };

type PillProps = ButtonElProps | AnchorElProps | SpanElProps;

const variantClasses: Record<Variant, string> = {
  outline:
    "border border-white/30 bg-white/5 text-white backdrop-blur-sm group-hover:bg-white/10 group-hover:border-white/60 hover:bg-white/10 hover:border-white/60",
  solid:
    "bg-white text-black shadow-lg hover:shadow-xl group-hover:shadow-xl",
  ghost:
    "border border-white/10 bg-white/5 text-white/90 backdrop-blur-sm group-hover:bg-white/10 group-hover:text-white hover:bg-white/10 hover:text-white",
};

const sizeClasses: Record<Size, string> = {
  sm: "px-4 py-1.5 text-xs",
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

const iconSize: Record<Size, string> = {
  sm: "h-3 w-3",
  md: "h-3.5 w-3.5",
  lg: "h-4 w-4",
};

const base =
  "group inline-flex items-center gap-2 rounded-full font-medium transition-all whitespace-nowrap";

const interactive =
  "active:scale-95 disabled:opacity-60 disabled:pointer-events-none";

export const Pill = (props: PillProps) => {
  const {
    as = "button",
    variant = "outline",
    size = "md",
    Icon,
    iconPosition = "right",
    iconClassName,
    className,
    children,
    ...rest
  } = props;

  const classes = cn(
    base,
    variantClasses[variant],
    sizeClasses[size],
    as !== "span" && interactive,
    className,
  );
  const icon = Icon ? (
    <Icon
      className={cn(
        iconSize[size],
        iconPosition === "right" && "transition-transform group-hover:translate-x-1",
        iconClassName,
      )}
    />
  ) : null;
  const leading = iconPosition === "left" ? icon : null;
  const trailing = iconPosition === "right" ? icon : null;

  if (as === "a") {
    return (
      <a {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)} className={classes}>
        {leading}
        {children}
        {trailing}
      </a>
    );
  }

  if (as === "span") {
    return (
      <span {...(rest as React.HTMLAttributes<HTMLSpanElement>)} className={classes}>
        {leading}
        {children}
        {trailing}
      </span>
    );
  }

  const buttonRest = rest as React.ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button type={buttonRest.type ?? "button"} {...buttonRest} className={classes}>
      {leading}
      {children}
      {trailing}
    </button>
  );
};
