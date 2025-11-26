import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const iconButtonVariants = cva(
    "flex flex-col items-center gap-2 p-3 rounded-lg transition-colors group",
    {
        variants: {
            variant: {
                default: "hover:bg-primary/10",
                green: "hover:bg-green-500/10",
                blue: "hover:bg-blue-500/10",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
);

const iconWrapperVariants = cva(
    "p-2 rounded-lg transition-colors",
    {
        variants: {
            color: {
                default: "bg-primary/10 group-hover:bg-primary/20 text-primary",
                green: "bg-green-500/10 group-hover:bg-green-500/20 text-green-500",
                blue: "bg-blue-500/10 group-hover:bg-blue-500/20 text-blue-500",
            },
        },
        defaultVariants: {
            color: "default",
        },
    }
);

type IconButtonProps = React.ComponentProps<"button"> &
    VariantProps<typeof iconButtonVariants> & {
        icon: React.ReactNode;
        label: string;
        iconColor?: VariantProps<typeof iconWrapperVariants>["color"];
        iconSize?: "sm" | "md" | "lg";
    };

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
    ({ className, variant, iconColor, icon, label, iconSize = "md", ...props }, ref) => {
        const iconSizeClasses = {
            sm: "h-4 w-4",
            md: "h-6 w-6",
            lg: "h-8 w-8",
        };

        return (
            <button
                ref={ref}
                className={cn(iconButtonVariants({ variant, className }))}
                {...props}
            >
                <div className={cn(iconWrapperVariants({ color: iconColor || variant }))}>
                    <div className={cn(iconSizeClasses[iconSize], "[&>svg]:w-full [&>svg]:h-full")}>
                        {icon}
                    </div>
                </div>
                <span className="text-xs font-medium">{label}</span>
            </button>
        );
    }
);

IconButton.displayName = "IconButton";

