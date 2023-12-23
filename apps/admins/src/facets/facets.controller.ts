import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { FacetsService } from './facets.service';
import {
  AddFacetValuesDto,
  CreateFacetDto,
  CreateFacetResponse,
  FacetQueryResponse,
} from '../dto/create.dto';
import { apiExceptionResponse } from '@libs/common/src/exceptions/exception.decorator';

@Controller('facets')
@ApiTags('Facets')
export class FacetsController {
  constructor(private readonly service: FacetsService) {}

  /**
   * Create Facet.
   * @param body
   * @returns
   */
  @Post()
  @apiExceptionResponse()
  @ApiBody({
    type: CreateFacetDto,
  })
  @ApiCreatedResponse({
    description: 'Facet created successfully',
    type: CreateFacetResponse,
  })
  create(@Body() body: CreateFacetDto) {
    return this.service.create(body);
  }

  /**
   * Add facet values to facet.
   */
  @Put('add-facet-values')
  @apiExceptionResponse()
  addValues(@Body() body: AddFacetValuesDto) {
    return this.service.addFacetValues(body);
  }

  /**
   * Fetch facet by ID.
   *
   */
  @Get(':id')
  @ApiOkResponse({
    description: 'Facets fetched successfully',
    type: () => FacetQueryResponse,
    isArray: true,
  })
  @ApiParam({
    name: 'id',
    description: 'Facet id',
    type: Number,
    example: 1,
  })
  getFacetById(@Param('id') id: number) {
    return this.service.getFacetById(+id);
  }
  /**
   * Fetch all facets.
   *
   */
  @Get()
  @ApiOkResponse({
    description: 'Facets fetched successfully',
    type: () => FacetQueryResponse,
    isArray: true,
  })
  getAllFacets() {
    return this.service.getAllFacets();
  }
}
