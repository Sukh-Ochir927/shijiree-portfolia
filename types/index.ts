export type SkillIconVariant = "coral" | "red" | "teal" | "green" | "yellow";

export interface OwnerSocials {
  behance: string;
  instagram: string;
  twitter: string;
  linkedin: string;
  facebook: string;
}

export interface Owner {
  name: string;
  title: string;
  tagline: string;
  bio: string;
  email: string;
  behance: string;
  avatarUrl: string;
  socials: OwnerSocials;
}

export interface Skill {
  id: number;
  icon: SkillIconVariant;
  title: string;
  description: string;
}

export interface Client {
  name: string;
  logoText: string;
}

export interface Testimonial {
  id: number;
  quote: string;
  name: string;
  role: string;
  rating: number;
}

export interface DbProjectRow {
  id: number;
  title: string;
  category: string;
  imageUrl: string;
  behanceUrl: string | null;
  views: number;
  appreciations: number;
  featured: number;
  createdAt: string;
}

export interface ProjectCardData {
  id: number;
  title: string;
  category: string;
  imageUrl: string;
  behanceUrl: string;
  views: number;
  appreciations: number;
  featured: boolean;
}

export function normalizeProject(row: DbProjectRow): ProjectCardData {
  return {
    id: row.id,
    title: row.title,
    category: row.category,
    imageUrl: row.imageUrl,
    behanceUrl: row.behanceUrl ?? "",
    views: row.views,
    appreciations: row.appreciations,
    featured: Boolean(row.featured),
  };
}
