import * as React from "react";
import { Input } from "@/components/ui/input";

export interface SearchBarProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export function SearchBar({ className, ...props }: SearchBarProps) {
  return (
    <Input
      type="search"
      placeholder="Search documentation..."
      className={`h-10 rounded-xl border border-[#27272a] bg-[#171717] px-4 font-medium text-[#f4f4f5] shadow-sm placeholder:text-[#d1d1d7] focus-visible:border-[#3f3f46] focus-visible:ring-1 focus-visible:ring-[#3f3f46] ${className || ""}`}
      {...props}
    />
  );
}
