"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Pencil, Trash2 } from "lucide-react";
import type { ProjectCardData } from "@/types";
import { ProjectModal } from "@/components/ProjectModal";

function notifyProjectsUpdated() {
  window.dispatchEvent(new Event("projects-updated"));
}

type WorkAdminProps = {
  open: boolean;
  onClose: () => void;
  projects: ProjectCardData[];
  onRefresh: () => void | Promise<void>;
};

export function WorkAdmin({
  open,
  onClose,
  projects,
  onRefresh,
}: WorkAdminProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [editing, setEditing] = useState<ProjectCardData | null>(null);

  function openCreate() {
    setModalMode("create");
    setEditing(null);
    setModalOpen(true);
  }

  function openEdit(p: ProjectCardData) {
    setModalMode("edit");
    setEditing(p);
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setEditing(null);
  }

  async function toggleFeatured(p: ProjectCardData) {
    const res = await fetch(`/api/projects/${p.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: p.title,
        category: p.category,
        imageUrl: p.imageUrl,
        behanceUrl: p.behanceUrl,
        views: p.views,
        appreciations: p.appreciations,
        featured: !p.featured,
      }),
    });
    if (res.ok) {
      notifyProjectsUpdated();
      await onRefresh();
    }
  }

  async function deleteProject(id: number) {
    if (!window.confirm("Delete this project permanently?")) return;
    const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
    if (res.ok) {
      notifyProjectsUpdated();
      await onRefresh();
    }
  }

  return (
    <>
      <AnimatePresence>
        {open && (
          <>
            <motion.button
              type="button"
              aria-label="Close admin panel"
              className="fixed inset-0 z-[150] bg-charcoal/40 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
            />
            <motion.aside
              role="dialog"
              aria-label="Manage projects"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.28 }}
              className="fixed right-0 top-0 z-[160] flex h-full w-full max-w-xl flex-col border-l border-neutral-200 bg-white shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-neutral-100 px-5 py-4">
                <h2 className="font-sf-display text-xl font-bold text-charcoal">
                  Manage Projects
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
              <div className="border-b border-neutral-100 px-5 py-3">
                <button
                  type="button"
                  onClick={openCreate}
                  className="rounded-full bg-charcoal px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90"
                >
                  Add New Project
                </button>
              </div>
              <div className="flex-1 overflow-auto px-3 py-4">
                <div className="overflow-x-auto rounded-xl border border-neutral-200">
                  <table className="w-full min-w-[520px] text-left text-sm">
                    <thead className="bg-card text-xs font-semibold uppercase tracking-wide text-neutral-500">
                      <tr>
                        <th className="px-3 py-3">Thumb</th>
                        <th className="px-3 py-3">Title</th>
                        <th className="px-3 py-3">Category</th>
                        <th className="px-3 py-3">Featured</th>
                        <th className="px-3 py-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100">
                      {projects.map((p) => (
                        <tr key={p.id} className="bg-white">
                          <td className="px-3 py-2">
                            <div className="relative h-12 w-16 overflow-hidden rounded-md bg-neutral-100">
                              <Image
                                src={p.imageUrl}
                                alt=""
                                fill
                                className="object-cover"
                                sizes="64px"
                                unoptimized
                              />
                            </div>
                          </td>
                          <td className="max-w-[120px] truncate px-3 py-2 font-medium text-charcoal">
                            {p.title}
                          </td>
                          <td className="px-3 py-2 text-neutral-600">
                            {p.category}
                          </td>
                          <td className="px-3 py-2">
                            <input
                              type="checkbox"
                              checked={p.featured}
                              onChange={() => toggleFeatured(p)}
                              className="h-4 w-4 rounded border-neutral-300"
                              aria-label={`Featured: ${p.title}`}
                            />
                          </td>
                          <td className="px-3 py-2">
                            <div className="flex gap-1">
                              <button
                                type="button"
                                onClick={() => openEdit(p)}
                                className="rounded-lg p-2 text-teal hover:bg-teal/10"
                                aria-label="Edit"
                              >
                                <Pencil className="h-4 w-4" />
                              </button>
                              <button
                                type="button"
                                onClick={() => deleteProject(p.id)}
                                className="rounded-lg p-2 text-red-600 hover:bg-red-50"
                                aria-label="Delete"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <ProjectModal
        open={modalOpen}
        mode={modalMode}
        initial={editing}
        onClose={closeModal}
      />
    </>
  );
}
