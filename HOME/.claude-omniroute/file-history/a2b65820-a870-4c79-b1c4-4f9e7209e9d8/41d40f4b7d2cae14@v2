"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

type AccordionItem = {
  title: string;
  content: string | string[];
};

type Props = {
  items: AccordionItem[];
};

export default function Accordion({ items }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="divide-y divide-[var(--border-default)]">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={i}>
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="w-full flex items-center justify-between py-4 text-left group"
              aria-expanded={isOpen}
            >
              <span className="text-xs tracking-widest uppercase text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors duration-300">
                {item.title}
              </span>
              <ChevronDown
                size={14}
                className={`text-[var(--text-muted)] transition-transform duration-300 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Animated content */}
            <div
              className={`overflow-hidden transition-[max-height] duration-300 ease-in-out ${
                isOpen ? "max-h-96" : "max-h-0"
              }`}
            >
              <div className="pb-4">
                {Array.isArray(item.content) ? (
                  <ul className="space-y-2">
                    {item.content.map((line, j) => (
                      <li
                        key={j}
                        className="text-sm text-[var(--text-secondary)] flex items-start gap-2"
                      >
                        <span className="text-[var(--gold-muted)] mt-1.5 text-[6px]">●</span>
                        {line}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    {item.content}
                  </p>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
