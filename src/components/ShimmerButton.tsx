"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface ShimmerButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

const ShimmerButton: React.FC<ShimmerButtonProps> = ({ children, className, ...props }) => {
  return (
    <button
      {...props}
      className={cn(
        "relative overflow-hidden rounded-full px-6 py-2 text-white font-medium bg-gradient-to-r from-[#8B008B] via-[#4B0082] to-[#3b82f6] shadow-lg",
        "before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/10 before:via-white/60 before:to-white/10 before:animate-shimmer",
        "hover:scale-[1.02] transition-transform duration-200 ease-in-out",
        className
      )}
    >
      <span className="relative z-10">{children}</span>
    </button>
  );
};

export default ShimmerButton;
