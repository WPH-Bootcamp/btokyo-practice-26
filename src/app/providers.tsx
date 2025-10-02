"use client";
import * as Tooltip from "@radix-ui/react-tooltip";
import React from "react";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return <Tooltip.Provider delayDuration={200}>{children}</Tooltip.Provider>;
}
