import { Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { PrismaService } from '@libs/common/src/prisma/prisma.service';
import { TagEntity } from './entities/tag.entity';
import { FindQueryDto } from './dto/find-tag.dto';

@Injectable()
export class TagsService {
  constructor(private prisma: PrismaService) {}
  async create(createTagDto: CreateTagDto): Promise<TagEntity> {
    const record = await this.prisma.tag.create({
      data: createTagDto,
    });
    return record;
  }

  async findAll(findQuery?: FindQueryDto): Promise<TagEntity[]> {
    const records = await this.prisma.tag.findMany({
      where: {
        OR: [{ slug: findQuery?.slug }, { title: findQuery?.title }],
      },
    });
    return records;
  }

  async findOne(
    id: number,
    findQuery?: FindQueryDto,
  ): Promise<TagEntity | null> {
    const record = await this.prisma.tag.findFirst({
      where: {
        OR: [
          { id },
          {
            title: findQuery?.title ? findQuery.title : undefined,
          },
          { slug: findQuery?.slug ? findQuery.slug : undefined },
        ],
      },
    });
    return record;
  }

  async update(id: number, updateTagDto: UpdateTagDto) {
    const { productsIds, ...rest } = updateTagDto;
    const update = await this.prisma.tag.update({
      where: {
        id,
      },
      data: {
        ...rest,
        products:
          productsIds && productsIds.length > 0
            ? {
                set: [],
                connect: productsIds.map((productId) => ({ id: productId })),
              }
            : undefined,
      },
    });

    return update;
  }

  remove(id: number) {
    return `This action removes a #${id} tag`;
  }
}
