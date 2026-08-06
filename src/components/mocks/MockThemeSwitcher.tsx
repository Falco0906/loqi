"use client";

import React from "react";
import useSiteTheme from "@/hooks/useSiteTheme";

export default function MockThemeSwitcher({
  dark,
  light,
}: {
  dark: React.ReactNode;
  light: React.ReactNode;
}) {
  const theme = useSiteTheme();
  return theme === "light" ? light : dark;
}