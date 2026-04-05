"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Eye, Heart, ExternalLink } from "lucide-react";
import type { ProjectCardData } from "@/types";

type ProjectCardProps = {
  project: ProjectCardData;
  index: number;
};

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: index * 0.04 }}
      className="group flex flex-col overflow-hidden bg-white border border-gray-100 transition duration-300 hover:-translate-y-1"
    >
      <div className="relative aspect-[4/3] w-full bg-gray-50 overflow-hidden">
        <Image
          src={project.imageUrl}
          alt={project.title}
          fill
          className="object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {project.featured && (
          <span className="absolute top-3 right-3 text-[10px] tracking-[0.2em] uppercase bg-white/90 text-gray-600 px-2 py-1">
            Featured
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="text-[10px] tracking-[0.25em] text-gray-300 uppercase mb-3">
          {project.category}
        </p>
        <h3 className="font-display text-xl font-light text-gray-900 leading-snug">
          {project.title}
        </h3>
        <div className="mt-3 h-px w-6 bg-gray-100 transition-all duration-300 group-hover:w-12" />

        <div className="mt-4 flex items-center gap-4 text-xs text-gray-300">
          <span className="inline-flex items-center gap-1">
            <Eye className="h-3 w-3" />
            {project.views}
          </span>
          <span className="inline-flex items-center gap-1">
            <Heart className="h-3 w-3" />
            {project.appreciations}
          </span>
        </div>

        {project.behanceUrl && (
  <a
  href={project.behanceUrl}
  target="_blank"
  rel="noopener noreferrer"
  className="mt-4 inline-flex items-center gap-1 text-[11px] tracking-[0.15em] uppercase text-gray-400 transition-colors hover:text-gray-900"
>
  View on Behance
  <ExternalLink className="h-3 w-3" />
</a>
)}
      </div>
    </motion.article>
  );
}