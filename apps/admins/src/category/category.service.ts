import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from '@libs/common/src/prisma/prisma.service';
import { Category } from '@prisma/client';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}
  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const { authorId, products, ...rest } = createCategoryDto;
    const category: Category = await this.prisma.category.create({
      data: {
        ...rest,
        author: authorId ? { connect: { id: authorId } } : undefined,
        products: {
          connect:
            products && products.length > 0
              ? products.map((product) => ({ id: product }))
              : undefined,
        },
      },
      include: {
        author: {
          select: {
            id: true,
          },
        },
      },
    });
    return category;
  }

  async findAll(): Promise<Category[]> {
    const list = await this.prisma.category.findMany();
    return list;
  }

  async findOne(id: number): Promise<Category | null> {
    const record = await this.prisma.category.findUnique({
      where: { id },
      include: {
        author: {
          select: {
            id: true,
          },
        },
      },
    });

    return record;
  }

  async update(
    id: number,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    const { authorId, products, ...rest } = updateCategoryDto;
    const update = await this.prisma.category.update({
      where: { id },
      data: {
        ...rest,
        author: {
          connect: authorId ? { id: authorId } : undefined,
        },
        products: {
          connect:
            products && products.length > 0
              ? products.map((product) => ({ id: product }))
              : undefined,
        },
      },
      include: {
        author: {
          select: {
            id: true,
          },
        },
      },
    });

    return update;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
