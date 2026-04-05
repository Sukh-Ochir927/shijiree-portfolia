"use client";

import { motion } from "framer-motion";
import { clients } from "@/data/portfolio";

export function LogoBar() {
  const doubled = [...clients, ...clients];

  return (
    <section
      id="clients"
      aria-label="Clients"
      className="border-y border-neutral-100 bg-white py-12 sm:py-16"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="hidden flex-wrap items-center justify-center gap-x-14 gap-y-8 md:flex"
        >
          {clients.map((client) => (
            <div
              key={client.name}
              className="flex h-10 min-w-[5rem] items-center justify-center grayscale transition-all duration-300 hover:grayscale-0"
            >
              <span className="font-display text-lg font-semibold tracking-tight text-neutral-400 transition hover:text-charcoal">
                {client.logoText}
              </span>
            </div>
          ))}
        </motion.div>

        <div className="relative overflow-hidden md:hidden">
          <motion.div
            className="flex w-max gap-12 pr-12"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              duration: 28,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {doubled.map((client, i) => (
              <div
                key={`${client.name}-${i}`}
                className="flex h-10 w-24 shrink-0 items-center justify-center grayscale"
              >
                <span className="font-display text-base font-semibold text-neutral-400">
                  {client.logoText}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
