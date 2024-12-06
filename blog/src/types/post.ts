export interface PostMetadata {
  title: string;
  date: string;
  description: string;
}

export interface Post extends PostMetadata {
  slug: string;
  content: string;
}