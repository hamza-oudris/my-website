"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShoppingBag, Minus, Plus, X, ArrowRight } from "lucide-react";
import { useCart } from "@/context/cart";

export default function CartPage() {
  const { items, total, count, remove, increment, decrement, clear } = useCart();
  const router = useRouter();

  const nameRef  = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLInputElement>(null);
  const cityRef  = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLSelectElement>(null);

  function handlePlaceOrder(e: React.FormEvent) {
    e.preventDefault();
    clear();
    router.push("/cart/success");
  }

  if (items.length === 0 && count === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 text-center px-6 pt-16">
        <ShoppingBag size={48} className="text-[var(--text-muted)]" />
        <h1 className="font-[family-name:var(--font-cormorant)] text-4xl font-light italic text-[var(--text-primary)]">
          Your bag is empty
        </h1>
        <p className="text-sm text-[var(--text-secondary)] max-w-sm">
          Looks like you haven&apos;t added anything yet. Explore the collection.
        </p>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 px-8 py-4 text-xs tracking-widest uppercase bg-[var(--gold-primary)] text-black hover:bg-[var(--gold-muted)] transition-colors duration-300 font-medium"
        >
          Shop Now <ArrowRight size={14} />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 pt-28 pb-24">
      <h1 className="font-[family-name:var(--font-cormorant)] text-5xl font-light italic text-[var(--text-primary)] mb-12">
        Your Bag
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          {items.map((item) => (
            <div
              key={item.product.id + item.selectedSize}
              className="flex gap-6 pb-6 border-b border-[var(--border-default)] animate-fade-up"
            >
              {/* Image */}
              <Link href={`/shop/${item.product.slug}`} className="relative w-24 h-32 shrink-0 bg-[var(--bg-elevated)] overflow-hidden">
                <Image
                  src={item.product.images[0]}
                  alt={item.product.name}
                  fill
                  sizes="96px"
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              </Link>

              {/* Info */}
              <div className="flex-1 flex flex-col justify-between min-w-0">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <Link href={`/shop/${item.product.slug}`}>
                      <h3 className="font-[family-name:var(--font-cormorant)] text-xl font-medium italic hover:text-[var(--gold-primary)] transition-colors">
                        {item.product.name}
                      </h3>
                    </Link>
                    <p className="text-xs tracking-widest uppercase text-[var(--text-secondary)] mt-1">
                      {item.product.category} · Size {item.selectedSize}
                    </p>
                  </div>
                  <button
                    onClick={() => remove(item.product.id, item.selectedSize)}
                    aria-label="Remove"
                    className="text-[var(--text-muted)] hover:text-[var(--error)] transition-colors shrink-0"
                  >
                    <X size={16} />
                  </button>
                </div>

                <div className="flex items-center justify-between mt-4">
                  {/* Qty stepper */}
                  <div className="flex items-center border border-[var(--border-default)] hover:border-[var(--border-gold)] transition-colors duration-300">
                    <button
                      onClick={() => decrement(item.product.id, item.selectedSize)}
                      aria-label="Decrease"
                      className="w-8 h-8 flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                    >
                      <Minus size={12} />
                    </button>
                    <span className="w-8 text-center text-sm">{item.quantity}</span>
                    <button
                      onClick={() => increment(item.product.id, item.selectedSize)}
                      aria-label="Increase"
                      className="w-8 h-8 flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                    >
                      <Plus size={12} />
                    </button>
                  </div>

                  <p className="font-[family-name:var(--font-geist-mono)] text-base text-[var(--text-primary)]">
                    £{(item.product.price * item.quantity).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary + Checkout Form */}
        <div className="lg:col-span-1">
          <div className="bg-[var(--bg-surface)] border border-[var(--border-default)] p-6 sticky top-24">
            <h2 className="text-xs tracking-widest uppercase text-[var(--text-secondary)] mb-6">
              Order Summary
            </h2>

            <div className="space-y-3 mb-6 pb-6 border-b border-[var(--border-default)]">
              <div className="flex justify-between text-sm">
                <span className="text-[var(--text-secondary)]">Subtotal</span>
                <span className="font-[family-name:var(--font-geist-mono)]">£{total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[var(--text-secondary)]">Shipping</span>
                <span className="text-[var(--success)] font-medium">Free</span>
              </div>
            </div>

            <div className="flex justify-between items-baseline mb-8">
              <span className="text-xs tracking-widest uppercase text-[var(--text-secondary)]">Total</span>
              <span className="font-[family-name:var(--font-geist-mono)] text-2xl text-[var(--gold-primary)]">
                £{total.toLocaleString()}
              </span>
            </div>

            {/* Checkout form */}
            <form onSubmit={handlePlaceOrder} className="space-y-4">
              <h3 className="text-xs tracking-widest uppercase text-[var(--text-muted)] mb-2">
                Delivery Details
              </h3>

              {[
                { ref: nameRef,    placeholder: "Full Name",      type: "text",  required: true },
                { ref: emailRef,   placeholder: "Email Address",  type: "email", required: true },
                { ref: addressRef, placeholder: "Street Address", type: "text",  required: true },
                { ref: cityRef,    placeholder: "City",           type: "text",  required: true },
              ].map(({ ref, placeholder, type, required }) => (
                <input
                  key={placeholder}
                  ref={ref}
                  type={type}
                  placeholder={placeholder}
                  required={required}
                  className="w-full bg-[var(--bg-elevated)] border border-[var(--border-default)] focus:border-[var(--border-gold)] outline-none px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] transition-colors duration-300"
                />
              ))}

              <select
                ref={countryRef}
                required
                className="w-full bg-[var(--bg-elevated)] border border-[var(--border-default)] focus:border-[var(--border-gold)] outline-none px-4 py-3 text-sm text-[var(--text-secondary)] transition-colors duration-300"
              >
                <option value="">Select Country</option>
                {["United Kingdom", "France", "Germany", "Italy", "Spain", "United States", "Japan"].map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>

              <button
                type="submit"
                className="w-full py-4 text-xs tracking-widest uppercase bg-[var(--gold-primary)] text-black hover:bg-[var(--gold-muted)] transition-colors duration-300 font-medium mt-2"
              >
                Place Order
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
