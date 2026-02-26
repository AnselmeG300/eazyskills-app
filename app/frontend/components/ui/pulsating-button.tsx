import React from "react";
import { cn } from "@/lib/utils";

interface PulsatingButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  pulseColor?: string;
  duration?: string;
}

export const PulsatingButton = React.forwardRef<HTMLButtonElement, PulsatingButtonProps>(
  (
    { className, children, pulseColor = "#0096ff", duration = "1.5s", ...props },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={cn(
          "relative flex cursor-pointer items-center justify-center rounded-lg px-4 py-3 text-center text-primary-foreground",
          className
        )}
        style={
          {
            "--pulse-color": pulseColor,
            "--duration": duration,
          } as React.CSSProperties
        }
        {...props}
      >
        <div className="relative z-10">{children}</div>
        <div className="absolute size-full animate-pulse rounded-lg" />
      </button>
    );
  }
);
PulsatingButton.displayName = "PulsatingButton";
