import { PrismaService } from '@libs/common/src/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { AddFacetValuesDto, CreateFacetDto } from '../dto/create.dto';

@Injectable()
export class FacetsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(body: CreateFacetDto) {
    const { translations, code, isPrivate } = body;
    const { id } = await this.prisma.facet.create({
      data: {
        code,
        isPrivate,
        translations: {
          createMany: {
            data: translations.map((value) => ({ ...value })),
            skipDuplicates: true,
          },
        },
      },
    });
    return { facetId: id };
  }

  async addFacetValues(body: AddFacetValuesDto) {
    const { facetId, values } = body;
    return this.prisma.facet.update({
      where: { id: facetId },
      data: {
        facetValues: {
          create: values.map((value) => ({
            code: value.code,
            translations: {
              createMany: {
                data: value.translations.map((translation) => ({
                  ...translation,
                })),
                skipDuplicates: true,
              },
            },
          })),
        },
      },
      select: {
        facetValues: true,
      },
    });
  }

  async getAllFacets() {
    return this.prisma.facet.findMany({
      include: {
        translations: true,
        facetValues: true,
      },
    });
  }

  async getFacetById(id: number) {
    return this.prisma.facet.findUnique({
      where: { id },
      include: {
        translations: true,
        facetValues: true,
      },
    });
  }
}
