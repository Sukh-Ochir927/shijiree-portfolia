import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function GET() {
  const db = getDb();
  const projects = db
    .prepare("SELECT * FROM projects ORDER BY createdAt DESC")
    .all();
  return NextResponse.json(projects);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { title, category, imageUrl, behanceUrl, views, appreciations, featured } =
    body;

  if (!title || !category || !imageUrl) {
    return NextResponse.json(
      { error: "title, category, imageUrl are required" },
      { status: 400 },
    );
  }

  const db = getDb();
  const result = db
    .prepare(`
    INSERT INTO projects (title, category, imageUrl, behanceUrl, views, appreciations, featured)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `)
    .run(
      title,
      category,
      imageUrl,
      behanceUrl ?? "",
      views ?? 0,
      appreciations ?? 0,
      featured ? 1 : 0,
    );

  const created = db
    .prepare("SELECT * FROM projects WHERE id = ?")
    .get(result.lastInsertRowid);
  return NextResponse.json(created, { status: 201 });
}
