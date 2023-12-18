import { PrismaService } from '@libs/common/src/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateCollectionDto } from './dto/create.dto';
import { UpdateCollectionDto } from './dto/update.dto';

@Injectable()
export class CollectionsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateCollectionDto) {
    const nestedCollections =
      data.nestedCollectionIds?.map((id) => ({
        id,
      })) || [];

    await this.prisma.collection.create({
      data: {
        nestedCollections: {
          connect: nestedCollections,
        },
        collection_translation: {
          connect: {
            id: data.translationKey,
          },
        },
      },
    });

    return { success: true };
  }

  async update(body: UpdateCollectionDto) {
    const { nestedCollectionIds, translationKey, collectionId } = body;
    const nestedCollections =
      nestedCollectionIds?.map((id) => ({
        id,
      })) || [];
    return await this.prisma.collection.update({
      data: {
        nestedCollections: {
          connect: nestedCollections,
        },
        collection_translation: {
          connect: {
            id: translationKey,
          },
        },
      },
      where: {
        id: collectionId,
      },
    });
  }

  async getById(id: number) {
    return await this.prisma.collection.findUnique({
      where: { id },
      include: {
        nestedCollections: {
          include: {
            nestedCollections: true,
            collection_translation: true,
          },
        },
        collection_translation: true,
      },
    });
  }

  async findAll() {
    return await this.prisma.collection.findMany({
      include: {
        nestedCollections: {
          include: {
            nestedCollections: true,
            collection_translation: true,
          },
        },
        collection_translation: true,
      },
    });
  }
}
