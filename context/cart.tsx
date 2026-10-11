"use client";

import {
  createContext,
  useContext,
  useReducer,
  useState,
  ReactNode,
} from "react";
import { Product } from "@/lib/products";

// ─── Types ──────────────────────────────────────────────────────

export type CartItem = {
  product: Product;
  quantity: number;
  selectedSize: string;
};

type CartState = {
  items: CartItem[];
};

type CartAction =
  | { type: "ADD"; product: Product; size: string }
  | { type: "REMOVE"; productId: string; size: string }
  | { type: "INCREMENT"; productId: string; size: string }
  | { type: "DECREMENT"; productId: string; size: string }
  | { type: "CLEAR" };

type CartContextValue = {
  items: CartItem[];
  count: number;
  total: number;
  drawerOpen: boolean;
  setDrawerOpen: (open: boolean) => void;
  add: (product: Product, size: string) => void;
  remove: (productId: string, size: string) => void;
  increment: (productId: string, size: string) => void;
  decrement: (productId: string, size: string) => void;
  clear: () => void;
};

// ─── Reducer ────────────────────────────────────────────────────

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD": {
      const key = action.product.id + "|" + action.size;
      const existing = state.items.find(
        (i) => i.product.id + "|" + i.selectedSize === key
      );
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.product.id + "|" + i.selectedSize === key
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
        };
      }
      return {
        items: [
          ...state.items,
          { product: action.product, quantity: 1, selectedSize: action.size },
        ],
      };
    }

    case "REMOVE": {
      const key = action.productId + "|" + action.size;
      return {
        items: state.items.filter(
          (i) => i.product.id + "|" + i.selectedSize !== key
        ),
      };
    }

    case "INCREMENT": {
      const key = action.productId + "|" + action.size;
      return {
        items: state.items.map((i) =>
          i.product.id + "|" + i.selectedSize === key
            ? { ...i, quantity: i.quantity + 1 }
            : i
        ),
      };
    }

    case "DECREMENT": {
      const key = action.productId + "|" + action.size;
      return {
        items: state.items
          .map((i) =>
            i.product.id + "|" + i.selectedSize === key
              ? { ...i, quantity: i.quantity - 1 }
              : i
          )
          .filter((i) => i.quantity > 0),
      };
    }

    case "CLEAR":
      return { items: [] };

    default:
      return state;
  }
}

// ─── Context ────────────────────────────────────────────────────

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });
  const [drawerOpen, setDrawerOpen] = useState(false);

  const count = state.items.reduce((sum, i) => sum + i.quantity, 0);
  const total = state.items.reduce(
    (sum, i) => sum + i.product.price * i.quantity,
    0
  );

  const value: CartContextValue = {
    items: state.items,
    count,
    total,
    drawerOpen,
    setDrawerOpen,
    add: (product, size) => dispatch({ type: "ADD", product, size }),
    remove: (productId, size) => dispatch({ type: "REMOVE", productId, size }),
    increment: (productId, size) =>
      dispatch({ type: "INCREMENT", productId, size }),
    decrement: (productId, size) =>
      dispatch({ type: "DECREMENT", productId, size }),
    clear: () => dispatch({ type: "CLEAR" }),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
