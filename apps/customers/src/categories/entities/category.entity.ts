export class Category {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  parentId?: number | null;
  categoryLink?: string | null;
  sortOrder?: number | null;
  //author?: User;
  //authorId?: number;
  published: boolean;
  name: string;
  slug: string;
  //products: Product[];
}
