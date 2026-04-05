"use client";

import {
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Settings } from "lucide-react";
import { ProjectCard } from "@/components/ProjectCard";
import { WorkAdmin } from "@/components/WorkAdmin";
import type { DbProjectRow, ProjectCardData } from "@/types";
import { normalizeProject } from "@/types";

const FILTER_TABS = [
  "All",
  "Package Design",
  "Brand Identity",
  "Logo Design",
  "Poster Design",
  "Social Design",
] as const;

function GallerySkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="animate-pulse overflow-hidden rounded-lg border border-neutral-100 bg-white shadow-sm"
        >
          <div className="aspect-[4/3] bg-neutral-200" />
          <div className="space-y-3 p-4">
            <div className="h-3 w-20 rounded bg-neutral-200" />
            <div className="h-5 w-4/5 max-w-[200px] rounded bg-neutral-200" />
            <div className="h-3 w-32 rounded bg-neutral-200" />
          </div>
        </div>
      ))}
    </div>
  );
}

function GalleryContent() {
  const searchParams = useSearchParams();
  const showAdmin = searchParams.get("admin") === "true";

  const [projects, setProjects] = useState<ProjectCardData[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<(typeof FILTER_TABS)[number]>("All");
  const [adminOpen, setAdminOpen] = useState(false);

  const loadProjects = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/projects", { cache: "no-store" });
      const rows = (await res.json()) as DbProjectRow[];
      setProjects(rows.map(normalizeProject));
    } catch {
      setProjects([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  useEffect(() => {
    const onUpdate = () => {
      loadProjects();
    };
    window.addEventListener("projects-updated", onUpdate);
    return () => window.removeEventListener("projects-updated", onUpdate);
  }, [loadProjects]);

  const filtered = useMemo(() => {
    if (filter === "All") return projects;
    return projects.filter((p) => p.category === filter);
  }, [projects, filter]);

  return (
    <section
      id="work"
      className="border-t border-neutral-100 bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <div className="relative flex flex-wrap items-start justify-between gap-4">
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-display text-3xl font-bold text-charcoal sm:text-4xl"
          >
            Latest work
          </motion.h2>
          {showAdmin && (
            <button
              type="button"
              onClick={() => setAdminOpen(true)}
              className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-card px-4 py-2 text-sm font-medium text-charcoal shadow-sm transition hover:border-teal/40 hover:text-teal"
              title="Manage projects"
            >
              <Settings className="h-4 w-4" aria-hidden />
              Admin
            </button>
          )}
        </div>

        <div className="mt-8 flex flex-wrap gap-2 border-b border-neutral-100 pb-4">
          {FILTER_TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setFilter(tab)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                filter === tab
                  ? "bg-charcoal text-white"
                  : "bg-card text-neutral-600 hover:bg-neutral-200/80"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="mt-10">
          {loading ? (
            <GallerySkeleton />
          ) : filtered.length === 0 ? (
            <p className="text-center text-neutral-500">
              No projects in this category yet.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} />
              ))}
            </div>
          )}
        </div>
      </div>

      <WorkAdmin
        open={adminOpen}
        onClose={() => setAdminOpen(false)}
        projects={projects}
        onRefresh={loadProjects}
      />
    </section>
  );
}

export function GallerySection() {
  return (
    <Suspense
      fallback={
        <section
          id="work"
          className="border-t border-neutral-100 bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
        >
          <div className="mx-auto max-w-6xl">
            <h2 className="font-display text-3xl font-bold text-charcoal sm:text-4xl">
              Latest work
            </h2>
            <div className="mt-10">
              <GallerySkeleton />
            </div>
          </div>
        </section>
      }
    >
      <GalleryContent />
    </Suspense>
  );
}
