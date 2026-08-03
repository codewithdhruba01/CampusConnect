import * as React from "react"
import { Input } from "@/components/ui/input"

export interface SearchBarProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export function SearchBar({ className, ...props }: SearchBarProps) {
  return (
    <Input 
      type="search"
      placeholder="Search documentation..."
      className={`h-10 px-4 bg-[#171717] border border-[#27272a] text-[#f4f4f5] placeholder:text-[#d1d1d7] rounded-xl focus-visible:ring-1 focus-visible:ring-[#3f3f46] focus-visible:border-[#3f3f46] shadow-sm font-medium ${className || ''}`}
      {...props}
    />
  )
}
