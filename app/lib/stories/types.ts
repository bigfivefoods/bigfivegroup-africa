/**
 * Public Updates / Stories — readable Group news on the website.
 */

export const STORY_TAGS = [
  "Group",
  "Foods",
  "NSNP",
  "Direct",
  "SANTACO",
  "Leadership",
  "Connect",
  "Foundation",
  "Impact",
  "Partnerships",
  "SPAR",
] as const;

export type StoryTag = (typeof STORY_TAGS)[number] | string;

export type StoryStatus = "draft" | "published";

export type Story = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  /** Simple markdown body */
  body: string;
  tag: StoryTag;
  status: StoryStatus;
  /** Optional hero image path or absolute URL */
  coverImage?: string;
  /** Optional YouTube/Vimeo embed URL */
  videoUrl?: string;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
  grokBrief?: string;
  grokModel?: string;
};

export type StoryStore = {
  version: 1;
  updatedAt: string;
  stories: Story[];
};
