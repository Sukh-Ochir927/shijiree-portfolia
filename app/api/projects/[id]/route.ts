import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } },
) {
  const db = getDb();
  const project = db
    .prepare("SELECT * FROM projects WHERE id = ?")
    .get(params.id);
  if (!project) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(project);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const body = await req.json();
  const { title, category, imageUrl, behanceUrl, views, appreciations, featured } =
    body;

  const db = getDb();
  const existing = db
    .prepare("SELECT * FROM projects WHERE id = ?")
    .get(params.id);
  if (!existing) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  db.prepare(`
    UPDATE projects
    SET title=?, category=?, imageUrl=?, behanceUrl=?, views=?, appreciations=?, featured=?
    WHERE id=?
  `).run(
    title,
    category,
    imageUrl,
    behanceUrl ?? "",
    views ?? 0,
    appreciations ?? 0,
    featured ? 1 : 0,
    params.id,
  );

  const updated = db
    .prepare("SELECT * FROM projects WHERE id = ?")
    .get(params.id);
  return NextResponse.json(updated);
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } },
) {
  const db = getDb();
  const result = db.prepare("DELETE FROM projects WHERE id = ?").run(params.id);
  if (result.changes === 0) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ success: true });
}
