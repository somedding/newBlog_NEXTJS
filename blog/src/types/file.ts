export interface FileInfo {
  id: string;
  name: string;
  description?: string;
  size: number;
  type: string;
  url: string;
  createdAt: Date;
  updatedAt: Date;
} 