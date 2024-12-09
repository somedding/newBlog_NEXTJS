export interface Photo {
  id: string;
  src: string;
  title: string;
  thumbnailUrl: string;
  fullUrl: string;
  createdTime: string;
  description?: string;
  tags?: string[];
  uploadedAt: string;
} 