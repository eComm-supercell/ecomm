export class CategoryEntity {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  parentId: number;
  categoryLink: string;
  sortOrder: number;
  published: boolean;
  name: string;
  slug: string;
  author?: {
    id: number;
  };
}
