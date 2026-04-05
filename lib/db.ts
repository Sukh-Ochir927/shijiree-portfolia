import Database from "better-sqlite3";
import fs from "fs";
import path from "path";

const DB_PATH = path.join(process.cwd(), "data", "projects.db");

type SqliteDb = InstanceType<typeof Database>;

let dbInstance: SqliteDb | null = null;

export function getDb(): SqliteDb {
  if (dbInstance) return dbInstance;

  const dir = path.dirname(DB_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const db = new Database(DB_PATH);

  db.exec(`
    CREATE TABLE IF NOT EXISTS projects (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      category TEXT NOT NULL,
      imageUrl TEXT NOT NULL,
      behanceUrl TEXT,
      views INTEGER DEFAULT 0,
      appreciations INTEGER DEFAULT 0,
      featured INTEGER DEFAULT 0,
      createdAt TEXT DEFAULT (datetime('now'))
    )
  `);

  const count = (
    db.prepare("SELECT COUNT(*) as c FROM projects").get() as { c: number }
  ).c;

  if (count === 0) {
    const insert = db.prepare(`
      INSERT INTO projects (title, category, imageUrl, behanceUrl, views, appreciations, featured)
      VALUES (@title, @category, @imageUrl, @behanceUrl, @views, @appreciations, @featured)
    `);

    const seedProjects = [
      {
        title: "Facebook Cover",
        category: "Social Design",
        imageUrl:
          "https://mir-s3-cdn-cf.behance.net/projects/404/eca930239461489.Y3JvcCw1MTE1LDQwMDAsMjAwMCww.png",
        behanceUrl: "https://www.behance.net/gallery/239461489/Facebook-cover",
        views: 99,
        appreciations: 0,
        featured: 1,
      },
      {
        title: "Branding Guideline",
        category: "Brand Identity",
        imageUrl:
          "https://mir-s3-cdn-cf.behance.net/projects/404/3b91f6233869205.Y3JvcCw1NTIzLDQzMjAsMTA4MCww.jpg",
        behanceUrl:
          "https://www.behance.net/gallery/233869205/Brandning-Guideline",
        views: 37,
        appreciations: 0,
        featured: 1,
      },
      {
        title: "Social Poster",
        category: "Poster Design",
        imageUrl:
          "https://mir-s3-cdn-cf.behance.net/projects/404/4b11f0227253347.Y3JvcCw3OTk5LDYyNTcsMCw4NzE.png",
        behanceUrl: "https://www.behance.net/gallery/227253347/Social-poster",
        views: 18,
        appreciations: 0,
        featured: 1,
      },
      {
        title: "Product Package Design",
        category: "Package Design",
        imageUrl:
          "https://mir-s3-cdn-cf.behance.net/projects/404/2df087223216301.Y3JvcCwzODM1LDMwMDAsODUsMA.png",
        behanceUrl:
          "https://www.behance.net/gallery/223216301/Product-package-design",
        views: 25,
        appreciations: 1,
        featured: 1,
      },
      {
        title: "Namecard",
        category: "Brand Identity",
        imageUrl:
          "https://mir-s3-cdn-cf.behance.net/projects/404/35e49f222954701.Y3JvcCw1NTI0LDQzMjEsMTA4MCww.png",
        behanceUrl: "https://www.behance.net/gallery/222954701/Namecard",
        views: 43,
        appreciations: 2,
        featured: 1,
      },
      {
        title: "Logo",
        category: "Logo Design",
        imageUrl:
          "https://mir-s3-cdn-cf.behance.net/projects/404/b84171222954653.Y3JvcCw3OTk5LDYyNTcsMCw4NzE.png",
        behanceUrl: "https://www.behance.net/gallery/222954653/Logo",
        views: 17,
        appreciations: 0,
        featured: 0,
      },
      {
        title: "Brand",
        category: "Brand Identity",
        imageUrl:
          "https://mir-s3-cdn-cf.behance.net/projects/404/9957ca222850995.Y3JvcCw3OTk5LDYyNTcsMCww.png",
        behanceUrl: "https://www.behance.net/gallery/222850995/Brand",
        views: 22,
        appreciations: 1,
        featured: 0,
      },
      {
        title: "New Brand",
        category: "Brand Identity",
        imageUrl:
          "https://mir-s3-cdn-cf.behance.net/projects/404/6ad12f222850747.Y3JvcCw1NTIzLDQzMjAsMTA4MCww.png",
        behanceUrl: "https://www.behance.net/gallery/222850747/New-Brand",
        views: 16,
        appreciations: 0,
        featured: 0,
      },
      {
        title: "Logo",
        category: "Logo Design",
        imageUrl:
          "https://mir-s3-cdn-cf.behance.net/projects/404/a1399a222850683.Y3JvcCw1NTI0LDQzMjEsMTA4MCww.png",
        behanceUrl: "https://www.behance.net/gallery/222850683/Logo",
        views: 10,
        appreciations: 0,
        featured: 0,
      },
      {
        title: "Product Poster",
        category: "Poster Design",
        imageUrl:
          "https://mir-s3-cdn-cf.behance.net/projects/404/5df6a3222850587.Y3JvcCw4MDAwLDYyNTgsMCw4NzE.png",
        behanceUrl: "https://www.behance.net/gallery/222850587/Product-poster",
        views: 9,
        appreciations: 0,
        featured: 0,
      },
      {
        title: "Poster",
        category: "Poster Design",
        imageUrl:
          "https://mir-s3-cdn-cf.behance.net/projects/404/132ec3222850495.Y3JvcCw3OTk5LDYyNTcsMCw4NzE.png",
        behanceUrl: "https://www.behance.net/gallery/222850495/Poster",
        views: 7,
        appreciations: 0,
        featured: 0,
      },
      {
        title: "Poster",
        category: "Poster Design",
        imageUrl:
          "https://mir-s3-cdn-cf.behance.net/projects/404/5a4c62222850391.Y3JvcCw3OTk5LDYyNTcsMCw4NzE.png",
        behanceUrl: "https://www.behance.net/gallery/222850391/Poster",
        views: 11,
        appreciations: 1,
        featured: 0,
      },
    ];

    for (const p of seedProjects) {
      insert.run(p);
    }
  }

  dbInstance = db;
  return db;
}
