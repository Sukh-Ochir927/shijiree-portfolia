"use client";

import { motion } from "framer-motion";
import { testimonials } from "@/data/portfolio";
import type { Testimonial } from "@/types";

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function TestimonialCard({ item, index }: { item: Testimonial; index: number }) {
  const stars = "★".repeat(Math.min(5, Math.max(0, item.rating)));

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.45, delay: index * 0.05 }}
      className="flex h-full flex-col rounded-2xl border border-neutral-200/80 bg-white p-6 shadow-sm"
    >
      <p className="text-sm leading-relaxed text-neutral-700">{item.quote}</p>
      <div className="mt-6 flex items-center gap-3 border-t border-neutral-100 pt-5">
        <div
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-neutral-200 bg-gradient-to-br from-teal/20 to-coral/20 text-sm font-bold text-charcoal"
          aria-hidden
        >
          {initials(item.name)}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate font-semibold text-charcoal">{item.name}</p>
          <p className="truncate text-xs text-neutral-500">{item.role}</p>
          <p
            className="mt-1 text-sm text-yellow"
            aria-label={`${item.rating} out of 5 stars`}
          >
            {stars}
          </p>
        </div>
      </div>
    </motion.article>
  );
}

export function TestimonialSection() {
  return (
    <section
      id="testimonials"
      className="bg-card/50 px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-display text-3xl font-bold text-charcoal sm:text-4xl"
        >
          Testimonial
        </motion.h2>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((item, i) => (
            <TestimonialCard key={item.id} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
