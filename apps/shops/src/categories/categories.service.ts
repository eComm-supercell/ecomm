import { Injectable } from '@nestjs/common';
import { PrismaService } from '@libs/common/src/prisma/prisma.service';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  async findMany(parentId?: number): Promise<Category[]> {
    console.log('parentId', parentId);

    return await this.prisma.category.findMany({
      where: { parentId: parentId ? parentId : null, published: true },
      orderBy: { sortOrder: 'asc' },
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        parentId: true,
        categoryLink: true,
        sortOrder: true,
        published: true,
        name: true,
        slug: true,
      },
    });
  }
}
