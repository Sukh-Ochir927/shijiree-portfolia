"use client";

import { useEffect, useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X } from "lucide-react";
import type { ProjectCardData } from "@/types";

const MODAL_CATEGORIES = [
  "Package Design",
  "Brand Identity",
  "Logo Design",
  "Poster Design",
  "Social Design",
  "Art Direction",
  "Product Design",
] as const;

function notifyProjectsUpdated() {
  window.dispatchEvent(new Event("projects-updated"));
}

type ProjectModalProps = {
  open: boolean;
  mode: "create" | "edit";
  initial: ProjectCardData | null;
  onClose: () => void;
};

export function ProjectModal({
  open,
  mode,
  initial,
  onClose,
}: ProjectModalProps) {
  const [title, setTitle] = useState("");
  const [category, setCategory] =
    useState<(typeof MODAL_CATEGORIES)[number]>("Package Design");
  const [imageUrl, setImageUrl] = useState("");
  const [behanceUrl, setBehanceUrl] = useState("");
  const [views, setViews] = useState(0);
  const [appreciations, setAppreciations] = useState(0);
  const [featured, setFeatured] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    setError(null);
    if (mode === "edit" && initial) {
      setTitle(initial.title);
      const cat = initial.category;
      setCategory(
        (MODAL_CATEGORIES as readonly string[]).includes(cat)
          ? (cat as (typeof MODAL_CATEGORIES)[number])
          : "Package Design",
      );
      setImageUrl(initial.imageUrl);
      setBehanceUrl(initial.behanceUrl);
      setViews(initial.views);
      setAppreciations(initial.appreciations);
      setFeatured(initial.featured);
    } else {
      setTitle("");
      setCategory("Package Design");
      setImageUrl("");
      setBehanceUrl("");
      setViews(0);
      setAppreciations(0);
      setFeatured(false);
    }
  }, [open, mode, initial]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    if (!title.trim() || !imageUrl.trim()) {
      setError("Title and image URL are required.");
      return;
    }
    setSubmitting(true);
    try {
      const body = {
        title: title.trim(),
        category,
        imageUrl: imageUrl.trim(),
        behanceUrl: behanceUrl.trim(),
        views: Number(views) || 0,
        appreciations: Number(appreciations) || 0,
        featured,
      };
      const url =
        mode === "edit" && initial
          ? `/api/projects/${initial.id}`
          : "/api/projects";
      const res = await fetch(url, {
        method: mode === "edit" ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || "Request failed");
      }
      notifyProjectsUpdated();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }

  const previewOk =
    imageUrl.startsWith("http://") || imageUrl.startsWith("https://");

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            type="button"
            className="absolute inset-0 bg-charcoal/50 backdrop-blur-sm"
            aria-label="Close modal"
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            className="relative z-10 max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-neutral-200 bg-white p-6 shadow-xl"
          >
            <div className="mb-4 flex items-center justify-between">
              <h2
                id="project-modal-title"
                className="font-display text-xl font-bold text-charcoal"
              >
                {mode === "create" ? "Add project" : "Edit project"}
              </h2>
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg p-2 text-neutral-500 hover:bg-card"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={onSubmit} className="flex flex-col gap-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-charcoal">
                  Title
                </label>
                <input
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full rounded-xl border border-neutral-200 px-3 py-2.5 text-neutral-900 outline-none ring-charcoal/10 focus:ring-2"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-charcoal">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) =>
                    setCategory(e.target.value as (typeof MODAL_CATEGORIES)[number])
                  }
                  className="w-full rounded-xl border border-neutral-200 bg-white px-3 py-2.5 text-neutral-900 outline-none ring-charcoal/10 focus:ring-2"
                >
                  {MODAL_CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-charcoal">
                  Image URL
                </label>
                <input
                  required
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full rounded-xl border border-neutral-200 px-3 py-2.5 text-neutral-900 outline-none ring-charcoal/10 focus:ring-2"
                  placeholder="https://..."
                />
                <div className="relative mt-3 aspect-video w-full overflow-hidden rounded-xl bg-card">
                  {previewOk ? (
                    <Image
                      src={imageUrl}
                      alt="Preview"
                      fill
                      className="object-contain"
                      unoptimized
                      sizes="(max-width: 512px) 100vw, 512px"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-sm text-neutral-400">
                      Enter a valid image URL for preview
                    </div>
                  )}
                </div>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-charcoal">
                  Behance URL (optional)
                </label>
                <input
                  value={behanceUrl}
                  onChange={(e) => setBehanceUrl(e.target.value)}
                  className="w-full rounded-xl border border-neutral-200 px-3 py-2.5 text-neutral-900 outline-none ring-charcoal/10 focus:ring-2"
                  placeholder="https://www.behance.net/..."
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-sm font-medium text-charcoal">
                    Views
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={views}
                    onChange={(e) => setViews(Number(e.target.value))}
                    className="w-full rounded-xl border border-neutral-200 px-3 py-2.5 text-neutral-900 outline-none ring-charcoal/10 focus:ring-2"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-charcoal">
                    Appreciations
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={appreciations}
                    onChange={(e) => setAppreciations(Number(e.target.value))}
                    className="w-full rounded-xl border border-neutral-200 px-3 py-2.5 text-neutral-900 outline-none ring-charcoal/10 focus:ring-2"
                  />
                </div>
              </div>
              <label className="flex cursor-pointer items-center gap-2 text-sm font-medium text-charcoal">
                <input
                  type="checkbox"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  className="h-4 w-4 rounded border-neutral-300"
                />
                Featured
              </label>
              {error && (
                <p className="text-sm text-red-600" role="alert">
                  {error}
                </p>
              )}
              <button
                type="submit"
                disabled={submitting}
                className="mt-2 rounded-full bg-charcoal py-3 text-sm font-semibold text-white transition enabled:hover:opacity-90 disabled:opacity-60"
              >
                {submitting ? "Saving…" : mode === "create" ? "Create" : "Save"}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
