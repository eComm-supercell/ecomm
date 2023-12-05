import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AuditLogService } from './audit-log.service';
import { CreateAuditLogDto } from './dto/create-audit-log.dto';
import { UpdateAuditLogDto } from './dto/update-audit-log.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { apiExceptionResponse } from '@libs/common/src/exceptions/exception.decorator';
import { AuditLogEntity } from './entities/audit-log.entity';

@Controller('audit-log')
@ApiTags('Audit Log')
export class AuditLogController {
  constructor(private readonly auditLogService: AuditLogService) {}

  @Post()
  @apiExceptionResponse()
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: AuditLogEntity,
  })
  create(@Body() createAuditLogDto: CreateAuditLogDto) {
    return this.auditLogService.create(createAuditLogDto);
  }

  // @Get()
  // findAll() {
  //   return this.auditLogService.findAll();
  // }

  @Get(':id')
  @ApiOkResponse({
    description: 'The record has been successfully fetched.',
    type: AuditLogEntity,
  })
  findOne(@Param('id') id: string) {
    return this.auditLogService.findOne(+id);
  }

  @Patch(':id')
  @apiExceptionResponse()
  @ApiOkResponse({
    description: 'The record has been successfully updated.',
    type: AuditLogEntity,
  })
  update(
    @Param('id') id: string,
    @Body() updateAuditLogDto: UpdateAuditLogDto,
  ) {
    return this.auditLogService.update(+id, updateAuditLogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.auditLogService.remove(+id);
  }
}
