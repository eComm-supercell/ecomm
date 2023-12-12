import { Controller, Get, Query } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Category } from './entities/category.entity';
import { ApiQuery, ApiTags } from '@nestjs/swagger';

@Controller('categories')
@ApiTags('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get('/getCategoiries')
  @ApiQuery({ name: 'parentId', required: false, type: Number })
  findOne(@Query('parentId') parentId?: number): Promise<Category[]> {
    return this.categoriesService.findMany(parentId ? parentId : undefined);
  }
}
