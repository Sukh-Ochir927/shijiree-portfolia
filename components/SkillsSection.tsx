"use client";

import { motion } from "framer-motion";
import { skills } from "@/data/portfolio";
import { SkillCard } from "@/components/SkillCard";

export function SkillsSection() {
  return (
    <section
      id="skills"
      className="border-t border-neutral-100 bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-32"
    >
      <div className="mx-auto max-w-6xl">

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-[11px] tracking-[0.3em] text-gray-400 uppercase mb-4">
            What I do
          </p>
          <h2 className="font-display text-5xl font-light leading-none tracking-tight text-gray-900 sm:text-6xl">
            Skills
          </h2>
          <div className="mt-4 h-px w-12 bg-gray-200" />
        </motion.div>

        <div className="mt-16 grid gap-px bg-gray-100 sm:grid-cols-2 lg:grid-cols-3">
          {skills.slice(0, 3).map((skill, i) => (
            <SkillCard key={skill.id} skill={skill} layout="grid" index={i} />
          ))}
        </div>

        <div className="mt-px grid gap-px bg-gray-100 md:grid-cols-2">
          {skills.slice(3).map((skill, i) => (
            <SkillCard
              key={skill.id}
              skill={skill}
              layout="list"
              index={i + 3}
            />
          ))}
        </div>

      </div>
    </section>
  );
}