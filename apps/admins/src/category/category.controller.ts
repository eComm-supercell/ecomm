import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { apiExceptionResponse } from '@libs/common/src/exceptions/exception.decorator';
import { Category } from '@prisma/client';
import { CategoryEntity } from './entities/category.entity';
import { JwtGuard } from '@libs/common/src/auth/guard/jwt.guard';

@ApiBearerAuth()
@Controller('category')
@ApiTags('Category')
@UseGuards(JwtGuard)
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  /**
   * Create a category
   *
   */
  @Post()
  @apiExceptionResponse()
  @ApiCreatedResponse({
    description: 'Category created successfully',
    type: CategoryEntity,
  })
  create(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<Category | null> {
    return this.categoryService.create(createCategoryDto);
  }

  /**
   * Get all categories
   */
  @Get('me')
  @ApiOkResponse({
    description: 'Categories retrieved successfully',
    type: [CategoryEntity],
  })
  findAll(): Promise<Category[]> {
    return this.categoryService.findAll();
  }

  /**
   * Get a category by id
   */
  @Get(':id')
  @ApiOkResponse({
    description: 'Category retrieved successfully',
    type: CategoryEntity,
  })
  findOne(@Param('id') id: string): Promise<Category | null> {
    return this.categoryService.findOne(+id);
  }

  /**
   * Update a category
   *
   */
  @Patch(':id')
  @apiExceptionResponse()
  @ApiOkResponse({
    description: 'Category updated successfully',
    type: CategoryEntity,
  })
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    return this.categoryService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }
}
