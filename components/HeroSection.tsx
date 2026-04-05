"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { owner } from "@/data/portfolio";

function scrollToContact() {
  document.querySelector("#contact")?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

export function HeroSection() {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-32"
    >
      <div className="relative mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
        
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="order-2 lg:order-1"
        >
          <p className="mb-6 text-[11px] tracking-[0.3em] text-gray-400 uppercase">
            {owner.tagline}
          </p>

          <h1 className="font-display text-6xl font-light leading-none tracking-tight text-gray-900 sm:text-7xl lg:text-8xl">
            {owner.name}
          </h1>

          <h2 className="mt-3 text-base font-light tracking-widest text-gray-400 uppercase">
            {owner.title}
          </h2>

          <div className="mt-6 h-px w-12 bg-gray-200" />

          <p className="mt-6 max-w-sm text-sm leading-relaxed text-gray-400">
            {owner.bio}
          </p>

          <button
            type="button"
            onClick={scrollToContact}
            className="mt-10 border border-gray-900 px-8 py-3 text-xs tracking-[0.15em] uppercase text-gray-900 transition-all hover:bg-gray-900 hover:text-white"
          >
            Contact
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="relative order-1 flex justify-center lg:order-2 lg:justify-end"
        >
          <div className="relative h-[480px] w-[380px]">
            <div className="absolute -top-4 -left-4 h-full w-full border border-gray-100" />
            <div className="relative h-full w-full overflow-hidden bg-gray-50">
              <Image
                src={owner.avatarUrl}
                alt={`${owner.name}, ${owner.title}`}
                width={380}
                height={480}
                className="h-full w-full object-cover grayscale"
                priority
                sizes="(max-width: 1024px) 85vw, 380px"
              />
            </div>
            <p className="absolute bottom-4 right-4 text-[10px] tracking-[0.25em] text-white uppercase opacity-60">
              SH/J/REE
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}