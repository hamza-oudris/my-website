"use client"

import { CartProvider } from "@/context/cart"
import type { ReactNode } from "react"

export default function Providers({ children }: { children: ReactNode }) {
  return <CartProvider>{children}</CartProvider>
}
