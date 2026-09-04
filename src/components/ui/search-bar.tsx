import * as React from "react";
import { Input } from "@/components/ui/input";

export interface SearchBarProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export function SearchBar({ className, ...props }: SearchBarProps) {
  return (
    <Input
      type="search"
      placeholder="Search documentation..."
      className={`h-10 rounded-xl border border-border bg-background px-4 font-medium text-foreground shadow-sm placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring ${className || ""}`}
      {...props}
    />
  );
}
