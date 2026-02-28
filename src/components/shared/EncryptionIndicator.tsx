"use client";

import React from "react";
import { Shield, Lock } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface EncryptionIndicatorProps {
  level: "standard" | "double";
  className?: string;
}

export function EncryptionIndicator({ level, className }: EncryptionIndicatorProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-50 border border-green-200/50 ${className}`}>
            {level === "double" ? (
              <Shield className="w-3.5 h-3.5 text-green-600" />
            ) : (
              <Lock className="w-3.5 h-3.5 text-green-600" />
            )}
            <span className="text-[10px] font-medium text-green-700 uppercase tracking-wider">
              {level === "double" ? "Double Encrypted" : "Encrypted"}
            </span>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-sm max-w-xs">
            {level === "double"
              ? "This content is protected with double encryption. Only you can read it. Even we cannot access your data. It will be automatically deleted after 30 days."
              : "Your content is encrypted end-to-end. Only you can read your entries. We never sell or share your data. No ads, ever."}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
