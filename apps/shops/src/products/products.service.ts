import { Injectable } from '@nestjs/common';
import { PrismaService } from '@libs/common/src/prisma/prisma.service';
// import FakeJson from '../../fake/data.json';
// import { categoties } from '../../fake/categories';
// import { fakeCategoryComplete } from '@app/customers/faker/fake-data';
// import { getFakeShops } from '@app/customers/fake/shops';
@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<any> {
    return await this.prisma.product.findMany({
      include: {
        productImages: true,
        productVariants: {
          include: {
            productVariantImage: true,
          },
        },
        tags: true,
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  async procesFakeData() {
    // const categories = Object.keys(categoties).map((key) =>
    //   fakeCategoryComplete(key),
    // );
    // await this.prisma.category.createMany({
    //   data: categories,
    // });

    // const shops = getFakeShops();
    // for (const shop of shops) {
    //   await this.prisma.shop.create({
    //     data: shop,
    //   });
    // }
    return await {};
  }
}
