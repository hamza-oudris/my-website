"use client";

export default function NewsletterForm() {
  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="flex border border-[var(--border-default)] focus-within:border-[var(--border-gold)] transition-colors duration-300"
    >
      <input
        type="email"
        placeholder="Your email"
        className="flex-1 bg-transparent px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none"
      />
      <button
        type="submit"
        className="px-4 py-3 text-xs tracking-widest uppercase text-[var(--gold-primary)] hover:bg-[var(--gold-subtle)] transition-colors duration-300 border-l border-[var(--border-default)]"
      >
        Join
      </button>
    </form>
  );
}
