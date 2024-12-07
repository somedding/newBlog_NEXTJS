export interface PostMetadata {
  title: string;
  date: string;
  description: string;
  thumbnail?: string;
}

export interface Post extends PostMetadata {
  slug: string;
  content: string;
}