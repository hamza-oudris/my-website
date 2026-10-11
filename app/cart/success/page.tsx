import Link from "next/link";

export const metadata = {
  title: "Order Confirmed — MAISON NOIR",
};

export default function SuccessPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center pt-16">
      {/* Gold checkmark */}
      <div className="w-20 h-20 rounded-full border-2 border-[var(--gold-primary)] flex items-center justify-center mb-8 animate-fade-up">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-8 h-8 text-[var(--gold-primary)]"
        >
          <path d="M20 6L9 17l-5-5" />
        </svg>
      </div>

      <p className="text-xs tracking-[0.4em] uppercase text-[var(--gold-primary)] mb-4 animate-fade-up delay-100">
        Order Confirmed
      </p>

      <h1 className="font-[family-name:var(--font-cormorant)] text-5xl md:text-6xl font-light italic text-[var(--text-primary)] mb-6 animate-fade-up delay-200">
        Thank You
      </h1>

      <p className="text-sm text-[var(--text-secondary)] max-w-md mb-10 leading-relaxed animate-fade-up delay-300">
        Your order has been received and is being prepared with care. You will
        receive a confirmation email shortly.
      </p>

      <Link
        href="/shop"
        className="inline-flex items-center gap-2 px-8 py-4 text-xs tracking-widest uppercase border border-[var(--border-gold)] text-[var(--gold-primary)] hover:bg-[var(--gold-subtle)] transition-colors duration-300 animate-fade-up delay-400"
      >
        Continue Shopping
      </Link>
    </div>
  );
}
