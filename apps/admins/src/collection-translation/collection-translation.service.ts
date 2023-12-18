import { PrismaService } from '@libs/common/src/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateCollectionTranslationDto } from './dto/create.dto';
import { UpdateCollectionTranslationDto } from './dto/update.dto';

@Injectable()
export class CollectionTranslationService {
  constructor(private prisma: PrismaService) {}

  async create(body: CreateCollectionTranslationDto) {
    console.log(body);

    const { description, name, slug } = body;
    return await this.prisma.collection_translation.create({
      data: { languageCode: body.languageCode, name, slug, description },
    });
  }

  async update(body: UpdateCollectionTranslationDto) {
    const { collectionTranslationId, ...rest } = body;
    return await this.prisma.collection_translation.update({
      data: { ...rest },
      where: {
        id: collectionTranslationId,
      },
    });
  }
}
