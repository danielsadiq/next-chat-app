"use client"

import * as React from "react"
import { Eye, EyeOff } from "lucide-react"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export interface PasswordInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, ...props }, ref) => {
    const [show, setShow] = React.useState(false)

    return (
      <div className="relative">
        <Input
          type={show ? "text" : "password"}
          className={cn("pr-10", className)}
          ref={ref}
          {...props}
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => setShow((prev) => !prev)}
          className="absolute right-1 top-1/2 -translate-y-1/2 hover:bg-transparent"
          tabIndex={-1}
        >
          {show ? (
            <EyeOff className="h-4 w-4 text-muted-foreground" />
          ) : (
            <Eye className="h-4 w-4 text-muted-foreground" />
          )}
        </Button>
      </div>
    )
  }
)
PasswordInput.displayName = "PasswordInput"
