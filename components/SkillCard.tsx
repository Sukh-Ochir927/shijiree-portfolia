"use client";

import { motion } from "framer-motion";

interface Skill {
  id: number;
  title: string;
  description: string;
  icon: string;
}

interface SkillCardProps {
  skill: Skill;
  layout: "grid" | "list";
  index: number;
}

export function SkillCard({ skill, layout, index }: SkillCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      className="bg-white p-8 group"
    >
      <p className="text-[10px] tracking-[0.25em] text-gray-300 uppercase mb-6">
        0{index + 1}
      </p>
      <h3 className="font-display text-2xl font-light text-gray-900 mb-3">
        {skill.title}
      </h3>
      <div className="h-px w-6 bg-gray-200 mb-4 transition-all group-hover:w-12" />
      <p className="text-sm font-light leading-relaxed text-gray-400">
        {skill.description}
      </p>
    </motion.div>
  );
}